(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const or=["image/jpeg","image/png","image/webp"],sr=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp",Dn=100*1024*1024,_n=5e7;class Se extends Error{constructor(t){super(t),this.name="UploadError"}}const lr={jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",webp:"image/webp"};function ur(e){if(e.type)return e.type.toLowerCase();const t=e.name.split(".").pop()?.toLowerCase()??"";return lr[t]??""}function Nn(e){return`${(e/1e6).toFixed(1)} MP`}async function cr(e){try{return await createImageBitmap(e,{imageOrientation:"from-image",premultiplyAlpha:"none"})}catch{const t=URL.createObjectURL(e);try{const n=new Image;return n.src=t,await n.decode(),await createImageBitmap(n)}finally{URL.revokeObjectURL(t)}}}async function dr(e){const t=ur(e);if(t==="image/heic"||t==="image/heif"||/\.hei[cf]$/i.test(e.name))throw new Se("HEIC photos can't be opened in the browser. Export the photo as JPG first, then upload it.");if(!or.includes(t))throw new Se(`"${e.name}" isn't a supported image. Use a JPG, PNG, or WebP file.`);if(e.size>Dn){const a=Math.round(e.size/1048576);throw new Se(`This file is ${a} MB. The maximum is ${Dn/(1024*1024)} MB.`)}let n;try{n=await cr(e)}catch{throw new Se(`"${e.name}" couldn't be opened. The file may be damaged.`)}const i=n.width*n.height;if(i>_n){const{width:a,height:r}=n;throw n.close(),new Se(`This image is ${a} × ${r} (${Nn(i)}). The maximum is ${Nn(_n)}. Resize it and try again.`)}return n}function hr(e){const t=e.lastIndexOf(".");return t>0?e.slice(0,t):e}class mr{image=null;version=0;listeners=new Set;get(){return this.image}set(t,n){this.image?.bitmap.close(),this.image={fileName:t,bitmap:n,width:n.width,height:n.height,version:++this.version};for(const i of this.listeners)i(this.image);return this.image}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}}const B=4;function ne(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function ge(e){const t=Math.min(1,Math.max(0,e));return t<=.0031308?t*12.92:1.055*Math.pow(t,1/2.4)-.055}function Ji(e){return{r:ne(e.r/255),g:ne(e.g/255),b:ne(e.b/255)}}function Zi(e){return{r:Math.round(ge(e.r)*255),g:Math.round(ge(e.g)*255),b:Math.round(ge(e.b)*255)}}const Be={x:.95047,y:1,z:1.08883};function pr(e){return{x:.4124564*e.r+.3575761*e.g+.1804375*e.b,y:.2126729*e.r+.7151522*e.g+.072175*e.b,z:.0193339*e.r+.119192*e.g+.9503041*e.b}}function zt(e){return e>.008856?Math.cbrt(e):7.787*e+16/116}function fr(e){const t=zt(e.x/Be.x),n=zt(e.y/Be.y),i=zt(e.z/Be.z);return{l:116*n-16,a:500*(t-n),b:200*(n-i)}}function Qi(e){return fr(pr(e))}function Dt(e){return Qi(Ji(e))}function ie(e){const t=/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i.exec(e.trim());if(!t||!t[1])return null;let n=t[1];n.length===3&&(n=n.split("").map(a=>a+a).join(""));const i=parseInt(n,16);return{r:i>>16&255,g:i>>8&255,b:i&255}}function Ee(e){const t=n=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,"0");return`#${t(e.r)}${t(e.g)}${t(e.b)}`}function Wt(e){return e>.206893?e*e*e:(e-16/116)/7.787}function gr(e){const t=(e.l+16)/116,n=Be.x*Wt(t+e.a/500),i=Be.y*Wt(t),a=Be.z*Wt(t-e.b/200);return{r:3.2404542*n-1.5371385*i-.4985314*a,g:-.969266*n+1.8760108*i+.041556*a,b:.0556434*n-.2040259*i+1.0572252*a}}function Fn(e){return Zi(gr(e))}function vr(e){const t=Math.cbrt(.4122214708*e.r+.5363325363*e.g+.0514459929*e.b),n=Math.cbrt(.2119034982*e.r+.6806995451*e.g+.1073969566*e.b),i=Math.cbrt(.0883024619*e.r+.2817188376*e.g+.6299787005*e.b);return{l:.2104542553*t+.793617785*n-.0040720468*i,a:1.9779984951*t-2.428592205*n+.4505937099*i,b:.0259040371*t+.7827717662*n-.808675766*i}}function $n(e){const t=(e.l+.3963377774*e.a+.2158037573*e.b)**3,n=(e.l-.1055613458*e.a-.0638541728*e.b)**3,i=(e.l-.0894841775*e.a-1.291485548*e.b)**3;return{r:4.0767416621*t-3.3077115913*n+.2309699292*i,g:-1.2684380046*t+2.6097574011*n-.3413193965*i,b:-.0041960863*t-.7034186147*n+1.707614701*i}}function pn(e){const t=vr(Ji(e));return{l:t.l,c:Math.hypot(t.a,t.b),h:(Math.atan2(t.b,t.a)*180/Math.PI+360)%360}}function xt(e){const t=Math.min(1,Math.max(0,e.l)),n=e.h*Math.PI/180,i=r=>{const o=$n({l:t,a:r*Math.cos(n),b:r*Math.sin(n)});return o.r>=-1e-4&&o.g>=-1e-4&&o.b>=-1e-4&&o.r<=1.0001&&o.g<=1.0001&&o.b<=1.0001};let a=Math.max(0,e.c);if(!i(a)){let r=0,o=a;for(let s=0;s<24;s++){const l=(r+o)/2;i(l)?r=l:o=l}a=r}return Zi($n({l:t,a:a*Math.cos(n),b:a*Math.sin(n)}))}const br=[{id:"complementary",label:"Complementary",count:2},{id:"analogous",label:"Analogous",count:3},{id:"triad",label:"Triad",count:3},{id:"square",label:"Square",count:4},{id:"monotone",label:"Monotone",count:3},{id:"cmyk",label:"CMYK analog",count:4}],kr=[{name:"Medium Blue",hex:"#3255a4"},{name:"Fluorescent Pink",hex:"#ff48b0"},{name:"Yellow",hex:"#ffe800"},{name:"Black",hex:"#000000"}];function xr(e,t){if(e==="cmyk")return kr.map(a=>a.hex);const n=pn(ie(t)??{r:0,g:120,b:191}),i=a=>Ee(xt({...n,h:(n.h+a+360)%360}));switch(e){case"complementary":return[t,i(180)];case"analogous":return[t,i(-30),i(30)];case"triad":return[t,i(120),i(240)];case"square":return[t,i(90),i(180),i(270)];case"monotone":return[t,Ee(xt({l:Math.min(.95,n.l+.25),c:n.c*.55,h:n.h})),Ee(xt({l:Math.max(.12,n.l-.25),c:n.c*.9,h:n.h}))]}}function yr(e){const t=pn(ie(e)??{r:255,g:255,b:255});return Ee(xt({l:.95,c:Math.min(t.c,.035),h:t.h}))}function Sr(e,t,n){const i=xr(e,t);if(!n)return{inks:i,paper:null};const a=e==="cmyk"?-1:0;let r=-1,o=-1/0;i.forEach((l,u)=>{if(u===a)return;const c=pn(ie(l)).l;c>o&&(o=c,r=u)});const s=i[r];return{inks:i.filter((l,u)=>u!==r),paper:s?yr(s):null}}function ve(e){let t=e>>>0;return function(){t|=0,t=t+1831565813|0;let i=Math.imul(t^t>>>15,1|t);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}}function wr(e){const t=e.map(([i,a])=>[Math.min(1,Math.max(0,i)),Math.min(1,Math.max(0,a))]).sort((i,a)=>i[0]-a[0]),n=[];for(const i of t)n.length&&Math.abs(n[n.length-1][0]-i[0])<1e-6?n[n.length-1]=i:n.push(i);return n.length===0?[[0,0],[1,1]]:n}function Te(e,t){const n=wr(e),i=n.length,a=new Float32Array(t);if(i===1)return a.fill(n[0][1]);const r=[];for(let l=0;l<i-1;l++)r.push((n[l+1][1]-n[l][1])/Math.max(1e-9,n[l+1][0]-n[l][0]));const o=[r[0]];for(let l=1;l<i-1;l++)o.push(r[l-1]*r[l]<=0?0:(r[l-1]+r[l])/2);o.push(r[i-2]);for(let l=0;l<i-1;l++){if(r[l]===0){o[l]=0,o[l+1]=0;continue}const u=o[l]/r[l],c=o[l+1]/r[l],h=u*u+c*c;if(h>9){const f=3/Math.sqrt(h);o[l]=f*u*r[l],o[l+1]=f*c*r[l]}}let s=0;for(let l=0;l<t;l++){const u=l/(t-1);if(u<=n[0][0]){a[l]=n[0][1];continue}if(u>=n[i-1][0]){a[l]=n[i-1][1];continue}for(;s<i-2&&u>n[s+1][0];)s++;const[c,h]=n[s],[f,d]=n[s+1],m=f-c,p=(u-c)/m,g=p*p,v=g*p;a[l]=(2*v-3*g+1)*h+(v-2*g+p)*m*o[s]+(-2*v+3*g)*d+(v-g)*m*o[s+1],a[l]=Math.min(1,Math.max(0,a[l]))}return a}function rt(){return[{kind:"number",key:"maxDot",label:"Maximum dot size",perInk:!0,default:100,min:10,max:100,step:1,unit:"%"},{kind:"select",key:"shape",label:"Dot shape",default:"round",options:[{value:"round",label:"Round"},{value:"square",label:"Square"},{value:"ellipse",label:"Ellipse"},{value:"diamond",label:"Diamond"},{value:"line",label:"Line"}]},{kind:"curve",key:"curve",label:"Dot size curve",default:[[0,0],[1,1]]}]}function Er(e,t,n){switch(e){case"round":return t*t+n*n;case"square":return Math.max(Math.abs(t),Math.abs(n));case"ellipse":return t*t+n/.65*(n/.65);case"diamond":return Math.abs(t)+Math.abs(n);case"line":return Math.abs(n)}}const ot=`
uniform vec4 uLatSize;        // cell size per ink, output px
uniform vec4 uLatAngle;       // radians per ink
uniform vec4 uLatMaxDot;
uniform vec4 uLatMinFrac;
uniform int uLatRoundUp;
uniform int uLatShape;        // 0 round, 1 square, 2 ellipse, 3 diamond, 4 line
uniform sampler2D uLatCurve;  // dot size curve
uniform sampler2D uLatCdf;    // 256 × 1, R32F: tone → spot threshold

vec2 latRotate(vec2 v, float a) {
  float c = cos(a), s = sin(a);
  return vec2(c * v.x - s * v.y, s * v.x + c * v.y);
}

float latTone(int ink, float c) {
  c = texture(uLatCurve, vec2((clamp(c, 0.0, 1.0) * 255.0 + 0.5) / 256.0, 0.5)).r * uLatMaxDot[ink];
  if (c < uLatMinFrac[ink]) c = (uLatRoundUp == 1 && c > 0.02) ? uLatMinFrac[ink] : 0.0;
  return c;
}

float latSpot(vec2 d) {
  if (uLatShape == 1) return max(abs(d.x), abs(d.y));
  if (uLatShape == 2) return d.x * d.x + (d.y / 0.65) * (d.y / 0.65);
  if (uLatShape == 3) return abs(d.x) + abs(d.y);
  if (uLatShape == 4) return abs(d.y);
  return dot(d, d);
}

float latThreshold(float c) {
  float x = clamp(c, 0.0, 1.0) * 255.0;
  int i = int(floor(x));
  float a = texelFetch(uLatCdf, ivec2(min(i, 255), 0), 0).r;
  float b = texelFetch(uLatCdf, ivec2(min(i + 1, 255), 0), 0).r;
  return mix(a, b, fract(x));
}
`,fn=`
vec2 htSamplePoint(int ink, vec2 p) {
  return latFromLattice(ink, latNearest(ink, latToLattice(ink, p)));
}

float htInk(int ink, vec2 p, float c) {
  c = latTone(ink, c);
  if (c <= 0.0) return 0.0;
  if (c >= 0.999) return 1.0;
  vec2 q = latToLattice(ink, p);
  return latSpot(q - latNearest(ink, q)) < latThreshold(c) ? 1.0 : 0.0;
}
`;function _t(e,t,n,i=65536){const a=ve(12345),r=new Float32Array(i);for(let s=0;s<i;s++){const[l,u]=n(a),[c,h]=e(l,u);r[s]=Er(t,l-c,u-h)}r.sort();const o=new Float32Array(256);for(let s=0;s<256;s++){const l=s/255*(i-1),u=Math.floor(l),c=Math.min(i-1,u+1);o[s]=r[u]+(r[c]-r[u])*(l-u)}return o[0]=-1,o}const Un=new WeakMap,Tr=64;function gn(e,t,n,i,a,r=1){const o=e.gl;let s=Un.get(o);s||Un.set(o,s=new Map);let l=s.get(t);if(l)return s.delete(t),s.set(t,l),l;for(const[u,c]of s){if(s.size<Tr)break;o.deleteTexture(c),s.delete(u)}return l=o.createTexture(),o.bindTexture(o.TEXTURE_2D,l),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.pixelStorei(o.UNPACK_ALIGNMENT,4),o.texImage2D(o.TEXTURE_2D,0,r===1?o.R32F:o.RGBA32F,n,i,0,r===1?o.RED:o.RGBA,o.FLOAT,a),s.set(t,l),l}let xe=null;function Mr(e,t){const n=JSON.stringify(t);if(xe&&xe.key===n&&xe.gl===e.gl)return xe.tex;const i=e.gl,a=xe?.gl===i?xe.tex:i.createTexture(),r=Te(t,256);return i.bindTexture(i.TEXTURE_2D,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.pixelStorei(i.UNPACK_ALIGNMENT,1),i.texImage2D(i.TEXTURE_2D,0,i.R8,256,1,0,i.RED,i.UNSIGNED_BYTE,Uint8Array.from(r,o=>Math.round(o*255))),xe={key:n,tex:a,gl:i},a}const Rr={round:0,square:1,ellipse:2,diamond:3,line:4};function st(e,t,n,i,a){const r=e[n]??[],o=i?e[i]??[]:[],s=e.maxDot??[],l=f=>Array.from({length:4},(d,m)=>m<t.inkCount?f(m):1),u=e.shape??"round",c=`${a.key}|${u}`;let h=Bn.get(c);return h||Bn.set(c,h=a.measure()),{uLatSize:l(f=>Math.max(1,r[f]??8)),uLatAngle:l(f=>(o[f]??0)*Math.PI/180),uLatMaxDot:l(f=>(s[f]??100)/100),uLatMinFrac:l(f=>{const d=t.minDot[f]??0,m=Math.max(1,r[f]??8);return Math.min(1,Math.PI/4*d*d/(m*m))}),uLatRoundUp:t.minDotMode==="round"?1:0,uLatShape:Rr[u]??0,uLatCurve:{texture:Mr(t.gpu,e.curve??[[0,0],[1,1]])},uLatCdf:{texture:gn(t.gpu,`cdf:${c}`,256,1,h)}}}const Bn=new Map;const Ue=Math.sqrt(2/Math.sqrt(3)),an=Ue*Math.sqrt(3)/2,ea={id:"halftoneHex",title:"AM: hex grid",stage:"halftone",parent:"halftone",description:"Dots in a honeycomb pattern: each dot has six equal neighbors. Smoother-looking than a square grid.",visibleWhen:e=>e.halftone?.type==="hex",settings:[{kind:"number",key:"cellSize",label:"Cell size",perInk:!0,default:8,min:2,max:64,step:.5,unit:"px",help:"Same dot density as a square grid of this size, in output pixels."},{kind:"number",key:"angle",label:"Angle",perInk:!0,linkInks:!1,default:30,slotDefaults:[0,30,15,45],min:0,max:60,step:.5,unit:"°",help:"A hex grid repeats every 60°."},...rt()]};function Cr(e,t){const n=t/an,i=Math.floor((e-n*Ue*.5)/Ue),a=Math.floor(n);let r=[0,0],o=1/0;for(let s=0;s<=1;s++)for(let l=0;l<=1;l++){const u=i+l,c=a+s,h=u*Ue+c*Ue*.5,f=c*an,d=(e-h)**2+(t-f)**2;d<o&&(o=d,r=[h,f])}return r}const Ir={id:"hex",label:"AM: hex grid",section:ea,glsl:`
${ot}
const float HEX_H = ${Ue.toFixed(8)};
const float HEX_ROW = ${an.toFixed(8)};
vec2 latToLattice(int ink, vec2 p) { return latRotate(p, uLatAngle[ink]) / uLatSize[ink]; }
vec2 latFromLattice(int ink, vec2 q) { return latRotate(q * uLatSize[ink], -uLatAngle[ink]); }
vec2 latNearest(int ink, vec2 q) {
  float jf = q.y / HEX_ROW;
  vec2 base = floor(vec2((q.x - jf * HEX_H * 0.5) / HEX_H, jf));
  vec2 best = vec2(0.0);
  float bestD = 1e9;
  for (int dj = 0; dj <= 1; dj++) {
    for (int di = 0; di <= 1; di++) {
      vec2 ij = base + vec2(float(di), float(dj));
      vec2 c = vec2(ij.x * HEX_H + ij.y * HEX_H * 0.5, ij.y * HEX_ROW);
      float d = dot(q - c, q - c);
      if (d < bestD) { bestD = d; best = c; }
    }
  }
  return best;
}
${fn}
`,uniforms(e,t){return st(e,t,"cellSize","angle",{key:"hex",measure:()=>_t(Cr,e.shape,n=>[n()*40,n()*40])})}};class lt{constructor(t=2){this.capacity=t}entries=[];get(t,n,i){const a=this.entries.findIndex(o=>o.key===n&&o.gl===t);if(a>=0){const[o]=this.entries.splice(a,1);return this.entries.push(o),o.texture}const r=i();for(this.entries.push({key:n,gl:t,texture:r});this.entries.length>this.capacity;){const o=this.entries.shift();o.gl.deleteTexture(o.texture)}return r}}const Ar=1024;class Oe extends Error{constructor(){super("Superseded by a newer request"),this.name="SupersededError"}}class vn{worker;nextRequestId=0;latestRequestId=-1;pending=null;constructor(t){this.worker=t,this.worker.onmessage=n=>{const i=n.data;i.requestId!==this.latestRequestId||!this.pending||(i.type==="progress"?this.pending.onProgress?.(i.fraction):i.type==="done"?(this.pending.resolve(i.result),this.pending=null):(this.pending.reject(new Error(i.message)),this.pending=null))}}run(t,n={}){this.pending?.reject(new Oe);const i=this.nextRequestId++;return this.latestRequestId=i,new Promise((a,r)=>{this.pending={resolve:a,reject:r,onProgress:n.onProgress??null};const o={requestId:i,payload:t};this.worker.postMessage(o,n.transfer??[])})}terminate(){this.pending?.reject(new Oe),this.pending=null,this.worker.terminate()}}const On=new Map;function ut(e){let t=On.get(e);return t||(t=new vn(new Worker(new URL(""+new URL("halftone.worker-6lNrEsS2.js",import.meta.url).href,import.meta.url),{type:"module"})),On.set(e,t)),t}const q=Ar,ta={id:"halftoneNoise",title:"AM: noise grid",stage:"halftone",parent:"halftone",description:"A grid with each dot nudged by noise: breaks up the regular pattern and moiré while keeping dot-size shading.",visibleWhen:e=>e.halftone?.type==="noise",settings:[{kind:"select",key:"noise",label:"Noise",default:"blue",display:"segmented",options:[{value:"blue",label:"Blue"},{value:"pink",label:"Pink"},{value:"green",label:"Green"}]},{kind:"number",key:"cellSize",label:"Grid spacing",perInk:!0,default:8,min:2,max:64,step:.5,unit:"px"},{kind:"number",key:"amount",label:"Noise amount",default:70,min:0,max:100,step:1,unit:"%"},{kind:"number",key:"cluster",label:"Cluster size",default:3,min:2,max:8,step:1,unit:"cells",visibleWhen:e=>e.noise==="green"},{kind:"seed",key:"seed",label:"Random seed",default:1},...rt()]},zn=e=>e/255-.5;function Lr(e,t){return(n,i)=>{const a=Math.floor(n),r=Math.floor(i);let o=[0,0],s=1/0;for(let l=-1;l<=1;l++)for(let u=-1;u<=1;u++){const c=a+u,h=r+l,f=(h%q+q)%q*q+(c%q+q)%q,d=c+.5+zn(e[f*2])*t,m=h+.5+zn(e[f*2+1])*t,p=(n-d)**2+(i-m)**2;p<s&&(s=p,o=[d,m])}return o}}const Pr={id:"noise",label:"AM: noise grid",section:ta,prepareKey:e=>Wn(e),async prepare(e){const t=await ut("noise").run({kind:"noiseField",noise:String(e.noise),cluster:Number(e.cluster),seed:Number(e.seed)});if(t.kind!=="noiseField")throw new Error("unexpected worker result");return{key:Wn(e),data:t.data}},glsl:`
${ot}
uniform sampler2D uNoiseTile;   // ${q} × ${q}, RG8: nudge per cell + 0.5
uniform float uNoiseAmount;
uniform vec2 uNoiseShift[4];    // per-ink offset into the tile (cells)
vec2 latToLattice(int ink, vec2 p) { return p / uLatSize[ink] + uNoiseShift[ink]; }
vec2 latFromLattice(int ink, vec2 q) { return (q - uNoiseShift[ink]) * uLatSize[ink]; }
vec2 latNearest(int ink, vec2 q) {
  vec2 b = floor(q);
  vec2 best = vec2(0.0);
  float bestD = 1e9;
  for (int dy = -1; dy <= 1; dy++) {
    for (int dx = -1; dx <= 1; dx++) {
      vec2 cell = b + vec2(float(dx), float(dy));
      vec2 o = (texelFetch(uNoiseTile, ivec2(mod(cell, ${q}.0)), 0).xy - 0.5) * uNoiseAmount;
      vec2 c = cell + 0.5 + o;
      float d = dot(q - c, q - c);
      if (d < bestD) { bestD = d; best = c; }
    }
  }
  return best;
}
${fn}
`,uniforms(e,t,n){const i=n?.data??Dr,a=n?.key??"none",r=Number(e.amount)/100,o=ve(Number(e.seed)*31+7),s=[];for(let l=0;l<4;l++)s.push(Math.floor(o()*q),Math.floor(o()*q));return{...st(e,t,"cellSize",null,{key:`noise:${a}|${r}`,measure:()=>_t(Lr(i,r),e.shape,l=>[l()*q,l()*q])}),uNoiseTile:{texture:Nr(t.gpu.gl,i)},uNoiseAmount:r,uNoiseShift:s}}};function Wn(e){return`${e.noise}|${e.noise==="green"?e.cluster:0}|${e.seed}`}const Dr=new Uint8Array(q*q*2).fill(128),_r=new lt;function Nr(e,t){return _r.get(e,t,()=>{const n=e.createTexture();return e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.pixelStorei(e.UNPACK_ALIGNMENT,2),e.texImage2D(e.TEXTURE_2D,0,e.RG8,q,q,0,e.RG,e.UNSIGNED_BYTE,t),n})}const na={id:"halftoneRings",title:"AM: concentric rings",stage:"halftone",parent:"halftone",description:"Dots on rings around a center point, or continuous lines whose width changes with the tone.",visibleWhen:e=>e.halftone?.type==="rings",settings:[{kind:"number",key:"cellSize",label:"Ring spacing",perInk:!0,default:8,min:2,max:64,step:.5,unit:"px"},{kind:"toggle",key:"lines",label:"Continuous lines instead of dots",default:!1},{kind:"number",key:"dotSpacing",label:"Dot spacing along each ring",default:100,min:50,max:300,step:5,unit:"%",help:"As a share of the ring spacing.",visibleWhen:e=>!e.lines},{kind:"number",key:"angle",label:"Dot rotation",perInk:!0,linkInks:!1,default:0,slotDefaults:[0,15,30,45],min:0,max:360,step:1,unit:"°",visibleWhen:e=>!e.lines},{kind:"number",key:"centerX",label:"Center, across",default:50,min:0,max:100,step:.5,unit:"%"},{kind:"number",key:"centerY",label:"Center, down",default:50,min:0,max:100,step:.5,unit:"%"},...rt().map(e=>e.key==="shape"?{...e,visibleWhen:t=>!t.lines}:e)]},yt=Math.PI*2;function Fr(e){return(t,n)=>{const i=Math.hypot(t,n),a=Math.atan2(n,t),r=Math.round(i);let o=[0,0],s=1/0;for(let l=Math.max(0,r-1);l<=r+1;l++){const u=l===0?1:Math.max(1,Math.round(yt*l/e)),c=Math.round(a/yt*u);for(let h=c-1;h<=c+1;h++){const f=yt*h/u,d=l*Math.cos(f),m=l*Math.sin(f),p=(t-d)**2+(n-m)**2;p<s&&(s=p,o=[d,m])}}return o}}const $r={id:"rings",label:"AM: concentric rings",section:na,glsl:`
${ot}
uniform vec2 uRingCenter;   // output px
uniform float uRingRatio;   // dot spacing / ring spacing
uniform int uRingLines;
const float TAU = 6.28318530718;

vec2 latToLattice(int ink, vec2 p) { return latRotate(p - uRingCenter, -uLatAngle[ink]) / uLatSize[ink]; }
vec2 latFromLattice(int ink, vec2 q) { return latRotate(q * uLatSize[ink], uLatAngle[ink]) + uRingCenter; }
vec2 latNearest(int ink, vec2 q) {
  float r = length(q);
  float theta = atan(q.y, q.x);
  float k0 = floor(r + 0.5);
  vec2 best = vec2(0.0);
  float bestD = 1e9;
  for (int dk = -1; dk <= 1; dk++) {
    float k = k0 + float(dk);
    if (k < 0.0) continue;
    float count = k < 0.5 ? 1.0 : max(1.0, floor(TAU * k / uRingRatio + 0.5));
    float j0 = floor(theta / TAU * count + 0.5);
    for (int dj = -1; dj <= 1; dj++) {
      float a = TAU * (j0 + float(dj)) / count;
      vec2 c = k * vec2(cos(a), sin(a));
      float d = dot(q - c, q - c);
      if (d < bestD) { bestD = d; best = c; }
    }
  }
  return best;
}

vec2 htSamplePoint(int ink, vec2 p) {
  vec2 q = latToLattice(ink, p);
  if (uRingLines == 1) {
    // Lines: the tone at the same angle on the nearest ring.
    float r = length(q);
    float k = floor(r + 0.5);
    return latFromLattice(ink, r > 1e-4 ? q * (k / r) : q);
  }
  return latFromLattice(ink, latNearest(ink, q));
}

float htInk(int ink, vec2 p, float c) {
  c = latTone(ink, c);
  if (c <= 0.0) return 0.0;
  if (c >= 0.999) return 1.0;
  vec2 q = latToLattice(ink, p);
  if (uRingLines == 1) {
    // Line width = tone × ring spacing, so the inked share of each band is the tone.
    float r = length(q);
    return abs(r - floor(r + 0.5)) < c * 0.5 ? 1.0 : 0.0;
  }
  return latSpot(q - latNearest(ink, q)) < latThreshold(c) ? 1.0 : 0.0;
}
`,uniforms(e,t){const n=e,i=Number(n.dotSpacing??100)/100;return{...st(n,t,"cellSize","angle",{key:`rings:${i}`,measure:()=>_t(Fr(i),n.shape??"round",a=>{const r=Math.sqrt(100+a()*1500),o=a()*yt;return[r*Math.cos(o),r*Math.sin(o)]})}),uRingCenter:[Number(n.centerX??50)/100*t.outputWidth,Number(n.centerY??50)/100*t.outputHeight],uRingRatio:i,uRingLines:n.lines?1:0}}},Ur=4;function Br(e,t,n){const i=Math.floor(t+e.radius),a=Math.floor(n+e.radius);let r=null,o=1/0;for(let s=-1;s<=1;s++)for(let l=-1;l<=1;l++){const u=i+l,c=a+s;if(!(u<0||c<0||u>=e.grid||c>=e.grid))for(let h=0;h<Ur;h++){const f=(c*e.grid*2+u*2)*4+h*2;if(e.data[f]>254)continue;const d=u-e.radius+(e.data[f]+.5)/254,m=c-e.radius+(e.data[f+1]+.5)/254,p=(t-d)**2+(n-m)**2;p<o&&(o=p,r=[d,m])}}return r}const ia={id:"halftoneSpiral",title:"AM: phyllotaxis spiral",stage:"halftone",parent:"halftone",description:"Dots spiraling out from a center, like seeds in a sunflower.",visibleWhen:e=>e.halftone?.type==="spiral",settings:[{kind:"number",key:"cellSize",label:"Point spacing",perInk:!0,default:8,min:2,max:64,step:.5,unit:"px"},{kind:"number",key:"angle",label:"Spiral rotation",perInk:!0,linkInks:!1,default:0,slotDefaults:[0,23,46,69],min:0,max:360,step:1,unit:"°"},{kind:"number",key:"divergence",label:"Divergence angle",default:137.5,min:100,max:180,step:.1,unit:"°",help:"Angle between one point and the next. 137.5° (the golden angle) packs points most evenly."},{kind:"number",key:"centerX",label:"Center, across",default:50,min:0,max:100,step:.5,unit:"%"},{kind:"number",key:"centerY",label:"Center, down",default:50,min:0,max:100,step:.5,unit:"%"},...rt()]},Or=180*(3-Math.sqrt(5));function Gn(e){const t=Number(e.divergence);return Math.abs(t-137.5)<.05?Or:t}function Xn(e,t){const n=Number(e.centerX??50)/100*t.outputWidth,i=Number(e.centerY??50)/100*t.outputHeight,a=Math.max(Math.hypot(n,i),Math.hypot(t.outputWidth-n,i),Math.hypot(n,t.outputHeight-i),Math.hypot(t.outputWidth-n,t.outputHeight-i)),r=Math.max(1,Math.min(...e.cellSize??[8])),o=a/r+3;return 2**Math.ceil(Math.log2(Math.PI*o*o))}const zr={id:"spiral",label:"AM: phyllotaxis spiral",section:ia,prepareKey:(e,t)=>`${e.divergence}|${Xn(e,t)}`,async prepare(e,t){const n=await ut("spiral").run({kind:"spiral",count:Xn(e,t),divergence:Gn(e)});if(n.kind!=="spiral")throw new Error("unexpected worker result");return n},glsl:`
${ot}
uniform sampler2D uSpiral;      // 2 texels per bucket, 2 points per texel (bytes; 255 = empty)
uniform float uSpiralR;         // bucket grid half-size (lattice units)
uniform int uSpiralGrid;
uniform vec2 uSpiralCenter;     // output px
vec2 latToLattice(int ink, vec2 p) { return latRotate(p - uSpiralCenter, -uLatAngle[ink]) / uLatSize[ink]; }
vec2 latFromLattice(int ink, vec2 q) { return latRotate(q * uLatSize[ink], uLatAngle[ink]) + uSpiralCenter; }
vec2 latNearest(int ink, vec2 q) {
  ivec2 b0 = ivec2(floor(q + uSpiralR));
  vec2 best = q + vec2(100.0); // outside the table: no dot nearby
  float bestD = 1e9;
  for (int dy = -1; dy <= 1; dy++) {
    for (int dx = -1; dx <= 1; dx++) {
      ivec2 b = b0 + ivec2(dx, dy);
      if (b.x < 0 || b.y < 0 || b.x >= uSpiralGrid || b.y >= uSpiralGrid) continue;
      for (int t = 0; t < 2; t++) {
        vec4 s = texelFetch(uSpiral, ivec2(b.x * 2 + t, b.y), 0) * 255.0;
        vec2 origin = vec2(b) - uSpiralR;
        if (s.x < 254.5) {
          vec2 c = origin + (s.xy + 0.5) / 254.0;
          float d = dot(q - c, q - c);
          if (d < bestD) { bestD = d; best = c; }
        }
        if (s.z < 254.5) {
          vec2 c = origin + (s.zw + 0.5) / 254.0;
          float d = dot(q - c, q - c);
          if (d < bestD) { bestD = d; best = c; }
        }
      }
    }
  }
  return best;
}
${fn}
`,uniforms(e,t,n){const i=e,a=t.gpu.gl,r=Wr.get(a,n??Gt,()=>{const l=n??Gt,u=a.createTexture();return a.bindTexture(a.TEXTURE_2D,u),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.pixelStorei(a.UNPACK_ALIGNMENT,4),a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,l.grid*2,l.grid,0,a.RGBA,a.UNSIGNED_BYTE,l.data),u}),o=n??Gt,s=i.shape??"round";return{...st(i,t,"cellSize","angle",{key:`spiral:${Gn(i)}:${o.count}`,measure:()=>{const l=Math.max(6,o.radius-3);return _t((u,c)=>Br(o,u,c)??[u+100,c+100],s,u=>{const c=Math.sqrt(25+u()*(l*l-25)),h=u()*Math.PI*2;return[c*Math.cos(h),c*Math.sin(h)]})}}),uSpiral:{texture:r},uSpiralR:o.radius,uSpiralGrid:o.grid,uSpiralCenter:[Number(i.centerX??50)/100*t.outputWidth,Number(i.centerY??50)/100*t.outputHeight]}}},Gt={count:0,radius:1,grid:1,data:new Uint8Array(8).fill(255)},Wr=new lt,aa=[15,75,0,45],ra={id:"halftoneAm",title:"AM: square grid",stage:"halftone",parent:"halftone",description:"Dots sit on a grid; dot size carries the tone. Each ink gets its own angle to avoid moiré.",visibleWhen:e=>e.halftone?.type==="am",settings:[{kind:"number",key:"cellSize",label:"Cell size",perInk:!0,default:8,min:2,max:64,step:.5,unit:"px",help:"Distance between dots, in output pixels. At 600 DPI: 6 px ≈ 100 LPI, 8 px = 75 LPI, 12 px = 50 LPI."},{kind:"number",key:"angle",linkInks:!1,label:"Angle",perInk:!0,default:45,slotDefaults:aa,min:0,max:90,step:.5,unit:"°"},{kind:"number",key:"maxDot",label:"Maximum dot size",perInk:!0,default:100,min:10,max:100,step:1,unit:"%",help:"Largest dot, as a share of the cell. Below 100% even solid areas keep small gaps."},{kind:"select",key:"shape",label:"Dot shape",default:"round",options:[{value:"round",label:"Round"},{value:"square",label:"Square"},{value:"ellipse",label:"Ellipse"},{value:"diamond",label:"Diamond"},{value:"line",label:"Line"}]},{kind:"curve",key:"curve",label:"Dot size curve",default:[[0,0],[1,1]],help:"Maps tone to dot size. Pull the middle down for smaller dots in the midtones."}]},de=128;function Gr(e,t,n){const i=Math.abs(t),a=Math.abs(n);switch(e){case"round":return i+a<=1?t*t+n*n:2-((1-i)**2+(1-a)**2);case"square":return Math.max(i,a);case"ellipse":return Math.sqrt(t*t+(n/.65)**2);case"diamond":return i+a;case"line":return a}}function Xr(e){const t=de*de,n=new Float64Array(t);for(let r=0;r<de;r++)for(let o=0;o<de;o++){const s=(o+.5)/de*2-1,l=(r+.5)/de*2-1;n[r*de+o]=Gr(e,s,l)+(o*1e-9+r*1e-12)}const i=Array.from({length:t},(r,o)=>o).sort((r,o)=>n[r]-n[o]),a=new Uint8Array(t);return i.forEach((r,o)=>a[r]=Math.round((o+.5)/t*255)),a}const Hn=new WeakMap;function oa(e,t,n,i,a,r){const o=e.gl;let s=Hn.get(o);s||Hn.set(o,s=new Map);let l=s.get(t);if(l&&l.data===a)return l.tex;if(!l){const u=o.createTexture();l={tex:u,data:null},s.set(t,l),o.bindTexture(o.TEXTURE_2D,u),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR);const c=r==="repeat"?o.REPEAT:o.CLAMP_TO_EDGE;o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,c),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,c)}return o.bindTexture(o.TEXTURE_2D,l.tex),o.pixelStorei(o.UNPACK_ALIGNMENT,1),o.texImage2D(o.TEXTURE_2D,0,o.R8,n,i,0,o.RED,o.UNSIGNED_BYTE,a),l.data=a,l.tex}const qn=new Map;function Hr(e,t){let n=qn.get(t);return n||qn.set(t,n=Xr(t)),oa(e,`spot:${t}`,de,de,n,"repeat")}let Xt=null;function qr(e,t){const n=JSON.stringify(t);if(Xt?.key!==n){const i=Te(t,256);Xt={key:n,bytes:Uint8Array.from(i,a=>Math.round(a*255))}}return oa(e,"amCurve",256,1,Xt.bytes,"clamp")}const jr={id:"am",label:"AM: square grid",section:ra,glsl:`
uniform vec4 uAmCell;       // cell size per ink, output px
uniform vec4 uAmAngle;      // radians
uniform vec4 uAmMaxDot;     // 0..1
uniform vec4 uAmMinFrac;    // minimum dot area as a share of the cell
uniform int uAmRoundUp;
uniform sampler2D uAmSpot;  // rank table over one cell (repeats)
uniform sampler2D uAmCurve; // dot size curve

vec2 amRotate(vec2 v, float a) {
  float c = cos(a), s = sin(a);
  return vec2(c * v.x - s * v.y, s * v.x + c * v.y);
}

vec2 htSamplePoint(int ink, vec2 p) {
  float size = uAmCell[ink];
  vec2 q = amRotate(p, uAmAngle[ink]) / size;
  return amRotate((floor(q) + 0.5) * size, -uAmAngle[ink]);
}

float htInk(int ink, vec2 p, float c) {
  c = texture(uAmCurve, vec2((clamp(c, 0.0, 1.0) * 255.0 + 0.5) / 256.0, 0.5)).r * uAmMaxDot[ink];
  if (c < uAmMinFrac[ink]) c = (uAmRoundUp == 1 && c > 0.02) ? uAmMinFrac[ink] : 0.0;
  if (c <= 0.0) return 0.0;
  if (c >= 0.999) return 1.0;
  vec2 q = amRotate(p, uAmAngle[ink]) / uAmCell[ink];
  return texture(uAmSpot, fract(q)).r < c ? 1.0 : 0.0;
}
`,uniforms(e,t){const n=i=>Array.from({length:4},(a,r)=>r<t.inkCount?i(r):1);return{uAmCell:n(i=>Math.max(1,e.cellSize[i]??8)),uAmAngle:n(i=>(e.angle[i]??45)*Math.PI/180),uAmMaxDot:n(i=>(e.maxDot[i]??100)/100),uAmMinFrac:n(i=>{const a=t.minDot[i]??0,r=Math.max(1,e.cellSize[i]??8);return Math.min(1,Math.PI/4*(a*a)/(r*r))}),uAmRoundUp:t.minDotMode==="round"?1:0,uAmSpot:{texture:Hr(t.gpu,e.shape)},uAmCurve:{texture:qr(t.gpu,e.curve)}}}},sa=60,Vr=4096,rn=new Map;function bn(e,t,n){const i=rn.get(e);return i===void 0?Math.max(1,Math.min(n,Math.floor(Vr/t))):Math.max(1,Math.min(n,Math.floor(sa/(i*t))))}function kn(e,t,n,i,a){const r=performance.now();a(),e.finish(t);const o=performance.now()-r,s=o/Math.max(1,i),l=rn.get(n);return rn.set(n,l===void 0||s>l?s:l*.8+s*.2),o}const jn=50,Yr=5.5,Kr=.5,he=`#version 300 es
precision highp float;
precision highp int;
uniform vec2 uSize;
uniform int uPeriodic;
out vec4 outColor;

// u in [-2, 2] as 16 bits over two 8-bit channels.
vec2 tuPack(float u) {
  float x = floor(clamp(u * 0.25 + 0.5, 0.0, 1.0) * 65535.0 + 0.5);
  float hi = floor(x / 256.0);
  return vec2(hi, x - hi * 256.0) / 255.0;
}
float tuUnpack(vec2 rg) {
  vec2 b = floor(rg * 255.0 + 0.5);
  return ((b.x * 256.0 + b.y) / 65535.0 - 0.5) * 4.0;
}
ivec2 tuWrap(ivec2 c) {
  ivec2 n = ivec2(uSize);
  if (uPeriodic == 1) return ((c % n) + n) % n;
  return clamp(c, ivec2(0), n - 1);
}
// Packed value at a texel (RG or BA).
float tuAt(sampler2D t, ivec2 c) { return tuUnpack(texelFetch(t, tuWrap(c), 0).rg); }
float tuAtBA(sampler2D t, ivec2 c) { return tuUnpack(texelFetch(t, tuWrap(c), 0).ba); }
// Bilinear packed value at a position in texels (texel centers at +0.5).
float tuBilinear(sampler2D t, vec2 pos) {
  vec2 q = pos - 0.5;
  ivec2 i = ivec2(floor(q));
  vec2 f = q - floor(q);
  float a = tuAt(t, i), b = tuAt(t, i + ivec2(1, 0)), c = tuAt(t, i + ivec2(0, 1)), d = tuAt(t, i + ivec2(1, 1));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float tuGauss(float k, float s) { return exp(-0.5 * k * k / (s * s)); }

uint tuHash(ivec2 c, int salt) {
  uint h = uint(c.x) * 73856093u ^ uint(c.y) * 19349663u ^ uint(salt) * 83492791u;
  h ^= h >> 13; h *= 0x5bd1e995u; h ^= h >> 15;
  return h;
}
float tuRand(ivec2 c, int salt) { return float(tuHash(c, salt) & 0xffffu) / 65535.0; }
// Value noise with \`cells\` cells across the field (repeating when periodic).
float tuNoise(vec2 pos, vec2 cells, int salt) {
  vec2 x = pos / uSize * cells;
  vec2 i = floor(x);
  vec2 f = x - i;
  f = f * f * (3.0 - 2.0 * f);
  ivec2 n = ivec2(cells);
  ivec2 c0 = ivec2(i);
  ivec2 c1 = c0 + 1;
  if (uPeriodic == 1) { c0 = ((c0 % n) + n) % n; c1 = ((c1 % n) + n) % n; }
  float a = tuRand(c0, salt), b = tuRand(ivec2(c1.x, c0.y), salt);
  float c = tuRand(ivec2(c0.x, c1.y), salt), d = tuRand(c1, salt);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
`,Jr=`${he}
uniform int uSeed;
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy);
  outColor = vec4(tuPack((tuRand(c, uSeed) - 0.5) * 0.2), 0.0, 1.0);
}
`,Zr=`${he}
uniform sampler2D uAnalysis;
void main() {
  vec4 a = texelFetch(uAnalysis, ivec2(gl_FragCoord.xy), 0);
  vec2 g = (a.gb - 0.5) * 2.0;
  float m = clamp(length(g) * 3.0, 0.0, 1.0);
  float phi = atan(g.y, g.x);
  outColor = vec4(vec2(cos(2.0 * phi), sin(2.0 * phi)) * m * 0.5 + 0.5, m, 1.0);
}
`,Vn=`${he}
uniform sampler2D uImage;
uniform vec2 uDir;
uniform float uSigma;
void main() {
  vec2 uv = gl_FragCoord.xy / uSize;
  float step = max(1.0, uSigma / 4.0);
  vec4 sum = vec4(0.0);
  float wsum = 0.0;
  for (int k = -12; k <= 12; k++) {
    float x = float(k) * step;
    float w = tuGauss(x, uSigma);
    sum += texture(uImage, uv + uDir * x / uSize) * w;
    wsum += w;
  }
  outColor = sum / wsum;
}
`,Qr=`${he}
uniform float uOrder;
uniform float uDirection;
uniform float uWobble;
uniform float uFollow;
uniform int uHasImage;
uniform sampler2D uTensor;
uniform vec2 uUvPerTexel;
uniform vec2 uWobbleCells;
uniform vec2 uBranchCells;
uniform int uSeed;
void main() {
  vec2 pos = gl_FragCoord.xy;
  vec2 v = uOrder * vec2(cos(2.0 * uDirection), sin(2.0 * uDirection));
  if (uHasImage == 1) {
    vec4 t = texture(uTensor, pos * uUvPerTexel);
    vec2 g = (t.rg - 0.5) * 2.0;
    float m = t.b;
    // Along the edge: the gradient's orientation turned 90° (doubled angle: negated).
    vec2 tangent = m > 1e-3 ? -g / m : vec2(0.0);
    float coherence = m > 1e-3 ? length(g) / m : 0.0;
    v += uFollow * tangent * clamp(m * 4.0, 0.0, 1.0) * coherence * 2.0;
  }
  float strength = clamp(length(v), 0.0, 1.0);
  float theta = length(v) > 1e-4 ? 0.5 * atan(v.y, v.x) : uDirection;
  theta += uWobble * (tuNoise(pos, uWobbleCells, uSeed + 7) - 0.5) * 2.4;
  float branch = tuNoise(pos, uBranchCells, uSeed + 13) * 2.0 - 1.0;
  outColor = vec4(vec2(cos(2.0 * theta), sin(2.0 * theta)) * 0.5 + 0.5, strength, branch * 0.5 + 0.5);
}
`,eo=`${he}
uniform sampler2D uU;
uniform float uSigma1;
uniform float uSigma2;
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy);
  float a = 0.0, b = 0.0, wa = 0.0, wb = 0.0;
  for (int k = -16; k <= 16; k++) {
    float x = float(k);
    if (abs(x) > ceil(uSigma2 * 3.0)) continue;
    float u = tuAt(uU, c + ivec2(k, 0));
    float w1 = tuGauss(x, uSigma1), w2 = tuGauss(x, uSigma2);
    a += u * w1; wa += w1;
    b += u * w2; wb += w2;
  }
  outColor = vec4(tuPack(a / wa), tuPack(b / wb));
}
`,to=`${he}
uniform sampler2D uU;
uniform sampler2D uFlow;
uniform float uSigma1;
uniform float uSigma2;
void main() {
  vec2 pos = gl_FragCoord.xy;
  vec4 fl = texelFetch(uFlow, ivec2(pos), 0);
  vec2 d2 = (fl.rg - 0.5) * 2.0;
  float theta = 0.5 * atan(d2.y, d2.x);
  vec2 n = vec2(-sin(theta), cos(theta));
  float a = 0.0, b = 0.0, wa = 0.0, wb = 0.0;
  for (int k = -16; k <= 16; k++) {
    float x = float(k);
    if (abs(x) > ceil(uSigma2 * 3.0)) continue;
    float u = tuBilinear(uU, pos + n * x);
    float w1 = tuGauss(x, uSigma1), w2 = tuGauss(x, uSigma2);
    a += u * w1; wa += w1;
    b += u * w2; wb += w2;
  }
  outColor = vec4(tuPack(a / wa - b / wb), 0.0, 1.0);
}
`,no=`${he}
uniform sampler2D uU;
uniform sampler2D uIso;
uniform sampler2D uAcross;
uniform sampler2D uFlow;
uniform int uDirectional;
uniform float uSigma1;
uniform float uSigma2;
uniform float uSigmaAlong;
uniform float uGain;
uniform float uRelax;
uniform float uSpots;
uniform float uBranching;
void main() {
  vec2 pos = gl_FragCoord.xy;
  ivec2 c = ivec2(pos);
  float a = 0.0, b = 0.0, wa = 0.0, wb = 0.0;
  for (int k = -16; k <= 16; k++) {
    float x = float(k);
    if (abs(x) > ceil(uSigma2 * 3.0)) continue;
    float w1 = tuGauss(x, uSigma1), w2 = tuGauss(x, uSigma2);
    a += tuAt(uIso, c + ivec2(0, k)) * w1; wa += w1;
    b += tuAtBA(uIso, c + ivec2(0, k)) * w2; wb += w2;
  }
  float dog = a / wa - b / wb;
  vec4 fl = texelFetch(uFlow, c, 0);
  if (uDirectional == 1 && fl.b > 0.0) {
    // Smooth the across-step along the line, so lines stay continuous.
    vec2 d2 = (fl.rg - 0.5) * 2.0;
    float theta = 0.5 * atan(d2.y, d2.x);
    vec2 t = vec2(cos(theta), sin(theta));
    float s = 0.0, ws = 0.0;
    for (int k = -12; k <= 12; k++) {
      float x = float(k);
      if (abs(x) > ceil(uSigmaAlong * 3.0)) continue;
      float w = tuGauss(x, uSigmaAlong);
      s += tuBilinear(uAcross, pos + t * x) * w;
      ws += w;
    }
    dog = mix(dog, s / ws, fl.b);
  }
  float bias = -uSpots + uBranching * (fl.a - 0.5) * 2.0;
  float u = tuAt(uU, c);
  float target = tanh(uGain * dog + bias);
  outColor = vec4(tuPack(mix(u, target, uRelax)), 0.0, 1.0);
}
`,Yn=`${he}
uniform sampler2D uU;
uniform vec2 uDir;
uniform float uSigma;
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy);
  float s = 0.0, ws = 0.0;
  for (int k = -12; k <= 12; k++) {
    float x = float(k);
    if (abs(x) > ceil(uSigma * 3.0)) continue;
    float w = tuGauss(x, uSigma);
    s += tuAt(uU, c + ivec2(uDir) * k) * w;
    ws += w;
  }
  outColor = vec4(tuPack(s / ws), 0.0, 1.0);
}
`,io=`${he}
uniform sampler2D uU;
uniform vec2 uStride;
uniform vec2 uFieldSize;
void main() {
  ivec2 cell = ivec2(gl_FragCoord.xy);
  vec2 jitter = vec2(tuRand(cell, 101), tuRand(cell, 211));
  vec2 pos = (vec2(cell) + jitter) * uStride;
  // tuAt wraps/clamps by uSize, which here is this small target: use the field's size.
  vec2 q = min(pos, uFieldSize - 0.001) - 0.5;
  ivec2 i = ivec2(floor(q));
  vec2 f = q - floor(q);
  ivec2 n = ivec2(uFieldSize);
  ivec2 i0 = uPeriodic == 1 ? ((i % n) + n) % n : clamp(i, ivec2(0), n - 1);
  ivec2 i1 = uPeriodic == 1 ? (((i + 1) % n) + n) % n : clamp(i + 1, ivec2(0), n - 1);
  float a = tuUnpack(texelFetch(uU, i0, 0).rg), b = tuUnpack(texelFetch(uU, ivec2(i1.x, i0.y), 0).rg);
  float c = tuUnpack(texelFetch(uU, ivec2(i0.x, i1.y), 0).rg), d = tuUnpack(texelFetch(uU, i1, 0).rg);
  outColor = vec4(tuPack(mix(mix(a, b, f.x), mix(c, d, f.x), f.y)), 0.0, 1.0);
}
`,ao=()=>new Promise(e=>setTimeout(e,0));function ro(e,t){return((e*256+t)/65535-.5)*4}async function Kn(e,t){const{width:n,height:i}=t,a=[],r=(l=n,u=i)=>{const c=e.createTarget(l,u,"coverage");return a.push(c),c};let o=performance.now();const s=async(l,u,c,h)=>{const f={uSize:[c.width,c.height],uPeriodic:t.periodic?1:0,...h};for(let d=0;d<c.height;){if(t.isCancelled())throw new Oe;const m=bn(`turing|${l}`,c.width,c.height-d),p={y:d,height:m};kn(e,c.framebuffer,`turing|${l}`,c.width*m,()=>e.draw(u,c.framebuffer,c.width,c.height,f,p)),d+=m,performance.now()-o>24&&(await ao(),o=performance.now())}};try{const l=t.params,u=t.samples,c=u/6.54,h=2*c,f=l.seed*7919+17&2147483647,d=l.order>.001||l.follow>.001&&!!t.orientation,m=P=>[Math.max(1,Math.round(n/(u*P))),Math.max(1,Math.round(i/(u*P)))];let p=null;if(t.orientation&&l.follow>.001){const P=t.orientation,R=P.analysis.width,C=P.analysis.height,I=r(R,C),N=r(R,C);await s("tensor",Zr,I,{uAnalysis:{texture:P.analysis.texture}}),await s("blur",Vn,N,{uImage:{texture:I.texture},uDir:[1,0],uSigma:P.sigma,uPeriodic:0}),await s("blur",Vn,I,{uImage:{texture:N.texture},uDir:[0,1],uSigma:P.sigma,uPeriodic:0}),p=I}const g=r(),v=p??r(1,1);await s("flow",Qr,g,{uOrder:l.order,uDirection:l.direction,uWobble:l.wobble,uFollow:l.follow,uHasImage:p?1:0,uTensor:{texture:v.texture},uUvPerTexel:t.orientation?.uvPerTexel??[0,0],uWobbleCells:m(4),uBranchCells:m(1.5),uSeed:f});let b=r(),k=r();const w=r(),M=d?r():null;await s("init",Jr,b,{uSeed:f});const S={uSigma1:c,uSigma2:h,uSigmaAlong:u*.5,uGain:Yr,uRelax:Kr,uSpots:l.spots*.75,uBranching:l.branching*.6};for(let P=0;P<jn;P++)await s("isoX",eo,w,{uU:{texture:b.texture},uSigma1:c,uSigma2:h}),M&&await s("across",to,M,{uU:{texture:b.texture},uFlow:{texture:g.texture},uSigma1:c,uSigma2:h}),await s("update",no,k,{...S,uU:{texture:b.texture},uIso:{texture:w.texture},uAcross:{texture:(M??w).texture},uFlow:{texture:g.texture},uDirectional:M?1:0}),[b,k]=[k,b],t.onProgress?.((P+1)/jn);const y=u/6;await s("smooth",Yn,k,{uU:{texture:b.texture},uDir:[1,0],uSigma:y}),await s("smooth",Yn,b,{uU:{texture:k.texture},uDir:[0,1],uSigma:y});const T=Math.max(n,i)/512,x=Math.max(1,Math.round(n/T)),E=Math.max(1,Math.round(i/T)),A=r(x,E);await s("sample",io,A,{uU:{texture:b.texture},uStride:[n/x,i/E],uFieldSize:[n,i]});const L=e.read(A),D=new Float32Array(x*E);for(let P=0;P<D.length;P++)D[P]=ro(L[P*4],L[P*4+1]);D.sort();const U=new Float32Array(256);U[0]=1e9;for(let P=1;P<256;P++){const R=(1-P/255)*(D.length-1),C=Math.floor(R),I=Math.min(D.length-1,C+1);U[P]=D[C]+(D[I]-D[C])*(R-C)}U[255]=-1e9;for(const P of a)P!==b&&e.deleteTarget(P);return{target:b,width:n,height:i,thresholds:U}}catch(l){for(const u of a)e.deleteTarget(u);throw l}}const dt=1024,Ht=7,oo=8,so=4.5,lo=12e6,la={id:"halftoneTuring",title:"AM: Turing pattern",stage:"halftone",parent:"halftone",description:"Winding lines grown like a natural pattern (zebra stripes, coral). Lines get thicker in darker areas and touch at 100%.",visibleWhen:e=>e.halftone?.type==="turing",settings:[{kind:"select",key:"size",label:"Pattern size",default:"tile",display:"segmented",options:[{value:"tile",label:"Repeating tile"},{value:"whole",label:"Whole image"}],help:"Repeating tile: grows in a few seconds; the pattern repeats about every 146 lines. Whole image: nothing repeats and lines can follow the image, but it is much slower (about 30–40 s per ink for a Letter page at 600 DPI on a laptop; less with one shared pattern, a wider spacing or a smaller size), uses a lot of graphics memory, and regrows whenever the output size changes."},{kind:"toggle",key:"shared",label:"Same pattern for all inks",default:!1,help:"On: every ink uses the same lines, so overlapping inks stack. Off: each ink gets its own pattern."},{kind:"number",key:"cellSize",label:"Line spacing",perInk:!0,default:8,min:3,max:48,step:.5,unit:"px",help:"Distance between line centers, in output pixels.",visibleWhen:e=>!e.shared},{kind:"number",key:"spacing",label:"Line spacing",default:8,min:3,max:48,step:.5,unit:"px",help:"Distance between line centers, in output pixels.",visibleWhen:e=>e.shared===!0},{kind:"number",key:"spots",label:"Lines ↔ spots",default:0,min:0,max:100,step:1,unit:"%",help:"0 = continuous lines; higher breaks them into irregular spots."},{kind:"number",key:"branching",label:"Branching",default:30,min:0,max:100,step:1,unit:"%",help:"How often lines split, merge and end."},{kind:"number",key:"order",label:"Order",default:0,min:0,max:100,step:1,unit:"%",help:"0 = a winding maze; 100 = long parallel lines in the chosen direction."},{kind:"number",key:"direction",label:"Direction",perInk:!0,linkInks:!1,default:0,slotDefaults:[0,45,90,135],min:0,max:180,step:1,unit:"°",help:"Which way ordered lines run.",visibleWhen:e=>!e.shared&&Number(e.order)>0},{kind:"number",key:"sharedDirection",label:"Direction",default:0,min:0,max:180,step:1,unit:"°",help:"Which way ordered lines run.",visibleWhen:e=>e.shared===!0&&Number(e.order)>0},{kind:"number",key:"wobble",label:"Wobble",default:20,min:0,max:100,step:1,unit:"%",help:"How much the lines bend and wander."},{kind:"number",key:"follow",label:"Follow image",default:50,min:0,max:100,step:1,unit:"%",help:"Lines run along edges and contours in the image. Regrows the pattern when the image changes.",visibleWhen:e=>e.size==="whole"},{kind:"seed",key:"seed",label:"Random seed",default:1},...rt().filter(e=>e.key!=="shape").map(e=>e.key==="maxDot"?{...e,label:"Maximum line width",help:"Widest line, as a share of the spacing. Below 100% even solid areas keep thin gaps."}:e.key==="curve"?{...e,label:"Line width curve",help:"Maps tone to line width. Pull the middle down for thinner lines in the midtones."}:e)]},uo=e=>e*Math.PI/180;function St(e,t){const n=e.shared===!0,i=Array.from({length:B},(r,o)=>Math.max(1,Number(n?e.spacing:(e.cellSize??[])[o]??8))),a=Array.from({length:B},(r,o)=>uo(Number(n?e.sharedDirection:(e.direction??[])[o]??0)));return{spacing:i.map((r,o)=>o<t?r:i[0]),direction:a}}function Jn(e,t,n,i){return{spots:Number(e.spots)/100,branching:Number(e.branching)/100,order:Number(e.order)/100,direction:t,wobble:Number(e.wobble)/100,follow:i?Number(e.follow)/100:0,seed:n}}const qt=[];function Zn(e,t){for(qt.push({gpu:e,prepared:t});qt.length>2;){const n=qt.shift();for(const i of n.prepared.fields)n.gpu.deleteTarget(i.target)}}let Qn=0;function co(e,t){const n=t.inkCount??1,{spacing:i,direction:a}=St(e,n),r=Number(e.follow)>0;return[t.outputWidth,t.outputHeight,e.shared,i.slice(0,n),a.slice(0,n),e.follow,r?t.imageKey:""]}const ua={id:"turing",label:"AM: Turing pattern",section:la,reach(e){const{spacing:t}=St(e,B);return Math.max(4,...t)*1.5},prepareKey(e,t){const n=e,i=[n.size,n.spots,n.branching,n.order,n.wobble,n.seed,n.shared];return JSON.stringify(n.size==="whole"?[...i,...co(n,t)]:i)},async prepare(e,t){const n=e,i=t.gpu;if(!i)throw new Error("The Turing pattern needs the GPU");const a=++Qn,r=()=>a!==Qn,o=JSON.stringify([ua.prepareKey(e,t)]),s=Number(n.seed);if(n.size!=="whole"){const v=await Kn(i,{width:dt,height:dt,samples:Ht,periodic:!0,params:Jn(n,0,s,!1),isCancelled:r,onProgress:t.progress}),b={key:o,fields:[v],samples:[Ht],spacing:[],fieldOf:[0,0,0,0],whole:!1};return Zn(i,b),b}const l=t.inkCount??1,{spacing:u,direction:c}=St(n,l),h=n.shared===!0,f=h?1:l,d=Number(n.follow)>0&&!!t.analysis,m=[],p=[];try{for(let v=0;v<f;v++){const b=t.outputWidth/u[v],k=t.outputHeight/u[v],w=Math.min(oo,Math.sqrt(lo/(b*k))),M=Math.ceil(b*w)+2,S=Math.ceil(k*w)+2;if(w<so||Math.max(M,S)>i.maxTextureSize)throw new Error("The whole-image pattern is too large for this output size. Use a repeating tile, a wider line spacing, or a lower resolution");const y=d?t.analysis():null,T=await Kn(i,{width:M,height:S,samples:w,periodic:!1,params:Jn(n,c[v],s+v*101,d),orientation:y?{analysis:y,uvPerTexel:[u[v]/(w*t.outputWidth),u[v]/(w*t.outputHeight)],sigma:Math.max(1,2*u[v]/t.outputWidth*y.width)}:void 0,isCancelled:r,onProgress:x=>t.progress?.((v+x)/f)});m.push(T),p.push(w)}}catch(v){for(const b of m)i.deleteTarget(b.target);throw v}const g={key:o,fields:m,samples:p,spacing:u,fieldOf:Array.from({length:B},(v,b)=>h?0:Math.min(b,f-1)),whole:!0};return Zn(i,g),g},glsl:`
${ot}
uniform sampler2D uTuField0;
uniform sampler2D uTuField1;
uniform sampler2D uTuField2;
uniform sampler2D uTuField3;
uniform ivec4 uTuFieldOf;      // field per ink
uniform vec2 uTuFieldSize[4];  // texels, per field
uniform vec4 uTuScale;         // field texels per output px, per ink
uniform vec4 uTuAngle;         // radians, per ink (tile: each ink's view)
uniform vec2 uTuOffset[4];     // texels, per ink
uniform int uTuPeriodic;
uniform sampler2D uTuTable;    // 256 × 1, RGBA32F: per ink, tone → field threshold

vec2 tuRaw(int f, ivec2 c) {
  if (f == 1) return texelFetch(uTuField1, c, 0).rg;
  if (f == 2) return texelFetch(uTuField2, c, 0).rg;
  if (f == 3) return texelFetch(uTuField3, c, 0).rg;
  return texelFetch(uTuField0, c, 0).rg;
}
float tuValue(int f, ivec2 c) {
  ivec2 n = ivec2(uTuFieldSize[f]);
  c = uTuPeriodic == 1 ? ((c % n) + n) % n : clamp(c, ivec2(0), n - 1);
  vec2 b = floor(tuRaw(f, c) * 255.0 + 0.5);
  return ((b.x * 256.0 + b.y) / 65535.0 - 0.5) * 4.0;
}
float tuField(int ink, vec2 p) {
  int f = uTuFieldOf[ink];
  vec2 q = latRotate(p, -uTuAngle[ink]) * uTuScale[ink] + uTuOffset[ink] - 0.5;
  ivec2 i = ivec2(floor(q));
  vec2 t = q - floor(q);
  float a = tuValue(f, i), b = tuValue(f, i + ivec2(1, 0));
  float c = tuValue(f, i + ivec2(0, 1)), d = tuValue(f, i + ivec2(1, 1));
  return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
}

vec2 htSamplePoint(int ink, vec2 p) { return p; }

float htInk(int ink, vec2 p, float c) {
  c = latTone(ink, c);
  if (c <= 0.0) return 0.0;
  if (c >= 0.999) return 1.0;
  float x = c * 255.0;
  int i = int(floor(x));
  float lo = texelFetch(uTuTable, ivec2(min(i, 255), 0), 0)[ink];
  float hi = texelFetch(uTuTable, ivec2(min(i + 1, 255), 0), 0)[ink];
  return tuField(ink, p) >= mix(lo, hi, fract(x)) ? 1.0 : 0.0;
}
`,uniforms(e,t,n){const i=e,{spacing:a,direction:r}=St(i,t.inkCount),o=st(i,t,"cellSize",null,{key:"turing",measure:()=>new Float32Array(256)}),s=Array.from({length:4},(b,k)=>Math.min(1,(t.minDot[k]??0)/a[k])),l=n,u=l?.fields??[],c=new Float32Array(256*4).fill(1e9);if(l)for(let b=0;b<4;b++){const k=u[l.fieldOf[b]];for(let w=0;w<256;w++)c[w*4+b]=k.thresholds[w]}const h=i.shared===!0,f=ve(Number(i.seed)*4099+11),d=[];for(let b=0;b<4;b++)d.push(f()*dt,f()*dt);const m=l?.whole??!1,p=Array.from({length:4},(b,k)=>m?l.samples[l.fieldOf[k]]/l.spacing[k]:Ht/a[k]),g=o.uLatCurve.texture,v=b=>({texture:(u[b]??u[0])?.target.texture??g});return{...o,uLatMinFrac:s,uTuField0:v(0),uTuField1:v(1),uTuField2:v(2),uTuField3:v(3),uTuFieldOf:l?.fieldOf??[0,0,0,0],uTuFieldSize:Array.from({length:4},(b,k)=>{const w=u[k]??u[0];return w?[w.width,w.height]:[1,1]}).flat(),uTuScale:p,uTuAngle:m?[0,0,0,0]:r,uTuOffset:m?[0,0,0,0,0,0,0,0]:h?Array.from({length:4},()=>[d[0],d[1]]).flat():d,uTuPeriodic:m?0:1,uTuTable:{texture:gn(t.gpu,`turing:${l?.key??"none"}`,256,1,c,4)}}}},ei=Math.SQRT1_2,ca={id:"halftoneFm",title:"FM: blue noise",stage:"halftone",parent:"halftone",description:"Same-size dots, more of them in darker areas, spread evenly without clumps.",visibleWhen:e=>e.halftone?.type==="fm",settings:[{kind:"number",key:"dotSize",label:"Dot size",perInk:!0,default:2,min:1,max:12,step:.5,unit:"px",help:"In output pixels. Never smaller than the minimum dot size."},{kind:"select",key:"shape",label:"Dot shape",default:"round",display:"segmented",options:[{value:"round",label:"Round"},{value:"square",label:"Square"}]},{kind:"number",key:"minDensity",label:"Dot density in light areas",default:0,min:0,max:100,step:1,unit:"%",help:"Share of dots placed where the tone is lightest."},{kind:"number",key:"maxDensity",label:"Dot density in dark areas",default:100,min:0,max:100,step:1,unit:"%",help:"Share of dots placed where the tone is darkest."},{kind:"select",key:"mapSize",label:"Threshold map size",default:"128",display:"segmented",options:[{value:"64",label:"64"},{value:"128",label:"128"},{value:"256",label:"256"}],help:"Larger maps repeat less visibly but take longer to build (once, then cached)."},{kind:"number",key:"spread",label:"Filter spread",default:1.9,min:1,max:3,step:.1,help:"How far apart dots push each other while the map is built. Higher = smoother, more even spacing."},{kind:"seed",key:"seed",label:"Random seed",default:1}]};let ti=null;const jt=new Map;function ho(e,t){const n=`${e}|${t}`;let i=jt.get(n);return i||(ti??=new vn(new Worker(new URL(""+new URL("blueNoise.worker-hi6Eb3lr.js",import.meta.url).href,import.meta.url),{type:"module"})),i=ti.run({size:e,sigma:t}),i.catch(()=>jt.delete(n)),jt.set(n,i)),i}const ni=new WeakMap;function mo(e,t){const n=ni.get(t);if(n&&n.gl===e)return n.texture;const i=e.createTexture();return e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texImage2D(e.TEXTURE_2D,0,e.R32F,t.size,t.size,0,e.RED,e.FLOAT,t.thresholds),ni.set(t,{gl:e,texture:i}),i}const po={id:"fm",label:"FM: blue noise",section:ca,prepareKey:e=>`${e.mapSize}|${e.spread}`,prepare:e=>ho(Number(e.mapSize),e.spread),glsl:`
uniform sampler2D uFmMap;   // thresholds 0..1, read with texelFetch
uniform int uFmMapSize;
uniform vec4 uFmDot;        // dot size per ink, output px
uniform vec2 uFmOffset[4];  // per-ink offset into the map (cells)
uniform float uFmMin;
uniform float uFmMax;
uniform int uFmRound;
uniform sampler2D uFmRoundDensity; // tone → density that gives that tone with round dots

vec2 htSamplePoint(int ink, vec2 p) {
  float d = uFmDot[ink];
  return (floor(p / d) + 0.5) * d;
}

// Is there a dot in this cell? (Its threshold is below the tone at the cell's center.)
float fmCellOn(int ink, vec2 cell) {
  float d = uFmDot[ink];
  float c = htCoverage(ink, (cell + 0.5) * d);
  if (c <= 0.004) return 0.0;
  float density = mix(uFmMin, uFmMax, clamp(c, 0.0, 1.0));
  // Round dots overlap, so fewer of them are needed for the same tone.
  if (uFmRound == 1) density = texture(uFmRoundDensity, vec2((density * 255.0 + 0.5) / 256.0, 0.5)).r;
  ivec2 idx = ivec2(mod(cell + uFmOffset[ink], float(uFmMapSize)));
  return texelFetch(uFmMap, idx, 0).r < density ? 1.0 : 0.0;
}

float htInk(int ink, vec2 p, float c) {
  vec2 q = p / uFmDot[ink];
  if (uFmRound == 0) return fmCellOn(ink, floor(q));
  // Round dots are big enough that neighbors merge into solid ink, so they
  // reach into surrounding cells: check the 3×3 cells around p.
  vec2 home = floor(q);
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 cell = home + vec2(float(i), float(j));
      vec2 f = q - (cell + 0.5);
      if (dot(f, f) <= ${(ei*ei).toFixed(4)} && fmCellOn(ink, cell) > 0.5) return 1.0;
    }
  }
  return 0.0;
}
`,uniforms(e,t,n){const i=n?.size??1,a=ve(e.seed*7919+17),r=[];for(let o=0;o<4;o++)r.push(Math.floor(a()*i),Math.floor(a()*i));return{uFmMap:{texture:n?mo(t.gpu.gl,n):ri(t.gpu.gl)},uFmMapSize:i,uFmDot:Array.from({length:4},(o,s)=>Math.max(1,e.dotSize[s]??2,t.minDot[s]??0)),uFmOffset:r,uFmMin:e.minDensity/100,uFmMax:e.maxDensity/100,uFmRound:e.shape==="round"?1:0,uFmRoundDensity:{texture:n?fo(t.gpu.gl,n):ri(t.gpu.gl)}}}},ii=new WeakMap;function fo(e,t){const n=ii.get(t);if(n&&n.gl===e)return n.texture;const i=t.roundCoverage,a=i.length-1,r=new Float32Array(256);for(let s=0;s<256;s++){const l=s/255;let u=0;for(;u<a&&i[u+1]<l;)u++;const c=i[u],h=i[Math.min(a,u+1)],f=h>c?(l-c)/(h-c):0;r[s]=Math.min(1,(u+Math.min(1,Math.max(0,f)))/a)}const o=e.createTexture();return e.bindTexture(e.TEXTURE_2D,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texImage2D(e.TEXTURE_2D,0,e.R32F,256,1,0,e.RED,e.FLOAT,r),ii.set(t,{gl:e,texture:o}),o}const ai=new WeakMap;function ri(e){let t=ai.get(e);return t||(t=e.createTexture(),e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(e.TEXTURE_2D,0,e.R32F,1,1,0,e.RED,e.FLOAT,new Float32Array([1])),ai.set(e,t)),t}const da={id:"halftoneDiffusion",title:"FM: error diffusion",stage:"halftone",parent:"halftone",description:"Classic dithering: each dot passes its tone error to its neighbors. Fine, organic texture.",visibleWhen:e=>e.halftone?.type==="diffusion",settings:[{kind:"select",key:"kernel",label:"Kernel",default:"floyd",options:[{value:"floyd",label:"Floyd–Steinberg"},{value:"atkinson",label:"Atkinson (cleaner highlights and shadows)"},{value:"jarvis",label:"Jarvis (smoother)"},{value:"stucki",label:"Stucki (smoother, sharper)"}]},{kind:"number",key:"dotSize",label:"Dot size",default:2,min:1,max:12,step:.5,unit:"px",help:"In output pixels, for all inks. Never smaller than the largest minimum dot size."},{kind:"select",key:"shape",label:"Dot shape",default:"square",display:"segmented",options:[{value:"round",label:"Round"},{value:"square",label:"Square"}]},{kind:"toggle",key:"serpentine",label:"Serpentine scanning",default:!0,help:"Alternate direction on every row; avoids streaks."},{kind:"number",key:"noise",label:"Threshold noise",default:0,min:0,max:100,step:1,unit:"%",help:"Randomness in the on/off decision; breaks up worm-like patterns."},{kind:"seed",key:"seed",label:"Random seed",default:1}]},go={id:"diffusion",label:"FM: error diffusion",section:da,fromCoverage:{cell:(e,t)=>Math.max(1,Number(e.dotSize),...t.minDot.slice(0,t.inkCount)),async build(e,t,n,i,a,r){const o={kernel:String(e.kernel),serpentine:!!e.serpentine,noise:Number(e.noise)/100,seed:Number(e.seed)},s=await ut(r).run({kind:"diffusion",coverage:t,width:n,height:i,inkCount:a,options:o},{transfer:[t.buffer]});if(s.kind!=="diffusion")throw new Error("unexpected worker result");return s.bits}},glsl:`
uniform sampler2D uEdBits;     // one ink per channel, 1 = ink
uniform vec2 uEdGrid;          // cells
uniform float uEdCell;         // output px per cell
uniform int uEdRound;

float edCell(int ink, vec2 cell) {
  if (any(lessThan(cell, vec2(0.0))) || any(greaterThanEqual(cell, uEdGrid))) return 0.0;
  return texelFetch(uEdBits, ivec2(cell), 0)[ink];
}

vec2 htSamplePoint(int ink, vec2 p) { return p; }

float htInk(int ink, vec2 p, float c) {
  vec2 q = p / uEdCell;
  if (uEdRound == 0) return edCell(ink, floor(q)) > 0.5 ? 1.0 : 0.0;
  // Round dots covering one cell's area (radius 1/sqrt(pi)), which may reach into neighbors.
  vec2 home = floor(q);
  for (int dy = -1; dy <= 1; dy++) {
    for (int dx = -1; dx <= 1; dx++) {
      vec2 cell = home + vec2(float(dx), float(dy));
      vec2 f = q - (cell + 0.5);
      if (dot(f, f) <= 0.3183 && edCell(ink, cell) > 0.5) return 1.0;
    }
  }
  return 0.0;
}
`,uniforms(e,t,n,i){const a=t.gpu.gl,r=vo.get(a,i??Vt,()=>{const s=i??Vt,l=a.createTexture();return a.bindTexture(a.TEXTURE_2D,l),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.pixelStorei(a.UNPACK_ALIGNMENT,4),a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,s.width,s.height,0,a.RGBA,a.UNSIGNED_BYTE,s.bits),l}),o=i??Vt;return{uEdBits:{texture:r},uEdGrid:[o.width,o.height],uEdCell:o.cell,uEdRound:e.shape==="round"?1:0}}},Vt={bits:new Uint8Array(4),width:1,height:1,cell:1},vo=new lt,bo=512,ko=8,Ne=33,ha=3;function oi(e){const t=Math.min(8,(e.shape===2?3.5:1)*(1+2*e.stretch)),n=Math.sqrt(t),i=1+.33*e.wobble+.3*e.rough+e.grain,a=e.bleed*.5,r=Math.exp(.7*e.sizeVar),o=1+.5*e.toneSize,s=Math.min(ha,.5*r*o*n*i+a);return{major:n,minor:1/n,extent:i,bleed:a,reach:s}}const ma={id:"halftoneStipple",title:"FM: stipple",stage:"halftone",parent:"halftone",description:"Hand-stippled dots with no grid: every dot a little different, more of them in darker areas.",visibleWhen:e=>e.halftone?.type==="stipple",settings:[{kind:"number",key:"dotSize",label:"Dot size",perInk:!0,default:4,min:1,max:24,step:.5,unit:"px",help:"Typical dot diameter in output pixels (at mid tones)."},{kind:"select",key:"shape",label:"Dot shape",default:"round",display:"segmented",options:[{value:"round",label:"Round"},{value:"chip",label:"Chip"},{value:"dash",label:"Dash"}],help:"Round: pen dots. Chip: angular flecks, like a carved block. Dash: short pen strokes."},{kind:"number",key:"sizeVariation",label:"Size variation",default:30,min:0,max:100,step:1,unit:"%",help:"Random difference in size from dot to dot."},{kind:"number",key:"toneSize",label:"Size follows tone",default:40,min:0,max:100,step:1,unit:"%",help:"Bigger dots in dark areas and smaller ones in light areas, like pressing harder with the pen."},{kind:"number",key:"irregularity",label:"Placement irregularity",default:25,min:0,max:100,step:1,unit:"%",help:"0 = evenly spaced; higher = looser, more random spacing with small gaps and clusters."},{kind:"number",key:"wobble",label:"Shape wobble",default:35,min:0,max:100,step:1,unit:"%",help:"How lumpy and uneven each dot's outline is."},{kind:"number",key:"roughness",label:"Edge roughness",default:20,min:0,max:100,step:1,unit:"%",help:"Fine ragged detail along each dot's edge."},{kind:"number",key:"stretch",label:"Stretch",default:0,min:0,max:100,step:1,unit:"%",help:"Makes dots longer in one direction."},{kind:"number",key:"direction",label:"Direction",default:30,min:0,max:180,step:1,unit:"°",visibleWhen:e=>Number(e.stretch)>0||e.shape==="dash"},{kind:"number",key:"directionVariation",label:"Direction variation",default:100,min:0,max:100,step:1,unit:"%",help:"0 = every dot at the same angle (a steady hand); 100 = any angle.",visibleWhen:e=>Number(e.stretch)>0||e.shape==="dash"},{kind:"number",key:"bleed",label:"Ink bleed",default:0,min:0,max:100,step:1,unit:"%",help:"Nearby dots flow into each other, like wet ink."},{kind:"number",key:"grain",label:"Ink grain",default:0,min:0,max:100,step:1,unit:"%",help:"Gritty, uneven ink: pitted edges and specks of paper inside dots."},{kind:"seed",key:"seed",label:"Random seed",default:1}]},xo={round:0,chip:1,dash:2};function Xe(e){return{shape:xo[String(e.shape)]??0,sizeVar:Number(e.sizeVariation)/100,toneSize:Number(e.toneSize)/100,wobble:Number(e.wobble)/100,rough:Number(e.roughness)/100,stretch:Number(e.stretch)/100,dirAngle:Number(e.direction)*Math.PI/180,dirVar:Number(e.directionVariation)/100,bleed:Number(e.bleed)/100,grain:Number(e.grain)/100}}let He=null;function yo(e){if(He?.irregularity!==e){const t=ut("stipple").run({kind:"stipplePoints",irregularity:e}).then(i=>{if(i.kind!=="stipplePoints")throw new Error("unexpected worker result");return i.data}),n={irregularity:e,data:t};He=n,t.catch(()=>{He===n&&(He=null)})}return He.data}const V=bo,we=ko,So={id:"stipple",label:"FM: stipple",section:ma,reach(e,t){const n=oi(Xe(e)),i=e.dotSize.slice(0,t.inkCount);return Math.max(...i.map((a,r)=>Math.max(1,a,t.minDot[r]??0)))*(n.reach+1)},prepareKey:e=>JSON.stringify([e.irregularity,Xe(e)]),async prepare(e){const t=Number(e.irregularity)/100,n=await yo(t),i=await ut("stipple").run({kind:"stippleMeasure",irregularity:t,params:Xe(e)});if(i.kind!=="stippleMeasure")throw new Error("unexpected worker result");return{points:n,table:i.table,key:JSON.stringify([t,Xe(e)])}},glsl:`
uniform sampler2D uStPoints;   // ${V*we} × ${V}: per bucket ${we} slots of (x, y, rank hi, rank lo)
uniform sampler2D uStTable;    // ${Ne} × 1: tone → rank threshold
uniform vec4 uStDot;           // dot size per ink, output px
uniform vec4 uStMinFrac;       // minimum dot / dot size, per ink
uniform vec2 uStOffset[4];     // per-ink view into the point set (dot units, ≥ ${V})
uniform int uStSeed;
uniform int uStShape;
uniform float uStReach;
uniform float uStSizeVar;
uniform float uStToneSize;
uniform float uStWobble;
uniform float uStRough;
uniform float uStDirAngle;
uniform float uStDirVar;
uniform float uStBleed;
uniform float uStGrain;
uniform float uStMajor;
uniform float uStMinor;
uniform float uStExtent;

uint stHash(uint v) {
  v = v * 747796405u + 2891336453u;
  uint w = ((v >> ((v >> 28u) + 4u)) ^ v) * 277803737u;
  return (w >> 22u) ^ w;
}
float stRnd(uint base, int k) { return float(stHash(base + uint(k) * 0x9E3779B9u) >> 8u) / 16777216.0; }
float stCorner(int ix, int iy, uint seed) {
  return float(stHash((uint(ix) * 73856093u) ^ (uint(iy) * 19349663u) ^ seed) >> 8u) / 16777216.0;
}
float stNoise(vec2 x, uint seed) {
  vec2 i = floor(x);
  vec2 f = x - i;
  f = f * f * (3.0 - 2.0 * f);
  int ix = int(i.x), iy = int(i.y);
  float a = stCorner(ix, iy, seed), b = stCorner(ix + 1, iy, seed);
  float c = stCorner(ix, iy + 1, seed), d = stCorner(ix + 1, iy + 1, seed);
  return a + (b - a) * f.x + (c - a) * f.y + (a - b - c + d) * f.x * f.y;
}
float stSmin(float a, float b, float k) {
  if (k <= 0.0) return min(a, b);
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * k * 0.25;
}
float stThreshold(float c) {
  float x = clamp(c, 0.0, 1.0) * ${(Ne-1).toFixed(1)};
  int i = int(floor(x));
  float a = texelFetch(uStTable, ivec2(min(i, ${Ne-1}), 0), 0).r;
  float b = texelFetch(uStTable, ivec2(min(i + 1, ${Ne-1}), 0), 0).r;
  return mix(a, b, fract(x));
}

// Mirrors stippleSdf() in engine/halftone/stipple.ts. v and the result are in dot units.
float stSdf(vec2 v, float c, uint base, float minFrac) {
  const float PI = 3.14159265;
  float g = 1.0 + uStToneSize * (c - 0.5);
  float s = exp(0.7 * uStSizeVar * (2.0 * stRnd(base, 0) - 1.0));
  float r = max(0.5 * s * g, 0.5 * minFrac);
  float bound = r * uStMajor * uStExtent + uStBleed * 0.5;
  if (dot(v, v) > bound * bound) return 1e9;
  float ang = uStDirAngle + uStDirVar * (stRnd(base, 1) - 0.5) * 2.0 * PI;
  float ca = cos(ang), sa = sin(ang);
  vec2 u = vec2((ca * v.x + sa * v.y) / (r * uStMajor), (-sa * v.x + ca * v.y) / (r * uStMinor));
  float len = length(u);
  float th = len < 1e-4 ? 0.0 : atan(u.y, u.x);
  float R = 1.0;
  if (uStShape == 1) {
    float n = 3.0 + floor(stRnd(base, 2) * 4.0);
    float sec = 2.0 * PI / n;
    float m = mod(th + PI, sec);
    R = cos(PI / n) / cos(m - PI / n);
  }
  if (uStWobble > 0.0) {
    float w = 0.0;
    for (int k = 2; k <= 4; k++) w += (2.0 * stRnd(base, 1 + k) - 1.0) * (0.3 / float(k)) * cos(float(k) * th + 2.0 * PI * stRnd(base, 4 + k));
    R += uStWobble * w;
  }
  if (uStRough > 0.0) {
    float w = stRnd(base, 9) * 0.12 * cos(7.0 * th + 2.0 * PI * stRnd(base, 12))
      + stRnd(base, 10) * 0.12 * sqrt(7.0 / 11.0) * cos(11.0 * th + 2.0 * PI * stRnd(base, 13))
      + stRnd(base, 11) * 0.12 * sqrt(7.0 / 17.0) * cos(17.0 * th + 2.0 * PI * stRnd(base, 14));
    R += uStRough * w;
  }
  float sdf = len - R;
  if (uStGrain > 0.0) sdf += uStGrain * (stNoise(u * 2.5 + 64.0, stHash(base + 15u)) - 0.3) * 1.4;
  return sdf * r * uStMinor;
}

vec2 htSamplePoint(int ink, vec2 p) { return p; }

float htInk(int ink, vec2 p, float c) {
  if (c >= 0.995) return 1.0;
  float D = uStDot[ink];
  vec2 q = p / D + uStOffset[ink];
  ivec2 lo = ivec2(floor(q - uStReach));
  ivec2 hi = ivec2(floor(q + uStReach));
  float reach2 = uStReach * uStReach;
  float acc = 1e9;
  for (int by = lo.y; by <= hi.y; by++) {
    int wy = by % ${V};
    for (int bx = lo.x; bx <= hi.x; bx++) {
      int wx = bx % ${V};
      uint salt = stHash(uint(bx / ${V}) * 0x9E3779B1u ^ uint(by / ${V}) * 0x85EBCA77u ^ uint(ink) * 0xC2B2AE3Du ^ uint(uStSeed) * 0x27D4EB2Fu);
      for (int j = 0; j < ${we}; j++) {
        vec4 s = texelFetch(uStPoints, ivec2(wx * ${we} + j, wy), 0) * 255.0;
        float rank16 = s.b * 256.0 + s.a;
        if (rank16 > 65534.5) break;
        vec2 center = vec2(float(bx), float(by)) + (s.rg + 0.5) / 255.0;
        vec2 v = q - center;
        if (dot(v, v) > reach2) continue;
        // Each dot takes the tone at its own center, so dots are never cut in half by an edge.
        float ci = htCoverage(ink, (center - uStOffset[ink]) * D);
        if (ci <= 0.002 || rank16 / 65535.0 >= stThreshold(ci)) continue;
        uint id = uint((wy * ${V} + wx) * ${we} + j);
        acc = stSmin(acc, stSdf(v, ci, stHash(id ^ salt), uStMinFrac[ink]), uStBleed * 0.5);
        if (acc < 0.0) return 1.0;
      }
    }
  }
  return 0.0;
}
`,uniforms(e,t,n){const i=e,a=Xe(i),r=oi(a),o=t.gpu.gl,s=ve(Number(i.seed)*6151+29),l=[];for(let h=0;h<4;h++)l.push(V+s()*V,V+s()*V);const u=Array.from({length:4},(h,f)=>Math.max(1,i.dotSize[f]??4,t.minDot[f]??0)),c=n?.table??To;return{uStPoints:{texture:Ro(o,n?.points??Eo())},uStTable:{texture:gn(t.gpu,`stipple:${n?.key??"none"}`,Ne,1,c)},uStDot:u,uStMinFrac:u.map((h,f)=>Math.min(1,(t.minDot[f]??0)/h)),uStOffset:l,uStSeed:Number(i.seed)&2147483647,uStShape:a.shape,uStReach:Math.min(ha,r.reach),uStSizeVar:a.sizeVar,uStToneSize:a.toneSize,uStWobble:a.wobble,uStRough:a.rough,uStDirAngle:a.dirAngle,uStDirVar:a.dirVar,uStBleed:a.bleed,uStGrain:a.grain,uStMajor:r.major,uStMinor:r.minor,uStExtent:r.extent}}};let wo=null;const Eo=()=>wo??=new Uint8Array(V*we*V*4).fill(255),To=new Float32Array(Ne).fill(-1),Mo=new lt;function Ro(e,t){return Mo.get(e,t,()=>{const n=e.createTexture();return e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,V*we,V,0,e.RGBA,e.UNSIGNED_BYTE,t),n})}const pa=[jr,Ir,Pr,zr,$r,ua,po,So,go],Co=[ra,ea,ta,ia,na,la,ca,ma,da],Io={AM:"Amplitude (AM): dot size shows tone",FM:"Frequency (FM): dot count shows tone"},Ao=[{value:"none",label:"None (printer halftone)"},...pa.map(e=>{const[,t="",n=e.label]=/^(AM|FM): (.*)$/.exec(e.label)??[];return{value:e.id,label:n.charAt(0).toUpperCase()+n.slice(1),group:Io[t]}})];function Lo(e){return pa.find(t=>t.id===e)??null}class tt extends Error{constructor(t){super(t),this.name="GLError"}}function fa(e,t){const n=e.getContext("webgl2",t);if(!n)throw new tt("This browser doesn't support WebGL2, which Photo Inker needs.");return n}function si(e,t,n){const i=e.createShader(t);if(!i)throw new tt("Couldn't create shader");if(e.shaderSource(i,n),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS)){const a=e.getShaderInfoLog(i);throw e.deleteShader(i),new tt(`Shader compile failed: ${a}`)}return i}function xn(e,t,n){const i=e.createProgram();if(!i)throw new tt("Couldn't create program");const a=si(e,e.VERTEX_SHADER,t),r=si(e,e.FRAGMENT_SHADER,n);if(e.attachShader(i,a),e.attachShader(i,r),e.linkProgram(i),e.deleteShader(a),e.deleteShader(r),!e.getProgramParameter(i,e.LINK_STATUS)){const o=e.getProgramInfoLog(i);throw e.deleteProgram(i),new tt(`Program link failed: ${o}`)}return i}function ga(e,t,n){const i={};for(const a of n)i[a]=e.getUniformLocation(t,a);return i}const yn=`#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`,ae=`
vec3 linearToSrgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  vec3 lo = c * 12.92;
  vec3 hi = 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055;
  return mix(hi, lo, vec3(lessThanEqual(c, vec3(0.0031308))));
}
`,ct=`
vec3 srgbToLinear(vec3 c) {
  vec3 lo = c / 12.92;
  vec3 hi = pow((c + 0.055) / 1.055, vec3(2.4));
  return mix(hi, lo, vec3(lessThanEqual(c, vec3(0.04045))));
}
`,va=["luma","lstar","red","green","blue","max","min"],ba=`
float lightness(vec3 lin, int source) {
  vec3 s = linearToSrgb(lin);
  if (source == 1) {
    float y = dot(clamp(lin, 0.0, 1.0), vec3(0.2126, 0.7152, 0.0722));
    return (y > 0.008856 ? 116.0 * pow(y, 1.0 / 3.0) - 16.0 : 903.3 * y) / 100.0;
  }
  if (source == 2) return s.r;
  if (source == 3) return s.g;
  if (source == 4) return s.b;
  if (source == 5) return max(s.r, max(s.g, s.b));
  if (source == 6) return min(s.r, min(s.g, s.b));
  return dot(s, vec3(0.2126, 0.7152, 0.0722)); // luma (gamma-encoded)
}
`;const K=5;function Po(e,t){switch(e){case"rgb":return["Red (inverted)","Green (inverted)","Blue (inverted)"];case"cmyk":return["Cyan","Magenta","Yellow","Black"];case"lab":return t?["Lightness (inverted)","a+ (red)","a− (green)","b+ (yellow)","b− (blue)"]:["Lightness (inverted)","a","b"];case"hsl":return["Hue","Saturation","Lightness (inverted)"];default:return t?["Luma (inverted)","Cb+ (blue)","Cb− (yellow)","Cr+ (red)","Cr− (green)"]:["Luma (inverted)","Cb","Cr"]}}const Do=[{value:"none",label:"Dropped"},{value:"0",label:"Ink 1"},{value:"1",label:"Ink 2"},{value:"2",label:"Ink 3"},{value:"3",label:"Ink 4"}],Mt=[];for(let e=0;e<K;e++)Mt.push({kind:"select",key:`ch${e}Ink`,label:`Channel ${e+1} ink`,default:e<B?String(e):"none",options:Do,hidden:!0},{kind:"number",key:`ch${e}Intensity`,label:`Channel ${e+1} intensity`,default:100,min:0,max:300,step:1,hidden:!0},{kind:"number",key:`ch${e}Opacity`,label:`Channel ${e+1} opacity`,default:100,min:0,max:100,step:1,hidden:!0});for(let e=0;e<B;e++){for(let t=0;t<K;t++)Mt.push({kind:"number",key:`m${e}_${t}`,label:`Ink ${e+1} ← channel ${t+1}`,default:e===t?1:0,min:-2,max:2,step:.01,hidden:!0});Mt.push({kind:"number",key:`m${e}_offset`,label:`Ink ${e+1} offset`,default:0,min:-1,max:1,step:.01,hidden:!0})}const ka={id:"splitChannel",title:"Channel Split",stage:"split",parent:"split",description:"Turns each channel of a color space into an ink. Quick full-color approximations, CMY-like ink sets, and experimental color shifts.",visibleWhen:e=>e.split?.method==="channel",settings:[{kind:"select",key:"space",label:"Color space",default:"cmyk",options:[{value:"rgb",label:"RGB (inverted)"},{value:"cmyk",label:"CMYK"},{value:"lab",label:"Lab"},{value:"hsl",label:"HSL"},{value:"ycbcr",label:"YCbCr"}]},{kind:"number",key:"blackGeneration",label:"Black generation",default:50,min:0,max:100,step:1,unit:"%",help:"How much of the dark tones move from C, M, and Y to the black channel.",visibleWhen:e=>e.space==="cmyk"},{kind:"toggle",key:"splitSigned",label:"Split a/b into + and − halves",default:!0,help:"So one axis can drive two inks, e.g. a+ to a red ink and a− to a green one.",visibleWhen:e=>e.space==="lab"||e.space==="ycbcr"},{kind:"select",key:"blend",label:"Merging channels into one ink",default:"add",options:[{value:"add",label:"Add"},{value:"max",label:"Max"},{value:"average",label:"Average"},{value:"screen",label:"Screen"}],visibleWhen:e=>!e.advanced},{kind:"toggle",key:"advanced",label:"Advanced mixer matrix",default:!1,hidden:!0},...Mt]},_o={rgb:0,cmyk:1,lab:2,hsl:3,ycbcr:4},No={add:0,max:1,average:2,screen:3},Fo=`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uImage;
uniform vec2 uSize;
uniform int uSpace;
uniform float uBlackGen;
uniform int uSplit;
uniform int uAdvanced;
uniform int uBlend;
uniform float uChInk[${K}];     // target ink per channel (-1 = dropped)
uniform float uChGain[${K}];
uniform float uChOpacity[${K}];
uniform float uMatrix[${B*K}];
uniform vec4 uOffset;
uniform int uInkCount;
out vec4 outColor;
${ae}

float labF(float t) { return t > 0.008856 ? pow(t, 1.0 / 3.0) : 7.787 * t + 16.0 / 116.0; }

// Channel values 0..1 (signed ones -1..1 before splitting). Unused slots are 0.
void channels(vec3 lin, out float ch[${K}]) {
  for (int i = 0; i < ${K}; i++) ch[i] = 0.0;
  vec3 s = linearToSrgb(lin);
  if (uSpace == 0) {
    ch[0] = 1.0 - s.r; ch[1] = 1.0 - s.g; ch[2] = 1.0 - s.b;
  } else if (uSpace == 1) {
    vec3 cmy = 1.0 - s;
    float k = min(cmy.r, min(cmy.g, cmy.b)) * uBlackGen;
    vec3 c = k < 0.999 ? (cmy - k) / (1.0 - k) : vec3(0.0);
    ch[0] = c.r; ch[1] = c.g; ch[2] = c.b; ch[3] = k;
  } else if (uSpace == 2) {
    vec3 c = clamp(lin, 0.0, 1.0);
    float x = dot(c, vec3(0.4124564, 0.3575761, 0.1804375)) / 0.95047;
    float y = dot(c, vec3(0.2126729, 0.7151522, 0.072175));
    float z = dot(c, vec3(0.0193339, 0.119192, 0.9503041)) / 1.08883;
    float fx = labF(x), fy = labF(y), fz = labF(z);
    float L = 116.0 * fy - 16.0, a = 500.0 * (fx - fy), b = 200.0 * (fy - fz);
    ch[0] = 1.0 - L / 100.0;
    // a and b reach roughly ±100 for vivid sRGB colors.
    if (uSplit == 1) {
      ch[1] = max(a, 0.0) / 90.0; ch[2] = max(-a, 0.0) / 90.0; ch[3] = max(b, 0.0) / 90.0; ch[4] = max(-b, 0.0) / 90.0;
    } else {
      ch[1] = 0.5 + a / 180.0; ch[2] = 0.5 + b / 180.0;
    }
  } else if (uSpace == 3) {
    float mx = max(s.r, max(s.g, s.b)), mn = min(s.r, min(s.g, s.b));
    float l = (mx + mn) * 0.5, d = mx - mn;
    float sat = d < 1e-5 ? 0.0 : d / (1.0 - abs(2.0 * l - 1.0));
    float h = 0.0;
    if (d > 1e-5) {
      if (mx == s.r) h = mod((s.g - s.b) / d, 6.0);
      else if (mx == s.g) h = (s.b - s.r) / d + 2.0;
      else h = (s.r - s.g) / d + 4.0;
    }
    ch[0] = h / 6.0; ch[1] = clamp(sat, 0.0, 1.0); ch[2] = 1.0 - l;
  } else {
    float yy = dot(s, vec3(0.299, 0.587, 0.114));
    float cb = (s.b - yy) / 1.772, cr = (s.r - yy) / 1.402;  // -0.5..0.5
    ch[0] = 1.0 - yy;
    if (uSplit == 1) {
      ch[1] = max(cb, 0.0) * 2.0; ch[2] = max(-cb, 0.0) * 2.0; ch[3] = max(cr, 0.0) * 2.0; ch[4] = max(-cr, 0.0) * 2.0;
    } else {
      ch[1] = 0.5 + cb; ch[2] = 0.5 + cr;
    }
  }
}

void main() {
  vec4 t = texture(uImage, gl_FragCoord.xy / uSize);
  float ch[${K}];
  channels(t.rgb, ch);
  vec4 ink = vec4(0.0);
  if (uAdvanced == 1) {
    for (int i = 0; i < ${B}; i++) {
      float v = uOffset[i];
      for (int c = 0; c < ${K}; c++) v += uMatrix[i * ${K} + c] * ch[c];
      ink[i] = v;
    }
  } else {
    vec4 count = vec4(0.0);
    vec4 keep = vec4(1.0); // for screen: product of (1 - v)
    for (int c = 0; c < ${K}; c++) {
      int target = int(uChInk[c]);
      if (target < 0 || target >= ${B}) continue;
      float v = clamp(ch[c] * uChGain[c], 0.0, 1.0) * uChOpacity[c];
      if (uBlend == 1) ink[target] = max(ink[target], v);
      else if (uBlend == 3) keep[target] *= 1.0 - v;
      else ink[target] += v;
      count[target] += 1.0;
    }
    if (uBlend == 2) ink /= max(count, vec4(1.0));
    if (uBlend == 3) ink = 1.0 - keep;
  }
  for (int i = 0; i < ${B}; i++) if (i >= uInkCount) ink[i] = 0.0;
  outColor = clamp(ink, 0.0, 1.0);
}
`,qe=(e,t,n=0)=>typeof e[t]=="number"?e[t]:n,$o={id:"channel",label:"Channel Split",section:ka,dependsOn:()=>null,render(e,t,n,i){const a=i,r=[],o=[],s=[];for(let c=0;c<K;c++){const h=String(a[`ch${c}Ink`]??"none");r.push(h==="none"?-1:Number(h)),o.push(qe(a,`ch${c}Intensity`,100)/100),s.push(qe(a,`ch${c}Opacity`,100)/100)}const l=[],u=[];for(let c=0;c<B;c++){for(let h=0;h<K;h++)l.push(qe(a,`m${c}_${h}`));u.push(qe(a,`m${c}_offset`))}e.gpu.pass(Fo,n,{uImage:{texture:t.texture},uSize:[n.width,n.height],uSpace:_o[String(a.space)]??1,uBlackGen:qe(a,"blackGeneration",50)/100,uSplit:a.splitSigned?1:0,uAdvanced:a.advanced?1:0,uBlend:No[String(a.blend)]??0,uChInk:r,uChGain:o,uChOpacity:s,uMatrix:l,uOffset:u,uInkCount:e.inkCount})}};function wt(e,t,n,i){const a=Math.min(t,n)/100,r=e.frame==="ink"?1:e.frame==="paper"?2:0,o=r===0?0:e.frameThickness*a,s=Math.max(0,o),l=Math.min(Math.max(0,-o),Math.min(t,n)/2),u=[l,l,t-l,n-l],c=r===0?0:Math.min(e.frameRadius*a,Math.min(u[2]-u[0],u[3]-u[1])/2);return{margin:s,canvas:[-s,-s,t+s,n+s],inner:u,radius:c,mode:r,ink:Math.max(0,Math.min(i-1,Number(e.frameInk)||0))}}const Ze=256;function Uo(e){let t;if(e.fadeCurve==="linear")t=o=>1-o;else if(e.fadeCurve==="exponential")t=o=>1-(Math.exp(4*o)-1)/(Math.exp(4)-1);else if(e.fadeCurve==="custom"){const o=Te(e.fadeCustom,1024);t=s=>o[Math.min(1023,Math.max(0,Math.round(s*1023)))]}else t=o=>1-o*o*(3-2*o);let n=.5;for(let o=1;o<=1024;o++){const s=(o-1)/1024,l=o/1024,u=t(s)-.5,c=t(l)-.5;if(u===0){n=s;break}if(u>0&&c<=0||u<0&&c>=0){n=s+(l-s)*u/(u-c);break}}n=Math.min(.999,Math.max(.001,n));const i=Math.min(.95,Math.max(.05,e.fadeMidpoint/100)),a=Math.log(n)/Math.log(i),r=new Float32Array(Ze);for(let o=0;o<Ze;o++){const s=o/(Ze-1);r[o]=Math.min(1,Math.max(0,t(Math.pow(s,a))))}return r[0]=1,r[Ze-1]=0,r}const Nt=`
float roundedRectSdf(vec2 p, vec4 rect, float r) {
  vec2 c = (rect.xy + rect.zw) * 0.5;
  vec2 q = abs(p - c) - (rect.zw - rect.xy) * 0.5 + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}
`,xa=`
uniform vec4 uFrameCanvas;   // canvas rect
uniform vec4 uFrameInner;    // image opening
uniform float uFrameRadius;
uniform int uFrameMode;      // 0 none, 1 solid ink, 2 paper
uniform int uFrameInk;
bool frameOutsideCanvas(vec2 ip) { return any(lessThan(ip, uFrameCanvas.xy)) || any(greaterThanEqual(ip, uFrameCanvas.zw)); }
bool frameCovers(vec2 ip) { return uFrameMode != 0 && roundedRectSdf(ip, uFrameInner, uFrameRadius) > 0.0; }
int frameMask() { return uFrameMode == 1 ? (1 << uFrameInk) : 0; }
`;function ya(e){return{uFrameCanvas:e.canvas,uFrameInner:e.inner,uFrameRadius:e.radius,uFrameMode:e.mode,uFrameInk:e.ink}}const Bo={smooth:.6,uncoated:1,recycled:1.4},Oo={top:0,bottom:1,left:2,right:3},zo={fractal:1,streaks:2,edge:3};function Wo(e){return e.printSim.enabled&&(e.simLowInk.on||e.simSpecks.on&&e.simSpecks.placement==="near")}function Go(e,t,n,i){if(!e.printSim.enabled)return 0;let a=0;const r=e.simMisreg;return r.on&&(a+=r.shift*Math.SQRT2+r.rotation*Math.PI/180*Math.hypot(t,n)*.5*i),e.simGain.on&&(a+=2),a/i+1}function li(e,t,n,i,a,r){const o=e.upload.mode==="print",s=o&&e.export.printTarget==="riso",l=e.printSim.enabled&&(t==="digital"||t==="preview"&&!(o&&!s)),u=s&&e.export.gainCompensation&&(t==="riso"||t==="preview"),c=e.simGain,h=E=>(c.amount[E]??0)/100*(Bo[c.paper]??1),f=E=>[0,1,2,3].map(E),d=e.simMisreg,m=ve(d.seed*9973+5),p=[],g=[];for(let E=0;E<4;E++){const A=m()*2*Math.PI,L=Math.sqrt(m())*d.shift;p.push(l&&d.on?L*Math.cos(A):0,l&&d.on?L*Math.sin(A):0),g.push(l&&d.on?(m()*2-1)*(d.rotation*Math.PI/180):0)}const v=e.simLowInk,b=Math.min(n,i),k=ve(v.seed*7919+3),w=[k()*1e3,k()*1e3],M=[];for(let E=0;E<4;E++)M.push(...v.shared?w:[k()*1e3,k()*1e3]);const S=e.simSpecks,y=Math.min(S.minSize,S.maxSize),T=Math.max(S.minSize,S.maxSize),x=Math.max(24,T*4);return{uSimOn:l?1:0,uSimShift:p,uSimRot:g,uSimCenter:[n*a/2,i*a/2],uSimGain:f(E=>l&&c.on?h(E):0),uSimComp:f(E=>u?h(E):0),uSimCurve:c.curve==="midtone"?1:0,uSimRough:l&&c.on?c.roughness/100*1.5:0,uSimPatch:l&&v.on&&v.intensity>0?zo[v.shape]??1:0,uSimPatchIntensity:v.intensity/100,uSimPatchSize:Math.max(1,v.size/100*b),uSimOctaves:Math.round(v.detail),uSimPersistence:.3+.4*(v.roughness/100),uSimStreakDir:v.direction*Math.PI/180,uSimStreakLen:v.streakLength,uSimStreakFreq:v.frequency,uSimEdgeSide:Oo[v.side]??3,uSimEdgeFalloff:Math.max(1,v.falloff/100*(v.side==="top"||v.side==="bottom"?i:n)),uSimInfluence:v.influence/100,uSimSoftness:v.softness/100,uSimPatchOffset:M,uSimDensity:{texture:r},uSimImageSize:[n,i],uSimOutScale:a,uSimSpecks:l&&S.on&&S.density>0?1:0,uSimSpeckInk:f(E=>S.ink[E]?1:0),uSimSpeckCell:x,uSimSpeckProb:Math.min(1,S.density*x*x/1e6),uSimSpeckMin:y,uSimSpeckMax:T,uSimSpeckExtra:S.extra/100,uSimSpeckClump:S.clumping/100,uSimSpeckNear:S.placement==="near"?1:0,uSimSpeckOpacity:S.opacity/100,uSimSeed:S.seed&65535}}function Sn(e){return e?Ho:Xo}const Sa=`
float simGainCurve(float c, float a) { return uSimCurve == 1 ? c + 4.0 * a * c * (1.0 - c) : min(1.0, c * (1.0 + 2.0 * a)); }
float simGainInverse(float y, float a) {
  if (a <= 0.0) return y;
  if (uSimCurve == 1) {
    float b = 1.0 + 4.0 * a;
    return (b - sqrt(max(0.0, b * b - 16.0 * a * y))) / (8.0 * a);
  }
  return y / (1.0 + 2.0 * a);
}
`,Xo=`
uniform int uSimOn;
uniform vec4 uSimComp;
uniform int uSimCurve;
uniform vec2 uSimImageSize;
uniform float uSimOutScale;
${Sa}
vec2 simWarp(int ink, vec2 op, bool ragged) { return op; }
float simTone(int ink, float c) { return clamp(simGainInverse(c, uSimComp[ink]), 0.0, 1.0); }
float simPatchLost(int ink, vec2 op) { return 0.0; }
int simSpeck(int ink, vec2 op) { return 0; }
bool simApply(int ink, vec2 op, float lost, bool on) { return on; }
`,Ho=`
uniform int uSimOn;
uniform vec2 uSimShift[4];
uniform vec4 uSimRot;
uniform vec2 uSimCenter;
uniform vec4 uSimGain;
uniform vec4 uSimComp;
uniform int uSimCurve;          // 0 uniform, 1 midtone-weighted
uniform float uSimRough;        // output px
uniform int uSimPatch;          // 0 off, 1 blotches, 2 streaks, 3 edge fade
uniform float uSimPatchIntensity;
uniform float uSimPatchSize;    // image px
uniform int uSimOctaves;
uniform float uSimPersistence;
uniform float uSimStreakDir;
uniform float uSimStreakLen;
uniform float uSimStreakFreq;
uniform int uSimEdgeSide;
uniform float uSimEdgeFalloff;  // image px
uniform float uSimInfluence;
uniform float uSimSoftness;
uniform vec2 uSimPatchOffset[4];
uniform sampler2D uSimDensity;  // blurred ink coverage, whole image
uniform vec2 uSimImageSize;
uniform float uSimOutScale;
uniform int uSimSpecks;
uniform vec4 uSimSpeckInk;
uniform float uSimSpeckCell;
uniform float uSimSpeckProb;
uniform float uSimSpeckMin;
uniform float uSimSpeckMax;
uniform float uSimSpeckExtra;
uniform float uSimSpeckClump;
uniform int uSimSpeckNear;
uniform float uSimSpeckOpacity;
uniform int uSimSeed;

uint simHash(uint v) {
  v = v * 747796405u + 2891336453u;
  uint w = ((v >> ((v >> 28u) + 4u)) ^ v) * 277803737u;
  return (w >> 22u) ^ w;
}
float simRnd(uint v) { return float(simHash(v) >> 8u) / 16777216.0; }
// Coordinates are offset to stay positive before the int → uint conversion.
uint simKey(ivec2 c, int k) {
  uvec2 u = uvec2(c + 1048576);
  return simHash(u.x * 0x8da6b343u ^ u.y * 0xd8163841u ^ uint(k) * 0xcb1ab31fu);
}
float simNoise(vec2 x, int k) {
  vec2 i = floor(x);
  vec2 f = x - i;
  f = f * f * (3.0 - 2.0 * f);
  ivec2 c = ivec2(i);
  float a = simRnd(simKey(c, k)), b = simRnd(simKey(c + ivec2(1, 0), k));
  float d = simRnd(simKey(c + ivec2(0, 1), k)), e = simRnd(simKey(c + ivec2(1, 1), k));
  return mix(mix(a, b, f.x), mix(d, e, f.x), f.y);
}
// Fractal noise. Each octave is rotated and the input lightly warped, so the
// value noise's square grid doesn't show as blocky, axis-aligned blotches.
float simFbm(vec2 x, int octaves, float persistence, int k) {
  const mat2 ROT = mat2(0.80, 0.60, -0.60, 0.80);
  x = ROT * x;
  x += (vec2(simNoise(x * 0.7, k + 50), simNoise(x * 0.7 + 5.2, k + 60)) - 0.5) * 1.2;
  float sum = 0.0, amp = 1.0, norm = 0.0;
  for (int o = 0; o < 6; o++) {
    if (o >= octaves) break;
    sum += amp * simNoise(x, k + o * 31);
    norm += amp;
    amp *= persistence;
    x = ROT * x * 2.03 + 17.1;
  }
  return sum / norm;
}

// Where in its own layer an ink is read for output position op (misregistration, ragged edges).
vec2 simWarp(int ink, vec2 op, bool ragged) {
  if (uSimOn == 0) return op;
  vec2 d = op - uSimCenter;
  float c = cos(uSimRot[ink]), s = sin(uSimRot[ink]);
  vec2 q = vec2(c * d.x - s * d.y, s * d.x + c * d.y) + uSimCenter - uSimShift[ink];
  if (ragged && uSimRough > 0.0) {
    q += (vec2(simNoise(op * 0.6, 800 + ink), simNoise(op * 0.6 + 17.3, 900 + ink)) - 0.5) * 2.0 * uSimRough;
  }
  return q;
}

${Sa}
// Ink tone after compensation (pre-shrinking) and simulated dot gain.
float simTone(int ink, float c) {
  c = simGainInverse(c, uSimComp[ink]);
  if (uSimOn == 1) c = simGainCurve(c, uSimGain[ink]);
  return clamp(c, 0.0, 1.0);
}

float simDensity(int ink, vec2 ip) {
  return texture(uSimDensity, clamp(ip / uSimImageSize, vec2(0.0), vec2(1.0)))[ink];
}

// Share of ink lost to a low-ink patch around op (0 = none). Varies slowly.
float simPatchLost(int ink, vec2 op) {
  if (uSimOn == 0 || uSimPatch == 0) return 0.0;
  vec2 ip = op / uSimOutScale;
  vec2 u = ip / uSimPatchSize + uSimPatchOffset[ink];
  float v;
  if (uSimPatch == 1) {
    v = simFbm(u, uSimOctaves, uSimPersistence, 101);
  } else if (uSimPatch == 2) {
    float c = cos(uSimStreakDir), s = sin(uSimStreakDir);
    vec2 r = vec2(c * u.x + s * u.y, -s * u.x + c * u.y); // r.x along the paper feed
    v = simFbm(vec2(r.x / uSimStreakLen, r.y * uSimStreakFreq), 3, 0.5, 202);
  } else {
    float d = uSimEdgeSide == 0 ? ip.y : uSimEdgeSide == 1 ? uSimImageSize.y - ip.y : uSimEdgeSide == 2 ? ip.x : uSimImageSize.x - ip.x;
    v = (1.0 - clamp(d / uSimEdgeFalloff, 0.0, 1.0)) * (0.75 + 0.5 * simFbm(u * 2.0, 3, 0.5, 303));
  }
  // Heavily inked areas run short first.
  v *= mix(1.0, smoothstep(0.1, 0.8, simDensity(ink, ip)), uSimInfluence);
  float soft = 0.02 + uSimSoftness * 0.25;
  return uSimPatchIntensity * smoothstep(0.55 - soft, 0.55 + soft, v);
}

// A speck at op: 1 = extra ink, -1 = pinhole, 0 = none.
int simSpeck(int ink, vec2 op) {
  if (uSimOn == 0 || uSimSpecks == 0 || uSimSpeckInk[ink] < 0.5) return 0;
  float S = uSimSpeckCell;
  vec2 cellf = floor(op / S);
  ivec2 cell = ivec2(cellf);
  uint h = simKey(cell, 500 + ink * 7 + uSimSeed * 13);
  float p = uSimSpeckProb;
  if (uSimSpeckClump > 0.0) {
    float n = simNoise(cellf / 5.0, 600 + ink + uSimSeed);
    p *= mix(1.0, 4.0 * n * n * n, uSimSpeckClump);
  }
  if (simRnd(h) >= p) return 0;
  float r = mix(uSimSpeckMin, uSimSpeckMax, simRnd(h + 1u)) * 0.5;
  vec2 c = cellf * S + r + vec2(simRnd(h + 2u), simRnd(h + 3u)) * max(0.0, S - 2.0 * r);
  vec2 d = op - c;
  float dd = dot(d, d);
  if (dd > r * r * 1.8) return 0;
  float a = dd < 1e-6 ? 0.0 : atan(d.y, d.x);
  float rr = r * (1.0 + 0.22 * sin(3.0 * a + 6.2832 * simRnd(h + 4u)) + 0.1 * sin(7.0 * a + 6.2832 * simRnd(h + 5u)));
  if (dd > rr * rr) return 0;
  if (uSimSpeckOpacity < 1.0 && simRnd(simKey(ivec2(floor(op)), 700 + ink)) > uSimSpeckOpacity) return 0;
  bool extra = simRnd(h + 6u) < uSimSpeckExtra;
  if (extra && uSimSpeckNear == 1 && simDensity(ink, op / uSimOutScale) < 0.05) return 0;
  return extra ? 1 : -1;
}

// Applies low-ink grain and specks to one ink's on/off at op (its warped position).
bool simApply(int ink, vec2 op, float lost, bool on) {
  if (uSimOn == 0) return on;
  if (on && lost > 0.0 && simRnd(simKey(ivec2(floor(op)), 400 + ink + uSimSeed * 3)) < lost) on = false;
  int sp = simSpeck(ink, op);
  if (sp == 1) on = true;
  else if (sp == -1) on = false;
  return on;
}
`,Ft=`
uniform vec3 uTable[16];     // linear RGB of each ink combination (bit i = ink i)
uniform int uInkCount;
uniform vec3 uPaperSrgb;     // for the multiply comparison
uniform vec3 uInkSrgb[4];

vec3 mixInks(vec4 cov) {
  vec3 sum = vec3(0.0);
  int combos = 1 << uInkCount;
  for (int m = 0; m < 16; m++) {
    if (m >= combos) break;
    float w = 1.0;
    for (int i = 0; i < 4; i++) {
      if (i >= uInkCount) break;
      float c = clamp(cov[i], 0.0, 1.0);
      w *= ((m >> i) & 1) == 1 ? c : 1.0 - c;
    }
    sum += w * uTable[m];
  }
  return sum;
}

// Simple multiply blend in sRGB, like a layer set to Multiply in an image editor.
// Only used for comparison in the test view.
vec3 multiplyInks(vec4 cov) {
  vec3 c = uPaperSrgb;
  for (int i = 0; i < 4; i++) {
    if (i >= uInkCount) break;
    c *= mix(vec3(1.0), uInkSrgb[i], clamp(cov[i], 0.0, 1.0));
  }
  return srgbToLinear(c);
}

vec3 gamutCompress(vec3 c) {
  float y = clamp(dot(c, vec3(0.2126, 0.7152, 0.0722)), 0.0, 1.0);
  float lo = min(c.r, min(c.g, c.b));
  if (lo < 0.0) c = y + (c - y) * (y / max(y - lo, 1e-6));
  float hi = max(c.r, max(c.g, c.b));
  if (hi > 1.0) c = y + (c - y) * ((1.0 - y) / max(hi - y, 1e-6));
  return clamp(c, 0.0, 1.0);
}
`,qo=["uTable","uInkCount","uPaperSrgb","uInkSrgb"];function jo(e,t,n,i){const a=new Float32Array(48);a.set(n.colors.subarray(0,Math.min(n.colors.length,48))),e.uniform3fv(t.uTable,a),e.uniform1i(t.uInkCount,n.inkCount);const r=s=>{const l=ie(s)??{r:0,g:0,b:0};return[l.r/255,l.g/255,l.b/255]};e.uniform3fv(t.uPaperSrgb,r(i.paper));const o=new Float32Array(B*3);i.inks.forEach((s,l)=>o.set(r(s.hex),l*3)),e.uniform3fv(t.uInkSrgb,o)}const ke=`#version 300 es
precision highp float;
precision highp int;
uniform vec2 uSize;
out vec4 outColor;
`,ht=`${ke}
uniform sampler2D uImage;
uniform vec2 uRatio;   // source texels per output pixel (x, y); 1 = same size
uniform vec4 uRegion;  // part of the source to copy, in source uv: x, y, width, height
void main() {
  vec2 uv = uRegion.xy + gl_FragCoord.xy / uSize * uRegion.zw;
  if (uRatio.x <= 1.0 && uRatio.y <= 1.0) {
    outColor = textureLod(uImage, uv, 0.0);
    return;
  }
  // Each of the 4×4 taps covers ratio/4 source texels; a small LOD keeps every tap
  // averaging its own share of the footprint instead of skipping texels.
  float lod = max(0.0, log2(max(uRatio.x, uRatio.y) / 4.0));
  vec2 tapStep = 1.0 / uSize / 4.0;
  vec4 sum = vec4(0.0);
  for (int j = 0; j < 4; j++) {
    for (int i = 0; i < 4; i++) {
      vec2 offset = (vec2(float(i), float(j)) - 1.5) * tapStep;
      sum += textureLod(uImage, uv + offset, lod);
    }
  }
  outColor = sum / 16.0;
}
`,Vo=`${ke}
uniform sampler2D uImage;
uniform sampler2D uTone;     // 256 × 1: levels then curve, in the red channel
uniform float uSaturation;   // 0 = unchanged
uniform vec4 uRegionPx;      // image px this pass covers: x, y, width, height
uniform int uFade;
uniform vec4 uFadeRect;      // the visible image edge, image px
uniform float uFadeRadius;
uniform float uFadeDistance; // image px
uniform float uFadeColor;    // 0 black, 1 white
uniform float uFadeOpacity;
uniform sampler2D uFadeLut;  // 256 × 1: strength by distance / fade distance
${ae}
${ct}
${Nt}
float tone(float v) { return texture(uTone, vec2((v * 255.0 + 0.5) / 256.0, 0.5)).r; }
void main() {
  vec4 t = texture(uImage, gl_FragCoord.xy / uSize);
  vec3 s = linearToSrgb(t.rgb);
  if (uFade == 1) {
    vec2 ip = uRegionPx.xy + gl_FragCoord.xy / uSize * uRegionPx.zw;
    float d = -roundedRectSdf(ip, uFadeRect, uFadeRadius) / uFadeDistance;
    float k = d <= 0.0 ? 1.0 : d >= 1.0 ? 0.0 : texture(uFadeLut, vec2((d * 255.0 + 0.5) / 256.0, 0.5)).r;
    k *= uFadeOpacity;
    // Blended in sRGB, so a linear fade looks even.
    s = mix(s, vec3(uFadeColor), k);
    t.a = mix(t.a, 1.0, k);
  }
  vec3 lin = srgbToLinear(vec3(tone(s.r), tone(s.g), tone(s.b)));
  float y = dot(lin, vec3(0.2126, 0.7152, 0.0722));
  lin = clamp(y + (lin - y) * (1.0 + uSaturation), 0.0, 1.0);
  outColor = vec4(lin, t.a);
}
`,Rt=`${ke}
uniform sampler2D uImage;
uniform vec2 uDir;      // (1,0) or (0,1)
uniform float uSigma;   // blur radius in pixels
uniform float uRange;   // how different (in sRGB) a neighbor can be and still blend
${ae}
void main() {
  vec2 px = 1.0 / uSize;
  vec2 uv = gl_FragCoord.xy * px;
  vec4 center = texture(uImage, uv);
  vec3 cs = linearToSrgb(center.rgb);
  float radius = ceil(uSigma * 2.5);
  float stride = max(1.0, radius / 24.0);
  vec4 sum = vec4(0.0);
  float wsum = 0.0;
  for (int k = -24; k <= 24; k++) {
    float d = float(k) * stride;
    if (abs(d) > radius) continue;
    vec4 s = texture(uImage, uv + uDir * d * px);
    vec3 diff = linearToSrgb(s.rgb) - cs;
    float w = exp(-(d * d) / (2.0 * uSigma * uSigma) - dot(diff, diff) / (2.0 * uRange * uRange));
    sum += s * w;
    wsum += w;
  }
  outColor = sum / wsum;
}
`,ui=`${ke}
uniform sampler2D uCoverage;
uniform sampler2D uTone;     // 256 × 1, one ink per channel
uniform vec4 uActive;
uniform vec4 uKnockout;
uniform float uLimit;        // total ink limit (sum of coverages), e.g. 2.5 = 250%
uniform int uApplyLimit;
float tone(float c, int ink) { return texture(uTone, vec2((clamp(c, 0.0, 1.0) * 255.0 + 0.5) / 256.0, 0.5))[ink]; }
void main() {
  vec4 c = texture(uCoverage, gl_FragCoord.xy / uSize);
  vec4 t = vec4(tone(c.r, 0), tone(c.g, 1), tone(c.b, 2), tone(c.a, 3)) * uActive;
  // Top layer first, so a layer already cleared by one above it only knocks out where it still prints.
  for (int i = 3; i >= 1; i--) {
    if (uKnockout[i] < 0.5) continue;
    for (int j = 0; j < 4; j++) if (j < i) t[j] *= 1.0 - t[i];
  }
  if (uApplyLimit == 1) {
    float sum = t.r + t.g + t.b + t.a;
    if (sum > uLimit) t *= uLimit / sum;
  }
  outColor = t;
}
`,ci=`${ke}
uniform sampler2D uCoverage;
uniform vec2 uDir;
uniform vec4 uRadius;        // texels, per ink
uniform float uLimit;
uniform int uApplyLimit;
void main() {
  vec2 px = 1.0 / uSize;
  vec2 uv = gl_FragCoord.xy * px;
  vec4 c0 = texture(uCoverage, uv);
  vec4 grow = c0;
  vec4 shrink = c0;
  vec4 r = abs(uRadius);
  float reach = ceil(max(max(r.x, r.y), max(r.z, r.w)));
  for (int k = 1; k <= 24; k++) {
    float d = float(k);
    if (d > reach) break;
    vec4 w = clamp(r - d + 1.0, 0.0, 1.0); // 1 inside the radius, partial at its edge
    vec4 a = mix(c0, texture(uCoverage, uv + uDir * d * px), w);
    vec4 b = mix(c0, texture(uCoverage, uv - uDir * d * px), w);
    grow = max(grow, max(a, b));
    shrink = min(shrink, min(a, b));
  }
  vec4 t = mix(shrink, grow, step(0.0, uRadius));
  if (uApplyLimit == 1) {
    float sum = t.r + t.g + t.b + t.a;
    if (sum > uLimit) t *= uLimit / sum;
  }
  outColor = t;
}
`,Yo=e=>`${ke}
uniform sampler2D uCoverage;
uniform sampler2D uImage;   // for transparency: transparent pixels get no ink
uniform vec4 uVisible;      // solo/mute: 1 = shown
uniform vec4 uRegionPx;     // image px this pass covers: x, y, width, height
${ct}
${Ft}
${Sn(e)}
void main() {
  vec2 uv = gl_FragCoord.xy / uSize;
  vec4 cov;
  if (${e?"uSimOn == 0":"true"}) {
    cov = texture(uCoverage, uv) * texture(uImage, uv).a;
    for (int ink = 0; ink < 4; ink++) cov[ink] = simTone(ink, cov[ink]); // dot gain compensation
  } else {
    // Print simulation on smooth coverage: each ink read at its own misregistered
    // position, then dot gain, low-ink patches (as lost coverage) and specks.
    vec2 op = (uRegionPx.xy + uv * uRegionPx.zw) * uSimOutScale;
    for (int ink = 0; ink < 4; ink++) {
      vec2 q = simWarp(ink, op, false);
      vec2 iq = q / uSimOutScale;
      vec2 quv = (iq - uRegionPx.xy) / uRegionPx.zw;
      float c = 0.0;
      if (all(greaterThanEqual(iq, vec2(0.0))) && all(lessThan(iq, uSimImageSize))) {
        c = simTone(ink, texture(uCoverage, quv)[ink] * texture(uImage, quv).a);
      }
      c *= 1.0 - simPatchLost(ink, q);
      int sp = simSpeck(ink, q);
      if (sp == 1) c = 1.0;
      else if (sp == -1) c = 0.0;
      cov[ink] = c;
    }
  }
  outColor = vec4(gamutCompress(mixInks(cov * uVisible)), 1.0);
}
`,Ko=`${ke}
uniform sampler2D uImage;
uniform int uSource;
${ae}
${ba}
void main() {
  vec4 t = texture(uImage, gl_FragCoord.xy / uSize);
  outColor = vec4(clamp(lightness(t.rgb, uSource), 0.0, 1.0), 0.0, 0.0, t.a);
}
`,Jo=`${ke}
uniform sampler2D uImage;
float lum(vec2 uv) { return dot(texture(uImage, uv).rgb, vec3(0.2126, 0.7152, 0.0722)); }
void main() {
  vec2 px = 1.0 / uSize;
  vec2 uv = gl_FragCoord.xy * px;
  float tl = lum(uv + px * vec2(-1.0, -1.0)), t = lum(uv + px * vec2(0.0, -1.0)), tr = lum(uv + px * vec2(1.0, -1.0));
  float l = lum(uv + px * vec2(-1.0, 0.0)), r = lum(uv + px * vec2(1.0, 0.0));
  float bl = lum(uv + px * vec2(-1.0, 1.0)), b = lum(uv + px * vec2(0.0, 1.0)), br = lum(uv + px * vec2(1.0, 1.0));
  float gx = (tr + 2.0 * r + br) - (tl + 2.0 * l + bl);
  float gy = (bl + 2.0 * b + br) - (tl + 2.0 * t + tr);
  outColor = vec4(lum(uv), clamp(0.5 + gx * 0.5, 0.0, 1.0), clamp(0.5 + gy * 0.5, 0.0, 1.0), 1.0);
}
`,wa={id:"splitDetail",title:"Detail Split",stage:"split",parent:"split",description:"Fine detail goes to one ink; a blurred base is split by another method. Keeps images sharp despite misregistration.",visibleWhen:e=>e.split?.method==="detail",settings:[{kind:"select",key:"baseMethod",label:"Method for the base",default:"inkMatching",options:[{value:"inkMatching",label:"Ink Matching"},{value:"toneMap",label:"Tone Map"},{value:"channel",label:"Channel Split"},{value:"selective",label:"Selective Color"}],help:"Uses that method's own settings (choose it as the method above to adjust them)."},{kind:"number",key:"radius",label:"Split radius",default:3,min:.5,max:30,step:.5,help:"What counts as detail: features smaller than this go to the detail ink. Measured in thousandths of the image's long edge."},{kind:"select",key:"detailMode",label:"Detail",default:"highpass",display:"segmented",options:[{value:"highpass",label:"High-pass"},{value:"lineart",label:"Line art"},{value:"edges",label:"Edges"}]},{kind:"number",key:"contrast",label:"Detail contrast",default:150,min:0,max:400,step:5,unit:"%"},{kind:"number",key:"threshold",label:"Detail threshold",default:5,min:0,max:100,step:1,unit:"%"},{kind:"select",key:"detailInk",label:"Detail ink",default:"auto",inkChoice:!0,options:[{value:"auto",label:"Auto (darkest ink)"},{value:"0",label:"Ink 1"},{value:"1",label:"Ink 2"},{value:"2",label:"Ink 3"},{value:"3",label:"Ink 4"}]}]},on=(e,t,n=0)=>typeof e[t]=="number"?e[t]:n;function Fe(e){const t=String(e.baseMethod??"inkMatching");return Pa(t==="detail"?"inkMatching":t)}const je=(e,t)=>t.settingsOf(Fe(e).section.id);function di(e,t){const n=String(e.detailInk??"auto");if(n!=="auto")return Math.min(Number(n),t.inkCount-1);let i=0,a=1/0;return t.inks.forEach((r,o)=>{const s=Dt(ie(r.hex)??{r:0,g:0,b:0}).l;s<a&&(a=s,i=o)}),i}const hi=(e,t)=>on(e,"radius",3)*t.imageLongEdge/1e3,Zo=`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uImage;    // sharp
uniform sampler2D uBlurred;
uniform sampler2D uBase;     // base coverage (from the base method, on the blurred image)
uniform vec2 uSize;
uniform int uMode;           // 0 high-pass, 1 line art, 2 edges
uniform float uContrast;
uniform float uThreshold;
uniform int uDetailInk;
out vec4 outColor;
${ae}
float luma(vec2 uv) { return dot(linearToSrgb(texture(uImage, uv).rgb), vec3(0.2126, 0.7152, 0.0722)); }
float lumaBlur(vec2 uv) { return dot(linearToSrgb(texture(uBlurred, uv).rgb), vec3(0.2126, 0.7152, 0.0722)); }
void main() {
  vec2 px = 1.0 / uSize;
  vec2 uv = gl_FragCoord.xy * px;
  float d;
  if (uMode == 2) {
    float tl = luma(uv + px * vec2(-1, -1)), t = luma(uv + px * vec2(0, -1)), tr = luma(uv + px * vec2(1, -1));
    float l = luma(uv + px * vec2(-1, 0)), r = luma(uv + px * vec2(1, 0));
    float bl = luma(uv + px * vec2(-1, 1)), b = luma(uv + px * vec2(0, 1)), br = luma(uv + px * vec2(1, 1));
    float gx = (tr + 2.0 * r + br) - (tl + 2.0 * l + bl);
    float gy = (bl + 2.0 * b + br) - (tl + 2.0 * t + tr);
    d = length(vec2(gx, gy)) * uContrast * 2.0 - uThreshold;
  } else {
    // Darker than the blurred surroundings = detail ink.
    float diff = (lumaBlur(uv) - luma(uv)) * uContrast * 8.0;
    d = uMode == 1 ? smoothstep(uThreshold, uThreshold + 0.06, diff) : diff - uThreshold;
  }
  d = clamp(d, 0.0, 1.0);
  vec4 cov = texture(uBase, uv);
  // Combine with whatever the base put in the detail ink (screen: both show).
  cov[uDetailInk] = 1.0 - (1.0 - cov[uDetailInk]) * (1.0 - d);
  outColor = cov;
}
`,mi=new WeakMap,Qo={id:"detail",label:"Detail Split",section:wa,dependsOn(e,t){const n=t,i=Fe(n),a=je(n,e);return{base:i.id,values:a,dependency:i.dependsOn(e,a),detailInk:di(n,e)}},needsPrepare(e,t){const n=Fe(e);return!!n.prepare&&(n.needsPrepare?.(je(e,t),t)??!0)},prepare(e,t,n){return Fe(e).prepare(je(e,t),t,n)},reach(e,t){const n=e,i=Fe(n);return hi(n,t)*2.5+(i.reach?i.reach(je(n,t),t):0)+2},render(e,t,n,i,a){const r=i,o=e.gpu;let s=mi.get(o);s||mi.set(o,s={blurA:null,blurB:null,base:null});const{width:l,height:u}=t;s.blurA=o.ensureTarget(s.blurA,l,u,"image"),s.blurB=o.ensureTarget(s.blurB,l,u,"image"),s.base=o.ensureTarget(s.base,l,u,"coverage");const h={uSigma:Math.max(.5,hi(r,e)*e.texelScale),uRange:100,uSize:[l,u]};o.pass(Rt,s.blurA,{...h,uImage:{texture:t.texture},uDir:[1,0]}),o.pass(Rt,s.blurB,{...h,uImage:{texture:s.blurA.texture},uDir:[0,1]}),Fe(r).render(e,s.blurB,s.base,je(r,e),a),o.pass(Zo,n,{uImage:{texture:t.texture},uBlurred:{texture:s.blurB.texture},uBase:{texture:s.base.texture},uSize:[l,u],uMode:{highpass:0,lineart:1,edges:2}[String(r.detailMode)]??0,uContrast:on(r,"contrast",150)/100,uThreshold:on(r,"threshold",5)/100,uDetailInk:Math.max(0,Math.min(B-1,di(r,e)))})}},Ea={id:"splitInkMatching",title:"Ink Matching",stage:"split",parent:"split",description:"Finds the mix of your inks that best matches each color. Realistic photo reproduction with any ink set.",visibleWhen:e=>e.split?.method==="inkMatching",settings:[{kind:"number",key:"priority",linkInks:!1,label:"Ink priority",perInk:!0,default:50,min:0,max:100,step:1,help:"When several ink mixes would match a color, inks with higher priority are used first."},{kind:"number",key:"sparsity",label:"Prefer fewer inks",default:25,min:0,max:100,step:1,unit:"%",help:"Higher values use fewer overlapping inks per spot, for cleaner, less muddy color."},{kind:"select",key:"gamut",label:"Colors the inks can't reach",default:"compress",display:"segmented",options:[{value:"compress",label:"Compress"},{value:"clip",label:"Clip"}],help:"Compress matches colors relative to the paper (white in the image stays bare paper) and fits the full light-to-dark range into what the inks can print, keeping shadow detail. Clip matches exact colors, using the closest mix for each."},{kind:"number",key:"balance",label:"Preserve lightness ↔ hue",default:50,min:0,max:100,step:1,help:"Left keeps lightness accurate; right keeps hue accurate."}]},es=17,ts=33;let pi=null;function ns(){return pi??=new vn(new Worker(new URL(""+new URL("inkMatch.worker-DcQGNRBs.js",import.meta.url).href,import.meta.url),{type:"module"})),pi}const is=`#version 300 es
precision highp float;
precision highp sampler3D;
uniform sampler2D uImage;
uniform sampler3D uLut;
uniform float uLutSize;
uniform vec2 uSize;
out vec4 outColor;
${ae}
void main() {
  vec2 uv = gl_FragCoord.xy / uSize;
  vec3 s = linearToSrgb(texture(uImage, uv).rgb);
  outColor = texture(uLut, (s * (uLutSize - 1.0) + 0.5) / uLutSize);
}
`,as=new lt;function rs(e,t){return as.get(e,t,()=>{const n=e.createTexture();return e.bindTexture(e.TEXTURE_3D,n),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_R,e.CLAMP_TO_EDGE),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage3D(e.TEXTURE_3D,0,e.RGBA8,t.size,t.size,t.size,0,e.RGBA,e.UNSIGNED_BYTE,t.lut),n})}const os={id:"inkMatching",label:"Ink Matching",section:Ea,dependsOn:e=>({paper:e.paper,inks:e.inks}),async prepare(e,t,n){return ns().run({size:n==="draft"?es:ts,options:{inkCount:t.inkCount,table:Float32Array.from(t.table.colors),priority:e.priority.slice(0,t.inkCount).map(i=>i/100),sparsity:e.sparsity/100,balance:e.balance/100,compress:e.gamut==="compress"}})},render(e,t,n,i,a){a&&e.gpu.pass(is,n,{uImage:{texture:t.texture},uLut:{texture:rs(e.gpu.gl,a),target:"3d"},uLutSize:a.size,uSize:[n.width,n.height]})}},Y=6,Ta=[{value:"0",label:"Ink 1"},{value:"1",label:"Ink 2"},{value:"2",label:"Ink 3"},{value:"3",label:"Ink 4"}],fi=["Hue","Width","SatMin","SatMax","LightMin","LightMax","Feather","Ink"],Ma=[];for(let e=0;e<Y;e++)Ma.push({kind:"number",key:`r${e}Hue`,label:"Hue center",default:[0,120,240,60,180,300][e],min:0,max:360,step:1,unit:"°",hidden:!0},{kind:"number",key:`r${e}Width`,label:"Hue width",default:40,min:2,max:180,step:1,unit:"°",hidden:!0},{kind:"number",key:`r${e}SatMin`,label:"Saturation from",default:20,min:0,max:100,step:1,unit:"%",hidden:!0},{kind:"number",key:`r${e}SatMax`,label:"Saturation to",default:100,min:0,max:100,step:1,unit:"%",hidden:!0},{kind:"number",key:`r${e}LightMin`,label:"Lightness from",default:5,min:0,max:100,step:1,unit:"%",hidden:!0},{kind:"number",key:`r${e}LightMax`,label:"Lightness to",default:95,min:0,max:100,step:1,unit:"%",hidden:!0},{kind:"number",key:`r${e}Feather`,label:"Feather",default:30,min:0,max:100,step:1,unit:"%",hidden:!0},{kind:"select",key:`r${e}Ink`,label:"Ink",default:String(Math.min(e+1,B-1)),options:Ta,hidden:!0});const Ra={id:"splitSelective",title:"Selective Color",stage:"split",parent:"split",description:"Pick color ranges and send each to an ink; everything else can go to a base ink. Spot-color accents and one color on a black-and-white image.",visibleWhen:e=>e.split?.method==="selective",settings:[{kind:"number",key:"rangeCount",label:"Ranges",default:1,min:0,max:Y,step:1,hidden:!0},{kind:"select",key:"maskPreview",label:"Mask preview",default:"none",hidden:!0,options:[{value:"none",label:"Off"},...Array.from({length:Y},(e,t)=>({value:String(t),label:`Range ${t+1}`}))]},...Ma,{kind:"select",key:"densitySource",label:"Ink amount in a range comes from",default:"saturation",display:"segmented",options:[{value:"saturation",label:"Saturation"},{value:"lightness",label:"Darkness"},{value:"constant",label:"Constant"}]},{kind:"select",key:"baseInk",label:"Base ink (everything else)",default:"auto",inkChoice:!0,options:[{value:"none",label:"None (paper)"},{value:"auto",label:"Auto (darkest ink)"},...Ta],help:"Prints the rest of the image as a grayscale in this ink."}]},ce=(e,t,n=0)=>typeof e[t]=="number"?e[t]:n;function gi(e,t){const n=String(e.baseInk??"auto");if(n==="none")return-1;if(n!=="auto")return Number(n)<t.inkCount?Number(n):-1;let i=-1,a=1/0;return t.inks.forEach((r,o)=>{const s=Dt(ie(r.hex)??{r:0,g:0,b:0}).l;s<a&&(a=s,i=o)}),i}const Ca=`
uniform int uRangeCount;
uniform float uHue[${Y}];
uniform float uWidth[${Y}];
uniform vec4 uLimits[${Y}];  // sat min, sat max, light min, light max (0..1)
uniform float uFeather[${Y}]; // 0..1
${ae}

vec3 hsl(vec3 lin) {
  vec3 s = linearToSrgb(lin);
  float mx = max(s.r, max(s.g, s.b)), mn = min(s.r, min(s.g, s.b));
  float l = (mx + mn) * 0.5, d = mx - mn;
  float sat = d < 1e-5 ? 0.0 : d / max(1e-5, 1.0 - abs(2.0 * l - 1.0));
  float h = 0.0;
  if (d > 1e-5) {
    if (mx == s.r) h = mod((s.g - s.b) / d, 6.0);
    else if (mx == s.g) h = (s.b - s.r) / d + 2.0;
    else h = (s.r - s.g) / d + 4.0;
  }
  return vec3(h * 60.0, clamp(sat, 0.0, 1.0), l);
}

// 1 inside [lo, hi], fading to 0 over 'soft' outside it (hard edge when soft = 0).
float band(float x, float lo, float hi, float soft) {
  if (soft <= 0.0) return (x >= lo && x <= hi) ? 1.0 : 0.0;
  return smoothstep(lo - soft, lo, x) * (1.0 - smoothstep(hi, hi + soft, x));
}

float membership(int r, vec3 c) {
  float f = uFeather[r];
  float dh = abs(mod(c.x - uHue[r] + 180.0, 360.0) - 180.0);
  float halfWidth = uWidth[r] * 0.5;
  float hueW = f <= 0.0 ? (dh <= halfWidth ? 1.0 : 0.0) : 1.0 - smoothstep(halfWidth, halfWidth + f * 60.0, dh);
  vec4 lim = uLimits[r];
  return hueW * band(c.y, lim.x, lim.y, f * 0.25) * band(c.z, lim.z, lim.w, f * 0.25);
}
`,ss=`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uImage;
uniform vec2 uSize;
uniform float uInk[${Y}];
uniform int uSource;   // 0 saturation, 1 darkness, 2 constant
uniform int uBase;     // base ink slot or -1
uniform int uInkCount;
out vec4 outColor;
${Ca}
void main() {
  vec3 c = hsl(texture(uImage, gl_FragCoord.xy / uSize).rgb);
  float amount = uSource == 0 ? c.y : uSource == 1 ? 1.0 - c.z : 1.0;
  vec4 ink = vec4(0.0);
  float selected = 0.0;
  for (int r = 0; r < ${Y}; r++) {
    if (r >= uRangeCount) break;
    float m = membership(r, c);
    selected = max(selected, m);
    int target = int(uInk[r]);
    if (target >= 0 && target < ${B}) ink[target] = max(ink[target], m * amount);
  }
  // Everything else: a grayscale (darkness) in the base ink.
  if (uBase >= 0) ink[uBase] = max(ink[uBase], (1.0 - selected) * (1.0 - c.z));
  for (int i = 0; i < ${B}; i++) if (i >= uInkCount) ink[i] = 0.0;
  outColor = clamp(ink, 0.0, 1.0);
}
`,ls=`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uImage;
uniform vec2 uSize;
uniform int uMaskRange;
out vec4 outColor;
${Ca}
void main() {
  vec4 t = texture(uImage, gl_FragCoord.xy / uSize);
  float m = membership(uMaskRange, hsl(t.rgb));
  outColor = vec4(vec3(m), 1.0);
}
`;function vi(e){const t=Math.min(Y,Math.max(0,ce(e,"rangeCount",1))),n=[],i=[],a=[],r=[],o=[];for(let s=0;s<Y;s++)n.push(ce(e,`r${s}Hue`)),i.push(ce(e,`r${s}Width`,40)),a.push(ce(e,`r${s}SatMin`)/100,ce(e,`r${s}SatMax`,100)/100,ce(e,`r${s}LightMin`)/100,ce(e,`r${s}LightMax`,100)/100),r.push(ce(e,`r${s}Feather`,30)/100),o.push(Number(e[`r${s}Ink`]??0));return{uRangeCount:t,uHue:n,uWidth:i,uLimits:a,uFeather:r,uInk:o}}const us={id:"selective",label:"Selective Color",section:Ra,dependsOn:(e,t)=>gi(t,e),render(e,t,n,i){const a=i,{uInk:r,...o}=vi(a);e.gpu.pass(ss,n,{...o,uInk:r,uImage:{texture:t.texture},uSize:[n.width,n.height],uSource:{saturation:0,lightness:1,constant:2}[String(a.densitySource)]??0,uBase:gi(a,e),uInkCount:e.inkCount})},previewOverride(e,t,n,i){const a=i,r=String(a.maskPreview??"none");if(r==="none"||Number(r)>=ce(a,"rangeCount",1))return!1;const{uInk:o,...s}=vi(a);return e.gpu.pass(ls,n,{...s,uImage:{texture:t.texture},uSize:[n.width,n.height],uMaskRange:Number(r)}),!0}},bi=[{id:"shadow",label:"Shadow ink",points:[[0,1],[.3,.85],[.6,.15],[.8,0],[1,0]]},{id:"midtone",label:"Midtone ink",points:[[0,.15],[.25,.6],[.5,.85],[.75,.35],[1,0]]},{id:"highlight",label:"Highlight tint",points:[[0,.25],[.6,.35],[.9,.1],[1,0]]},{id:"full",label:"Full range",points:[[0,1],[1,0]]},{id:"off",label:"Off",points:[[0,0],[1,0]]}];function cs(e){const t=new Float32Array(Q*B);return e.slice(0,B).forEach((n,i)=>{const a=Te(n,Q);for(let r=0;r<Q;r++)t[r*B+i]=a[r]}),t}function ds(e,t,n=.01){const i=[];for(let o=0;o<Q;o++)i.push([o/(Q-1),e[o*B+t]]);const a=new Uint8Array(i.length);a[0]=1,a[i.length-1]=1;const r=[[0,i.length-1]];for(;r.length;){const[o,s]=r.pop(),[l,u]=i[o],[c,h]=i[s];let f=-1,d=n;for(let m=o+1;m<s;m++){const[p,g]=i[m],v=(p-l)/(c-l),b=Math.abs(g-(u+v*(h-u)));b>d&&(d=b,f=m)}f>=0&&(a[f]=1,r.push([o,f],[f,s]))}return i.filter((o,s)=>a[s]).map(([o,s])=>[Math.round(o*1e3)/1e3,Math.round(s*1e3)/1e3])}const Q=256;function hs(e,t,n){const i=n.map((s,l)=>({slot:l,l:Dt(ie(s)??{r:0,g:0,b:0}).l})).sort((s,l)=>s.l-l.l).map(s=>s.slot),a=[],r=t>=2&&t>n.length?t-1:-1;let o=0;for(let s=0;s<t;s++)s===r||o>=i.length?a.push(null):a.push(i[o++]);return Array.from({length:t},(s,l)=>{const u=e[l]??"auto";if(u==="auto")return a[l]??null;if(u==="paper")return null;const c=Number(u);return Number.isInteger(c)&&c>=0&&c<n.length?c:null})}function ki(e,t){const n=Math.min(1,Math.max(0,e));return t==="hard"?n<.5?0:1:t==="linear"?n:n*n*(3-2*n)}function ms(e){const t=e.bandInks.length,n=[0,...e.cutoffs,1],i=new Float32Array(Q*B);for(let a=0;a<Q;a++){const r=a/(Q-1);for(let o=0;o<t;o++){const s=e.bandInks[o];if(s==null)continue;const l=n[o],u=n[o+1];let c=1;if(o>0){const d=e.overlaps[o-1]??0;c*=d>0?ki((r-(l-d/2))/d,e.falloff):r>=l?1:0}if(o<t-1){const d=e.overlaps[o]??0;c*=d>0?1-ki((r-(u-d/2))/d,e.falloff):r<u?1:0}if(c<=0)continue;let h=1;e.fill==="gradient"&&(h=1-(u>l?Math.min(1,Math.max(0,(r-l)/(u-l))):0),e.posterize>0&&(h=Math.ceil(h*e.posterize)/e.posterize));const f=a*B+s;i[f]=Math.max(i[f],c*h)}}return i}const mt=[{value:"auto",label:"Auto"},{value:"paper",label:"Paper (no ink)"},{value:"0",label:"Ink 1"},{value:"1",label:"Ink 2"},{value:"2",label:"Ink 3"},{value:"3",label:"Ink 4"}],Ia={id:"splitToneMap",title:"Tone Map",stage:"split",parent:"split",description:"Maps lightness to ink: in bands (shadows, midtones, highlights) or with a curve per ink. Good for graphic looks and duotones.",visibleWhen:e=>e.split?.method==="toneMap",settings:[{kind:"select",key:"source",label:"Lightness source",default:"luma",options:[{value:"luma",label:"Luma"},{value:"lstar",label:"L* (perceptual)"},{value:"red",label:"Red channel"},{value:"green",label:"Green channel"},{value:"blue",label:"Blue channel"},{value:"max",label:"Max RGB"},{value:"min",label:"Min RGB"}]},{kind:"select",key:"mode",label:"Mode",default:"simple",hidden:!0,options:[{value:"simple",label:"Simple (bands)"},{value:"advanced",label:"Advanced (curves)"}]},{kind:"curve",key:"inkCurve",label:"Ink curve",perInk:!0,default:[[0,1],[1,0]],hidden:!0},{kind:"toggle",key:"linkCurves",label:"Link curves",default:!1,hidden:!0,stage:null},{kind:"number",key:"bandCount",label:"Number of bands",default:4,min:1,max:4,step:1,visibleWhen:e=>e.mode!=="advanced"},{kind:"number",key:"cutoff1",label:"Cutoff 1",default:25,min:0,max:100,step:.5,hidden:!0},{kind:"number",key:"cutoff2",label:"Cutoff 2",default:50,min:0,max:100,step:.5,hidden:!0},{kind:"number",key:"cutoff3",label:"Cutoff 3",default:75,min:0,max:100,step:.5,hidden:!0},{kind:"select",key:"band1Ink",label:"Band 1 ink",default:"auto",options:mt,hidden:!0},{kind:"select",key:"band2Ink",label:"Band 2 ink",default:"auto",options:mt,hidden:!0},{kind:"select",key:"band3Ink",label:"Band 3 ink",default:"auto",options:mt,hidden:!0},{kind:"select",key:"band4Ink",label:"Band 4 ink",default:"auto",options:mt,hidden:!0},{kind:"number",key:"overlap1",label:"Overlap, bands 1–2",default:6,min:0,max:40,step:.5,unit:"%",visibleWhen:e=>e.mode!=="advanced"&&Number(e.bandCount)>=2},{kind:"number",key:"overlap2",label:"Overlap, bands 2–3",default:6,min:0,max:40,step:.5,unit:"%",visibleWhen:e=>e.mode!=="advanced"&&Number(e.bandCount)>=3},{kind:"number",key:"overlap3",label:"Overlap, bands 3–4",default:6,min:0,max:40,step:.5,unit:"%",visibleWhen:e=>e.mode!=="advanced"&&Number(e.bandCount)>=4},{kind:"select",key:"falloff",label:"Falloff",default:"smooth",display:"segmented",visibleWhen:e=>e.mode!=="advanced",options:[{value:"hard",label:"Hard"},{value:"linear",label:"Linear"},{value:"smooth",label:"Smooth"}]},{kind:"select",key:"fill",label:"Fill inside each band",default:"flat",display:"segmented",visibleWhen:e=>e.mode!=="advanced",options:[{value:"flat",label:"Flat"},{value:"gradient",label:"Tonal gradient"}]},{kind:"number",key:"posterize",label:"Posterize steps",default:0,min:0,max:8,step:1,help:"Steps within each band. 0 = smooth.",visibleWhen:e=>e.mode!=="advanced"&&e.fill==="gradient"}]};function Ct(e,t){return hs([e.band1Ink,e.band2Ink,e.band3Ink,e.band4Ink],e.bandCount,t)}function ps(e){return[e.cutoff1,e.cutoff2,e.cutoff3].slice(0,e.bandCount-1).map(t=>t/100).sort((t,n)=>t-n)}function Aa(e,t){return e.mode==="advanced"?cs(e.inkCurve.slice(0,t.length)):La(e,t)}function La(e,t){return ms({cutoffs:ps(e),bandInks:Ct(e,t),overlaps:[e.overlap1,e.overlap2,e.overlap3].map(n=>n/100),falloff:e.falloff,fill:e.fill,posterize:e.posterize})}const fs=`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uImage;
uniform sampler2D uCurves; // CURVE_SIZE × 1, one ink per channel
uniform int uSource;
uniform vec2 uSize;
out vec4 outColor;
${ae}
${ba}
void main() {
  vec2 uv = gl_FragCoord.xy / uSize;
  float l = clamp(lightness(texture(uImage, uv).rgb, uSource), 0.0, 1.0);
  outColor = texture(uCurves, vec2((l * ${Q-1}.0 + 0.5) / ${Q}.0, 0.5));
}
`,xi=new WeakMap;function gs(e,t){let n=xi.get(e);n||(n=e.createTexture(),e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),xi.set(e,n));const i=new Uint8Array(Q*B);for(let a=0;a<i.length;a++)i[a]=Math.round(t[a]*255);return e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,Q,1,0,e.RGBA,e.UNSIGNED_BYTE,i),n}const yi=e=>e.inks.map(t=>t.hex),vs={id:"toneMap",label:"Tone Map",section:Ia,dependsOn:(e,t)=>t.mode==="advanced"?null:Ct(t,yi(e)),render(e,t,n,i){const a=Aa(i,yi(e)),r=gs(e.gpu.gl,a);e.gpu.pass(fs,n,{uImage:{texture:t.texture},uCurves:{texture:r},uSource:Math.max(0,va.indexOf(i.source)),uSize:[n.width,n.height]})}},bs=()=>[os,vs,$o,us,Qo],ks=[Ea,Ia,ka,Ra,wa],xs=[{value:"inkMatching",label:"Ink Matching"},{value:"toneMap",label:"Tone Map"},{value:"channel",label:"Channel Split"},{value:"selective",label:"Selective Color"},{value:"detail",label:"Detail Split"}];function Pa(e){const t=bs();return t.find(n=>n.id===e)??t[0]}const pe=["digital"],X=["print"],Si="Riso machines can't print within about 5 mm (0.2 in) of the paper edge; shown as a dashed guide in the preview.",wi="Extra paper around the page for artwork that runs off the edge; the file grows by this much on each side.",ys={id:"export",title:"Export",stage:null,settings:[{kind:"select",key:"digitalSize",label:"Size",default:"original",display:"segmented",modes:pe,stage:"halftone",options:[{value:"half",label:"0.5×"},{value:"original",label:"1×"},{value:"double",label:"2×"},{value:"triple",label:"3×"},{value:"custom",label:"Custom"}],help:"Scale of the uploaded image. Halftone sizes are measured in output pixels."},{kind:"toggle",key:"lockAspect",label:"Lock aspect ratio",default:!0,modes:pe,stage:"halftone",visibleWhen:e=>e.digitalSize==="custom"},{kind:"number",key:"digitalWidth",label:"Width",default:3e3,min:16,max:16e3,step:1,unit:"px",modes:pe,stage:"halftone",visibleWhen:e=>e.digitalSize==="custom"},{kind:"number",key:"digitalHeight",label:"Height",default:2e3,min:16,max:16e3,step:1,unit:"px",modes:pe,stage:"halftone",visibleWhen:e=>e.digitalSize==="custom"&&e.lockAspect===!1},{kind:"select",key:"digitalFit",label:"Image placement",default:"fit",display:"segmented",modes:pe,stage:"halftone",options:[{value:"fit",label:"Fit"},{value:"fill",label:"Fill"}],help:"Fit: the whole image shows, with paper around it. Fill: covers the whole size, cropping the image.",visibleWhen:e=>e.digitalSize==="custom"&&e.lockAspect===!1},{kind:"select",key:"digitalFormat",label:"File format",default:"png",display:"segmented",modes:pe,options:[{value:"png",label:"PNG"},{value:"jpg",label:"JPG"}]},{kind:"number",key:"jpgQuality",label:"JPG quality",default:92,min:40,max:100,step:1,unit:"%",modes:pe,visibleWhen:e=>e.digitalFormat==="jpg"},{kind:"toggle",key:"transparent",label:"Transparent background",default:!1,modes:pe,help:"The paper becomes transparent; ink keeps its printed color.",visibleWhen:e=>e.digitalFormat==="png"},{kind:"select",key:"printTarget",label:"Printer",default:"riso",display:"segmented",modes:X,stage:"printSim",options:[{value:"riso",label:"Riso layers"},{value:"standard",label:"Standard printer"}],help:"Riso: one black-and-white file per ink. Standard printer: one color page, without print simulation."},{kind:"select",key:"pageSize",label:"Page size",default:"letter",modes:X,stage:"halftone",options:[{value:"letter",label:"Letter (8.5 × 11 in)"},{value:"legal",label:"Legal (8.5 × 14 in)"},{value:"tabloid",label:"Tabloid (11 × 17 in)"},{value:"a4",label:"A4 (210 × 297 mm)"},{value:"a3",label:"A3 (297 × 420 mm)"},{value:"b4",label:"B4 (257 × 364 mm)"},{value:"custom",label:"Custom"},{value:"image",label:"Image only (no page)"}]},{kind:"select",key:"units",label:"Units",default:"in",display:"segmented",modes:X,stage:"halftone",options:[{value:"in",label:"in"},{value:"mm",label:"mm"}],help:"For margins, bleed, image width and custom page sizes. Switching converts them."},{kind:"number",key:"pageWidth",label:"Page width",default:8.5,min:1,max:1e3,step:.01,modes:X,stage:"halftone",visibleWhen:e=>e.pageSize==="custom"},{kind:"number",key:"pageHeight",label:"Page height",default:11,min:1,max:1e3,step:.01,modes:X,stage:"halftone",visibleWhen:e=>e.pageSize==="custom"},{kind:"select",key:"orientation",label:"Orientation",default:"portrait",display:"segmented",modes:X,stage:"halftone",options:[{value:"portrait",label:"Portrait"},{value:"landscape",label:"Landscape"}],visibleWhen:e=>e.pageSize!=="image"},{kind:"select",key:"placement",label:"Image placement",default:"fit",display:"segmented",modes:X,stage:"halftone",options:[{value:"fit",label:"Fit"},{value:"fill",label:"Fill"},{value:"custom",label:"Custom"}],help:"Fit: as large as possible inside the margins. Fill: covers the whole page (and bleed), cropping the image. Custom: set the width and position.",visibleWhen:e=>e.pageSize!=="image"},{kind:"number",key:"imageWidth",label:"Image width",default:6,min:.1,max:1e3,step:.01,modes:X,stage:"halftone",help:"Width of the artwork (image plus any border), in the units above.",visibleWhen:e=>e.pageSize==="image"||e.placement==="custom"},{kind:"number",key:"positionX",label:"Position across",default:50,min:0,max:100,step:.5,unit:"%",modes:X,stage:"halftone",visibleWhen:e=>e.pageSize!=="image"&&e.placement==="custom"},{kind:"number",key:"positionY",label:"Position down",default:50,min:0,max:100,step:.5,unit:"%",modes:X,stage:"halftone",visibleWhen:e=>e.pageSize!=="image"&&e.placement==="custom"},{kind:"number",key:"margin",label:"Margins",default:5,min:0,max:50,step:.5,unit:"mm",modes:X,stage:"halftone",help:Si,visibleWhen:e=>e.pageSize!=="image"&&e.units==="mm"},{kind:"number",key:"marginIn",label:"Margins",default:.2,min:0,max:2,step:.01,unit:"in",modes:X,stage:"halftone",help:Si,visibleWhen:e=>e.pageSize!=="image"&&e.units!=="mm"},{kind:"number",key:"bleed",label:"Bleed",default:0,min:0,max:10,step:.5,unit:"mm",modes:X,stage:"halftone",help:wi,visibleWhen:e=>e.pageSize!=="image"&&e.units==="mm"},{kind:"number",key:"bleedIn",label:"Bleed",default:0,min:0,max:.4,step:.01,unit:"in",modes:X,stage:"halftone",help:wi,visibleWhen:e=>e.pageSize!=="image"&&e.units!=="mm"},{kind:"select",key:"dpiPreset",label:"Resolution",default:"600",display:"segmented",modes:X,stage:"halftone",options:[{value:"300",label:"300 DPI"},{value:"600",label:"600 DPI"},{value:"1200",label:"1200 DPI"},{value:"custom",label:"Custom"}],help:"Riso machines print at 600 DPI."},{kind:"number",key:"dpi",label:"Custom resolution",stage:"halftone",default:600,min:150,max:1200,step:50,unit:"DPI",modes:X,visibleWhen:e=>e.dpiPreset==="custom"},{kind:"select",key:"fileFormat",label:"File format",default:"png",display:"segmented",modes:X,stage:null,options:[{value:"png",label:"PNG"},{value:"pdf",label:"PDF"}],help:"Riso PDF: one page per layer."},{kind:"toggle",key:"cropMarks",label:"Crop marks",default:!1,modes:X,stage:null,help:"Where to trim, at the artwork's corners (the page's with Fill)."},{kind:"toggle",key:"regMarks",label:"Registration marks",default:!1,modes:X,stage:null,help:"Targets on every layer for lining the inks up.",visibleWhen:e=>e.printTarget==="riso"},{kind:"toggle",key:"layerLabels",label:"Layer labels",default:!1,modes:X,stage:null,help:"Project name, ink and print order in the bottom margin of each layer.",visibleWhen:e=>e.printTarget==="riso"},{kind:"toggle",key:"includeProof",label:"Composite proof",default:!0,modes:X,stage:null,help:"A color preview of the whole page (150 DPI), added to the zip.",visibleWhen:e=>e.printTarget==="riso"},{kind:"toggle",key:"includeSheet",label:"Print sheet",default:!0,modes:X,stage:null,help:"A page listing the inks, print order and settings, added to the zip.",visibleWhen:e=>e.printTarget==="riso"},{kind:"toggle",key:"gainCompensation",label:"Dot gain compensation",default:!1,modes:X,stage:"printSim",help:"Shrinks dots in the riso layers so they print at the intended size after the ink spreads. Uses the Dot gain settings in Print Simulation.",visibleWhen:e=>e.printTarget==="riso"},{kind:"toggle",key:"embedProfile",label:"Embed sRGB profile",default:!0,stage:null,help:"Tags color files as sRGB so other apps show the colors as intended.",visibleWhen:(e,t)=>t.upload?.mode!=="print"||e.printTarget==="standard"||e.includeProof===!0}]};function Ss(e){return e.dpiPreset==="custom"?e.dpi:Number(e.dpiPreset)}function ws(e){return e.units==="mm"?e.margin:e.marginIn*25.4}function Da(e){return e.units==="mm"?e.bleed:e.bleedIn*25.4}const ze=e=>e.printSim?.enabled===!0,Es=e=>e.upload?.mode==="print"&&e.export?.printTarget==="riso"&&e.export?.gainCompensation===!0,Ts={id:"printSim",title:"Print Simulation",stage:"printSim",settings:[{kind:"toggle",key:"enabled",label:"Simulate printing",default:!1,help:"Preview how the print will really look. Baked into Digital exports; never added to riso layers."}]},Ms={id:"simMisreg",title:"Layer misregistration",stage:"printSim",parent:"printSim",description:"Each ink layer lands slightly off from the others.",visibleWhen:ze,settings:[{kind:"toggle",key:"on",label:"On",default:!0},{kind:"number",key:"shift",label:"Shift",default:3,min:0,max:40,step:.5,unit:"px",help:"Largest random offset of a layer, in output pixels (about 1 mm is 24 px at 600 DPI).",visibleWhen:e=>e.on===!0},{kind:"number",key:"rotation",label:"Rotation",default:.05,min:0,max:1,step:.01,unit:"°",help:"Largest random rotation of a layer, around the image center.",visibleWhen:e=>e.on===!0},{kind:"seed",key:"seed",label:"Random seed",default:1,visibleWhen:e=>e.on===!0}]},Rs={id:"simLowInk",title:"Low-ink patches",stage:"printSim",parent:"printSim",description:"Patches where the drum runs short of ink and the print goes grainy and light, mostly in big solid areas.",visibleWhen:ze,settings:[{kind:"toggle",key:"on",label:"On",default:!0},{kind:"number",key:"intensity",label:"Intensity",default:35,min:0,max:100,step:1,unit:"%",help:"How much ink is lost inside a patch.",visibleWhen:e=>e.on===!0},{kind:"number",key:"size",label:"Patch size",default:15,min:2,max:60,step:.5,unit:"%",help:"% of the image's shorter side.",visibleWhen:e=>e.on===!0},{kind:"select",key:"shape",label:"Patch shape",default:"fractal",display:"segmented",options:[{value:"fractal",label:"Blotches"},{value:"streaks",label:"Drum streaks"},{value:"edge",label:"Edge fade"}],visibleWhen:e=>e.on===!0},{kind:"number",key:"detail",label:"Detail",default:4,min:1,max:6,step:1,help:"Layers of noise: more gives more intricate edges.",visibleWhen:e=>e.on===!0&&e.shape==="fractal"},{kind:"number",key:"roughness",label:"Roughness",default:50,min:0,max:100,step:1,unit:"%",visibleWhen:e=>e.on===!0&&e.shape==="fractal"},{kind:"number",key:"direction",label:"Feed direction",default:90,min:0,max:180,step:1,unit:"°",help:"Direction the paper travels: streaks run this way (90° = top to bottom).",visibleWhen:e=>e.on===!0&&e.shape==="streaks"},{kind:"number",key:"streakLength",label:"Streak length",default:8,min:1,max:30,step:.5,unit:"×",help:"How much longer streaks are than they are wide.",visibleWhen:e=>e.on===!0&&e.shape==="streaks"},{kind:"number",key:"frequency",label:"Streak frequency",default:1.5,min:.25,max:6,step:.25,unit:"×",visibleWhen:e=>e.on===!0&&e.shape==="streaks"},{kind:"select",key:"side",label:"Thin side",default:"right",display:"segmented",options:[{value:"top",label:"Top"},{value:"bottom",label:"Bottom"},{value:"left",label:"Left"},{value:"right",label:"Right"}],visibleWhen:e=>e.on===!0&&e.shape==="edge"},{kind:"number",key:"falloff",label:"Falloff distance",default:40,min:5,max:100,step:1,unit:"%",help:"% of the image width or height.",visibleWhen:e=>e.on===!0&&e.shape==="edge"},{kind:"number",key:"influence",label:"Coverage influence",default:70,min:0,max:100,step:1,unit:"%",help:"How strongly patches are drawn to heavily inked areas.",visibleWhen:e=>e.on===!0},{kind:"number",key:"softness",label:"Edge softness",default:40,min:0,max:100,step:1,unit:"%",visibleWhen:e=>e.on===!0},{kind:"toggle",key:"shared",label:"Same patches on every ink",default:!1,visibleWhen:e=>e.on===!0},{kind:"seed",key:"seed",label:"Random seed",default:1,visibleWhen:e=>e.on===!0}]},Cs={id:"simSpecks",title:"Specks",stage:"printSim",parent:"printSim",description:"Small spots of stray ink, and pinholes where ink is missing.",visibleWhen:ze,settings:[{kind:"toggle",key:"on",label:"On",default:!0},{kind:"toggle",key:"ink",label:"Specks on these inks",perInk:!0,default:!0,visibleWhen:e=>e.on===!0},{kind:"number",key:"density",label:"Density",default:30,min:0,max:500,step:1,unit:"/MP",help:"Specks per million output pixels.",visibleWhen:e=>e.on===!0},{kind:"number",key:"minSize",label:"Smallest speck",default:2,min:1,max:30,step:.5,unit:"px",visibleWhen:e=>e.on===!0},{kind:"number",key:"maxSize",label:"Largest speck",default:6,min:1,max:40,step:.5,unit:"px",visibleWhen:e=>e.on===!0},{kind:"number",key:"extra",label:"Extra ink",default:40,min:0,max:100,step:1,unit:"%",help:"Share of specks that add ink; the rest are pinholes (which only show inside ink).",visibleWhen:e=>e.on===!0},{kind:"number",key:"clumping",label:"Clumping",default:30,min:0,max:100,step:1,unit:"%",help:"0 = scattered evenly; higher = grouped together.",visibleWhen:e=>e.on===!0},{kind:"select",key:"placement",label:"Extra ink appears",default:"near",display:"segmented",options:[{value:"near",label:"Near ink"},{value:"anywhere",label:"Anywhere"}],visibleWhen:e=>e.on===!0},{kind:"number",key:"opacity",label:"Opacity",default:100,min:0,max:100,step:1,unit:"%",help:"Lower = patchier, broken-up specks.",visibleWhen:e=>e.on===!0},{kind:"seed",key:"seed",label:"Random seed",default:1,visibleWhen:e=>e.on===!0}]},Is={id:"simGain",title:"Dot gain",stage:"printSim",parent:"printSim",description:"Ink spreads into the paper, so dots print larger and darker. Also used by dot gain compensation (Export, Print mode).",visibleWhen:e=>ze(e)||Es(e),settings:[{kind:"toggle",key:"on",label:"On",default:!0,help:"Show dot gain in the preview (and Digital exports).",visibleWhen:(e,t)=>ze(t)},{kind:"number",key:"amount",label:"Gain at 50%",perInk:!0,default:12,min:0,max:40,step:.5,unit:"%",help:"How much darker a 50% tone prints (12% → prints as 62%)."},{kind:"select",key:"curve",label:"Gain curve",default:"midtone",display:"segmented",options:[{value:"midtone",label:"Midtone-weighted"},{value:"uniform",label:"Uniform"}],help:"Real gain is strongest in the midtones."},{kind:"select",key:"paper",label:"Paper absorbency",default:"uncoated",display:"segmented",options:[{value:"smooth",label:"Smooth"},{value:"uncoated",label:"Uncoated"},{value:"recycled",label:"Recycled"}],help:"Scales the gain: smooth ×0.6, uncoated ×1, recycled ×1.4."},{kind:"number",key:"roughness",label:"Edge roughness",default:30,min:0,max:100,step:1,unit:"%",help:"How ragged dot edges become.",visibleWhen:(e,t)=>e.on===!0&&ze(t)}]},As=[Ts,Ms,Rs,Cs,Is],Ls={id:"upload",title:"Upload",stage:"upload",settings:[{kind:"select",key:"mode",label:"Mode",default:"digital",display:"segmented",stage:null,options:[{value:"digital",label:"Digital"},{value:"print",label:"Print"}],help:"Digital exports one riso-style image. Print exports each ink as a separate black-and-white layer."},{kind:"text",key:"projectName",label:"Project name",default:"Untitled",maxLength:60,stage:null,help:"Used to name exported files."}]},Ps={id:"palette",title:"Palette",stage:"overlapTable",settings:[{kind:"select",key:"source",label:"Colors",default:"manual",display:"segmented",hidden:!0,stage:null,options:[{value:"manual",label:"Manual"},{value:"scheme",label:"Scheme"},{value:"auto",label:"Auto"}]},{kind:"select",key:"scheme",label:"Scheme",default:"triad",hidden:!0,stage:null,options:br.map(e=>({value:e.id,label:`${e.label} (${e.count})`}))},{kind:"toggle",key:"schemeIncludeBackground",label:"Include background in scheme",default:!1,hidden:!0,stage:null},{kind:"color",key:"schemeBase",label:"First color",default:"#0078bf",hidden:!0,stage:null},{kind:"toggle",key:"autoIncludeBackground",label:"Pick the background from the image too",default:!1,hidden:!0,stage:null},{kind:"number",key:"inkCount",label:"Number of inks",default:3,min:1,max:4,step:1,hidden:!0,stage:"split"},{kind:"color",key:"inkColor",label:"Ink color",perInk:!0,default:"#000000",slotDefaults:["#0078bf","#ff48b0","#ffe800","#000000"],hidden:!0},{kind:"color",key:"paper",label:"Paper",default:"#f6f3ec",hidden:!0},{kind:"number",key:"inkOpacity",label:"Ink opacity",perInk:!0,default:0,min:0,max:100,step:1,unit:"%",help:"Riso inks are transparent (0%). Raise this for dense inks like metallics or white, which partly cover inks printed before them.",collapsed:"Ink opacity (for metallic or white inks)"}]},Ds={id:"adjust",title:"Image Adjustments",stage:"adjust",settings:[{kind:"number",key:"blackPoint",label:"Levels: black point",default:0,min:0,max:100,step:.5,unit:"%"},{kind:"number",key:"whitePoint",label:"Levels: white point",default:100,min:0,max:100,step:.5,unit:"%"},{kind:"number",key:"midtone",label:"Levels: midtone",default:0,min:-100,max:100,step:1,help:"Positive brightens the midtones, negative darkens them."},{kind:"curve",key:"curve",label:"Contrast curve",default:[[0,0],[1,1]],help:"Click to add a point, drag to move it, double-click a point to remove it."},{kind:"number",key:"saturation",label:"Saturation boost",default:0,min:0,max:100,step:1,unit:"%",help:"Most useful with Ink Matching."},{kind:"number",key:"smoothing",label:"Smoothing",default:0,min:0,max:10,step:.1,help:"Softens noise and fine texture while keeping edges."}]},_s={id:"split",title:"Color Splitting",stage:"split",settings:[{kind:"select",key:"method",label:"Method",default:"inkMatching",options:xs}]},Ns={id:"layers",title:"Layers",stage:"layerOptions",parent:"split",settings:[{kind:"number",key:"density",label:"Density",perInk:!0,default:100,min:0,max:200,step:1,unit:"%",hidden:!0},{kind:"toggle",key:"invert",label:"Invert",perInk:!0,default:!1,hidden:!0},{kind:"number",key:"levelsBlack",label:"Levels: start",perInk:!0,default:0,min:0,max:100,step:.5,unit:"%",hidden:!0},{kind:"number",key:"levelsWhite",label:"Levels: full",perInk:!0,default:100,min:0,max:100,step:.5,unit:"%",hidden:!0},{kind:"number",key:"levelsMid",label:"Levels: midtone",perInk:!0,default:0,min:-100,max:100,step:1,hidden:!0},{kind:"curve",key:"curve",label:"Curve",perInk:!0,default:[[0,0],[1,1]],hidden:!0},{kind:"toggle",key:"knockout",label:"Knockout",perInk:!0,default:!1,hidden:!0},{kind:"number",key:"trap",label:"Choke / spread",perInk:!0,default:0,min:-8,max:8,step:.5,unit:"px",hidden:!0},{kind:"number",key:"inkLimit",label:"Total ink limit",default:400,min:100,max:400,step:5,unit:"%",help:"Caps the combined coverage of all inks at any spot. 400% = no limit. Lower it to reduce heavy, muddy overlaps."},{kind:"toggle",key:"solo",label:"Solo",perInk:!0,default:!1,hidden:!0,stage:"mix"},{kind:"toggle",key:"mute",label:"Mute",perInk:!0,default:!1,hidden:!0,stage:"mix"}]},Fs=["am","hex","noise","spiral","rings","turing"],$s={id:"halftone",title:"Halftone",stage:"halftone",settings:[{kind:"select",key:"type",label:"Type",default:"am",options:Ao},{kind:"number",key:"minDot",label:"Minimum dot size",perInk:!0,default:1.5,min:0,max:8,step:.5,unit:"px",help:"Smallest dot allowed, in output pixels (1–2 px at 600 DPI). Riso machines struggle to print tiny dots.",visibleWhen:e=>e.type!=="none",placement:"end"},{kind:"select",key:"minDotMode",label:"Tones lighter than the minimum",default:"drop",display:"segmented",options:[{value:"drop",label:"Drop to paper"},{value:"round",label:"Round up"}],visibleWhen:e=>Fs.includes(String(e.type)),placement:"end"}]},Us={id:"border",title:"Border",stage:"border",settings:[{kind:"toggle",key:"fade",label:"Fade edges",default:!1,help:"A soft vignette to black or white. Applied before processing, so it is split and halftoned like the rest of the image."},{kind:"select",key:"fadeColor",label:"Fade to",default:"white",display:"segmented",options:[{value:"white",label:"White"},{value:"black",label:"Black"}],visibleWhen:e=>e.fade===!0},{kind:"number",key:"fadeDistance",label:"Fade distance",default:12,min:.5,max:50,step:.5,unit:"%",help:"How far the fade reaches in from the edge (% of the shorter side).",visibleWhen:e=>e.fade===!0},{kind:"number",key:"fadeRadius",label:"Fade corner radius",default:0,min:0,max:50,step:.5,unit:"%",visibleWhen:e=>e.fade===!0},{kind:"number",key:"fadeOpacity",label:"Fade opacity",default:100,min:0,max:100,step:1,unit:"%",visibleWhen:e=>e.fade===!0},{kind:"select",key:"fadeCurve",label:"Fade curve",default:"smooth",options:[{value:"linear",label:"Linear (even)"},{value:"smooth",label:"Smooth (like a camera vignette)"},{value:"exponential",label:"Exponential (strong at the edge, then drops off)"},{value:"custom",label:"Custom"}],visibleWhen:e=>e.fade===!0},{kind:"curve",key:"fadeCustom",label:"Custom fade (edge → inside)",default:[[0,1],[1,0]],visibleWhen:e=>e.fade===!0&&e.fadeCurve==="custom"},{kind:"number",key:"fadeMidpoint",label:"Fade midpoint",default:50,min:5,max:95,step:1,unit:"%",help:"Where the fade is at half strength, as a share of the fade distance.",visibleWhen:e=>e.fade===!0},{kind:"select",key:"frame",label:"Border",default:"none",display:"segmented",options:[{value:"none",label:"None"},{value:"ink",label:"Solid ink"},{value:"paper",label:"Paper"}],help:"Solid ink: one ink, not halftoned, with every other ink removed there. Paper: bare paper."},{kind:"select",key:"frameInk",label:"Border ink",default:"0",inkChoice:!0,options:[{value:"0",label:"Ink 1"},{value:"1",label:"Ink 2"},{value:"2",label:"Ink 3"},{value:"3",label:"Ink 4"}],visibleWhen:e=>e.frame==="ink"},{kind:"number",key:"frameThickness",label:"Thickness",default:4,min:-25,max:25,step:.25,unit:"%",help:"Positive grows the canvas outward around the image; negative covers the image's edge.",visibleWhen:e=>e.frame!=="none"},{kind:"number",key:"frameRadius",label:"Border corner radius",default:0,min:0,max:50,step:.5,unit:"%",help:"Rounds the corners of the image opening.",visibleWhen:e=>e.frame!=="none"}]},Ie=[Ls,Ps,Ds,_s,...ks,Ns,$s,...Co,Us,...As,ys];function _a(e){return Ie.find(t=>t.id===e)}function se(e,t){return _a(e)?.settings.find(n=>n.key===t)}function Bs(e,t){const n=_a(e),i=n?.settings.find(a=>a.key===t);return!n||!i?null:i.stage===void 0?n.stage:i.stage}function nt(e,t){const n=e.slotDefaults,i=t!==void 0&&n?.[t]!==void 0?n[t]:e.default;return e.kind==="curve"?i.map(a=>[a[0],a[1]]):i}function Os(e){return e.perInk?Array.from({length:B},(t,n)=>nt(e,n)):nt(e)}function zs(e){const t={};for(const n of e.settings)t[n.key]=Os(n);return t}function Ws(){const e={};for(const t of Ie)e[t.id]=zs(t);return e}function Ei(e,t,n){if(t===void 0)return nt(e,n);switch(e.kind){case"number":{const i=typeof t=="number"?t:Number(t);return Number.isFinite(i)?Math.min(e.max,Math.max(e.min,i)):e.default}case"seed":{const i=typeof t=="number"?t:Number(t);return Number.isFinite(i)?Math.floor(Math.abs(i))%2**31:e.default}case"select":return e.options.some(i=>i.value===t)?t:e.default;case"toggle":return typeof t=="boolean"?t:e.default;case"color":return typeof t=="string"&&/^#[0-9a-f]{6}$/i.test(t)?t.toLowerCase():e.default;case"text":return typeof t!="string"?e.default:e.maxLength?t.slice(0,e.maxLength):t;case"curve":return Array.isArray(t)?t:e.default}}function Ti(e,t){if(!e.perInk)return Ei(e,t);const n=Array.isArray(t)?t:[];return Array.from({length:B},(i,a)=>Ei(e,n[a],a))}function Na(e,t,n){if(e.modes&&!e.modes.includes(t.upload.mode))return!1;if(e.visibleWhen){const i=t;return e.visibleWhen(i[n]??{},i)}return!0}class Gs{settings=Ws();listeners=new Set;get(){return this.settings}getValue(t,n){return this.settings[t]?.[n]}set(t,n,i,a={}){this.setValue(t,n,i,a)}setValue(t,n,i,a={}){const r=se(t,n);if(!r)throw new Error(`Unknown setting ${t}.${n}`);const o=Ti(r,i),s=a.commit??!0,l=this.getValue(t,n);if(Fa(l,o)&&!s)return;const u=this.settings[t]??{};this.settings={...this.settings,[t]:{...u,[n]:o}},this.emit({section:t,key:n,stage:Bs(t,n),commit:s})}setInkValue(t,n,i,a,r={}){const o=this.getValue(t,n);if(!Array.isArray(o))throw new Error(`${t}.${n} is not a per-ink setting`);const s=o.slice();s[i]=a,this.setValue(t,n,s,r)}permuteInks(t){this.updateAllPerInk((n,i)=>i.map((a,r)=>i[t[r]??r])),this.emit({section:"*",key:"inkSlots",stage:"split",commit:!0})}resetInkSlot(t){this.updateAllPerInk((n,i)=>i.map((a,r)=>r===t?nt(n,r):a)),this.emit({section:"*",key:"inkSlots",stage:"split",commit:!0})}updateAllPerInk(t){const n={...this.settings};for(const i of Ie)for(const a of i.settings){if(!a.perInk)continue;const r=n[i.id]?.[a.key];Array.isArray(r)&&(n[i.id]={...n[i.id],[a.key]:Ti(a,t(a,r))})}this.settings=n}emit(t){for(const n of this.listeners)n(this.settings,t)}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}}function Fa(e,t){return e===t?!0:Array.isArray(e)&&Array.isArray(t)?e.length===t.length&&e.every((n,i)=>Fa(n,t[i])):!1}function Xs(e){const t=document.createElement("div");t.className="upload-block";const n=document.createElement("input");n.type="file",n.accept=sr,n.hidden=!0,n.addEventListener("change",()=>{n.files?.length&&e(n.files),n.value=""});const i=document.createElement("label");i.className="drop-zone",i.tabIndex=0,i.innerHTML='<span class="drop-zone-title">Choose an image</span><span class="drop-zone-hint">or drag one here · JPG, PNG, WebP</span>',i.addEventListener("click",s=>{s.preventDefault(),n.click()}),i.addEventListener("keydown",s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),n.click())}),i.addEventListener("dragover",s=>{s.preventDefault(),i.classList.add("drag-over")}),i.addEventListener("dragleave",()=>i.classList.remove("drag-over")),i.addEventListener("drop",s=>{s.preventDefault(),s.stopPropagation(),i.classList.remove("drag-over"),s.dataTransfer?.files.length&&e(s.dataTransfer.files)});const a=document.createElement("p");a.className="upload-info",a.hidden=!0,t.append(i,n,a);const r=i.querySelector(".drop-zone-title");let o="Choose an image";return{element:t,showImage(s){o="Replace image",r.textContent=o,a.hidden=!1,a.textContent=`${s.fileName} · ${s.width} × ${s.height} px`},setBusy(s){i.classList.toggle("busy",s),r.textContent=s?"Opening…":o}}}const Hs=10,Mi=28;function $a(e,t,n){const i=document.createElement("div");i.className="curve-editor";const a=document.createElement("canvas");a.setAttribute("role","img"),a.setAttribute("aria-label",`${e} editor`);const r=document.createElement("button");r.type="button",r.textContent="Reset",r.className="curve-reset",i.append(a,r);let o=t.map(([p,g])=>[p,g]),s=null,l=!1;const u=()=>{const p=Math.max(120,i.clientWidth||240);return{w:p,h:Math.round(p*.62)}};function c(){const{w:p,h:g}=u(),v=window.devicePixelRatio||1;(a.width!==Math.round(p*v)||a.height!==Math.round(g*v))&&(a.width=Math.round(p*v),a.height=Math.round(g*v),a.style.height=`${g}px`);const b=a.getContext("2d");b.setTransform(v,0,0,v,0,0),b.clearRect(0,0,p,g),b.fillStyle="#fafbf8",b.fillRect(0,0,p,g),b.strokeStyle="#dfe6d6",b.lineWidth=1;for(let w=1;w<4;w++)b.beginPath(),b.moveTo(p*w/4+.5,0),b.lineTo(p*w/4+.5,g),b.moveTo(0,g*w/4+.5),b.lineTo(p,g*w/4+.5),b.stroke();b.strokeStyle="#c5ccb8",b.setLineDash([3,3]),b.beginPath(),b.moveTo(0,g),b.lineTo(p,0),b.stroke(),b.setLineDash([]);const k=Te(o,Math.max(64,Math.round(p)));b.strokeStyle="#1c1c1c",b.lineWidth=2,b.beginPath(),k.forEach((w,M)=>{const S=M/(k.length-1)*p,y=(1-w)*g;M===0?b.moveTo(S,y):b.lineTo(S,y)}),b.stroke(),o.forEach(([w,M],S)=>{b.beginPath(),b.arc(w*p,(1-M)*g,5,0,Math.PI*2),b.fillStyle=S===s?l?"#a3261b":"#f78f28":"#fff",b.fill(),b.strokeStyle="#1c1c1c",b.lineWidth=1.5,b.stroke()}),i.classList.toggle("is-default",qs(o))}const h=p=>{const g=a.getBoundingClientRect();return{x:(p.clientX-g.left)/g.width,y:1-(p.clientY-g.top)/g.height,px:p.clientX-g.left,py:p.clientY-g.top,r:g}},f=(p,g,v)=>{let b=-1,k=Hs;return o.forEach(([w,M],S)=>{const y=Math.hypot(w*v.width-p,(1-M)*v.height-g);y<=k&&(k=y,b=S)}),b},d=p=>n(o.map(([g,v])=>[g,v]),p);a.addEventListener("pointerdown",p=>{const g=h(p);let v=f(g.px,g.py,g.r);if(v<0){const b=Math.min(.99,Math.max(.01,g.x));o.push([b,Math.min(1,Math.max(0,g.y))]),o.sort((k,w)=>k[0]-w[0]),v=o.findIndex(k=>k[0]===b),d(!1)}s=v,a.setPointerCapture(p.pointerId),c()}),a.addEventListener("pointermove",p=>{if(s===null){const y=h(p);a.style.cursor=f(y.px,y.py,y.r)>=0?"grab":"crosshair";return}const g=h(p),v=s,b=v===0||v===o.length-1,k=g.py<-Mi||g.py>g.r.height+Mi;l=!b&&k;const w=o[v-1],M=o[v+1],S=b?o[v][0]:Math.min((M?.[0]??1)-.01,Math.max((w?.[0]??0)+.01,g.x));o[v]=[S,Math.min(1,Math.max(0,g.y))],d(!1),c()});const m=()=>{s!==null&&(l&&o.splice(s,1),s=null,l=!1,d(!0),c())};return a.addEventListener("pointerup",m),a.addEventListener("pointercancel",m),a.addEventListener("dblclick",p=>{const g=h(p),v=f(g.px,g.py,g.r);v>0&&v<o.length-1&&(o.splice(v,1),d(!0),c())}),r.addEventListener("click",()=>{o=[[0,0],[1,1]],d(!0),c()}),new ResizeObserver(()=>c()).observe(i),c(),{element:i,update(p){s===null&&(o=p.map(([g,v])=>[g,v]),c())}}}function qs(e){return e.length===2&&e[0][0]===0&&e[0][1]===0&&e[1][0]===1&&e[1][1]===1}let js=0;function Ge(){return`ctl-${++js}`}function be(e,t,n=e.label){const i=document.createElement("div");i.className=`control control-${e.kind}`;const a=document.createElement(t?"label":"span");a.className="control-label",a.textContent=n,t&&(a.htmlFor=t);const r=document.createElement("div");if(r.className="control-body",i.append(a,r),e.help){const o=document.createElement("p");o.className="control-help",o.textContent=e.help,i.append(o)}return{row:i,body:r}}function Vs(e){const t=String(e),n=t.indexOf(".");return n<0?0:t.length-n-1}function Ys(e,t,n,i){const a=Ge(),{row:r,body:o}=be(e,a,i),s=document.createElement("input");s.type="range",s.id=a,s.min=String(e.min),s.max=String(e.max),s.step=String(e.step);const l=document.createElement("input");l.type="number",l.className="control-number",l.min=s.min,l.max=s.max,l.step=s.step,l.setAttribute("aria-label",`${e.label} value`);const u=h=>h.toFixed(Vs(e.step)),c=h=>{s.value=String(h),l.value=u(h)};if(c(t),s.addEventListener("input",()=>{l.value=u(Number(s.value)),n(Number(s.value),!1)}),s.addEventListener("change",()=>n(Number(s.value),!0)),l.addEventListener("change",()=>{const h=Number(l.value);Number.isFinite(h)&&n(h,!0)}),o.append(s,l),e.unit){const h=document.createElement("span");h.className="control-unit",h.textContent=e.unit,o.append(h)}return{element:r,update:h=>c(Number(h))}}function Ks(e,t,n,i){if(e.display==="segmented"){const{row:u,body:c}=be(e,null,i),h=document.createElement("div");h.className="segmented",h.setAttribute("role","radiogroup"),h.setAttribute("aria-label",i??e.label);const f=e.options.map(m=>{const p=document.createElement("button");return p.type="button",p.textContent=m.label,p.setAttribute("role","radio"),p.dataset.value=m.value,p.addEventListener("click",()=>n(m.value,!0)),h.append(p),p}),d=m=>{for(const p of f){const g=p.dataset.value===m;p.classList.toggle("active",g),p.setAttribute("aria-checked",String(g))}};return d(t),c.append(h),{element:u,update:d}}const a=Ge(),{row:r,body:o}=be(e,a,i),s=document.createElement("select");s.id=a;const l=u=>{const c=s.value,h=[];let f=null;for(const d of u){const m=document.createElement("option");if(m.value=d.value,m.textContent=d.label,!d.group){f=null,h.push(m);continue}f?.label!==d.group&&(f=document.createElement("optgroup"),f.label=d.group,h.push(f)),f.append(m)}s.replaceChildren(...h),s.value=c};return l(e.options),s.value=t,s.addEventListener("change",()=>n(s.value,!0)),o.append(s),{element:r,update:u=>s.value=String(u),setOptions:l}}function Js(e,t,n,i){const a=Ge(),{row:r,body:o}=be(e,a,i),s=document.createElement("input");return s.type="checkbox",s.id=a,s.checked=t,s.addEventListener("change",()=>n(s.checked,!0)),o.append(s),{element:r,update:l=>s.checked=!!l}}function Zs(e,t,n,i){const a=Ge(),{row:r,body:o}=be(e,a,i),s=document.createElement("input");s.type="color",s.id=a;const l=document.createElement("input");l.type="text",l.className="control-hex",l.maxLength=7,l.spellcheck=!1,l.setAttribute("aria-label",`${e.label} hex code`);const u=c=>{s.value=String(c),l.value=String(c)};return u(t),s.addEventListener("input",()=>{l.value=s.value,n(s.value,!1)}),s.addEventListener("change",()=>n(s.value,!0)),l.addEventListener("change",()=>{const c=l.value.trim().startsWith("#")?l.value.trim():`#${l.value.trim()}`;/^#[0-9a-f]{6}$/i.test(c)?n(c.toLowerCase(),!0):l.value=s.value}),o.append(s,l),{element:r,update:u}}function Qs(e,t,n,i){const a=Ge(),{row:r,body:o}=be(e,a,i),s=document.createElement("input");return s.type="text",s.id=a,e.maxLength&&(s.maxLength=e.maxLength),s.value=t,s.addEventListener("input",()=>n(s.value,!1)),s.addEventListener("change",()=>n(s.value,!0)),o.append(s),{element:r,update:l=>{document.activeElement!==s&&(s.value=String(l))}}}function el(e,t,n,i){const a=Ge(),{row:r,body:o}=be(e,a,i),s=document.createElement("input");s.type="number",s.id=a,s.className="control-number",s.min="0",s.step="1",s.value=String(t),s.addEventListener("change",()=>n(Number(s.value),!0));const l=document.createElement("button");return l.type="button",l.textContent="Re-roll",l.addEventListener("click",()=>n(Math.floor(Math.random()*2**31),!0)),o.append(s,l),{element:r,update:u=>s.value=String(u)}}function te(e,t,n,i){switch(e.kind){case"number":return Ys(e,Number(t),n,i);case"select":return Ks(e,String(t),n,i);case"toggle":return Js(e,!!t,n,i);case"color":return Zs(e,String(t),n,i);case"text":return Qs(e,String(t),n,i);case"seed":return el(e,Number(t),n,i);case"curve":{const{row:a,body:r}=be(e,null,i),o=$a(i??e.label,t,(s,l)=>n(s,l));return r.append(o.element),{element:a,update:s=>o.update(s)}}}}const tl={};class nl{constructor(t,n={},i={}){this.store=t,this.element=document.createElement("aside"),this.element.className="panel",this.element.setAttribute("aria-label","Settings");const a=new Map;for(const o of Ie){if(o.parent){const d=a.get(o.parent);if(!d)throw new Error(`Section ${o.id}: parent ${o.parent} must come first`);const m=document.createElement("div");m.className="panel-subsection",m.dataset.section=o.id;const p=document.createElement("h3");if(p.textContent=o.title,m.append(p),o.description){const b=document.createElement("p");b.className="control-help",b.textContent=o.description,m.append(b)}const g=n[o.id];g&&m.append(g),this.addControls(o,m);const v=i[o.id];v&&m.append(v),d.append(m),this.subSections.push({section:o,element:m});continue}const s=document.createElement("details");s.className="panel-section",s.dataset.section=o.id,s.open=o.id==="upload"||o.id==="palette";const l=document.createElement("summary");l.textContent=o.title,s.append(l);const u=document.createElement("div");u.className="panel-section-body",s.append(u),a.set(o.id,u);const c=n[o.id];c&&u.append(c),this.addControls(o,u);const h=i[o.id];h&&u.append(h);const f=tl[o.id];if(f&&o.settings.length===0&&!c){const d=document.createElement("p");d.className="panel-placeholder",d.textContent=f,u.append(d)}this.element.append(s)}const r=new Map;for(const{container:o,element:s}of this.atEnd){let l=r.get(o);l||(l=document.createElement("div"),l.className="panel-end",o.append(l),r.set(o,l)),l.append(s)}this.refresh(),t.subscribe(()=>this.refresh())}element;controls=[];subSections=[];atEnd=[];addControls(t,n){for(const i of t.settings){if(i.hidden)continue;const a=i.perInk?this.perInkControl(t.id,i):this.scalarControl(t.id,i);i.collapsed&&(a.element=il(i.collapsed,a.element)),i.placement==="end"?this.atEnd.push({container:n,element:a.element}):n.append(a.element),this.controls.push(a)}}scalarControl(t,n){const i=te(n,this.store.getValue(t,n.key),(a,r)=>this.store.setValue(t,n.key,a,{commit:r}));return n.kind==="select"&&n.inkChoice?this.inkChoiceControl(t,n,i):{sectionId:t,def:n,element:i.element,update:()=>i.update(this.store.getValue(t,n.key))}}inkChoiceControl(t,n,i){const a=n.options.filter(o=>!/^\d+$/.test(o.value));let r="";return{sectionId:t,def:n,element:i.element,update:o=>{const{inkCount:s,inkColor:l}=o.palette,u=`${s}|${l.slice(0,s).join()}`;u!==r&&(r=u,i.setOptions?.([...a,...Array.from({length:s},(h,f)=>({value:String(f),label:`Ink ${f+1} · ${(l[f]??"").toUpperCase()}`}))]));const c=String(this.store.getValue(t,n.key));i.update(/^\d+$/.test(c)&&Number(c)>=s?String(s-1):c)}}}perInkControl(t,n){const i=document.createElement("div");i.className="control-group";const a=document.createElement("div");a.className="control-group-head";const r=document.createElement("span");r.className="control-label",r.textContent=n.label,a.append(r);const o=document.createElement("div");if(o.className="control-group-rows",i.append(a,o),n.help){const p=document.createElement("p");p.className="control-help",p.textContent=n.help,i.append(p)}const s=this.store,l=n.kind==="number";let u=null;const c=document.createElement("input");if(l){const p=document.createElement("label");p.className="control-link",c.type="checkbox",p.append(c,"Same for all inks"),a.append(p),c.addEventListener("change",()=>{u=c.checked,u?h(s.getValue(t,n.key)[0],!0):this.refresh()})}const h=(p,g)=>{const v=s.get().palette.inkCount,b=s.getValue(t,n.key);s.setValue(t,n.key,b.map((k,w)=>w<v?p:k),{commit:g})},f=p=>{const g=document.createElement("span");return g.className="ink-dot",g.style.setProperty("--swatch",p),g};let d="",m=[];return{sectionId:t,def:n,element:i,update(p){const{inkCount:g,inkColor:v}=p.palette,b=s.getValue(t,n.key),k=b.slice(0,g),w=k.every(y=>y===k[0]);u??=n.linkInks!==!1&&w;const M=l&&u&&g>1;l&&(c.checked=M,c.parentElement.hidden=g<2),M&&!w&&queueMicrotask(()=>h(b[0],!0));const S=`${g}|${v.join("|")}|${M}`;if(S!==d){if(d=S,o.innerHTML="",m=[],M){const y=te({...n,help:void 0},b[0],(x,E)=>h(x,E),"All inks"),T=y.element.querySelector(".control-label");for(let x=g-1;x>=0;x--)T?.prepend(f(v[x]??"#000"));o.append(y.element),m.push(y);return}for(let y=0;y<g;y++){const T=te({...n,help:void 0},b[y],(x,E)=>s.setInkValue(t,n.key,y,x,{commit:E}),(v[y]??"").toUpperCase());T.element.querySelector(".control-label")?.prepend(f(v[y]??"#000")),o.append(T.element),m.push(T)}}else m.forEach((y,T)=>y.update(b[T]))}}}refresh(){const t=this.store.get();for(const{section:n,element:i}of this.subSections)i.hidden=n.visibleWhen?!n.visibleWhen(t):!1;for(const n of this.controls)n.update(t),n.element.hidden=!Na(n.def,t,n.sectionId)}}function il(e,t){const n=document.createElement("details");n.className="control-more";const i=document.createElement("summary");return i.textContent=e,n.append(i,t),n}const al=`#version 300 es
precision highp float;
uniform sampler2D uImage;
uniform sampler2D uDetail;
uniform vec4 uDetailRect; // image px: x, y, width, height (width 0 = no detail)
uniform vec2 uViewSize;   // device px
uniform vec2 uImageSize;  // image px
uniform vec2 uOrigin;     // device px position of the image's top-left corner
uniform float uScale;     // device px per image px
uniform vec3 uBackground; // linear
uniform vec3 uPaper;      // linear
uniform int uFrameMode;   // 0 = no border
uniform vec4 uFrameCanvas;
uniform vec4 uFrameInner;
uniform float uFrameRadius;
uniform vec3 uFrameColor; // linear
out vec4 outColor;
${ae}
${Nt}
void main() {
  vec2 p = vec2(gl_FragCoord.x, uViewSize.y - gl_FragCoord.y);
  vec2 ip = (p - uOrigin) / uScale;
  vec2 uv = ip / uImageSize;
  // Sample outside the branches so mip selection has valid derivatives at edges.
  vec4 t = texture(uImage, uv);
  vec2 duv = (ip - uDetailRect.xy) / max(uDetailRect.zw, vec2(1e-6));
  vec4 d = texture(uDetail, duv);
  if (uDetailRect.z > 0.0 && all(greaterThanEqual(duv, vec2(0.0))) && all(lessThan(duv, vec2(1.0)))) t = d;
  vec3 c = uBackground;
  if (all(greaterThanEqual(uv, vec2(0.0))) && all(lessThan(uv, vec2(1.0)))) {
    c = mix(uPaper, t.rgb, t.a); // transparent areas show the paper
  }
  if (uFrameMode != 0 && all(greaterThanEqual(ip, uFrameCanvas.xy)) && all(lessThan(ip, uFrameCanvas.zw))) {
    // Around the image (a border that grows the canvas) there is only border.
    if (any(lessThan(uv, vec2(0.0))) || any(greaterThanEqual(uv, vec2(1.0)))) c = uFrameColor;
    // Anti-aliased edge: blend over about one screen pixel.
    float d = roundedRectSdf(ip, uFrameInner, uFrameRadius) * uScale;
    c = mix(c, uFrameColor, clamp(d + 0.5, 0.0, 1.0));
  }
  outColor = vec4(linearToSrgb(c), 1.0);
}
`,rl=["uImage","uDetail","uDetailRect","uViewSize","uImageSize","uOrigin","uScale","uBackground","uPaper","uFrameMode","uFrameCanvas","uFrameInner","uFrameRadius","uFrameColor"];class ol{constructor(t,n){this.canvas=t,this.background=n,this.gl=fa(t,{alpha:!1,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!0}),this.program=xn(this.gl,yn,al),this.uniforms=ga(this.gl,this.program,rl)}gl;program;uniforms;source=null;magNearest=new WeakMap;paper=[1,1,1];frame=null;setPaper(t){this.paper=t}setFrame(t){this.frame=t}setSource(t){this.source=t}render(t,n,i,a="full",r=!0){const o=this.gl,{width:s,height:l}=this.canvas;if(o.bindFramebuffer(o.FRAMEBUFFER,null),o.viewport(0,0,s,l),!this.source||n===0){const[d,m,p]=this.background.map(ge);return o.clearColor(d,m,p,1),o.clear(o.COLOR_BUFFER_BIT),!0}if(this.source.kind==="procedural")return this.source.draw(t,s,l,a,r);const c=this.source.textureWidth>=n&&t.scale>=2;o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,this.source.texture),c!==(this.magNearest.get(this.source.texture)??!1)&&(o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,c?o.NEAREST:o.LINEAR),this.magNearest.set(this.source.texture,c));const h=this.source.detail;o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,h?.texture??this.source.texture),o.activeTexture(o.TEXTURE0),o.useProgram(this.program),o.uniform1i(this.uniforms.uImage,0),o.uniform1i(this.uniforms.uDetail,1),o.uniform4f(this.uniforms.uDetailRect,h?.x??0,h?.y??0,h?.width??0,h?.height??0),o.uniform2f(this.uniforms.uViewSize,s,l),o.uniform2f(this.uniforms.uImageSize,n,i),o.uniform2f(this.uniforms.uOrigin,t.originX,t.originY),o.uniform1f(this.uniforms.uScale,t.scale),o.uniform3f(this.uniforms.uBackground,...this.background),o.uniform3f(this.uniforms.uPaper,...this.paper);const f=this.frame?.geometry;return o.uniform1i(this.uniforms.uFrameMode,f?.mode??0),f&&(o.uniform4f(this.uniforms.uFrameCanvas,...f.canvas),o.uniform4f(this.uniforms.uFrameInner,...f.inner),o.uniform1f(this.uniforms.uFrameRadius,f.radius),o.uniform3f(this.uniforms.uFrameColor,...this.frame.color)),o.drawArrays(o.TRIANGLES,0,3),!0}}function sl(e){const t=e.layout;return{x0:-t.imageX/t.scale,y0:-t.imageY/t.scale,x1:(t.width-t.imageX)/t.scale,y1:(t.height-t.imageY)/t.scale}}function ll(e,t,n,i){const a=t.layout,r=n.scale/a.scale,o=d=>n.originX+(d-a.imageX)*r,s=d=>n.originY+(d-a.imageY)*r,l=d=>[o(d.x),s(d.y),d.width*r,d.height*r];e.save(),e.shadowColor="rgba(0, 0, 0, 0.18)",e.shadowBlur=12*i,e.shadowOffsetY=2*i,e.fillStyle=t.paper;const u=l({x:0,y:0,width:a.width,height:a.height});e.beginPath(),e.rect(...u);const c=l(a.art);e.rect(c[0]+c[2],c[1],-c[2],c[3]),e.fill("evenodd"),e.restore(),e.lineWidth=1*i,a.trim.x>.5&&(e.strokeStyle="rgba(0, 0, 0, 0.35)",e.setLineDash([2*i,3*i]),e.strokeRect(...l(a.trim))),a.printable&&(e.strokeStyle="rgba(210, 60, 50, 0.85)",e.setLineDash([6*i,4*i]),e.strokeRect(...l(a.printable))),e.setLineDash([]);const h=Math.max(1,.2/25.4*(a.dpi??300)*r);e.strokeStyle="#000",e.fillStyle="#000",e.lineWidth=h;let f=!1;for(const d of t.marks)if(d.kind==="line")e.beginPath(),e.moveTo(o(d.x0),s(d.y0)),e.lineTo(o(d.x1),s(d.y1)),e.stroke();else if(d.kind==="target"){const m=d.r*r,p=[o(d.cx),s(d.cy)];e.beginPath(),e.arc(p[0],p[1],m,0,Math.PI*2),e.moveTo(p[0]-m*1.5,p[1]),e.lineTo(p[0]+m*1.5,p[1]),e.moveTo(p[0],p[1]-m*1.5),e.lineTo(p[0],p[1]+m*1.5),e.stroke()}else f||(f=!0,e.font=`${Math.max(1,d.size*r)}px system-ui, sans-serif`,e.fillText(d.text,o(d.x),s(d.y)))}const Ri=32,ul=24,cl=4,dl=160;class hl{constructor(t){this.options=t,this.element=document.createElement("section"),this.element.className="preview",this.element.setAttribute("aria-label","Preview"),this.canvas=document.createElement("canvas"),this.canvas.className="preview-canvas",this.overlay=document.createElement("canvas"),this.overlay.className="preview-overlay",this.element.append(this.canvas,this.overlay),this.renderer=new ol(this.canvas,t.background),this.emptyState=document.createElement("div"),this.emptyState.className="preview-empty",this.emptyState.innerHTML='<p><strong>Drop an image here</strong><br />or use Upload in the panel.</p><p class="hint">JPG, PNG, or WebP</p>',this.element.append(this.emptyState);const n=document.createElement("div");n.className="preview-toolbar";const i=(r,o,s)=>{const l=document.createElement("button");return l.type="button",l.textContent=r,l.title=o,l.addEventListener("click",s),n.append(l),l},a=document.createElement("div");a.className="segmented preview-modes";for(const[r,o,s]of[["inks","Inks","Show the image printed in your inks (I)"],["original","Original","Show the original image (O)"]]){const l=document.createElement("button");l.type="button",l.textContent=o,l.title=s,l.dataset.value=r,l.addEventListener("click",()=>this.setDisplayMode(r)),a.append(l),this.modeButtons.push(l)}n.append(a),i("−","Zoom out (−)",()=>this.zoomBy(1/Math.SQRT2)),this.zoomLabel=i("100%","Actual pixels (1)",()=>this.zoomTo(1)),this.zoomLabel.classList.add("zoom-label"),i("+","Zoom in (+)",()=>this.zoomBy(Math.SQRT2)),i("Fit","Fit to screen (0)",()=>this.fit()),this.element.append(n),n.hidden=!0,this.setDisplayMode("inks"),this.bindInteractions(),this.bindDrop(),new ResizeObserver(()=>this.resize()).observe(this.element)}element;canvas;overlay;page=null;renderer;emptyState;zoomLabel;modeButtons=[];sources={inks:null,original:null};displayMode="inks";imageWidth=0;imageHeight=0;margin=0;frame=null;view={scale:1,originX:0,originY:0};fitted=!0;frameRequested=!1;restart=!0;interacting=!1;settleTimer=null;pointers=new Map;pickHandler=null;pressStart=null;gesture=null;setPaper(t){this.renderer.setPaper(t),this.requestRender()}onContextLost(t){this.canvas.addEventListener("webglcontextlost",t)}setPickHandler(t){this.pickHandler?.onLeave(),this.pickHandler=t,this.canvas.classList.toggle("picking",t!==null)}get hasImage(){return this.imageWidth>0}get gl(){return this.renderer.gl}get mode(){return this.displayMode}setDisplayMode(t){this.displayMode=t;for(const n of this.modeButtons){const i=n.dataset.value===t;n.classList.toggle("active",i),n.setAttribute("aria-pressed",String(i))}this.renderer.setSource(this.sources[t]),this.requestRender()}setSource(t,n){this.sources[t]=n,t===this.displayMode&&(this.renderer.setSource(n),this.requestRender())}setFrame(t,n){this.frame={geometry:t,color:n};const i=t.margin,a=i!==this.margin&&this.fitted;this.margin=i,a&&this.fit(),this.requestRender()}setPage(t){const n=this.bounds();this.page=t;const i=this.bounds();this.fitted&&(n.x0!==i.x0||n.y0!==i.y0||n.x1!==i.x1||n.y1!==i.y1)&&this.fit(),this.requestRender()}bounds(){return this.page?sl(this.page):{x0:-this.margin,y0:-this.margin,x1:this.imageWidth+this.margin,y1:this.imageHeight+this.margin}}setImageSize(t,n){this.imageWidth=t,this.imageHeight=n,this.emptyState.hidden=!0,this.element.querySelector(".preview-toolbar").hidden=!1,this.element.classList.add("has-image"),this.fit()}clientToImage(t,n){const i=this.canvas.getBoundingClientRect(),a=this.canvas.width/Math.max(1,i.width);return{x:((t-i.left)*a-this.view.originX)/this.view.scale,y:((n-i.top)*a-this.view.originY)/this.view.scale}}fit(){if(!this.hasImage)return;const t=ul*this.dpr(),n=Math.max(1,this.canvas.width-t*2),i=Math.max(1,this.canvas.height-t*2),a=this.bounds(),r=a.x1-a.x0,o=a.y1-a.y0,s=Math.min(n/r,i/o);this.view={scale:s,originX:(this.canvas.width-r*s)/2-a.x0*s,originY:(this.canvas.height-o*s)/2-a.y0*s},this.fitted=!0,this.changed()}zoomTo(t){this.zoomAround(t,this.canvas.width/2,this.canvas.height/2)}zoomBy(t){this.zoomTo(this.view.scale*t)}minScale(){if(!this.hasImage)return .01;const t=this.bounds(),n=Math.min(this.canvas.width/(t.x1-t.x0),this.canvas.height/(t.y1-t.y0));return Math.min(n/4,1)}zoomAround(t,n,i){if(!this.hasImage)return;const a=Math.min(Ri,Math.max(this.minScale(),t)),r=a/this.view.scale;this.view={scale:a,originX:n-(n-this.view.originX)*r,originY:i-(i-this.view.originY)*r},this.fitted=!1,this.changed()}dpr(){return window.devicePixelRatio||1}resize(){const t=this.element.getBoundingClientRect(),n=this.dpr(),i=Math.max(1,Math.round(t.width*n)),a=Math.max(1,Math.round(t.height*n));if(i===this.canvas.width&&a===this.canvas.height)return;const r=(this.canvas.width/2-this.view.originX)/this.view.scale,o=(this.canvas.height/2-this.view.originY)/this.view.scale;this.canvas.width=i,this.canvas.height=a,this.overlay.width=i,this.overlay.height=a,this.requestRender(),this.fitted?this.fit():(this.view.originX=i/2-r*this.view.scale,this.view.originY=a/2-o*this.view.scale,this.changed())}changed(){this.zoomLabel.textContent=`${Math.round(this.view.scale*100)}%`,this.options.onViewChange?.(this.view.scale),this.interacting=!0,this.settleTimer!==null&&clearTimeout(this.settleTimer),this.settleTimer=setTimeout(()=>{this.settleTimer=null,this.interacting=!1,this.requestRender(),this.options.onViewSettled?.()},dl),this.requestRender()}get currentView(){return{...this.view}}get canvasSize(){return{width:this.canvas.width,height:this.canvas.height}}requestRender(){this.restart=!0,!this.frameRequested&&(this.frameRequested=!0,requestAnimationFrame(()=>this.renderFrame()))}renderFrame(){this.frameRequested=!1;const t=this.restart;this.restart=!1,this.renderer.setFrame(this.displayMode==="inks"?this.frame:null);const n=this.renderer.render(this.view,this.imageWidth,this.imageHeight,this.interacting?"fast":"full",t);if(t){const i=this.overlay.getContext("2d");i.clearRect(0,0,this.overlay.width,this.overlay.height),this.page&&this.hasImage&&ll(i,this.page,this.view,this.dpr())}!n&&!this.frameRequested&&(this.frameRequested=!0,requestAnimationFrame(()=>this.renderFrame()))}devicePoint(t){const n=this.canvas.getBoundingClientRect(),i=this.canvas.width/Math.max(1,n.width);return{x:(t.clientX-n.left)*i,y:(t.clientY-n.top)*i}}bindInteractions(){const t=this.canvas;t.addEventListener("wheel",i=>{if(!this.hasImage)return;i.preventDefault();const a=i.deltaMode===1?16:i.deltaMode===2?400:1,r=i.ctrlKey?.01:.0015,o=Math.exp(-i.deltaY*a*r),s=this.devicePoint(i);this.zoomAround(this.view.scale*o,s.x,s.y)},{passive:!1}),t.addEventListener("pointerdown",i=>{this.hasImage&&(t.setPointerCapture(i.pointerId),this.pointers.set(i.pointerId,this.devicePoint(i)),this.pressStart=this.pointers.size===1?{x:i.clientX,y:i.clientY,moved:!1}:null,this.startGesture(),t.classList.add("panning"))}),t.addEventListener("pointermove",i=>{if(this.pickHandler&&this.pointers.size===0&&this.pickHandler.onHover(i.clientX,i.clientY),!this.pointers.has(i.pointerId)||!this.gesture||(this.pressStart&&Math.hypot(i.clientX-this.pressStart.x,i.clientY-this.pressStart.y)>cl&&(this.pressStart.moved=!0),this.pickHandler&&this.pressStart&&!this.pressStart.moved))return;this.pointers.set(i.pointerId,this.devicePoint(i));const{midX:a,midY:r,dist:o}=this.pointerSummary(),s=this.gesture,l=this.pointers.size>=2&&s.dist>0?Math.min(Ri,Math.max(this.minScale(),s.scale*o/s.dist)):s.scale,u=(s.midX-s.originX)/s.scale,c=(s.midY-s.originY)/s.scale;this.view={scale:l,originX:a-u*l,originY:r-c*l},this.fitted=!1,this.changed()});const n=i=>{if(!this.pointers.delete(i.pointerId))return;const a=this.pressStart;this.pressStart=null,i.type==="pointerup"&&this.pickHandler&&a&&!a.moved&&this.pointers.size===0&&this.pickHandler.onPick(i.clientX,i.clientY),this.pointers.size>0?this.startGesture():(this.gesture=null,t.classList.remove("panning"))};t.addEventListener("pointerup",n),t.addEventListener("pointercancel",n),t.addEventListener("pointerleave",()=>this.pickHandler?.onLeave()),t.addEventListener("dblclick",i=>{if(!this.hasImage||this.pickHandler)return;const a=this.devicePoint(i);Math.abs(this.view.scale-1)<.01?this.fit():this.zoomAround(1,a.x,a.y)})}startGesture(){const{midX:t,midY:n,dist:i}=this.pointerSummary();this.gesture={scale:this.view.scale,originX:this.view.originX,originY:this.view.originY,midX:t,midY:n,dist:i}}pointerSummary(){const t=[...this.pointers.values()],n=t[0]??{x:0,y:0},i=t[1];return i?{midX:(n.x+i.x)/2,midY:(n.y+i.y)/2,dist:Math.hypot(n.x-i.x,n.y-i.y)}:{midX:n.x,midY:n.y,dist:0}}bindDrop(){const t=this.element;let n=0;t.addEventListener("dragenter",i=>{i.dataTransfer?.types.includes("Files")&&(i.preventDefault(),n++,t.classList.add("drag-over"))}),t.addEventListener("dragover",i=>{i.dataTransfer?.types.includes("Files")&&(i.preventDefault(),i.dataTransfer.dropEffect="copy")}),t.addEventListener("dragleave",()=>{n=Math.max(0,n-1),n===0&&t.classList.remove("drag-over")}),t.addEventListener("drop",i=>{i.preventDefault(),n=0,t.classList.remove("drag-over"),i.dataTransfer?.files.length&&this.options.onFilesDropped(i.dataTransfer.files)})}}const ml=160,pl=30,fl=4;function gl(e){const t=Math.min(1,ml/Math.max(e.width,e.height)),n=Math.max(1,Math.round(e.width*t)),i=Math.max(1,Math.round(e.height*t)),r=new OffscreenCanvas(n,i).getContext("2d",{willReadFrequently:!0});r.imageSmoothingQuality="high",r.drawImage(e,0,0,n,i);const o=r.getImageData(0,0,n,i).data,s=new Float32Array(256);for(let u=0;u<256;u++)s[u]=ne(u/255);const l=[];for(let u=0;u<o.length;u+=4)o[u+3]<128||l.push(Qi({r:s[o[u]],g:s[o[u+1]],b:s[o[u+2]]}));return l}function Et(e,t){const n=e.l-t.l,i=e.a-t.a,a=e.b-t.b;return n*n+i*i+a*a}function vl(e,t,n,i){const a=ve(i),r=[...n],o=new Float64Array(e.length).fill(1/0),s=c=>{for(let h=0;h<e.length;h++)o[h]=Math.min(o[h],Et(e[h],c))};for(const c of r)s(c);for(;r.length<t;){let c=0;for(let m=0;m<e.length;m++)c+=r.length?o[m]:1;let h=a()*c,f=e.length-1;for(let m=0;m<e.length;m++)if(h-=r.length?o[m]:1,h<=0){f=m;break}const d={...e[f]};r.push(d),s(d)}const l=new Int32Array(e.length);let u=0;for(let c=0;c<pl;c++){u=0;for(let d=0;d<e.length;d++){let m=0,p=1/0;for(let g=0;g<t;g++){const v=Et(e[d],r[g]);v<p&&(p=v,m=g)}l[d]=m,u+=p}const h=Array.from({length:t},()=>({l:0,a:0,b:0,n:0}));for(let d=0;d<e.length;d++){const m=h[l[d]],p=e[d];m.l+=p.l,m.a+=p.a,m.b+=p.b,m.n++}let f=!1;for(let d=n.length;d<t;d++){const m=h[d];if(m.n===0)continue;const p={l:m.l/m.n,a:m.a/m.n,b:m.b/m.n};Et(p,r[d])>1e-4&&(f=!0),r[d]=p}if(!f)break}return{centers:r,assign:l,error:u}}const bl=.3;function kl(e,t,n,i,a){const r=[];for(let l=0;l<e.length;l++)t[l]===n&&r.push({p:e[l],d:Et(e[l],i)});if(r.length===0)return a;r.sort((l,u)=>u.d-l.d);const o=Math.max(1,Math.round(r.length*bl)),s={l:0,a:0,b:0};for(let l=0;l<o;l++){const u=r[l].p;s.l+=u.l,s.a+=u.a,s.b+=u.b}return{l:s.l/o,a:s.a/o,b:s.b/o}}function xl(e,t,n){const i=gl(e),a=n?ie(n):null,r=a?[Dt(a)]:[];if(i.length===0)return{inks:Array(t).fill("#000000"),paper:n??"#ffffff"};const o=t+1;let s=null;for(let d=0;d<fl;d++){const m=vl(i,Math.min(o,Math.max(i.length,r.length+1)),r,1+d*7919);(!s||m.error<s.error)&&(s=m)}if(!s)return{inks:Array(t).fill("#000000"),paper:n??"#ffffff"};const{centers:l,assign:u}=s,c=n?0:l.reduce((d,m,p)=>m.l>l[d].l?p:d,0),h=l[c]??{l:100,a:0,b:0},f=l.map((d,m)=>({c:d,i:m})).filter(({i:d})=>d!==c).map(({c:d,i:m})=>kl(i,u,m,h,d));for(;f.length<t;)f.push(f[f.length-1]??{l:0,a:0,b:0});return f.sort((d,m)=>m.l-d.l),{inks:f.map(d=>Ee(Fn(d))),paper:n??Ee(Fn(h))}}const yl=["#0078bf","#ff48b0","#ffe800","#000000","#00a95c","#ff6c2f","#765ba7"];class Sl{constructor(t,n){this.store=t,this.source=n,t.subscribe((i,a)=>{if(i.palette.source!=="auto"||!a.commit)return;a.section==="palette"&&(a.key==="source"||a.key==="inkCount"||a.key==="autoIncludeBackground"||a.key==="paper"&&!i.palette.autoIncludeBackground)&&this.runAuto()}),t.subscribe((i,a)=>{if(!(i.palette.source!=="scheme"||a.section!=="palette"))if(a.key==="source"&&a.commit){const r=i.palette.inkColor[0]??"#0078bf";r!==i.palette.schemeBase?this.store.set("palette","schemeBase",r):this.runScheme()}else a.key==="schemeIncludeBackground"?(i.palette.schemeIncludeBackground?this.paperBeforeScheme=i.palette.paper:this.paperBeforeScheme&&this.store.set("palette","paper",this.paperBeforeScheme),this.runScheme()):(a.key==="scheme"||a.key==="schemeBase")&&this.runScheme(a.commit)}),n.subscribe(()=>{t.get().palette.source==="auto"&&this.runAuto()})}paperBeforeScheme=null;get palette(){return this.store.get().palette}leaveGenerated(){this.palette.source!=="manual"&&this.store.set("palette","source","manual")}setInkColor(t,n,i=!0){const a=this.palette;if(a.source==="scheme"&&t===0&&a.scheme!=="cmyk"){this.store.set("palette","schemeBase",n,{commit:i});return}this.leaveGenerated(),this.store.setInkValue("palette","inkColor",t,n,{commit:i})}setPaper(t,n=!0){const i=this.palette;(i.source==="auto"&&i.autoIncludeBackground||i.source==="scheme"&&i.schemeIncludeBackground)&&this.leaveGenerated(),this.store.set("palette","paper",t,{commit:n})}addInk(){this.palette.source==="scheme"&&this.leaveGenerated();const t=this.palette.inkCount;if(t>=B)return;const n=new Set(this.palette.inkColor.slice(0,t)),i=yl.find(a=>!n.has(a))??"#000000";this.store.resetInkSlot(t),this.store.setInkValue("palette","inkColor",t,i),this.store.set("palette","inkCount",t+1)}removeInk(t){this.palette.source==="scheme"&&this.leaveGenerated();const n=this.palette.inkCount;if(n<=1)return;const i=[...Array(B).keys()].filter(a=>a!==t);i.push(t),this.store.permuteInks(i),this.store.set("palette","inkCount",n-1)}moveInk(t,n){const i=t+n;if(i<0||i>=this.palette.inkCount)return;const a=[...Array(B).keys()];a[t]=i,a[i]=t,this.store.permuteInks(a)}runScheme(t=!0){const n=this.palette,i=Sr(n.scheme,n.schemeBase,n.schemeIncludeBackground),a=Math.min(B,i.inks.length);for(let o=n.inkCount;o<a;o++)this.store.resetInkSlot(o);const r=this.palette.inkColor.slice();i.inks.slice(0,a).forEach((o,s)=>r[s]=o),this.store.setValue("palette","inkColor",r,{commit:t}),a!==n.inkCount&&this.store.set("palette","inkCount",a,{commit:t}),i.paper&&this.store.set("palette","paper",i.paper,{commit:t})}runAuto(){const t=this.source.get();if(!t)return;const{inkCount:n,autoIncludeBackground:i,paper:a}=this.palette,r=xl(t.bitmap,n,i?null:a),o=this.palette.inkColor.slice();r.inks.forEach((s,l)=>o[l]=s),this.store.setValue("palette","inkColor",o),i&&this.store.set("palette","paper",r.paper)}}const Ve=1;function it(e,t){return!e||!t?e===t:e.kind!==t.kind?!1:e.kind==="ink"?e.slot===t.slot:e.kind==="custom"?e.id===t.id:!0}class wl{constructor(t,n,i){this.preview=t,this.getBitmap=n,this.onPicked=i,this.loupe=document.createElement("div"),this.loupe.className="loupe",this.loupe.hidden=!0,t.element.append(this.loupe),window.addEventListener("keydown",a=>{a.key==="Escape"&&this.target&&this.stop()})}target=null;listeners=new Set;loupe;sampler=new OffscreenCanvas(Ve*2+1,Ve*2+1);samplerCtx=this.sampler.getContext("2d",{willReadFrequently:!0});get active(){return this.target}toggle(t){it(this.target,t)?this.stop():this.start(t)}start(t){this.getBitmap()&&(this.target=t,this.preview.setPickHandler({onHover:(n,i)=>this.hover(n,i),onPick:(n,i)=>this.pick(n,i),onLeave:()=>this.loupe.hidden=!0}),this.notify())}stop(){this.target&&(this.target=null,this.preview.setPickHandler(null),this.loupe.hidden=!0,this.notify())}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){for(const t of this.listeners)t(this.target)}sampleAt(t,n){const i=this.getBitmap();if(!i)return null;const a=this.preview.clientToImage(t,n),r=Math.floor(a.x),o=Math.floor(a.y);if(r<0||o<0||r>=i.width||o>=i.height)return null;const s=Ve*2+1,l=this.samplerCtx;l.clearRect(0,0,s,s),l.drawImage(i,r-Ve,o-Ve,s,s,0,0,s,s);const u=l.getImageData(0,0,s,s).data;let c=0,h=0,f=0,d=0;for(let p=0;p<u.length;p+=4)u[p+3]!==0&&(c+=ne(u[p]/255),h+=ne(u[p+1]/255),f+=ne(u[p+2]/255),d++);if(d===0)return null;const m=p=>ge(p/d)*255;return Ee({r:m(c),g:m(h),b:m(f)})}hover(t,n){const i=this.sampleAt(t,n);if(!i){this.loupe.hidden=!0;return}const a=this.preview.element.getBoundingClientRect();this.loupe.hidden=!1,this.loupe.style.left=`${t-a.left+16}px`,this.loupe.style.top=`${n-a.top+16}px`,this.loupe.style.setProperty("--loupe-color",i),this.loupe.textContent=i}pick(t,n){const i=this.sampleAt(t,n);if(!i||!this.target)return;const a=this.target;this.stop(),this.onPicked(a,i)}}const El=[{name:"White",hex:"#ffffff"},{name:"Natural",hex:"#f6f3ec"},{name:"Cream",hex:"#f3e9d2"},{name:"Newsprint",hex:"#e8e4d8"},{name:"Kraft",hex:"#c9a77c"},{name:"Gray",hex:"#b9b8b4"},{name:"Black",hex:"#1e1e1e"}];let $e=null;function Tl(){$e?.close()}function Ml(e){const t=$e!==null&&e.anchor.dataset.popoverId!==void 0&&$e.element.dataset.anchorId===e.anchor.dataset.popoverId;if(Tl(),t)return;const n=document.createElement("div");n.className="swatch-popover",n.setAttribute("role","dialog"),n.setAttribute("aria-label",e.title),e.anchor.dataset.popoverId||=String(Math.random()),n.dataset.anchorId=e.anchor.dataset.popoverId;const i=document.createElement("p");i.className="swatch-popover-title",i.textContent=e.title,n.append(i);const a=document.createElement("div");a.className="swatch-grid";for(const m of e.presets){const p=document.createElement("button");p.type="button",p.className="swatch-choice",p.style.setProperty("--swatch",m.hex),p.title=`${m.name} ${m.hex}`,p.setAttribute("aria-label",m.name),m.hex===e.current&&p.classList.add("current"),p.addEventListener("click",()=>{e.onPick(m.hex,!0),f()}),a.append(p)}e.presets.length>0&&n.append(a);const r=document.createElement("div");r.className=e.presets.length>0?"swatch-custom":"swatch-custom swatch-custom-only";const o=document.createElement("span");o.textContent=e.presets.length>0?"Custom":"Color";const s=document.createElement("input");s.type="color",s.value=e.current,s.setAttribute("aria-label",e.presets.length>0?"Custom color":e.title);const l=document.createElement("input");l.type="text",l.className="control-hex",l.maxLength=7,l.spellcheck=!1,l.value=e.current,l.setAttribute("aria-label","Hex code"),s.addEventListener("input",()=>{l.value=s.value,e.onPick(s.value,!1)}),s.addEventListener("change",()=>e.onPick(s.value,!0)),l.addEventListener("change",()=>{const m=Ua(l.value);m?(s.value=m,e.onPick(m,!0)):l.value=s.value}),r.append(o,s,l),n.append(r),document.body.append(n),Ci(n,e.anchor);const u=m=>{const p=m.target;!n.contains(p)&&!e.anchor.contains(p)&&f()},c=m=>{m.key==="Escape"&&(f(),e.anchor.focus())},h=()=>Ci(n,e.anchor);document.addEventListener("pointerdown",u,!0),document.addEventListener("keydown",c),window.addEventListener("resize",h),document.addEventListener("scroll",h,!0);function f(){n.remove(),document.removeEventListener("pointerdown",u,!0),document.removeEventListener("keydown",c),window.removeEventListener("resize",h),document.removeEventListener("scroll",h,!0),$e?.element===n&&($e=null)}$e={element:n,close:f},(a.querySelector("button.current")??a.querySelector("button")??l).focus()}function Ci(e,t){const n=t.getBoundingClientRect(),i=e.offsetWidth,a=e.offsetHeight;let r=Math.min(n.left,window.innerWidth-i-8),o=n.bottom+6;o+a>window.innerHeight-8&&(o=Math.max(8,n.top-a-6)),r=Math.max(8,r),e.style.left=`${r}px`,e.style.top=`${o}px`}function Ua(e){const t=e.trim().replace(/^#?/,"#").toLowerCase();return/^#[0-9a-f]{6}$/.test(t)?t:/^#[0-9a-f]{3}$/.test(t)?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:null}const Ii='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M20.7 5.6 18.4 3.3a1 1 0 0 0-1.4 0l-3.1 3.1-1.3-1.3-1.4 1.4 1.3 1.3-7.8 7.8-.7 3.5-.9.9 1.4 1.4.9-.9 3.5-.7 7.8-7.8 1.3 1.3 1.4-1.4-1.3-1.3 3.1-3.1a1 1 0 0 0 0-1.4ZM8 18.3l-1.9.4.4-1.9 7.7-7.7 1.5 1.5L8 18.3Z"/></svg>';function Ye(e,t,n=""){const i=document.createElement("button");return i.type="button",i.className=`icon-button ${n}`.trim(),i.title=e,i.setAttribute("aria-label",e),i.innerHTML=t,i}function Ai(e,t){const n=document.createElement("input");return n.type="text",n.className="control-hex",n.maxLength=7,n.spellcheck=!1,n.setAttribute("aria-label",e),n.addEventListener("change",()=>{const i=Ua(n.value);i?t(i):n.value=n.dataset.value??""}),n.addEventListener("blur",()=>n.value=n.dataset.value??n.value),n}function Rl(e,t,n,i){const a=document.createElement("div");a.className="palette-block";const r=se("palette","source"),o=te(r,e.get().palette.source,x=>e.setValue("palette","source",x)),s=se("palette","autoIncludeBackground"),l=te(s,e.get().palette.autoIncludeBackground,x=>e.setValue("palette","autoIncludeBackground",x)),u=document.createElement("p");u.className="control-help";const c=te(se("palette","scheme"),e.get().palette.scheme,x=>e.setValue("palette","scheme",x)),h=te(se("palette","schemeIncludeBackground"),e.get().palette.schemeIncludeBackground,x=>e.setValue("palette","schemeIncludeBackground",x)),f=document.createElement("p");f.className="control-help",a.append(o.element,c.element,h.element,l.element,u,f);const d=document.createElement("div");d.className="palette-heading",d.innerHTML='<span class="control-label">Inks</span><span class="control-help">Top prints first</span>';const m=document.createElement("ol");m.className="ink-list",a.append(d,m);const p=[];for(let x=0;x<B;x++){const E=document.createElement("li");E.className="ink-row";const A=document.createElement("span");A.className="ink-order",A.textContent=String(x+1);const L=document.createElement("input");L.type="color",L.className="swatch swatch-input",L.setAttribute("aria-label",`Ink ${x+1} color`),L.addEventListener("input",()=>n.setInkColor(x,L.value,!1)),L.addEventListener("change",()=>n.setInkColor(x,L.value,!0));const D=Ai(`Ink ${x+1} hex code`,z=>n.setInkColor(x,z)),U={kind:"ink",slot:x},P=Ye(`Pick ink ${x+1} from the image`,Ii,"eyedropper");P.addEventListener("click",()=>i.toggle(U));const R=document.createElement("span");R.className="ink-move";const C=Ye(`Print ink ${x+1} earlier`,"▲"),I=Ye(`Print ink ${x+1} later`,"▼");C.addEventListener("click",()=>n.moveInk(x,-1)),I.addEventListener("click",()=>n.moveInk(x,1)),R.append(C,I);const N=Ye(`Remove ink ${x+1}`,"×","remove");N.addEventListener("click",()=>n.removeInk(x)),E.append(A,L,D,P,R,N),m.append(E),p.push({element:E,order:A,swatch:L,hex:D,eyedropper:P,up:C,down:I,remove:N})}const g=document.createElement("button");g.type="button",g.className="add-ink",g.textContent="+ Add ink",g.addEventListener("click",()=>n.addInk()),a.append(g);const v=document.createElement("div");v.className="paper-row";const b=document.createElement("span");b.className="control-label";const k=document.createElement("button");k.type="button",k.className="swatch",k.addEventListener("click",()=>Ml({anchor:k,title:b.textContent??"Paper",presets:El,current:e.get().palette.paper,onPick:(x,E)=>n.setPaper(x,E)}));const w=Ai("Paper hex code",x=>n.setPaper(x)),M={kind:"paper"},S=Ye("Pick the paper color from the image",Ii,"eyedropper");S.addEventListener("click",()=>i.toggle(M)),v.append(b,k,w,S),a.append(v);const y=(x,E)=>{x.dataset.value=E,document.activeElement!==x&&(x.value=E)};function T(){const x=e.get(),E=x.palette,A=t.get()!==null,L=E.source==="auto",D=E.source==="scheme";o.update(E.source),c.update(E.scheme),h.update(E.schemeIncludeBackground),c.element.hidden=!D,h.element.hidden=!D,f.hidden=!D,f.textContent=E.scheme==="cmyk"?"Medium Blue, Fluorescent Pink, Yellow, and Black standing in for C, M, Y, K. Editing a color switches back to Manual.":"Ink 1 is the first color: change it and the others follow. Editing another ink, or adding or removing one, switches back to Manual.",l.update(E.autoIncludeBackground),l.element.hidden=!L,u.hidden=!L,u.textContent=A?"Colors are picked from the image. Editing a color switches back to Manual.":"Upload an image to pick colors from it.";const U=i.active;p.forEach((P,R)=>{const C=R<E.inkCount;if(P.element.hidden=!C,!C)return;const I=E.inkColor[R]??"#000000";P.swatch.value!==I&&(P.swatch.value=I),P.swatch.title=D&&R===0&&E.scheme!=="cmyk"?`${I}: the scheme's first color`:I,P.element.classList.toggle("scheme-first",D&&R===0&&E.scheme!=="cmyk"),y(P.hex,I),P.eyedropper.disabled=!A,P.eyedropper.classList.toggle("active",it(U,{kind:"ink",slot:R})),P.up.disabled=R===0,P.down.disabled=R===E.inkCount-1,P.remove.disabled=E.inkCount<=1}),g.disabled=E.inkCount>=B,b.textContent=x.upload.mode==="print"?"Paper":"Background",k.style.setProperty("--swatch",E.paper),k.setAttribute("aria-label",`${b.textContent} color: choose a preset or custom color`),y(w,E.paper),S.disabled=!A,S.classList.toggle("active",it(U,M))}return T(),e.subscribe(T),t.subscribe(T),i.subscribe(T),a}const Me=38,ye={W:[1.00116072718764,1.00116065159728,1.00116031922747,1.00115867270789,1.00115259844552,1.00113252528998,1.00108500663327,1.00099687889453,1.00086525152274,1.0006962900094,1.00050496114888,1.00030808187992,1.00011966602013,.999952765968407,.999821836899297,.999738609557593,.999709551639612,.999731930210627,.999799436346195,.999900330316671,1.00002040652611,1.00014478793658,1.00025997903412,1.00035579697089,1.00042753780269,1.00047623344888,1.00050720967508,1.00052519156373,1.00053509606896,1.00054022097482,1.00054272816784,1.00054389569087,1.00054448212151,1.00054476959992,1.00054489887762,1.00054496254689,1.00054498927058,1.000544996993],C:[.970585001322962,.970592498143425,.970625348729891,.970786806119017,.971368673228248,.973163230621252,.976740223158765,.981587605491377,.986280265652949,.989949147689134,.99249270153842,.994145680405256,.995183975033212,.995756750110818,.99591281828671,.995606157834528,.994597600961854,.99221571549237,.986236452783249,.967943337264541,.891285004244943,.536202477862053,.154108119001878,.0574575093228929,.0315349873107007,.0222633920086335,.0182022841492439,.016299055973264,.0153656239334613,.0149111568733976,.0146954339898235,.0145964146717719,.0145470156699655,.0145228771899495,.0145120341118965,.0145066940939832,.0145044507314479,.0145038009464639],M:[.990673557319988,.990671524961979,.990662582353421,.990618107644795,.99045148087871,.989871081400204,.98828660875964,.984290692797504,.973934905625306,.941817838460145,.817390326195156,.432472805065729,.13845397825887,.0537347216940033,.0292174996673231,.021313651750859,.0201349530181136,.0241323096280662,.0372236145223627,.0760506552706601,.205375471942399,.541268903460439,.815841685086486,.912817704123976,.946339830166962,.959927696331991,.966260595230312,.969325970058424,.970854536721399,.971605066528128,.971962769757392,.972127272274509,.972209417745812,.972249577678424,.972267621998742,.97227650946215,.972280243306874,.97228132482656],Y:[.0210523371789306,.0210564627517414,.0210746178695038,.0211649058448753,.0215027957272504,.0226738799041561,.0258235649693629,.0334879385639851,.0519069663740307,.100749014833473,.239129899706847,.534804312272748,.79780757864303,.911449894067384,.953797963004507,.971241615465429,.979303123807588,.983380119507575,.985461246567755,.986435046976605,.986738250670141,.986617882445032,.986277776758643,.985860592444056,.98547492767621,.985176934765558,.984971574014181,.984846303415712,.984775351811199,.984738066625265,.984719648311765,.984711023391939,.984706683300676,.984704554393091,.98470359630937,.984703124077552,.98470292561509,.984702868122795],R:[.0315605737777207,.0315520718330149,.0315148215513658,.0313318044982702,.0306729857725527,.0286480476989607,.0246450407045709,.0192960753663651,.0142066612220556,.0102942608878609,.0076191460521811,.005898041083542,.0048233247781713,.0042298748350633,.0040599171299341,.0043533695594676,.0053434425970201,.0076917201010463,.0135969795736536,.0316975442661115,.107861196355249,.463812603168704,.847055405272011,.943185409393918,.968862150696558,.978030667473603,.982043643854306,.983923623718707,.984845484154382,.985294275814596,.985507295219825,.985605071539837,.985653849933578,.985677685033883,.985688391806122,.985693664690031,.985695879848205,.985696521463762],G:[.0095560747554212,.0095581580120851,.0095673245444588,.0096129126297349,.0097837090401843,.010378622705871,.0120026452378567,.0160977721473922,.026706190223168,.0595555440185881,.186039826532826,.570579820116159,.861467768400292,.945879089767658,.970465486474305,.97841363028445,.979589031411224,.975533536908632,.962288755397813,.92312157451312,.793434018943111,.459270135902429,.185574103666303,.0881774959955372,.05436302287667,.0406288447060719,.034221520431697,.0311185790956966,.0295708898336134,.0288108739348928,.0284486271324597,.0282820301724731,.0281988376490237,.0281581655342037,.0281398910216386,.0281308901665811,.0281271086805816,.0281260133612096],B:[.979404752502014,.97940070684313,.979382903470261,.979294364945594,.97896301460857,.977814466694043,.974724321133836,.967198482343973,.949079657530575,.900850128940977,.76315044546224,.465922171649319,.201263280451005,.0877524413419623,.0457176793291679,.0284706050521843,.020527176756985,.0165302792310211,.0145135107212858,.0136003508637687,.0133604258769571,.013548894314568,.0139594356366992,.014443425575357,.0148854440621406,.0152254296999746,.0154592848180209,.0156018026485961,.0156824871281936,.0157248764360615,.0157458108784121,.0157556123350225,.0157605443964911,.0157629637515278,.0157640525629106,.015764589232951,.0157648147772649,.0157648801149616]},Yt=[[646919989576e-16,.0002194098998132,.0011205743509343,.0037666134117111,.011880553603799,.0232864424191771,.0345594181969747,.0372237901162006,.0324183761091486,.021233205609381,.0104909907685421,.0032958375797931,.0005070351633801,.0009486742057141,.0062737180998318,.0168646241897775,.028689649025981,.0426748124691731,.0562547481311377,.0694703972677158,.0830531516998291,.0861260963002257,.0904661376847769,.0850038650591277,.0709066691074488,.0506288916373645,.035473961885264,.0214682102597065,.0125164567619117,.0068045816390165,.0034645657946526,.0014976097506959,.000769700480928,.0004073680581315,.0001690104031614,952245150365e-16,490309872958e-16,199961492222e-16],[1844289444e-15,62053235865e-16,310096046799e-16,.0001047483849269,.0003536405299538,.0009514714056444,.0022822631748318,.004207329043473,.0066887983719014,.0098883960193565,.0152494514496311,.0214183109449723,.0334229301575068,.0513100134918512,.070402083939949,.0878387072603517,.0942490536184085,.0979566702718931,.0941521856862608,.0867810237486753,.0788565338632013,.0635267026203555,.05374141675682,.042646064357412,.0316173492792708,.020885205921391,.0138601101360152,.0081026402038399,.004630102258803,.0024913800051319,.0012593033677378,.000541646522168,.0002779528920067,.0001471080673854,610327472927e-16,343873229523e-16,177059860053e-16,7220974913e-15],[.000305017147638,.0010368066663574,.0053131363323992,.0179543925899536,.0570775815345485,.113651618936287,.17335872618355,.196206575558657,.186082370706296,.139950475383207,.0891745294268649,.0478962113517075,.0281456253957952,.0161376622950514,.0077591019215214,.0042961483736618,.0020055092122156,.0008614711098802,.0003690387177652,.0001914287288574,.0001495555858975,923109285104e-16,681349182337e-16,288263655696e-16,157671820553e-16,39406041027e-16,1584012587e-15,0,0,0,0,0,0,0,0,0,0,0]],le=[[3.2409699419045226,-1.537383177570094,-.4986107602930034],[-.9692436362808796,1.8759675015077202,.04155505740717559],[.05563007969699366,-.20397695888897652,1.0569715142428786]];function Ba(e,t,n){const i=Math.min(e,t,n);e-=i,t-=i,n-=i;const a=Math.min(t,n),r=Math.min(e,n),o=Math.min(e,t),s=Math.max(0,Math.min(e-n,e-t)),l=Math.max(0,Math.min(t-n,t-e)),u=Math.max(0,Math.min(n-t,n-e)),c=new Float64Array(Me);for(let h=0;h<Me;h++)c[h]=Math.max(Number.EPSILON,i*ye.W[h]+a*ye.C[h]+r*ye.M[h]+o*ye.Y[h]+s*ye.R[h]+l*ye.G[h]+u*ye.B[h]);return c}function Cl(e){let t=0,n=0,i=0;for(let a=0;a<Me;a++){const r=e[a];t+=Yt[0][a]*r,n+=Yt[1][a]*r,i+=Yt[2][a]*r}return[le[0][0]*t+le[0][1]*n+le[0][2]*i,le[1][0]*t+le[1][1]*n+le[1][2]*i,le[2][0]*t+le[2][1]*n+le[2][2]*i]}function Oa(e){const t=ie(e)??{r:0,g:0,b:0};return Ba(ne(t.r/255),ne(t.g/255),ne(t.b/255))}const Il=Ba(1,1,1);function Al(e){const t=Oa(e.hex),n=new Float64Array(Me);for(let i=0;i<Me;i++)n[i]=Math.min(1,t[i]/Il[i]);return{reflectance:t,transmittance2:n,opacity:Math.min(1,Math.max(0,e.opacity))}}function Ll(e,t){const n=t.opacity;for(let i=0;i<Me;i++)e[i]=(1-n)*e[i]*t.transmittance2[i]+n*t.reflectance[i]}function Pl(e,t){const n=Oa(e),i=t.map(Al),a=i.length,r=new Float32Array((1<<a)*3),o=new Float64Array(Me);for(let s=0;s<1<<a;s++){o.set(n);for(let h=0;h<a;h++)s&1<<h&&Ll(o,i[h]);const[l,u,c]=Cl(o);r[s*3]=l,r[s*3+1]=u,r[s*3+2]=c}return{inkCount:a,colors:r}}function Dl(e,t,n=[0,0,0]){const i=e.inkCount;n[0]=0,n[1]=0,n[2]=0;for(let a=0;a<1<<i;a++){let r=1;for(let o=0;o<i;o++){const s=t[o]??0;r*=a&1<<o?s:1-s}r!==0&&(n[0]+=r*e.colors[a*3],n[1]+=r*e.colors[a*3+1],n[2]+=r*e.colors[a*3+2])}return n}function Qe(e){const{paper:t,inkCount:n,inkColor:i,inkOpacity:a}=e.palette,r=[];for(let o=0;o<n;o++)r.push({hex:i[o]??"#000000",opacity:(a[o]??0)/100});return{paper:t,inks:r}}function _l(e){return`${e.paper}|${e.inks.map(t=>`${t.hex}:${t.opacity}`).join("|")}`}class wn{key="";table=null;rebuilds=0;get(t){const n=_l(t);return(!this.table||n!==this.key)&&(this.table=Pl(t.paper,t.inks),this.key=n,this.rebuilds++),this.table}}const Nl=`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uCoverage; // RGBA32F: ink coverage per channel
uniform sampler2D uFlags;    // RGBA8: r = use multiply, g = inside a swatch
uniform int uHeight;
out vec4 outColor;
${ct}
${Ft}
${ae}
void main() {
  ivec2 p = ivec2(int(gl_FragCoord.x), uHeight - 1 - int(gl_FragCoord.y));
  vec4 flags = texelFetch(uFlags, p, 0);
  if (flags.g < 0.5) { outColor = vec4(0.0); return; }
  vec4 cov = texelFetch(uCoverage, p, 0);
  vec3 c = flags.r > 0.5 ? multiplyInks(cov) : mixInks(cov);
  outColor = vec4(linearToSrgb(gamutCompress(c)), 1.0);
}
`,Fl=24,pt=132,ft=84,Pe=16,Li=26,Kt=96,Pi=30,$l=10,Ul=36;function Bl(e){const t=[];for(let n=0;n<1<<e;n++){const i=[...Array(e).keys()].filter(a=>n&1<<a);t.push(i)}return t.sort((n,i)=>n.length-i.length||n.join().localeCompare(i.join()))}function Ol(e){const t=[];for(let n=0;n<e;n++)t.push([n]);for(let n=0;n<e;n++)for(let i=n+1;i<e;i++)t.push([n,i]);return e>=3&&t.push([...Array(e).keys()]),t}class zl{constructor(t,n){this.store=t,this.debug=n,this.element=document.createElement("div"),this.element.className="ink-test",this.element.hidden=!0;const i=document.createElement("div");i.className="ink-test-header",i.innerHTML="<div><h2>Ink mixing test</h2><p>Temporary view for checking the ink model. Every combination of your inks, printed solid on the paper, and coverage ramps from 0 to 100%.</p></div>";const a=document.createElement("div");a.className="ink-test-controls";const r=document.createElement("div");r.className="segmented";for(const[u,c]of[["spectral","Spectral"],["multiply","Multiply"],["split","Split"]]){const h=document.createElement("button");h.type="button",h.textContent=c,h.dataset.value=u,h.addEventListener("click",()=>this.setMode(u)),r.append(h),this.modeButtons.push(h)}const o=document.createElement("button");o.type="button",o.textContent="Close",o.addEventListener("click",()=>this.close()),a.append(r,o),i.append(a);const s=document.createElement("p");s.className="ink-test-legend";const l=document.createElement("div");l.className="ink-test-stage",this.canvas=document.createElement("canvas"),this.labels=document.createElement("div"),this.labels.className="ink-test-labels",l.append(this.canvas,this.labels),this.element.append(i,s,l),this.gl=fa(this.canvas,{alpha:!0,antialias:!1,depth:!1,stencil:!1}),this.program=xn(this.gl,yn,Nl),this.loc=ga(this.gl,this.program,["uCoverage","uFlags","uHeight",...qo]),this.coverageTex=this.createTexture(),this.flagsTex=this.createTexture(),t.subscribe((u,c)=>{this.isOpen&&(c.section==="palette"||c.section==="*")&&this.update()}),new ResizeObserver(()=>this.isOpen&&this.update()).observe(this.element),this.setMode(this.mode)}element;canvas;labels;gl;program;loc;coverageTex;flagsTex;tables=new wn;mode="split";modeButtons=[];layoutKey="";regions=[];isOpen=!1;get open(){return this.isOpen}toggle(){this.isOpen?this.close():this.show()}show(){this.isOpen=!0,this.element.hidden=!1,this.layoutKey="",this.update()}close(){this.isOpen=!1,this.element.hidden=!0}setMode(t){this.mode=t;for(const i of this.modeButtons)i.classList.toggle("active",i.dataset.value===t);const n=this.element.querySelector(".ink-test-legend");n.textContent=t==="split"?"Split: each swatch shows the spectral ink model on the left and a simple multiply blend on the right. Ramps show spectral on top, multiply below.":t==="spectral"?"Spectral ink model: inks act as transparent films, mixed band by band across the visible spectrum.":"Simple multiply blend (sRGB), for comparison.",this.layoutKey="",this.isOpen&&this.update()}createTexture(){const t=this.gl,n=t.createTexture();return t.bindTexture(t.TEXTURE_2D,n),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),n}update(){const n=this.store.get().palette.inkCount,i=Math.max(320,this.element.clientWidth-Fl*2),a=`${n}|${i}|${this.mode}|${window.devicePixelRatio}`;a!==this.layoutKey&&(this.layoutKey=a,this.buildLayout(n,i)),this.updateLabels(),this.render()}buildLayout(t,n){const i=[];this.labels.innerHTML="";let a=0;const r=f=>{const d=document.createElement("p");d.className="ink-test-heading",d.style.top=`${a}px`,d.textContent=f,this.labels.append(d),a+=26};r("Solid inks and overlaps (numbers = print order)");const o=Math.max(1,Math.floor((n+Pe)/(pt+Pe)));Bl(t).forEach((f,d)=>{const m=d%o,p=Math.floor(d/o),g=m*(pt+Pe),v=a+p*(ft+Li+Pe);i.push({x:g,y:v,w:pt,h:ft,kind:"solid",inks:f});const b=document.createElement("p");b.className="ink-test-label",b.dataset.inks=f.join(","),b.style.left=`${g}px`,b.style.top=`${v+ft+4}px`,b.style.width=`${pt}px`,this.labels.append(b)}),a+=Math.ceil((1<<t)/o)*(ft+Li+Pe)+Ul-Pe,r("Coverage ramps, 0% → 100% (left to right)");const s=Math.min(640,n-Kt);for(const f of Ol(t)){i.push({x:Kt,y:a,w:s,h:Pi,kind:"ramp",inks:f});const d=document.createElement("p");d.className="ink-test-label ink-test-ramp-label",d.dataset.inks=f.join(","),d.style.left="0px",d.style.top=`${a+6}px`,d.style.width=`${Kt-8}px`,this.labels.append(d),a+=Pi+$l}this.regions=i;const l=a+8;this.labels.style.height=`${l}px`,this.canvas.style.width=`${n}px`,this.canvas.style.height=`${l}px`;const u=window.devicePixelRatio||1,c=Math.round(n*u),h=Math.round(l*u);this.canvas.width=c,this.canvas.height=h,this.uploadRegions(c,h,u)}uploadRegions(t,n,i){const a=new Float32Array(t*n*4),r=new Uint8Array(t*n*4);for(const s of this.regions){const l=Math.round(s.x*i),u=Math.round((s.x+s.w)*i),c=Math.round(s.y*i),h=Math.round((s.y+s.h)*i);for(let f=c;f<h;f++)for(let d=l;d<u;d++){const m=(f*t+d)*4,p=s.kind==="ramp"?(d-l+.5)/(u-l):1;for(const v of s.inks)a[m+v]=p;const g=this.mode==="multiply"||this.mode==="split"&&(s.kind==="solid"?d>=(l+u)/2:f>=(c+h)/2);r[m]=g?255:0,r[m+1]=255}}const o=this.gl;o.bindTexture(o.TEXTURE_2D,this.coverageTex),o.texImage2D(o.TEXTURE_2D,0,o.RGBA32F,t,n,0,o.RGBA,o.FLOAT,a),o.bindTexture(o.TEXTURE_2D,this.flagsTex),o.texImage2D(o.TEXTURE_2D,0,o.RGBA8,t,n,0,o.RGBA,o.UNSIGNED_BYTE,r)}updateLabels(){const{inkColor:t}=this.store.get().palette;for(const n of this.labels.querySelectorAll(".ink-test-label")){const i=n.dataset.inks?n.dataset.inks.split(",").map(Number):[];if(n.innerHTML="",i.length===0){n.textContent="Paper";continue}i.forEach((a,r)=>{r>0&&n.append(" + ");const o=document.createElement("span");o.className="ink-dot",o.style.setProperty("--swatch",t[a]??"#000"),n.append(o,String(a+1))})}}render(){const t=this.gl,n=Qe(this.store.get()),i=this.tables.rebuilds,a=this.tables.get(n);this.debug&&this.tables.rebuilds!==i&&console.debug(`[ink test] overlap table rebuilt (#${this.tables.rebuilds})`),t.viewport(0,0,this.canvas.width,this.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(this.program),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.coverageTex),t.uniform1i(this.loc.uCoverage,0),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,this.flagsTex),t.uniform1i(this.loc.uFlags,1),t.uniform1i(this.loc.uHeight,this.canvas.height),jo(t,this.loc,a,n),t.drawArrays(t.TRIANGLES,0,3)}}const Di={letter:[215.9,279.4],legal:[215.9,355.6],tabloid:[279.4,431.8],a4:[210,297],a3:[297,420],b4:[257,364]},Wl=25.4;function En(e,t,n){const i=e.export,a=wt(e.border,t,n,e.palette.inkCount).margin,r=t+2*a,o=n+2*a,s=(S,y,T,x,E,A,L)=>({kind:A,dpi:L,width:S,height:y,trim:{x:0,y:0,width:S,height:y},printable:null,art:T,cut:T,scale:x,imageX:T.x+a*x,imageY:T.y+a*x,...E}),l=(S,y,T)=>({x:(S-r*T)/2,y:(y-o*T)/2,width:r*T,height:o*T});if(e.upload.mode!=="print"){if(i.digitalSize==="custom"&&!i.lockAspect){const E=Math.max(1,Math.round(i.digitalWidth)),A=Math.max(1,Math.round(i.digitalHeight)),L=i.digitalFit==="fill"?Math.max(E/r,A/o):Math.min(E/r,A/o);return s(E,A,l(E,A,L),L,{},"digital",null)}const S={half:.5,original:1,double:2,triple:3},y=i.digitalSize==="custom"?Math.max(1,i.digitalWidth)/r:S[i.digitalSize]??1,T=Math.max(1,Math.round(r*y)),x=Math.max(1,Math.round(o*y));return s(T,x,{x:0,y:0,width:r*y,height:o*y},y,{},"digital",null)}const u=Ss(i),c=(S,y)=>(y==="in"?S:S/Wl)*u,h=i.units==="mm"?"mm":"in";if(i.pageSize==="image"){const S=Math.max(1,c(i.imageWidth,h))/r,y=Math.max(1,Math.round(r*S)),T=Math.max(1,Math.round(o*S));return s(y,T,{x:0,y:0,width:r*S,height:o*S},S,{},"print",u)}let f,d;if(i.pageSize==="custom")f=c(i.pageWidth,h),d=c(i.pageHeight,h);else{const[S,y]=Di[i.pageSize]??Di.letter;f=c(S,"mm"),d=c(y,"mm")}i.orientation==="landscape"!=f>d&&([f,d]=[d,f]);const m=c(Da(i),"mm"),p=Math.max(1,Math.round(f+2*m)),g=Math.max(1,Math.round(d+2*m)),v={x:m,y:m,width:f,height:d},b=Math.min(c(ws(i),"mm"),f/2-1,d/2-1),k={x:v.x+b,y:v.y+b,width:f-2*b,height:d-2*b};let w,M;return i.placement==="fill"?(w=Math.max(p/r,g/o),M=l(p,g,w)):i.placement==="custom"?(w=Math.max(1,c(i.imageWidth,h))/r,M={x:k.x+(k.width-r*w)*i.positionX/100,y:k.y+(k.height-o*w)*i.positionY/100,width:r*w,height:o*w}):(w=Math.max(.001,Math.min(k.width/r,k.height/o)),M={x:k.x+(k.width-r*w)/2,y:k.y+(k.height-o*w)/2,width:r*w,height:o*w}),s(p,g,M,w,{trim:v,printable:k,cut:i.placement==="fill"?v:M},"print",u)}function Jt(e,t,n){return En(e,t,n).scale}class Gl{constructor(t){this.gl=t}programs=new Map;uniformTypes=new Map;pixel=new Uint8Array(4);get maxTextureSize(){return this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE)}createTarget(t,n,i,a={}){const r=this.gl,o=r.createTexture();r.bindTexture(r.TEXTURE_2D,o);const s=i==="image"?r.SRGB8_ALPHA8:r.RGBA8;r.texImage2D(r.TEXTURE_2D,0,s,t,n,0,r.RGBA,r.UNSIGNED_BYTE,null),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,a.mipmaps?r.LINEAR_MIPMAP_LINEAR:r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE);const l=r.createFramebuffer();return r.bindFramebuffer(r.FRAMEBUFFER,l),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,o,0),r.bindFramebuffer(r.FRAMEBUFFER,null),{texture:o,framebuffer:l,width:t,height:n,format:i}}ensureTarget(t,n,i,a,r={}){return t&&t.width===n&&t.height===i&&t.format===a?t:(t&&this.deleteTarget(t),this.createTarget(n,i,a,r))}deleteTarget(t){this.gl.deleteTexture(t.texture),this.gl.deleteFramebuffer(t.framebuffer)}pass(t,n,i){this.draw(t,n.framebuffer,n.width,n.height,i)}draw(t,n,i,a,r,o){const s=this.gl,{program:l,uniforms:u}=this.program(t);s.useProgram(l),s.bindFramebuffer(s.FRAMEBUFFER,n),s.viewport(0,0,i,a),s.disable(s.BLEND),o&&(s.enable(s.SCISSOR_TEST),s.scissor(0,o.y,i,o.height));let c=0;const h=this.uniformTypes.get(l);for(const[f,d]of Object.entries(r)){u.has(f)||u.set(f,s.getUniformLocation(l,f));const m=u.get(f)??null;if(m===null)continue;const p=h.get(f);if(typeof d=="object"&&d!==null&&"texture"in d)s.activeTexture(s.TEXTURE0+c),s.bindTexture(d.target==="3d"?s.TEXTURE_3D:s.TEXTURE_2D,d.texture),s.uniform1i(m,c++);else if(typeof d=="number"||typeof d=="boolean"){const g=Number(d);p===s.INT||p===s.BOOL?s.uniform1i(m,g):s.uniform1f(m,g)}else{const g=d;switch(p){case s.FLOAT_VEC2:s.uniform2fv(m,g);break;case s.FLOAT_VEC3:s.uniform3fv(m,g);break;case s.FLOAT_VEC4:s.uniform4fv(m,g);break;case s.INT:case s.BOOL:s.uniform1iv(m,g);break;case s.INT_VEC4:case s.BOOL_VEC4:s.uniform4iv(m,g);break;case s.FLOAT_MAT2:s.uniformMatrix2fv(m,!1,g);break;default:s.uniform1fv(m,g)}}}s.drawArrays(s.TRIANGLES,0,3),o&&s.disable(s.SCISSOR_TEST),s.bindFramebuffer(s.FRAMEBUFFER,null)}finish(t){const n=this.gl;n.bindFramebuffer(n.FRAMEBUFFER,t),n.readPixels(0,0,1,1,n.RGBA,n.UNSIGNED_BYTE,this.pixel),n.bindFramebuffer(n.FRAMEBUFFER,null)}generateMipmaps(t){const n=this.gl;n.bindTexture(n.TEXTURE_2D,t.texture),n.generateMipmap(n.TEXTURE_2D)}read(t){const n=this.gl,i=new Uint8Array(t.width*t.height*4);return n.bindFramebuffer(n.FRAMEBUFFER,t.framebuffer),n.readPixels(0,0,t.width,t.height,n.RGBA,n.UNSIGNED_BYTE,i),n.bindFramebuffer(n.FRAMEBUFFER,null),i}program(t){let n=this.programs.get(t);if(!n){const i=xn(this.gl,yn,t);n={program:i,uniforms:new Map},this.programs.set(t,n);const a=this.gl,r=new Map,o=a.getProgramParameter(i,a.ACTIVE_UNIFORMS);for(let s=0;s<o;s++){const l=a.getActiveUniform(i,s);l&&r.set(l.name.replace(/\[0\]$/,""),l.type)}this.uniformTypes.set(i,r)}return n}}const sn=8,Xl=3,Hl=2*sa;function ql(e,t){return`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uCoverage;  // ink coverage after layer options (working resolution)
uniform sampler2D uImage;     // working image, for transparency
uniform vec2 uViewSize;
uniform vec2 uOrigin;
uniform float uScale;         // device px per image px
uniform vec2 uImageSize;      // image px
uniform float uOutScale;      // output px per image px
uniform int uSamples;         // per axis
uniform vec4 uVisible;        // solo/mute
uniform vec3 uBackground;     // linear, around the image
out vec4 outColor;
${ct}
${Ft}
${ae}
${Nt}
${xa}

float htCoverageRaw(int ink, vec2 p) {
  vec2 uv = clamp(p / uOutScale / uImageSize, vec2(0.0), vec2(1.0));
  return textureLod(uCoverage, uv, 0.0)[ink] * textureLod(uImage, uv, 0.0).a;
}
${Sn(t)}
// Coverage of an ink at output position p (with the image's transparency, and
// dot gain / compensation). Halftone code may call it.
float htCoverage(int ink, vec2 p) { return simTone(ink, htCoverageRaw(ink, p)); }

${e}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, uViewSize.y - gl_FragCoord.y);
  vec2 center = (p - uOrigin) / uScale;  // image px
  float footprint = 1.0 / uScale;        // one screen pixel, in image px
  vec2 jitter = vec2(hash(p), hash(p + 17.31));
  vec3 sum = vec3(0.0);
  float count = 0.0;
  // Low-ink patches vary slowly: one lookup per ink per screen pixel.
  float lost[4];
  for (int ink = 0; ink < 4; ink++) lost[ink] = simPatchLost(ink, simWarp(ink, center * uOutScale, false));
  for (int j = 0; j < ${sn}; j++) {
    if (j >= uSamples) break;
    for (int i = 0; i < ${sn}; i++) {
      if (i >= uSamples) break;
      // Stratified, jittered samples: no regular grid to alias against the dot grid.
      vec2 cell = vec2(float(i), float(j));
      vec2 f = (cell + fract(jitter + cell * vec2(0.618034, 0.754878))) / float(uSamples) - 0.5;
      vec2 ip = center + f * footprint;
      count += 1.0;
      // Outside the canvas (the image, plus a border that grows it): preview background.
      if (frameOutsideCanvas(ip)) {
        sum += uBackground;
        continue;
      }
      vec2 op = ip * uOutScale;  // output px
      int mask = 0;
      for (int ink = 0; ink < 4; ink++) {
        if (ink >= uInkCount) break;
        if (uVisible[ink] < 0.5) continue;
        // Each ink is read at its own (misregistered) position; its border moves with it.
        vec2 q = simWarp(ink, op, true);
        vec2 iq = q / uOutScale;
        bool on;
        if (frameCovers(iq)) on = frameMask() == (1 << ink);
        else if (any(lessThan(iq, vec2(0.0))) || any(greaterThanEqual(iq, uImageSize))) on = false;
        else on = htInk(ink, q, htCoverage(ink, htSamplePoint(ink, q))) > 0.5;
        if (simApply(ink, q, lost[ink], on)) mask |= (1 << ink);
      }
      sum += uTable[mask];
    }
  }
  outColor = vec4(linearToSrgb(gamutCompress(sum / count)), 1.0);
}
`}class Tn{constructor(t){this.gpu=t}kind="procedural";state=null;shaders=new Map;frame={};sim={};rowsDone=0;set(t){this.state=t}setSim(t){this.sim=t}setFrame(t){this.frame=t}static samplesFor(t,n){const i=Math.min(sn,Math.max(2,Math.ceil(t*1.5)));return n==="fast"?Math.min(i,Xl):i}draw(t,n,i,a,r){const o=this.state;if(!o)return!0;r&&(this.rowsDone=0);const s=this.sim.uSimOn===1,l=`${o.method.id}|${s}`;let u=this.shaders.get(l);u||this.shaders.set(l,u=ql(o.method.glsl,s));const c=Tn.samplesFor(o.outputScale/t.scale,a),h={...o.inkUniforms,...o.methodUniforms,uFrameCanvas:[0,0,o.imageWidth,o.imageHeight],uFrameMode:0,...this.frame,...this.sim,uCoverage:{texture:o.coverage.texture},uImage:{texture:o.image.texture},uViewSize:[n,i],uOrigin:[t.originX,t.originY],uScale:t.scale,uImageSize:[o.imageWidth,o.imageHeight],uOutScale:o.outputScale,uSamples:c,uVisible:o.visible,uBackground:o.background},f=`preview|${l}|${c}`,d=performance.now();for(;this.rowsDone<i;){if(this.rowsDone>0&&performance.now()-d>Hl)return!1;const m=bn(f,n,i-this.rowsDone),p={y:i-this.rowsDone-m,height:m};kn(this.gpu,null,f,n*m,()=>this.gpu.draw(u,null,n,i,h,p)),this.rowsDone+=m}return!0}}const jl=8192,Vl=4096,gt=256,Yl=2048,_i=3840*2400;function Kl(e){const t=[e.cellSize,e.dotSize].flatMap(n=>Array.isArray(n)?n:[]);return Math.max(4,...t)*1.5}const za=()=>({adjusted:null,smoothA:null,smoothB:null,coverage:null,layered:null,layerA:null,layerB:null,mixed:null});class Jl{constructor(t){this.host=t,this.gpu=new Gl(t.preview.gl),this.compositor=new Tn(this.gpu),t.settings.subscribe(()=>this.schedule()),t.source.subscribe(()=>this.schedule())}gpu;tables=new wn;keys=new Map;versions=new Map;log=[];sourceTexture=null;sourceTextureWidth=0;working=null;main=za();adjustOutput=null;lightness=null;analysisTarget=null;analysisVersion=-1;toneTexture=null;fadeLutTexture=null;fade={key:"off",uniforms:{uFade:0}};border=null;sim={uSimOn:0};simSetup=null;densityTargets=[];emptyDensity=null;inputs=null;layerTone=null;prepared=null;preparing=null;halftonePrepared=null;halftonePreparing=null;bitmap=null;bitmapBuilding=null;coverageRead=null;preparedCount=0;compositor;detailTargets=Mn();halftoneState=null;detail=null;halftoned=!1;frameRequested=!1;held=!1;imageSize={width:0,height:0};histogramListeners=new Set;busyListeners=new Set;errorListeners=new Set;busyMessages=new Map;lastHistogram=null;onHistogram(t){return this.histogramListeners.add(t),this.lastHistogram&&t(this.lastHistogram.data,this.lastHistogram.source),()=>this.histogramListeners.delete(t)}onBusy(t){return this.busyListeners.add(t),()=>this.busyListeners.delete(t)}onError(t){return this.errorListeners.add(t),()=>this.errorListeners.delete(t)}reportError(t,n){console.error(n);const i=n instanceof Error?n.message:String(n);for(const a of this.errorListeners)a(`${t} failed: ${i}. Change a setting to try again.`)}schedule(){this.frameRequested||(this.frameRequested=!0,requestAnimationFrame(()=>{this.frameRequested=!1,this.run()}))}version(t){return this.versions.get(t)??0}stage(t,n,i){if(this.keys.get(t)===n)return!0;const a=performance.now();return i()===!1?!1:(this.keys.set(t,n),this.versions.set(t,this.version(t)+1),this.log.push(`${t} ${(performance.now()-a).toFixed(1)}ms`),!0)}hold(t){this.held=t,this.setBusy("export",t?"Exporting (changes show when it's done)":null),t||this.schedule()}run(){if(this.held||this.gpu.gl.isContextLost())return;const t=this.host.source.get();if(!t)return;this.imageSize={width:t.width,height:t.height};const n=this.host.settings.get();this.log=[];const i=performance.now(),a=this.runUpload(t.bitmap,t.version)&&this.runAdjust(n,t.width,t.height)&&this.runHistogram(n)&&this.runSplit(n)&&this.runLayers()&&this.runPrintSim(n,t.width,t.height)&&this.runMix(n)&&this.runBorder(n,t.width,t.height)&&this.runHalftone(n,t.width,t.height);a&&this.renderDetail(),this.host.debug&&this.log.length&&console.debug(`[pipeline] reran: ${this.log.join(", ")} (total ${(performance.now()-i).toFixed(1)}ms)${a?"":" — waiting"}`)}runUpload(t,n){return this.stage("upload",String(n),()=>{const i=this.gpu.gl,a=Math.min(jl,this.gpu.maxTextureSize),r=Math.max(t.width,t.height);let o=t;if(r>a){const h=a/r,f=new OffscreenCanvas(Math.round(t.width*h),Math.round(t.height*h)),d=f.getContext("2d");d.imageSmoothingQuality="high",d.drawImage(t,0,0,f.width,f.height),o=f.transferToImageBitmap()}this.sourceTexture&&i.deleteTexture(this.sourceTexture);const s=i.createTexture();i.bindTexture(i.TEXTURE_2D,s),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.NONE),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.texImage2D(i.TEXTURE_2D,0,i.SRGB8_ALPHA8,o.width,o.height,0,i.RGBA,i.UNSIGNED_BYTE,o),i.generateMipmap(i.TEXTURE_2D),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR_MIPMAP_LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),this.sourceTexture=s,this.sourceTextureWidth=o.width,this.host.preview.setSource("original",{kind:"texture",texture:s,textureWidth:o.width});const l=Math.min(1,Math.min(Vl,this.gpu.maxTextureSize)/r),u=Math.max(1,Math.round(t.width*l)),c=Math.max(1,Math.round(t.height*l));this.working=this.gpu.ensureTarget(this.working,u,c,"image"),this.gpu.pass(ht,this.working,{uImage:{texture:s},uRatio:[o.width/u,o.height/c],uRegion:[0,0,1,1],uSize:[u,c]}),o!==t&&o.close(),this.clearDetail()})}runAdjust(t,n,i){const a=t.adjust;return this.setFade(t,n,i),this.stage("adjust",`${JSON.stringify(a)}|${this.fade.key}|${this.version("upload")}`,()=>{this.uploadTone(a.blackPoint,a.whitePoint,a.midtone,a.curve);const r=this.working,o=a.smoothing*Math.max(r.width,r.height)/1e3;this.adjustOutput=this.adjustPasses(a,r,this.main,o,[0,0,n,i])})}setFade(t,n,i){const a=t.border;if(!a.fade){this.fade={key:"off",uniforms:{uFade:0}};return}const r=Math.min(n,i)/100,o=wt(a,n,i,t.palette.inkCount).inner,s=Math.min(a.fadeRadius*r,Math.min(o[2]-o[0],o[3]-o[1])/2),l=JSON.stringify([a.fadeColor,a.fadeDistance,a.fadeOpacity,a.fadeCurve,a.fadeCustom,a.fadeMidpoint,o,s]);if(this.fade.key===l)return;const u=this.gpu.gl;this.fadeLutTexture??=u.createTexture(),u.bindTexture(u.TEXTURE_2D,this.fadeLutTexture),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,u.LINEAR),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MAG_FILTER,u.LINEAR),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_S,u.CLAMP_TO_EDGE),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_T,u.CLAMP_TO_EDGE),u.pixelStorei(u.UNPACK_ALIGNMENT,1);const c=Uint8Array.from(Uo(a),h=>Math.round(h*255));u.texImage2D(u.TEXTURE_2D,0,u.R8,Ze,1,0,u.RED,u.UNSIGNED_BYTE,c),this.fade={key:l,uniforms:{uFade:1,uFadeRect:o,uFadeRadius:s,uFadeDistance:Math.max(.5,a.fadeDistance*r),uFadeColor:a.fadeColor==="black"?0:1,uFadeOpacity:a.fadeOpacity/100,uFadeLut:{texture:this.fadeLutTexture}}}}adjustPasses(t,n,i,a,r){const{width:o,height:s}=n;if(i.adjusted=this.gpu.ensureTarget(i.adjusted,o,s,"image"),this.gpu.pass(Vo,i.adjusted,{...this.fade.uniforms,uImage:{texture:n.texture},uTone:{texture:this.toneTexture},uSaturation:t.saturation/100,uRegionPx:r,uSize:[o,s]}),t.smoothing<=0)return i.smoothA&&this.gpu.deleteTarget(i.smoothA),i.smoothB&&this.gpu.deleteTarget(i.smoothB),i.smoothA=null,i.smoothB=null,i.adjusted;i.smoothA=this.gpu.ensureTarget(i.smoothA,o,s,"image"),i.smoothB=this.gpu.ensureTarget(i.smoothB,o,s,"image");const l={uSigma:a,uRange:.12,uSize:[o,s]};return this.gpu.pass(Rt,i.smoothA,{...l,uImage:{texture:i.adjusted.texture},uDir:[1,0]}),this.gpu.pass(Rt,i.smoothB,{...l,uImage:{texture:i.smoothA.texture},uDir:[0,1]}),i.smoothB}uploadTone(t,n,i,a){const r=this.gpu.gl,o=t/100,s=Math.max(o+1/255,n/100),l=Math.pow(2,i/50),u=Te(a,1024),c=new Uint8Array(256*4);for(let h=0;h<256;h++){let f=Math.min(1,Math.max(0,(h/255-o)/(s-o)));f=Math.pow(f,1/l),c[h*4]=Math.round(u[Math.round(f*1023)]*255)}this.toneTexture||(this.toneTexture=r.createTexture(),r.bindTexture(r.TEXTURE_2D,this.toneTexture),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)),r.bindTexture(r.TEXTURE_2D,this.toneTexture),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,256,1,0,r.RGBA,r.UNSIGNED_BYTE,c)}runHistogram(t){if(t.split.method!=="toneMap")return!0;const n=t.splitToneMap.source;return this.stage("histogram",`${n}|${this.version("adjust")}`,()=>{this.lightness=this.gpu.ensureTarget(this.lightness,gt,gt,"coverage"),this.gpu.pass(Ko,this.lightness,{uImage:{texture:this.adjustOutput.texture},uSource:Math.max(0,va.indexOf(n)),uSize:[gt,gt]});const i=this.gpu.read(this.lightness),a=new Uint32Array(256);for(let r=0;r<i.length;r+=4)i[r+3]>0&&a[i[r]]++;this.lastHistogram={data:a,source:n};for(const r of this.histogramListeners)r(a,n)})}analysis(){const t=this.adjustOutput;return(this.analysisVersion!==this.version("adjust")||!this.analysisTarget)&&(this.analysisTarget=this.gpu.ensureTarget(this.analysisTarget,t.width,t.height,"coverage"),this.gpu.pass(Jo,this.analysisTarget,{uImage:{texture:t.texture},uSize:[t.width,t.height]}),this.analysisVersion=this.version("adjust")),this.analysisTarget}splitContext(t){const n=Qe(t),i=this.host.source.get(),a=t;return{gpu:this.gpu,inkCount:t.palette.inkCount,inks:n.inks,paper:n.paper,table:this.tables.get(n),settingsOf:r=>a[r]??{},imageLongEdge:i?Math.max(i.width,i.height):1,texelScale:i&&this.working?this.working.width/i.width:1}}runSplit(t){const n=Pa(t.split.method),i=t[n.section.id],a=this.splitContext(t),r=JSON.stringify(n.dependsOn(a,i)),o=JSON.stringify(i);let s,l=0;const u=!!n.prepare&&(n.needsPrepare?.(i,a)??!0);if(u){const h=`${n.id}|${o}|${r}`;if(this.prepared?.key!==h&&this.preparing!==h&&this.startSplitPrepare(h,n,i,a),!this.prepared||this.prepared.methodId!==n.id)return!1;s=this.prepared.value,l=this.prepared.id}this.inputs={adjust:t.adjust,method:n,values:i,ctx:a,prepared:s,layers:this.layerParams(t),inkUniforms:this.inkUniforms(t),visible:this.visible(t)};const c=[n.id,o,u?`prepared ${l}`:r,a.inkCount,this.version("adjust")].join("|");return this.stage("split",c,()=>{this.splitPass(this.inputs,this.adjustOutput,this.main)})}splitPass(t,n,i,a){i.coverage=this.gpu.ensureTarget(i.coverage,n.width,n.height,"coverage");const r=a===void 0?t.ctx:{...t.ctx,texelScale:a};return t.method.render(r,n,i.coverage,t.values,t.prepared),i.coverage}splitReach(){const t=this.inputs;if(!t)return 0;const n=t.method.reach?t.method.reach(t.values,t.ctx):0,i=Math.max(...t.layers.trapOut.map(Math.abs))/t.layers.outScale;return n+(i>0?i+1:0)}startSplitPrepare(t,n,i,a){this.preparing=t,this.setBusy("split","Matching inks…");const r=o=>this.preparing!==t?!1:(this.prepared={key:t,methodId:n.id,value:o,id:++this.preparedCount},this.schedule(),!0);n.prepare(i,a,"draft").then(o=>{if(r(o))return n.prepare(i,a,"final").then(s=>{r(s)&&(this.preparing=null,this.setBusy("split",null))})}).catch(o=>{o instanceof Oe||(this.preparing===t?(this.preparing=null,this.setBusy("split",null),this.reportError("Ink matching",o)):console.error(o))})}setBusy(t,n){n?this.busyMessages.set(t,n):this.busyMessages.delete(t);const i=[...this.busyMessages.values()].join(" · ")||null;for(const a of this.busyListeners)a(i)}layerParams(t){const n=t.palette.inkCount,i=t.layers,a=this.host.source.get(),r=new Uint8Array(256*4);for(let s=0;s<n;s++){const l=Te(i.curve[s]??[[0,0],[1,1]],1024),u=(i.levelsBlack[s]??0)/100,c=Math.max(u+1/255,(i.levelsWhite[s]??100)/100),h=Math.pow(2,(i.levelsMid[s]??0)/50),f=(i.density[s]??100)/100;for(let d=0;d<256;d++){let m=d/255;i.invert[s]&&(m=1-m),m=Math.min(1,Math.max(0,(m-u)/(c-u))),m=Math.pow(m,1/h),m=l[Math.round(m*1023)]*f,r[d*4+s]=Math.round(Math.min(1,m)*255)}}const o=s=>Array.from({length:B},(l,u)=>u<n?s(u):0);return{tone:r,toneKey:JSON.stringify([n,i.invert,i.levelsBlack,i.levelsWhite,i.levelsMid,i.curve,i.density]),active:o(()=>1),knockout:o(s=>i.knockout[s]?1:0),limit:i.inkLimit/100,trapOut:o(s=>i.trap[s]??0),outScale:a?Jt(t,a.width,a.height):1}}runLayers(){const t=this.inputs.layers,n=this.inputs.ctx.texelScale,i=[t.toneKey,t.active,t.knockout,t.limit,t.trapOut,t.outScale,n,this.version("split")].join("|");return this.stage("layerOptions",i,()=>{this.layersPass(t,this.main.coverage,this.main,n)})}toneTextureFor(t){const n=this.gpu.gl;if(!this.layerTone){const i=n.createTexture();n.bindTexture(n.TEXTURE_2D,i),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),this.layerTone={texture:i,key:""}}return this.layerTone.key!==t.toneKey&&(n.bindTexture(n.TEXTURE_2D,this.layerTone.texture),n.texImage2D(n.TEXTURE_2D,0,n.RGBA8,256,1,0,n.RGBA,n.UNSIGNED_BYTE,t.tone),this.layerTone.key=t.toneKey),this.layerTone.texture}layersPass(t,n,i,a){const{width:r,height:o}=n,s=t.limit<3.995?1:0,l={uLimit:t.limit,uSize:[r,o]},u={...l,uTone:{texture:this.toneTextureFor(t)},uActive:t.active,uKnockout:t.knockout};i.layered=this.gpu.ensureTarget(i.layered,r,o,"coverage");const c=t.trapOut.map(h=>h/t.outScale*a);return c.some(h=>Math.abs(h)>.01)?(i.layerA=this.gpu.ensureTarget(i.layerA,r,o,"coverage"),i.layerB=this.gpu.ensureTarget(i.layerB,r,o,"coverage"),this.gpu.pass(ui,i.layerA,{...u,uCoverage:{texture:n.texture},uApplyLimit:0}),this.gpu.pass(ci,i.layerB,{...l,uCoverage:{texture:i.layerA.texture},uDir:[1,0],uRadius:c,uApplyLimit:0}),this.gpu.pass(ci,i.layered,{...l,uCoverage:{texture:i.layerB.texture},uDir:[0,1],uRadius:c,uApplyLimit:s}),i.layered):(this.gpu.pass(ui,i.layered,{...u,uCoverage:{texture:n.texture},uApplyLimit:s}),i.layered)}visible(t){const n=t.palette.inkCount,{solo:i,mute:a}=t.layers,r=i.slice(0,n).some(Boolean);return Array.from({length:B},(o,s)=>s<n&&(r?i[s]:!a[s])?1:0)}inkUniforms(t){const n=Qe(t),i=this.tables.get(n),a=new Float32Array(16*3);a.set(i.colors.subarray(0,48));const r=s=>{const l=ie(s)??{r:0,g:0,b:0};return[l.r/255,l.g/255,l.b/255]},o=new Float32Array(B*3);return n.inks.forEach((s,l)=>o.set(r(s.hex),l*3)),{uTable:a,uInkCount:i.inkCount,uPaperSrgb:r(n.paper),uInkSrgb:o}}runMix(t){const n=this.visible(t),i=JSON.stringify(Qe(t)),a=this.host.source.get();return this.stage("mix",`${i}|${n}|${this.version("layerOptions")}|${this.version("printSim")}`,()=>{this.mixPass(this.inputs.inkUniforms,n,this.main.layered,this.working,this.main,[0,0,a.width,a.height])})}mixPass(t,n,i,a,r,o){return r.mixed=this.gpu.ensureTarget(r.mixed,i.width,i.height,"image",{mipmaps:!0}),this.gpu.pass(Yo(this.sim.uSimOn===1),r.mixed,{...t,...this.sim,uRegionPx:o,uCoverage:{texture:i.texture},uImage:{texture:a.texture},uVisible:n,uSize:[i.width,i.height]}),this.gpu.generateMipmaps(r.mixed),r.mixed}runPrintSim(t,n,i){const a=Jt(t,n,i),r=Wo(t),o=JSON.stringify([t.printSim,t.simMisreg,t.simLowInk,t.simSpecks,t.simGain,t.export.gainCompensation,t.upload.mode,a,n,i,r?this.version("layerOptions"):0]);return this.stage("printSim",o,()=>{const s=r?this.buildDensity(this.main.layered):this.noDensity();this.simSetup={settings:t,W:n,H:i,scale:a,density:s},this.sim=li(t,"preview",n,i,a,s),this.compositor.setSim(this.sim),this.host.preview.requestRender()})}buildDensity(t){let n=t,i=0;for(;Math.max(n.width,n.height)>128;){const a=Math.max(1,Math.ceil(n.width/2)),r=Math.max(1,Math.ceil(n.height/2)),o=this.gpu.ensureTarget(this.densityTargets[i]??null,a,r,"coverage");this.densityTargets[i]=o,this.gpu.pass(ht,o,{uImage:{texture:n.texture},uRatio:[n.width/a,n.height/r],uRegion:[0,0,1,1],uSize:[a,r]}),n=o,i++}return n.texture}noDensity(){if(!this.emptyDensity){const t=this.gpu.gl;this.emptyDensity=t.createTexture(),t.bindTexture(t.TEXTURE_2D,this.emptyDensity),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,1,1,0,t.RGBA,t.UNSIGNED_BYTE,new Uint8Array(4)),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST)}return this.emptyDensity}simReach(){const t=this.simSetup;return t?Go(t.settings,t.W,t.H,t.scale):0}runBorder(t,n,i){const a=t.palette.inkCount;return this.stage("border",`${JSON.stringify(t.border)}|${n}|${i}|${a}|${this.version("mix")}`,()=>{const r=wt(t.border,n,i,a);this.border=r;const o=this.visible(t),s=r.mode===1&&o[r.ink]?1<<r.ink:0,l=this.inputs.inkUniforms.uTable,u=[l[s*3],l[s*3+1],l[s*3+2]];this.compositor.setFrame(ya(r)),this.host.preview.setFrame(r,u)})}overrideTarget=null;runPreviewOverride(){const t=this.inputs,n=this.adjustOutput;return!t?.method.previewOverride||!n||(this.overrideTarget=this.gpu.ensureTarget(this.overrideTarget,n.width,n.height,"image",{mipmaps:!0}),!t.method.previewOverride(t.ctx,n,this.overrideTarget,t.values))?!1:(this.gpu.generateMipmaps(this.overrideTarget),this.halftoned=!1,this.keys.delete("halftone"),this.clearDetail(),this.host.preview.setSource("inks",{kind:"texture",texture:this.overrideTarget.texture,textureWidth:n.width}),!0)}runHalftone(t,n,i){if(this.runPreviewOverride())return!0;const a=Lo(t.halftone.type),r=Jt(t,n,i);if(!a)return this.stage("halftone",`none|${this.version("mix")}`,()=>{this.halftoned=!1,this.halftoneState=null,this.showMixed()});const o=t[a.section.id],s=Math.round(n*r),l={outputWidth:s,outputHeight:Math.max(1,Math.round(s*i/n)),gpu:this.gpu,inkCount:t.palette.inkCount,analysis:()=>this.analysis(),imageKey:String(this.version("adjust"))},u=()=>(this.halftoned=!1,this.keys.delete("halftone"),this.showMixed(),!0);let c,h=0;if(a.prepare&&a.prepareKey){const g=`${a.id}|${a.prepareKey(o,l)}`;if(this.halftonePrepared?.key!==g&&this.halftonePreparing!==g&&this.startHalftonePrepare(g,a,o,l),!this.halftonePrepared||this.halftonePrepared.methodId!==a.id)return u();c=this.halftonePrepared.value,h=this.halftonePrepared.id}const f=t.palette.inkCount,d={gpu:this.gpu,inkCount:f,minDot:t.halftone.minDot.slice(0,B),minDotMode:t.halftone.minDotMode,outputWidth:l.outputWidth,outputHeight:l.outputHeight,analysis:()=>this.analysis()};let m=0;if(a.fromCoverage){const g=a.fromCoverage.cell(o,d);let v=Math.ceil(l.outputWidth/g),b=Math.ceil(l.outputHeight/g);const k=Math.min(1,Yl/Math.max(v,b));v=Math.max(1,Math.round(v*k)),b=Math.max(1,Math.round(b*k));const w=[a.id,JSON.stringify(o),v,b,f,this.version("layerOptions")].join("|");if(this.bitmap?.key!==w&&this.bitmapBuilding!==w&&this.startBitmap(w,a,o,v,b,l.outputWidth/v,f),!this.bitmap||this.bitmap.methodId!==a.id)return u();m=this.bitmap.id}const p=[a.id,JSON.stringify(o),JSON.stringify(t.halftone),r,h,m,this.version("mix")].join("|");return this.stage("halftone",p,()=>{this.halftoned=!0,this.clearDetail();const g=a.uniforms(o,d,c,this.bitmap?.value);this.halftoneState={method:a,methodUniforms:g,reach:a.reach?a.reach(o,d):Kl(o),values:o,ctx:d,prepared:c},this.compositor.set({method:a,methodUniforms:g,inkUniforms:this.inputs.inkUniforms,coverage:this.main.layered,image:this.working,imageWidth:n,imageHeight:i,outputScale:r,visible:this.inputs.visible,background:this.host.background}),this.host.preview.setSource("inks",this.compositor)})}startBitmap(t,n,i,a,r,o,s){this.bitmapBuilding=t,this.setBusy("bitmap","Diffusing…");const l=this.readCoverage(this.main.layered,a,r);n.fromCoverage.build(i,l,a,r,s,"preview").then(u=>{this.bitmapBuilding===t&&(this.bitmap={key:t,methodId:n.id,value:{bits:u,width:a,height:r,cell:o},id:++this.preparedCount},this.bitmapBuilding=null,this.setBusy("bitmap",null),this.schedule())}).catch(u=>{u instanceof Oe||(this.bitmapBuilding===t?(this.bitmapBuilding=null,this.setBusy("bitmap",null),this.reportError("Dithering",u)):console.error(u))})}readCoverage(t,n,i){return this.coverageRead=this.gpu.ensureTarget(this.coverageRead,n,i,"coverage"),this.gpu.pass(ht,this.coverageRead,{uImage:{texture:t.texture},uRatio:[t.width/n,t.height/i],uRegion:[0,0,1,1],uSize:[n,i]}),this.gpu.read(this.coverageRead)}startHalftonePrepare(t,n,i,a){this.halftonePreparing=t;const o={spiral:"Building spiral…",turing:"Growing Turing pattern…"}[n.id]??"Building halftone map…";this.setBusy("halftone",o);const s=l=>{this.halftonePreparing===t&&this.setBusy("halftone",`${o} ${Math.round(l*100)}%`)};n.prepare(i,{...a,progress:s}).then(l=>{this.halftonePreparing===t&&(this.halftonePrepared={key:t,methodId:n.id,value:l,id:++this.preparedCount},this.halftonePreparing=null,this.setBusy("halftone",null),this.schedule())}).catch(l=>{l instanceof Oe||(this.halftonePreparing===t?(this.halftonePreparing=null,this.setBusy("halftone",null),this.reportError("Building the halftone",l)):console.error(l))})}showMixed(){const t=this.main.mixed;t&&this.host.preview.setSource("inks",{kind:"texture",texture:t.texture,textureWidth:t.width,detail:this.detail})}clearDetail(){this.detail&&(this.detail=null,this.releaseTargets(this.detailTargets),this.halftoned||this.showMixed())}renderDetail(){const t=this.inputs;if(this.held||!t||!this.working||!this.sourceTexture||this.halftoned)return;const n=this.host.preview.currentView,i=this.host.preview.canvasSize,a=this.imageSize.width,r=this.imageSize.height,o=this.working.width/a,s=this.sourceTextureWidth/a;if(n.scale<=o*1.05||s<=o*1.01){this.clearDetail();return}const l=performance.now(),u=t.adjust,c=u.smoothing*Math.max(a,r)/1e3,h=(u.smoothing>0?Math.ceil(c*2.5):0)+Math.ceil(this.splitReach()+this.simReach())+2,f=Math.max(0,Math.floor(-n.originX/n.scale-h)),d=Math.max(0,Math.floor(-n.originY/n.scale-h)),m=Math.min(a,Math.ceil((i.width-n.originX)/n.scale+h)),p=Math.min(r,Math.ceil((i.height-n.originY)/n.scale+h));if(m<=f||p<=d){this.clearDetail();return}const g=m-f,v=p-d;let b=Math.min(n.scale,s);g*v*b*b>_i&&(b=Math.sqrt(_i/(g*v)));const k=this.renderRegion({x:f,y:d,width:g,height:v},b,this.detailTargets,{mix:!0,visible:t.visible});this.detail={texture:k.mixed.texture,x:f,y:d,width:g,height:v},this.showMixed(),this.host.debug&&console.debug(`[pipeline] detail ${k.layered.width}×${k.layered.height} ${(performance.now()-l).toFixed(1)}ms`)}renderRegion(t,n,i,a){const r=this.inputs,o=this.imageSize.width,s=this.imageSize.height,l=Math.max(1,Math.round(t.width*n)),u=Math.max(1,Math.round(t.height*n));i.source=this.gpu.ensureTarget(i.source,l,u,"image"),this.gpu.pass(ht,i.source,{uImage:{texture:this.sourceTexture},uRatio:[this.sourceTextureWidth*(t.width/o)/l,this.sourceTextureWidth*(s/o)*(t.height/s)/u],uRegion:[t.x/o,t.y/s,t.width/o,t.height/s],uSize:[l,u]});const c=r.adjust,h=c.smoothing*Math.max(o,s)/1e3,f=this.adjustPasses(c,i.source,i,h*(l/t.width),[t.x,t.y,t.width,t.height]),d=this.splitPass(r,f,i,n),m=this.layersPass(r.layers,d,i,n),p=a.visible??[1,1,1,1],g=a.mix?this.mixPass(r.inkUniforms,p,m,i.source,i,[t.x,t.y,t.width,t.height]):null;return{source:i.source,layered:m,mixed:g}}releaseTargets(t){for(const n of Object.keys(t)){const i=t[n];i&&this.gpu.deleteTarget(i),t[n]=null}}get busy(){return[...this.busyMessages.keys()].some(n=>n!=="export")||this.preparing!==null||this.halftonePreparing!==null||this.bitmapBuilding!==null}exportState(){const t=this.imageSize;return!this.host.source.get()||!this.inputs||!this.sourceTexture?null:{gpu:this.gpu,imageWidth:t.width,imageHeight:t.height,sourceScale:this.sourceTextureWidth/t.width,inkCount:this.inputs.ctx.inkCount,inkUniforms:this.inputs.inkUniforms,smoothing:this.inputs.adjust.smoothing,splitReach:this.splitReach(),simReach:this.simReach(),sim:n=>{const i=this.simSetup;return li(i.settings,n,i.W,i.H,i.scale,i.density)},border:this.border??wt(this.host.settings.get().border,t.width,t.height,this.inputs.ctx.inkCount),halftone:this.halftoneState}}flush(){this.run()}}function Mn(){return{...za(),source:null}}const Zl=["levelsBlack","levelsWhite","levelsMid","curve","trap"],Ql={levelsBlack:"Levels: ink starts at",levelsWhite:"Levels: full ink at",levelsMid:"Levels: midtone",curve:"Curve",trap:"Choke (−) / spread (+)"};function vt(e,t){const n=document.createElement("button");return n.type="button",n.className="layer-toggle",n.textContent=e,n.title=t,n.setAttribute("aria-label",t),n.setAttribute("aria-pressed","false"),n}function eu(e){const t=document.createElement("div");t.className="layers-block";const n=document.createElement("p");n.className="control-help",n.textContent="In print order, which is set in Palette (top prints first). Solo and mute only change the preview.";const i=document.createElement("ol");i.className="layer-list",t.append(n,i);let a="",r=[];const o=new Set;function s(){const u=e.get().palette;i.innerHTML="",r=[];for(let c=0;c<u.inkCount;c++){const h=document.createElement("li");h.className="layer-row";const f=document.createElement("div");f.className="layer-head";const d=document.createElement("span");d.className="ink-order",d.textContent=String(c+1);const m=document.createElement("span");m.className="layer-name";const p=document.createElement("span");p.className="ink-dot",p.style.setProperty("--swatch",u.inkColor[c]??"#000"),m.append(p,(u.inkColor[c]??"").toUpperCase());const g=vt("Invert",`Invert layer ${c+1}`);g.addEventListener("click",()=>e.setInkValue("layers","invert",c,!e.get().layers.invert[c]));const v=vt("Solo",`Solo layer ${c+1}: show only soloed layers (preview only)`);v.addEventListener("click",()=>e.setInkValue("layers","solo",c,!e.get().layers.solo[c]));const b=vt("Mute",`Mute layer ${c+1}: hide it (preview only)`),k=vt("Knockout",`Knockout: layer ${c+1} clears the layers printed before it where it has ink`);k.addEventListener("click",()=>e.setInkValue("layers","knockout",c,!e.get().layers.knockout[c])),b.addEventListener("click",()=>e.setInkValue("layers","mute",c,!e.get().layers.mute[c])),f.append(d,m);const w=document.createElement("div");w.className="layer-toggles",w.append(g,k,v,b);const M=document.createElement("label");M.className="layer-density";const S=document.createElement("span");S.textContent="Density";const y=document.createElement("input");y.type="range",y.min="0",y.max="200",y.step="1",y.setAttribute("aria-label",`Layer ${c+1} density`);const T=document.createElement("input");T.type="number",T.className="control-number",T.min="0",T.max="200",T.setAttribute("aria-label",`Layer ${c+1} density value`),y.addEventListener("input",()=>{T.value=y.value,e.setInkValue("layers","density",c,Number(y.value),{commit:!1})}),y.addEventListener("change",()=>e.setInkValue("layers","density",c,Number(y.value))),T.addEventListener("change",()=>e.setInkValue("layers","density",c,Number(T.value)));const x=document.createElement("span");x.className="control-unit",x.textContent="%",M.append(S,y,T,x);const E=document.createElement("details");E.className="layer-more",E.open=o.has(c),E.addEventListener("toggle",()=>E.open?o.add(c):o.delete(c));const A=document.createElement("summary");A.textContent="Levels, curve, trapping",E.append(A);const L=[],D=e.get().layers;for(const P of Zl){const C={...se("layers",P),help:void 0},I=te(C,D[P]?.[c],(N,z)=>e.setInkValue("layers",P,c,N,{commit:z}),Ql[P]);E.append(I.element),L.push({key:P,control:I})}const U=document.createElement("p");U.className="control-help",U.textContent="In output pixels. Spread a lower layer (or choke a knockout layer) so small registration shifts don't leave paper gaps.",E.append(U),h.append(f,w,M,E),i.append(h),r.push({element:h,density:y,densityNumber:T,invert:g,knockout:k,solo:v,mute:b,more:L})}}function l(){const{palette:u,layers:c}=e.get(),h=`${u.inkCount}|${u.inkColor.slice(0,u.inkCount).join()}`;h!==a&&(a=h,s());const f=c.solo.slice(0,u.inkCount).some(Boolean);r.forEach((d,m)=>{const p=String(c.density[m]??100);document.activeElement!==d.density&&(d.density.value=p),document.activeElement!==d.densityNumber&&(d.densityNumber.value=p);const g=(k,w)=>{k.classList.toggle("active",w),k.setAttribute("aria-pressed",String(w))};g(d.invert,!!c.invert[m]),g(d.solo,!!c.solo[m]),g(d.mute,!!c.mute[m]),g(d.knockout,!!c.knockout[m]);const v=c;for(const{key:k,control:w}of d.more)w.update(v[k]?.[m]);const b=f?!c.solo[m]:!!c.mute[m];d.element.classList.toggle("layer-hidden",b)})}return l(),e.subscribe(l),t}function tu(e){let[t,n,i]=e;const a=Math.min(1,Math.max(0,.2126*t+.7152*n+.0722*i)),r=Math.min(t,n,i);if(r<0){const l=a/Math.max(a-r,1e-6);t=a+(t-a)*l,n=a+(n-a)*l,i=a+(i-a)*l}const o=Math.max(t,n,i);if(o>1){const l=(1-a)/Math.max(o-a,1e-6);t=a+(t-a)*l,n=a+(n-a)*l,i=a+(i-a)*l}const s=l=>Math.min(1,Math.max(0,l));return[s(t),s(n),s(i)]}const Tt=e=>e.map(([t,n])=>[t,n]);function nu(e,t,n,i,a){const r=Tt(e);let o;if(a==="first")o=0;else if(a==="last")o=r.length-1;else{if(r.length<=2)return r;o=1;for(let h=2;h<r.length-1;h++)Math.abs(r[h][0]-t[0])<Math.abs(r[o][0]-t[0])&&(o=h)}const[s,l]=r[o],u=o>0?r[o-1][0]+.01:0,c=o<r.length-1?r[o+1][0]-.01:1;return r[o]=[a?s:Math.min(c,Math.max(u,s+n)),Math.min(1,Math.max(0,l+i))],r}function iu(e){const t=document.createElement("div");t.className="tone-curves";const n=te(se("splitToneMap","linkCurves"),e.get().splitToneMap.linkCurves,d=>e.setValue("splitToneMap","linkCurves",d)),i=document.createElement("p");i.className="control-help",i.textContent="Each curve maps lightness (left = dark, right = light) to how much of that ink prints. Inks stack like a duotone or tritone.";const a=document.createElement("div");a.className="tone-curve-rows",t.append(i,n.element,a);let r="",o=[],s=[];const l=()=>e.get().splitToneMap.inkCurve.map(Tt);function u(d,m){s=d.map(Tt),e.setValue("splitToneMap","inkCurve",d,{commit:m})}function c(d,m,p){const g=l(),v=s[d]??g[d]??[];g[d]=m;const b=e.get().palette.inkCount;if(e.get().splitToneMap.linkCurves&&v.length===m.length){let k=-1,w=1e-6;if(m.forEach(([M,S],y)=>{const T=Math.abs(M-v[y][0])+Math.abs(S-v[y][1]);T>w&&(w=T,k=y)}),k>=0){const M=m[k][0]-v[k][0],S=m[k][1]-v[k][1],y=k===0?"first":k===m.length-1?"last":null;for(let T=0;T<b;T++)T!==d&&(g[T]=nu(g[T],v[k],M,S,y),o[T]?.update(g[T]))}}u(g,p)}function h(){const{palette:d}=e.get();a.innerHTML="",o=[],s=l();for(let m=0;m<d.inkCount;m++){const p=document.createElement("div");p.className="tone-curve-row";const g=document.createElement("div");g.className="tone-curve-head";const v=document.createElement("span");v.className="layer-name";const b=document.createElement("span");b.className="ink-dot",b.style.setProperty("--swatch",d.inkColor[m]??"#000"),v.append(b,`${m+1} · ${(d.inkColor[m]??"").toUpperCase()}`);const k=document.createElement("select");k.setAttribute("aria-label",`Preset for ink ${m+1}`),k.innerHTML='<option value="">Preset…</option>'+bi.map(M=>`<option value="${M.id}">${M.label}</option>`).join(""),k.addEventListener("change",()=>{const M=bi.find(y=>y.id===k.value);if(k.value="",!M)return;const S=l();S[m]=Tt(M.points),o[m]?.update(S[m]),u(S,!0)}),g.append(v,k);const w=$a(`Ink ${m+1} curve`,s[m]??[],(M,S)=>c(m,M,S));p.append(g,w.element),a.append(p),o.push(w)}}function f(){const{palette:d,splitToneMap:m}=e.get();n.update(m.linkCurves);const p=`${d.inkCount}|${d.inkColor.slice(0,B).join()}`;if(p!==r){r=p,h();return}const g=l();o.forEach((v,b)=>v.update(g[b]??[])),s=g}return f(),e.subscribe((d,m)=>{(m.section==="splitToneMap"||m.section==="palette"||m.section==="*")&&f()}),t}const au=96,ru=20,ou=8,bt=1,Ni=["cutoff1","cutoff2","cutoff3"],Zt=["band1Ink","band2Ink","band3Ink","band4Ink"],su=[["Shadows"],["Shadows","Highlights"],["Shadows","Midtones","Highlights"],["Shadows","Dark mids","Light mids","Highlights"]];function lu(e,t){const n=document.createElement("div");n.className="tonemap-block";const i=document.createElement("div");i.className="palette-heading",i.innerHTML='<span class="control-label">Bands</span><span class="control-help">Drag the lines to move band edges</span>';const a=document.createElement("canvas");a.className="tonemap-hist",a.setAttribute("role","img"),a.setAttribute("aria-label","Lightness histogram with band edges");const r=document.createElement("div");r.className="tonemap-axis",r.innerHTML="<span>Dark</span><span>Light</span>";const o=document.createElement("span");o.className="control-label",o.textContent="Printed color at each tone";const s=document.createElement("canvas");s.className="tonemap-strip",s.setAttribute("role","img"),s.setAttribute("aria-label","Printed color at each tone, dark to light");const l=document.createElement("div");l.className="tonemap-bands";const u=document.createElement("div");u.className="control",u.innerHTML='<span class="control-label">Mode</span>';const c=document.createElement("div");c.className="segmented";const h=[["simple","Simple (bands)"],["advanced","Advanced (curves)"]].map(([R,C])=>{const I=document.createElement("button");return I.type="button",I.textContent=C,I.dataset.value=R,I.addEventListener("click",()=>m(R)),c.append(I),I});u.append(c);const f=iu(e),d=[i,a,r,l];n.append(u,i,a,r,o,s,l,f);function m(R){const C=b();if(R!==C.mode){if(R==="advanced"){const I=k(),N=La(C,I),z=C.inkCurve.map((_,$)=>$<I.length?ds(N,$):_.map(([O,W])=>[O,W]));e.setValue("splitToneMap","inkCurve",z)}e.setValue("splitToneMap","mode",R)}}let p=null,g=null;const v=new wn;t.onHistogram(R=>{p=R,A()});const b=()=>e.get().splitToneMap,k=()=>{const R=e.get().palette;return R.inkColor.slice(0,R.inkCount)},w=()=>{const R=b();return Ni.slice(0,R.bandCount-1).map(C=>R[C])};function M(R){const C=e.get().palette;return R===null?C.paper:C.inkColor[R]??"#000"}function S(R,C){const I=Math.max(120,n.clientWidth||300),N=window.devicePixelRatio||1;(R.width!==Math.round(I*N)||R.height!==Math.round(C*N))&&(R.width=Math.round(I*N),R.height=Math.round(C*N),R.style.height=`${C}px`);const z=R.getContext("2d");return z.setTransform(N,0,0,N,0,0),{w:I,h:C,ctx:z}}function y(){const{w:R,h:C,ctx:I}=S(a,au),N=b(),z=Ct(N,k()),_=[0,...w().map($=>$/100).sort(($,O)=>$-O),1];I.clearRect(0,0,R,C);for(let $=0;$<N.bandCount;$++)I.fillStyle=M(z[$]??null),I.globalAlpha=.35,I.fillRect(_[$]*R,0,(_[$+1]-_[$])*R,C);if(I.globalAlpha=1,p){let $=1;for(const O of p)$=Math.max($,O);I.fillStyle="rgba(28, 28, 28, 0.75)";for(let O=0;O<256;O++){const W=Math.sqrt(p[O]/$)*(C-4);I.fillRect(O/256*R,C-W,R/256+.5,W)}}w().forEach(($,O)=>{const W=$/100*R;I.fillStyle=O===g?"#f78f28":"#1c1c1c",I.fillRect(W-1,0,2,C),I.beginPath(),I.arc(W,7,5,0,Math.PI*2),I.fill()})}function T(){const{w:R,h:C,ctx:I}=S(s,ru),N=e.get(),z=v.get(Qe(N)),_=Aa(b(),k()),$=new Float32Array(B),O=I.createImageData(Math.max(1,Math.round(R)),1);for(let F=0;F<O.width;F++){const H=Math.round(F/Math.max(1,O.width-1)*(Q-1));for(let re=0;re<B;re++)$[re]=_[H*B+re];const ee=tu(Dl(z,$));O.data[F*4]=Math.round(ge(ee[0])*255),O.data[F*4+1]=Math.round(ge(ee[1])*255),O.data[F*4+2]=Math.round(ge(ee[2])*255),O.data[F*4+3]=255}const W=new OffscreenCanvas(O.width,1);W.getContext("2d").putImageData(O,0,0),I.imageSmoothingEnabled=!1,I.clearRect(0,0,R,C),I.drawImage(W,0,0,R,C)}let x="";function E(){const R=b(),C=e.get().palette,I=Ct(R,k()),N=`${R.bandCount}|${C.inkCount}|${C.inkColor.join()}|${Zt.map(_=>R[_]).join()}|${I.join()}`;if(N===x)return;x=N,l.innerHTML="";const z=su[R.bandCount-1]??[];for(let _=0;_<R.bandCount;_++){const $=document.createElement("label");$.className="tonemap-band";const O=document.createElement("span");O.className="ink-dot",O.style.setProperty("--swatch",M(I[_]??null));const W=document.createElement("span");W.textContent=`${_+1}. ${z[_]??""}`;const F=document.createElement("select");F.setAttribute("aria-label",`Ink for band ${_+1}`);const H=I[_],ee=[["auto",`Auto (${H==null?"paper":`ink ${H+1}`})`],["paper","Paper (no ink)"],...Array.from({length:C.inkCount},(Ae,me)=>[String(me),`Ink ${me+1} · ${(C.inkColor[me]??"").toUpperCase()}`])];for(const[Ae,me]of ee){const Le=document.createElement("option");Le.value=Ae,Le.textContent=me,F.append(Le)}const re=R[Zt[_]];F.value=ee.some(([Ae])=>Ae===re)?re:"auto",F.addEventListener("change",()=>e.setValue("splitToneMap",Zt[_],F.value)),$.append(O,W,F),l.append($)}}function A(){const R=b().mode==="advanced";for(const C of h)C.classList.toggle("active",C.dataset.value===(R?"advanced":"simple"));for(const C of d)C.hidden=R;f.hidden=!R,n.offsetParent!==null&&(T(),!R&&(y(),E()))}const L=R=>{const C=a.getBoundingClientRect();return{pct:(R.clientX-C.left)/C.width*100,px:R.clientX-C.left,w:C.width}},D=(R,C)=>{let I=-1,N=ou;return w().forEach((z,_)=>{const $=Math.abs(z/100*C-R);$<=N&&(N=$,I=_)}),I},U=(R,C,I)=>{const N=w(),z=R>0?N[R-1]+bt:bt,_=R<N.length-1?N[R+1]-bt:100-bt,$=Math.round(Math.min(_,Math.max(z,C))*2)/2;e.setValue("splitToneMap",Ni[R],$,{commit:I})};a.addEventListener("pointerdown",R=>{const C=L(R),I=D(C.px,C.w);I<0||(g=I,a.setPointerCapture(R.pointerId),A())}),a.addEventListener("pointermove",R=>{const C=L(R);if(g===null){a.style.cursor=D(C.px,C.w)>=0?"ew-resize":"default";return}U(g,C.pct,!1)});const P=R=>{g!==null&&(U(g,L(R).pct,!0),g=null,A())};return a.addEventListener("pointerup",P),a.addEventListener("pointercancel",P),e.subscribe((R,C)=>{(C.section==="splitToneMap"||C.section==="palette"||C.section==="*"||C.section==="split")&&A()}),new ResizeObserver(()=>A()).observe(n),n}const uu=[{label:"Standard",title:"15°, 75°, 0°, 45° by print order (the classic CMYK set, which avoids moiré)",angles:aa},{label:"All 45°",title:"Every ink at 45°",angles:[45,45,45,45]},{label:"All 0°",title:"Every ink at 0°",angles:[0,0,0,0]}],cu=[{label:"Standard",title:"0°, 30°, 15°, 45° by print order (15° apart, the most two hex screens can differ)",angles:[0,30,15,45]},{label:"All 30°",title:"Every ink at 30°",angles:[30,30,30,30]},{label:"All 0°",title:"Every ink at 0°",angles:[0,0,0,0]}];function Wa(e,t,n){const i=document.createElement("div");i.className="control";const a=document.createElement("span");a.className="control-label",a.textContent="Angle presets";const r=document.createElement("div");r.className="button-row";for(const o of n){const s=document.createElement("button");s.type="button",s.textContent=o.label,s.title=o.title,s.addEventListener("click",()=>e.setValue(t,"angle",o.angles.slice(0,B))),r.append(s)}return i.append(a,r),i}const du=e=>Wa(e,"halftoneAm",uu),hu=e=>Wa(e,"halftoneHex",cu);var J=Uint8Array,Z=Uint16Array,Rn=Int32Array,Cn=new J([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),In=new J([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Fi=new J([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ga=function(e,t){for(var n=new Z(31),i=0;i<31;++i)n[i]=t+=1<<e[i-1];for(var a=new Rn(n[30]),i=1;i<30;++i)for(var r=n[i];r<n[i+1];++r)a[r]=r-n[i]<<5|i;return{b:n,r:a}},Xa=Ga(Cn,2),mu=Xa.b,ln=Xa.r;mu[28]=258,ln[258]=28;var pu=Ga(In,0),$i=pu.r,un=new Z(32768);for(var G=0;G<32768;++G){var fe=(G&43690)>>1|(G&21845)<<1;fe=(fe&52428)>>2|(fe&13107)<<2,fe=(fe&61680)>>4|(fe&3855)<<4,un[G]=((fe&65280)>>8|(fe&255)<<8)>>1}var et=function(e,t,n){for(var i=e.length,a=0,r=new Z(t);a<i;++a)e[a]&&++r[e[a]-1];var o=new Z(t);for(a=1;a<t;++a)o[a]=o[a-1]+r[a-1]<<1;var s;if(n){s=new Z(1<<t);var l=15-t;for(a=0;a<i;++a)if(e[a])for(var u=a<<4|e[a],c=t-e[a],h=o[e[a]-1]++<<c,f=h|(1<<c)-1;h<=f;++h)s[un[h]>>l]=u}else for(s=new Z(i),a=0;a<i;++a)e[a]&&(s[a]=un[o[e[a]-1]++]>>15-e[a]);return s},Re=new J(288);for(var G=0;G<144;++G)Re[G]=8;for(var G=144;G<256;++G)Re[G]=9;for(var G=256;G<280;++G)Re[G]=7;for(var G=280;G<288;++G)Re[G]=8;var It=new J(32);for(var G=0;G<32;++G)It[G]=5;var fu=et(Re,9,0),gu=et(It,5,0),Ha=function(e){return(e+7)/8|0},qa=function(e,t,n){return(n==null||n>e.length)&&(n=e.length),new J(e.subarray(t,n))},vu=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],$t=function(e,t,n){var i=new Error(t||vu[e]);if(i.code=e,Error.captureStackTrace&&Error.captureStackTrace(i,$t),!n)throw i;return i},ue=function(e,t,n){n<<=t&7;var i=t/8|0;e[i]|=n,e[i+1]|=n>>8},Ke=function(e,t,n){n<<=t&7;var i=t/8|0;e[i]|=n,e[i+1]|=n>>8,e[i+2]|=n>>16},Qt=function(e,t){for(var n=[],i=0;i<e.length;++i)e[i]&&n.push({s:i,f:e[i]});var a=n.length,r=n.slice();if(!a)return{t:Va,l:0};if(a==1){var o=new J(n[0].s+1);return o[n[0].s]=1,{t:o,l:1}}n.sort(function(M,S){return M.f-S.f}),n.push({s:-1,f:25001});var s=n[0],l=n[1],u=0,c=1,h=2;for(n[0]={s:-1,f:s.f+l.f,l:s,r:l};c!=a-1;)s=n[n[u].f<n[h].f?u++:h++],l=n[u!=c&&n[u].f<n[h].f?u++:h++],n[c++]={s:-1,f:s.f+l.f,l:s,r:l};for(var f=r[0].s,i=1;i<a;++i)r[i].s>f&&(f=r[i].s);var d=new Z(f+1),m=cn(n[c-1],d,0);if(m>t){var i=0,p=0,g=m-t,v=1<<g;for(r.sort(function(S,y){return d[y.s]-d[S.s]||S.f-y.f});i<a;++i){var b=r[i].s;if(d[b]>t)p+=v-(1<<m-d[b]),d[b]=t;else break}for(p>>=g;p>0;){var k=r[i].s;d[k]<t?p-=1<<t-d[k]++-1:++i}for(;i>=0&&p;--i){var w=r[i].s;d[w]==t&&(--d[w],++p)}m=t}return{t:new J(d),l:m}},cn=function(e,t,n){return e.s==-1?Math.max(cn(e.l,t,n+1),cn(e.r,t,n+1)):t[e.s]=n},Ui=function(e){for(var t=e.length;t&&!e[--t];);for(var n=new Z(++t),i=0,a=e[0],r=1,o=function(l){n[i++]=l},s=1;s<=t;++s)if(e[s]==a&&s!=t)++r;else{if(!a&&r>2){for(;r>138;r-=138)o(32754);r>2&&(o(r>10?r-11<<5|28690:r-3<<5|12305),r=0)}else if(r>3){for(o(a),--r;r>6;r-=6)o(8304);r>2&&(o(r-3<<5|8208),r=0)}for(;r--;)o(a);r=1,a=e[s]}return{c:n.subarray(0,i),n:t}},Je=function(e,t){for(var n=0,i=0;i<t.length;++i)n+=e[i]*t[i];return n},ja=function(e,t,n){var i=n.length,a=Ha(t+2);e[a]=i&255,e[a+1]=i>>8,e[a+2]=e[a]^255,e[a+3]=e[a+1]^255;for(var r=0;r<i;++r)e[a+r+4]=n[r];return(a+4+i)*8},Bi=function(e,t,n,i,a,r,o,s,l,u,c){ue(t,c++,n),++a[256];for(var h=Qt(a,15),f=h.t,d=h.l,m=Qt(r,15),p=m.t,g=m.l,v=Ui(f),b=v.c,k=v.n,w=Ui(p),M=w.c,S=w.n,y=new Z(19),T=0;T<b.length;++T)++y[b[T]&31];for(var T=0;T<M.length;++T)++y[M[T]&31];for(var x=Qt(y,7),E=x.t,A=x.l,L=19;L>4&&!E[Fi[L-1]];--L);var D=u+5<<3,U=Je(a,Re)+Je(r,It)+o,P=Je(a,f)+Je(r,p)+o+14+3*L+Je(y,E)+2*y[16]+3*y[17]+7*y[18];if(l>=0&&D<=U&&D<=P)return ja(t,c,e.subarray(l,l+u));var R,C,I,N;if(ue(t,c,1+(P<U)),c+=2,P<U){R=et(f,d,0),C=f,I=et(p,g,0),N=p;var z=et(E,A,0);ue(t,c,k-257),ue(t,c+5,S-1),ue(t,c+10,L-4),c+=14;for(var T=0;T<L;++T)ue(t,c+3*T,E[Fi[T]]);c+=3*L;for(var _=[b,M],$=0;$<2;++$)for(var O=_[$],T=0;T<O.length;++T){var W=O[T]&31;ue(t,c,z[W]),c+=E[W],W>15&&(ue(t,c,O[T]>>5&127),c+=O[T]>>12)}}else R=fu,C=Re,I=gu,N=It;for(var T=0;T<s;++T){var F=i[T];if(F>255){var W=F>>18&31;Ke(t,c,R[W+257]),c+=C[W+257],W>7&&(ue(t,c,F>>23&31),c+=Cn[W]);var H=F&31;Ke(t,c,I[H]),c+=N[H],H>3&&(Ke(t,c,F>>5&8191),c+=In[H])}else Ke(t,c,R[F]),c+=C[F]}return Ke(t,c,R[256]),c+C[256]},bu=new Rn([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Va=new J(0),ku=function(e,t,n,i,a,r){var o=r.z||e.length,s=new J(i+o+5*(1+Math.ceil(o/7e3))+a),l=s.subarray(i,s.length-a),u=r.l,c=(r.r||0)&7;if(t){c&&(l[0]=r.r>>3);for(var h=bu[t-1],f=h>>13,d=h&8191,m=(1<<n)-1,p=r.p||new Z(32768),g=r.h||new Z(m+1),v=Math.ceil(n/3),b=2*v,k=function(Ot){return(e[Ot]^e[Ot+1]<<v^e[Ot+2]<<b)&m},w=new Rn(25e3),M=new Z(288),S=new Z(32),y=0,T=0,x=r.i||0,E=0,A=r.w||0,L=0;x+2<o;++x){var D=k(x),U=x&32767,P=g[D];if(p[U]=P,g[D]=U,A<=x){var R=o-x;if((y>7e3||E>24576)&&(R>423||!u)){c=Bi(e,l,0,w,M,S,T,E,L,x-L,c),E=y=T=0,L=x;for(var C=0;C<286;++C)M[C]=0;for(var C=0;C<30;++C)S[C]=0}var I=2,N=0,z=d,_=U-P&32767;if(R>2&&D==k(x-_))for(var $=Math.min(f,R)-1,O=Math.min(32767,x),W=Math.min(258,R);_<=O&&--z&&U!=P;){if(e[x+I]==e[x+I-_]){for(var F=0;F<W&&e[x+F]==e[x+F-_];++F);if(F>I){if(I=F,N=_,F>$)break;for(var H=Math.min(_,F-2),ee=0,C=0;C<H;++C){var re=x-_+C&32767,Ae=p[re],me=re-Ae&32767;me>ee&&(ee=me,P=re)}}}U=P,P=p[U],_+=U-P&32767}if(N){w[E++]=268435456|ln[I]<<18|$i[N];var Le=ln[I]&31,Pn=$i[N]&31;T+=Cn[Le]+In[Pn],++M[257+Le],++S[Pn],A=x+I,++y}else w[E++]=e[x],++M[e[x]]}}for(x=Math.max(x,A);x<o;++x)w[E++]=e[x],++M[e[x]];c=Bi(e,l,u,w,M,S,T,E,L,x-L,c),u||(r.r=c&7|l[c/8|0]<<3,c-=7,r.h=g,r.p=p,r.i=x,r.w=A)}else{for(var x=r.w||0;x<o+u;x+=65535){var Bt=x+65535;Bt>=o&&(l[c/8|0]=u,Bt=o),c=ja(l,c+1,e.subarray(x,Bt))}r.i=o}return qa(s,0,i+Ha(c)+a)},xu=function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var n=t,i=9;--i;)n=(n&1&&-306674912)^n>>>1;e[t]=n}return e}(),yu=function(){var e=-1;return{p:function(t){for(var n=e,i=0;i<t.length;++i)n=xu[n&255^t[i]]^n>>>8;e=n},d:function(){return~e}}},Su=function(e,t,n,i,a){if(!a&&(a={l:1},t.dictionary)){var r=t.dictionary.subarray(-32768),o=new J(r.length+e.length);o.set(r),o.set(e,r.length),e=o,a.w=r.length}return ku(e,t.level==null?6:t.level,t.mem==null?a.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,i,a)},Ya=function(e,t){var n={};for(var i in e)n[i]=e[i];for(var i in t)n[i]=t[i];return n},j=function(e,t,n){for(;n;++t)e[t]=n,n>>>=8};function wu(e,t){return Su(e,t||{},0,0)}var Ka=function(e,t,n,i){for(var a in e){var r=e[a],o=t+a,s=i;Array.isArray(r)&&(s=Ya(i,r[1]),r=r[0]),ArrayBuffer.isView(r)?n[o]=[r,s]:(n[o+="/"]=[new J(0),s],Ka(r,o,n,i))}},Oi=typeof TextEncoder<"u"&&new TextEncoder,Eu=typeof TextDecoder<"u"&&new TextDecoder,Tu=0;try{Eu.decode(Va,{stream:!0}),Tu=1}catch{}function zi(e,t){var n;if(Oi)return Oi.encode(e);for(var i=e.length,a=new J(e.length+(e.length>>1)),r=0,o=function(u){a[r++]=u},n=0;n<i;++n){if(r+5>a.length){var s=new J(r+8+(i-n<<1));s.set(a),a=s}var l=e.charCodeAt(n);l<128||t?o(l):l<2048?(o(192|l>>6),o(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|e.charCodeAt(++n)&1023,o(240|l>>18),o(128|l>>12&63),o(128|l>>6&63),o(128|l&63)):(o(224|l>>12),o(128|l>>6&63),o(128|l&63))}return qa(a,0,r)}var dn=function(e){var t=0;if(e)for(var n in e){var i=e[n].length;i>65535&&$t(9),t+=i+4}return t},Wi=function(e,t,n,i,a,r,o,s){var l=i.length,u=n.extra,c=s&&s.length,h=dn(u);j(e,t,o!=null?33639248:67324752),t+=4,o!=null&&(e[t++]=20,e[t++]=n.os),e[t]=20,t+=2,e[t++]=n.flag<<1|(r<0&&8),e[t++]=a&&8,e[t++]=n.compression&255,e[t++]=n.compression>>8;var f=new Date(n.mtime==null?Date.now():n.mtime),d=f.getFullYear()-1980;if((d<0||d>119)&&$t(10),j(e,t,d<<25|f.getMonth()+1<<21|f.getDate()<<16|f.getHours()<<11|f.getMinutes()<<5|f.getSeconds()>>1),t+=4,r!=-1&&(j(e,t,n.crc),j(e,t+4,r<0?-r-2:r),j(e,t+8,n.size)),j(e,t+12,l),j(e,t+14,h),t+=16,o!=null&&(j(e,t,c),j(e,t+6,n.attrs),j(e,t+10,o),t+=14),e.set(i,t),t+=l,h)for(var m in u){var p=u[m],g=p.length;j(e,t,+m),j(e,t+2,g),e.set(p,t+4),t+=4+g}return c&&(e.set(s,t),t+=c),t},Mu=function(e,t,n,i,a){j(e,t,101010256),j(e,t+8,n),j(e,t+10,n),j(e,t+12,i),j(e,t+16,a)};function Ru(e,t){t||(t={});var n={},i=[];Ka(e,"",n,t);var a=0,r=0;for(var o in n){var s=n[o],l=s[0],u=s[1],c=u.level==0?0:8,h=zi(o),f=h.length,d=u.comment,m=d&&zi(d),p=m&&m.length,g=dn(u.extra);f>65535&&$t(11);var v=c?wu(l,u):l,b=v.length,k=yu();k.p(l),i.push(Ya(u,{size:l.length,crc:k.d(),c:v,f:h,m,u:f!=o.length||m&&d.length!=p,o:a,compression:c})),a+=30+f+g+b,r+=76+2*(f+g)+(p||0)+b}for(var w=new J(r+22),M=a,S=r-a,y=0;y<i.length;++y){var h=i[y];Wi(w,h.o,h,h.f,h.u,h.c.length);var T=30+h.f.length+dn(h.extra);w.set(h.c,h.o+T),Wi(w,a,h,h.f,h.u,h.c.length,h.o,h.m),a+=16+T+(h.m?h.m.length:0)}return Mu(w,a,i.length,S,M),w}class An{chunks=[];writer;reading;done=!1;constructor(){const t=new CompressionStream("deflate");this.writer=t.writable.getWriter();const n=t.readable.getReader();this.reading=(async()=>{for(;;){const{done:i,value:a}=await n.read();if(i)return;this.chunks.push(a)}})()}async write(t){await this.writer.ready,this.writer.write(t)}async finish(){if(this.done)throw new Error("Stream already finished");this.done=!0,await this.writer.close(),await this.reading;const t=Cu(this.chunks);return this.chunks=[],t}}function Cu(e){let t=0;for(const a of e)t+=a.length;const n=new Uint8Array(t);let i=0;for(const a of e)n.set(a,i),i+=a.length;return n}let en=null;function Ja(){if(en)return en;const e=new TextEncoder,t=v=>Math.round(v*65536)|0,n=(v,b,k)=>{const w=new DataView(new ArrayBuffer(20));return w.setUint32(0,1482250784),w.setInt32(8,t(v)),w.setInt32(12,t(b)),w.setInt32(16,t(k)),new Uint8Array(w.buffer)},i=()=>{const b=new DataView(new ArrayBuffer(2060));b.setUint32(0,1668641398),b.setUint32(8,1024);for(let k=0;k<1024;k++){const w=k/1023,M=w<=.04045?w/12.92:Math.pow((w+.055)/1.055,2.4);b.setUint16(12+k*2,Math.round(M*65535))}return new Uint8Array(b.buffer)},a=v=>{const b=e.encode(v),k=new DataView(new ArrayBuffer(12+b.length+1+4+4+2+1+67));return k.setUint32(0,1684370275),k.setUint32(8,b.length+1),new Uint8Array(k.buffer).set(b,12),new Uint8Array(k.buffer)},r=v=>{const b=e.encode(v),k=new Uint8Array(8+b.length+1);return new DataView(k.buffer).setUint32(0,1952807028),k.set(b,8),k},o=i(),s=[["desc",a("sRGB (Photo Inker)")],["cprt",r("No copyright, use freely")],["wtpt",n(.9642,1,.8249)],["rXYZ",n(.4360747,.2225045,.0139322)],["gXYZ",n(.3850649,.7168786,.0971045)],["bXYZ",n(.1430804,.0606169,.7141733)],["rTRC",o],["gTRC",o],["bTRC",o]],l=v=>v+3&-4;let c=128+(4+s.length*12);const h=[],f=new Map;for(const[v,b]of s){const k=f.get(b);if(k!==void 0){h.push({sig:v,offset:k,size:b.length,data:b});continue}c=l(c),f.set(b,c),h.push({sig:v,offset:c,size:b.length,data:b}),c+=b.length}const d=l(c),m=new Uint8Array(d),p=new DataView(m.buffer),g=(v,b)=>m.set(e.encode(b),v);return p.setUint32(0,d),p.setUint32(8,34603008),g(12,"mntr"),g(16,"RGB "),g(20,"XYZ "),p.setUint16(24,2026),p.setUint16(26,1),p.setUint16(28,1),g(36,"acsp"),p.setInt32(68,t(.9642)),p.setInt32(72,t(1)),p.setInt32(76,t(.8249)),p.setUint32(128,h.length),h.forEach((v,b)=>{g(132+b*12,v.sig),p.setUint32(136+b*12,v.offset),p.setUint32(140+b*12,v.size),m.set(v.data,v.offset)}),en=m,m}async function Iu(e,t){const n=new Uint8Array(await e.arrayBuffer());if(n[0]!==255||n[1]!==216)return e;const i=new TextEncoder().encode("ICC_PROFILE\0"),a=l=>i.every((u,c)=>n[l+4+c]===u),r=[n.subarray(0,2)];let o=2,s=1;for(;o+4<=n.length&&n[o]===255&&n[o+1]!==218;){const l=n[o+2]<<8|n[o+3],u=n.subarray(o,o+2+l);n[o+1]===226&&a(o)||(r.push(u),n[o+1]===224&&r.length===2&&(s=2)),o+=2+l}if(r.push(n.subarray(o)),t){const l=Ja(),u=2+i.length+2+l.length,c=new Uint8Array(2+u);c.set([255,226,u>>8,u&255]),c.set(i,4),c.set([1,1],4+i.length),c.set(l,6+i.length),r.splice(s,0,c)}return new Blob(r,{type:"image/jpeg"})}const oe=(e,t)=>t/25.4*(e.dpi??300);function Za(e){const t=e.palette.inkCount;return Array.from({length:t},(n,i)=>`${e.upload.projectName||"Photo Inker"} · layer ${i+1} of ${t} · ${(e.palette.inkColor[i]??"#000000").toUpperCase()}`)}function Ln(e,t,n){const i=t.export;if(e.kind!=="print"||i.pageSize==="image")return[];const a=[],r=e.cut,o=(c,h)=>c>=0&&h>=0&&c<=e.width&&h<=e.height,s=oe(e,Da(i)),l=Math.max(oe(e,1.5),i.placement==="fill"?s+oe(e,1):0),u=oe(e,5);if(i.cropMarks){const c=[[r.x,r.y,-1,-1],[r.x+r.width,r.y,1,-1],[r.x,r.y+r.height,-1,1],[r.x+r.width,r.y+r.height,1,1]];for(const[h,f,d,m]of c){const p=h+d*l,g=h+d*(l+u);o(Math.min(p,g),f)&&o(Math.max(p,g),f)&&a.push({kind:"line",x0:p,y0:f,x1:g,y1:f});const v=f+m*l,b=f+m*(l+u);o(h,Math.min(v,b))&&o(h,Math.max(v,b))&&a.push({kind:"line",x0:h,y0:v,x1:h,y1:b})}}if(i.regMarks&&i.printTarget==="riso"){const c=oe(e,2.5),h=c*1.5,f=r.x+r.width/2,d=r.y+r.height/2,m=l+h;for(const[p,g]of[[f,r.y-m],[f,r.y+r.height+m],[r.x-m,d],[r.x+r.width+m,d]])o(p-h,g-h)&&o(p+h,g+h)&&a.push({kind:"target",cx:p,cy:g,r:c})}if(n&&i.layerLabels&&i.printTarget==="riso"){const c=oe(e,2.5),h=r.y+r.height+l+(i.regMarks?oe(e,2.5)*3+oe(e,1):0)+c,f=r.y-l-(i.regMarks?oe(e,2.5)*3+oe(e,1):0),d=h+c*.3<=e.height?h:f-c>=0?f:null;d!==null&&n.forEach((m,p)=>a.push({kind:"label",x:Math.max(r.x,l),y:d,size:c,text:m,layer:p}))}return a}function Qa(e,t){const n=Math.max(1,Math.round(oe(e,.2))),i=[];for(const a of t){if(a.kind==="line"){const h=Math.round(Math.min(a.x0,a.x1)-(a.x0===a.x1?n/2:0)),f=Math.round(Math.min(a.y0,a.y1)-(a.y0===a.y1?n/2:0)),d=Math.max(n,Math.round(Math.abs(a.x1-a.x0))),m=Math.max(n,Math.round(Math.abs(a.y1-a.y0)));i.push({x:h,y:f,width:d,height:m,alpha:new Uint8Array(d*m).fill(255),layer:null});continue}if(a.kind==="target"){const h=a.r*1.5,f=Math.ceil(h*2)+n*2,m=new OffscreenCanvas(f,f).getContext("2d"),p=f/2;m.strokeStyle="#000",m.lineWidth=n,m.beginPath(),m.arc(p,p,a.r,0,Math.PI*2),m.moveTo(p-h,p),m.lineTo(p+h,p),m.moveTo(p,p-h),m.lineTo(p,p+h),m.stroke(),i.push({x:Math.round(a.cx-p),y:Math.round(a.cy-p),width:f,height:f,alpha:Gi(m,f,f),layer:null});continue}const r=`${Math.round(a.size)}px system-ui, sans-serif`,o=new OffscreenCanvas(1,1).getContext("2d");o.font=r;const s=Math.max(1,Math.ceil(o.measureText(a.text).width)+2),l=Math.ceil(a.size*1.4),c=new OffscreenCanvas(s,l).getContext("2d");c.font=r,c.fillStyle="#000",c.textBaseline="alphabetic",c.fillText(a.text,1,Math.round(a.size*1.05)),i.push({x:Math.round(a.x),y:Math.round(a.y-a.size*1.05),width:s,height:l,alpha:Gi(c,s,l),layer:a.layer})}return i}function Gi(e,t,n){const i=e.getImageData(0,0,t,n).data,a=new Uint8Array(t*n);for(let r=0;r<a.length;r++)a[r]=i[r*4+3];return a}function At(e,t,n,i,a,r,o,s=1){for(const l of a){const u=l.x/s,c=l.y/s,h=l.width/s,f=l.height/s,d=Math.max(n,Math.floor(c)),m=Math.min(n+i,Math.ceil(c+f)),p=Math.max(0,Math.floor(u)),g=Math.min(t,Math.ceil(u+h));for(let v=d;v<m;v++){const b=Math.floor((v-c)*s);if(!(b<0||b>=l.height))for(let k=p;k<g;k++){const w=Math.floor((k-u)*s);if(w<0||w>=l.width)continue;const M=l.alpha[b*l.width+w];if(M===0)continue;const S=((v-n)*t+k)*4;if(r==="layers"){if(M<128)continue;if(l.layer===null)for(let y=0;y<o;y++)e[S+y]=0;else e[S+l.layer]=0}else{const y=1-M/255;e[S]=Math.round(e[S]*y),e[S+1]=Math.round(e[S+1]*y),e[S+2]=Math.round(e[S+2]*y),e[S+3]=Math.max(e[S+3],M)}}}}}function er(e,t){const n=new TextEncoder,i=[],a=[];let r=0;const o=m=>{const p=typeof m=="string"?n.encode(m):m;i.push(p),r+=p.length},s=(m,p,g)=>{a[m]=r,o(`${m} 0 obj
${p}
`),g&&(o(`stream
`),o(g),o(`
endstream
`)),o(`endobj
`)};o(`%PDF-1.4
%âãÏÓ
`);const l=t?3:0,u=t?4:3,c=e.map((m,p)=>u+p*3);s(1,"<< /Type /Catalog /Pages 2 0 R >>"),s(2,`<< /Type /Pages /Kids [${c.map(m=>`${m} 0 R`).join(" ")}] /Count ${e.length} >>`),t&&s(3,`<< /N 3 /Length ${t.length} >>`,t),e.forEach((m,p)=>{const g=c[p],v=g+1,b=g+2,k=m.width/m.dpi*72,w=m.height/m.dpi*72,M=`${k.toFixed(3)} ${w.toFixed(3)}`;s(g,`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${M}] /Resources << /XObject << /Im0 ${b} 0 R >> >> /Contents ${v} 0 R >>`);const S=n.encode(`q ${k.toFixed(3)} 0 0 ${w.toFixed(3)} 0 0 cm /Im0 Do Q`);s(v,`<< /Length ${S.length} >>`,S);const y=m.color==="gray"?"/DeviceGray":l?`[/ICCBased ${l} 0 R]`:"/DeviceRGB";s(b,`<< /Type /XObject /Subtype /Image /Width ${m.width} /Height ${m.height} /ColorSpace ${y} /BitsPerComponent 8 /Filter /FlateDecode /Length ${m.data.length} >>`,m.data)});const h=u+e.length*3,f=r;let d=`xref
0 ${h}
0000000000 65535 f 
`;for(let m=1;m<h;m++)d+=`${String(a[m]??0).padStart(10,"0")} 00000 n 
`;return o(d),o(`trailer
<< /Size ${h} /Root 1 0 R >>
startxref
${f}
%%EOF
`),new Blob(i,{type:"application/pdf"})}const Au=(()=>{const e=new Uint32Array(256);for(let t=0;t<256;t++){let n=t;for(let i=0;i<8;i++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n>>>0}return e})();function Lu(e){let t=4294967295;for(const n of e)for(let i=0;i<n.length;i++)t=Au[(t^n[i])&255]^t>>>8;return(t^4294967295)>>>0}function De(e,t){const n=new Uint8Array(12+t.length),i=new DataView(n.buffer);i.setUint32(0,t.length);const a=new TextEncoder().encode(e);return n.set(a,4),n.set(t,8),i.setUint32(8+t.length,Lu([a,t])),n}const Pu={gray:1,rgb:3,rgba:4},Du={gray:0,rgb:2,rgba:6};class Lt{constructor(t,n,i,a={}){this.width=t,this.height=n,this.color=i,this.options=a,this.channels=Pu[i]}deflate=new An;channels;rowsWritten=0;done=!1;async writeRows(t,n){const i=this.width*this.channels,a=this.channels,r=new Uint8Array(n*(i+1));for(let o=0;o<n;o++){const s=t.subarray(o*i,(o+1)*i),l=o*(i+1);if(this.color==="gray")r[l]=0,r.set(s,l+1);else{r[l]=1;for(let u=0;u<i;u++)r[l+1+u]=s[u]-(u>=a?s[u-a]:0)&255}}this.rowsWritten+=n,await this.deflate.write(r)}async finish(){if(this.done)throw new Error("PNG already finished");if(this.rowsWritten!==this.height)throw new Error(`PNG got ${this.rowsWritten} of ${this.height} rows`);this.done=!0;const t=await this.deflate.finish(),n=new Uint8Array(13),i=new DataView(n.buffer);i.setUint32(0,this.width),i.setUint32(4,this.height),n[8]=8,n[9]=Du[this.color],n[10]=0,n[11]=0,n[12]=0;const a=[new Uint8Array([137,80,78,71,13,10,26,10]),De("IHDR",n)];if(this.options.srgb&&this.color!=="gray"&&a.push(De("sRGB",new Uint8Array([0]))),this.options.dpi){const r=new Uint8Array(9),o=new DataView(r.buffer),s=Math.round(this.options.dpi/.0254);o.setUint32(0,s),o.setUint32(4,s),r[8]=1,a.push(De("pHYs",r))}for(let r=0;r<t.length;r+=1<<20)a.push(De("IDAT",t.subarray(r,Math.min(t.length,r+(1<<20)))));return t.length===0&&a.push(De("IDAT",t)),a.push(De("IEND",new Uint8Array(0))),new Blob(a,{type:"image/png"})}}const Xi=1275,tn=1650;function hn(e,t,n){const i=a=>{switch(e.kind){case"number":return`${Number(a).toFixed(e.step<1?e.step<.1?2:1:0)}${e.unit?e.unit==="%"||e.unit==="°"?e.unit:` ${e.unit}`:""}`;case"select":{const r=e.options.find(s=>s.value===a);if(!r)return String(a);const o=r.group?/\((\w+)\)/.exec(r.group)?.[1]:void 0;return o?`${o}: ${r.label}`:r.label}case"toggle":return a?"on":"off";case"curve":{const r=a;return r.length===2&&r[0][0]===r[0][1]&&r[1][0]===r[1][1]?"straight":`${r.length}-point curve`}default:return String(a)}};return e.perInk?t.slice(0,n).map(i).join(" / "):i(t)}function Hi(e,t){const n=e,i=e.palette.inkCount,a=[],r=o=>{for(const s of o.settings)s.hidden||s.kind==="seed"||!Na(s,e,o.id)||a.push(`${s.label}: ${hn(s,n[o.id][s.key],i)}`)};for(const o of Ie)(o.id===t||o.parent===t&&o.id!=="layers"&&(!o.visibleWhen||o.visibleWhen(n)))&&r(o);return a}function _u(e){const t=Ie.find(r=>r.id==="layers"),n=e.layers,i=e.palette.inkCount,a=[];for(const r of t.settings){if(r.stage==="mix")continue;const o=n[r.key];if(!r.perInk){a.push(`${r.label}: ${hn(r,o,i)}`);continue}o.slice(0,i).some((l,u)=>JSON.stringify(l)!==JSON.stringify(nt(r,u)))&&a.push(`${r.label}: ${hn(r,o,i)}`)}return a}async function Nu(e,t,n,i){const a=new OffscreenCanvas(Xi,tn),r=a.getContext("2d");r.fillStyle="#fff",r.fillRect(0,0,Xi,tn);const o=90;let s=110;const l=(g,v,b="normal",k="#222",w=o)=>{r.font=`${b} ${v}px system-ui, sans-serif`,r.fillStyle=k,r.fillText(g,w,s)};l(e.upload.projectName||"Photo Inker",40,"bold"),s+=38,l(`Riso print sheet · ${new Date().toLocaleDateString()}`,22,"normal","#666"),s+=60;const u=t.dpi??600,c=g=>`${(g/u).toFixed(2)} in (${(g/u*25.4).toFixed(1)} mm)`,h=e.export,d=[`Page: ${Fu("export","pageSize",h.pageSize)}${h.pageSize==="image"?"":`, ${h.orientation}`} · ${t.width} × ${t.height} px at ${u} DPI`,`Artwork: ${c(t.art.width)} × ${c(t.art.height)}, ${(t.art.x/u).toFixed(2)} in from the left, ${(t.art.y/u).toFixed(2)} in from the top`,h.pageSize==="image"?"":`Placement: ${h.placement} · margins ${h.units==="mm"?`${h.margin} mm`:`${h.marginIn} in`} · bleed ${h.units==="mm"?`${h.bleed} mm`:`${h.bleedIn} in`}`,`Marks: ${[h.cropMarks&&"crop",h.regMarks&&"registration",h.layerLabels&&"labels"].filter(Boolean).join(", ")||"none"}`,`Source image: ${i}`].filter(Boolean);for(const g of d)l(g,22),s+=34;s+=30,l("Inks, in print order",28,"bold"),s+=20;const m=e.palette.inkCount;for(let g=0;g<m;g++){s+=56;const v=(e.palette.inkColor[g]??"#000000").toUpperCase();r.fillStyle=v,r.fillRect(o,s-36,64,44),r.strokeStyle="#999",r.strokeRect(o+.5,s-35.5,63,43),l(`${g+1}.  ${v}`,26,"bold","#222",o+90),l(n[g]??"",20,"normal","#555",o+330)}s+=40,l(`Paper: ${e.palette.paper.toUpperCase()}`,22),s+=60;const p=(g,v)=>{l(g,26,"bold"),s+=36;for(const b of v){if(s>tn-60)return;l(b,19,"normal","#333"),s+=28}s+=24};return p("Color splitting",Hi(e,"split")),p("Halftone",Hi(e,"halftone")),p("Layers",_u(e)),a.convertToBlob({type:"image/png"})}function Fu(e,t,n){const a=Ie.find(r=>r.id===e)?.settings.find(r=>r.key===t);return a?.kind==="select"?a.options.find(r=>r.value===n)?.label??n:n}const tr=e=>`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uCoverage;  // region coverage (after layer options)
uniform sampler2D uImage;     // region image, for transparency
uniform vec2 uTileOrigin;     // this tile's top-left corner in output pixels, from the image's corner
uniform float uPixel;         // halftone output px per output pixel (1, or more for the proof)
uniform int uSamples;         // per axis, color mode
uniform vec4 uRegion;         // image px covered by the region textures: x, y, w, h
uniform float uOutScale;      // halftone output px per image px
uniform int uMode;            // 0 = color, 1 = riso layers
uniform vec4 uOutside;        // written outside the artwork
uniform int uTransparent;
out vec4 outColor;
${ct}
${Ft}
${ae}
${Nt}
${xa}

vec2 regionUv(vec2 outputPx) {
  return clamp((outputPx / uOutScale - uRegion.xy) / uRegion.zw, vec2(0.0), vec2(1.0));
}

float htCoverageRaw(int ink, vec2 p) {
  vec2 uv = regionUv(p);
  return textureLod(uCoverage, uv, 0.0)[ink] * textureLod(uImage, uv, 0.0).a;
}
${Sn(e)}
float htCoverage(int ink, vec2 p) { return simTone(ink, htCoverageRaw(ink, p)); }

vec4 layersOf(int mask) {
  vec4 gray = vec4(1.0);
  for (int ink = 0; ink < 4; ink++) if ((mask & (1 << ink)) != 0) gray[ink] = 0.0;
  return gray;
}
`;function $u(e,t){return`${tr(t)}
${e}

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

int inkMask(vec2 p) {
  int mask = 0;
  for (int ink = 0; ink < 4; ink++) {
    if (ink >= uInkCount) break;
    // Each ink at its own (misregistered) position; the border moves with its ink.
    vec2 q = simWarp(ink, p, true);
    vec2 iq = q / uOutScale;
    bool on;
    // Solid ink / paper border: over everything, never halftoned.
    if (frameCovers(iq)) on = frameMask() == (1 << ink);
    else if (uSimOn == 1 && (any(lessThan(iq, vec2(0.0))) || any(greaterThanEqual(iq, uSimImageSize)))) on = false;
    else on = htInk(ink, q, htCoverage(ink, htSamplePoint(ink, q))) > 0.5;
    if (simApply(ink, q, simPatchLost(ink, q), on)) mask |= (1 << ink);
  }
  return mask;
}

void main() {
  vec2 p = (uTileOrigin + gl_FragCoord.xy) * uPixel; // pixel center, output px (row 0 = top)
  if (frameOutsideCanvas(p / uOutScale)) {
    outColor = uOutside;
    return;
  }
  if (uMode == 1) {
    outColor = layersOf(inkMask(p));
    return;
  }
  vec2 jitter = vec2(hash(p), hash(p + 17.31));
  vec3 sum = vec3(0.0);
  vec3 inkSum = vec3(0.0);
  float inked = 0.0;
  float n = float(uSamples);
  for (int j = 0; j < 8; j++) {
    if (j >= uSamples) break;
    for (int i = 0; i < 8; i++) {
      if (i >= uSamples) break;
      vec2 cell = vec2(float(i), float(j));
      vec2 f = ((cell + fract(jitter + cell * vec2(0.618034, 0.754878))) / n - 0.5) * uPixel;
      int m = inkMask(p + f);
      sum += uTable[m];
      if (m != 0) {
        inkSum += uTable[m];
        inked += 1.0;
      }
    }
  }
  if (uTransparent == 1) {
    // Paper samples are transparent; inked samples keep their color.
    outColor = inked > 0.0 ? vec4(linearToSrgb(gamutCompress(inkSum / inked)), inked / (n * n)) : vec4(0.0);
    return;
  }
  outColor = vec4(linearToSrgb(gamutCompress(sum / (n * n))), 1.0);
}
`}const Uu=e=>`${tr(e)}
uniform sampler2D uMixed;     // region mixed color (sRGB texture: samples as linear)
void main() {
  vec2 p = (uTileOrigin + gl_FragCoord.xy) * uPixel;
  if (frameOutsideCanvas(p / uOutScale)) {
    outColor = uOutside;
    return;
  }
  vec2 uv = regionUv(p);
  if (frameCovers(p / uOutScale)) {
    int mask = frameMask();
    if (uMode == 1) outColor = layersOf(mask);
    else if (uTransparent == 1 && mask == 0) outColor = vec4(0.0);
    else outColor = vec4(linearToSrgb(uTable[mask]), 1.0);
    return;
  }
  vec4 cov = textureLod(uCoverage, uv, 0.0) * textureLod(uImage, uv, 0.0).a;
  for (int ink = 0; ink < 4; ink++) cov[ink] = ink < uInkCount ? simTone(ink, cov[ink]) : 0.0; // compensation
  if (uMode == 1) {
    outColor = vec4(1.0) - cov;
    return;
  }
  vec3 mixed = textureLod(uMixed, uv, 0.0).rgb;
  if (uTransparent == 1) {
    // Share of the pixel with any ink (inks overlap independently), and the
    // ink color with the paper taken back out of the mix.
    float bare = (1.0 - cov.r) * (1.0 - cov.g) * (1.0 - cov.b) * (1.0 - cov.a);
    float a = 1.0 - bare;
    outColor = a > 0.002 ? vec4(linearToSrgb(clamp((mixed - bare * uTable[0]) / a, 0.0, 1.0)), a) : vec4(0.0);
    return;
  }
  outColor = vec4(linearToSrgb(mixed), 1.0);
}
`,_e=2048,Bu=12e7,qi=16384,Ou=150,nn=32768,zu=1e9,ji=200,nr="The graphics card stopped responding and was reset. Reload the page to continue.";class Ce extends Error{constructor(){super("Export cancelled"),this.name="ExportCancelled"}}function ir(e,t,n){const i=En(e,t,n),a=e.export,r=e.upload.mode==="print";return{kind:r?a.printTarget==="standard"?"standard":"riso":"digital",layout:i,width:i.width,height:i.height,dpi:i.dpi,format:r?a.fileFormat==="pdf"?"pdf":"png":a.digitalFormat==="jpg"?"jpg":"png",inkCount:e.palette.inkCount}}function ar(e){const{width:t,height:n}=e;if(Math.max(t,n)>nn||t*n>zu){const i=e.dpi?` (about ${(nn/e.dpi).toFixed(0)} in at ${e.dpi} DPI)`:"";return`Too large to export: ${t} × ${n} px. The limit is ${nn} px per side${i} and 1,000 megapixels. Use a smaller size or resolution.`}return e.format==="pdf"&&e.dpi&&Math.max(t,n)/e.dpi>ji?`PDF pages can be at most ${ji} in per side. Use PNG, or a smaller page.`:e.format==="jpg"&&(t*n>Bu||Math.max(t,n)>qi)?`JPG export is limited to ${qi} px per side and 120 megapixels. Use PNG for larger images.`:null}function Ut(e){return e.replace(/[\\/:*?"<>|\x00-\x1f]+/g,"-").replace(/\s+/g," ").trim()||"Photo Inker"}function Wu(e,t,n,i="png"){return`${Ut(e)}_${String(t).padStart(2,"0")}_${n.replace("#","").toUpperCase()}.${i}`}const mn=()=>new Promise(e=>setTimeout(e,0));function at(e,t=1,n=2){return{width:Math.max(1,Math.ceil(e.width/t)),height:Math.max(1,Math.ceil(e.height/t)),imageX:e.imageX/t,imageY:e.imageY/t,scale:e.scale,pixel:t,samples:n,art:{x:e.art.x/t,y:e.art.y/t,width:e.art.width/t,height:e.art.height/t}}}async function We(e,t,n,i,a,r,o,s){const{gpu:l}=t,u=n.pixel/n.scale,c=Math.min(t.sourceScale,1/u),h=t.smoothing*Math.max(t.imageWidth,t.imageHeight)/1e3,f=(t.halftone?t.halftone.reach/n.scale:0)+(t.smoothing>0?h*2.5:0)+t.splitReach+t.simReach+2,d=a.sim.uSimOn===1,m=t.halftone?$u(t.halftone.method.glsl,d):Uu(d),p=a.outside.map(y=>Math.round(y*255)),g=`export|${t.halftone?.method.id??"smooth"}|${d}|${i}|${n.samples}`;let v=performance.now();const b=Mn();let k=null;const w=Math.ceil(n.width/_e),M=Math.ceil(n.height/_e);let S=0;try{for(let y=0;y<M;y++){const T=y*_e,x=Math.min(_e,n.height-T),E=new Uint8Array(n.width*x*4);for(let A=0;A<w;A++){if(s())throw new Ce;const L=A*_e,D=Math.min(_e,n.width-L);if(S++,L>=n.art.x+n.art.width||L+D<=n.art.x||T>=n.art.y+n.art.height||T+x<=n.art.y){for(let F=0;F<x;F++)for(let H=0;H<D;H++)E.set(p,(F*n.width+L+H)*4);o(S/(w*M));continue}const P=L-n.imageX,R=T-n.imageY,C=Math.min(t.imageWidth-1,Math.max(0,Math.floor(P*u-f))),I=Math.min(t.imageHeight-1,Math.max(0,Math.floor(R*u-f))),N=Math.max(C+1,Math.min(t.imageWidth,Math.ceil((P+D)*u+f))),z=Math.max(I+1,Math.min(t.imageHeight,Math.ceil((R+x)*u+f))),_={x:C,y:I,width:N-C,height:z-I},$=e.renderRegion(_,c,b,{mix:i===0&&!t.halftone});k=l.ensureTarget(k,D,x,"coverage");const O={...t.inkUniforms,...t.halftone?.methodUniforms??{},...ya(t.border),...a.sim,uCoverage:{texture:$.layered.texture},uImage:{texture:$.source.texture},...$.mixed?{uMixed:{texture:$.mixed.texture}}:{},uTileOrigin:[P,R],uPixel:n.pixel,uSamples:n.samples,uRegion:[_.x,_.y,_.width,_.height],uOutScale:n.scale,uMode:i,uOutside:a.outside,uTransparent:a.transparent?1:0,uSize:[D,x]};for(let F=0;F<x;){if(s())throw new Ce;const H={y:F,height:bn(g,D,x-F)},ee=k;kn(l,ee.framebuffer,g,D*H.height,()=>l.draw(m,ee.framebuffer,D,x,O,H)),F+=H.height,performance.now()-v>100&&(await mn(),v=performance.now())}if(l.gl.isContextLost())throw new Error(nr);const W=l.read(k);for(let F=0;F<x;F++)E.set(W.subarray(F*D*4,(F+1)*D*4),(F*n.width+L)*4);o(S/(w*M)),await mn()}await r(E,T,x)}}finally{e.releaseTargets(b),k&&l.deleteTarget(k)}}async function Gu(e,t,n,i,a){const r=t.halftone;if(!r?.method.fromCoverage)return{state:t,release:()=>{}};const o=t.imageWidth*n.layout.scale,s=r.method.fromCoverage.cell(r.values,r.ctx),l=Math.ceil(o/s),u=Math.ceil(t.imageHeight*n.layout.scale/s);if(Math.max(l,u)>t.gpu.maxTextureSize)throw new Error(`Error diffusion at this size needs a larger dot size (the dot grid would be ${l} × ${u}).`);const c=l/t.imageWidth,h=t.smoothing*Math.max(t.imageWidth,t.imageHeight)/1e3,f=Math.ceil(((t.smoothing>0?h*2.5:0)+t.splitReach+2)*c),d=new Uint8Array(l*u*4),m=Mn(),p=512;try{for(let k=0;k<u;k+=p){if(a())throw new Ce;const w=Math.min(p,u-k),M=Math.min(f,k),S=Math.min(f,u-k-w),y={x:0,y:(k-M)/c,width:t.imageWidth,height:(w+M+S)/c},T=e.renderRegion(y,c,m,{mix:!1}),x=t.gpu.read(T.layered),E=Math.min(l,T.layered.width);for(let A=0;A<w;A++){const L=A+M;if(L>=T.layered.height)break;d.set(x.subarray(L*T.layered.width*4,(L*T.layered.width+E)*4),(k+A)*l*4)}i((k+w)/u/3,"Preparing dithering…"),await mn()}}finally{e.releaseTargets(m)}i(.34,"Diffusing…");const g=await r.method.fromCoverage.build(r.values,d,l,u,t.inkCount,"export");if(a())throw new Ce;const v=new Set(Object.values(r.methodUniforms).flatMap(k=>typeof k=="object"&&k&&"texture"in k?[k.texture]:[])),b=r.method.uniforms(r.values,r.ctx,r.prepared,{bits:g,width:l,height:u,cell:o/l});return{state:{...t,halftone:{...r,methodUniforms:b}},release:()=>{for(const k of Object.values(b))typeof k=="object"&&k&&"texture"in k&&!v.has(k.texture)&&t.gpu.gl.deleteTexture(k.texture)}}}async function Xu(e,t,n){for(e.flush();e.busy;){if(n())throw new Ce;t(0,"Waiting for ink matching to finish…"),await new Promise(a=>setTimeout(a,150)),e.flush()}const i=e.exportState();if(!i)throw new Error("Upload an image first.");return i}async function Hu(e,t,n,i,a){const r=await Xu(e,i,a);e.hold(!0);try{const o=t(),s=ir(o,r.imageWidth,r.imageHeight),l=ar(s);if(l)throw new Error(l);const{state:u,release:c}=await Gu(e,r,s,i,a);try{return s.kind==="digital"?await qu(e,u,s,o,i,a):s.kind==="standard"?await ju(e,u,s,o,i,a):await Vu(e,u,s,o,n,i,a)}finally{c()}}finally{e.hold(!1)}}const Pt=(e,t)=>{const n=new Uint8Array(t*3);for(let i=0,a=0;i<t*4;i+=4,a+=3)n[a]=e[i],n[a+1]=e[i+1],n[a+2]=e[i+2];return n};function rr(e){const t=e.inkUniforms.uPaperSrgb;return[t[0]??1,t[1]??1,t[2]??1,1]}async function qu(e,t,n,i,a,r){const o=Ut(i.upload.projectName),s=i.export,l=at(n.layout),u=n.format==="png"&&s.transparent,c={sim:t.sim("digital"),outside:u?[0,0,0,0]:rr(t),transparent:u},h=d=>a(d,"Rendering…");if(n.format==="jpg"){const d=new OffscreenCanvas(n.width,n.height),m=d.getContext("2d");return await We(e,t,l,0,c,(g,v,b)=>{m.putImageData(new ImageData(new Uint8ClampedArray(g.buffer,g.byteOffset,g.length),n.width,b),0,v)},h,r),a(1,"Encoding JPG…"),{blob:await Iu(await d.convertToBlob({type:"image/jpeg",quality:s.jpgQuality/100}),s.embedProfile),fileName:`${o}.jpg`}}const f=new Lt(n.width,n.height,u?"rgba":"rgb",{srgb:s.embedProfile});return await We(e,t,l,0,c,async(d,m,p)=>{await f.writeRows(u?d:Pt(d,n.width*p),p)},h,r),a(1,"Finishing PNG…"),{blob:await f.finish(),fileName:`${o}.png`}}async function ju(e,t,n,i,a,r){const o=Ut(i.upload.projectName),s=i.export,l=n.dpi??600,u=Qa(n.layout,Ln(n.layout,i,null)),c={sim:t.sim("standard"),outside:[1,1,1,1],transparent:!1},h=d=>a(d,"Rendering page…");if(n.format==="pdf"){const d=new An;await We(e,t,at(n.layout),0,c,async(p,g,v)=>{At(p,n.width,g,v,u,"color",n.inkCount),await d.write(Pt(p,n.width*v))},h,r),a(1,"Writing PDF…");const m={width:n.width,height:n.height,dpi:l,color:"rgb",data:await d.finish()};return{blob:er([m],s.embedProfile?Ja():void 0),fileName:`${o}_print.pdf`}}const f=new Lt(n.width,n.height,"rgb",{dpi:l,srgb:s.embedProfile});return await We(e,t,at(n.layout),0,c,async(d,m,p)=>{At(d,n.width,m,p,u,"color",n.inkCount),await f.writeRows(Pt(d,n.width*p),p)},h,r),a(1,"Finishing PNG…"),{blob:await f.finish(),fileName:`${o}_print.png`}}async function Vu(e,t,n,i,a,r,o){const s=Ut(i.upload.projectName),l=i.export,u=n.dpi??600,c=n.inkCount,h=Array.from({length:c},(S,y)=>(i.palette.inkColor[y]??"#000000").toUpperCase()),f=Qa(n.layout,Ln(n.layout,i,Za(i))),d=n.format==="pdf",p=1/(1+((l.includeProof?1:0)+(l.includeSheet?.2:0))*.25),g={sim:t.sim("riso"),outside:[1,1,1,1],transparent:!1},v=d?[]:h.map(()=>new Lt(n.width,n.height,"gray",{dpi:u})),b=d?h.map(()=>new An):[];await We(e,t,at(n.layout),1,g,async(S,y,T)=>{At(S,n.width,y,T,f,"layers",c);const x=n.width*T;await Promise.all(h.map((E,A)=>{const L=new Uint8Array(x);for(let D=0;D<x;D++)L[D]=S[D*4+A];return d?b[A].write(L):v[A].writeRows(L,T)}))},S=>r(S*p,"Rendering layers…"),o);const k={},w=h.map((S,y)=>Wu(i.upload.projectName,y+1,S));if(d){r(p,"Writing PDF…");const S=[];for(const y of b)S.push({width:n.width,height:n.height,dpi:u,color:"gray",data:await y.finish()});k[`${s}_riso_layers.pdf`]=new Uint8Array(await er(S).arrayBuffer())}else for(let S=0;S<c;S++)k[w[S]]=new Uint8Array(await(await v[S].finish()).arrayBuffer());if(l.includeProof){const S=Math.max(1,u/Ou),y=at(n.layout,S,Math.min(8,Math.max(2,Math.ceil(S)+1))),T={sim:t.sim("preview"),outside:rr(t),transparent:!1},x=f.filter(A=>A.layer===null),E=new Lt(y.width,y.height,"rgb",{dpi:u/S,srgb:l.embedProfile});await We(e,t,y,0,T,async(A,L,D)=>{At(A,y.width,L,D,x,"color",c,S),await E.writeRows(Pt(A,y.width*D),D)},A=>r(p+A*(1-p)*.9,"Rendering proof…"),o),k[`${s}_proof.png`]=new Uint8Array(await(await E.finish()).arrayBuffer())}if(l.includeSheet){r(.97,"Writing print sheet…");const S=await Nu(i,n.layout,d?h.map((y,T)=>`${s}_riso_layers.pdf, page ${T+1} (${y})`):w,a);k[`${s}_print_sheet.png`]=new Uint8Array(await S.arrayBuffer())}r(1,"Zipping…");const M=Ru(k,{level:0});return{blob:new Blob([M],{type:"application/zip"}),fileName:`${s}_riso_layers.zip`}}function Yu(e,t){const n=URL.createObjectURL(e),i=document.createElement("a");i.href=n,i.download=t,document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(n),6e4)}function Ku(e,t,n){const i=document.createElement("div");i.className="export-block";const a=document.createElement("p");a.className="export-summary";const r=document.createElement("button");r.type="button",r.className="export-button";const o=document.createElement("div");o.className="export-progress",o.hidden=!0;const s=document.createElement("progress");s.max=1,s.value=0;const l=document.createElement("button");l.type="button",l.textContent="Cancel",o.append(s,l);const u=document.createElement("p");u.className="export-warning",u.hidden=!0;const c=document.createElement("p");c.className="control-help export-message",c.setAttribute("aria-live","polite"),i.append(a,u,r,o,c);let h=!1,f=!1;function d(){const p=t.get(),g=e.get(),v=g.export,b=g.upload.mode==="print";if(r.textContent=b?v.printTarget==="standard"?`Export ${v.fileFormat.toUpperCase()} page`:"Export riso layers":`Export ${v.digitalFormat.toUpperCase()}`,r.disabled=h||!p,u.hidden=!0,!p){a.textContent="Upload an image to export.";return}const k=ir(g,p.width,p.height),w=ar(k);w&&(u.textContent=w,u.hidden=!1,r.disabled=!0);const M=`${k.width} × ${k.height} px`,S=`${(k.width/(k.dpi??600)).toFixed(2)} × ${(k.height/(k.dpi??600)).toFixed(2)} in`;if(k.kind==="riso"){const y=g.halftone.type==="none"?"smooth grayscale (the riso screens it)":"black and white",T=k.format==="pdf"?"one PDF, a page per layer":"PNGs",x=[v.includeProof&&"a color proof",v.includeSheet&&"a print sheet"].filter(Boolean).join(" and ");a.textContent=`${k.inkCount} ${k.inkCount===1?"layer":"layers"}, ${y}, ${S} at ${k.dpi} DPI (${M}), as ${T}${x?` with ${x}`:""}, zipped.`}else k.kind==="standard"?a.textContent=`One color page, ${S} at ${k.dpi} DPI (${M}), as ${k.format.toUpperCase()}. No print simulation.`:a.textContent=`${k.format.toUpperCase()}, ${M}${k.format==="png"&&v.transparent?", transparent background":""}.`}r.addEventListener("click",async()=>{if(h)return;h=!0,f=!1,o.hidden=!1,s.value=0,c.textContent="Starting…",d();const p=performance.now();try{const g=await Hu(n,()=>e.get(),t.get()?.fileName??"",(b,k)=>{s.value=b,c.textContent=k},()=>f);Yu(g.blob,g.fileName);const v=g.blob.size/(1024*1024);c.textContent=`Saved ${g.fileName} (${v.toFixed(1)} MB) in ${((performance.now()-p)/1e3).toFixed(1)} s.`}catch(g){c.textContent=g instanceof Ce?"Export cancelled.":`Export failed: ${g instanceof Error?g.message:String(g)}`,g instanceof Ce||console.error(g)}finally{h=!1,o.hidden=!0,d()}}),l.addEventListener("click",()=>{f=!0,c.textContent="Cancelling…"});let m=e.get().export.units;return e.subscribe((p,g)=>{const v=p.export;if(g.section!=="export"||g.key!=="units"||v.units===m)return;m=v.units;const b=v.units==="mm",k=(w,M)=>Number((Math.round((b?w*25.4:w/25.4)/M)*M).toFixed(2));b?(e.set("export","margin",k(v.marginIn,.5)),e.set("export","bleed",k(v.bleedIn,.5))):(e.set("export","marginIn",k(v.margin,.01)),e.set("export","bleedIn",k(v.bleed,.01))),e.set("export","pageWidth",k(v.pageWidth,.01)),e.set("export","pageHeight",k(v.pageHeight,.01)),e.set("export","imageWidth",k(v.imageWidth,.01))}),d(),e.subscribe(d),t.subscribe(d),i}function Ju(e){const t=document.createElement("div");t.className="channel-block";const n=te(se("splitChannel","advanced"),!1,f=>u(!!f)),i=document.createElement("div");i.className="channel-body",t.append(i,n.element);const a=f=>e.getValue("splitChannel",f),r=(f,d,m=!0)=>e.setValue("splitChannel",f,d,{commit:m});let o="",s=[];function l(f){return`Ink ${f+1} · ${(e.get().palette.inkColor[f]??"").toUpperCase()}`}function u(f){if(f)for(let d=0;d<B;d++){for(let m=0;m<K;m++){const g=String(a(`ch${m}Ink`))===String(d)?Number(a(`ch${m}Intensity`))/100*(Number(a(`ch${m}Opacity`))/100):0;r(`m${d}_${m}`,Math.round(g*100)/100)}r(`m${d}_offset`,0)}r("advanced",f)}function c(){const{splitChannel:f,palette:d}=e.get();i.innerHTML="",s=[];const m=Po(String(f.space),!!f.splitSigned),p=(v,b,k)=>{const w=se("splitChannel",b),M=te({...w,help:void 0},a(b),(S,y)=>r(b,S,y),k);v.append(M.element),s.push({key:b,control:M})};if(!f.advanced){m.forEach((v,b)=>{const k=document.createElement("div");k.className="channel-card";const w=document.createElement("h4");w.textContent=v,k.append(w);const M=`ch${b}Ink`,S=document.createElement("label");S.className="control",S.innerHTML='<span class="control-label">Goes to</span>';const y=document.createElement("select");y.innerHTML='<option value="none">Dropped</option>'+Array.from({length:d.inkCount},(x,E)=>`<option value="${E}">${l(E)}</option>`).join("");const T=x=>{y.value=String(x),y.value!==String(x)&&(y.value="none")};T(a(M)),y.addEventListener("change",()=>r(M,y.value)),S.append(y),k.append(S),s.push({key:M,control:{element:S,update:T}}),p(k,`ch${b}Intensity`,"Intensity"),p(k,`ch${b}Opacity`,"Opacity"),i.append(k)});return}const g=document.createElement("p");g.className="control-help",g.textContent="Each ink = the sum of every channel times its weight, plus an offset.",i.append(g);for(let v=0;v<d.inkCount;v++){const b=document.createElement("div");b.className="channel-card";const k=document.createElement("h4");k.textContent=l(v),b.append(k),m.forEach((w,M)=>p(b,`m${v}_${M}`,w)),p(b,`m${v}_offset`,"Offset"),i.append(b)}}function h(){const f=e.get();n.update(!!f.splitChannel.advanced);const d=[f.splitChannel.space,f.splitChannel.splitSigned,f.splitChannel.advanced,f.palette.inkCount,f.palette.inkColor.join()].join("|");if(d!==o){o=d,c();return}for(const{key:m,control:p}of s)p.update(a(m))}return h(),e.subscribe((f,d)=>{(d.section==="splitChannel"||d.section==="palette"||d.section==="*")&&h()}),t}const Vi='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M20.7 5.6 18.4 3.3a1 1 0 0 0-1.4 0l-3.1 3.1-1.3-1.3-1.4 1.4 1.3 1.3-7.8 7.8-.7 3.5-.9.9 1.4 1.4.9-.9 3.5-.7 7.8-7.8 1.3 1.3 1.4-1.4-1.3-1.3 3.1-3.1a1 1 0 0 0 0-1.4ZM8 18.3l-1.9.4.4-1.9 7.7-7.7 1.5 1.5L8 18.3Z"/></svg>';function Zu(e){const t=ie(e)??{r:0,g:0,b:0},n=t.r/255,i=t.g/255,a=t.b/255,r=Math.max(n,i,a),o=Math.min(n,i,a),s=(r+o)/2,l=r-o,u=l<1e-5?0:l/(1-Math.abs(2*s-1));let c=0;return l>1e-5&&(r===n?c=((i-a)/l+6)%6:r===i?c=(a-n)/l+2:c=(n-i)/l+4),[c*60,Math.min(1,u),s]}function Qu(e,t,n){const i=document.createElement("div");i.className="selective-block";const a=document.createElement("div");a.className="selective-cards";const r=document.createElement("div");r.className="button-row";const o=document.createElement("button");o.type="button",o.textContent="+ Add range";const s=document.createElement("button");s.type="button",s.innerHTML=`${Vi} Add range from image`,s.className="icon-text-button",r.append(o,s),i.append(a,r);const l=M=>e.getValue("splitSelective",M),u=(M,S,y=!0)=>e.setValue("splitSelective",M,S,{commit:y}),c=()=>Number(l("rangeCount"));function h(M,S){const[y,T,x]=Zu(S);u(`r${M}Hue`,Math.round(y)),u(`r${M}Width`,40),u(`r${M}SatMin`,Math.max(0,Math.round(T*100-35))),u(`r${M}SatMax`,100),u(`r${M}LightMin`,Math.max(0,Math.round(x*100-35))),u(`r${M}LightMax`,Math.min(100,Math.round(x*100+35)))}o.addEventListener("click",()=>{c()<Y&&u("rangeCount",c()+1)});const f={kind:"custom",id:"selective-new",onPick:M=>{if(c()>=Y)return;const S=c();h(S,M),u("rangeCount",S+1)}};s.addEventListener("click",()=>n.toggle(f));function d(M){const S=c();for(let y=M;y<S-1;y++)for(const T of fi)u(`r${y}${T}`,l(`r${y+1}${T}`));u("rangeCount",S-1),u("maskPreview","none")}let m="",p=[],g=[],v=[],b=[];function k(){const M=e.get().palette;a.innerHTML="",p=[],g=[],v=[],b=[];for(let S=0;S<c();S++){const y=document.createElement("div");y.className="channel-card";const T=document.createElement("div");T.className="tone-curve-head";const x=document.createElement("h4"),E=document.createElement("span");E.className="ink-dot",x.append(E,`Range ${S+1}`),g.push(E);const A=document.createElement("span");A.className="button-row";const L=document.createElement("button");L.type="button",L.className="icon-button eyedropper",L.innerHTML=Vi,L.title=`Set range ${S+1} from a color in the image`,L.setAttribute("aria-label",L.title);const D={kind:"custom",id:`selective-${S}`,onPick:R=>h(S,R)};L.addEventListener("click",()=>n.toggle(D)),b.push(L);const U=document.createElement("button");U.type="button",U.className="layer-toggle",U.textContent="Mask",U.title=`Show what range ${S+1} selects (preview only)`,U.addEventListener("click",()=>u("maskPreview",l("maskPreview")===String(S)?"none":String(S))),v.push(U);const P=document.createElement("button");P.type="button",P.className="icon-button remove",P.textContent="×",P.title=`Remove range ${S+1}`,P.setAttribute("aria-label",P.title),P.addEventListener("click",()=>d(S)),A.append(L,U,P),T.append(x,A),y.append(T);for(const R of fi){const C=`r${S}${R}`;if(R==="Ink"){const z=document.createElement("label");z.className="control",z.innerHTML='<span class="control-label">Ink</span>';const _=document.createElement("select");_.innerHTML=Array.from({length:M.inkCount},($,O)=>`<option value="${O}">Ink ${O+1} · ${(M.inkColor[O]??"").toUpperCase()}</option>`).join(""),_.value=String(l(C)),_.addEventListener("change",()=>u(C,_.value)),z.append(_),y.append(z),p.push({key:C,control:{element:z,update:$=>_.value=String($)}});continue}const I=se("splitSelective",C),N=te(I,l(C),(z,_)=>u(C,z,_));R==="Hue"&&N.element.classList.add("hue-control"),y.append(N.element),p.push({key:C,control:N})}a.append(y)}o.disabled=c()>=Y,s.disabled=c()>=Y||!t.get()}function w(){const M=e.get().palette,S=`${c()}|${M.inkCount}|${M.inkColor.join()}`;S!==m&&(m=S,k());for(const{key:y,control:T}of p)T.update(l(y));for(let y=0;y<g.length;y++){g[y].style.setProperty("--swatch",`hsl(${Number(l(`r${y}Hue`))} 80% 50%)`);const T=l("maskPreview")===String(y);v[y].classList.toggle("active",T),v[y].setAttribute("aria-pressed",String(T)),b[y].disabled=!t.get(),b[y].classList.toggle("active",it(n.active,{kind:"custom",id:`selective-${y}`}))}s.disabled=c()>=Y||!t.get(),s.classList.toggle("active",it(n.active,f))}return w(),e.subscribe((M,S)=>{(S.section==="splitSelective"||S.section==="palette"||S.section==="*")&&w()}),t.subscribe(w),n.subscribe(w),i}const kt=new URLSearchParams(location.search).has("debug"),Yi=[237,242,233].map(e=>ne(e/255));function ec(e){const t=new Gs,n=new mr,i=document.createElement("header");i.className="app-header",i.innerHTML='<h1 class="app-title">Photo Inker</h1><span class="mode-badge"></span>';const a=i.querySelector(".mode-badge"),r=document.createElement("div");r.className="notice",r.setAttribute("role","alert"),r.hidden=!0;const o=(x,E="error",A)=>{r.innerHTML="",r.className=`notice notice-${E}`;const L=document.createElement("span");if(L.textContent=x,r.append(L),A){const U=document.createElement("button");U.type="button",U.className="notice-action",U.textContent=A.label,U.addEventListener("click",A.onClick),r.append(U)}const D=document.createElement("button");D.type="button",D.textContent="×",D.setAttribute("aria-label","Dismiss"),D.addEventListener("click",()=>r.hidden=!0),r.append(D),r.hidden=!1};let s=!0;const l=Xs(x=>void u(x));async function u(x){const E=x[0];if(E){x.length>1?o("Only one image can be used at a time. Using the first one.","info"):r.hidden=!0,l.setBusy(!0);try{const A=await dr(E);n.set(E.name,A),s&&(t.set("upload","projectName",hr(E.name).slice(0,60)),s=!0)}catch(A){o(A instanceof Se?A.message:"Something went wrong opening that image."),A instanceof Se||console.error(A)}finally{l.setBusy(!1)}}}const c=document.createElement("footer");c.className="status";let h=100,f=null;function d(){const x=n.get(),E=x?[`${x.width} × ${x.height} px`,`${h}%`]:["No image loaded"];f&&E.push(f),c.textContent=E.join(" · ")}let m=null,p;try{p=new hl({background:Yi,onFilesDropped:x=>void u(x),onViewSettled:()=>m?.renderDetail(),onViewChange:x=>{h=Math.round(x*100),d()}})}catch(x){e.innerHTML="";const E=document.createElement("p");E.className="fatal",E.textContent=x instanceof Error?x.message:"Photo Inker couldn't start in this browser.",e.append(E);return}p.element.append(r),p.onContextLost(()=>o(nr,"error",{label:"Reload",onClick:()=>location.reload()}));const g=new Sl(t,n),v=new wl(p,()=>n.get()?.bitmap??null,(x,E)=>{x.kind==="ink"?g.setInkColor(x.slot,E):x.kind==="paper"?g.setPaper(E):x.onPick(E)}),b=Rl(t,n,g,v);if(kt){const x=new zl(t,kt);p.element.append(x.element);const E=document.createElement("button");E.type="button",E.className="ink-test-open",E.textContent="Show ink mixing test",E.addEventListener("click",()=>{x.toggle(),E.textContent=x.open?"Hide ink mixing test":"Show ink mixing test"}),new MutationObserver(()=>{E.textContent=x.open?"Hide ink mixing test":"Show ink mixing test"}).observe(x.element,{attributes:!0,attributeFilter:["hidden"]}),b.append(E)}const k=()=>{const x=ie(t.get().palette.paper)??{r:255,g:255,b:255};p.setPaper([x.r,x.g,x.b].map(E=>ne(E/255)))};k();const w=new Jl({settings:t,source:n,preview:p,background:Yi,debug:kt});m=w,w.onBusy(x=>{f=x,d()}),w.onError(x=>o(x));const M=new nl(t,{upload:l.element,palette:b,splitToneMap:lu(t,w),layers:eu(t),halftoneAm:du(t),halftoneHex:hu(t),splitChannel:Ju(t),splitSelective:Qu(t,n,v)},{export:Ku(t,n,w)}),S=document.createElement("main");S.className="app-main",S.append(M.element,p.element),e.append(i,S,c);const y=()=>{const x=n.get(),E=t.get();if(!x||E.upload.mode!=="print"||E.export.pageSize==="image"){p.setPage(null);return}const A=En(E,x.width,x.height),L=E.export.printTarget==="standard"?"#ffffff":E.palette.paper;p.setPage({layout:A,marks:Ln(A,E,Za(E)),paper:L})};n.subscribe(x=>{x&&(v.stop(),p.setImageSize(x.width,x.height),y(),l.showImage(x),d())});const T=()=>{const x=t.get().upload.mode;a.textContent=x==="digital"?"Digital mode":"Print mode",document.body.dataset.mode=x};T(),t.subscribe((x,E)=>{if(y(),E.section==="upload"&&E.key==="mode"&&T(),E.section==="palette"&&E.key==="paper"&&k(),E.section==="upload"&&E.key==="projectName"&&(s=!1),kt&&E.commit){const A=se(E.section,E.key);console.debug(`[settings] ${E.section}.${E.key} → stage: ${E.stage??"none"}`,A?.kind)}}),window.addEventListener("keydown",x=>{const E=x.target;if(!(E&&(E.tagName==="INPUT"||E.tagName==="SELECT"||E.tagName==="TEXTAREA"))&&!(x.ctrlKey||x.metaKey||x.altKey)){if(x.key==="0")p.fit();else if(x.key==="1")p.zoomTo(1);else if(x.key==="+"||x.key==="=")p.zoomBy(Math.SQRT2);else if(x.key==="-"||x.key==="_")p.zoomBy(1/Math.SQRT2);else if(x.key==="i"||x.key==="I")p.setDisplayMode("inks");else if(x.key==="o"||x.key==="O")p.setDisplayMode("original");else return;x.preventDefault()}}),window.addEventListener("dragover",x=>x.preventDefault()),window.addEventListener("drop",x=>x.preventDefault()),d()}const Ki=document.querySelector("#app");Ki&&ec(Ki);
