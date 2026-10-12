// Growth field for the lichen landing page.
//
// The page is covered by a coarse grid (CELL px per cell). Each colony spreads
// outward from its seed cells with Dijkstra, at a speed that varies with a
// noise field, so every grid cell learns WHEN lichen reaches it and WHICH
// colony owns it. The shader turns that into areoles.
//
// Besides arrival time the field carries the distance (px) from each cell to
// the logo's painted pixels. It is smooth when the GPU interpolates it, which
// keeps the gap around the logo crisp instead of following the grid's stairs.

export const MAX_COLONIES = 32;
export const NONE = 255;
const BIG = 1e9;

export interface Colony {
  slot: number;
  kind: 'link' | 'user';
  /** Growth clock value (px of growth) at which the colony was seeded. */
  start: number;
  /** How far, in growth units, the colony spreads before it stops. */
  lim: number;
  /** performance.now() when this colony started fading out, or null. */
  fadeAt: number | null;
}

class Heap {
  k: Float64Array; v: Int32Array; n = 0; popK = 0;
  constructor(size: number) { this.k = new Float64Array(size); this.v = new Int32Array(size); }
  private grow() {
    const k = new Float64Array(this.k.length * 2); k.set(this.k); this.k = k;
    const v = new Int32Array(this.v.length * 2); v.set(this.v); this.v = v;
  }
  push(key: number, val: number) {
    if (this.n >= this.k.length) this.grow();
    const k = this.k, v = this.v; let i = this.n++;
    while (i > 0) { const p = (i - 1) >> 1; if (k[p] <= key) break; k[i] = k[p]; v[i] = v[p]; i = p; }
    k[i] = key; v[i] = val;
  }
  pop(): number {
    const k = this.k, v = this.v, topK = k[0], topV = v[0], n = --this.n;
    if (n > 0) {
      const key = k[n], val = v[n]; let i = 0;
      for (;;) {
        let c = 2 * i + 1; if (c >= n) break;
        if (c + 1 < n && k[c + 1] < k[c]) c++;
        if (k[c] >= key) break;
        k[i] = k[c]; v[i] = v[c]; i = c;
      }
      k[i] = key; v[i] = val;
    }
    this.popK = topK; return topV;
  }
}

/** Integer hash → [0,1). */
export function ihash(x: number, y: number, seed: number) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(seed, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function vnoise(x: number, y: number, seed: number) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = ihash(xi, yi, seed), b = ihash(xi + 1, yi, seed), c = ihash(xi, yi + 1, seed), d = ihash(xi + 1, yi + 1, seed);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/**
 * Squared Euclidean distance transform (Felzenszwalb & Huttenlocher), in
 * place. Feature cells hold 0, everything else BIG; results are in cells².
 */
function edt(g: Float32Array, w: number, h: number) {
  const n = Math.max(w, h);
  const f = new Float64Array(n), d = new Float64Array(n), z = new Float64Array(n + 1);
  const v = new Int32Array(n);
  const pass = (len: number) => {
    let k = 0; v[0] = 0; z[0] = -Infinity; z[1] = Infinity;
    for (let q = 1; q < len; q++) {
      let s: number;
      for (;;) {
        const r = v[k];
        s = ((f[q] + q * q) - (f[r] + r * r)) / (2 * q - 2 * r);
        if (s <= z[k]) { k--; continue; }
        break;
      }
      k++; v[k] = q; z[k] = s; z[k + 1] = Infinity;
    }
    k = 0;
    for (let q = 0; q < len; q++) {
      while (z[k + 1] < q) k++;
      const r = v[k];
      d[q] = (q - r) * (q - r) + f[r];
    }
  };
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) f[y] = g[y * w + x];
    pass(h);
    for (let y = 0; y < h; y++) g[y * w + x] = d[y];
  }
  for (let y = 0; y < h; y++) {
    const o = y * w;
    for (let x = 0; x < w; x++) f[x] = g[o + x];
    pass(w);
    for (let x = 0; x < w; x++) g[o + x] = d[x];
  }
}

export class LichenField {
  readonly cs: number;
  readonly gw: number;
  readonly gh: number;
  readonly seed: number;
  /** Absolute arrival time (growth clock units) per cell. */
  readonly T: Float32Array;
  readonly lab: Uint8Array;
  readonly speed: Float32Array;
  /** Domain warp for the areole tiling (cell units), precomputed so the shader gets it from its existing field fetch. */
  readonly warp: Float32Array;
  readonly logoDist: Float32Array;
  readonly blocked: Uint8Array;
  readonly colonies: (Colony | null)[] = new Array(MAX_COLONIES).fill(null);
  /** Extra growth past `lim` kept in the field so areoles at the rim have data under them. */
  margin = 30;
  gap = 22;

  constructor(width: number, height: number, cs: number, seed: number) {
    this.cs = cs; this.seed = seed;
    this.gw = Math.ceil(width / cs) + 2;
    this.gh = Math.ceil(height / cs) + 2;
    const N = this.gw * this.gh;
    this.T = new Float32Array(N).fill(BIG);
    this.lab = new Uint8Array(N).fill(NONE);
    this.speed = new Float32Array(N);
    this.warp = new Float32Array(N * 2);
    this.logoDist = new Float32Array(N).fill(1e4);
    this.blocked = new Uint8Array(N);
    for (let y = 0; y < this.gh; y++) for (let x = 0; x < this.gw; x++) {
      const px = x * cs, py = y * cs;
      this.speed[y * this.gw + x] = Math.max(.35,
        1 + 0.75 * (vnoise(px / 70, py / 70, seed) - .5) * 2
          + 0.45 * (vnoise(px / 28 + 50, py / 28, seed) - .5) * 2
          + 0.14 * (vnoise(px / 14 + 90, py / 14, seed) - .5) * 2);
      // Two scales: ~48px swells and ~16px wobble, so areoles vary in size and shape.
      const w = (y * this.gw + x) * 2, s2 = seed + 7;
      this.warp[w] = .6 * (vnoise(px / 48, py / 48, s2) - .5) + .3 * (vnoise(px / 16 + 7, py / 16, s2) - .5);
      this.warp[w + 1] = .6 * (vnoise(px / 48 + 31, py / 48, s2) - .5) + .3 * (vnoise(px / 16 + 19, py / 16 + 5, s2) - .5);
    }
  }

  /** mask: 1 where the logo paints, per grid cell. Lichen keeps `gap` px away from it. */
  setLogoMask(mask: Uint8Array, gap: number) {
    this.gap = gap;
    const g = this.logoDist;
    for (let i = 0; i < g.length; i++) g[i] = mask[i] ? 0 : BIG;
    edt(g, this.gw, this.gh);
    // Dijkstra stops a little inside the gap; the shader trims the last bit
    // smoothly along the logo distance contour.
    const stop = Math.max(0, gap - 2 * this.cs);
    for (let i = 0; i < g.length; i++) {
      g[i] = Math.sqrt(g[i]) * this.cs;
      this.blocked[i] = g[i] < stop ? 1 : 0;
    }
  }

  cellAt(x: number, y: number) {
    const gx = Math.round(x / this.cs), gy = Math.round(y / this.cs);
    if (gx < 0 || gy < 0 || gx >= this.gw || gy >= this.gh) return -1;
    return gy * this.gw + gx;
  }

  ownerAt(x: number, y: number): Colony | null {
    const i = this.cellAt(x, y);
    if (i < 0 || this.lab[i] === NONE) return null;
    return this.colonies[this.lab[i]];
  }

  freeSlot() {
    for (let i = 0; i < MAX_COLONIES; i++) if (!this.colonies[i]) return i;
    return -1;
  }

  /**
   * Seed a colony and spread it. A colony only claims a cell if it gets there
   * first, and never a cell held by a fading colony (that lichen is still
   * visible), so new growth stops where it meets an existing patch.
   */
  addColony(kind: Colony['kind'], seeds: number[], start: number, lim: number): Colony | null {
    const slot = this.freeSlot();
    if (slot < 0) return null;
    const c: Colony = { slot, kind, start, lim, fadeAt: null };
    this.colonies[slot] = c;
    const { T, lab, speed, blocked, gw, gh, cs } = this;
    const heap = new Heap(1024);
    const claimable = (j: number, t: number) => {
      if (blocked[j]) return false;
      const o = lab[j];
      if (o === NONE) return true;
      if (o === slot) return t < T[j];
      const owner = this.colonies[o]!;
      if (owner.fadeAt) return false;
      // Past its `lim` a colony only keeps the cell as margin and never grows
      // lichen there, so a neighbour may take it and the two patches meet.
      return t < T[j] || T[j] - owner.start > owner.lim;
    };
    for (const i of seeds) {
      if (i >= 0 && claimable(i, start)) { T[i] = start; lab[i] = slot; heap.push(T[i], i); }
    }
    const cap = start + lim + this.margin;
    const DX = [1, -1, 0, 0, 1, 1, -1, -1], DY = [0, 0, 1, -1, 1, -1, 1, -1];
    const DL = [1, 1, 1, 1, Math.SQRT2, Math.SQRT2, Math.SQRT2, Math.SQRT2];
    while (heap.n) {
      const i = heap.pop(), key = heap.popK;
      if (lab[i] !== slot || key > T[i]) continue;
      const x = i % gw, y = (i / gw) | 0;
      for (let k = 0; k < 8; k++) {
        const nx = x + DX[k], ny = y + DY[k];
        if (nx < 0 || ny < 0 || nx >= gw || ny >= gh) continue;
        const j = ny * gw + nx;
        const nt = key + DL[k] * cs * 2 / (speed[i] + speed[j]);
        if (nt <= cap && claimable(j, nt)) { T[j] = nt; lab[j] = slot; heap.push(T[j], j); }
      }
    }
    return c;
  }

  removeColony(c: Colony) {
    const { T, lab } = this;
    for (let i = 0; i < lab.length; i++) if (lab[i] === c.slot) { lab[i] = NONE; T[i] = BIG; }
    this.colonies[c.slot] = null;
  }

  /** Cells (indices) covering a page-space rectangle. */
  rectCells(l: number, t: number, r: number, b: number) {
    const out: number[] = [];
    const cs = this.cs;
    const x0 = Math.max(0, Math.ceil(l / cs)), x1 = Math.min(this.gw - 1, Math.floor(r / cs));
    const y0 = Math.max(0, Math.ceil(t / cs)), y1 = Math.min(this.gh - 1, Math.floor(b / cs));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) out.push(y * this.gw + x);
    return out;
  }

  /** Cells within radius r (px) of a point. */
  discCells(cx: number, cy: number, r: number) {
    const out: number[] = [];
    const cs = this.cs, gx = cx / cs, gy = cy / cs, gr = r / cs;
    for (let y = Math.floor(gy - gr); y <= Math.ceil(gy + gr); y++)
      for (let x = Math.floor(gx - gr); x <= Math.ceil(gx + gr); x++) {
        if (x < 0 || y < 0 || x >= this.gw || y >= this.gh) continue;
        if ((x - gx) ** 2 + (y - gy) ** 2 <= gr * gr) out.push(y * this.gw + x);
      }
    return out;
  }

  /** RGBA float texture: local arrival, warp x, logo distance, warp y. */
  pack(out: Float32Array) {
    const { T, lab, logoDist, colonies } = this;
    for (let i = 0; i < lab.length; i++) {
      const L = lab[i];
      out[i * 4] = L === NONE ? 9999 : Math.min(9999, T[i] - (colonies[L]?.start ?? 0));
      out[i * 4 + 1] = this.warp[i * 2];
      out[i * 4 + 2] = Math.min(4000, logoDist[i]);
      out[i * 4 + 3] = this.warp[i * 2 + 1];
    }
  }
}
