// WebGL2 renderer for the lichen field. Draws only the lichen (and its soft
// shadow) with premultiplied alpha, so the sandstone photo behind the canvas
// shows through everywhere else.

import { MAX_COLONIES, type LichenField } from './field';

const VS = `#version 300 es
void main(){ vec2 p = vec2(float((gl_VertexID<<1)&2), float(gl_VertexID&2)); gl_Position = vec4(p*2.0-1.0, 0.0, 1.0); }`;

// Areoles are a Voronoi tiling. Each tile looks up the field at its own
// center to decide when it appears, how big it gets and what colour it is,
// so a tile always renders whole and in one colony's state. Shapes are signed
// distances anti-aliased to the pixel, and lighting uses analytic normals
// (no dFdx), which is what keeps them from looking pixelated.
const FS = `#version 300 es
precision highp float;
precision highp int;
precision highp usampler2D;
uniform sampler2D uField;
uniform usampler2D uLab;
uniform vec4 uCol[${MAX_COLONIES}];
uniform vec2 uGrid, uLight;
uniform float uCanvasH, uDpr, uCs, uSeed, uCell, uGap;
uniform int uSS;
out vec4 outColor;

float h12(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*.1031 + uSeed); p3 += dot(p3, p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
vec2 h22(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*vec3(.1031,.1030,.0973) + uSeed); p3 += dot(p3, p3.yzx+33.33); return fract((p3.xx+p3.yz)*p3.zy); }
float vn(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(h12(i), h12(i+vec2(1,0)), u.x), mix(h12(i+vec2(0,1)), h12(i+vec2(1,1)), u.x), u.y); }

// Field sample, blended by hand over the four nearest cells. Each cell stores
// its arrival time relative to its own colony's start, so blending those raw
// values across a border between colonies would mix two clocks and show a
// stair-stepped line. Converting each cell to "time since lichen arrived
// here" first keeps the blend continuous wherever colonies meet.
// Returns (time since arrival, warp x, logo distance, warp y).
vec4 fld(vec2 p){
  vec2 u = p/uCs;
  ivec2 b = ivec2(floor(u)), mx = ivec2(uGrid) - 1;
  ivec2 c0 = clamp(b, ivec2(0), mx), c1 = clamp(b + ivec2(1, 0), ivec2(0), mx);
  ivec2 c2 = clamp(b + ivec2(0, 1), ivec2(0), mx), c3 = clamp(b + 1, ivec2(0), mx);
  uint l0 = texelFetch(uLab, c0, 0).r, l1 = texelFetch(uLab, c1, 0).r;
  uint l2 = texelFetch(uLab, c2, 0).r, l3 = texelFetch(uLab, c3, 0).r;
  // Fast path (almost everywhere): one colony, so the hardware blend is exact.
  if(l0 == l1 && l0 == l2 && l0 == l3){
    vec4 T = texture(uField, (u + .5)/uGrid);
    T.r = l0 == 255u ? -9999. : uCol[l0].x - T.r;
    return T;
  }
  vec2 fr = u - floor(u);
  vec4 T0 = texelFetch(uField, c0, 0), T1 = texelFetch(uField, c1, 0);
  vec4 T2 = texelFetch(uField, c2, 0), T3 = texelFetch(uField, c3, 0);
  T0.r = l0 == 255u ? -9999. : uCol[l0].x - T0.r;
  T1.r = l1 == 255u ? -9999. : uCol[l1].x - T1.r;
  T2.r = l2 == 255u ? -9999. : uCol[l2].x - T2.r;
  T3.r = l3 == 255u ? -9999. : uCol[l3].x - T3.r;
  return mix(mix(T0, T1, fr.x), mix(T2, T3, fr.x), fr.y);
}
// Age of lichen at a spot, held once its colony has reached full size.
float capAge(float since, vec4 C){ return since - max(0., C.x - C.y); }
uint labAt(vec2 p){
  ivec2 c = clamp(ivec2(floor(p/uCs + .5)), ivec2(0), ivec2(uGrid) - 1);
  return texelFetch(uLab, c, 0).r;
}
vec4 over(vec4 top, vec4 bot){ return top + bot*(1. - top.a); }
vec2 cellPt(vec2 c){ return c + .04 + .92*h22(c); }

vec4 shadeAt(vec2 p){
  vec4 F = fld(p);
  uint Lp = labAt(p);
  vec4 res = vec4(0);

  // Soft shadow on the rock, cast away from the light.
  vec2 sp = p + normalize(uLight)*uCell*.3;
  uint Ls = labAt(sp);
  if(Ls != 255u){
    vec4 Cs = uCol[Ls]; vec4 Fs = fld(sp);
    float a = smoothstep(0., uCell*.9, capAge(Fs.r, Cs)) * smoothstep(uGap, uGap + uCell, Fs.b) * Cs.w;
    res = vec4(0, 0, 0, .3*a);
  }
  if(Lp == 255u) return res;

  // Voronoi with exact border distance (two passes). A two-scale warp
  // (precomputed in the field) stretches and squeezes the tiling, so areoles
  // vary in size and shape and the underlying grid never lines up.
  vec2 warp = F.ga;
  vec2 q = p/uCell + warp;
  vec2 n = floor(q), f = fract(q);
  vec2 mg = vec2(0), mr = vec2(0); float md = 8.;
  for(int j=-1;j<=1;j++) for(int i=-1;i<=1;i++){
    vec2 g = vec2(i,j); vec2 r = cellPt(n+g) - n - f; float d = dot(r,r);
    if(d < md){ md = d; mr = r; mg = g; }
  }
  // Each pair of neighbours gets its own crack width: mostly thin, a few
  // a little wider, and about half fused with no crack at all. bd is the
  // distance to the nearest crack edge, so it already includes the width.
  vec2 id = n + mg;
  float bd = 8.; vec2 nb = vec2(1,0);
  for(int j=-2;j<=2;j++) for(int i=-2;i<=2;i++){
    vec2 g = mg + vec2(i,j); vec2 r = cellPt(n+g) - n - f;
    vec2 dr = r - mr;
    if(dot(dr,dr) > 1e-5){
      float hp = h12(id + n + g + .37);   // same value seen from either side
      float cw = hp < .5 ? -.12 : .008 + .045*pow((hp - .5)/.5, 2.2);
      float d = dot(.5*(mr + r), normalize(dr)) - cw;
      if(d < bd){ bd = d; nb = normalize(dr); }
    }
  }
  float F1 = length(mr);
  vec2 cp = (cellPt(id) - warp)*uCell;   // tile center in page px

  // Pixel-level: dark crust between mature areoles. It reads the pixel's own
  // colony, so where two patches touch the crust runs straight across.
  vec4 Cp = uCol[Lp];
  float ageP = capAge(F.r, Cp);
  float terr = smoothstep(0., uCell*.6, ageP) * smoothstep(uGap - 1., uGap + .5, F.b) * Cp.w;

  uint L = labAt(cp);
  if(L == 255u) return res;
  vec4 C = uCol[L]; vec4 Fc = fld(cp);
  float hj = h12(id+7.1), hj2 = h12(id+3.3), hj3 = h12(id+11.7), hj4 = h12(id+5.9), hj5 = h12(id+1.3), hj6 = h12(id+9.4);

  float age = capAge(Fc.r, C);
  float ageJ = age - uCell*.7*hj;
  float grow = smoothstep(0., uCell*1.8, ageJ);
  // Tiles shrink away from the logo, leaving a clean edge.
  float room = smoothstep(uGap, uGap + .7*uCell, Fc.b);
  // The circle radius is a bit under half a tile, so it rounds the tile's
  // corners off and areoles read as puffy lobes rather than flat polygons.
  float rad = ageJ > 0. ? mix(.12, .5 + .26*hj2, grow) * room : 0.;
  float sdf = max(-bd, F1 - rad);
  float aa = .75/(uCell*uDpr);
  float cov = (1. - smoothstep(-aa, aa, sdf)) * smoothstep(uGap - 1., uGap + .5, F.b);

  // Colour by maturity: orange at the young rim, light green behind it, grey in the old middle.
  float m = clamp(age/max(C.y, 1.), 0., 1.);
  float mj = m + .28*(hj3 - .5) + .5*(vn(cp*.011 + 3.) - .5) + .22*(vn(cp*.045 + 8.) - .5);
  vec3 col = mix(vec3(.84,.30,.04), vec3(.98,.52,.12), hj4);
  vec3 green = mix(vec3(.78,.83,.50), vec3(.89,.91,.70), hj4);
  vec3 grey = mix(vec3(.66,.68,.64), vec3(.80,.81,.77), hj4);
  col = mix(col, green, smoothstep(.46, .66, mj));
  col = mix(col, grey, smoothstep(.74, .94, mj));
  // scattered pale areoles in the orange, like the logo
  col = mix(col, green, step(hj5, .07) * step(.1, m) * (1. - smoothstep(.55, .75, mj)) * .85);
  col *= .9 + .2*vn(p*.3 + 5.);

  // Shading: a dome over the whole areole, a steeper roll-off into the
  // crack, and fine lumps on top (analytic slopes, no screen derivatives).
  float inner = -sdf;
  float rim = 1. - smoothstep(0., .16, inner);
  vec2 toC = -mr/max(F1, 1e-4);            // outward from the areole center
  float x = clamp(F1/max(rad, .08), 0., .97);
  vec2 slope = toC * x/sqrt(1. - x*x + .12) * .55;
  vec2 edgeDir = (-bd > F1 - rad) ? nb : toC;
  slope += edgeDir * rim * 1.5;
  vec2 bp = p*.42 + id*3.1;
  float b0 = vn(bp);
  slope += vec2(vn(bp + vec2(.5, 0)) - b0, vn(bp + vec2(0, .5)) - b0) * -1.4;
  // Many areoles have a shallow cup in the top: a darker shade of their own
  // colour, sloping down into the middle, with a slightly raised lip.
  float fr = (.17 + .13*hj) * rad/.6;
  float cup = (hj6 < .45 && grow > .7) ? 1. - smoothstep(fr - aa, fr + aa, F1) : 0.;
  float lip = (hj6 < .45 && grow > .7) ? (1. - smoothstep(0., fr*.45, abs(F1 - fr*1.08))) : 0.;
  slope = mix(slope, -toC * (F1/max(fr, .01)) * 1.2 + slope*.25, cup);
  col = mix(col, col * mix(vec3(.6), vec3(.74), col), cup);   // same hue, darker and a touch richer
  col *= 1. + .1*lip;
  vec3 N = normalize(vec3(slope, 1.));
  vec3 Ld = normalize(vec3(uLight, .85));
  float dif = max(dot(N, Ld), 0.);
  col *= .48 + .66*dif;
  col *= mix(.62, 1., smoothstep(0., .14, inner));

  vec3 hv = normalize(Ld + vec3(0,0,1));
  col += pow(max(dot(N, hv), 0.), 22.)*.1*(1. - rim);

  // Colony fade: drain to grey, then out.
  float lum = dot(col, vec3(.3,.59,.11));
  col = mix(col, vec3(lum)*vec3(.95,.96,.93), C.z);
  cov *= C.w;

  float crust = terr * smoothstep(.3, .9, grow) * room * (.5 + .4*vn(p*.09 + 2.));
  vec4 lay = over(vec4(vec3(.11,.075,.05)*crust, crust), res);
  return over(vec4(col*cov, cov), lay);
}

void main(){
  vec4 acc = vec4(0);
  vec2 base = floor(gl_FragCoord.xy);
  for(int sy = 0; sy < 2; sy++) for(int sx = 0; sx < 2; sx++){
    if(sx >= uSS || sy >= uSS) continue;
    vec2 off = uSS == 1 ? vec2(.5) : (vec2(sx, sy) + .5)*.5;
    vec2 fc = base + off;
    vec2 p = vec2(fc.x, uCanvasH - fc.y)/uDpr;
    acc += shadeAt(p);
  }
  outColor = acc/float(uSS*uSS);
}`;

export interface ColonyUniform { since: number; lim: number; grey: number; alpha: number; }

export class LichenRenderer {
  readonly gl: WebGL2RenderingContext;
  private prog: WebGLProgram;
  private U: Record<string, WebGLUniformLocation | null> = {};
  private vao: WebGLVertexArrayObject;
  private fieldTex: WebGLTexture;
  private labTex: WebGLTexture;
  private packBuf = new Float32Array(0);
  private colBuf = new Float32Array(MAX_COLONIES * 4);
  private gw = 0; private gh = 0; private cs = 1;

  static create(canvas: HTMLCanvasElement): LichenRenderer | null {
    const gl = canvas.getContext('webgl2', { antialias: false, premultipliedAlpha: true, alpha: true });
    if (!gl) return null;
    try { return new LichenRenderer(gl); } catch (err) { console.error(err); return null; }
  }

  private constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || 'link');
    this.prog = prog;
    ['uField', 'uLab', 'uCol', 'uGrid', 'uLight', 'uCanvasH', 'uDpr', 'uCs', 'uSeed', 'uCell', 'uGap', 'uSS']
      .forEach(n => this.U[n] = gl.getUniformLocation(prog, n));
    this.vao = gl.createVertexArray()!;
    const mk = (filter: number) => {
      const t = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return t;
    };
    this.fieldTex = mk(gl.LINEAR);
    this.labTex = mk(gl.NEAREST);
  }

  upload(field: LichenField) {
    const gl = this.gl;
    const N = field.gw * field.gh;
    if (this.packBuf.length !== N * 4) this.packBuf = new Float32Array(N * 4);
    field.pack(this.packBuf);
    this.gw = field.gw; this.gh = field.gh; this.cs = field.cs;
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.bindTexture(gl.TEXTURE_2D, this.fieldTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, field.gw, field.gh, 0, gl.RGBA, gl.FLOAT, this.packBuf);
    gl.bindTexture(gl.TEXTURE_2D, this.labTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8UI, field.gw, field.gh, 0, gl.RED_INTEGER, gl.UNSIGNED_BYTE, field.lab);
  }

  draw(opts: {
    colonies: (ColonyUniform | null)[]; dpr: number; seed: number; cell: number; gap: number;
    light: [number, number]; supersample: boolean;
  }) {
    const gl = this.gl, U = this.U, canvas = gl.canvas as HTMLCanvasElement;
    const cb = this.colBuf; cb.fill(0);
    opts.colonies.forEach((c, i) => {
      if (!c) return;
      cb[i * 4] = c.since; cb[i * 4 + 1] = c.lim; cb[i * 4 + 2] = c.grey; cb[i * 4 + 3] = c.alpha;
    });
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.prog);
    gl.bindVertexArray(this.vao);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.fieldTex);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, this.labTex);
    gl.uniform1i(U.uField, 0);
    gl.uniform1i(U.uLab, 1);
    gl.uniform4fv(U.uCol, cb);
    gl.uniform2f(U.uGrid, this.gw, this.gh);
    gl.uniform2f(U.uLight, opts.light[0], opts.light[1]);
    gl.uniform1f(U.uCanvasH, canvas.height);
    gl.uniform1f(U.uDpr, opts.dpr);
    gl.uniform1f(U.uCs, this.cs);
    gl.uniform1f(U.uSeed, opts.seed);
    gl.uniform1f(U.uCell, opts.cell);
    gl.uniform1f(U.uGap, opts.gap);
    gl.uniform1i(U.uSS, opts.supersample ? 2 : 1);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}
