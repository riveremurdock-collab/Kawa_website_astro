// Build-time GPX helpers for the photo book route (BookRoute.astro).
// Everything here runs during the build — the browser only ever receives
// the finished SVG path and the stat numbers.

import fs from 'node:fs';
import path from 'node:path';

type Point = { lat: number; lon: number; ele: number | null };

/** Read a GPX from public/ (e.g. "/gpx/ha-giang-loop.gpx") and return its track points. */
export function readGpx(publicPath: string): Point[] {
  const file = path.join(process.cwd(), 'public', publicPath.replace(/^\//, ''));
  if (!fs.existsSync(file)) {
    throw new Error(`BookRoute: no GPX file at public${publicPath} — put the .gpx in public/gpx/ and write gpxFile="/gpx/your-file.gpx".`);
  }
  const xml = fs.readFileSync(file, 'utf-8');
  const points: Point[] = [];
  const re = /<trkpt\s+lat=["']([^"']+)["']\s+lon=["']([^"']+)["'][^>]*>([\s\S]*?)<\/trkpt>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    const ele = m[3].match(/<ele>([^<]+)<\/ele>/);
    points.push({ lat: parseFloat(m[1]), lon: parseFloat(m[2]), ele: ele ? parseFloat(ele[1]) : null });
  }
  if (points.length < 2) {
    throw new Error(`BookRoute: found fewer than two <trkpt> points in public${publicPath}.`);
  }
  return points;
}

function haversine(a: Point, b: Point): number {
  const R = 6371e3;
  const rad = (x: number) => (x * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/**
 * Total distance (m) and total climbing (m).
 *
 * Raw GPX elevation is noisy — summing every tiny rise roughly doubles the
 * real figure. Elevation is averaged over a 300 m window of distance, and a
 * rise only counts once it's more than 5 m above the last low point. Tuned
 * against a bike computer on the Ha Giang loop (13,037 ft vs ~13,100 ft).
 */
export function routeStats(points: Point[]) {
  const cum = [0];
  for (let i = 1; i < points.length; i++) cum.push(cum[i - 1] + haversine(points[i - 1], points[i]));
  const distance = cum[cum.length - 1];

  const withEle = points.map((p, i) => ({ d: cum[i], e: p.ele })).filter(p => p.e !== null) as { d: number; e: number }[];
  let climbing = 0;
  if (withEle.length > 1) {
    const WINDOW = 300;
    const THRESHOLD = 5;
    const smoothed: number[] = [];
    let lo = 0, hi = 0, sum = 0;
    for (let i = 0; i < withEle.length; i++) {
      while (hi < withEle.length && withEle[hi].d <= withEle[i].d + WINDOW / 2) sum += withEle[hi++].e;
      while (withEle[lo].d < withEle[i].d - WINDOW / 2) sum -= withEle[lo++].e;
      smoothed.push(sum / (hi - lo));
    }
    let ref = smoothed[0];
    for (const e of smoothed) {
      if (e - ref > THRESHOLD) { climbing += e - ref; ref = e; }
      else if (ref - e > THRESHOLD) ref = e;
    }
  }
  return { distance, climbing };
}

/**
 * Project the track to flat x/y (lon scaled by cos(lat), fine at trip scale),
 * thin it to a few hundred points, and return an SVG path plus its viewBox.
 * North is up; the viewBox is the route's own bounding box, so the SVG can be
 * scaled into any cell with preserveAspectRatio.
 */
export function routeSvg(points: Point[]) {
  const midLat = points.reduce((s, p) => s + p.lat, 0) / points.length;
  const k = Math.cos((midLat * Math.PI) / 180);
  const xy = points.map(p => [p.lon * k, -p.lat] as [number, number]);

  const xs = xy.map(p => p[0]);
  const ys = xy.map(p => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const span = Math.max(maxX - minX, maxY - minY);

  // Normalise to a 1000-unit box so the numbers in the path stay short.
  const scale = 1000 / span;
  const norm = xy.map(([x, y]) => [(x - minX) * scale, (y - minY) * scale] as [number, number]);
  const simplified = simplify(norm, 1.2);

  const d = simplified
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join('');
  const w = (maxX - minX) * scale;
  const h = (maxY - minY) * scale;
  return { d, viewBox: `0 0 ${w.toFixed(1)} ${h.toFixed(1)}` };
}

/** Ramer–Douglas–Peucker line simplification (iterative, so long tracks can't overflow the stack). */
function simplify(pts: [number, number][], tolerance: number): [number, number][] {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack: [number, number][] = [[0, pts.length - 1]];
  while (stack.length) {
    const [start, end] = stack.pop()!;
    const [ax, ay] = pts[start];
    const [bx, by] = pts[end];
    const dx = bx - ax, dy = by - ay;
    const len = Math.hypot(dx, dy);
    let maxDist = 0, index = -1;
    for (let i = start + 1; i < end; i++) {
      // A loop's start and end can be the same point — then measure from it directly.
      const dist = len < 1e-9
        ? Math.hypot(pts[i][0] - ax, pts[i][1] - ay)
        : Math.abs(dy * pts[i][0] - dx * pts[i][1] + bx * ay - by * ax) / len;
      if (dist > maxDist) { maxDist = dist; index = i; }
    }
    if (maxDist > tolerance && index !== -1) {
      keep[index] = 1;
      stack.push([start, index], [index, end]);
    }
  }
  return pts.filter((_, i) => keep[i]);
}
