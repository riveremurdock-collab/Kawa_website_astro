// Lichen landing page: lays the nav links out under the logo, grows a lichen
// patch behind each one, lets visitors grow up to three patches of their own,
// and flies the Extras links out of the Extras button (which becomes Back).

import { LichenField, NONE, type Colony } from './field';
import { LichenRenderer } from './renderer';

const FADE_GREY = 600;       // ms for a fading patch to drain to grey
const FADE_OUT_START = 400;  // ms into the fade when it starts disappearing
const FADE_TOTAL = 1000;     // ms until a fading patch is gone
const FLIGHT = 850;
const FLIGHT_DELAY = 80;
const FLIGHT_STAGGER = 70;
const MAIN_STAGGER = 260;
const MAX_USER = 3;
const LIGHT: [number, number] = [-.55, -.62]; // toward the light, page space (y down): top-left

interface Box { x: number; y: number; w: number; h: number; }
interface Item { el: HTMLElement; colony: Colony | null; box: Box | null; }

const smooth = (a: number, b: number, x: number) => {
  const u = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return u * u * (3 - 2 * u);
};

export function initLichenLanding(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>('.lichen-canvas')!;
  const logo = root.querySelector<HTMLImageElement>('.lichen-logo')!;
  const toggle = root.querySelector<HTMLButtonElement>('.lichen-extras')!;
  const toggleLabel = toggle.querySelector<HTMLElement>('.lichen-extras-label')!;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const mains: Item[] = [...root.querySelectorAll<HTMLElement>('[data-group="main"]')]
    .map(el => ({ el, colony: null, box: null }));
  const extras: Item[] = [...root.querySelectorAll<HTMLElement>('[data-group="extras"]')]
    .map(el => ({ el, colony: null, box: null }));
  const toggleItem: Item = { el: toggle, colony: null, box: null };

  const renderer = LichenRenderer.create(canvas);
  root.classList.add('is-live');
  if (!renderer) root.classList.add('no-webgl');

  let W = 0, H = 0, dpr = 1;
  let field: LichenField;
  let seed = 0, t = 0, rate = 30, reach = 100, cell = 14, gap = 22;
  let logoBox = { l: 0, t: 0, r: 0, b: 0 };
  let mode: 'main' | 'extras' = 'main';
  let userColonies: Colony[] = [];
  let pending: { at: number; gen: number; run: () => void }[] = [];
  let gen = 0;
  let dirty = false, running = false, last = 0;

  // ---------- scheduling + animation loop ----------
  function later(ms: number, run: () => void) {
    pending.push({ at: performance.now() + ms, gen, run });
    kick();
  }

  function fade(c: Colony | null) {
    if (c && !c.fadeAt) { c.fadeAt = performance.now(); kick(); }
  }

  function kick() {
    if (running) return;
    running = true; last = performance.now();
    requestAnimationFrame(frame);
  }

  function frame(now: number) {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    t += rate * dt;

    const due = pending.filter(p => p.at <= now);
    pending = pending.filter(p => p.at > now);
    due.forEach(p => { if (p.gen === gen) p.run(); });

    let busy = pending.length > 0;
    for (const c of field.colonies) {
      if (!c) continue;
      if (c.fadeAt) {
        if (now - c.fadeAt >= FADE_TOTAL) {
          field.removeColony(c);
          userColonies = userColonies.filter(u => u !== c);
          dirty = true;
        } else busy = true;
      } else if (t - c.start < c.lim) busy = true;
    }
    if (dirty) { renderer?.upload(field); dirty = false; }
    draw(now, !busy);
    if (busy) requestAnimationFrame(frame); else running = false;
  }

  function draw(now: number, still: boolean) {
    if (!renderer) return;
    renderer.draw({
      colonies: field.colonies.map(c => {
        if (!c) return null;
        const f = c.fadeAt ? now - c.fadeAt : -1;
        return {
          since: t - c.start, // uncapped; the shader holds age at full size
          lim: c.lim,
          grey: f < 0 ? 0 : smooth(0, FADE_GREY, f),
          alpha: f < 0 ? 1 : 1 - smooth(FADE_OUT_START, FADE_TOTAL, f),
        };
      }),
      dpr, seed, cell, gap, light: LIGHT,
      // Once everything has settled, draw one extra-sharp frame and stop.
      supersample: still,
    });
  }

  // ---------- geometry ----------
  function boxOf(el: HTMLElement): Box {
    const r = el.getBoundingClientRect(), o = root.getBoundingClientRect();
    return { x: r.left - o.left + r.width / 2, y: r.top - o.top + r.height / 2, w: r.width, h: r.height };
  }

  function place(el: HTMLElement, b: Box) {
    el.style.left = b.x + 'px';
    el.style.top = b.y + 'px';
  }

  function gapBetween(a: Box, b: Box) {
    const dx = Math.max(0, Math.abs(a.x - b.x) - (a.w + b.w) / 2);
    const dy = Math.max(0, Math.abs(a.y - b.y) - (a.h + b.h) / 2);
    return Math.hypot(dx, dy);
  }

  /** Share of sample points around a box already covered by a live patch (0..1). */
  function occupied(b: Box) {
    let n = 0;
    for (let j = 0; j < 3; j++) for (let i = 0; i < 5; i++) {
      const x = b.x + (i / 4 - .5) * (b.w + 20), y = b.y + (j / 2 - .5) * (b.h + 20);
      const c = field.cellAt(x, y);
      const L = c < 0 ? NONE : field.lab[c];
      if (L !== NONE && !field.colonies[L]?.fadeAt) n++;
    }
    return n / 15;
  }

  /**
   * Even-but-random placement. Random starting layouts are scored by their
   * tightest spot (closest pair of links, or a link and the screen edge, or
   * a link over a live patch); the best one is then nudged around at random,
   * keeping any nudge that loosens that tightest spot. The result is spread
   * evenly but different on every load.
   *
   * Links always keep their nav order — left to right, or top to bottom on
   * narrow screens where they stack — so visitors learn roughly where each
   * one lives.
   */
  function layoutBoxes(items: Item[], fixed: Box[]): Box[] {
    const narrow = W < 640;
    const key = (b: Box) => narrow ? b.y : b.x;
    const minStep = narrow ? 18 : 40;
    const m = Math.max(14, Math.min(W, H) * .03);
    const x0 = m + reach * .35, x1 = W - m - reach * .35;
    let y0 = logoBox.b + gap + Math.min(reach * .45, 50);
    const y1 = H - m - reach * .25;
    if (y1 - y0 < 160) y0 = Math.max(logoBox.b + gap, y1 - 160);
    const sizes = items.map(it => ({ w: it.el.offsetWidth, h: it.el.offsetHeight }));
    const clampBox = (b: Box) => {
      b.x = Math.min(Math.max(b.x, x0 + b.w / 2), Math.max(x0 + b.w / 2, x1 - b.w / 2));
      b.y = Math.min(Math.max(b.y, y0 + b.h / 2), Math.max(y0 + b.h / 2, y1 - b.h / 2));
      return b;
    };
    // Random spots, handed out to the links in order along the key axis.
    const randomLayout = () => {
      const pts = items.map(() => ({ x: x0 + Math.random() * (x1 - x0), y: y0 + Math.random() * (y1 - y0) }));
      pts.sort((a, b) => narrow ? a.y - b.y : a.x - b.x);
      return pts.map((p, i) => clampBox({ ...p, ...sizes[i] }));
    };
    const own = (b: Box) => {
      const edgeX = Math.min(b.x - b.w / 2 - x0, x1 - b.x - b.w / 2);
      // Patches can run a little past the top/bottom of the band, so those edges count less.
      const edgeY = Math.min(b.y - b.h / 2 - y0, y1 - b.y - b.h / 2);
      let s = Math.min(edgeX * 1.4, edgeY * 2.6) + 10;
      for (const f of fixed) s = Math.min(s, gapBetween(b, f));
      return s - occupied(b) * 400;
    };
    const score = (bs: Box[]) => {
      let s = Infinity;
      for (let i = 0; i < bs.length; i++) {
        s = Math.min(s, own(bs[i]));
        for (let j = i + 1; j < bs.length; j++) s = Math.min(s, gapBetween(bs[i], bs[j]));
        if (i + 1 < bs.length) s = Math.min(s, (key(bs[i + 1]) - key(bs[i]) - minStep) * 3);
      }
      return s;
    };

    let best = randomLayout(), bestS = score(best);
    for (let r = 0; r < 60; r++) {
      const cand = randomLayout(), s = score(cand);
      if (s > bestS) { best = cand; bestS = s; }
    }
    const span = Math.max(x1 - x0, y1 - y0);
    for (let k = 0; k < 600; k++) {
      const i = (Math.random() * best.length) | 0;
      const step = span * .15 * (1 - k / 600) + 4;
      const cand = best.slice();
      cand[i] = clampBox({ ...best[i], x: best[i].x + (Math.random() - .5) * 2 * step, y: best[i].y + (Math.random() - .5) * 2 * step });
      const s = score(cand);
      if (s >= bestS) { best = cand; bestS = s; }
    }
    return best;
  }

  // ---------- colonies ----------
  /** Fade any visitor patches sitting under a link. Returns true if one had to go. */
  function clearUnder(b: Box) {
    const cells = field.rectCells(b.x - b.w / 2 - 8, b.y - b.h / 2 - 8, b.x + b.w / 2 + 8, b.y + b.h / 2 + 8);
    let hit = false;
    for (const i of cells) {
      const c = field.lab[i] !== NONE ? field.colonies[field.lab[i]] : null;
      if (c && c.kind === 'user' && !c.fadeAt) { fade(c); hit = true; }
      else if (c?.fadeAt) hit = true;
    }
    return hit;
  }

  function grow(item: Item, instant: boolean) {
    const b = item.box ?? boxOf(item.el); // the target spot, not wherever a flight has it right now
    const lim = reach * (.9 + .25 * Math.random());
    const cells = field.rectCells(b.x - b.w / 2 + 4, b.y - b.h / 2 + 4, b.x + b.w / 2 - 4, b.y + b.h / 2 - 4);
    item.colony = field.addColony('link', cells, instant ? t - lim - 1 : t, lim);
    dirty = true; kick();
  }

  /** Grow a link's patch once nothing else is under it. */
  function growWhenClear(item: Item) {
    const b = item.box ?? boxOf(item.el); // the target spot, not wherever a flight has it right now
    if (clearUnder(b)) later(FADE_TOTAL + 30, () => growWhenClear(item));
    else grow(item, reduce);
  }

  function show(item: Item, on: boolean) {
    item.el.classList.toggle('is-shown', on);
    item.el.inert = !on;
  }

  // ---------- flights ----------
  function fly(el: HTMLElement, from: Box, to: Box, delay: number, back: boolean) {
    el.getAnimations().forEach(a => a.cancel());
    if (reduce) return;
    const dx = from.x - to.x, dy = from.y - to.y;
    const len = Math.hypot(dx, dy) || 1;
    const bend = (Math.random() < .5 ? -1 : 1) * len * (.18 + .14 * Math.random());
    const cx = dx / 2 - dy / len * bend, cy = dy / 2 + dx / len * bend;
    const frames: Keyframe[] = [];
    const STEPS = 18;
    for (let s = 0; s <= STEPS; s++) {
      const u = s / STEPS, e = 1 - (1 - u) ** 3, ie = 1 - e;
      const x = ie * ie * dx + 2 * ie * e * cx, y = ie * ie * dy + 2 * ie * e * cy;
      frames.push({
        transform: `translate(${x}px, ${y}px) scale(${.5 + .5 * e})`,
        opacity: Math.min(1, u * 3.5),
      });
    }
    if (back) frames.reverse();
    const anim = el.animate(frames, { duration: FLIGHT, delay, easing: 'linear', fill: back ? 'forwards' : 'backwards' });
    if (back) anim.onfinish = () => anim.cancel();
  }

  // ---------- modes ----------
  function setToggle(open: boolean) {
    toggle.setAttribute('aria-expanded', String(open));
    toggleLabel.textContent = open ? 'BACK' : 'EXTRAS';
    toggle.classList.toggle('is-back', open);
  }

  function openExtras() {
    if (mode === 'extras') return;
    mode = 'extras'; gen++;
    setToggle(true);
    for (const it of mains) { show(it, false); fade(it.colony); it.colony = null; }
    const tb = boxOf(toggle);
    const boxes = layoutBoxes(extras, [tb]);
    const settle = FADE_TOTAL + 30;
    extras.forEach((it, i) => {
      it.box = boxes[i];
      place(it.el, boxes[i]);
      show(it, true);
      const delay = FLIGHT_DELAY + i * FLIGHT_STAGGER;
      fly(it.el, tb, boxes[i], delay, false);
      later(reduce ? settle : Math.max(delay + FLIGHT, settle), () => growWhenClear(it));
    });
  }

  function closeExtras() {
    if (mode === 'main') return;
    mode = 'main'; gen++;
    setToggle(false);
    const tb = boxOf(toggle);
    extras.forEach((it, i) => {
      show(it, false);
      if (it.box) fly(it.el, tb, it.box, i * 40, true);
      fade(it.colony); it.colony = null;
    });
    if (!mains[0].box) {
      const boxes = layoutBoxes(mains, [tb]);
      mains.forEach((it, i) => it.box = boxes[i]);
    }
    mains.forEach((it, i) => {
      place(it.el, it.box!);
      later(FADE_TOTAL * .6 + i * MAIN_STAGGER, () => { show(it, true); growWhenClear(it); });
    });
  }

  toggle.addEventListener('click', e => {
    if (mode === 'main') {
      openExtras();
      // Keyboard users land on the first Extras link.
      if (e.detail === 0) setTimeout(() => extras[0].el.focus(), reduce ? 0 : FLIGHT_DELAY + FLIGHT);
    } else closeExtras();
  });
  root.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mode === 'extras') { closeExtras(); toggle.focus(); }
  });

  // ---------- visitor patches ----------
  canvas.addEventListener('pointerdown', e => {
    if (!renderer || e.button !== 0) return;
    const o = root.getBoundingClientRect();
    const x = e.clientX - o.left, y = e.clientY - o.top;
    const i = field.cellAt(x, y);
    if (i < 0 || field.logoDist[i] < gap + 4) return;
    const L = field.lab[i];
    if (L !== NONE) {
      const c = field.colonies[L];
      if (c && !c.fadeAt && field.T[i] <= t + 1 && field.T[i] - c.start <= c.lim) return; // already lichen here
    }
    const live = userColonies.filter(c => !c.fadeAt);
    if (live.length >= MAX_USER) fade(live[0]);
    const lim = reach * (.75 + .35 * Math.random());
    const c = field.addColony('user', field.discCells(x, y, field.cs * 1.5), reduce ? t - lim - 1 : t, lim);
    if (c) { userColonies.push(c); dirty = true; kick(); }
  });

  // ---------- build ----------
  function buildLogoMask() {
    const r = logo.getBoundingClientRect(), o = root.getBoundingClientRect();
    logoBox = { l: r.left - o.left, t: r.top - o.top, r: r.right - o.left, b: r.bottom - o.top };
    const { gw, gh, cs } = field;
    const mask = new Uint8Array(gw * gh);
    try {
      const c = document.createElement('canvas');
      c.width = gw; c.height = gh;
      const ctx = c.getContext('2d', { willReadFrequently: true })!;
      ctx.drawImage(logo, logoBox.l / cs + .5, logoBox.t / cs + .5, r.width / cs, r.height / cs);
      const px = ctx.getImageData(0, 0, gw, gh).data;
      for (let i = 0; i < mask.length; i++) mask[i] = px[i * 4 + 3] > 60 ? 1 : 0;
    } catch {
      // Fall back to the logo's bounding box.
      for (const i of field.rectCells(logoBox.l, logoBox.t, logoBox.r, logoBox.b)) mask[i] = 1;
    }
    field.setLogoMask(mask, gap);
  }

  /** Lay everything out. `animate` grows patches in; otherwise they appear grown. */
  function build(animate: boolean) {
    gen++;
    pending = [];
    W = root.clientWidth; H = root.clientHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    const s = Math.min(W, H);
    reach = Math.max(55, Math.min(130, s * .12));
    rate = reach / 3.2;
    cell = Math.max(9, Math.min(14, s * .013));
    gap = Math.max(14, Math.min(26, s * .025));
    seed = (Math.random() * 1e6) | 0;
    field = new LichenField(W, H, 3, seed);
    field.margin = cell * 2;
    t = 0;
    userColonies = [];
    buildLogoMask();
    const instant = !animate || reduce;

    const shownMains = [...mains, toggleItem];
    const boxes = layoutBoxes(shownMains, []);
    shownMains.forEach((it, i) => { it.box = boxes[i]; place(it.el, boxes[i]); it.colony = null; });
    extras.forEach(it => { it.colony = null; });

    if (mode === 'extras') {
      mains.forEach(it => show(it, false));
      const eb = layoutBoxes(extras, [toggleItem.box!]);
      extras.forEach((it, i) => { it.box = eb[i]; place(it.el, eb[i]); show(it, true); grow(it, true); });
      grow(toggleItem, true);
      show(toggleItem, true);
    } else {
      extras.forEach(it => show(it, false));
      shownMains.forEach((it, i) => {
        if (instant) { show(it, true); grow(it, true); }
        else later(250 + i * MAIN_STAGGER, () => { show(it, true); grow(it, false); });
      });
    }
    dirty = true; kick();
  }

  // ---------- sounds (same blips as the site nav) ----------
  let ac: AudioContext | null = null;
  function blip(f0: number, f1: number, vol: number, dur: number) {
    try {
      ac ??= new AudioContext();
      const osc = ac.createOscillator(), g = ac.createGain();
      osc.connect(g); g.connect(ac.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f0, ac.currentTime);
      osc.frequency.exponentialRampToValueAtTime(f1, ac.currentTime + dur * .8);
      g.gain.setValueAtTime(vol, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + dur);
      osc.start(ac.currentTime); osc.stop(ac.currentTime + dur);
    } catch { /* audio is optional */ }
  }
  [...mains, ...extras, toggleItem].forEach(({ el }) => {
    el.addEventListener('mouseenter', () => blip(880, 660, .12, .1));
    el.addEventListener('click', () => blip(400, 80, .25, .15));
  });

  let rz = 0, lastW = 0, lastH = 0;
  window.addEventListener('resize', () => {
    clearTimeout(rz);
    rz = window.setTimeout(() => {
      if (root.clientWidth === lastW && root.clientHeight === lastH) return;
      lastW = root.clientWidth; lastH = root.clientHeight;
      mains.forEach(it => it.box = null);
      build(false);
    }, 250);
  });

  const ready = Promise.all([
    document.fonts?.ready ?? Promise.resolve(),
    logo.complete ? Promise.resolve() : logo.decode().catch(() => {}),
  ]);
  ready.then(() => { lastW = root.clientWidth; lastH = root.clientHeight; build(true); });
}
