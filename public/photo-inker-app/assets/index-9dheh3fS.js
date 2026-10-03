(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const Vr=["image/jpeg","image/png","image/webp"],Yr=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp",ei=100*1024*1024,ti=5e7;class Te extends Error{constructor(t){super(t),this.name="UploadError"}}const Kr={jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",webp:"image/webp"};function Jr(e){if(e.type)return e.type.toLowerCase();const t=e.name.split(".").pop()?.toLowerCase()??"";return Kr[t]??""}function ni(e){return`${(e/1e6).toFixed(1)} MP`}async function Zr(e){try{return await createImageBitmap(e,{imageOrientation:"from-image",premultiplyAlpha:"none"})}catch{const t=URL.createObjectURL(e);try{const n=new Image;return n.src=t,await n.decode(),await createImageBitmap(n)}finally{URL.revokeObjectURL(t)}}}async function Qr(e){const t=Jr(e);if(t==="image/heic"||t==="image/heif"||/\.hei[cf]$/i.test(e.name))throw new Te("HEIC photos can't be opened in the browser. Export the photo as JPG first, then upload it.");if(!Vr.includes(t))throw new Te(`"${e.name}" isn't a supported image. Use a JPG, PNG, or WebP file.`);if(e.size>ei){const a=Math.round(e.size/1048576);throw new Te(`This file is ${a} MB. The maximum is ${ei/(1024*1024)} MB.`)}let n;try{n=await Zr(e)}catch{throw new Te(`"${e.name}" couldn't be opened. The file may be damaged.`)}const i=n.width*n.height;if(i>ti){const{width:a,height:r}=n;throw n.close(),new Te(`This image is ${a} × ${r} (${ni(i)}). The maximum is ${ni(ti)}. Resize it and try again.`)}return n}function es(e){const t=e.lastIndexOf(".");return t>0?e.slice(0,t):e}class ts{image=null;owned=!1;version=0;listeners=new Set;get(){return this.image}set(t,n,i=!0){this.owned&&this.image&&this.image.bitmap!==n&&this.image.bitmap.close(),this.owned=i,this.image={fileName:t,bitmap:n,width:n.width,height:n.height,version:++this.version};for(const a of this.listeners)a(this.image);return this.image}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}}const W=4;function ae(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function be(e){const t=Math.min(1,Math.max(0,e));return t<=.0031308?t*12.92:1.055*Math.pow(t,1/2.4)-.055}function Ta(e){return{r:ae(e.r/255),g:ae(e.g/255),b:ae(e.b/255)}}function Ma(e){return{r:Math.round(be(e.r)*255),g:Math.round(be(e.g)*255),b:Math.round(be(e.b)*255)}}const ze={x:.95047,y:1,z:1.08883};function ns(e){return{x:.4124564*e.r+.3575761*e.g+.1804375*e.b,y:.2126729*e.r+.7151522*e.g+.072175*e.b,z:.0193339*e.r+.119192*e.g+.9503041*e.b}}function Kt(e){return e>.008856?Math.cbrt(e):7.787*e+16/116}function is(e){const t=Kt(e.x/ze.x),n=Kt(e.y/ze.y),i=Kt(e.z/ze.z);return{l:116*n-16,a:500*(t-n),b:200*(n-i)}}function Ra(e){return is(ns(e))}function He(e){return Ra(Ta(e))}function Nt(e,t){const n=e.l-t.l,i=e.a-t.a,a=e.b-t.b;return Math.sqrt(n*n+i*i+a*a)}function ee(e){const t=/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i.exec(e.trim());if(!t||!t[1])return null;let n=t[1];n.length===3&&(n=n.split("").map(a=>a+a).join(""));const i=parseInt(n,16);return{r:i>>16&255,g:i>>8&255,b:i&255}}function me(e){const t=n=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,"0");return`#${t(e.r)}${t(e.g)}${t(e.b)}`}function Jt(e){return e>.206893?e*e*e:(e-16/116)/7.787}function Ca(e){const t=(e.l+16)/116,n=ze.x*Jt(t+e.a/500),i=ze.y*Jt(t),a=ze.z*Jt(t-e.b/200);return{r:3.2404542*n-1.5371385*i-.4985314*a,g:-.969266*n+1.8760108*i+.041556*a,b:.0556434*n-.2040259*i+1.0572252*a}}function Dt(e){return Ma(Ca(e))}function as(e){const t=Math.cbrt(.4122214708*e.r+.5363325363*e.g+.0514459929*e.b),n=Math.cbrt(.2119034982*e.r+.6806995451*e.g+.1073969566*e.b),i=Math.cbrt(.0883024619*e.r+.2817188376*e.g+.6299787005*e.b);return{l:.2104542553*t+.793617785*n-.0040720468*i,a:1.9779984951*t-2.428592205*n+.4505937099*i,b:.0259040371*t+.7827717662*n-.808675766*i}}function ii(e){const t=(e.l+.3963377774*e.a+.2158037573*e.b)**3,n=(e.l-.1055613458*e.a-.0638541728*e.b)**3,i=(e.l-.0894841775*e.a-1.291485548*e.b)**3;return{r:4.0767416621*t-3.3077115913*n+.2309699292*i,g:-1.2684380046*t+2.6097574011*n-.3413193965*i,b:-.0041960863*t-.7034186147*n+1.707614701*i}}function Nn(e){const t=as(Ta(e));return{l:t.l,c:Math.hypot(t.a,t.b),h:(Math.atan2(t.b,t.a)*180/Math.PI+360)%360}}function Mt(e){const t=Math.min(1,Math.max(0,e.l)),n=e.h*Math.PI/180,i=r=>{const s=ii({l:t,a:r*Math.cos(n),b:r*Math.sin(n)});return s.r>=-1e-4&&s.g>=-1e-4&&s.b>=-1e-4&&s.r<=1.0001&&s.g<=1.0001&&s.b<=1.0001};let a=Math.max(0,e.c);if(!i(a)){let r=0,s=a;for(let o=0;o<24;o++){const l=(r+s)/2;i(l)?r=l:s=l}a=r}return Ma(ii({l:t,a:a*Math.cos(n),b:a*Math.sin(n)}))}const rs=[{id:"complementary",label:"Complementary",count:2},{id:"analogous",label:"Analogous",count:3},{id:"triad",label:"Triad",count:3},{id:"square",label:"Square",count:4},{id:"monotone",label:"Monotone",count:3},{id:"cmyk",label:"CMYK analog",count:4}],ss=[{name:"Medium Blue",hex:"#3255a4"},{name:"Fluorescent Pink",hex:"#ff48b0"},{name:"Yellow",hex:"#ffe800"},{name:"Black",hex:"#000000"}];function os(e,t){if(e==="cmyk")return ss.map(a=>a.hex);const n=Nn(ee(t)??{r:0,g:120,b:191}),i=a=>me(Mt({...n,h:(n.h+a+360)%360}));switch(e){case"complementary":return[t,i(180)];case"analogous":return[t,i(-30),i(30)];case"triad":return[t,i(120),i(240)];case"square":return[t,i(90),i(180),i(270)];case"monotone":return[t,me(Mt({l:Math.min(.95,n.l+.25),c:n.c*.55,h:n.h})),me(Mt({l:Math.max(.12,n.l-.25),c:n.c*.9,h:n.h}))]}}function ls(e){const t=Nn(ee(e)??{r:255,g:255,b:255});return me(Mt({l:.95,c:Math.min(t.c,.035),h:t.h}))}function us(e,t,n){const i=os(e,t);if(!n)return{inks:i,paper:null};const a=e==="cmyk"?-1:0;let r=-1,s=-1/0;i.forEach((l,u)=>{if(u===a)return;const c=Nn(ee(l)).l;c>s&&(s=c,r=u)});const o=i[r];return{inks:i.filter((l,u)=>u!==r),paper:o?ls(o):null}}function ke(e){let t=e>>>0;return function(){t|=0,t=t+1831565813|0;let i=Math.imul(t^t>>>15,1|t);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}}function cs(e){const t=e.map(([i,a])=>[Math.min(1,Math.max(0,i)),Math.min(1,Math.max(0,a))]).sort((i,a)=>i[0]-a[0]),n=[];for(const i of t)n.length&&Math.abs(n[n.length-1][0]-i[0])<1e-6?n[n.length-1]=i:n.push(i);return n.length===0?[[0,0],[1,1]]:n}function Re(e,t){const n=cs(e),i=n.length,a=new Float32Array(t);if(i===1)return a.fill(n[0][1]);const r=[];for(let l=0;l<i-1;l++)r.push((n[l+1][1]-n[l][1])/Math.max(1e-9,n[l+1][0]-n[l][0]));const s=[r[0]];for(let l=1;l<i-1;l++)s.push(r[l-1]*r[l]<=0?0:(r[l-1]+r[l])/2);s.push(r[i-2]);for(let l=0;l<i-1;l++){if(r[l]===0){s[l]=0,s[l+1]=0;continue}const u=s[l]/r[l],c=s[l+1]/r[l],h=u*u+c*c;if(h>9){const p=3/Math.sqrt(h);s[l]=p*u*r[l],s[l+1]=p*c*r[l]}}let o=0;for(let l=0;l<t;l++){const u=l/(t-1);if(u<=n[0][0]){a[l]=n[0][1];continue}if(u>=n[i-1][0]){a[l]=n[i-1][1];continue}for(;o<i-2&&u>n[o+1][0];)o++;const[c,h]=n[o],[p,d]=n[o+1],m=p-c,f=(u-c)/m,g=f*f,v=g*f;a[l]=(2*v-3*g+1)*h+(v-2*g+f)*m*s[o]+(-2*v+3*g)*d+(v-g)*m*s[o+1],a[l]=Math.min(1,Math.max(0,a[l]))}return a}function ct(){return[{kind:"number",key:"maxDot",label:"Maximum dot size",perInk:!0,default:100,min:10,max:100,step:1,unit:"%"},{kind:"select",key:"shape",label:"Dot shape",default:"round",options:[{value:"round",label:"Round"},{value:"square",label:"Square"},{value:"ellipse",label:"Ellipse"},{value:"diamond",label:"Diamond"},{value:"line",label:"Line"}]},{kind:"curve",key:"curve",label:"Dot size curve",default:[[0,0],[1,1]]}]}function hs(e,t,n){switch(e){case"round":return t*t+n*n;case"square":return Math.max(Math.abs(t),Math.abs(n));case"ellipse":return t*t+n/.65*(n/.65);case"diamond":return Math.abs(t)+Math.abs(n);case"line":return Math.abs(n)}}const ht=`
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
`,Dn=`
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
`;function Gt(e,t,n,i=65536){const a=ke(12345),r=new Float32Array(i);for(let o=0;o<i;o++){const[l,u]=n(a),[c,h]=e(l,u);r[o]=hs(t,l-c,u-h)}r.sort();const s=new Float32Array(256);for(let o=0;o<256;o++){const l=o/255*(i-1),u=Math.floor(l),c=Math.min(i-1,u+1);s[o]=r[u]+(r[c]-r[u])*(l-u)}return s[0]=-1,s}const ai=new WeakMap,ds=64;function _n(e,t,n,i,a,r=1){const s=e.gl;let o=ai.get(s);o||ai.set(s,o=new Map);let l=o.get(t);if(l)return o.delete(t),o.set(t,l),l;for(const[u,c]of o){if(o.size<ds)break;s.deleteTexture(c),o.delete(u)}return l=s.createTexture(),s.bindTexture(s.TEXTURE_2D,l),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.NEAREST),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.texImage2D(s.TEXTURE_2D,0,r===1?s.R32F:s.RGBA32F,n,i,0,r===1?s.RED:s.RGBA,s.FLOAT,a),o.set(t,l),l}let Se=null;function ms(e,t){const n=JSON.stringify(t);if(Se&&Se.key===n&&Se.gl===e.gl)return Se.tex;const i=e.gl,a=Se?.gl===i?Se.tex:i.createTexture(),r=Re(t,256);return i.bindTexture(i.TEXTURE_2D,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.pixelStorei(i.UNPACK_ALIGNMENT,1),i.texImage2D(i.TEXTURE_2D,0,i.R8,256,1,0,i.RED,i.UNSIGNED_BYTE,Uint8Array.from(r,s=>Math.round(s*255))),Se={key:n,tex:a,gl:i},a}const ps={round:0,square:1,ellipse:2,diamond:3,line:4};function dt(e,t,n,i,a){const r=e[n]??[],s=i?e[i]??[]:[],o=e.maxDot??[],l=p=>Array.from({length:4},(d,m)=>m<t.inkCount?p(m):1),u=e.shape??"round",c=`${a.key}|${u}`;let h=ri.get(c);return h||ri.set(c,h=a.measure()),{uLatSize:l(p=>Math.max(1,r[p]??8)),uLatAngle:l(p=>(s[p]??0)*Math.PI/180),uLatMaxDot:l(p=>(o[p]??100)/100),uLatMinFrac:l(p=>{const d=t.minDot[p]??0,m=Math.max(1,r[p]??8);return Math.min(1,Math.PI/4*d*d/(m*m))}),uLatRoundUp:t.minDotMode==="round"?1:0,uLatShape:ps[u]??0,uLatCurve:{texture:ms(t.gpu,e.curve??[[0,0],[1,1]])},uLatCdf:{texture:_n(t.gpu,`cdf:${c}`,256,1,h)}}}const ri=new Map;const Oe=Math.sqrt(2/Math.sqrt(3)),fn=Oe*Math.sqrt(3)/2,Ia={id:"halftoneHex",title:"AM: hex grid",stage:"halftone",parent:"halftone",description:"Dots in a honeycomb pattern: each dot has six equal neighbors. Smoother-looking than a square grid.",visibleWhen:e=>e.halftone?.type==="hex",settings:[{kind:"number",key:"cellSize",label:"Cell size",perInk:!0,default:8,min:2,max:64,step:.5,unit:"px",help:"Same dot density as a square grid of this size, in output pixels."},{kind:"number",key:"angle",label:"Angle",perInk:!0,linkInks:!1,default:30,slotDefaults:[0,30,15,45],min:0,max:60,step:.5,unit:"°",help:"A hex grid repeats every 60°."},...ct()]};function fs(e,t){const n=t/fn,i=Math.floor((e-n*Oe*.5)/Oe),a=Math.floor(n);let r=[0,0],s=1/0;for(let o=0;o<=1;o++)for(let l=0;l<=1;l++){const u=i+l,c=a+o,h=u*Oe+c*Oe*.5,p=c*fn,d=(e-h)**2+(t-p)**2;d<s&&(s=d,r=[h,p])}return r}const gs={id:"hex",label:"AM: hex grid",section:Ia,glsl:`
${ht}
const float HEX_H = ${Oe.toFixed(8)};
const float HEX_ROW = ${fn.toFixed(8)};
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
${Dn}
`,uniforms(e,t){return dt(e,t,"cellSize","angle",{key:"hex",measure:()=>Gt(fs,e.shape,n=>[n()*40,n()*40])})}};class mt{constructor(t=2){this.capacity=t}entries=[];get(t,n,i){const a=this.entries.findIndex(s=>s.key===n&&s.gl===t);if(a>=0){const[s]=this.entries.splice(a,1);return this.entries.push(s),s.texture}const r=i();for(this.entries.push({key:n,gl:t,texture:r});this.entries.length>this.capacity;){const s=this.entries.shift();s.gl.deleteTexture(s.texture)}return r}}const vs=1024;class We extends Error{constructor(){super("Superseded by a newer request"),this.name="SupersededError"}}class Fn{worker;nextRequestId=0;latestRequestId=-1;pending=null;constructor(t){this.worker=t,this.worker.onmessage=n=>{const i=n.data;i.requestId!==this.latestRequestId||!this.pending||(i.type==="progress"?this.pending.onProgress?.(i.fraction):i.type==="done"?(this.pending.resolve(i.result),this.pending=null):(this.pending.reject(new Error(i.message)),this.pending=null))}}run(t,n={}){this.pending?.reject(new We);const i=this.nextRequestId++;return this.latestRequestId=i,new Promise((a,r)=>{this.pending={resolve:a,reject:r,onProgress:n.onProgress??null};const s={requestId:i,payload:t};this.worker.postMessage(s,n.transfer??[])})}terminate(){this.pending?.reject(new We),this.pending=null,this.worker.terminate()}}const si=new Map;function pt(e){let t=si.get(e);return t||(t=new Fn(new Worker(new URL(""+new URL("halftone.worker-6lNrEsS2.js",import.meta.url).href,import.meta.url),{type:"module"})),si.set(e,t)),t}const j=vs,Aa={id:"halftoneNoise",title:"AM: noise grid",stage:"halftone",parent:"halftone",description:"A grid with each dot nudged by noise: breaks up the regular pattern and moiré while keeping dot-size shading.",visibleWhen:e=>e.halftone?.type==="noise",settings:[{kind:"select",key:"noise",label:"Noise",default:"blue",display:"segmented",options:[{value:"blue",label:"Blue"},{value:"pink",label:"Pink"},{value:"green",label:"Green"}]},{kind:"number",key:"cellSize",label:"Grid spacing",perInk:!0,default:8,min:2,max:64,step:.5,unit:"px"},{kind:"number",key:"amount",label:"Noise amount",default:70,min:0,max:100,step:1,unit:"%"},{kind:"number",key:"cluster",label:"Cluster size",default:3,min:2,max:8,step:1,unit:"cells",visibleWhen:e=>e.noise==="green"},{kind:"seed",key:"seed",label:"Random seed",default:1},...ct()]},oi=e=>e/255-.5;function bs(e,t){return(n,i)=>{const a=Math.floor(n),r=Math.floor(i);let s=[0,0],o=1/0;for(let l=-1;l<=1;l++)for(let u=-1;u<=1;u++){const c=a+u,h=r+l,p=(h%j+j)%j*j+(c%j+j)%j,d=c+.5+oi(e[p*2])*t,m=h+.5+oi(e[p*2+1])*t,f=(n-d)**2+(i-m)**2;f<o&&(o=f,s=[d,m])}return s}}const ks={id:"noise",label:"AM: noise grid",section:Aa,prepareKey:e=>li(e),async prepare(e){const t=await pt("noise").run({kind:"noiseField",noise:String(e.noise),cluster:Number(e.cluster),seed:Number(e.seed)});if(t.kind!=="noiseField")throw new Error("unexpected worker result");return{key:li(e),data:t.data}},glsl:`
${ht}
uniform sampler2D uNoiseTile;   // ${j} × ${j}, RG8: nudge per cell + 0.5
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
      vec2 o = (texelFetch(uNoiseTile, ivec2(mod(cell, ${j}.0)), 0).xy - 0.5) * uNoiseAmount;
      vec2 c = cell + 0.5 + o;
      float d = dot(q - c, q - c);
      if (d < bestD) { bestD = d; best = c; }
    }
  }
  return best;
}
${Dn}
`,uniforms(e,t,n){const i=n?.data??ys,a=n?.key??"none",r=Number(e.amount)/100,s=ke(Number(e.seed)*31+7),o=[];for(let l=0;l<4;l++)o.push(Math.floor(s()*j),Math.floor(s()*j));return{...dt(e,t,"cellSize",null,{key:`noise:${a}|${r}`,measure:()=>Gt(bs(i,r),e.shape,l=>[l()*j,l()*j])}),uNoiseTile:{texture:ws(t.gpu.gl,i)},uNoiseAmount:r,uNoiseShift:o}}};function li(e){return`${e.noise}|${e.noise==="green"?e.cluster:0}|${e.seed}`}const ys=new Uint8Array(j*j*2).fill(128),xs=new mt;function ws(e,t){return xs.get(e,t,()=>{const n=e.createTexture();return e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.pixelStorei(e.UNPACK_ALIGNMENT,2),e.texImage2D(e.TEXTURE_2D,0,e.RG8,j,j,0,e.RG,e.UNSIGNED_BYTE,t),n})}const La={id:"halftoneRings",title:"AM: concentric rings",stage:"halftone",parent:"halftone",description:"Dots on rings around a center point, or continuous lines whose width changes with the tone.",visibleWhen:e=>e.halftone?.type==="rings",settings:[{kind:"number",key:"cellSize",label:"Ring spacing",perInk:!0,default:8,min:2,max:64,step:.5,unit:"px"},{kind:"toggle",key:"lines",label:"Continuous lines instead of dots",default:!1},{kind:"number",key:"dotSpacing",label:"Dot spacing along each ring",default:100,min:50,max:300,step:5,unit:"%",help:"As a share of the ring spacing.",visibleWhen:e=>!e.lines},{kind:"number",key:"angle",label:"Dot rotation",perInk:!0,linkInks:!1,default:0,slotDefaults:[0,15,30,45],min:0,max:360,step:1,unit:"°",visibleWhen:e=>!e.lines},{kind:"number",key:"centerX",label:"Center, across",default:50,min:0,max:100,step:.5,unit:"%"},{kind:"number",key:"centerY",label:"Center, down",default:50,min:0,max:100,step:.5,unit:"%"},...ct().map(e=>e.key==="shape"?{...e,visibleWhen:t=>!t.lines}:e)]},Rt=Math.PI*2;function Ss(e){return(t,n)=>{const i=Math.hypot(t,n),a=Math.atan2(n,t),r=Math.round(i);let s=[0,0],o=1/0;for(let l=Math.max(0,r-1);l<=r+1;l++){const u=l===0?1:Math.max(1,Math.round(Rt*l/e)),c=Math.round(a/Rt*u);for(let h=c-1;h<=c+1;h++){const p=Rt*h/u,d=l*Math.cos(p),m=l*Math.sin(p),f=(t-d)**2+(n-m)**2;f<o&&(o=f,s=[d,m])}}return s}}const Es={id:"rings",label:"AM: concentric rings",section:La,glsl:`
${ht}
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
`,uniforms(e,t){const n=e,i=Number(n.dotSpacing??100)/100;return{...dt(n,t,"cellSize","angle",{key:`rings:${i}`,measure:()=>Gt(Ss(i),n.shape??"round",a=>{const r=Math.sqrt(100+a()*1500),s=a()*Rt;return[r*Math.cos(s),r*Math.sin(s)]})}),uRingCenter:[Number(n.centerX??50)/100*t.outputWidth,Number(n.centerY??50)/100*t.outputHeight],uRingRatio:i,uRingLines:n.lines?1:0}}},Ts=4;function Ms(e,t,n){const i=Math.floor(t+e.radius),a=Math.floor(n+e.radius);let r=null,s=1/0;for(let o=-1;o<=1;o++)for(let l=-1;l<=1;l++){const u=i+l,c=a+o;if(!(u<0||c<0||u>=e.grid||c>=e.grid))for(let h=0;h<Ts;h++){const p=(c*e.grid*2+u*2)*4+h*2;if(e.data[p]>254)continue;const d=u-e.radius+(e.data[p]+.5)/254,m=c-e.radius+(e.data[p+1]+.5)/254,f=(t-d)**2+(n-m)**2;f<s&&(s=f,r=[d,m])}}return r}const Pa={id:"halftoneSpiral",title:"AM: phyllotaxis spiral",stage:"halftone",parent:"halftone",description:"Dots spiraling out from a center, like seeds in a sunflower.",visibleWhen:e=>e.halftone?.type==="spiral",settings:[{kind:"number",key:"cellSize",label:"Point spacing",perInk:!0,default:8,min:2,max:64,step:.5,unit:"px"},{kind:"number",key:"angle",label:"Spiral rotation",perInk:!0,linkInks:!1,default:0,slotDefaults:[0,23,46,69],min:0,max:360,step:1,unit:"°"},{kind:"number",key:"divergence",label:"Divergence angle",default:137.5,min:100,max:180,step:.1,unit:"°",help:"Angle between one point and the next. 137.5° (the golden angle) packs points most evenly."},{kind:"number",key:"centerX",label:"Center, across",default:50,min:0,max:100,step:.5,unit:"%"},{kind:"number",key:"centerY",label:"Center, down",default:50,min:0,max:100,step:.5,unit:"%"},...ct()]},Rs=180*(3-Math.sqrt(5));function ui(e){const t=Number(e.divergence);return Math.abs(t-137.5)<.05?Rs:t}function ci(e,t){const n=Number(e.centerX??50)/100*t.outputWidth,i=Number(e.centerY??50)/100*t.outputHeight,a=Math.max(Math.hypot(n,i),Math.hypot(t.outputWidth-n,i),Math.hypot(n,t.outputHeight-i),Math.hypot(t.outputWidth-n,t.outputHeight-i)),r=Math.max(1,Math.min(...e.cellSize??[8])),s=a/r+3;return 2**Math.ceil(Math.log2(Math.PI*s*s))}const Cs={id:"spiral",label:"AM: phyllotaxis spiral",section:Pa,prepareKey:(e,t)=>`${e.divergence}|${ci(e,t)}`,async prepare(e,t){const n=await pt("spiral").run({kind:"spiral",count:ci(e,t),divergence:ui(e)});if(n.kind!=="spiral")throw new Error("unexpected worker result");return n},glsl:`
${ht}
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
${Dn}
`,uniforms(e,t,n){const i=e,a=t.gpu.gl,r=Is.get(a,n??Zt,()=>{const l=n??Zt,u=a.createTexture();return a.bindTexture(a.TEXTURE_2D,u),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.pixelStorei(a.UNPACK_ALIGNMENT,4),a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,l.grid*2,l.grid,0,a.RGBA,a.UNSIGNED_BYTE,l.data),u}),s=n??Zt,o=i.shape??"round";return{...dt(i,t,"cellSize","angle",{key:`spiral:${ui(i)}:${s.count}`,measure:()=>{const l=Math.max(6,s.radius-3);return Gt((u,c)=>Ms(s,u,c)??[u+100,c+100],o,u=>{const c=Math.sqrt(25+u()*(l*l-25)),h=u()*Math.PI*2;return[c*Math.cos(h),c*Math.sin(h)]})}}),uSpiral:{texture:r},uSpiralR:s.radius,uSpiralGrid:s.grid,uSpiralCenter:[Number(i.centerX??50)/100*t.outputWidth,Number(i.centerY??50)/100*t.outputHeight]}}},Zt={count:0,radius:1,grid:1,data:new Uint8Array(8).fill(255)},Is=new mt,Na=[15,75,0,45],Da={id:"halftoneAm",title:"AM: square grid",stage:"halftone",parent:"halftone",description:"Dots sit on a grid; dot size carries the tone. Each ink gets its own angle to avoid moiré.",visibleWhen:e=>e.halftone?.type==="am",settings:[{kind:"number",key:"cellSize",label:"Cell size",perInk:!0,default:8,min:2,max:64,step:.5,unit:"px",help:"Distance between dots, in output pixels. At 600 DPI: 6 px ≈ 100 LPI, 8 px = 75 LPI, 12 px = 50 LPI."},{kind:"number",key:"angle",linkInks:!1,label:"Angle",perInk:!0,default:45,slotDefaults:Na,min:0,max:90,step:.5,unit:"°"},{kind:"number",key:"maxDot",label:"Maximum dot size",perInk:!0,default:100,min:10,max:100,step:1,unit:"%",help:"Largest dot, as a share of the cell. Below 100% even solid areas keep small gaps."},{kind:"select",key:"shape",label:"Dot shape",default:"round",options:[{value:"round",label:"Round"},{value:"square",label:"Square"},{value:"ellipse",label:"Ellipse"},{value:"diamond",label:"Diamond"},{value:"line",label:"Line"}]},{kind:"curve",key:"curve",label:"Dot size curve",default:[[0,0],[1,1]],help:"Maps tone to dot size. Pull the middle down for smaller dots in the midtones."}]},he=128;function As(e,t,n){const i=Math.abs(t),a=Math.abs(n);switch(e){case"round":return i+a<=1?t*t+n*n:2-((1-i)**2+(1-a)**2);case"square":return Math.max(i,a);case"ellipse":return Math.sqrt(t*t+(n/.65)**2);case"diamond":return i+a;case"line":return a}}function Ls(e){const t=he*he,n=new Float64Array(t);for(let r=0;r<he;r++)for(let s=0;s<he;s++){const o=(s+.5)/he*2-1,l=(r+.5)/he*2-1;n[r*he+s]=As(e,o,l)+(s*1e-9+r*1e-12)}const i=Array.from({length:t},(r,s)=>s).sort((r,s)=>n[r]-n[s]),a=new Uint8Array(t);return i.forEach((r,s)=>a[r]=Math.round((s+.5)/t*255)),a}const hi=new WeakMap;function _a(e,t,n,i,a,r){const s=e.gl;let o=hi.get(s);o||hi.set(s,o=new Map);let l=o.get(t);if(l&&l.data===a)return l.tex;if(!l){const u=s.createTexture();l={tex:u,data:null},o.set(t,l),s.bindTexture(s.TEXTURE_2D,u),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.LINEAR);const c=r==="repeat"?s.REPEAT:s.CLAMP_TO_EDGE;s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,c),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,c)}return s.bindTexture(s.TEXTURE_2D,l.tex),s.pixelStorei(s.UNPACK_ALIGNMENT,1),s.texImage2D(s.TEXTURE_2D,0,s.R8,n,i,0,s.RED,s.UNSIGNED_BYTE,a),l.data=a,l.tex}const di=new Map;function Ps(e,t){let n=di.get(t);return n||di.set(t,n=Ls(t)),_a(e,`spot:${t}`,he,he,n,"repeat")}let Qt=null;function Ns(e,t){const n=JSON.stringify(t);if(Qt?.key!==n){const i=Re(t,256);Qt={key:n,bytes:Uint8Array.from(i,a=>Math.round(a*255))}}return _a(e,"amCurve",256,1,Qt.bytes,"clamp")}const Ds={id:"am",label:"AM: square grid",section:Da,glsl:`
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
`,uniforms(e,t){const n=i=>Array.from({length:4},(a,r)=>r<t.inkCount?i(r):1);return{uAmCell:n(i=>Math.max(1,e.cellSize[i]??8)),uAmAngle:n(i=>(e.angle[i]??45)*Math.PI/180),uAmMaxDot:n(i=>(e.maxDot[i]??100)/100),uAmMinFrac:n(i=>{const a=t.minDot[i]??0,r=Math.max(1,e.cellSize[i]??8);return Math.min(1,Math.PI/4*(a*a)/(r*r))}),uAmRoundUp:t.minDotMode==="round"?1:0,uAmSpot:{texture:Ps(t.gpu,e.shape)},uAmCurve:{texture:Ns(t.gpu,e.curve)}}}},Fa=60,_s=4096,gn=new Map;function $n(e,t,n){const i=gn.get(e);return i===void 0?Math.max(1,Math.min(n,Math.floor(_s/t))):Math.max(1,Math.min(n,Math.floor(Fa/(i*t))))}function Un(e,t,n,i,a){const r=performance.now();a(),e.finish(t);const s=performance.now()-r,o=s/Math.max(1,i),l=gn.get(n);return gn.set(n,l===void 0||o>l?o:l*.8+o*.2),s}const mi=50,Fs=5.5,$s=.5,pe=`#version 300 es
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
`,Us=`${pe}
uniform int uSeed;
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy);
  outColor = vec4(tuPack((tuRand(c, uSeed) - 0.5) * 0.2), 0.0, 1.0);
}
`,Bs=`${pe}
uniform sampler2D uAnalysis;
void main() {
  vec4 a = texelFetch(uAnalysis, ivec2(gl_FragCoord.xy), 0);
  vec2 g = (a.gb - 0.5) * 2.0;
  float m = clamp(length(g) * 3.0, 0.0, 1.0);
  float phi = atan(g.y, g.x);
  outColor = vec4(vec2(cos(2.0 * phi), sin(2.0 * phi)) * m * 0.5 + 0.5, m, 1.0);
}
`,pi=`${pe}
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
`,Os=`${pe}
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
`,zs=`${pe}
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
`,Ws=`${pe}
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
`,Gs=`${pe}
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
`,fi=`${pe}
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
`,Xs=`${pe}
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
`,Hs=()=>new Promise(e=>setTimeout(e,0));function qs(e,t){return((e*256+t)/65535-.5)*4}async function gi(e,t){const{width:n,height:i}=t,a=[],r=(l=n,u=i)=>{const c=e.createTarget(l,u,"coverage");return a.push(c),c};let s=performance.now();const o=async(l,u,c,h)=>{const p={uSize:[c.width,c.height],uPeriodic:t.periodic?1:0,...h};for(let d=0;d<c.height;){if(t.isCancelled())throw new We;const m=$n(`turing|${l}`,c.width,c.height-d),f={y:d,height:m};Un(e,c.framebuffer,`turing|${l}`,c.width*m,()=>e.draw(u,c.framebuffer,c.width,c.height,p,f)),d+=m,performance.now()-s>24&&(await Hs(),s=performance.now())}};try{const l=t.params,u=t.samples,c=u/6.54,h=2*c,p=l.seed*7919+17&2147483647,d=l.order>.001||l.follow>.001&&!!t.orientation,m=D=>[Math.max(1,Math.round(n/(u*D))),Math.max(1,Math.round(i/(u*D)))];let f=null;if(t.orientation&&l.follow>.001){const D=t.orientation,R=D.analysis.width,I=D.analysis.height,N=r(R,I),$=r(R,I);await o("tensor",Bs,N,{uAnalysis:{texture:D.analysis.texture}}),await o("blur",pi,$,{uImage:{texture:N.texture},uDir:[1,0],uSigma:D.sigma,uPeriodic:0}),await o("blur",pi,N,{uImage:{texture:$.texture},uDir:[0,1],uSigma:D.sigma,uPeriodic:0}),f=N}const g=r(),v=f??r(1,1);await o("flow",Os,g,{uOrder:l.order,uDirection:l.direction,uWobble:l.wobble,uFollow:l.follow,uHasImage:f?1:0,uTensor:{texture:v.texture},uUvPerTexel:t.orientation?.uvPerTexel??[0,0],uWobbleCells:m(4),uBranchCells:m(1.5),uSeed:p});let b=r(),k=r();const x=r(),S=d?r():null;await o("init",Us,b,{uSeed:p});const y={uSigma1:c,uSigma2:h,uSigmaAlong:u*.5,uGain:Fs,uRelax:$s,uSpots:l.spots*.75,uBranching:l.branching*.6};for(let D=0;D<mi;D++)await o("isoX",zs,x,{uU:{texture:b.texture},uSigma1:c,uSigma2:h}),S&&await o("across",Ws,S,{uU:{texture:b.texture},uFlow:{texture:g.texture},uSigma1:c,uSigma2:h}),await o("update",Gs,k,{...y,uU:{texture:b.texture},uIso:{texture:x.texture},uAcross:{texture:(S??x).texture},uFlow:{texture:g.texture},uDirectional:S?1:0}),[b,k]=[k,b],t.onProgress?.((D+1)/mi);const w=u/6;await o("smooth",fi,k,{uU:{texture:b.texture},uDir:[1,0],uSigma:w}),await o("smooth",fi,b,{uU:{texture:k.texture},uDir:[0,1],uSigma:w});const T=Math.max(n,i)/512,M=Math.max(1,Math.round(n/T)),A=Math.max(1,Math.round(i/T)),P=r(M,A);await o("sample",Xs,P,{uU:{texture:b.texture},uStride:[n/M,i/A],uFieldSize:[n,i]});const _=e.read(P),L=new Float32Array(M*A);for(let D=0;D<L.length;D++)L[D]=qs(_[D*4],_[D*4+1]);L.sort();const F=new Float32Array(256);F[0]=1e9;for(let D=1;D<256;D++){const R=(1-D/255)*(L.length-1),I=Math.floor(R),N=Math.min(L.length-1,I+1);F[D]=L[I]+(L[N]-L[I])*(R-I)}F[255]=-1e9;for(const D of a)D!==b&&e.deleteTarget(D);return{target:b,width:n,height:i,thresholds:F}}catch(l){for(const u of a)e.deleteTarget(u);throw l}}const vt=1024,en=7,js=8,Vs=4.5,Ys=12e6,$a={id:"halftoneTuring",title:"AM: Turing pattern",stage:"halftone",parent:"halftone",description:"Winding lines grown like a natural pattern (zebra stripes, coral). Lines get thicker in darker areas and touch at 100%.",visibleWhen:e=>e.halftone?.type==="turing",settings:[{kind:"select",key:"size",label:"Pattern size",default:"tile",display:"segmented",options:[{value:"tile",label:"Repeating tile"},{value:"whole",label:"Whole image"}],help:"Repeating tile: grows in a few seconds; the pattern repeats about every 146 lines. Whole image: nothing repeats and lines can follow the image, but it is much slower (about 30–40 s per ink for a Letter page at 600 DPI on a laptop; less with one shared pattern, a wider spacing or a smaller size), uses a lot of graphics memory, and regrows whenever the output size changes."},{kind:"toggle",key:"shared",label:"Same pattern for all inks",default:!1,help:"On: every ink uses the same lines, so overlapping inks stack. Off: each ink gets its own pattern."},{kind:"number",key:"cellSize",label:"Line spacing",perInk:!0,default:8,min:3,max:48,step:.5,unit:"px",help:"Distance between line centers, in output pixels.",visibleWhen:e=>!e.shared},{kind:"number",key:"spacing",label:"Line spacing",default:8,min:3,max:48,step:.5,unit:"px",help:"Distance between line centers, in output pixels.",visibleWhen:e=>e.shared===!0},{kind:"number",key:"spots",label:"Lines ↔ spots",default:0,min:0,max:100,step:1,unit:"%",help:"0 = continuous lines; higher breaks them into irregular spots."},{kind:"number",key:"branching",label:"Branching",default:30,min:0,max:100,step:1,unit:"%",help:"How often lines split, merge and end."},{kind:"number",key:"order",label:"Order",default:0,min:0,max:100,step:1,unit:"%",help:"0 = a winding maze; 100 = long parallel lines in the chosen direction."},{kind:"number",key:"direction",label:"Direction",perInk:!0,linkInks:!1,default:0,slotDefaults:[0,45,90,135],min:0,max:180,step:1,unit:"°",help:"Which way ordered lines run.",visibleWhen:e=>!e.shared&&Number(e.order)>0},{kind:"number",key:"sharedDirection",label:"Direction",default:0,min:0,max:180,step:1,unit:"°",help:"Which way ordered lines run.",visibleWhen:e=>e.shared===!0&&Number(e.order)>0},{kind:"number",key:"wobble",label:"Wobble",default:20,min:0,max:100,step:1,unit:"%",help:"How much the lines bend and wander."},{kind:"number",key:"follow",label:"Follow image",default:50,min:0,max:100,step:1,unit:"%",help:"Lines run along edges and contours in the image. Regrows the pattern when the image changes.",visibleWhen:e=>e.size==="whole"},{kind:"seed",key:"seed",label:"Random seed",default:1},...ct().filter(e=>e.key!=="shape").map(e=>e.key==="maxDot"?{...e,label:"Maximum line width",help:"Widest line, as a share of the spacing. Below 100% even solid areas keep thin gaps."}:e.key==="curve"?{...e,label:"Line width curve",help:"Maps tone to line width. Pull the middle down for thinner lines in the midtones."}:e)]},Ks=e=>e*Math.PI/180;function Ct(e,t){const n=e.shared===!0,i=Array.from({length:W},(r,s)=>Math.max(1,Number(n?e.spacing:(e.cellSize??[])[s]??8))),a=Array.from({length:W},(r,s)=>Ks(Number(n?e.sharedDirection:(e.direction??[])[s]??0)));return{spacing:i.map((r,s)=>s<t?r:i[0]),direction:a}}function vi(e,t,n,i){return{spots:Number(e.spots)/100,branching:Number(e.branching)/100,order:Number(e.order)/100,direction:t,wobble:Number(e.wobble)/100,follow:i?Number(e.follow)/100:0,seed:n}}const tn=[];function bi(e,t){for(tn.push({gpu:e,prepared:t});tn.length>2;){const n=tn.shift();for(const i of n.prepared.fields)n.gpu.deleteTarget(i.target)}}let ki=0;function Js(e,t){const n=t.inkCount??1,{spacing:i,direction:a}=Ct(e,n),r=Number(e.follow)>0;return[t.outputWidth,t.outputHeight,e.shared,i.slice(0,n),a.slice(0,n),e.follow,r?t.imageKey:""]}const Ua={id:"turing",label:"AM: Turing pattern",section:$a,reach(e){const{spacing:t}=Ct(e,W);return Math.max(4,...t)*1.5},prepareKey(e,t){const n=e,i=[n.size,n.spots,n.branching,n.order,n.wobble,n.seed,n.shared];return JSON.stringify(n.size==="whole"?[...i,...Js(n,t)]:i)},async prepare(e,t){const n=e,i=t.gpu;if(!i)throw new Error("The Turing pattern needs the GPU");const a=++ki,r=()=>a!==ki,s=JSON.stringify([Ua.prepareKey(e,t)]),o=Number(n.seed);if(n.size!=="whole"){const v=await gi(i,{width:vt,height:vt,samples:en,periodic:!0,params:vi(n,0,o,!1),isCancelled:r,onProgress:t.progress}),b={key:s,fields:[v],samples:[en],spacing:[],fieldOf:[0,0,0,0],whole:!1};return bi(i,b),b}const l=t.inkCount??1,{spacing:u,direction:c}=Ct(n,l),h=n.shared===!0,p=h?1:l,d=Number(n.follow)>0&&!!t.analysis,m=[],f=[];try{for(let v=0;v<p;v++){const b=t.outputWidth/u[v],k=t.outputHeight/u[v],x=Math.min(js,Math.sqrt(Ys/(b*k))),S=Math.ceil(b*x)+2,y=Math.ceil(k*x)+2;if(x<Vs||Math.max(S,y)>i.maxTextureSize)throw new Error("The whole-image pattern is too large for this output size. Use a repeating tile, a wider line spacing, or a lower resolution");const w=d?t.analysis():null,T=await gi(i,{width:S,height:y,samples:x,periodic:!1,params:vi(n,c[v],o+v*101,d),orientation:w?{analysis:w,uvPerTexel:[u[v]/(x*t.outputWidth),u[v]/(x*t.outputHeight)],sigma:Math.max(1,2*u[v]/t.outputWidth*w.width)}:void 0,isCancelled:r,onProgress:M=>t.progress?.((v+M)/p)});m.push(T),f.push(x)}}catch(v){for(const b of m)i.deleteTarget(b.target);throw v}const g={key:s,fields:m,samples:f,spacing:u,fieldOf:Array.from({length:W},(v,b)=>h?0:Math.min(b,p-1)),whole:!0};return bi(i,g),g},glsl:`
${ht}
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
`,uniforms(e,t,n){const i=e,{spacing:a,direction:r}=Ct(i,t.inkCount),s=dt(i,t,"cellSize",null,{key:"turing",measure:()=>new Float32Array(256)}),o=Array.from({length:4},(b,k)=>Math.min(1,(t.minDot[k]??0)/a[k])),l=n,u=l?.fields??[],c=new Float32Array(256*4).fill(1e9);if(l)for(let b=0;b<4;b++){const k=u[l.fieldOf[b]];for(let x=0;x<256;x++)c[x*4+b]=k.thresholds[x]}const h=i.shared===!0,p=ke(Number(i.seed)*4099+11),d=[];for(let b=0;b<4;b++)d.push(p()*vt,p()*vt);const m=l?.whole??!1,f=Array.from({length:4},(b,k)=>m?l.samples[l.fieldOf[k]]/l.spacing[k]:en/a[k]),g=s.uLatCurve.texture,v=b=>({texture:(u[b]??u[0])?.target.texture??g});return{...s,uLatMinFrac:o,uTuField0:v(0),uTuField1:v(1),uTuField2:v(2),uTuField3:v(3),uTuFieldOf:l?.fieldOf??[0,0,0,0],uTuFieldSize:Array.from({length:4},(b,k)=>{const x=u[k]??u[0];return x?[x.width,x.height]:[1,1]}).flat(),uTuScale:f,uTuAngle:m?[0,0,0,0]:r,uTuOffset:m?[0,0,0,0,0,0,0,0]:h?Array.from({length:4},()=>[d[0],d[1]]).flat():d,uTuPeriodic:m?0:1,uTuTable:{texture:_n(t.gpu,`turing:${l?.key??"none"}`,256,1,c,4)}}}},yi=Math.SQRT1_2,Ba={id:"halftoneFm",title:"FM: blue noise",stage:"halftone",parent:"halftone",description:"Same-size dots, more of them in darker areas, spread evenly without clumps.",visibleWhen:e=>e.halftone?.type==="fm",settings:[{kind:"number",key:"dotSize",label:"Dot size",perInk:!0,default:2,min:1,max:12,step:.5,unit:"px",help:"In output pixels. Never smaller than the minimum dot size."},{kind:"select",key:"shape",label:"Dot shape",default:"round",display:"segmented",options:[{value:"round",label:"Round"},{value:"square",label:"Square"}]},{kind:"number",key:"minDensity",label:"Dot density in light areas",default:0,min:0,max:100,step:1,unit:"%",help:"Share of dots placed where the tone is lightest."},{kind:"number",key:"maxDensity",label:"Dot density in dark areas",default:100,min:0,max:100,step:1,unit:"%",help:"Share of dots placed where the tone is darkest."},{kind:"select",key:"mapSize",label:"Threshold map size",default:"128",display:"segmented",options:[{value:"64",label:"64"},{value:"128",label:"128"},{value:"256",label:"256"}],help:"Larger maps repeat less visibly but take longer to build (once, then cached)."},{kind:"number",key:"spread",label:"Filter spread",default:1.9,min:1,max:3,step:.1,help:"How far apart dots push each other while the map is built. Higher = smoother, more even spacing."},{kind:"seed",key:"seed",label:"Random seed",default:1}]};let xi=null;const nn=new Map;function Zs(e,t){const n=`${e}|${t}`;let i=nn.get(n);return i||(xi??=new Fn(new Worker(new URL(""+new URL("blueNoise.worker-hi6Eb3lr.js",import.meta.url).href,import.meta.url),{type:"module"})),i=xi.run({size:e,sigma:t}),i.catch(()=>nn.delete(n)),nn.set(n,i)),i}const wi=new WeakMap;function Qs(e,t){const n=wi.get(t);if(n&&n.gl===e)return n.texture;const i=e.createTexture();return e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texImage2D(e.TEXTURE_2D,0,e.R32F,t.size,t.size,0,e.RED,e.FLOAT,t.thresholds),wi.set(t,{gl:e,texture:i}),i}const eo={id:"fm",label:"FM: blue noise",section:Ba,prepareKey:e=>`${e.mapSize}|${e.spread}`,prepare:e=>Zs(Number(e.mapSize),e.spread),glsl:`
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
      if (dot(f, f) <= ${(yi*yi).toFixed(4)} && fmCellOn(ink, cell) > 0.5) return 1.0;
    }
  }
  return 0.0;
}
`,uniforms(e,t,n){const i=n?.size??1,a=ke(e.seed*7919+17),r=[];for(let s=0;s<4;s++)r.push(Math.floor(a()*i),Math.floor(a()*i));return{uFmMap:{texture:n?Qs(t.gpu.gl,n):Ti(t.gpu.gl)},uFmMapSize:i,uFmDot:Array.from({length:4},(s,o)=>Math.max(1,e.dotSize[o]??2,t.minDot[o]??0)),uFmOffset:r,uFmMin:e.minDensity/100,uFmMax:e.maxDensity/100,uFmRound:e.shape==="round"?1:0,uFmRoundDensity:{texture:n?to(t.gpu.gl,n):Ti(t.gpu.gl)}}}},Si=new WeakMap;function to(e,t){const n=Si.get(t);if(n&&n.gl===e)return n.texture;const i=t.roundCoverage,a=i.length-1,r=new Float32Array(256);for(let o=0;o<256;o++){const l=o/255;let u=0;for(;u<a&&i[u+1]<l;)u++;const c=i[u],h=i[Math.min(a,u+1)],p=h>c?(l-c)/(h-c):0;r[o]=Math.min(1,(u+Math.min(1,Math.max(0,p)))/a)}const s=e.createTexture();return e.bindTexture(e.TEXTURE_2D,s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texImage2D(e.TEXTURE_2D,0,e.R32F,256,1,0,e.RED,e.FLOAT,r),Si.set(t,{gl:e,texture:s}),s}const Ei=new WeakMap;function Ti(e){let t=Ei.get(e);return t||(t=e.createTexture(),e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(e.TEXTURE_2D,0,e.R32F,1,1,0,e.RED,e.FLOAT,new Float32Array([1])),Ei.set(e,t)),t}const Oa={id:"halftoneDiffusion",title:"FM: error diffusion",stage:"halftone",parent:"halftone",description:"Classic dithering: each dot passes its tone error to its neighbors. Fine, organic texture.",visibleWhen:e=>e.halftone?.type==="diffusion",settings:[{kind:"select",key:"kernel",label:"Kernel",default:"floyd",options:[{value:"floyd",label:"Floyd–Steinberg"},{value:"atkinson",label:"Atkinson (cleaner highlights and shadows)"},{value:"jarvis",label:"Jarvis (smoother)"},{value:"stucki",label:"Stucki (smoother, sharper)"}]},{kind:"number",key:"dotSize",label:"Dot size",default:2,min:1,max:12,step:.5,unit:"px",help:"In output pixels, for all inks. Never smaller than the largest minimum dot size."},{kind:"select",key:"shape",label:"Dot shape",default:"square",display:"segmented",options:[{value:"round",label:"Round"},{value:"square",label:"Square"}]},{kind:"toggle",key:"serpentine",label:"Serpentine scanning",default:!0,help:"Alternate direction on every row; avoids streaks."},{kind:"number",key:"noise",label:"Threshold noise",default:0,min:0,max:100,step:1,unit:"%",help:"Randomness in the on/off decision; breaks up worm-like patterns."},{kind:"seed",key:"seed",label:"Random seed",default:1}]},no={id:"diffusion",label:"FM: error diffusion",section:Oa,fromCoverage:{cell:(e,t)=>Math.max(1,Number(e.dotSize),...t.minDot.slice(0,t.inkCount)),async build(e,t,n,i,a,r){const s={kernel:String(e.kernel),serpentine:!!e.serpentine,noise:Number(e.noise)/100,seed:Number(e.seed)},o=await pt(r).run({kind:"diffusion",coverage:t,width:n,height:i,inkCount:a,options:s},{transfer:[t.buffer]});if(o.kind!=="diffusion")throw new Error("unexpected worker result");return o.bits}},glsl:`
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
`,uniforms(e,t,n,i){const a=t.gpu.gl,r=io.get(a,i??an,()=>{const o=i??an,l=a.createTexture();return a.bindTexture(a.TEXTURE_2D,l),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.pixelStorei(a.UNPACK_ALIGNMENT,4),a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,o.width,o.height,0,a.RGBA,a.UNSIGNED_BYTE,o.bits),l}),s=i??an;return{uEdBits:{texture:r},uEdGrid:[s.width,s.height],uEdCell:s.cell,uEdRound:e.shape==="round"?1:0}}},an={bits:new Uint8Array(4),width:1,height:1,cell:1},io=new mt,ao=512,ro=8,$e=33,za=3;function Mi(e){const t=Math.min(8,(e.shape===2?3.5:1)*(1+2*e.stretch)),n=Math.sqrt(t),i=1+.33*e.wobble+.3*e.rough+e.grain,a=e.bleed*.5,r=Math.exp(.7*e.sizeVar),s=1+.5*e.toneSize,o=Math.min(za,.5*r*s*n*i+a);return{major:n,minor:1/n,extent:i,bleed:a,reach:o}}const Wa={id:"halftoneStipple",title:"FM: stipple",stage:"halftone",parent:"halftone",description:"Hand-stippled dots with no grid: every dot a little different, more of them in darker areas.",visibleWhen:e=>e.halftone?.type==="stipple",settings:[{kind:"number",key:"dotSize",label:"Dot size",perInk:!0,default:4,min:1,max:24,step:.5,unit:"px",help:"Typical dot diameter in output pixels (at mid tones)."},{kind:"select",key:"shape",label:"Dot shape",default:"round",display:"segmented",options:[{value:"round",label:"Round"},{value:"chip",label:"Chip"},{value:"dash",label:"Dash"}],help:"Round: pen dots. Chip: angular flecks, like a carved block. Dash: short pen strokes."},{kind:"number",key:"sizeVariation",label:"Size variation",default:30,min:0,max:100,step:1,unit:"%",help:"Random difference in size from dot to dot."},{kind:"number",key:"toneSize",label:"Size follows tone",default:40,min:0,max:100,step:1,unit:"%",help:"Bigger dots in dark areas and smaller ones in light areas, like pressing harder with the pen."},{kind:"number",key:"irregularity",label:"Placement irregularity",default:25,min:0,max:100,step:1,unit:"%",help:"0 = evenly spaced; higher = looser, more random spacing with small gaps and clusters."},{kind:"number",key:"wobble",label:"Shape wobble",default:35,min:0,max:100,step:1,unit:"%",help:"How lumpy and uneven each dot's outline is."},{kind:"number",key:"roughness",label:"Edge roughness",default:20,min:0,max:100,step:1,unit:"%",help:"Fine ragged detail along each dot's edge."},{kind:"number",key:"stretch",label:"Stretch",default:0,min:0,max:100,step:1,unit:"%",help:"Makes dots longer in one direction."},{kind:"number",key:"direction",label:"Direction",default:30,min:0,max:180,step:1,unit:"°",visibleWhen:e=>Number(e.stretch)>0||e.shape==="dash"},{kind:"number",key:"directionVariation",label:"Direction variation",default:100,min:0,max:100,step:1,unit:"%",help:"0 = every dot at the same angle (a steady hand); 100 = any angle.",visibleWhen:e=>Number(e.stretch)>0||e.shape==="dash"},{kind:"number",key:"bleed",label:"Ink bleed",default:0,min:0,max:100,step:1,unit:"%",help:"Nearby dots flow into each other, like wet ink."},{kind:"number",key:"grain",label:"Ink grain",default:0,min:0,max:100,step:1,unit:"%",help:"Gritty, uneven ink: pitted edges and specks of paper inside dots."},{kind:"seed",key:"seed",label:"Random seed",default:1}]},so={round:0,chip:1,dash:2};function je(e){return{shape:so[String(e.shape)]??0,sizeVar:Number(e.sizeVariation)/100,toneSize:Number(e.toneSize)/100,wobble:Number(e.wobble)/100,rough:Number(e.roughness)/100,stretch:Number(e.stretch)/100,dirAngle:Number(e.direction)*Math.PI/180,dirVar:Number(e.directionVariation)/100,bleed:Number(e.bleed)/100,grain:Number(e.grain)/100}}let Ve=null;function oo(e){if(Ve?.irregularity!==e){const t=pt("stipple").run({kind:"stipplePoints",irregularity:e}).then(i=>{if(i.kind!=="stipplePoints")throw new Error("unexpected worker result");return i.data}),n={irregularity:e,data:t};Ve=n,t.catch(()=>{Ve===n&&(Ve=null)})}return Ve.data}const Y=ao,Me=ro,lo={id:"stipple",label:"FM: stipple",section:Wa,reach(e,t){const n=Mi(je(e)),i=e.dotSize.slice(0,t.inkCount);return Math.max(...i.map((a,r)=>Math.max(1,a,t.minDot[r]??0)))*(n.reach+1)},prepareKey:e=>JSON.stringify([e.irregularity,je(e)]),async prepare(e){const t=Number(e.irregularity)/100,n=await oo(t),i=await pt("stipple").run({kind:"stippleMeasure",irregularity:t,params:je(e)});if(i.kind!=="stippleMeasure")throw new Error("unexpected worker result");return{points:n,table:i.table,key:JSON.stringify([t,je(e)])}},glsl:`
uniform sampler2D uStPoints;   // ${Y*Me} × ${Y}: per bucket ${Me} slots of (x, y, rank hi, rank lo)
uniform sampler2D uStTable;    // ${$e} × 1: tone → rank threshold
uniform vec4 uStDot;           // dot size per ink, output px
uniform vec4 uStMinFrac;       // minimum dot / dot size, per ink
uniform vec2 uStOffset[4];     // per-ink view into the point set (dot units, ≥ ${Y})
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
  float x = clamp(c, 0.0, 1.0) * ${($e-1).toFixed(1)};
  int i = int(floor(x));
  float a = texelFetch(uStTable, ivec2(min(i, ${$e-1}), 0), 0).r;
  float b = texelFetch(uStTable, ivec2(min(i + 1, ${$e-1}), 0), 0).r;
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
    int wy = by % ${Y};
    for (int bx = lo.x; bx <= hi.x; bx++) {
      int wx = bx % ${Y};
      uint salt = stHash(uint(bx / ${Y}) * 0x9E3779B1u ^ uint(by / ${Y}) * 0x85EBCA77u ^ uint(ink) * 0xC2B2AE3Du ^ uint(uStSeed) * 0x27D4EB2Fu);
      for (int j = 0; j < ${Me}; j++) {
        vec4 s = texelFetch(uStPoints, ivec2(wx * ${Me} + j, wy), 0) * 255.0;
        float rank16 = s.b * 256.0 + s.a;
        if (rank16 > 65534.5) break;
        vec2 center = vec2(float(bx), float(by)) + (s.rg + 0.5) / 255.0;
        vec2 v = q - center;
        if (dot(v, v) > reach2) continue;
        // Each dot takes the tone at its own center, so dots are never cut in half by an edge.
        float ci = htCoverage(ink, (center - uStOffset[ink]) * D);
        if (ci <= 0.002 || rank16 / 65535.0 >= stThreshold(ci)) continue;
        uint id = uint((wy * ${Y} + wx) * ${Me} + j);
        acc = stSmin(acc, stSdf(v, ci, stHash(id ^ salt), uStMinFrac[ink]), uStBleed * 0.5);
        if (acc < 0.0) return 1.0;
      }
    }
  }
  return 0.0;
}
`,uniforms(e,t,n){const i=e,a=je(i),r=Mi(a),s=t.gpu.gl,o=ke(Number(i.seed)*6151+29),l=[];for(let h=0;h<4;h++)l.push(Y+o()*Y,Y+o()*Y);const u=Array.from({length:4},(h,p)=>Math.max(1,i.dotSize[p]??4,t.minDot[p]??0)),c=n?.table??ho;return{uStPoints:{texture:po(s,n?.points??co())},uStTable:{texture:_n(t.gpu,`stipple:${n?.key??"none"}`,$e,1,c)},uStDot:u,uStMinFrac:u.map((h,p)=>Math.min(1,(t.minDot[p]??0)/h)),uStOffset:l,uStSeed:Number(i.seed)&2147483647,uStShape:a.shape,uStReach:Math.min(za,r.reach),uStSizeVar:a.sizeVar,uStToneSize:a.toneSize,uStWobble:a.wobble,uStRough:a.rough,uStDirAngle:a.dirAngle,uStDirVar:a.dirVar,uStBleed:a.bleed,uStGrain:a.grain,uStMajor:r.major,uStMinor:r.minor,uStExtent:r.extent}}};let uo=null;const co=()=>uo??=new Uint8Array(Y*Me*Y*4).fill(255),ho=new Float32Array($e).fill(-1),mo=new mt;function po(e,t){return mo.get(e,t,()=>{const n=e.createTexture();return e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,Y*Me,Y,0,e.RGBA,e.UNSIGNED_BYTE,t),n})}const Ga=[Ds,gs,ks,Cs,Es,Ua,eo,lo,no],fo=[Da,Ia,Aa,Pa,La,$a,Ba,Wa,Oa],go={AM:"Amplitude (AM): dot size shows tone",FM:"Frequency (FM): dot count shows tone"},vo=[{value:"none",label:"None (printer halftone)"},...Ga.map(e=>{const[,t="",n=e.label]=/^(AM|FM): (.*)$/.exec(e.label)??[];return{value:e.id,label:n.charAt(0).toUpperCase()+n.slice(1),group:go[t]}})];function bo(e){return Ga.find(t=>t.id===e)??null}class st extends Error{constructor(t){super(t),this.name="GLError"}}function Xa(e,t){const n=e.getContext("webgl2",t);if(!n)throw new st("This browser doesn't support WebGL2, which Photo Inker needs.");return n}function Ri(e,t,n){const i=e.createShader(t);if(!i)throw new st("Couldn't create shader");if(e.shaderSource(i,n),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS)){const a=e.getShaderInfoLog(i);throw e.deleteShader(i),new st(`Shader compile failed: ${a}`)}return i}function Bn(e,t,n){const i=e.createProgram();if(!i)throw new st("Couldn't create program");const a=Ri(e,e.VERTEX_SHADER,t),r=Ri(e,e.FRAGMENT_SHADER,n);if(e.attachShader(i,a),e.attachShader(i,r),e.linkProgram(i),e.deleteShader(a),e.deleteShader(r),!e.getProgramParameter(i,e.LINK_STATUS)){const s=e.getProgramInfoLog(i);throw e.deleteProgram(i),new st(`Program link failed: ${s}`)}return i}function Ha(e,t,n){const i={};for(const a of n)i[a]=e.getUniformLocation(t,a);return i}const On=`#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`,re=`
vec3 linearToSrgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  vec3 lo = c * 12.92;
  vec3 hi = 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055;
  return mix(hi, lo, vec3(lessThanEqual(c, vec3(0.0031308))));
}
`,ft=`
vec3 srgbToLinear(vec3 c) {
  vec3 lo = c / 12.92;
  vec3 hi = pow((c + 0.055) / 1.055, vec3(2.4));
  return mix(hi, lo, vec3(lessThanEqual(c, vec3(0.04045))));
}
`,qa=["luma","lstar","red","green","blue","max","min"],ja=`
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
`;const J=5;function ko(e,t){switch(e){case"rgb":return["Red (inverted)","Green (inverted)","Blue (inverted)"];case"cmyk":return["Cyan","Magenta","Yellow","Black"];case"lab":return t?["Lightness (inverted)","a+ (red)","a− (green)","b+ (yellow)","b− (blue)"]:["Lightness (inverted)","a","b"];case"hsl":return["Hue","Saturation","Lightness (inverted)"];default:return t?["Luma (inverted)","Cb+ (blue)","Cb− (yellow)","Cr+ (red)","Cr− (green)"]:["Luma (inverted)","Cb","Cr"]}}const yo=[{value:"none",label:"Dropped"},{value:"0",label:"Ink 1"},{value:"1",label:"Ink 2"},{value:"2",label:"Ink 3"},{value:"3",label:"Ink 4"}],_t=[];for(let e=0;e<J;e++)_t.push({kind:"select",key:`ch${e}Ink`,label:`Channel ${e+1} ink`,default:e<W?String(e):"none",options:yo,hidden:!0},{kind:"number",key:`ch${e}Intensity`,label:`Channel ${e+1} intensity`,default:100,min:0,max:300,step:1,hidden:!0},{kind:"number",key:`ch${e}Opacity`,label:`Channel ${e+1} opacity`,default:100,min:0,max:100,step:1,hidden:!0});for(let e=0;e<W;e++){for(let t=0;t<J;t++)_t.push({kind:"number",key:`m${e}_${t}`,label:`Ink ${e+1} ← channel ${t+1}`,default:e===t?1:0,min:-2,max:2,step:.01,hidden:!0});_t.push({kind:"number",key:`m${e}_offset`,label:`Ink ${e+1} offset`,default:0,min:-1,max:1,step:.01,hidden:!0})}const Va={id:"splitChannel",title:"Channel Split",stage:"split",parent:"split",description:"Turns each channel of a color space into an ink. Quick full-color approximations, CMY-like ink sets, and experimental color shifts.",visibleWhen:e=>e.split?.method==="channel",settings:[{kind:"select",key:"space",label:"Color space",default:"cmyk",options:[{value:"rgb",label:"RGB (inverted)"},{value:"cmyk",label:"CMYK"},{value:"lab",label:"Lab"},{value:"hsl",label:"HSL"},{value:"ycbcr",label:"YCbCr"}]},{kind:"number",key:"blackGeneration",label:"Black generation",default:50,min:0,max:100,step:1,unit:"%",help:"How much of the dark tones move from C, M, and Y to the black channel.",visibleWhen:e=>e.space==="cmyk"},{kind:"toggle",key:"splitSigned",label:"Split a/b into + and − halves",default:!0,help:"So one axis can drive two inks, e.g. a+ to a red ink and a− to a green one.",visibleWhen:e=>e.space==="lab"||e.space==="ycbcr"},{kind:"select",key:"blend",label:"Merging channels into one ink",default:"add",options:[{value:"add",label:"Add"},{value:"max",label:"Max"},{value:"average",label:"Average"},{value:"screen",label:"Screen"}],visibleWhen:e=>!e.advanced},{kind:"toggle",key:"advanced",label:"Advanced mixer matrix",default:!1,hidden:!0},..._t]},xo={rgb:0,cmyk:1,lab:2,hsl:3,ycbcr:4},wo={add:0,max:1,average:2,screen:3},So=`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uImage;
uniform vec2 uSize;
uniform int uSpace;
uniform float uBlackGen;
uniform int uSplit;
uniform int uAdvanced;
uniform int uBlend;
uniform float uChInk[${J}];     // target ink per channel (-1 = dropped)
uniform float uChGain[${J}];
uniform float uChOpacity[${J}];
uniform float uMatrix[${W*J}];
uniform vec4 uOffset;
uniform int uInkCount;
out vec4 outColor;
${re}

float labF(float t) { return t > 0.008856 ? pow(t, 1.0 / 3.0) : 7.787 * t + 16.0 / 116.0; }

// Channel values 0..1 (signed ones -1..1 before splitting). Unused slots are 0.
void channels(vec3 lin, out float ch[${J}]) {
  for (int i = 0; i < ${J}; i++) ch[i] = 0.0;
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
  float ch[${J}];
  channels(t.rgb, ch);
  vec4 ink = vec4(0.0);
  if (uAdvanced == 1) {
    for (int i = 0; i < ${W}; i++) {
      float v = uOffset[i];
      for (int c = 0; c < ${J}; c++) v += uMatrix[i * ${J} + c] * ch[c];
      ink[i] = v;
    }
  } else {
    vec4 count = vec4(0.0);
    vec4 keep = vec4(1.0); // for screen: product of (1 - v)
    for (int c = 0; c < ${J}; c++) {
      int target = int(uChInk[c]);
      if (target < 0 || target >= ${W}) continue;
      float v = clamp(ch[c] * uChGain[c], 0.0, 1.0) * uChOpacity[c];
      if (uBlend == 1) ink[target] = max(ink[target], v);
      else if (uBlend == 3) keep[target] *= 1.0 - v;
      else ink[target] += v;
      count[target] += 1.0;
    }
    if (uBlend == 2) ink /= max(count, vec4(1.0));
    if (uBlend == 3) ink = 1.0 - keep;
  }
  for (int i = 0; i < ${W}; i++) if (i >= uInkCount) ink[i] = 0.0;
  outColor = clamp(ink, 0.0, 1.0);
}
`,Ye=(e,t,n=0)=>typeof e[t]=="number"?e[t]:n,Eo={id:"channel",label:"Channel Split",section:Va,dependsOn:()=>null,render(e,t,n,i){const a=i,r=[],s=[],o=[];for(let c=0;c<J;c++){const h=String(a[`ch${c}Ink`]??"none");r.push(h==="none"?-1:Number(h)),s.push(Ye(a,`ch${c}Intensity`,100)/100),o.push(Ye(a,`ch${c}Opacity`,100)/100)}const l=[],u=[];for(let c=0;c<W;c++){for(let h=0;h<J;h++)l.push(Ye(a,`m${c}_${h}`));u.push(Ye(a,`m${c}_offset`))}e.gpu.pass(So,n,{uImage:{texture:t.texture},uSize:[n.width,n.height],uSpace:xo[String(a.space)]??1,uBlackGen:Ye(a,"blackGeneration",50)/100,uSplit:a.splitSigned?1:0,uAdvanced:a.advanced?1:0,uBlend:wo[String(a.blend)]??0,uChInk:r,uChGain:s,uChOpacity:o,uMatrix:l,uOffset:u,uInkCount:e.inkCount})}};function It(e,t,n,i){const a=Math.min(t,n)/100,r=e.frame==="ink"?1:e.frame==="paper"?2:0,s=r===0?0:e.frameThickness*a,o=Math.max(0,s),l=Math.min(Math.max(0,-s),Math.min(t,n)/2),u=[l,l,t-l,n-l],c=r===0?0:Math.min(e.frameRadius*a,Math.min(u[2]-u[0],u[3]-u[1])/2);return{margin:o,canvas:[-o,-o,t+o,n+o],inner:u,radius:c,mode:r,ink:Math.max(0,Math.min(i-1,Number(e.frameInk)||0))}}const nt=256;function To(e){let t;if(e.fadeCurve==="linear")t=s=>1-s;else if(e.fadeCurve==="exponential")t=s=>1-(Math.exp(4*s)-1)/(Math.exp(4)-1);else if(e.fadeCurve==="custom"){const s=Re(e.fadeCustom,1024);t=o=>s[Math.min(1023,Math.max(0,Math.round(o*1023)))]}else t=s=>1-s*s*(3-2*s);let n=.5;for(let s=1;s<=1024;s++){const o=(s-1)/1024,l=s/1024,u=t(o)-.5,c=t(l)-.5;if(u===0){n=o;break}if(u>0&&c<=0||u<0&&c>=0){n=o+(l-o)*u/(u-c);break}}n=Math.min(.999,Math.max(.001,n));const i=Math.min(.95,Math.max(.05,e.fadeMidpoint/100)),a=Math.log(n)/Math.log(i),r=new Float32Array(nt);for(let s=0;s<nt;s++){const o=s/(nt-1);r[s]=Math.min(1,Math.max(0,t(Math.pow(o,a))))}return r[0]=1,r[nt-1]=0,r}const Xt=`
float roundedRectSdf(vec2 p, vec4 rect, float r) {
  vec2 c = (rect.xy + rect.zw) * 0.5;
  vec2 q = abs(p - c) - (rect.zw - rect.xy) * 0.5 + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}
`,Ya=`
uniform vec4 uFrameCanvas;   // canvas rect
uniform vec4 uFrameInner;    // image opening
uniform float uFrameRadius;
uniform int uFrameMode;      // 0 none, 1 solid ink, 2 paper
uniform int uFrameInk;
bool frameOutsideCanvas(vec2 ip) { return any(lessThan(ip, uFrameCanvas.xy)) || any(greaterThanEqual(ip, uFrameCanvas.zw)); }
bool frameCovers(vec2 ip) { return uFrameMode != 0 && roundedRectSdf(ip, uFrameInner, uFrameRadius) > 0.0; }
int frameMask() { return uFrameMode == 1 ? (1 << uFrameInk) : 0; }
`;function Ka(e){return{uFrameCanvas:e.canvas,uFrameInner:e.inner,uFrameRadius:e.radius,uFrameMode:e.mode,uFrameInk:e.ink}}const Mo={smooth:.6,uncoated:1,recycled:1.4},Ro={top:0,bottom:1,left:2,right:3},Co={fractal:1,streaks:2,edge:3};function Io(e){return e.printSim.enabled&&(e.simLowInk.on||e.simSpecks.on&&e.simSpecks.placement==="near")}function Ao(e,t,n,i){if(!e.printSim.enabled)return 0;let a=0;const r=e.simMisreg;return r.on&&(a+=r.shift*Math.SQRT2+r.rotation*Math.PI/180*Math.hypot(t,n)*.5*i),e.simGain.on&&(a+=2),a/i+1}function Ci(e,t,n,i,a,r){const s=e.upload.mode==="print",o=s&&e.export.printTarget==="riso",l=e.printSim.enabled&&(t==="digital"||t==="preview"&&!(s&&!o)),u=o&&e.export.gainCompensation&&(t==="riso"||t==="preview"),c=e.simGain,h=A=>(c.amount[A]??0)/100*(Mo[c.paper]??1),p=A=>[0,1,2,3].map(A),d=e.simMisreg,m=ke(d.seed*9973+5),f=[],g=[];for(let A=0;A<4;A++){const P=m()*2*Math.PI,_=Math.sqrt(m())*d.shift;f.push(l&&d.on?_*Math.cos(P):0,l&&d.on?_*Math.sin(P):0),g.push(l&&d.on?(m()*2-1)*(d.rotation*Math.PI/180):0)}const v=e.simLowInk,b=Math.min(n,i),k=ke(v.seed*7919+3),x=[k()*1e3,k()*1e3],S=[];for(let A=0;A<4;A++)S.push(...v.shared?x:[k()*1e3,k()*1e3]);const y=e.simSpecks,w=Math.min(y.minSize,y.maxSize),T=Math.max(y.minSize,y.maxSize),M=Math.max(24,T*4);return{uSimOn:l?1:0,uSimShift:f,uSimRot:g,uSimCenter:[n*a/2,i*a/2],uSimGain:p(A=>l&&c.on?h(A):0),uSimComp:p(A=>u?h(A):0),uSimCurve:c.curve==="midtone"?1:0,uSimRough:l&&c.on?c.roughness/100*1.5:0,uSimPatch:l&&v.on&&v.intensity>0?Co[v.shape]??1:0,uSimPatchIntensity:v.intensity/100,uSimPatchSize:Math.max(1,v.size/100*b),uSimOctaves:Math.round(v.detail),uSimPersistence:.3+.4*(v.roughness/100),uSimStreakDir:v.direction*Math.PI/180,uSimStreakLen:v.streakLength,uSimStreakFreq:v.frequency,uSimEdgeSide:Ro[v.side]??3,uSimEdgeFalloff:Math.max(1,v.falloff/100*(v.side==="top"||v.side==="bottom"?i:n)),uSimInfluence:v.influence/100,uSimSoftness:v.softness/100,uSimPatchOffset:S,uSimDensity:{texture:r},uSimImageSize:[n,i],uSimOutScale:a,uSimSpecks:l&&y.on&&y.density>0?1:0,uSimSpeckInk:p(A=>y.ink[A]?1:0),uSimSpeckCell:M,uSimSpeckProb:Math.min(1,y.density*M*M/1e6),uSimSpeckMin:w,uSimSpeckMax:T,uSimSpeckExtra:y.extra/100,uSimSpeckClump:y.clumping/100,uSimSpeckNear:y.placement==="near"?1:0,uSimSpeckOpacity:y.opacity/100,uSimSeed:y.seed&65535}}function zn(e){return e?Po:Lo}const Ja=`
float simGainCurve(float c, float a) { return uSimCurve == 1 ? c + 4.0 * a * c * (1.0 - c) : min(1.0, c * (1.0 + 2.0 * a)); }
float simGainInverse(float y, float a) {
  if (a <= 0.0) return y;
  if (uSimCurve == 1) {
    float b = 1.0 + 4.0 * a;
    return (b - sqrt(max(0.0, b * b - 16.0 * a * y))) / (8.0 * a);
  }
  return y / (1.0 + 2.0 * a);
}
`,Lo=`
uniform int uSimOn;
uniform vec4 uSimComp;
uniform int uSimCurve;
uniform vec2 uSimImageSize;
uniform float uSimOutScale;
${Ja}
vec2 simWarp(int ink, vec2 op, bool ragged) { return op; }
float simTone(int ink, float c) { return clamp(simGainInverse(c, uSimComp[ink]), 0.0, 1.0); }
float simPatchLost(int ink, vec2 op) { return 0.0; }
int simSpeck(int ink, vec2 op) { return 0; }
bool simApply(int ink, vec2 op, float lost, bool on) { return on; }
`,Po=`
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

${Ja}
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
`,Ht=`
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
`,No=["uTable","uInkCount","uPaperSrgb","uInkSrgb"];function Do(e,t,n,i){const a=new Float32Array(48);a.set(n.colors.subarray(0,Math.min(n.colors.length,48))),e.uniform3fv(t.uTable,a),e.uniform1i(t.uInkCount,n.inkCount);const r=o=>{const l=ee(o)??{r:0,g:0,b:0};return[l.r/255,l.g/255,l.b/255]};e.uniform3fv(t.uPaperSrgb,r(i.paper));const s=new Float32Array(W*3);i.inks.forEach((o,l)=>s.set(r(o.hex),l*3)),e.uniform3fv(t.uInkSrgb,s)}const xe=`#version 300 es
precision highp float;
precision highp int;
uniform vec2 uSize;
out vec4 outColor;
`,bt=`${xe}
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
`,_o=`${xe}
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
${re}
${ft}
${Xt}
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
`,Ft=`${xe}
uniform sampler2D uImage;
uniform vec2 uDir;      // (1,0) or (0,1)
uniform float uSigma;   // blur radius in pixels
uniform float uRange;   // how different (in sRGB) a neighbor can be and still blend
${re}
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
`,Ii=`${xe}
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
`,Ai=`${xe}
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
`,Fo=e=>`${xe}
uniform sampler2D uCoverage;
uniform sampler2D uImage;   // for transparency: transparent pixels get no ink
uniform vec4 uVisible;      // solo/mute: 1 = shown
uniform vec4 uRegionPx;     // image px this pass covers: x, y, width, height
${ft}
${Ht}
${zn(e)}
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
`,$o=`${xe}
uniform sampler2D uImage;
uniform int uSource;
${re}
${ja}
void main() {
  vec4 t = texture(uImage, gl_FragCoord.xy / uSize);
  outColor = vec4(clamp(lightness(t.rgb, uSource), 0.0, 1.0), 0.0, 0.0, t.a);
}
`,Uo=`${xe}
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
`,Za={id:"splitDetail",title:"Detail Split",stage:"split",parent:"split",description:"Fine detail goes to one ink; a blurred base is split by another method. Keeps images sharp despite misregistration.",visibleWhen:e=>e.split?.method==="detail",settings:[{kind:"select",key:"baseMethod",label:"Method for the base",default:"inkMatching",options:[{value:"inkMatching",label:"Ink Matching"},{value:"toneMap",label:"Tone Map"},{value:"channel",label:"Channel Split"},{value:"selective",label:"Selective Color"}],help:"Uses that method's own settings (choose it as the method above to adjust them)."},{kind:"number",key:"radius",label:"Split radius",default:3,min:.5,max:30,step:.5,help:"What counts as detail: features smaller than this go to the detail ink. Measured in thousandths of the image's long edge."},{kind:"select",key:"detailMode",label:"Detail",default:"highpass",display:"segmented",options:[{value:"highpass",label:"High-pass"},{value:"lineart",label:"Line art"},{value:"edges",label:"Edges"}]},{kind:"number",key:"contrast",label:"Detail contrast",default:150,min:0,max:400,step:5,unit:"%"},{kind:"number",key:"threshold",label:"Detail threshold",default:5,min:0,max:100,step:1,unit:"%"},{kind:"select",key:"detailInk",label:"Detail ink",default:"auto",inkChoice:!0,options:[{value:"auto",label:"Auto (darkest ink)"},{value:"0",label:"Ink 1"},{value:"1",label:"Ink 2"},{value:"2",label:"Ink 3"},{value:"3",label:"Ink 4"}]}]},vn=(e,t,n=0)=>typeof e[t]=="number"?e[t]:n;function Ue(e){const t=String(e.baseMethod??"inkMatching");return or(t==="detail"?"inkMatching":t)}const Ke=(e,t)=>t.settingsOf(Ue(e).section.id);function Li(e,t){const n=String(e.detailInk??"auto");if(n!=="auto")return Math.min(Number(n),t.inkCount-1);let i=0,a=1/0;return t.inks.forEach((r,s)=>{const o=He(ee(r.hex)??{r:0,g:0,b:0}).l;o<a&&(a=o,i=s)}),i}const Pi=(e,t)=>vn(e,"radius",3)*t.imageLongEdge/1e3,Bo=`#version 300 es
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
${re}
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
`,Ni=new WeakMap,Oo={id:"detail",label:"Detail Split",section:Za,dependsOn(e,t){const n=t,i=Ue(n),a=Ke(n,e);return{base:i.id,values:a,dependency:i.dependsOn(e,a),detailInk:Li(n,e)}},needsPrepare(e,t){const n=Ue(e);return!!n.prepare&&(n.needsPrepare?.(Ke(e,t),t)??!0)},prepare(e,t,n){return Ue(e).prepare(Ke(e,t),t,n)},reach(e,t){const n=e,i=Ue(n);return Pi(n,t)*2.5+(i.reach?i.reach(Ke(n,t),t):0)+2},render(e,t,n,i,a){const r=i,s=e.gpu;let o=Ni.get(s);o||Ni.set(s,o={blurA:null,blurB:null,base:null});const{width:l,height:u}=t;o.blurA=s.ensureTarget(o.blurA,l,u,"image"),o.blurB=s.ensureTarget(o.blurB,l,u,"image"),o.base=s.ensureTarget(o.base,l,u,"coverage");const h={uSigma:Math.max(.5,Pi(r,e)*e.texelScale),uRange:100,uSize:[l,u]};s.pass(Ft,o.blurA,{...h,uImage:{texture:t.texture},uDir:[1,0]}),s.pass(Ft,o.blurB,{...h,uImage:{texture:o.blurA.texture},uDir:[0,1]}),Ue(r).render(e,o.blurB,o.base,Ke(r,e),a),s.pass(Bo,n,{uImage:{texture:t.texture},uBlurred:{texture:o.blurB.texture},uBase:{texture:o.base.texture},uSize:[l,u],uMode:{highpass:0,lineart:1,edges:2}[String(r.detailMode)]??0,uContrast:vn(r,"contrast",150)/100,uThreshold:vn(r,"threshold",5)/100,uDetailInk:Math.max(0,Math.min(W-1,Li(r,e)))})}},Qa={id:"splitInkMatching",title:"Ink Matching",stage:"split",parent:"split",description:"Finds the mix of your inks that best matches each color. Realistic photo reproduction with any ink set.",visibleWhen:e=>e.split?.method==="inkMatching",settings:[{kind:"number",key:"priority",linkInks:!1,label:"Ink priority",perInk:!0,default:50,min:0,max:100,step:1,help:"When several ink mixes would match a color, inks with higher priority are used first."},{kind:"number",key:"sparsity",label:"Prefer fewer inks",default:25,min:0,max:100,step:1,unit:"%",help:"Higher values use fewer overlapping inks per spot, for cleaner, less muddy color."},{kind:"select",key:"gamut",label:"Colors the inks can't reach",default:"compress",display:"segmented",options:[{value:"compress",label:"Compress"},{value:"clip",label:"Clip"}],help:"Compress matches colors relative to the paper (white in the image stays bare paper) and fits the full light-to-dark range into what the inks can print, keeping shadow detail. Clip matches exact colors, using the closest mix for each."},{kind:"number",key:"balance",label:"Preserve lightness ↔ hue",default:50,min:0,max:100,step:1,help:"Left keeps lightness accurate; right keeps hue accurate."}]},zo=17,Wo=33;let Di=null;function Go(){return Di??=new Fn(new Worker(new URL(""+new URL("inkMatch.worker-DcQGNRBs.js",import.meta.url).href,import.meta.url),{type:"module"})),Di}const Xo=`#version 300 es
precision highp float;
precision highp sampler3D;
uniform sampler2D uImage;
uniform sampler3D uLut;
uniform float uLutSize;
uniform vec2 uSize;
out vec4 outColor;
${re}
void main() {
  vec2 uv = gl_FragCoord.xy / uSize;
  vec3 s = linearToSrgb(texture(uImage, uv).rgb);
  outColor = texture(uLut, (s * (uLutSize - 1.0) + 0.5) / uLutSize);
}
`,Ho=new mt;function qo(e,t){return Ho.get(e,t,()=>{const n=e.createTexture();return e.bindTexture(e.TEXTURE_3D,n),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_R,e.CLAMP_TO_EDGE),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage3D(e.TEXTURE_3D,0,e.RGBA8,t.size,t.size,t.size,0,e.RGBA,e.UNSIGNED_BYTE,t.lut),n})}const jo={id:"inkMatching",label:"Ink Matching",section:Qa,dependsOn:e=>({paper:e.paper,inks:e.inks}),async prepare(e,t,n){return Go().run({size:n==="draft"?zo:Wo,options:{inkCount:t.inkCount,table:Float32Array.from(t.table.colors),priority:e.priority.slice(0,t.inkCount).map(i=>i/100),sparsity:e.sparsity/100,balance:e.balance/100,compress:e.gamut==="compress"}})},render(e,t,n,i,a){a&&e.gpu.pass(Xo,n,{uImage:{texture:t.texture},uLut:{texture:qo(e.gpu.gl,a),target:"3d"},uLutSize:a.size,uSize:[n.width,n.height]})}},K=6,er=[{value:"0",label:"Ink 1"},{value:"1",label:"Ink 2"},{value:"2",label:"Ink 3"},{value:"3",label:"Ink 4"}],_i=["Hue","Width","SatMin","SatMax","LightMin","LightMax","Feather","Ink"],tr=[];for(let e=0;e<K;e++)tr.push({kind:"number",key:`r${e}Hue`,label:"Hue center",default:[0,120,240,60,180,300][e],min:0,max:360,step:1,unit:"°",hidden:!0},{kind:"number",key:`r${e}Width`,label:"Hue width",default:40,min:2,max:180,step:1,unit:"°",hidden:!0},{kind:"number",key:`r${e}SatMin`,label:"Saturation from",default:20,min:0,max:100,step:1,unit:"%",hidden:!0},{kind:"number",key:`r${e}SatMax`,label:"Saturation to",default:100,min:0,max:100,step:1,unit:"%",hidden:!0},{kind:"number",key:`r${e}LightMin`,label:"Lightness from",default:5,min:0,max:100,step:1,unit:"%",hidden:!0},{kind:"number",key:`r${e}LightMax`,label:"Lightness to",default:95,min:0,max:100,step:1,unit:"%",hidden:!0},{kind:"number",key:`r${e}Feather`,label:"Feather",default:30,min:0,max:100,step:1,unit:"%",hidden:!0},{kind:"select",key:`r${e}Ink`,label:"Ink",default:String(Math.min(e+1,W-1)),options:er,hidden:!0});const nr={id:"splitSelective",title:"Selective Color",stage:"split",parent:"split",description:"Pick color ranges and send each to an ink; everything else can go to a base ink. Spot-color accents and one color on a black-and-white image.",visibleWhen:e=>e.split?.method==="selective",settings:[{kind:"number",key:"rangeCount",label:"Ranges",default:1,min:0,max:K,step:1,hidden:!0},{kind:"select",key:"maskPreview",label:"Mask preview",default:"none",hidden:!0,options:[{value:"none",label:"Off"},...Array.from({length:K},(e,t)=>({value:String(t),label:`Range ${t+1}`}))]},...tr,{kind:"select",key:"densitySource",label:"Ink amount in a range comes from",default:"saturation",display:"segmented",options:[{value:"saturation",label:"Saturation"},{value:"lightness",label:"Darkness"},{value:"constant",label:"Constant"}]},{kind:"select",key:"baseInk",label:"Base ink (everything else)",default:"auto",inkChoice:!0,options:[{value:"none",label:"None (paper)"},{value:"auto",label:"Auto (darkest ink)"},...er],help:"Prints the rest of the image as a grayscale in this ink."}]},ce=(e,t,n=0)=>typeof e[t]=="number"?e[t]:n;function Fi(e,t){const n=String(e.baseInk??"auto");if(n==="none")return-1;if(n!=="auto")return Number(n)<t.inkCount?Number(n):-1;let i=-1,a=1/0;return t.inks.forEach((r,s)=>{const o=He(ee(r.hex)??{r:0,g:0,b:0}).l;o<a&&(a=o,i=s)}),i}const ir=`
uniform int uRangeCount;
uniform float uHue[${K}];
uniform float uWidth[${K}];
uniform vec4 uLimits[${K}];  // sat min, sat max, light min, light max (0..1)
uniform float uFeather[${K}]; // 0..1
${re}

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
`,Vo=`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uImage;
uniform vec2 uSize;
uniform float uInk[${K}];
uniform int uSource;   // 0 saturation, 1 darkness, 2 constant
uniform int uBase;     // base ink slot or -1
uniform int uInkCount;
out vec4 outColor;
${ir}
void main() {
  vec3 c = hsl(texture(uImage, gl_FragCoord.xy / uSize).rgb);
  float amount = uSource == 0 ? c.y : uSource == 1 ? 1.0 - c.z : 1.0;
  vec4 ink = vec4(0.0);
  float selected = 0.0;
  for (int r = 0; r < ${K}; r++) {
    if (r >= uRangeCount) break;
    float m = membership(r, c);
    selected = max(selected, m);
    int target = int(uInk[r]);
    if (target >= 0 && target < ${W}) ink[target] = max(ink[target], m * amount);
  }
  // Everything else: a grayscale (darkness) in the base ink.
  if (uBase >= 0) ink[uBase] = max(ink[uBase], (1.0 - selected) * (1.0 - c.z));
  for (int i = 0; i < ${W}; i++) if (i >= uInkCount) ink[i] = 0.0;
  outColor = clamp(ink, 0.0, 1.0);
}
`,Yo=`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uImage;
uniform vec2 uSize;
uniform int uMaskRange;
out vec4 outColor;
${ir}
void main() {
  vec4 t = texture(uImage, gl_FragCoord.xy / uSize);
  float m = membership(uMaskRange, hsl(t.rgb));
  outColor = vec4(vec3(m), 1.0);
}
`;function $i(e){const t=Math.min(K,Math.max(0,ce(e,"rangeCount",1))),n=[],i=[],a=[],r=[],s=[];for(let o=0;o<K;o++)n.push(ce(e,`r${o}Hue`)),i.push(ce(e,`r${o}Width`,40)),a.push(ce(e,`r${o}SatMin`)/100,ce(e,`r${o}SatMax`,100)/100,ce(e,`r${o}LightMin`)/100,ce(e,`r${o}LightMax`,100)/100),r.push(ce(e,`r${o}Feather`,30)/100),s.push(Number(e[`r${o}Ink`]??0));return{uRangeCount:t,uHue:n,uWidth:i,uLimits:a,uFeather:r,uInk:s}}const Ko={id:"selective",label:"Selective Color",section:nr,dependsOn:(e,t)=>Fi(t,e),render(e,t,n,i){const a=i,{uInk:r,...s}=$i(a);e.gpu.pass(Vo,n,{...s,uInk:r,uImage:{texture:t.texture},uSize:[n.width,n.height],uSource:{saturation:0,lightness:1,constant:2}[String(a.densitySource)]??0,uBase:Fi(a,e),uInkCount:e.inkCount})},previewOverride(e,t,n,i){const a=i,r=String(a.maskPreview??"none");if(r==="none"||Number(r)>=ce(a,"rangeCount",1))return!1;const{uInk:s,...o}=$i(a);return e.gpu.pass(Yo,n,{...o,uImage:{texture:t.texture},uSize:[n.width,n.height],uMaskRange:Number(r)}),!0}},Ui=[{id:"shadow",label:"Shadow ink",points:[[0,1],[.3,.85],[.6,.15],[.8,0],[1,0]]},{id:"midtone",label:"Midtone ink",points:[[0,.15],[.25,.6],[.5,.85],[.75,.35],[1,0]]},{id:"highlight",label:"Highlight tint",points:[[0,.25],[.6,.35],[.9,.1],[1,0]]},{id:"full",label:"Full range",points:[[0,1],[1,0]]},{id:"off",label:"Off",points:[[0,0],[1,0]]}];function Jo(e){const t=new Float32Array(ie*W);return e.slice(0,W).forEach((n,i)=>{const a=Re(n,ie);for(let r=0;r<ie;r++)t[r*W+i]=a[r]}),t}function Zo(e,t,n=.01){const i=[];for(let s=0;s<ie;s++)i.push([s/(ie-1),e[s*W+t]]);const a=new Uint8Array(i.length);a[0]=1,a[i.length-1]=1;const r=[[0,i.length-1]];for(;r.length;){const[s,o]=r.pop(),[l,u]=i[s],[c,h]=i[o];let p=-1,d=n;for(let m=s+1;m<o;m++){const[f,g]=i[m],v=(f-l)/(c-l),b=Math.abs(g-(u+v*(h-u)));b>d&&(d=b,p=m)}p>=0&&(a[p]=1,r.push([s,p],[p,o]))}return i.filter((s,o)=>a[o]).map(([s,o])=>[Math.round(s*1e3)/1e3,Math.round(o*1e3)/1e3])}const ie=256;function Qo(e,t,n){const i=n.map((o,l)=>({slot:l,l:He(ee(o)??{r:0,g:0,b:0}).l})).sort((o,l)=>o.l-l.l).map(o=>o.slot),a=[],r=t>=2&&t>n.length?t-1:-1;let s=0;for(let o=0;o<t;o++)o===r||s>=i.length?a.push(null):a.push(i[s++]);return Array.from({length:t},(o,l)=>{const u=e[l]??"auto";if(u==="auto")return a[l]??null;if(u==="paper")return null;const c=Number(u);return Number.isInteger(c)&&c>=0&&c<n.length?c:null})}function Bi(e,t){const n=Math.min(1,Math.max(0,e));return t==="hard"?n<.5?0:1:t==="linear"?n:n*n*(3-2*n)}function el(e){const t=e.bandInks.length,n=[0,...e.cutoffs,1],i=new Float32Array(ie*W);for(let a=0;a<ie;a++){const r=a/(ie-1);for(let s=0;s<t;s++){const o=e.bandInks[s];if(o==null)continue;const l=n[s],u=n[s+1];let c=1;if(s>0){const d=e.overlaps[s-1]??0;c*=d>0?Bi((r-(l-d/2))/d,e.falloff):r>=l?1:0}if(s<t-1){const d=e.overlaps[s]??0;c*=d>0?1-Bi((r-(u-d/2))/d,e.falloff):r<u?1:0}if(c<=0)continue;let h=1;e.fill==="gradient"&&(h=1-(u>l?Math.min(1,Math.max(0,(r-l)/(u-l))):0),e.posterize>0&&(h=Math.ceil(h*e.posterize)/e.posterize));const p=a*W+o;i[p]=Math.max(i[p],c*h)}}return i}const kt=[{value:"auto",label:"Auto"},{value:"paper",label:"Paper (no ink)"},{value:"0",label:"Ink 1"},{value:"1",label:"Ink 2"},{value:"2",label:"Ink 3"},{value:"3",label:"Ink 4"}],ar={id:"splitToneMap",title:"Tone Map",stage:"split",parent:"split",description:"Maps lightness to ink: in bands (shadows, midtones, highlights) or with a curve per ink. Good for graphic looks and duotones.",visibleWhen:e=>e.split?.method==="toneMap",settings:[{kind:"select",key:"source",label:"Lightness source",default:"luma",options:[{value:"luma",label:"Luma"},{value:"lstar",label:"L* (perceptual)"},{value:"red",label:"Red channel"},{value:"green",label:"Green channel"},{value:"blue",label:"Blue channel"},{value:"max",label:"Max RGB"},{value:"min",label:"Min RGB"}]},{kind:"select",key:"mode",label:"Mode",default:"simple",hidden:!0,options:[{value:"simple",label:"Simple (bands)"},{value:"advanced",label:"Advanced (curves)"}]},{kind:"curve",key:"inkCurve",label:"Ink curve",perInk:!0,default:[[0,1],[1,0]],hidden:!0},{kind:"toggle",key:"linkCurves",label:"Link curves",default:!1,hidden:!0,stage:null},{kind:"number",key:"bandCount",label:"Number of bands",default:4,min:1,max:4,step:1,visibleWhen:e=>e.mode!=="advanced"},{kind:"number",key:"cutoff1",label:"Cutoff 1",default:25,min:0,max:100,step:.5,hidden:!0},{kind:"number",key:"cutoff2",label:"Cutoff 2",default:50,min:0,max:100,step:.5,hidden:!0},{kind:"number",key:"cutoff3",label:"Cutoff 3",default:75,min:0,max:100,step:.5,hidden:!0},{kind:"select",key:"band1Ink",label:"Band 1 ink",default:"auto",options:kt,hidden:!0},{kind:"select",key:"band2Ink",label:"Band 2 ink",default:"auto",options:kt,hidden:!0},{kind:"select",key:"band3Ink",label:"Band 3 ink",default:"auto",options:kt,hidden:!0},{kind:"select",key:"band4Ink",label:"Band 4 ink",default:"auto",options:kt,hidden:!0},{kind:"number",key:"overlap1",label:"Overlap, bands 1–2",default:6,min:0,max:40,step:.5,unit:"%",visibleWhen:e=>e.mode!=="advanced"&&Number(e.bandCount)>=2},{kind:"number",key:"overlap2",label:"Overlap, bands 2–3",default:6,min:0,max:40,step:.5,unit:"%",visibleWhen:e=>e.mode!=="advanced"&&Number(e.bandCount)>=3},{kind:"number",key:"overlap3",label:"Overlap, bands 3–4",default:6,min:0,max:40,step:.5,unit:"%",visibleWhen:e=>e.mode!=="advanced"&&Number(e.bandCount)>=4},{kind:"select",key:"falloff",label:"Falloff",default:"smooth",display:"segmented",visibleWhen:e=>e.mode!=="advanced",options:[{value:"hard",label:"Hard"},{value:"linear",label:"Linear"},{value:"smooth",label:"Smooth"}]},{kind:"select",key:"fill",label:"Fill inside each band",default:"flat",display:"segmented",visibleWhen:e=>e.mode!=="advanced",options:[{value:"flat",label:"Flat"},{value:"gradient",label:"Tonal gradient"}]},{kind:"number",key:"posterize",label:"Posterize steps",default:0,min:0,max:8,step:1,help:"Steps within each band. 0 = smooth.",visibleWhen:e=>e.mode!=="advanced"&&e.fill==="gradient"}]};function $t(e,t){return Qo([e.band1Ink,e.band2Ink,e.band3Ink,e.band4Ink],e.bandCount,t)}function tl(e){return[e.cutoff1,e.cutoff2,e.cutoff3].slice(0,e.bandCount-1).map(t=>t/100).sort((t,n)=>t-n)}function rr(e,t){return e.mode==="advanced"?Jo(e.inkCurve.slice(0,t.length)):sr(e,t)}function sr(e,t){return el({cutoffs:tl(e),bandInks:$t(e,t),overlaps:[e.overlap1,e.overlap2,e.overlap3].map(n=>n/100),falloff:e.falloff,fill:e.fill,posterize:e.posterize})}const nl=`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uImage;
uniform sampler2D uCurves; // CURVE_SIZE × 1, one ink per channel
uniform int uSource;
uniform vec2 uSize;
out vec4 outColor;
${re}
${ja}
void main() {
  vec2 uv = gl_FragCoord.xy / uSize;
  float l = clamp(lightness(texture(uImage, uv).rgb, uSource), 0.0, 1.0);
  outColor = texture(uCurves, vec2((l * ${ie-1}.0 + 0.5) / ${ie}.0, 0.5));
}
`,Oi=new WeakMap;function il(e,t){let n=Oi.get(e);n||(n=e.createTexture(),e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),Oi.set(e,n));const i=new Uint8Array(ie*W);for(let a=0;a<i.length;a++)i[a]=Math.round(t[a]*255);return e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,ie,1,0,e.RGBA,e.UNSIGNED_BYTE,i),n}const zi=e=>e.inks.map(t=>t.hex),al={id:"toneMap",label:"Tone Map",section:ar,dependsOn:(e,t)=>t.mode==="advanced"?null:$t(t,zi(e)),render(e,t,n,i){const a=rr(i,zi(e)),r=il(e.gpu.gl,a);e.gpu.pass(nl,n,{uImage:{texture:t.texture},uCurves:{texture:r},uSource:Math.max(0,qa.indexOf(i.source)),uSize:[n.width,n.height]})}},rl=()=>[jo,al,Eo,Ko,Oo],sl=[Qa,ar,Va,nr,Za],ol=[{value:"inkMatching",label:"Ink Matching"},{value:"toneMap",label:"Tone Map"},{value:"channel",label:"Channel Split"},{value:"selective",label:"Selective Color"},{value:"detail",label:"Detail Split"}];function or(e){const t=rl();return t.find(n=>n.id===e)??t[0]}const ge=["digital"],H=["print"],Wi="Riso machines can't print within about 5 mm (0.2 in) of the paper edge; shown as a dashed guide in the preview.",Gi="Extra paper around the page for artwork that runs off the edge; the file grows by this much on each side.",ll={id:"export",title:"Export",stage:null,settings:[{kind:"select",key:"digitalSize",label:"Size",default:"original",display:"segmented",modes:ge,stage:"halftone",options:[{value:"half",label:"0.5×"},{value:"original",label:"1×"},{value:"double",label:"2×"},{value:"triple",label:"3×"},{value:"custom",label:"Custom"}],help:"Scale of the uploaded image. Halftone sizes are measured in output pixels."},{kind:"toggle",key:"lockAspect",label:"Lock aspect ratio",default:!0,modes:ge,stage:"halftone",visibleWhen:e=>e.digitalSize==="custom"},{kind:"number",key:"digitalWidth",label:"Width",default:3e3,min:16,max:16e3,step:1,unit:"px",modes:ge,stage:"halftone",visibleWhen:e=>e.digitalSize==="custom"},{kind:"number",key:"digitalHeight",label:"Height",default:2e3,min:16,max:16e3,step:1,unit:"px",modes:ge,stage:"halftone",visibleWhen:e=>e.digitalSize==="custom"&&e.lockAspect===!1},{kind:"select",key:"digitalFit",label:"Image placement",default:"fit",display:"segmented",modes:ge,stage:"halftone",options:[{value:"fit",label:"Fit"},{value:"fill",label:"Fill"}],help:"Fit: the whole image shows, with paper around it. Fill: covers the whole size, cropping the image.",visibleWhen:e=>e.digitalSize==="custom"&&e.lockAspect===!1},{kind:"select",key:"digitalFormat",label:"File format",default:"png",display:"segmented",modes:ge,options:[{value:"png",label:"PNG"},{value:"jpg",label:"JPG"}]},{kind:"number",key:"jpgQuality",label:"JPG quality",default:92,min:40,max:100,step:1,unit:"%",modes:ge,visibleWhen:e=>e.digitalFormat==="jpg"},{kind:"toggle",key:"transparent",label:"Transparent background",default:!1,modes:ge,help:"The paper becomes transparent; ink keeps its printed color.",visibleWhen:e=>e.digitalFormat==="png"},{kind:"select",key:"printTarget",label:"Printer",default:"riso",display:"segmented",modes:H,stage:"printSim",options:[{value:"riso",label:"Riso layers"},{value:"standard",label:"Standard printer"}],help:"Riso: one black-and-white file per ink. Standard printer: one color page, without print simulation."},{kind:"select",key:"pageSize",label:"Page size",default:"letter",modes:H,stage:"halftone",options:[{value:"letter",label:"Letter (8.5 × 11 in)"},{value:"legal",label:"Legal (8.5 × 14 in)"},{value:"tabloid",label:"Tabloid (11 × 17 in)"},{value:"a4",label:"A4 (210 × 297 mm)"},{value:"a3",label:"A3 (297 × 420 mm)"},{value:"b4",label:"B4 (257 × 364 mm)"},{value:"custom",label:"Custom"},{value:"image",label:"Image only (no page)"}]},{kind:"select",key:"units",label:"Units",default:"in",display:"segmented",modes:H,stage:"halftone",options:[{value:"in",label:"in"},{value:"mm",label:"mm"}],help:"For margins, bleed, image width and custom page sizes. Switching converts them."},{kind:"number",key:"pageWidth",label:"Page width",default:8.5,min:1,max:1e3,step:.01,modes:H,stage:"halftone",visibleWhen:e=>e.pageSize==="custom"},{kind:"number",key:"pageHeight",label:"Page height",default:11,min:1,max:1e3,step:.01,modes:H,stage:"halftone",visibleWhen:e=>e.pageSize==="custom"},{kind:"select",key:"orientation",label:"Orientation",default:"portrait",display:"segmented",modes:H,stage:"halftone",options:[{value:"portrait",label:"Portrait"},{value:"landscape",label:"Landscape"}],visibleWhen:e=>e.pageSize!=="image"},{kind:"select",key:"placement",label:"Image placement",default:"fit",display:"segmented",modes:H,stage:"halftone",options:[{value:"fit",label:"Fit"},{value:"fill",label:"Fill"},{value:"custom",label:"Custom"}],help:"Fit: as large as possible inside the margins. Fill: covers the whole page (and bleed), cropping the image. Custom: set the width and position.",visibleWhen:e=>e.pageSize!=="image"},{kind:"number",key:"imageWidth",label:"Image width",default:6,min:.1,max:1e3,step:.01,modes:H,stage:"halftone",help:"Width of the artwork (image plus any border), in the units above.",visibleWhen:e=>e.pageSize==="image"||e.placement==="custom"},{kind:"number",key:"positionX",label:"Position across",default:50,min:0,max:100,step:.5,unit:"%",modes:H,stage:"halftone",visibleWhen:e=>e.pageSize!=="image"&&e.placement==="custom"},{kind:"number",key:"positionY",label:"Position down",default:50,min:0,max:100,step:.5,unit:"%",modes:H,stage:"halftone",visibleWhen:e=>e.pageSize!=="image"&&e.placement==="custom"},{kind:"number",key:"margin",label:"Margins",default:5,min:0,max:50,step:.5,unit:"mm",modes:H,stage:"halftone",help:Wi,visibleWhen:e=>e.pageSize!=="image"&&e.units==="mm"},{kind:"number",key:"marginIn",label:"Margins",default:.2,min:0,max:2,step:.01,unit:"in",modes:H,stage:"halftone",help:Wi,visibleWhen:e=>e.pageSize!=="image"&&e.units!=="mm"},{kind:"number",key:"bleed",label:"Bleed",default:0,min:0,max:10,step:.5,unit:"mm",modes:H,stage:"halftone",help:Gi,visibleWhen:e=>e.pageSize!=="image"&&e.units==="mm"},{kind:"number",key:"bleedIn",label:"Bleed",default:0,min:0,max:.4,step:.01,unit:"in",modes:H,stage:"halftone",help:Gi,visibleWhen:e=>e.pageSize!=="image"&&e.units!=="mm"},{kind:"select",key:"dpiPreset",label:"Resolution",default:"600",display:"segmented",modes:H,stage:"halftone",options:[{value:"300",label:"300 DPI"},{value:"600",label:"600 DPI"},{value:"1200",label:"1200 DPI"},{value:"custom",label:"Custom"}],help:"Riso machines print at 600 DPI."},{kind:"number",key:"dpi",label:"Custom resolution",stage:"halftone",default:600,min:150,max:1200,step:50,unit:"DPI",modes:H,visibleWhen:e=>e.dpiPreset==="custom"},{kind:"select",key:"fileFormat",label:"File format",default:"png",display:"segmented",modes:H,stage:null,options:[{value:"png",label:"PNG"},{value:"pdf",label:"PDF"}],help:"Riso PDF: one page per layer."},{kind:"toggle",key:"cropMarks",label:"Crop marks",default:!1,modes:H,stage:null,help:"Where to trim, at the artwork's corners (the page's with Fill)."},{kind:"toggle",key:"regMarks",label:"Registration marks",default:!1,modes:H,stage:null,help:"Targets on every layer for lining the inks up.",visibleWhen:e=>e.printTarget==="riso"},{kind:"toggle",key:"layerLabels",label:"Layer labels",default:!1,modes:H,stage:null,help:"Project name, ink and print order in the bottom margin of each layer.",visibleWhen:e=>e.printTarget==="riso"},{kind:"toggle",key:"includeProof",label:"Composite proof",default:!0,modes:H,stage:null,help:"A color preview of the whole page (150 DPI), added to the zip.",visibleWhen:e=>e.printTarget==="riso"},{kind:"toggle",key:"includeSheet",label:"Print sheet",default:!0,modes:H,stage:null,help:"A page listing the inks, print order and settings, added to the zip.",visibleWhen:e=>e.printTarget==="riso"},{kind:"toggle",key:"gainCompensation",label:"Dot gain compensation",default:!1,modes:H,stage:"printSim",help:"Shrinks dots in the riso layers so they print at the intended size after the ink spreads. Uses the Dot gain settings in Print Simulation.",visibleWhen:e=>e.printTarget==="riso"},{kind:"toggle",key:"embedProfile",label:"Embed sRGB profile",default:!0,stage:null,help:"Tags color files as sRGB so other apps show the colors as intended.",visibleWhen:(e,t)=>t.upload?.mode!=="print"||e.printTarget==="standard"||e.includeProof===!0}]};function ul(e){return e.dpiPreset==="custom"?e.dpi:Number(e.dpiPreset)}function cl(e){return e.units==="mm"?e.margin:e.marginIn*25.4}function lr(e){return e.units==="mm"?e.bleed:e.bleedIn*25.4}const Ge=e=>e.printSim?.enabled===!0,hl=e=>e.upload?.mode==="print"&&e.export?.printTarget==="riso"&&e.export?.gainCompensation===!0,dl={id:"printSim",title:"Print Simulation",stage:"printSim",settings:[{kind:"toggle",key:"enabled",label:"Simulate printing",default:!1,help:"Preview how the print will really look. Baked into Digital exports; never added to riso layers."}]},ml={id:"simMisreg",title:"Layer misregistration",stage:"printSim",parent:"printSim",description:"Each ink layer lands slightly off from the others.",visibleWhen:Ge,settings:[{kind:"toggle",key:"on",label:"On",default:!0},{kind:"number",key:"shift",label:"Shift",default:3,min:0,max:40,step:.5,unit:"px",help:"Largest random offset of a layer, in output pixels (about 1 mm is 24 px at 600 DPI).",visibleWhen:e=>e.on===!0},{kind:"number",key:"rotation",label:"Rotation",default:.05,min:0,max:1,step:.01,unit:"°",help:"Largest random rotation of a layer, around the image center.",visibleWhen:e=>e.on===!0},{kind:"seed",key:"seed",label:"Random seed",default:1,visibleWhen:e=>e.on===!0}]},pl={id:"simLowInk",title:"Low-ink patches",stage:"printSim",parent:"printSim",description:"Patches where the drum runs short of ink and the print goes grainy and light, mostly in big solid areas.",visibleWhen:Ge,settings:[{kind:"toggle",key:"on",label:"On",default:!0},{kind:"number",key:"intensity",label:"Intensity",default:35,min:0,max:100,step:1,unit:"%",help:"How much ink is lost inside a patch.",visibleWhen:e=>e.on===!0},{kind:"number",key:"size",label:"Patch size",default:15,min:2,max:60,step:.5,unit:"%",help:"% of the image's shorter side.",visibleWhen:e=>e.on===!0},{kind:"select",key:"shape",label:"Patch shape",default:"fractal",display:"segmented",options:[{value:"fractal",label:"Blotches"},{value:"streaks",label:"Drum streaks"},{value:"edge",label:"Edge fade"}],visibleWhen:e=>e.on===!0},{kind:"number",key:"detail",label:"Detail",default:4,min:1,max:6,step:1,help:"Layers of noise: more gives more intricate edges.",visibleWhen:e=>e.on===!0&&e.shape==="fractal"},{kind:"number",key:"roughness",label:"Roughness",default:50,min:0,max:100,step:1,unit:"%",visibleWhen:e=>e.on===!0&&e.shape==="fractal"},{kind:"number",key:"direction",label:"Feed direction",default:90,min:0,max:180,step:1,unit:"°",help:"Direction the paper travels: streaks run this way (90° = top to bottom).",visibleWhen:e=>e.on===!0&&e.shape==="streaks"},{kind:"number",key:"streakLength",label:"Streak length",default:8,min:1,max:30,step:.5,unit:"×",help:"How much longer streaks are than they are wide.",visibleWhen:e=>e.on===!0&&e.shape==="streaks"},{kind:"number",key:"frequency",label:"Streak frequency",default:1.5,min:.25,max:6,step:.25,unit:"×",visibleWhen:e=>e.on===!0&&e.shape==="streaks"},{kind:"select",key:"side",label:"Thin side",default:"right",display:"segmented",options:[{value:"top",label:"Top"},{value:"bottom",label:"Bottom"},{value:"left",label:"Left"},{value:"right",label:"Right"}],visibleWhen:e=>e.on===!0&&e.shape==="edge"},{kind:"number",key:"falloff",label:"Falloff distance",default:40,min:5,max:100,step:1,unit:"%",help:"% of the image width or height.",visibleWhen:e=>e.on===!0&&e.shape==="edge"},{kind:"number",key:"influence",label:"Coverage influence",default:70,min:0,max:100,step:1,unit:"%",help:"How strongly patches are drawn to heavily inked areas.",visibleWhen:e=>e.on===!0},{kind:"number",key:"softness",label:"Edge softness",default:40,min:0,max:100,step:1,unit:"%",visibleWhen:e=>e.on===!0},{kind:"toggle",key:"shared",label:"Same patches on every ink",default:!1,visibleWhen:e=>e.on===!0},{kind:"seed",key:"seed",label:"Random seed",default:1,visibleWhen:e=>e.on===!0}]},fl={id:"simSpecks",title:"Specks",stage:"printSim",parent:"printSim",description:"Small spots of stray ink, and pinholes where ink is missing.",visibleWhen:Ge,settings:[{kind:"toggle",key:"on",label:"On",default:!0},{kind:"toggle",key:"ink",label:"Specks on these inks",perInk:!0,default:!0,visibleWhen:e=>e.on===!0},{kind:"number",key:"density",label:"Density",default:30,min:0,max:500,step:1,unit:"/MP",help:"Specks per million output pixels.",visibleWhen:e=>e.on===!0},{kind:"number",key:"minSize",label:"Smallest speck",default:2,min:1,max:30,step:.5,unit:"px",visibleWhen:e=>e.on===!0},{kind:"number",key:"maxSize",label:"Largest speck",default:6,min:1,max:40,step:.5,unit:"px",visibleWhen:e=>e.on===!0},{kind:"number",key:"extra",label:"Extra ink",default:40,min:0,max:100,step:1,unit:"%",help:"Share of specks that add ink; the rest are pinholes (which only show inside ink).",visibleWhen:e=>e.on===!0},{kind:"number",key:"clumping",label:"Clumping",default:30,min:0,max:100,step:1,unit:"%",help:"0 = scattered evenly; higher = grouped together.",visibleWhen:e=>e.on===!0},{kind:"select",key:"placement",label:"Extra ink appears",default:"near",display:"segmented",options:[{value:"near",label:"Near ink"},{value:"anywhere",label:"Anywhere"}],visibleWhen:e=>e.on===!0},{kind:"number",key:"opacity",label:"Opacity",default:100,min:0,max:100,step:1,unit:"%",help:"Lower = patchier, broken-up specks.",visibleWhen:e=>e.on===!0},{kind:"seed",key:"seed",label:"Random seed",default:1,visibleWhen:e=>e.on===!0}]},gl={id:"simGain",title:"Dot gain",stage:"printSim",parent:"printSim",description:"Ink spreads into the paper, so dots print larger and darker. Also used by dot gain compensation (Export, Print mode).",visibleWhen:e=>Ge(e)||hl(e),settings:[{kind:"toggle",key:"on",label:"On",default:!0,help:"Show dot gain in the preview (and Digital exports).",visibleWhen:(e,t)=>Ge(t)},{kind:"number",key:"amount",label:"Gain at 50%",perInk:!0,default:12,min:0,max:40,step:.5,unit:"%",help:"How much darker a 50% tone prints (12% → prints as 62%)."},{kind:"select",key:"curve",label:"Gain curve",default:"midtone",display:"segmented",options:[{value:"midtone",label:"Midtone-weighted"},{value:"uniform",label:"Uniform"}],help:"Real gain is strongest in the midtones."},{kind:"select",key:"paper",label:"Paper absorbency",default:"uncoated",display:"segmented",options:[{value:"smooth",label:"Smooth"},{value:"uncoated",label:"Uncoated"},{value:"recycled",label:"Recycled"}],help:"Scales the gain: smooth ×0.6, uncoated ×1, recycled ×1.4."},{kind:"number",key:"roughness",label:"Edge roughness",default:30,min:0,max:100,step:1,unit:"%",help:"How ragged dot edges become.",visibleWhen:(e,t)=>e.on===!0&&Ge(t)}]},vl=[dl,ml,pl,fl,gl],bl={id:"upload",title:"Upload",stage:"upload",settings:[{kind:"select",key:"mode",label:"Mode",default:"digital",display:"segmented",stage:null,options:[{value:"digital",label:"Digital"},{value:"print",label:"Print"}],help:"Digital exports one riso-style image. Print exports each ink as a separate black-and-white layer."},{kind:"text",key:"projectName",label:"Project name",default:"Untitled",maxLength:60,stage:null,help:"Used to name exported files."}]},kl={id:"presets",title:"Presets",stage:null,settings:[]},yl={id:"palette",title:"Palette",stage:"overlapTable",settings:[{kind:"select",key:"source",label:"Colors",default:"manual",display:"segmented",hidden:!0,stage:null,options:[{value:"manual",label:"Manual"},{value:"scheme",label:"Scheme"},{value:"auto",label:"Auto"}]},{kind:"select",key:"scheme",label:"Scheme",default:"triad",hidden:!0,stage:null,options:rs.map(e=>({value:e.id,label:`${e.label} (${e.count})`}))},{kind:"toggle",key:"schemeIncludeBackground",label:"Include background in scheme",default:!1,hidden:!0,stage:null},{kind:"color",key:"schemeBase",label:"First color",default:"#0078bf",hidden:!0,stage:null},{kind:"select",key:"autoStyle",label:"Style",default:"balanced",display:"segmented",hidden:!0,stage:null,options:[{value:"balanced",label:"Balanced"},{value:"vibrant",label:"Vibrant"},{value:"contrast",label:"Contrasting"}],help:"Balanced: the image's main colors by area. Vibrant: the most colorful colors in the image, each a different hue. Contrasting: image colors as different from each other as possible."},{kind:"number",key:"autoVividness",label:"Vividness",default:0,min:0,max:100,step:1,unit:"%",hidden:!0,stage:null,help:"Pushes each ink toward the most saturated version of its color, like real riso inks."},{kind:"number",key:"autoVariant",label:"Palette choice",default:0,min:0,max:999,step:1,hidden:!0,stage:null},{kind:"toggle",key:"autoIncludeBackground",label:"Pick the background from the image too",default:!1,hidden:!0,stage:null},{kind:"number",key:"inkCount",label:"Number of inks",default:3,min:1,max:4,step:1,hidden:!0,stage:"split"},{kind:"color",key:"inkColor",label:"Ink color",perInk:!0,default:"#000000",slotDefaults:["#0078bf","#ff48b0","#ffe800","#000000"],hidden:!0},{kind:"color",key:"paper",label:"Paper",default:"#f6f3ec",hidden:!0},{kind:"number",key:"inkOpacity",label:"Ink opacity",perInk:!0,default:0,min:0,max:100,step:1,unit:"%",help:"Riso inks are transparent (0%). Raise this for dense inks like metallics or white, which partly cover inks printed before them.",collapsed:"Ink opacity (for metallic or white inks)"}]},xl={id:"adjust",title:"Image Adjustments",stage:"adjust",settings:[{kind:"number",key:"turn",label:"Rotation",default:0,min:0,max:270,step:90,unit:"°",hidden:!0,stage:"upload"},{kind:"number",key:"straighten",label:"Straighten",default:0,min:-45,max:45,step:.1,unit:"°",hidden:!0,stage:"upload"},{kind:"number",key:"cropX",label:"Crop left",default:0,min:0,max:1,step:1e-4,hidden:!0,stage:"upload"},{kind:"number",key:"cropY",label:"Crop top",default:0,min:0,max:1,step:1e-4,hidden:!0,stage:"upload"},{kind:"number",key:"cropW",label:"Crop width",default:1,min:.002,max:1,step:1e-4,hidden:!0,stage:"upload"},{kind:"number",key:"cropH",label:"Crop height",default:1,min:.002,max:1,step:1e-4,hidden:!0,stage:"upload"},{kind:"number",key:"blackPoint",label:"Levels: black point",default:0,min:0,max:100,step:.5,unit:"%"},{kind:"number",key:"whitePoint",label:"Levels: white point",default:100,min:0,max:100,step:.5,unit:"%"},{kind:"number",key:"midtone",label:"Levels: midtone",default:0,min:-100,max:100,step:1,help:"Positive brightens the midtones, negative darkens them."},{kind:"curve",key:"curve",label:"Contrast curve",default:[[0,0],[1,1]],help:"Click to add a point, drag to move it, double-click a point to remove it."},{kind:"number",key:"saturation",label:"Saturation boost",default:0,min:0,max:100,step:1,unit:"%",help:"Most useful with Ink Matching."},{kind:"number",key:"smoothing",label:"Smoothing",default:0,min:0,max:10,step:.1,help:"Softens noise and fine texture while keeping edges."}]},wl={id:"split",title:"Color Splitting",stage:"split",settings:[{kind:"select",key:"method",label:"Method",default:"inkMatching",options:ol}]},Sl={id:"layers",title:"Layers",stage:"layerOptions",parent:"split",settings:[{kind:"number",key:"density",label:"Density",perInk:!0,default:100,min:0,max:200,step:1,unit:"%",hidden:!0},{kind:"toggle",key:"invert",label:"Invert",perInk:!0,default:!1,hidden:!0},{kind:"number",key:"levelsBlack",label:"Levels: start",perInk:!0,default:0,min:0,max:100,step:.5,unit:"%",hidden:!0},{kind:"number",key:"levelsWhite",label:"Levels: full",perInk:!0,default:100,min:0,max:100,step:.5,unit:"%",hidden:!0},{kind:"number",key:"levelsMid",label:"Levels: midtone",perInk:!0,default:0,min:-100,max:100,step:1,hidden:!0},{kind:"curve",key:"curve",label:"Curve",perInk:!0,default:[[0,0],[1,1]],hidden:!0},{kind:"toggle",key:"knockout",label:"Knockout",perInk:!0,default:!1,hidden:!0},{kind:"number",key:"trap",label:"Choke / spread",perInk:!0,default:0,min:-8,max:8,step:.5,unit:"px",hidden:!0},{kind:"number",key:"inkLimit",label:"Total ink limit",default:400,min:100,max:400,step:5,unit:"%",help:"Caps the combined coverage of all inks at any spot. 400% = no limit. Lower it to reduce heavy, muddy overlaps."},{kind:"toggle",key:"solo",label:"Solo",perInk:!0,default:!1,hidden:!0,stage:"mix"},{kind:"toggle",key:"mute",label:"Mute",perInk:!0,default:!1,hidden:!0,stage:"mix"}]},El=["am","hex","noise","spiral","rings","turing"],Tl={id:"halftone",title:"Halftone",stage:"halftone",settings:[{kind:"select",key:"type",label:"Type",default:"am",options:vo},{kind:"number",key:"minDot",label:"Minimum dot size",perInk:!0,default:1.5,min:0,max:8,step:.5,unit:"px",help:"Smallest dot allowed, in output pixels (1–2 px at 600 DPI). Riso machines struggle to print tiny dots.",visibleWhen:e=>e.type!=="none",placement:"end"},{kind:"select",key:"minDotMode",label:"Tones lighter than the minimum",default:"drop",display:"segmented",options:[{value:"drop",label:"Drop to paper"},{value:"round",label:"Round up"}],visibleWhen:e=>El.includes(String(e.type)),placement:"end"}]},Ml={id:"border",title:"Border",stage:"border",settings:[{kind:"toggle",key:"fade",label:"Fade edges",default:!1,help:"A soft vignette to black or white. Applied before processing, so it is split and halftoned like the rest of the image."},{kind:"select",key:"fadeColor",label:"Fade to",default:"white",display:"segmented",options:[{value:"white",label:"White"},{value:"black",label:"Black"}],visibleWhen:e=>e.fade===!0},{kind:"number",key:"fadeDistance",label:"Fade distance",default:12,min:.5,max:50,step:.5,unit:"%",help:"How far the fade reaches in from the edge (% of the shorter side).",visibleWhen:e=>e.fade===!0},{kind:"number",key:"fadeRadius",label:"Fade corner radius",default:0,min:0,max:50,step:.5,unit:"%",visibleWhen:e=>e.fade===!0},{kind:"number",key:"fadeOpacity",label:"Fade opacity",default:100,min:0,max:100,step:1,unit:"%",visibleWhen:e=>e.fade===!0},{kind:"select",key:"fadeCurve",label:"Fade curve",default:"smooth",options:[{value:"linear",label:"Linear (even)"},{value:"smooth",label:"Smooth (like a camera vignette)"},{value:"exponential",label:"Exponential (strong at the edge, then drops off)"},{value:"custom",label:"Custom"}],visibleWhen:e=>e.fade===!0},{kind:"curve",key:"fadeCustom",label:"Custom fade (edge → inside)",default:[[0,1],[1,0]],visibleWhen:e=>e.fade===!0&&e.fadeCurve==="custom"},{kind:"number",key:"fadeMidpoint",label:"Fade midpoint",default:50,min:5,max:95,step:1,unit:"%",help:"Where the fade is at half strength, as a share of the fade distance.",visibleWhen:e=>e.fade===!0},{kind:"select",key:"frame",label:"Border",default:"none",display:"segmented",options:[{value:"none",label:"None"},{value:"ink",label:"Solid ink"},{value:"paper",label:"Paper"}],help:"Solid ink: one ink, not halftoned, with every other ink removed there. Paper: bare paper."},{kind:"select",key:"frameInk",label:"Border ink",default:"0",inkChoice:!0,options:[{value:"0",label:"Ink 1"},{value:"1",label:"Ink 2"},{value:"2",label:"Ink 3"},{value:"3",label:"Ink 4"}],visibleWhen:e=>e.frame==="ink"},{kind:"number",key:"frameThickness",label:"Thickness",default:4,min:-25,max:25,step:.25,unit:"%",help:"Positive grows the canvas outward around the image; negative covers the image's edge.",visibleWhen:e=>e.frame!=="none"},{kind:"number",key:"frameRadius",label:"Border corner radius",default:0,min:0,max:50,step:.5,unit:"%",help:"Rounds the corners of the image opening.",visibleWhen:e=>e.frame!=="none"}]},we=[bl,kl,yl,xl,wl,...sl,Sl,Tl,...fo,Ml,...vl,ll];function ur(e){return we.find(t=>t.id===e)}function te(e,t){return ur(e)?.settings.find(n=>n.key===t)}function Rl(e,t){const n=ur(e),i=n?.settings.find(a=>a.key===t);return!n||!i?null:i.stage===void 0?n.stage:i.stage}function ot(e,t){const n=e.slotDefaults,i=t!==void 0&&n?.[t]!==void 0?n[t]:e.default;return e.kind==="curve"?i.map(a=>[a[0],a[1]]):i}function Cl(e){return e.perInk?Array.from({length:W},(t,n)=>ot(e,n)):ot(e)}function cr(e){const t={};for(const n of e.settings)t[n.key]=Cl(n);return t}function Il(){const e={};for(const t of we)e[t.id]=cr(t);return e}function Xi(e,t,n){if(t===void 0)return ot(e,n);switch(e.kind){case"number":{const i=typeof t=="number"?t:Number(t);return Number.isFinite(i)?Math.min(e.max,Math.max(e.min,i)):e.default}case"seed":{const i=typeof t=="number"?t:Number(t);return Number.isFinite(i)?Math.floor(Math.abs(i))%2**31:e.default}case"select":return e.options.some(i=>i.value===t)?t:e.default;case"toggle":return typeof t=="boolean"?t:e.default;case"color":return typeof t=="string"&&/^#[0-9a-f]{6}$/i.test(t)?t.toLowerCase():e.default;case"text":return typeof t!="string"?e.default:e.maxLength?t.slice(0,e.maxLength):t;case"curve":return Array.isArray(t)?t:e.default}}function bn(e,t){if(!e.perInk)return Xi(e,t);const n=Array.isArray(t)?t:[];return Array.from({length:W},(i,a)=>Xi(e,n[a],a))}function hr(e,t,n){if(e.modes&&!e.modes.includes(t.upload.mode))return!1;if(e.visibleWhen){const i=t;return e.visibleWhen(i[n]??{},i)}return!0}class Al{settings=Il();listeners=new Set;get(){return this.settings}getValue(t,n){return this.settings[t]?.[n]}set(t,n,i,a={}){this.setValue(t,n,i,a)}setValue(t,n,i,a={}){const r=te(t,n);if(!r)throw new Error(`Unknown setting ${t}.${n}`);const s=bn(r,i),o=a.commit??!0,l=this.getValue(t,n);if(dr(l,s)&&!o)return;const u=this.settings[t]??{};this.settings={...this.settings,[t]:{...u,[n]:s}},this.emit({section:t,key:n,stage:Rl(t,n),commit:o})}setInkValue(t,n,i,a,r={}){const s=this.getValue(t,n);if(!Array.isArray(s))throw new Error(`${t}.${n} is not a per-ink setting`);const o=s.slice();o[i]=a,this.setValue(t,n,o,r)}permuteInks(t){this.updateAllPerInk((n,i)=>i.map((a,r)=>i[t[r]??r])),this.emit({section:"*",key:"inkSlots",stage:"split",commit:!0})}resetInkSlot(t){this.updateAllPerInk((n,i)=>i.map((a,r)=>r===t?ot(n,r):a)),this.emit({section:"*",key:"inkSlots",stage:"split",commit:!0})}replace(t){this.settings=t,this.emit({section:"*",key:"replace",stage:"upload",commit:!0})}updateAllPerInk(t){const n={...this.settings};for(const i of we)for(const a of i.settings){if(!a.perInk)continue;const r=n[i.id]?.[a.key];Array.isArray(r)&&(n[i.id]={...n[i.id],[a.key]:bn(a,t(a,r))})}this.settings=n}emit(t){for(const n of this.listeners)n(this.settings,t)}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}}function dr(e,t){return e===t?!0:Array.isArray(e)&&Array.isArray(t)?e.length===t.length&&e.every((n,i)=>dr(n,t[i])):!1}function Ll(e){const t=document.createElement("div");t.className="upload-block";const n=document.createElement("input");n.type="file",n.accept=Yr,n.hidden=!0,n.addEventListener("change",()=>{n.files?.length&&e(n.files),n.value=""});const i=document.createElement("label");i.className="drop-zone",i.tabIndex=0,i.innerHTML='<span class="drop-zone-title">Choose an image</span><span class="drop-zone-hint">or drag one here · JPG, PNG, WebP</span>',i.addEventListener("click",o=>{o.preventDefault(),n.click()}),i.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),n.click())}),i.addEventListener("dragover",o=>{o.preventDefault(),i.classList.add("drag-over")}),i.addEventListener("dragleave",()=>i.classList.remove("drag-over")),i.addEventListener("drop",o=>{o.preventDefault(),o.stopPropagation(),i.classList.remove("drag-over"),o.dataTransfer?.files.length&&e(o.dataTransfer.files)});const a=document.createElement("p");a.className="upload-info",a.hidden=!0,t.append(i,n,a);const r=i.querySelector(".drop-zone-title");let s="Choose an image";return{element:t,showImage(o){s="Replace image",r.textContent=s,a.hidden=!1,a.textContent=`${o.fileName} · ${o.width} × ${o.height} px`},setBusy(o){i.classList.toggle("busy",o),r.textContent=o?"Opening…":s}}}const Pl=10,Hi=28;function mr(e,t,n){const i=document.createElement("div");i.className="curve-editor";const a=document.createElement("canvas");a.setAttribute("role","img"),a.setAttribute("aria-label",`${e} editor`);const r=document.createElement("button");r.type="button",r.textContent="Reset",r.className="curve-reset",i.append(a,r);let s=t.map(([f,g])=>[f,g]),o=null,l=!1;const u=()=>{const f=Math.max(120,i.clientWidth||240);return{w:f,h:Math.round(f*.62)}};function c(){const{w:f,h:g}=u(),v=window.devicePixelRatio||1;(a.width!==Math.round(f*v)||a.height!==Math.round(g*v))&&(a.width=Math.round(f*v),a.height=Math.round(g*v),a.style.height=`${g}px`);const b=a.getContext("2d");b.setTransform(v,0,0,v,0,0),b.clearRect(0,0,f,g),b.fillStyle="#fafbf8",b.fillRect(0,0,f,g),b.strokeStyle="#dfe6d6",b.lineWidth=1;for(let x=1;x<4;x++)b.beginPath(),b.moveTo(f*x/4+.5,0),b.lineTo(f*x/4+.5,g),b.moveTo(0,g*x/4+.5),b.lineTo(f,g*x/4+.5),b.stroke();b.strokeStyle="#c5ccb8",b.setLineDash([3,3]),b.beginPath(),b.moveTo(0,g),b.lineTo(f,0),b.stroke(),b.setLineDash([]);const k=Re(s,Math.max(64,Math.round(f)));b.strokeStyle="#1c1c1c",b.lineWidth=2,b.beginPath(),k.forEach((x,S)=>{const y=S/(k.length-1)*f,w=(1-x)*g;S===0?b.moveTo(y,w):b.lineTo(y,w)}),b.stroke(),s.forEach(([x,S],y)=>{b.beginPath(),b.arc(x*f,(1-S)*g,5,0,Math.PI*2),b.fillStyle=y===o?l?"#a3261b":"#f78f28":"#fff",b.fill(),b.strokeStyle="#1c1c1c",b.lineWidth=1.5,b.stroke()}),i.classList.toggle("is-default",Nl(s))}const h=f=>{const g=a.getBoundingClientRect();return{x:(f.clientX-g.left)/g.width,y:1-(f.clientY-g.top)/g.height,px:f.clientX-g.left,py:f.clientY-g.top,r:g}},p=(f,g,v)=>{let b=-1,k=Pl;return s.forEach(([x,S],y)=>{const w=Math.hypot(x*v.width-f,(1-S)*v.height-g);w<=k&&(k=w,b=y)}),b},d=f=>n(s.map(([g,v])=>[g,v]),f);a.addEventListener("pointerdown",f=>{const g=h(f);let v=p(g.px,g.py,g.r);if(v<0){const b=Math.min(.99,Math.max(.01,g.x));s.push([b,Math.min(1,Math.max(0,g.y))]),s.sort((k,x)=>k[0]-x[0]),v=s.findIndex(k=>k[0]===b),d(!1)}o=v,a.setPointerCapture(f.pointerId),c()}),a.addEventListener("pointermove",f=>{if(o===null){const w=h(f);a.style.cursor=p(w.px,w.py,w.r)>=0?"grab":"crosshair";return}const g=h(f),v=o,b=v===0||v===s.length-1,k=g.py<-Hi||g.py>g.r.height+Hi;l=!b&&k;const x=s[v-1],S=s[v+1],y=b?s[v][0]:Math.min((S?.[0]??1)-.01,Math.max((x?.[0]??0)+.01,g.x));s[v]=[y,Math.min(1,Math.max(0,g.y))],d(!1),c()});const m=()=>{o!==null&&(l&&s.splice(o,1),o=null,l=!1,d(!0),c())};return a.addEventListener("pointerup",m),a.addEventListener("pointercancel",m),a.addEventListener("dblclick",f=>{const g=h(f),v=p(g.px,g.py,g.r);v>0&&v<s.length-1&&(s.splice(v,1),d(!0),c())}),r.addEventListener("click",()=>{s=[[0,0],[1,1]],d(!0),c()}),new ResizeObserver(()=>c()).observe(i),c(),{element:i,update(f){o===null&&(s=f.map(([g,v])=>[g,v]),c())}}}function Nl(e){return e.length===2&&e[0][0]===0&&e[0][1]===0&&e[1][0]===1&&e[1][1]===1}let Dl=0;function qe(){return`ctl-${++Dl}`}function ye(e,t,n=e.label){const i=document.createElement("div");i.className=`control control-${e.kind}`;const a=document.createElement(t?"label":"span");a.className="control-label",a.textContent=n,t&&(a.htmlFor=t);const r=document.createElement("div");if(r.className="control-body",i.append(a,r),e.help){const s=document.createElement("p");s.className="control-help",s.textContent=e.help,i.append(s)}return{row:i,body:r}}function _l(e){const t=String(e),n=t.indexOf(".");return n<0?0:t.length-n-1}function Fl(e,t,n,i){const a=qe(),{row:r,body:s}=ye(e,a,i),o=document.createElement("input");o.type="range",o.id=a,o.min=String(e.min),o.max=String(e.max),o.step=String(e.step);const l=document.createElement("input");l.type="number",l.className="control-number",l.min=o.min,l.max=o.max,l.step=o.step,l.setAttribute("aria-label",`${e.label} value`);const u=h=>h.toFixed(_l(e.step)),c=h=>{o.value=String(h),l.value=u(h)};if(c(t),o.addEventListener("input",()=>{l.value=u(Number(o.value)),n(Number(o.value),!1)}),o.addEventListener("change",()=>n(Number(o.value),!0)),l.addEventListener("change",()=>{const h=Number(l.value);Number.isFinite(h)&&n(h,!0)}),s.append(o,l),e.unit){const h=document.createElement("span");h.className="control-unit",h.textContent=e.unit,s.append(h)}return{element:r,update:h=>c(Number(h))}}function $l(e,t,n,i){if(e.display==="segmented"){const{row:u,body:c}=ye(e,null,i),h=document.createElement("div");h.className="segmented",h.setAttribute("role","radiogroup"),h.setAttribute("aria-label",i??e.label);const p=e.options.map(m=>{const f=document.createElement("button");return f.type="button",f.textContent=m.label,f.setAttribute("role","radio"),f.dataset.value=m.value,f.addEventListener("click",()=>n(m.value,!0)),h.append(f),f}),d=m=>{for(const f of p){const g=f.dataset.value===m;f.classList.toggle("active",g),f.setAttribute("aria-checked",String(g))}};return d(t),c.append(h),{element:u,update:d}}const a=qe(),{row:r,body:s}=ye(e,a,i),o=document.createElement("select");o.id=a;const l=u=>{const c=o.value,h=[];let p=null;for(const d of u){const m=document.createElement("option");if(m.value=d.value,m.textContent=d.label,!d.group){p=null,h.push(m);continue}p?.label!==d.group&&(p=document.createElement("optgroup"),p.label=d.group,h.push(p)),p.append(m)}o.replaceChildren(...h),o.value=c};return l(e.options),o.value=t,o.addEventListener("change",()=>n(o.value,!0)),s.append(o),{element:r,update:u=>o.value=String(u),setOptions:l}}function Ul(e,t,n,i){const a=qe(),{row:r,body:s}=ye(e,a,i),o=document.createElement("input");return o.type="checkbox",o.id=a,o.checked=t,o.addEventListener("change",()=>n(o.checked,!0)),s.append(o),{element:r,update:l=>o.checked=!!l}}function Bl(e,t,n,i){const a=qe(),{row:r,body:s}=ye(e,a,i),o=document.createElement("input");o.type="color",o.id=a;const l=document.createElement("input");l.type="text",l.className="control-hex",l.maxLength=7,l.spellcheck=!1,l.setAttribute("aria-label",`${e.label} hex code`);const u=c=>{o.value=String(c),l.value=String(c)};return u(t),o.addEventListener("input",()=>{l.value=o.value,n(o.value,!1)}),o.addEventListener("change",()=>n(o.value,!0)),l.addEventListener("change",()=>{const c=l.value.trim().startsWith("#")?l.value.trim():`#${l.value.trim()}`;/^#[0-9a-f]{6}$/i.test(c)?n(c.toLowerCase(),!0):l.value=o.value}),s.append(o,l),{element:r,update:u}}function Ol(e,t,n,i){const a=qe(),{row:r,body:s}=ye(e,a,i),o=document.createElement("input");return o.type="text",o.id=a,e.maxLength&&(o.maxLength=e.maxLength),o.value=t,o.addEventListener("input",()=>n(o.value,!1)),o.addEventListener("change",()=>n(o.value,!0)),s.append(o),{element:r,update:l=>{document.activeElement!==o&&(o.value=String(l))}}}function zl(e,t,n,i){const a=qe(),{row:r,body:s}=ye(e,a,i),o=document.createElement("input");o.type="number",o.id=a,o.className="control-number",o.min="0",o.step="1",o.value=String(t),o.addEventListener("change",()=>n(Number(o.value),!0));const l=document.createElement("button");return l.type="button",l.textContent="Re-roll",l.addEventListener("click",()=>n(Math.floor(Math.random()*2**31),!0)),s.append(o,l),{element:r,update:u=>o.value=String(u)}}function Q(e,t,n,i){switch(e.kind){case"number":return Fl(e,Number(t),n,i);case"select":return $l(e,String(t),n,i);case"toggle":return Ul(e,!!t,n,i);case"color":return Bl(e,String(t),n,i);case"text":return Ol(e,String(t),n,i);case"seed":return zl(e,Number(t),n,i);case"curve":{const{row:a,body:r}=ye(e,null,i),s=mr(i??e.label,t,(o,l)=>n(o,l));return r.append(s.element),{element:a,update:o=>s.update(o)}}}}const Wl={};class Gl{constructor(t,n={},i={}){this.store=t,this.element=document.createElement("aside"),this.element.className="panel",this.element.setAttribute("aria-label","Settings");const a=new Map;for(const s of we){if(s.parent){const d=a.get(s.parent);if(!d)throw new Error(`Section ${s.id}: parent ${s.parent} must come first`);const m=document.createElement("div");m.className="panel-subsection",m.dataset.section=s.id;const f=document.createElement("h3");if(f.textContent=s.title,m.append(f),s.description){const b=document.createElement("p");b.className="control-help",b.textContent=s.description,m.append(b)}const g=n[s.id];g&&m.append(g),this.addControls(s,m);const v=i[s.id];v&&m.append(v),d.append(m),this.subSections.push({section:s,element:m});continue}const o=document.createElement("details");o.className="panel-section",o.dataset.section=s.id,o.open=s.id==="upload"||s.id==="palette";const l=document.createElement("summary");l.textContent=s.title,o.append(l);const u=document.createElement("div");u.className="panel-section-body",o.append(u),a.set(s.id,u);const c=n[s.id];c&&u.append(c),this.addControls(s,u);const h=i[s.id];h&&u.append(h);const p=Wl[s.id];if(p&&s.settings.length===0&&!c){const d=document.createElement("p");d.className="panel-placeholder",d.textContent=p,u.append(d)}this.element.append(o)}const r=new Map;for(const{container:s,element:o}of this.atEnd){let l=r.get(s);l||(l=document.createElement("div"),l.className="panel-end",s.append(l),r.set(s,l)),l.append(o)}this.refresh(),t.subscribe(()=>this.refresh())}element;controls=[];subSections=[];atEnd=[];addControls(t,n){for(const i of t.settings){if(i.hidden)continue;const a=i.perInk?this.perInkControl(t.id,i):this.scalarControl(t.id,i);i.collapsed&&(a.element=Xl(i.collapsed,a.element)),i.placement==="end"?this.atEnd.push({container:n,element:a.element}):n.append(a.element),this.controls.push(a)}}scalarControl(t,n){const i=Q(n,this.store.getValue(t,n.key),(a,r)=>this.store.setValue(t,n.key,a,{commit:r}));return n.kind==="select"&&n.inkChoice?this.inkChoiceControl(t,n,i):{sectionId:t,def:n,element:i.element,update:()=>i.update(this.store.getValue(t,n.key))}}inkChoiceControl(t,n,i){const a=n.options.filter(s=>!/^\d+$/.test(s.value));let r="";return{sectionId:t,def:n,element:i.element,update:s=>{const{inkCount:o,inkColor:l}=s.palette,u=`${o}|${l.slice(0,o).join()}`;u!==r&&(r=u,i.setOptions?.([...a,...Array.from({length:o},(h,p)=>({value:String(p),label:`Ink ${p+1} · ${(l[p]??"").toUpperCase()}`}))]));const c=String(this.store.getValue(t,n.key));i.update(/^\d+$/.test(c)&&Number(c)>=o?String(o-1):c)}}}perInkControl(t,n){const i=document.createElement("div");i.className="control-group";const a=document.createElement("div");a.className="control-group-head";const r=document.createElement("span");r.className="control-label",r.textContent=n.label,a.append(r);const s=document.createElement("div");if(s.className="control-group-rows",i.append(a,s),n.help){const g=document.createElement("p");g.className="control-help",g.textContent=n.help,i.append(g)}const o=this.store,l=n.kind==="number";let u=null;const c=document.createElement("input");if(l){const g=document.createElement("label");g.className="control-link",c.type="checkbox",g.append(c,"Same for all inks"),a.append(g),c.addEventListener("change",()=>{u=c.checked,u?h(o.getValue(t,n.key)[0],!0):this.refresh()})}const h=(g,v)=>{const b=o.get().palette.inkCount,k=o.getValue(t,n.key);o.setValue(t,n.key,k.map((x,S)=>S<b?g:x),{commit:v})},p=g=>{const v=document.createElement("span");return v.className="ink-dot",v.style.setProperty("--swatch",g),v};let d="",m=[],f=o.get().palette.inkCount;return{sectionId:t,def:n,element:i,update(g){const{inkCount:v,inkColor:b}=g.palette,k=o.getValue(t,n.key),x=k.slice(0,v),S=x.every(M=>M===x[0]);u??=n.linkInks!==!1&&S;const y=v>f;f=v,u&&!S&&!y&&(u=!1);const w=l&&u&&v>1;l&&(c.checked=w,c.parentElement.hidden=v<2),w&&!S&&queueMicrotask(()=>h(k[0],!0));const T=`${v}|${b.join("|")}|${w}`;if(T!==d){if(d=T,s.innerHTML="",m=[],w){const M=Q({...n,help:void 0},k[0],(P,_)=>h(P,_),"All inks"),A=M.element.querySelector(".control-label");for(let P=v-1;P>=0;P--)A?.prepend(p(b[P]??"#000"));s.append(M.element),m.push(M);return}for(let M=0;M<v;M++){const A=Q({...n,help:void 0},k[M],(P,_)=>o.setInkValue(t,n.key,M,P,{commit:_}),(b[M]??"").toUpperCase());A.element.querySelector(".control-label")?.prepend(p(b[M]??"#000")),s.append(A.element),m.push(A)}}else m.forEach((M,A)=>M.update(k[A]))}}}refresh(){const t=this.store.get();for(const{section:n,element:i}of this.subSections)i.hidden=n.visibleWhen?!n.visibleWhen(t):!1;for(const n of this.controls)n.update(t),n.element.hidden=!hr(n.def,t,n.sectionId)}}function Xl(e,t){const n=document.createElement("details");n.className="control-more";const i=document.createElement("summary");return i.textContent=e,n.append(i,t),n}const Hl=`#version 300 es
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
${re}
${Xt}
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
`,ql=["uImage","uDetail","uDetailRect","uViewSize","uImageSize","uOrigin","uScale","uBackground","uPaper","uFrameMode","uFrameCanvas","uFrameInner","uFrameRadius","uFrameColor"];class jl{constructor(t,n){this.canvas=t,this.background=n,this.gl=Xa(t,{alpha:!1,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!0}),this.program=Bn(this.gl,On,Hl),this.uniforms=Ha(this.gl,this.program,ql)}gl;program;uniforms;source=null;magNearest=new WeakMap;paper=[1,1,1];frame=null;setPaper(t){this.paper=t}setFrame(t){this.frame=t}setSource(t){this.source=t}render(t,n,i,a="full",r=!0){const s=this.gl,{width:o,height:l}=this.canvas;if(s.bindFramebuffer(s.FRAMEBUFFER,null),s.viewport(0,0,o,l),!this.source||n===0){const[d,m,f]=this.background.map(be);return s.clearColor(d,m,f,1),s.clear(s.COLOR_BUFFER_BIT),!0}if(this.source.kind==="procedural")return this.source.draw(t,o,l,a,r);const c=this.source.textureWidth>=n&&t.scale>=2;s.activeTexture(s.TEXTURE0),s.bindTexture(s.TEXTURE_2D,this.source.texture),c!==(this.magNearest.get(this.source.texture)??!1)&&(s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,c?s.NEAREST:s.LINEAR),this.magNearest.set(this.source.texture,c));const h=this.source.detail;s.activeTexture(s.TEXTURE1),s.bindTexture(s.TEXTURE_2D,h?.texture??this.source.texture),s.activeTexture(s.TEXTURE0),s.useProgram(this.program),s.uniform1i(this.uniforms.uImage,0),s.uniform1i(this.uniforms.uDetail,1),s.uniform4f(this.uniforms.uDetailRect,h?.x??0,h?.y??0,h?.width??0,h?.height??0),s.uniform2f(this.uniforms.uViewSize,o,l),s.uniform2f(this.uniforms.uImageSize,n,i),s.uniform2f(this.uniforms.uOrigin,t.originX,t.originY),s.uniform1f(this.uniforms.uScale,t.scale),s.uniform3f(this.uniforms.uBackground,...this.background),s.uniform3f(this.uniforms.uPaper,...this.paper);const p=this.frame?.geometry;return s.uniform1i(this.uniforms.uFrameMode,p?.mode??0),p&&(s.uniform4f(this.uniforms.uFrameCanvas,...p.canvas),s.uniform4f(this.uniforms.uFrameInner,...p.inner),s.uniform1f(this.uniforms.uFrameRadius,p.radius),s.uniform3f(this.uniforms.uFrameColor,...this.frame.color)),s.drawArrays(s.TRIANGLES,0,3),!0}}function Vl(e){const t=e.layout;return{x0:-t.imageX/t.scale,y0:-t.imageY/t.scale,x1:(t.width-t.imageX)/t.scale,y1:(t.height-t.imageY)/t.scale}}function Yl(e,t,n,i){const a=t.layout,r=n.scale/a.scale,s=d=>n.originX+(d-a.imageX)*r,o=d=>n.originY+(d-a.imageY)*r,l=d=>[s(d.x),o(d.y),d.width*r,d.height*r];e.save(),e.shadowColor="rgba(0, 0, 0, 0.18)",e.shadowBlur=12*i,e.shadowOffsetY=2*i,e.fillStyle=t.paper;const u=l({x:0,y:0,width:a.width,height:a.height});e.beginPath(),e.rect(...u);const c=l(a.art);e.rect(c[0]+c[2],c[1],-c[2],c[3]),e.fill("evenodd"),e.restore(),e.lineWidth=1*i,a.trim.x>.5&&(e.strokeStyle="rgba(0, 0, 0, 0.35)",e.setLineDash([2*i,3*i]),e.strokeRect(...l(a.trim))),a.printable&&(e.strokeStyle="rgba(210, 60, 50, 0.85)",e.setLineDash([6*i,4*i]),e.strokeRect(...l(a.printable))),e.setLineDash([]);const h=Math.max(1,.2/25.4*(a.dpi??300)*r);e.strokeStyle="#000",e.fillStyle="#000",e.lineWidth=h;let p=!1;for(const d of t.marks)if(d.kind==="line")e.beginPath(),e.moveTo(s(d.x0),o(d.y0)),e.lineTo(s(d.x1),o(d.y1)),e.stroke();else if(d.kind==="target"){const m=d.r*r,f=[s(d.cx),o(d.cy)];e.beginPath(),e.arc(f[0],f[1],m,0,Math.PI*2),e.moveTo(f[0]-m*1.5,f[1]),e.lineTo(f[0]+m*1.5,f[1]),e.moveTo(f[0],f[1]-m*1.5),e.lineTo(f[0],f[1]+m*1.5),e.stroke()}else p||(p=!0,e.font=`${Math.max(1,d.size*r)}px system-ui, sans-serif`,e.fillText(d.text,s(d.x),o(d.y)))}const qi=32,Kl=24,Jl=4,Zl=160;class Ql{constructor(t){this.options=t,this.element=document.createElement("section"),this.element.className="preview",this.element.setAttribute("aria-label","Preview"),this.canvas=document.createElement("canvas"),this.canvas.className="preview-canvas",this.overlay=document.createElement("canvas"),this.overlay.className="preview-overlay",this.element.append(this.canvas,this.overlay),this.renderer=new jl(this.canvas,t.background),this.emptyState=document.createElement("div"),this.emptyState.className="preview-empty",this.emptyState.innerHTML='<p><strong>Drop an image here</strong><br />or use Upload in the panel.</p><p class="hint">JPG, PNG, or WebP</p>',this.element.append(this.emptyState);const n=document.createElement("div");n.className="preview-toolbar";const i=(r,s,o)=>{const l=document.createElement("button");return l.type="button",l.textContent=r,l.title=s,l.addEventListener("click",o),n.append(l),l},a=document.createElement("div");a.className="segmented preview-modes";for(const[r,s,o]of[["inks","Inks","Show the image printed in your inks (I)"],["original","Original","Show the original image (O)"]]){const l=document.createElement("button");l.type="button",l.textContent=s,l.title=o,l.dataset.value=r,l.addEventListener("click",()=>this.setDisplayMode(r)),a.append(l),this.modeButtons.push(l)}n.append(a),i("−","Zoom out (−)",()=>this.zoomBy(1/Math.SQRT2)),this.zoomLabel=i("100%","Actual pixels (1)",()=>this.zoomTo(1)),this.zoomLabel.classList.add("zoom-label"),i("+","Zoom in (+)",()=>this.zoomBy(Math.SQRT2)),i("Fit","Fit to screen (0)",()=>this.fit()),this.element.append(n),n.hidden=!0,this.setDisplayMode("inks"),this.bindInteractions(),this.bindDrop(),new ResizeObserver(()=>this.resize()).observe(this.element)}element;canvas;overlay;page=null;renderer;emptyState;zoomLabel;modeButtons=[];sources={inks:null,original:null};displayMode="inks";imageWidth=0;imageHeight=0;margin=0;frame=null;view={scale:1,originX:0,originY:0};fitted=!0;frameRequested=!1;restart=!0;interacting=!1;settleTimer=null;pointers=new Map;pickHandler=null;pressStart=null;gesture=null;setPaper(t){this.renderer.setPaper(t),this.requestRender()}onContextLost(t){this.canvas.addEventListener("webglcontextlost",t)}setPickHandler(t){this.pickHandler?.onLeave(),this.pickHandler=t,this.canvas.classList.toggle("picking",t!==null)}get hasImage(){return this.imageWidth>0}get gl(){return this.renderer.gl}get mode(){return this.displayMode}setDisplayMode(t){this.displayMode=t;for(const n of this.modeButtons){const i=n.dataset.value===t;n.classList.toggle("active",i),n.setAttribute("aria-pressed",String(i))}this.renderer.setSource(this.sources[t]),this.requestRender()}setSource(t,n){this.sources[t]=n,t===this.displayMode&&(this.renderer.setSource(n),this.requestRender())}setFrame(t,n){this.frame={geometry:t,color:n};const i=t.margin,a=i!==this.margin&&this.fitted;this.margin=i,a&&this.fit(),this.requestRender()}setPage(t){const n=this.bounds();this.page=t;const i=this.bounds();this.fitted&&(n.x0!==i.x0||n.y0!==i.y0||n.x1!==i.x1||n.y1!==i.y1)&&this.fit(),this.requestRender()}bounds(){return this.page?Vl(this.page):{x0:-this.margin,y0:-this.margin,x1:this.imageWidth+this.margin,y1:this.imageHeight+this.margin}}setImageSize(t,n){this.imageWidth=t,this.imageHeight=n,this.emptyState.hidden=!0,this.element.querySelector(".preview-toolbar").hidden=!1,this.element.classList.add("has-image"),this.fit()}clientToImage(t,n){const i=this.canvas.getBoundingClientRect(),a=this.canvas.width/Math.max(1,i.width);return{x:((t-i.left)*a-this.view.originX)/this.view.scale,y:((n-i.top)*a-this.view.originY)/this.view.scale}}fit(){if(!this.hasImage)return;const t=Kl*this.dpr(),n=Math.max(1,this.canvas.width-t*2),i=Math.max(1,this.canvas.height-t*2),a=this.bounds(),r=a.x1-a.x0,s=a.y1-a.y0,o=Math.min(n/r,i/s);this.view={scale:o,originX:(this.canvas.width-r*o)/2-a.x0*o,originY:(this.canvas.height-s*o)/2-a.y0*o},this.fitted=!0,this.changed()}zoomTo(t){this.zoomAround(t,this.canvas.width/2,this.canvas.height/2)}zoomBy(t){this.zoomTo(this.view.scale*t)}minScale(){if(!this.hasImage)return .01;const t=this.bounds(),n=Math.min(this.canvas.width/(t.x1-t.x0),this.canvas.height/(t.y1-t.y0));return Math.min(n/4,1)}zoomAround(t,n,i){if(!this.hasImage)return;const a=Math.min(qi,Math.max(this.minScale(),t)),r=a/this.view.scale;this.view={scale:a,originX:n-(n-this.view.originX)*r,originY:i-(i-this.view.originY)*r},this.fitted=!1,this.changed()}dpr(){return window.devicePixelRatio||1}resize(){const t=this.element.getBoundingClientRect(),n=this.dpr(),i=Math.max(1,Math.round(t.width*n)),a=Math.max(1,Math.round(t.height*n));if(i===this.canvas.width&&a===this.canvas.height)return;const r=(this.canvas.width/2-this.view.originX)/this.view.scale,s=(this.canvas.height/2-this.view.originY)/this.view.scale;this.canvas.width=i,this.canvas.height=a,this.overlay.width=i,this.overlay.height=a,this.requestRender(),this.fitted?this.fit():(this.view.originX=i/2-r*this.view.scale,this.view.originY=a/2-s*this.view.scale,this.changed())}changed(){this.zoomLabel.textContent=`${Math.round(this.view.scale*100)}%`,this.options.onViewChange?.(this.view.scale),this.interacting=!0,this.settleTimer!==null&&clearTimeout(this.settleTimer),this.settleTimer=setTimeout(()=>{this.settleTimer=null,this.interacting=!1,this.requestRender(),this.options.onViewSettled?.()},Zl),this.requestRender()}get currentView(){return{...this.view}}get canvasSize(){return{width:this.canvas.width,height:this.canvas.height}}requestRender(){this.restart=!0,!this.frameRequested&&(this.frameRequested=!0,requestAnimationFrame(()=>this.renderFrame()))}renderFrame(){this.frameRequested=!1;const t=this.restart;this.restart=!1,this.renderer.setFrame(this.displayMode==="inks"?this.frame:null);const n=this.renderer.render(this.view,this.imageWidth,this.imageHeight,this.interacting?"fast":"full",t);if(t){const i=this.overlay.getContext("2d");i.clearRect(0,0,this.overlay.width,this.overlay.height),this.page&&this.hasImage&&Yl(i,this.page,this.view,this.dpr())}!n&&!this.frameRequested&&(this.frameRequested=!0,requestAnimationFrame(()=>this.renderFrame()))}devicePoint(t){const n=this.canvas.getBoundingClientRect(),i=this.canvas.width/Math.max(1,n.width);return{x:(t.clientX-n.left)*i,y:(t.clientY-n.top)*i}}bindInteractions(){const t=this.canvas;t.addEventListener("wheel",i=>{if(!this.hasImage)return;i.preventDefault();const a=i.deltaMode===1?16:i.deltaMode===2?400:1,r=i.ctrlKey?.01:.0015,s=Math.exp(-i.deltaY*a*r),o=this.devicePoint(i);this.zoomAround(this.view.scale*s,o.x,o.y)},{passive:!1}),t.addEventListener("pointerdown",i=>{this.hasImage&&(t.setPointerCapture(i.pointerId),this.pointers.set(i.pointerId,this.devicePoint(i)),this.pressStart=this.pointers.size===1?{x:i.clientX,y:i.clientY,moved:!1}:null,this.startGesture(),t.classList.add("panning"))}),t.addEventListener("pointermove",i=>{if(this.pickHandler&&this.pointers.size===0&&this.pickHandler.onHover(i.clientX,i.clientY),!this.pointers.has(i.pointerId)||!this.gesture||(this.pressStart&&Math.hypot(i.clientX-this.pressStart.x,i.clientY-this.pressStart.y)>Jl&&(this.pressStart.moved=!0),this.pickHandler&&this.pressStart&&!this.pressStart.moved))return;this.pointers.set(i.pointerId,this.devicePoint(i));const{midX:a,midY:r,dist:s}=this.pointerSummary(),o=this.gesture,l=this.pointers.size>=2&&o.dist>0?Math.min(qi,Math.max(this.minScale(),o.scale*s/o.dist)):o.scale,u=(o.midX-o.originX)/o.scale,c=(o.midY-o.originY)/o.scale;this.view={scale:l,originX:a-u*l,originY:r-c*l},this.fitted=!1,this.changed()});const n=i=>{if(!this.pointers.delete(i.pointerId))return;const a=this.pressStart;this.pressStart=null,i.type==="pointerup"&&this.pickHandler&&a&&!a.moved&&this.pointers.size===0&&this.pickHandler.onPick(i.clientX,i.clientY),this.pointers.size>0?this.startGesture():(this.gesture=null,t.classList.remove("panning"))};t.addEventListener("pointerup",n),t.addEventListener("pointercancel",n),t.addEventListener("pointerleave",()=>this.pickHandler?.onLeave()),t.addEventListener("dblclick",i=>{if(!this.hasImage||this.pickHandler)return;const a=this.devicePoint(i);Math.abs(this.view.scale-1)<.01?this.fit():this.zoomAround(1,a.x,a.y)})}startGesture(){const{midX:t,midY:n,dist:i}=this.pointerSummary();this.gesture={scale:this.view.scale,originX:this.view.originX,originY:this.view.originY,midX:t,midY:n,dist:i}}pointerSummary(){const t=[...this.pointers.values()],n=t[0]??{x:0,y:0},i=t[1];return i?{midX:(n.x+i.x)/2,midY:(n.y+i.y)/2,dist:Math.hypot(n.x-i.x,n.y-i.y)}:{midX:n.x,midY:n.y,dist:0}}bindDrop(){const t=this.element;let n=0;t.addEventListener("dragenter",i=>{i.dataTransfer?.types.includes("Files")&&(i.preventDefault(),n++,t.classList.add("drag-over"))}),t.addEventListener("dragover",i=>{i.dataTransfer?.types.includes("Files")&&(i.preventDefault(),i.dataTransfer.dropEffect="copy")}),t.addEventListener("dragleave",()=>{n=Math.max(0,n-1),n===0&&t.classList.remove("drag-over")}),t.addEventListener("drop",i=>{i.preventDefault(),n=0,t.classList.remove("drag-over"),i.dataTransfer?.files.length&&this.options.onFilesDropped(i.dataTransfer.files)})}}const eu=160,tu=30,kn=4;function nu(e){const t=Math.min(1,eu/Math.max(e.width,e.height)),n=Math.max(1,Math.round(e.width*t)),i=Math.max(1,Math.round(e.height*t)),r=new OffscreenCanvas(n,i).getContext("2d",{willReadFrequently:!0});r.imageSmoothingQuality="high",r.drawImage(e,0,0,n,i);const s=r.getImageData(0,0,n,i).data,o=new Float32Array(256);for(let u=0;u<256;u++)o[u]=ae(u/255);const l=[];for(let u=0;u<s.length;u+=4)s[u+3]<128||l.push(Ra({r:o[s[u]],g:o[s[u+1]],b:o[s[u+2]]}));return l}function At(e,t){const n=e.l-t.l,i=e.a-t.a,a=e.b-t.b;return n*n+i*i+a*a}function yn(e,t,n,i){const a=ke(i),r=[...n],s=new Float64Array(e.length).fill(1/0),o=c=>{for(let h=0;h<e.length;h++)s[h]=Math.min(s[h],At(e[h],c))};for(const c of r)o(c);for(;r.length<t;){let c=0;for(let m=0;m<e.length;m++)c+=r.length?s[m]:1;let h=a()*c,p=e.length-1;for(let m=0;m<e.length;m++)if(h-=r.length?s[m]:1,h<=0){p=m;break}const d={...e[p]};r.push(d),o(d)}const l=new Int32Array(e.length);let u=0;for(let c=0;c<tu;c++){u=0;for(let d=0;d<e.length;d++){let m=0,f=1/0;for(let g=0;g<t;g++){const v=At(e[d],r[g]);v<f&&(f=v,m=g)}l[d]=m,u+=f}const h=Array.from({length:t},()=>({l:0,a:0,b:0,n:0}));for(let d=0;d<e.length;d++){const m=h[l[d]],f=e[d];m.l+=f.l,m.a+=f.a,m.b+=f.b,m.n++}let p=!1;for(let d=n.length;d<t;d++){const m=h[d];if(m.n===0)continue;const f={l:m.l/m.n,a:m.a/m.n,b:m.b/m.n};At(f,r[d])>1e-4&&(p=!0),r[d]=f}if(!p)break}return{centers:r,assign:l,error:u}}const pr=.3;function xn(e,t,n,i,a){const r=[];for(let l=0;l<e.length;l++)t[l]===n&&r.push({p:e[l],d:At(e[l],i)});if(r.length===0)return a;r.sort((l,u)=>u.d-l.d);const s=Math.max(1,Math.round(r.length*pr)),o={l:0,a:0,b:0};for(let l=0;l<s;l++){const u=r[l].p;o.l+=u.l,o.a+=u.a,o.b+=u.b}return{l:o.l/s,a:o.a/s,b:o.b/s}}function iu(e,t,n){const i=n?ee(n):null,a=i?[He(i)]:[];if(e.length===0)return{inks:Array(t).fill("#000000"),paper:n??"#ffffff"};const r=t+1;let s=null;for(let p=0;p<kn;p++){const d=yn(e,Math.min(r,Math.max(e.length,a.length+1)),a,1+p*7919);(!s||d.error<s.error)&&(s=d)}if(!s)return{inks:Array(t).fill("#000000"),paper:n??"#ffffff"};const{centers:o,assign:l}=s,u=n?0:o.reduce((p,d,m)=>d.l>o[p].l?m:p,0),c=o[u]??{l:100,a:0,b:0},h=o.map((p,d)=>({c:p,i:d})).filter(({i:p})=>p!==u).map(({c:p,i:d})=>xn(e,l,d,c,p));for(;h.length<t;)h.push(h[h.length-1]??{l:0,a:0,b:0});return h.sort((p,d)=>d.l-p.l),{inks:h.map(p=>me(Dt(p))),paper:n??me(Dt(c))}}const au=12,ru=8,fr=12,su=.4,de=e=>Math.hypot(e.a,e.b),ou=(e,t)=>{const n=Math.abs(Math.atan2(e.b,e.a)-Math.atan2(t.b,t.a))*(180/Math.PI);return n>180?360-n:n};function ji(e,t,n,i){const a=[];for(let o=0;o<e.length;o++)t[o]===n&&a.push(e[o]);if(a.length===0)return i;a.sort((o,l)=>de(l)-de(o));const r=Math.max(1,Math.round(a.length*pr)),s={l:0,a:0,b:0};for(let o=0;o<r;o++)s.l+=a[o].l,s.a+=a[o].a,s.b+=a[o].b;return{l:s.l/r,a:s.a/r,b:s.b/r}}function lu(e,t){const n=t?ee(t):null,i=n?[He(n)]:[],a=Math.min(au+1,Math.max(i.length+1,e.length));let r=null;for(let g=0;g<kn;g++){const v=yn(e,a,i,101+g*7919);(!r||v.error<r.error)&&(r=v)}const{centers:s,assign:o}=r,l=t?0:s.reduce((g,v,b)=>v.l>s[g].l?b:g,0),u=s[l]??{l:100,a:0,b:0},c=new Array(s.length).fill(0);for(let g=0;g<e.length;g++)c[o[g]]++;const h=e.length-(c[l]??0)||1,p=[];s.forEach((g,v)=>{v===l||c[v]===0||p.push({share:c[v]/h,strong:xn(e,o,v,u,g),vivid:ji(e,o,v,g)})});const d=e.map(de).sort((g,v)=>g-v),m=Math.max(12,d[Math.floor(d.length*.6)]??0),f=e.filter(g=>de(g)>=m);if(f.length>=20){const g=f.map(x=>({l:x.l*.5,a:x.a,b:x.b})),v=Math.min(ru,f.length);let b=null;for(let x=0;x<kn;x++){const S=yn(g,v,[],211+x*7919);(!b||S.error<b.error)&&(b=S)}const k=new Array(v).fill(0);for(let x=0;x<f.length;x++)k[b.assign[x]]++;b.centers.forEach((x,S)=>{if(k[S]===0)return;const y={l:x.l*2,a:x.a,b:x.b},w={share:k[S]/h,strong:xn(f,b.assign,S,u,y),vivid:ji(f,b.assign,S,y)};p.some(T=>Nt(T.vivid,w.vivid)<8)||p.push(w)})}return{candidates:p,paper:u}}const gr=(e,t)=>t==="vibrant"?e.vivid:e.strong;function uu(e,t){const n=e.map(a=>gr(a,t));let i;if(t==="balanced")i=e.reduce((a,r)=>a+r.share,0);else if(t==="vibrant")i=e.reduce((a,r,s)=>a+Math.pow(de(n[s]),1.5)*Math.pow(r.share,.25)*Math.min(1,r.share/.01),0);else{let a=1/0,r=0,s=0;for(let o=0;o<n.length;o++)for(let l=o+1;l<n.length;l++){const u=Nt(n[o],n[l]);a=Math.min(a,u),r+=u,s++}i=s?a+.25*(r/s):de(n[0]);for(const o of e)i*=Math.min(1,o.share/.02)}for(let a=0;a<n.length;a++)for(let r=a+1;r<n.length;r++)Nt(n[a],n[r])<fr?i*=.3:t==="vibrant"&&de(n[a])>15&&de(n[r])>15&&ou(n[a],n[r])<30&&(i*=.5);return i}function cu(e,t){const n=[],i=(a,r)=>{if(r.length===t){n.push(r.slice());return}for(let s=a;s<e.length;s++)r.push(e[s]),i(s+1,r),r.pop()};return i(0,[]),n}function hu(e,t){return e.length===t.length&&e.every((n,i)=>Nt(n,t[i])<fr)}const wn=e=>e.slice().sort((t,n)=>n.l-t.l),rn=e=>He(ee(e)??{r:0,g:0,b:0});function du(e,t,n,i){const a=Math.min(t,e.length),r=cu(e,a).map(o=>({set:o,score:uu(o,n)})).sort((o,l)=>l.score-o.score),s=i?[i]:[];for(const{set:o}of r){const l=wn(o.map(u=>gr(u,n)));if(s.some(u=>hu(u,l))||s.push(l),s.length>=24)break}return s}const Vi=e=>{const t=Ca(e);return[t.r,t.g,t.b].every(n=>n>=-1e-4&&n<=1+1e-4)};function mu(e,t){const n=de(e);if(t<=0||n<3||!Vi(e))return e;const i=e.a/n,a=e.b/n;let r=n,s=200;for(let l=0;l<24;l++){const u=(r+s)/2;Vi({l:e.l,a:i*u,b:a*u})?r=u:s=u}const o=n+(r-n)*t;return{l:e.l,a:i*o,b:a*o}}function pu(e,t,n,i={style:"balanced",vividness:0,variant:0}){const a=nu(e);if(a.length===0)return{inks:Array(t).fill("#000000"),paper:n??"#ffffff"};const{style:r,vividness:s,variant:o}=i,l=iu(a,t,n);let u,c=l.paper;if(r==="balanced"&&o===0)u=l.inks.map(rn);else{const p=lu(a,n);n||(c=me(Dt(p.paper)));const d=r==="balanced"?wn(l.inks.map(rn)):null,m=du(p.candidates,t,r,d);for(u=m.length?m[o%m.length]:l.inks.map(rn);u.length<t;)u.push(u[u.length-1]??{l:0,a:0,b:0})}const h=r==="vibrant"?1-(1-su)*(1-s):s;return{inks:wn(u.map(p=>mu(p,h))).map(p=>me(Dt(p))),paper:c}}const fu=["#0078bf","#ff48b0","#ffe800","#000000","#00a95c","#ff6c2f","#765ba7"];class gu{constructor(t,n){this.store=t,this.source=n,t.subscribe((i,a)=>{if(i.palette.source!=="auto"||!a.commit)return;a.section==="palette"&&(a.key==="source"||a.key==="inkCount"||a.key==="autoIncludeBackground"||a.key==="autoStyle"||a.key==="autoVividness"||a.key==="autoVariant"||a.key==="paper"&&!i.palette.autoIncludeBackground)&&this.runAuto()}),t.subscribe((i,a)=>{if(!(i.palette.source!=="scheme"||a.section!=="palette"))if(a.key==="source"&&a.commit){const r=i.palette.inkColor[0]??"#0078bf";r!==i.palette.schemeBase?this.store.set("palette","schemeBase",r):this.runScheme()}else a.key==="schemeIncludeBackground"?(i.palette.schemeIncludeBackground?this.paperBeforeScheme=i.palette.paper:this.paperBeforeScheme&&this.store.set("palette","paper",this.paperBeforeScheme),this.runScheme()):(a.key==="scheme"||a.key==="schemeBase")&&this.runScheme(a.commit)}),n.subscribe(()=>{t.get().palette.source==="auto"&&this.runAuto()})}paperBeforeScheme=null;get palette(){return this.store.get().palette}leaveGenerated(){this.palette.source!=="manual"&&this.store.set("palette","source","manual")}setInkColor(t,n,i=!0){const a=this.palette;if(a.source==="scheme"&&t===0&&a.scheme!=="cmyk"){this.store.set("palette","schemeBase",n,{commit:i});return}this.leaveGenerated(),this.store.setInkValue("palette","inkColor",t,n,{commit:i})}setPaper(t,n=!0){const i=this.palette;(i.source==="auto"&&i.autoIncludeBackground||i.source==="scheme"&&i.schemeIncludeBackground)&&this.leaveGenerated(),this.store.set("palette","paper",t,{commit:n})}addInk(){this.palette.source==="scheme"&&this.leaveGenerated();const t=this.palette.inkCount;if(t>=W)return;const n=new Set(this.palette.inkColor.slice(0,t)),i=fu.find(a=>!n.has(a))??"#000000";this.store.resetInkSlot(t),this.store.setInkValue("palette","inkColor",t,i),this.store.set("palette","inkCount",t+1)}removeInk(t){this.palette.source==="scheme"&&this.leaveGenerated();const n=this.palette.inkCount;if(n<=1)return;const i=[...Array(W).keys()].filter(a=>a!==t);i.push(t),this.store.permuteInks(i),this.store.set("palette","inkCount",n-1)}moveInk(t,n){const i=t+n;if(i<0||i>=this.palette.inkCount)return;const a=[...Array(W).keys()];a[t]=i,a[i]=t,this.store.permuteInks(a)}runScheme(t=!0){const n=this.palette,i=us(n.scheme,n.schemeBase,n.schemeIncludeBackground),a=Math.min(W,i.inks.length);for(let s=n.inkCount;s<a;s++)this.store.resetInkSlot(s);const r=this.palette.inkColor.slice();i.inks.slice(0,a).forEach((s,o)=>r[o]=s),this.store.setValue("palette","inkColor",r,{commit:t}),a!==n.inkCount&&this.store.set("palette","inkCount",a,{commit:t}),i.paper&&this.store.set("palette","paper",i.paper,{commit:t})}runAuto(){const t=this.source.get();if(!t)return;const{inkCount:n,autoIncludeBackground:i,paper:a,autoStyle:r,autoVividness:s,autoVariant:o}=this.palette,l=pu(t.bitmap,n,i?null:a,{style:r,vividness:s/100,variant:o}),u=this.palette.inkColor.slice();l.inks.forEach((c,h)=>u[h]=c),this.store.setValue("palette","inkColor",u),i&&this.store.set("palette","paper",l.paper)}}const Je=1;function lt(e,t){return!e||!t?e===t:e.kind!==t.kind?!1:e.kind==="ink"?e.slot===t.slot:e.kind==="custom"?e.id===t.id:!0}class vu{constructor(t,n,i){this.preview=t,this.getBitmap=n,this.onPicked=i,this.loupe=document.createElement("div"),this.loupe.className="loupe",this.loupe.hidden=!0,t.element.append(this.loupe),window.addEventListener("keydown",a=>{a.key==="Escape"&&this.target&&this.stop()})}target=null;listeners=new Set;loupe;sampler=new OffscreenCanvas(Je*2+1,Je*2+1);samplerCtx=this.sampler.getContext("2d",{willReadFrequently:!0});get active(){return this.target}toggle(t){lt(this.target,t)?this.stop():this.start(t)}start(t){this.getBitmap()&&(this.target=t,this.preview.setPickHandler({onHover:(n,i)=>this.hover(n,i),onPick:(n,i)=>this.pick(n,i),onLeave:()=>this.loupe.hidden=!0}),this.notify())}stop(){this.target&&(this.target=null,this.preview.setPickHandler(null),this.loupe.hidden=!0,this.notify())}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){for(const t of this.listeners)t(this.target)}sampleAt(t,n){const i=this.getBitmap();if(!i)return null;const a=this.preview.clientToImage(t,n),r=Math.floor(a.x),s=Math.floor(a.y);if(r<0||s<0||r>=i.width||s>=i.height)return null;const o=Je*2+1,l=this.samplerCtx;l.clearRect(0,0,o,o),l.drawImage(i,r-Je,s-Je,o,o,0,0,o,o);const u=l.getImageData(0,0,o,o).data;let c=0,h=0,p=0,d=0;for(let f=0;f<u.length;f+=4)u[f+3]!==0&&(c+=ae(u[f]/255),h+=ae(u[f+1]/255),p+=ae(u[f+2]/255),d++);if(d===0)return null;const m=f=>be(f/d)*255;return me({r:m(c),g:m(h),b:m(p)})}hover(t,n){const i=this.sampleAt(t,n);if(!i){this.loupe.hidden=!0;return}const a=this.preview.element.getBoundingClientRect();this.loupe.hidden=!1,this.loupe.style.left=`${t-a.left+16}px`,this.loupe.style.top=`${n-a.top+16}px`,this.loupe.style.setProperty("--loupe-color",i),this.loupe.textContent=i}pick(t,n){const i=this.sampleAt(t,n);if(!i||!this.target)return;const a=this.target;this.stop(),this.onPicked(a,i)}}const bu=[{name:"White",hex:"#ffffff"},{name:"Natural",hex:"#f6f3ec"},{name:"Cream",hex:"#f3e9d2"},{name:"Newsprint",hex:"#e8e4d8"},{name:"Kraft",hex:"#c9a77c"},{name:"Gray",hex:"#b9b8b4"},{name:"Black",hex:"#1e1e1e"}];let Be=null;function ku(){Be?.close()}function yu(e){const t=Be!==null&&e.anchor.dataset.popoverId!==void 0&&Be.element.dataset.anchorId===e.anchor.dataset.popoverId;if(ku(),t)return;const n=document.createElement("div");n.className="swatch-popover",n.setAttribute("role","dialog"),n.setAttribute("aria-label",e.title),e.anchor.dataset.popoverId||=String(Math.random()),n.dataset.anchorId=e.anchor.dataset.popoverId;const i=document.createElement("p");i.className="swatch-popover-title",i.textContent=e.title,n.append(i);const a=document.createElement("div");a.className="swatch-grid";for(const m of e.presets){const f=document.createElement("button");f.type="button",f.className="swatch-choice",f.style.setProperty("--swatch",m.hex),f.title=`${m.name} ${m.hex}`,f.setAttribute("aria-label",m.name),m.hex===e.current&&f.classList.add("current"),f.addEventListener("click",()=>{e.onPick(m.hex,!0),p()}),a.append(f)}e.presets.length>0&&n.append(a);const r=document.createElement("div");r.className=e.presets.length>0?"swatch-custom":"swatch-custom swatch-custom-only";const s=document.createElement("span");s.textContent=e.presets.length>0?"Custom":"Color";const o=document.createElement("input");o.type="color",o.value=e.current,o.setAttribute("aria-label",e.presets.length>0?"Custom color":e.title);const l=document.createElement("input");l.type="text",l.className="control-hex",l.maxLength=7,l.spellcheck=!1,l.value=e.current,l.setAttribute("aria-label","Hex code"),o.addEventListener("input",()=>{l.value=o.value,e.onPick(o.value,!1)}),o.addEventListener("change",()=>e.onPick(o.value,!0)),l.addEventListener("change",()=>{const m=vr(l.value);m?(o.value=m,e.onPick(m,!0)):l.value=o.value}),r.append(s,o,l),n.append(r),document.body.append(n),Yi(n,e.anchor);const u=m=>{const f=m.target;!n.contains(f)&&!e.anchor.contains(f)&&p()},c=m=>{m.key==="Escape"&&(p(),e.anchor.focus())},h=()=>Yi(n,e.anchor);document.addEventListener("pointerdown",u,!0),document.addEventListener("keydown",c),window.addEventListener("resize",h),document.addEventListener("scroll",h,!0);function p(){n.remove(),document.removeEventListener("pointerdown",u,!0),document.removeEventListener("keydown",c),window.removeEventListener("resize",h),document.removeEventListener("scroll",h,!0),Be?.element===n&&(Be=null)}Be={element:n,close:p},(a.querySelector("button.current")??a.querySelector("button")??l).focus()}function Yi(e,t){const n=t.getBoundingClientRect(),i=e.offsetWidth,a=e.offsetHeight;let r=Math.min(n.left,window.innerWidth-i-8),s=n.bottom+6;s+a>window.innerHeight-8&&(s=Math.max(8,n.top-a-6)),r=Math.max(8,r),e.style.left=`${r}px`,e.style.top=`${s}px`}function vr(e){const t=e.trim().replace(/^#?/,"#").toLowerCase();return/^#[0-9a-f]{6}$/.test(t)?t:/^#[0-9a-f]{3}$/.test(t)?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:null}const Ki='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M20.7 5.6 18.4 3.3a1 1 0 0 0-1.4 0l-3.1 3.1-1.3-1.3-1.4 1.4 1.3 1.3-7.8 7.8-.7 3.5-.9.9 1.4 1.4.9-.9 3.5-.7 7.8-7.8 1.3 1.3 1.4-1.4-1.3-1.3 3.1-3.1a1 1 0 0 0 0-1.4ZM8 18.3l-1.9.4.4-1.9 7.7-7.7 1.5 1.5L8 18.3Z"/></svg>';function Ze(e,t,n=""){const i=document.createElement("button");return i.type="button",i.className=`icon-button ${n}`.trim(),i.title=e,i.setAttribute("aria-label",e),i.innerHTML=t,i}function Ji(e,t){const n=document.createElement("input");return n.type="text",n.className="control-hex",n.maxLength=7,n.spellcheck=!1,n.setAttribute("aria-label",e),n.addEventListener("change",()=>{const i=vr(n.value);i?t(i):n.value=n.dataset.value??""}),n.addEventListener("blur",()=>n.value=n.dataset.value??n.value),n}function xu(e,t,n,i){const a=document.createElement("div");a.className="palette-block";const r=te("palette","source"),s=Q(r,e.get().palette.source,L=>e.setValue("palette","source",L)),o=te("palette","autoIncludeBackground"),l=Q(o,e.get().palette.autoIncludeBackground,L=>e.setValue("palette","autoIncludeBackground",L)),u=document.createElement("p");u.className="control-help";const c=Q(te("palette","autoStyle"),e.get().palette.autoStyle,L=>{e.setValue("palette","autoStyle",L),e.setValue("palette","autoVariant",0)}),h=Q(te("palette","autoVividness"),e.get().palette.autoVividness,(L,F)=>e.setValue("palette","autoVividness",L,{commit:F})),p=document.createElement("button");p.type="button",p.textContent="Try another",p.title="The next palette for this style",p.addEventListener("click",()=>e.setValue("palette","autoVariant",e.get().palette.autoVariant+1));const d=document.createElement("div");d.className="button-row",d.append(p);const m=Q(te("palette","scheme"),e.get().palette.scheme,L=>e.setValue("palette","scheme",L)),f=Q(te("palette","schemeIncludeBackground"),e.get().palette.schemeIncludeBackground,L=>e.setValue("palette","schemeIncludeBackground",L)),g=document.createElement("p");g.className="control-help",a.append(s.element,m.element,f.element,c.element,h.element,d,l.element,u,g);const v=document.createElement("div");v.className="palette-heading",v.innerHTML='<span class="control-label">Inks</span><span class="control-help">Top prints first</span>';const b=document.createElement("ol");b.className="ink-list",a.append(v,b);const k=[];for(let L=0;L<W;L++){const F=document.createElement("li");F.className="ink-row";const D=document.createElement("span");D.className="ink-order",D.textContent=String(L+1);const R=document.createElement("input");R.type="color",R.className="swatch swatch-input",R.setAttribute("aria-label",`Ink ${L+1} color`),R.addEventListener("input",()=>n.setInkColor(L,R.value,!1)),R.addEventListener("change",()=>n.setInkColor(L,R.value,!0));const I=Ji(`Ink ${L+1} hex code`,O=>n.setInkColor(L,O)),N={kind:"ink",slot:L},$=Ze(`Pick ink ${L+1} from the image`,Ki,"eyedropper");$.addEventListener("click",()=>i.toggle(N));const z=document.createElement("span");z.className="ink-move";const B=Ze(`Print ink ${L+1} earlier`,"▲"),E=Ze(`Print ink ${L+1} later`,"▼");B.addEventListener("click",()=>n.moveInk(L,-1)),E.addEventListener("click",()=>n.moveInk(L,1)),z.append(B,E);const C=Ze(`Remove ink ${L+1}`,"×","remove");C.addEventListener("click",()=>n.removeInk(L)),F.append(D,R,I,$,z,C),b.append(F),k.push({element:F,order:D,swatch:R,hex:I,eyedropper:$,up:B,down:E,remove:C})}const x=document.createElement("button");x.type="button",x.className="add-ink",x.textContent="+ Add ink",x.addEventListener("click",()=>n.addInk()),a.append(x);const S=document.createElement("div");S.className="paper-row";const y=document.createElement("span");y.className="control-label";const w=document.createElement("button");w.type="button",w.className="swatch",w.addEventListener("click",()=>yu({anchor:w,title:y.textContent??"Paper",presets:bu,current:e.get().palette.paper,onPick:(L,F)=>n.setPaper(L,F)}));const T=Ji("Paper hex code",L=>n.setPaper(L)),M={kind:"paper"},A=Ze("Pick the paper color from the image",Ki,"eyedropper");A.addEventListener("click",()=>i.toggle(M)),S.append(y,w,T,A),a.append(S);const P=(L,F)=>{L.dataset.value=F,document.activeElement!==L&&(L.value=F)};function _(){const L=e.get(),F=L.palette,D=t.get()!==null,R=F.source==="auto",I=F.source==="scheme";s.update(F.source),m.update(F.scheme),f.update(F.schemeIncludeBackground),m.element.hidden=!I,f.element.hidden=!I,g.hidden=!I,g.textContent=F.scheme==="cmyk"?"Medium Blue, Fluorescent Pink, Yellow, and Black standing in for C, M, Y, K. Editing a color switches back to Manual.":"Ink 1 is the first color: change it and the others follow. Editing another ink, or adding or removing one, switches back to Manual.",l.update(F.autoIncludeBackground),l.element.hidden=!R,c.update(F.autoStyle),h.update(F.autoVividness),c.element.hidden=!R,h.element.hidden=!R,d.hidden=!R,p.disabled=!D,u.hidden=!R,u.textContent=D?"Colors are picked from the image. Editing a color switches back to Manual.":"Upload an image to pick colors from it.";const N=i.active;k.forEach(($,z)=>{const B=z<F.inkCount;if($.element.hidden=!B,!B)return;const E=F.inkColor[z]??"#000000";$.swatch.value!==E&&($.swatch.value=E),$.swatch.title=I&&z===0&&F.scheme!=="cmyk"?`${E}: the scheme's first color`:E,$.element.classList.toggle("scheme-first",I&&z===0&&F.scheme!=="cmyk"),P($.hex,E),$.eyedropper.disabled=!D,$.eyedropper.classList.toggle("active",lt(N,{kind:"ink",slot:z})),$.up.disabled=z===0,$.down.disabled=z===F.inkCount-1,$.remove.disabled=F.inkCount<=1}),x.disabled=F.inkCount>=W,y.textContent=L.upload.mode==="print"?"Paper":"Background",w.style.setProperty("--swatch",F.paper),w.setAttribute("aria-label",`${y.textContent} color: choose a preset or custom color`),P(T,F.paper),A.disabled=!D,A.classList.toggle("active",lt(N,M))}return _(),e.subscribe(_),t.subscribe(_),i.subscribe(_),a}const Ce=38,Ee={W:[1.00116072718764,1.00116065159728,1.00116031922747,1.00115867270789,1.00115259844552,1.00113252528998,1.00108500663327,1.00099687889453,1.00086525152274,1.0006962900094,1.00050496114888,1.00030808187992,1.00011966602013,.999952765968407,.999821836899297,.999738609557593,.999709551639612,.999731930210627,.999799436346195,.999900330316671,1.00002040652611,1.00014478793658,1.00025997903412,1.00035579697089,1.00042753780269,1.00047623344888,1.00050720967508,1.00052519156373,1.00053509606896,1.00054022097482,1.00054272816784,1.00054389569087,1.00054448212151,1.00054476959992,1.00054489887762,1.00054496254689,1.00054498927058,1.000544996993],C:[.970585001322962,.970592498143425,.970625348729891,.970786806119017,.971368673228248,.973163230621252,.976740223158765,.981587605491377,.986280265652949,.989949147689134,.99249270153842,.994145680405256,.995183975033212,.995756750110818,.99591281828671,.995606157834528,.994597600961854,.99221571549237,.986236452783249,.967943337264541,.891285004244943,.536202477862053,.154108119001878,.0574575093228929,.0315349873107007,.0222633920086335,.0182022841492439,.016299055973264,.0153656239334613,.0149111568733976,.0146954339898235,.0145964146717719,.0145470156699655,.0145228771899495,.0145120341118965,.0145066940939832,.0145044507314479,.0145038009464639],M:[.990673557319988,.990671524961979,.990662582353421,.990618107644795,.99045148087871,.989871081400204,.98828660875964,.984290692797504,.973934905625306,.941817838460145,.817390326195156,.432472805065729,.13845397825887,.0537347216940033,.0292174996673231,.021313651750859,.0201349530181136,.0241323096280662,.0372236145223627,.0760506552706601,.205375471942399,.541268903460439,.815841685086486,.912817704123976,.946339830166962,.959927696331991,.966260595230312,.969325970058424,.970854536721399,.971605066528128,.971962769757392,.972127272274509,.972209417745812,.972249577678424,.972267621998742,.97227650946215,.972280243306874,.97228132482656],Y:[.0210523371789306,.0210564627517414,.0210746178695038,.0211649058448753,.0215027957272504,.0226738799041561,.0258235649693629,.0334879385639851,.0519069663740307,.100749014833473,.239129899706847,.534804312272748,.79780757864303,.911449894067384,.953797963004507,.971241615465429,.979303123807588,.983380119507575,.985461246567755,.986435046976605,.986738250670141,.986617882445032,.986277776758643,.985860592444056,.98547492767621,.985176934765558,.984971574014181,.984846303415712,.984775351811199,.984738066625265,.984719648311765,.984711023391939,.984706683300676,.984704554393091,.98470359630937,.984703124077552,.98470292561509,.984702868122795],R:[.0315605737777207,.0315520718330149,.0315148215513658,.0313318044982702,.0306729857725527,.0286480476989607,.0246450407045709,.0192960753663651,.0142066612220556,.0102942608878609,.0076191460521811,.005898041083542,.0048233247781713,.0042298748350633,.0040599171299341,.0043533695594676,.0053434425970201,.0076917201010463,.0135969795736536,.0316975442661115,.107861196355249,.463812603168704,.847055405272011,.943185409393918,.968862150696558,.978030667473603,.982043643854306,.983923623718707,.984845484154382,.985294275814596,.985507295219825,.985605071539837,.985653849933578,.985677685033883,.985688391806122,.985693664690031,.985695879848205,.985696521463762],G:[.0095560747554212,.0095581580120851,.0095673245444588,.0096129126297349,.0097837090401843,.010378622705871,.0120026452378567,.0160977721473922,.026706190223168,.0595555440185881,.186039826532826,.570579820116159,.861467768400292,.945879089767658,.970465486474305,.97841363028445,.979589031411224,.975533536908632,.962288755397813,.92312157451312,.793434018943111,.459270135902429,.185574103666303,.0881774959955372,.05436302287667,.0406288447060719,.034221520431697,.0311185790956966,.0295708898336134,.0288108739348928,.0284486271324597,.0282820301724731,.0281988376490237,.0281581655342037,.0281398910216386,.0281308901665811,.0281271086805816,.0281260133612096],B:[.979404752502014,.97940070684313,.979382903470261,.979294364945594,.97896301460857,.977814466694043,.974724321133836,.967198482343973,.949079657530575,.900850128940977,.76315044546224,.465922171649319,.201263280451005,.0877524413419623,.0457176793291679,.0284706050521843,.020527176756985,.0165302792310211,.0145135107212858,.0136003508637687,.0133604258769571,.013548894314568,.0139594356366992,.014443425575357,.0148854440621406,.0152254296999746,.0154592848180209,.0156018026485961,.0156824871281936,.0157248764360615,.0157458108784121,.0157556123350225,.0157605443964911,.0157629637515278,.0157640525629106,.015764589232951,.0157648147772649,.0157648801149616]},sn=[[646919989576e-16,.0002194098998132,.0011205743509343,.0037666134117111,.011880553603799,.0232864424191771,.0345594181969747,.0372237901162006,.0324183761091486,.021233205609381,.0104909907685421,.0032958375797931,.0005070351633801,.0009486742057141,.0062737180998318,.0168646241897775,.028689649025981,.0426748124691731,.0562547481311377,.0694703972677158,.0830531516998291,.0861260963002257,.0904661376847769,.0850038650591277,.0709066691074488,.0506288916373645,.035473961885264,.0214682102597065,.0125164567619117,.0068045816390165,.0034645657946526,.0014976097506959,.000769700480928,.0004073680581315,.0001690104031614,952245150365e-16,490309872958e-16,199961492222e-16],[1844289444e-15,62053235865e-16,310096046799e-16,.0001047483849269,.0003536405299538,.0009514714056444,.0022822631748318,.004207329043473,.0066887983719014,.0098883960193565,.0152494514496311,.0214183109449723,.0334229301575068,.0513100134918512,.070402083939949,.0878387072603517,.0942490536184085,.0979566702718931,.0941521856862608,.0867810237486753,.0788565338632013,.0635267026203555,.05374141675682,.042646064357412,.0316173492792708,.020885205921391,.0138601101360152,.0081026402038399,.004630102258803,.0024913800051319,.0012593033677378,.000541646522168,.0002779528920067,.0001471080673854,610327472927e-16,343873229523e-16,177059860053e-16,7220974913e-15],[.000305017147638,.0010368066663574,.0053131363323992,.0179543925899536,.0570775815345485,.113651618936287,.17335872618355,.196206575558657,.186082370706296,.139950475383207,.0891745294268649,.0478962113517075,.0281456253957952,.0161376622950514,.0077591019215214,.0042961483736618,.0020055092122156,.0008614711098802,.0003690387177652,.0001914287288574,.0001495555858975,923109285104e-16,681349182337e-16,288263655696e-16,157671820553e-16,39406041027e-16,1584012587e-15,0,0,0,0,0,0,0,0,0,0,0]],le=[[3.2409699419045226,-1.537383177570094,-.4986107602930034],[-.9692436362808796,1.8759675015077202,.04155505740717559],[.05563007969699366,-.20397695888897652,1.0569715142428786]];function br(e,t,n){const i=Math.min(e,t,n);e-=i,t-=i,n-=i;const a=Math.min(t,n),r=Math.min(e,n),s=Math.min(e,t),o=Math.max(0,Math.min(e-n,e-t)),l=Math.max(0,Math.min(t-n,t-e)),u=Math.max(0,Math.min(n-t,n-e)),c=new Float64Array(Ce);for(let h=0;h<Ce;h++)c[h]=Math.max(Number.EPSILON,i*Ee.W[h]+a*Ee.C[h]+r*Ee.M[h]+s*Ee.Y[h]+o*Ee.R[h]+l*Ee.G[h]+u*Ee.B[h]);return c}function wu(e){let t=0,n=0,i=0;for(let a=0;a<Ce;a++){const r=e[a];t+=sn[0][a]*r,n+=sn[1][a]*r,i+=sn[2][a]*r}return[le[0][0]*t+le[0][1]*n+le[0][2]*i,le[1][0]*t+le[1][1]*n+le[1][2]*i,le[2][0]*t+le[2][1]*n+le[2][2]*i]}function kr(e){const t=ee(e)??{r:0,g:0,b:0};return br(ae(t.r/255),ae(t.g/255),ae(t.b/255))}const Su=br(1,1,1);function Eu(e){const t=kr(e.hex),n=new Float64Array(Ce);for(let i=0;i<Ce;i++)n[i]=Math.min(1,t[i]/Su[i]);return{reflectance:t,transmittance2:n,opacity:Math.min(1,Math.max(0,e.opacity))}}function Tu(e,t){const n=t.opacity;for(let i=0;i<Ce;i++)e[i]=(1-n)*e[i]*t.transmittance2[i]+n*t.reflectance[i]}function Mu(e,t){const n=kr(e),i=t.map(Eu),a=i.length,r=new Float32Array((1<<a)*3),s=new Float64Array(Ce);for(let o=0;o<1<<a;o++){s.set(n);for(let h=0;h<a;h++)o&1<<h&&Tu(s,i[h]);const[l,u,c]=wu(s);r[o*3]=l,r[o*3+1]=u,r[o*3+2]=c}return{inkCount:a,colors:r}}function Ru(e,t,n=[0,0,0]){const i=e.inkCount;n[0]=0,n[1]=0,n[2]=0;for(let a=0;a<1<<i;a++){let r=1;for(let s=0;s<i;s++){const o=t[s]??0;r*=a&1<<s?o:1-o}r!==0&&(n[0]+=r*e.colors[a*3],n[1]+=r*e.colors[a*3+1],n[2]+=r*e.colors[a*3+2])}return n}function it(e){const{paper:t,inkCount:n,inkColor:i,inkOpacity:a}=e.palette,r=[];for(let s=0;s<n;s++)r.push({hex:i[s]??"#000000",opacity:(a[s]??0)/100});return{paper:t,inks:r}}function Cu(e){return`${e.paper}|${e.inks.map(t=>`${t.hex}:${t.opacity}`).join("|")}`}class Wn{key="";table=null;rebuilds=0;get(t){const n=Cu(t);return(!this.table||n!==this.key)&&(this.table=Mu(t.paper,t.inks),this.key=n,this.rebuilds++),this.table}}const Iu=`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uCoverage; // RGBA32F: ink coverage per channel
uniform sampler2D uFlags;    // RGBA8: r = use multiply, g = inside a swatch
uniform int uHeight;
out vec4 outColor;
${ft}
${Ht}
${re}
void main() {
  ivec2 p = ivec2(int(gl_FragCoord.x), uHeight - 1 - int(gl_FragCoord.y));
  vec4 flags = texelFetch(uFlags, p, 0);
  if (flags.g < 0.5) { outColor = vec4(0.0); return; }
  vec4 cov = texelFetch(uCoverage, p, 0);
  vec3 c = flags.r > 0.5 ? multiplyInks(cov) : mixInks(cov);
  outColor = vec4(linearToSrgb(gamutCompress(c)), 1.0);
}
`,Au=24,yt=132,xt=84,Ne=16,Zi=26,on=96,Qi=30,Lu=10,Pu=36;function Nu(e){const t=[];for(let n=0;n<1<<e;n++){const i=[...Array(e).keys()].filter(a=>n&1<<a);t.push(i)}return t.sort((n,i)=>n.length-i.length||n.join().localeCompare(i.join()))}function Du(e){const t=[];for(let n=0;n<e;n++)t.push([n]);for(let n=0;n<e;n++)for(let i=n+1;i<e;i++)t.push([n,i]);return e>=3&&t.push([...Array(e).keys()]),t}class _u{constructor(t,n){this.store=t,this.debug=n,this.element=document.createElement("div"),this.element.className="ink-test",this.element.hidden=!0;const i=document.createElement("div");i.className="ink-test-header",i.innerHTML="<div><h2>Ink mixing test</h2><p>Temporary view for checking the ink model. Every combination of your inks, printed solid on the paper, and coverage ramps from 0 to 100%.</p></div>";const a=document.createElement("div");a.className="ink-test-controls";const r=document.createElement("div");r.className="segmented";for(const[u,c]of[["spectral","Spectral"],["multiply","Multiply"],["split","Split"]]){const h=document.createElement("button");h.type="button",h.textContent=c,h.dataset.value=u,h.addEventListener("click",()=>this.setMode(u)),r.append(h),this.modeButtons.push(h)}const s=document.createElement("button");s.type="button",s.textContent="Close",s.addEventListener("click",()=>this.close()),a.append(r,s),i.append(a);const o=document.createElement("p");o.className="ink-test-legend";const l=document.createElement("div");l.className="ink-test-stage",this.canvas=document.createElement("canvas"),this.labels=document.createElement("div"),this.labels.className="ink-test-labels",l.append(this.canvas,this.labels),this.element.append(i,o,l),this.gl=Xa(this.canvas,{alpha:!0,antialias:!1,depth:!1,stencil:!1}),this.program=Bn(this.gl,On,Iu),this.loc=Ha(this.gl,this.program,["uCoverage","uFlags","uHeight",...No]),this.coverageTex=this.createTexture(),this.flagsTex=this.createTexture(),t.subscribe((u,c)=>{this.isOpen&&(c.section==="palette"||c.section==="*")&&this.update()}),new ResizeObserver(()=>this.isOpen&&this.update()).observe(this.element),this.setMode(this.mode)}element;canvas;labels;gl;program;loc;coverageTex;flagsTex;tables=new Wn;mode="split";modeButtons=[];layoutKey="";regions=[];isOpen=!1;get open(){return this.isOpen}toggle(){this.isOpen?this.close():this.show()}show(){this.isOpen=!0,this.element.hidden=!1,this.layoutKey="",this.update()}close(){this.isOpen=!1,this.element.hidden=!0}setMode(t){this.mode=t;for(const i of this.modeButtons)i.classList.toggle("active",i.dataset.value===t);const n=this.element.querySelector(".ink-test-legend");n.textContent=t==="split"?"Split: each swatch shows the spectral ink model on the left and a simple multiply blend on the right. Ramps show spectral on top, multiply below.":t==="spectral"?"Spectral ink model: inks act as transparent films, mixed band by band across the visible spectrum.":"Simple multiply blend (sRGB), for comparison.",this.layoutKey="",this.isOpen&&this.update()}createTexture(){const t=this.gl,n=t.createTexture();return t.bindTexture(t.TEXTURE_2D,n),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),n}update(){const n=this.store.get().palette.inkCount,i=Math.max(320,this.element.clientWidth-Au*2),a=`${n}|${i}|${this.mode}|${window.devicePixelRatio}`;a!==this.layoutKey&&(this.layoutKey=a,this.buildLayout(n,i)),this.updateLabels(),this.render()}buildLayout(t,n){const i=[];this.labels.innerHTML="";let a=0;const r=p=>{const d=document.createElement("p");d.className="ink-test-heading",d.style.top=`${a}px`,d.textContent=p,this.labels.append(d),a+=26};r("Solid inks and overlaps (numbers = print order)");const s=Math.max(1,Math.floor((n+Ne)/(yt+Ne)));Nu(t).forEach((p,d)=>{const m=d%s,f=Math.floor(d/s),g=m*(yt+Ne),v=a+f*(xt+Zi+Ne);i.push({x:g,y:v,w:yt,h:xt,kind:"solid",inks:p});const b=document.createElement("p");b.className="ink-test-label",b.dataset.inks=p.join(","),b.style.left=`${g}px`,b.style.top=`${v+xt+4}px`,b.style.width=`${yt}px`,this.labels.append(b)}),a+=Math.ceil((1<<t)/s)*(xt+Zi+Ne)+Pu-Ne,r("Coverage ramps, 0% → 100% (left to right)");const o=Math.min(640,n-on);for(const p of Du(t)){i.push({x:on,y:a,w:o,h:Qi,kind:"ramp",inks:p});const d=document.createElement("p");d.className="ink-test-label ink-test-ramp-label",d.dataset.inks=p.join(","),d.style.left="0px",d.style.top=`${a+6}px`,d.style.width=`${on-8}px`,this.labels.append(d),a+=Qi+Lu}this.regions=i;const l=a+8;this.labels.style.height=`${l}px`,this.canvas.style.width=`${n}px`,this.canvas.style.height=`${l}px`;const u=window.devicePixelRatio||1,c=Math.round(n*u),h=Math.round(l*u);this.canvas.width=c,this.canvas.height=h,this.uploadRegions(c,h,u)}uploadRegions(t,n,i){const a=new Float32Array(t*n*4),r=new Uint8Array(t*n*4);for(const o of this.regions){const l=Math.round(o.x*i),u=Math.round((o.x+o.w)*i),c=Math.round(o.y*i),h=Math.round((o.y+o.h)*i);for(let p=c;p<h;p++)for(let d=l;d<u;d++){const m=(p*t+d)*4,f=o.kind==="ramp"?(d-l+.5)/(u-l):1;for(const v of o.inks)a[m+v]=f;const g=this.mode==="multiply"||this.mode==="split"&&(o.kind==="solid"?d>=(l+u)/2:p>=(c+h)/2);r[m]=g?255:0,r[m+1]=255}}const s=this.gl;s.bindTexture(s.TEXTURE_2D,this.coverageTex),s.texImage2D(s.TEXTURE_2D,0,s.RGBA32F,t,n,0,s.RGBA,s.FLOAT,a),s.bindTexture(s.TEXTURE_2D,this.flagsTex),s.texImage2D(s.TEXTURE_2D,0,s.RGBA8,t,n,0,s.RGBA,s.UNSIGNED_BYTE,r)}updateLabels(){const{inkColor:t}=this.store.get().palette;for(const n of this.labels.querySelectorAll(".ink-test-label")){const i=n.dataset.inks?n.dataset.inks.split(",").map(Number):[];if(n.innerHTML="",i.length===0){n.textContent="Paper";continue}i.forEach((a,r)=>{r>0&&n.append(" + ");const s=document.createElement("span");s.className="ink-dot",s.style.setProperty("--swatch",t[a]??"#000"),n.append(s,String(a+1))})}}render(){const t=this.gl,n=it(this.store.get()),i=this.tables.rebuilds,a=this.tables.get(n);this.debug&&this.tables.rebuilds!==i&&console.debug(`[ink test] overlap table rebuilt (#${this.tables.rebuilds})`),t.viewport(0,0,this.canvas.width,this.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(this.program),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.coverageTex),t.uniform1i(this.loc.uCoverage,0),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,this.flagsTex),t.uniform1i(this.loc.uFlags,1),t.uniform1i(this.loc.uHeight,this.canvas.height),Do(t,this.loc,a,n),t.drawArrays(t.TRIANGLES,0,3)}}const ea={letter:[215.9,279.4],legal:[215.9,355.6],tabloid:[279.4,431.8],a4:[210,297],a3:[297,420],b4:[257,364]},Fu=25.4;function qt(e,t,n){const i=e.export,a=It(e.border,t,n,e.palette.inkCount).margin,r=t+2*a,s=n+2*a,o=(y,w,T,M,A,P,_)=>({kind:P,dpi:_,width:y,height:w,trim:{x:0,y:0,width:y,height:w},printable:null,art:T,cut:T,scale:M,imageX:T.x+a*M,imageY:T.y+a*M,...A}),l=(y,w,T)=>({x:(y-r*T)/2,y:(w-s*T)/2,width:r*T,height:s*T});if(e.upload.mode!=="print"){if(i.digitalSize==="custom"&&!i.lockAspect){const A=Math.max(1,Math.round(i.digitalWidth)),P=Math.max(1,Math.round(i.digitalHeight)),_=i.digitalFit==="fill"?Math.max(A/r,P/s):Math.min(A/r,P/s);return o(A,P,l(A,P,_),_,{},"digital",null)}const y={half:.5,original:1,double:2,triple:3},w=i.digitalSize==="custom"?Math.max(1,i.digitalWidth)/r:y[i.digitalSize]??1,T=Math.max(1,Math.round(r*w)),M=Math.max(1,Math.round(s*w));return o(T,M,{x:0,y:0,width:r*w,height:s*w},w,{},"digital",null)}const u=ul(i),c=(y,w)=>(w==="in"?y:y/Fu)*u,h=i.units==="mm"?"mm":"in";if(i.pageSize==="image"){const y=Math.max(1,c(i.imageWidth,h))/r,w=Math.max(1,Math.round(r*y)),T=Math.max(1,Math.round(s*y));return o(w,T,{x:0,y:0,width:r*y,height:s*y},y,{},"print",u)}let p,d;if(i.pageSize==="custom")p=c(i.pageWidth,h),d=c(i.pageHeight,h);else{const[y,w]=ea[i.pageSize]??ea.letter;p=c(y,"mm"),d=c(w,"mm")}i.orientation==="landscape"!=p>d&&([p,d]=[d,p]);const m=c(lr(i),"mm"),f=Math.max(1,Math.round(p+2*m)),g=Math.max(1,Math.round(d+2*m)),v={x:m,y:m,width:p,height:d},b=Math.min(c(cl(i),"mm"),p/2-1,d/2-1),k={x:v.x+b,y:v.y+b,width:p-2*b,height:d-2*b};let x,S;return i.placement==="fill"?(x=Math.max(f/r,g/s),S=l(f,g,x)):i.placement==="custom"?(x=Math.max(1,c(i.imageWidth,h))/r,S={x:k.x+(k.width-r*x)*i.positionX/100,y:k.y+(k.height-s*x)*i.positionY/100,width:r*x,height:s*x}):(x=Math.max(.001,Math.min(k.width/r,k.height/s)),S={x:k.x+(k.width-r*x)/2,y:k.y+(k.height-s*x)/2,width:r*x,height:s*x}),o(f,g,S,x,{trim:v,printable:k,cut:i.placement==="fill"?v:S},"print",u)}function ln(e,t,n){return qt(e,t,n).scale}class $u{constructor(t){this.gl=t}programs=new Map;uniformTypes=new Map;pixel=new Uint8Array(4);get maxTextureSize(){return this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE)}createTarget(t,n,i,a={}){const r=this.gl,s=r.createTexture();r.bindTexture(r.TEXTURE_2D,s);const o=i==="image"?r.SRGB8_ALPHA8:r.RGBA8;r.texImage2D(r.TEXTURE_2D,0,o,t,n,0,r.RGBA,r.UNSIGNED_BYTE,null),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,a.mipmaps?r.LINEAR_MIPMAP_LINEAR:r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE);const l=r.createFramebuffer();return r.bindFramebuffer(r.FRAMEBUFFER,l),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,s,0),r.bindFramebuffer(r.FRAMEBUFFER,null),{texture:s,framebuffer:l,width:t,height:n,format:i}}ensureTarget(t,n,i,a,r={}){return t&&t.width===n&&t.height===i&&t.format===a?t:(t&&this.deleteTarget(t),this.createTarget(n,i,a,r))}deleteTarget(t){this.gl.deleteTexture(t.texture),this.gl.deleteFramebuffer(t.framebuffer)}pass(t,n,i){this.draw(t,n.framebuffer,n.width,n.height,i)}draw(t,n,i,a,r,s){const o=this.gl,{program:l,uniforms:u}=this.program(t);o.useProgram(l),o.bindFramebuffer(o.FRAMEBUFFER,n),o.viewport(0,0,i,a),o.disable(o.BLEND),s&&(o.enable(o.SCISSOR_TEST),o.scissor(0,s.y,i,s.height));let c=0;const h=this.uniformTypes.get(l);for(const[p,d]of Object.entries(r)){u.has(p)||u.set(p,o.getUniformLocation(l,p));const m=u.get(p)??null;if(m===null)continue;const f=h.get(p);if(typeof d=="object"&&d!==null&&"texture"in d)o.activeTexture(o.TEXTURE0+c),o.bindTexture(d.target==="3d"?o.TEXTURE_3D:o.TEXTURE_2D,d.texture),o.uniform1i(m,c++);else if(typeof d=="number"||typeof d=="boolean"){const g=Number(d);f===o.INT||f===o.BOOL?o.uniform1i(m,g):o.uniform1f(m,g)}else{const g=d;switch(f){case o.FLOAT_VEC2:o.uniform2fv(m,g);break;case o.FLOAT_VEC3:o.uniform3fv(m,g);break;case o.FLOAT_VEC4:o.uniform4fv(m,g);break;case o.INT:case o.BOOL:o.uniform1iv(m,g);break;case o.INT_VEC4:case o.BOOL_VEC4:o.uniform4iv(m,g);break;case o.FLOAT_MAT2:o.uniformMatrix2fv(m,!1,g);break;default:o.uniform1fv(m,g)}}}o.drawArrays(o.TRIANGLES,0,3),s&&o.disable(o.SCISSOR_TEST),o.bindFramebuffer(o.FRAMEBUFFER,null)}finish(t){const n=this.gl;n.bindFramebuffer(n.FRAMEBUFFER,t),n.readPixels(0,0,1,1,n.RGBA,n.UNSIGNED_BYTE,this.pixel),n.bindFramebuffer(n.FRAMEBUFFER,null)}generateMipmaps(t){const n=this.gl;n.bindTexture(n.TEXTURE_2D,t.texture),n.generateMipmap(n.TEXTURE_2D)}read(t){const n=this.gl,i=new Uint8Array(t.width*t.height*4);return n.bindFramebuffer(n.FRAMEBUFFER,t.framebuffer),n.readPixels(0,0,t.width,t.height,n.RGBA,n.UNSIGNED_BYTE,i),n.bindFramebuffer(n.FRAMEBUFFER,null),i}program(t){let n=this.programs.get(t);if(!n){const i=Bn(this.gl,On,t);n={program:i,uniforms:new Map},this.programs.set(t,n);const a=this.gl,r=new Map,s=a.getProgramParameter(i,a.ACTIVE_UNIFORMS);for(let o=0;o<s;o++){const l=a.getActiveUniform(i,o);l&&r.set(l.name.replace(/\[0\]$/,""),l.type)}this.uniformTypes.set(i,r)}return n}}const Sn=8,Uu=3,Bu=2*Fa;function Ou(e,t){return`#version 300 es
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
${ft}
${Ht}
${re}
${Xt}
${Ya}

float htCoverageRaw(int ink, vec2 p) {
  vec2 uv = clamp(p / uOutScale / uImageSize, vec2(0.0), vec2(1.0));
  return textureLod(uCoverage, uv, 0.0)[ink] * textureLod(uImage, uv, 0.0).a;
}
${zn(t)}
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
  for (int j = 0; j < ${Sn}; j++) {
    if (j >= uSamples) break;
    for (int i = 0; i < ${Sn}; i++) {
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
`}class Gn{constructor(t){this.gpu=t}kind="procedural";state=null;shaders=new Map;frame={};sim={};rowsDone=0;set(t){this.state=t}setSim(t){this.sim=t}setFrame(t){this.frame=t}static samplesFor(t,n){const i=Math.min(Sn,Math.max(2,Math.ceil(t*1.5)));return n==="fast"?Math.min(i,Uu):i}draw(t,n,i,a,r){const s=this.state;if(!s)return!0;r&&(this.rowsDone=0);const o=this.sim.uSimOn===1,l=`${s.method.id}|${o}`;let u=this.shaders.get(l);u||this.shaders.set(l,u=Ou(s.method.glsl,o));const c=Gn.samplesFor(s.outputScale/t.scale,a),h={...s.inkUniforms,...s.methodUniforms,uFrameCanvas:[0,0,s.imageWidth,s.imageHeight],uFrameMode:0,...this.frame,...this.sim,uCoverage:{texture:s.coverage.texture},uImage:{texture:s.image.texture},uViewSize:[n,i],uOrigin:[t.originX,t.originY],uScale:t.scale,uImageSize:[s.imageWidth,s.imageHeight],uOutScale:s.outputScale,uSamples:c,uVisible:s.visible,uBackground:s.background},p=`preview|${l}|${c}`,d=performance.now();for(;this.rowsDone<i;){if(this.rowsDone>0&&performance.now()-d>Bu)return!1;const m=$n(p,n,i-this.rowsDone),f={y:i-this.rowsDone-m,height:m};Un(this.gpu,null,p,n*m,()=>this.gpu.draw(u,null,n,i,h,f)),this.rowsDone+=m}return!0}}const zu=8192,Wu=4096,wt=256,Gu=2048,ta=3840*2400;function Xu(e){const t=[e.cellSize,e.dotSize].flatMap(n=>Array.isArray(n)?n:[]);return Math.max(4,...t)*1.5}const yr=()=>({adjusted:null,smoothA:null,smoothB:null,coverage:null,layered:null,layerA:null,layerB:null,mixed:null});class Hu{constructor(t){this.host=t,this.gpu=new $u(t.preview.gl),this.compositor=new Gn(this.gpu),t.settings.subscribe(()=>this.schedule()),t.source.subscribe(()=>this.schedule())}gpu;tables=new Wn;keys=new Map;versions=new Map;log=[];sourceTexture=null;sourceTextureWidth=0;working=null;main=yr();adjustOutput=null;lightness=null;analysisTarget=null;analysisVersion=-1;toneTexture=null;fadeLutTexture=null;fade={key:"off",uniforms:{uFade:0}};border=null;sim={uSimOn:0};simSetup=null;densityTargets=[];emptyDensity=null;inputs=null;layerTone=null;prepared=null;preparing=null;halftonePrepared=null;halftonePreparing=null;bitmap=null;bitmapBuilding=null;coverageRead=null;preparedCount=0;compositor;detailTargets=Xn();halftoneState=null;detail=null;halftoned=!1;frameRequested=!1;held=!1;imageSize={width:0,height:0};histogramListeners=new Set;busyListeners=new Set;errorListeners=new Set;busyMessages=new Map;lastHistogram=null;onHistogram(t){return this.histogramListeners.add(t),this.lastHistogram&&t(this.lastHistogram.data,this.lastHistogram.source),()=>this.histogramListeners.delete(t)}onBusy(t){return this.busyListeners.add(t),()=>this.busyListeners.delete(t)}onError(t){return this.errorListeners.add(t),()=>this.errorListeners.delete(t)}reportError(t,n){console.error(n);const i=n instanceof Error?n.message:String(n);for(const a of this.errorListeners)a(`${t} failed: ${i}. Change a setting to try again.`)}schedule(){this.frameRequested||(this.frameRequested=!0,requestAnimationFrame(()=>{this.frameRequested=!1,this.run()}))}version(t){return this.versions.get(t)??0}stage(t,n,i){if(this.keys.get(t)===n)return!0;const a=performance.now();return i()===!1?!1:(this.keys.set(t,n),this.versions.set(t,this.version(t)+1),this.log.push(`${t} ${(performance.now()-a).toFixed(1)}ms`),!0)}hold(t){this.held=t,this.setBusy("export",t?"Exporting (changes show when it's done)":null),t||this.schedule()}run(){if(this.held||this.gpu.gl.isContextLost())return;const t=this.host.source.get();if(!t)return;this.imageSize={width:t.width,height:t.height};const n=this.host.settings.get();this.log=[];const i=performance.now(),a=this.runUpload(t.bitmap,t.version)&&this.runAdjust(n,t.width,t.height)&&this.runHistogram(n)&&this.runSplit(n)&&this.runLayers()&&this.runPrintSim(n,t.width,t.height)&&this.runMix(n)&&this.runBorder(n,t.width,t.height)&&this.runHalftone(n,t.width,t.height);a&&this.renderDetail(),this.host.debug&&this.log.length&&console.debug(`[pipeline] reran: ${this.log.join(", ")} (total ${(performance.now()-i).toFixed(1)}ms)${a?"":" — waiting"}`)}runUpload(t,n){return this.stage("upload",String(n),()=>{const i=this.gpu.gl,a=Math.min(zu,this.gpu.maxTextureSize),r=Math.max(t.width,t.height);let s=t;if(r>a){const h=a/r,p=new OffscreenCanvas(Math.round(t.width*h),Math.round(t.height*h)),d=p.getContext("2d");d.imageSmoothingQuality="high",d.drawImage(t,0,0,p.width,p.height),s=p.transferToImageBitmap()}this.sourceTexture&&i.deleteTexture(this.sourceTexture);const o=i.createTexture();i.bindTexture(i.TEXTURE_2D,o),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.NONE),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.texImage2D(i.TEXTURE_2D,0,i.SRGB8_ALPHA8,s.width,s.height,0,i.RGBA,i.UNSIGNED_BYTE,s),i.generateMipmap(i.TEXTURE_2D),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR_MIPMAP_LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),this.sourceTexture=o,this.sourceTextureWidth=s.width,this.host.preview.setSource("original",{kind:"texture",texture:o,textureWidth:s.width});const l=Math.min(1,Math.min(Wu,this.gpu.maxTextureSize)/r),u=Math.max(1,Math.round(t.width*l)),c=Math.max(1,Math.round(t.height*l));this.working=this.gpu.ensureTarget(this.working,u,c,"image"),this.gpu.pass(bt,this.working,{uImage:{texture:o},uRatio:[s.width/u,s.height/c],uRegion:[0,0,1,1],uSize:[u,c]}),s!==t&&s.close(),this.clearDetail()})}runAdjust(t,n,i){const a=t.adjust;return this.setFade(t,n,i),this.stage("adjust",`${JSON.stringify(a)}|${this.fade.key}|${this.version("upload")}`,()=>{this.uploadTone(a.blackPoint,a.whitePoint,a.midtone,a.curve);const r=this.working,s=a.smoothing*Math.max(r.width,r.height)/1e3;this.adjustOutput=this.adjustPasses(a,r,this.main,s,[0,0,n,i])})}setFade(t,n,i){const a=t.border;if(!a.fade){this.fade={key:"off",uniforms:{uFade:0}};return}const r=Math.min(n,i)/100,s=It(a,n,i,t.palette.inkCount).inner,o=Math.min(a.fadeRadius*r,Math.min(s[2]-s[0],s[3]-s[1])/2),l=JSON.stringify([a.fadeColor,a.fadeDistance,a.fadeOpacity,a.fadeCurve,a.fadeCustom,a.fadeMidpoint,s,o]);if(this.fade.key===l)return;const u=this.gpu.gl;this.fadeLutTexture??=u.createTexture(),u.bindTexture(u.TEXTURE_2D,this.fadeLutTexture),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,u.LINEAR),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MAG_FILTER,u.LINEAR),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_S,u.CLAMP_TO_EDGE),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_T,u.CLAMP_TO_EDGE),u.pixelStorei(u.UNPACK_ALIGNMENT,1);const c=Uint8Array.from(To(a),h=>Math.round(h*255));u.texImage2D(u.TEXTURE_2D,0,u.R8,nt,1,0,u.RED,u.UNSIGNED_BYTE,c),this.fade={key:l,uniforms:{uFade:1,uFadeRect:s,uFadeRadius:o,uFadeDistance:Math.max(.5,a.fadeDistance*r),uFadeColor:a.fadeColor==="black"?0:1,uFadeOpacity:a.fadeOpacity/100,uFadeLut:{texture:this.fadeLutTexture}}}}adjustPasses(t,n,i,a,r){const{width:s,height:o}=n;if(i.adjusted=this.gpu.ensureTarget(i.adjusted,s,o,"image"),this.gpu.pass(_o,i.adjusted,{...this.fade.uniforms,uImage:{texture:n.texture},uTone:{texture:this.toneTexture},uSaturation:t.saturation/100,uRegionPx:r,uSize:[s,o]}),t.smoothing<=0)return i.smoothA&&this.gpu.deleteTarget(i.smoothA),i.smoothB&&this.gpu.deleteTarget(i.smoothB),i.smoothA=null,i.smoothB=null,i.adjusted;i.smoothA=this.gpu.ensureTarget(i.smoothA,s,o,"image"),i.smoothB=this.gpu.ensureTarget(i.smoothB,s,o,"image");const l={uSigma:a,uRange:.12,uSize:[s,o]};return this.gpu.pass(Ft,i.smoothA,{...l,uImage:{texture:i.adjusted.texture},uDir:[1,0]}),this.gpu.pass(Ft,i.smoothB,{...l,uImage:{texture:i.smoothA.texture},uDir:[0,1]}),i.smoothB}uploadTone(t,n,i,a){const r=this.gpu.gl,s=t/100,o=Math.max(s+1/255,n/100),l=Math.pow(2,i/50),u=Re(a,1024),c=new Uint8Array(256*4);for(let h=0;h<256;h++){let p=Math.min(1,Math.max(0,(h/255-s)/(o-s)));p=Math.pow(p,1/l),c[h*4]=Math.round(u[Math.round(p*1023)]*255)}this.toneTexture||(this.toneTexture=r.createTexture(),r.bindTexture(r.TEXTURE_2D,this.toneTexture),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)),r.bindTexture(r.TEXTURE_2D,this.toneTexture),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,256,1,0,r.RGBA,r.UNSIGNED_BYTE,c)}runHistogram(t){if(t.split.method!=="toneMap")return!0;const n=t.splitToneMap.source;return this.stage("histogram",`${n}|${this.version("adjust")}`,()=>{this.lightness=this.gpu.ensureTarget(this.lightness,wt,wt,"coverage"),this.gpu.pass($o,this.lightness,{uImage:{texture:this.adjustOutput.texture},uSource:Math.max(0,qa.indexOf(n)),uSize:[wt,wt]});const i=this.gpu.read(this.lightness),a=new Uint32Array(256);for(let r=0;r<i.length;r+=4)i[r+3]>0&&a[i[r]]++;this.lastHistogram={data:a,source:n};for(const r of this.histogramListeners)r(a,n)})}analysis(){const t=this.adjustOutput;return(this.analysisVersion!==this.version("adjust")||!this.analysisTarget)&&(this.analysisTarget=this.gpu.ensureTarget(this.analysisTarget,t.width,t.height,"coverage"),this.gpu.pass(Uo,this.analysisTarget,{uImage:{texture:t.texture},uSize:[t.width,t.height]}),this.analysisVersion=this.version("adjust")),this.analysisTarget}splitContext(t){const n=it(t),i=this.host.source.get(),a=t;return{gpu:this.gpu,inkCount:t.palette.inkCount,inks:n.inks,paper:n.paper,table:this.tables.get(n),settingsOf:r=>a[r]??{},imageLongEdge:i?Math.max(i.width,i.height):1,texelScale:i&&this.working?this.working.width/i.width:1}}runSplit(t){const n=or(t.split.method),i=t[n.section.id],a=this.splitContext(t),r=JSON.stringify(n.dependsOn(a,i)),s=JSON.stringify(i);let o,l=0;const u=!!n.prepare&&(n.needsPrepare?.(i,a)??!0);if(u){const h=`${n.id}|${s}|${r}`;if(this.prepared?.key!==h&&this.preparing!==h&&this.startSplitPrepare(h,n,i,a),!this.prepared||this.prepared.methodId!==n.id)return!1;o=this.prepared.value,l=this.prepared.id}this.inputs={adjust:t.adjust,method:n,values:i,ctx:a,prepared:o,layers:this.layerParams(t),inkUniforms:this.inkUniforms(t),visible:this.visible(t)};const c=[n.id,s,u?`prepared ${l}`:r,a.inkCount,this.version("adjust")].join("|");return this.stage("split",c,()=>{this.splitPass(this.inputs,this.adjustOutput,this.main)})}splitPass(t,n,i,a){i.coverage=this.gpu.ensureTarget(i.coverage,n.width,n.height,"coverage");const r=a===void 0?t.ctx:{...t.ctx,texelScale:a};return t.method.render(r,n,i.coverage,t.values,t.prepared),i.coverage}splitReach(){const t=this.inputs;if(!t)return 0;const n=t.method.reach?t.method.reach(t.values,t.ctx):0,i=Math.max(...t.layers.trapOut.map(Math.abs))/t.layers.outScale;return n+(i>0?i+1:0)}startSplitPrepare(t,n,i,a){this.preparing=t,this.setBusy("split","Matching inks…");const r=s=>this.preparing!==t?!1:(this.prepared={key:t,methodId:n.id,value:s,id:++this.preparedCount},this.schedule(),!0);n.prepare(i,a,"draft").then(s=>{if(r(s))return n.prepare(i,a,"final").then(o=>{r(o)&&(this.preparing=null,this.setBusy("split",null))})}).catch(s=>{s instanceof We||(this.preparing===t?(this.preparing=null,this.setBusy("split",null),this.reportError("Ink matching",s)):console.error(s))})}setBusy(t,n){n?this.busyMessages.set(t,n):this.busyMessages.delete(t);const i=[...this.busyMessages.values()].join(" · ")||null;for(const a of this.busyListeners)a(i)}layerParams(t){const n=t.palette.inkCount,i=t.layers,a=this.host.source.get(),r=new Uint8Array(256*4);for(let o=0;o<n;o++){const l=Re(i.curve[o]??[[0,0],[1,1]],1024),u=(i.levelsBlack[o]??0)/100,c=Math.max(u+1/255,(i.levelsWhite[o]??100)/100),h=Math.pow(2,(i.levelsMid[o]??0)/50),p=(i.density[o]??100)/100;for(let d=0;d<256;d++){let m=d/255;i.invert[o]&&(m=1-m),m=Math.min(1,Math.max(0,(m-u)/(c-u))),m=Math.pow(m,1/h),m=l[Math.round(m*1023)]*p,r[d*4+o]=Math.round(Math.min(1,m)*255)}}const s=o=>Array.from({length:W},(l,u)=>u<n?o(u):0);return{tone:r,toneKey:JSON.stringify([n,i.invert,i.levelsBlack,i.levelsWhite,i.levelsMid,i.curve,i.density]),active:s(()=>1),knockout:s(o=>i.knockout[o]?1:0),limit:i.inkLimit/100,trapOut:s(o=>i.trap[o]??0),outScale:a?ln(t,a.width,a.height):1}}runLayers(){const t=this.inputs.layers,n=this.inputs.ctx.texelScale,i=[t.toneKey,t.active,t.knockout,t.limit,t.trapOut,t.outScale,n,this.version("split")].join("|");return this.stage("layerOptions",i,()=>{this.layersPass(t,this.main.coverage,this.main,n)})}toneTextureFor(t){const n=this.gpu.gl;if(!this.layerTone){const i=n.createTexture();n.bindTexture(n.TEXTURE_2D,i),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),this.layerTone={texture:i,key:""}}return this.layerTone.key!==t.toneKey&&(n.bindTexture(n.TEXTURE_2D,this.layerTone.texture),n.texImage2D(n.TEXTURE_2D,0,n.RGBA8,256,1,0,n.RGBA,n.UNSIGNED_BYTE,t.tone),this.layerTone.key=t.toneKey),this.layerTone.texture}layersPass(t,n,i,a){const{width:r,height:s}=n,o=t.limit<3.995?1:0,l={uLimit:t.limit,uSize:[r,s]},u={...l,uTone:{texture:this.toneTextureFor(t)},uActive:t.active,uKnockout:t.knockout};i.layered=this.gpu.ensureTarget(i.layered,r,s,"coverage");const c=t.trapOut.map(h=>h/t.outScale*a);return c.some(h=>Math.abs(h)>.01)?(i.layerA=this.gpu.ensureTarget(i.layerA,r,s,"coverage"),i.layerB=this.gpu.ensureTarget(i.layerB,r,s,"coverage"),this.gpu.pass(Ii,i.layerA,{...u,uCoverage:{texture:n.texture},uApplyLimit:0}),this.gpu.pass(Ai,i.layerB,{...l,uCoverage:{texture:i.layerA.texture},uDir:[1,0],uRadius:c,uApplyLimit:0}),this.gpu.pass(Ai,i.layered,{...l,uCoverage:{texture:i.layerB.texture},uDir:[0,1],uRadius:c,uApplyLimit:o}),i.layered):(this.gpu.pass(Ii,i.layered,{...u,uCoverage:{texture:n.texture},uApplyLimit:o}),i.layered)}visible(t){const n=t.palette.inkCount,{solo:i,mute:a}=t.layers,r=i.slice(0,n).some(Boolean);return Array.from({length:W},(s,o)=>o<n&&(r?i[o]:!a[o])?1:0)}inkUniforms(t){const n=it(t),i=this.tables.get(n),a=new Float32Array(16*3);a.set(i.colors.subarray(0,48));const r=o=>{const l=ee(o)??{r:0,g:0,b:0};return[l.r/255,l.g/255,l.b/255]},s=new Float32Array(W*3);return n.inks.forEach((o,l)=>s.set(r(o.hex),l*3)),{uTable:a,uInkCount:i.inkCount,uPaperSrgb:r(n.paper),uInkSrgb:s}}runMix(t){const n=this.visible(t),i=JSON.stringify(it(t)),a=this.host.source.get();return this.stage("mix",`${i}|${n}|${this.version("layerOptions")}|${this.version("printSim")}`,()=>{this.mixPass(this.inputs.inkUniforms,n,this.main.layered,this.working,this.main,[0,0,a.width,a.height])})}mixPass(t,n,i,a,r,s){return r.mixed=this.gpu.ensureTarget(r.mixed,i.width,i.height,"image",{mipmaps:!0}),this.gpu.pass(Fo(this.sim.uSimOn===1),r.mixed,{...t,...this.sim,uRegionPx:s,uCoverage:{texture:i.texture},uImage:{texture:a.texture},uVisible:n,uSize:[i.width,i.height]}),this.gpu.generateMipmaps(r.mixed),r.mixed}runPrintSim(t,n,i){const a=ln(t,n,i),r=Io(t),s=JSON.stringify([t.printSim,t.simMisreg,t.simLowInk,t.simSpecks,t.simGain,t.export.gainCompensation,t.upload.mode,a,n,i,r?this.version("layerOptions"):0]);return this.stage("printSim",s,()=>{const o=r?this.buildDensity(this.main.layered):this.noDensity();this.simSetup={settings:t,W:n,H:i,scale:a,density:o},this.sim=Ci(t,"preview",n,i,a,o),this.compositor.setSim(this.sim),this.host.preview.requestRender()})}buildDensity(t){let n=t,i=0;for(;Math.max(n.width,n.height)>128;){const a=Math.max(1,Math.ceil(n.width/2)),r=Math.max(1,Math.ceil(n.height/2)),s=this.gpu.ensureTarget(this.densityTargets[i]??null,a,r,"coverage");this.densityTargets[i]=s,this.gpu.pass(bt,s,{uImage:{texture:n.texture},uRatio:[n.width/a,n.height/r],uRegion:[0,0,1,1],uSize:[a,r]}),n=s,i++}return n.texture}noDensity(){if(!this.emptyDensity){const t=this.gpu.gl;this.emptyDensity=t.createTexture(),t.bindTexture(t.TEXTURE_2D,this.emptyDensity),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,1,1,0,t.RGBA,t.UNSIGNED_BYTE,new Uint8Array(4)),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST)}return this.emptyDensity}simReach(){const t=this.simSetup;return t?Ao(t.settings,t.W,t.H,t.scale):0}runBorder(t,n,i){const a=t.palette.inkCount;return this.stage("border",`${JSON.stringify(t.border)}|${n}|${i}|${a}|${this.version("mix")}`,()=>{const r=It(t.border,n,i,a);this.border=r;const s=this.visible(t),o=r.mode===1&&s[r.ink]?1<<r.ink:0,l=this.inputs.inkUniforms.uTable,u=[l[o*3],l[o*3+1],l[o*3+2]];this.compositor.setFrame(Ka(r)),this.host.preview.setFrame(r,u)})}overrideTarget=null;runPreviewOverride(){const t=this.inputs,n=this.adjustOutput;return!t?.method.previewOverride||!n||(this.overrideTarget=this.gpu.ensureTarget(this.overrideTarget,n.width,n.height,"image",{mipmaps:!0}),!t.method.previewOverride(t.ctx,n,this.overrideTarget,t.values))?!1:(this.gpu.generateMipmaps(this.overrideTarget),this.halftoned=!1,this.keys.delete("halftone"),this.clearDetail(),this.host.preview.setSource("inks",{kind:"texture",texture:this.overrideTarget.texture,textureWidth:n.width}),!0)}runHalftone(t,n,i){if(this.runPreviewOverride())return!0;const a=bo(t.halftone.type),r=ln(t,n,i);if(!a)return this.stage("halftone",`none|${this.version("mix")}`,()=>{this.halftoned=!1,this.halftoneState=null,this.showMixed()});const s=t[a.section.id],o=Math.round(n*r),l={outputWidth:o,outputHeight:Math.max(1,Math.round(o*i/n)),gpu:this.gpu,inkCount:t.palette.inkCount,analysis:()=>this.analysis(),imageKey:String(this.version("adjust"))},u=()=>(this.halftoned=!1,this.keys.delete("halftone"),this.showMixed(),!0);let c,h=0;if(a.prepare&&a.prepareKey){const g=`${a.id}|${a.prepareKey(s,l)}`;if(this.halftonePrepared?.key!==g&&this.halftonePreparing!==g&&this.startHalftonePrepare(g,a,s,l),!this.halftonePrepared||this.halftonePrepared.methodId!==a.id)return u();c=this.halftonePrepared.value,h=this.halftonePrepared.id}const p=t.palette.inkCount,d={gpu:this.gpu,inkCount:p,minDot:t.halftone.minDot.slice(0,W),minDotMode:t.halftone.minDotMode,outputWidth:l.outputWidth,outputHeight:l.outputHeight,analysis:()=>this.analysis()};let m=0;if(a.fromCoverage){const g=a.fromCoverage.cell(s,d);let v=Math.ceil(l.outputWidth/g),b=Math.ceil(l.outputHeight/g);const k=Math.min(1,Gu/Math.max(v,b));v=Math.max(1,Math.round(v*k)),b=Math.max(1,Math.round(b*k));const x=[a.id,JSON.stringify(s),v,b,p,this.version("layerOptions")].join("|");if(this.bitmap?.key!==x&&this.bitmapBuilding!==x&&this.startBitmap(x,a,s,v,b,l.outputWidth/v,p),!this.bitmap||this.bitmap.methodId!==a.id)return u();m=this.bitmap.id}const f=[a.id,JSON.stringify(s),JSON.stringify(t.halftone),r,h,m,this.version("mix")].join("|");return this.stage("halftone",f,()=>{this.halftoned=!0,this.clearDetail();const g=a.uniforms(s,d,c,this.bitmap?.value);this.halftoneState={method:a,methodUniforms:g,reach:a.reach?a.reach(s,d):Xu(s),values:s,ctx:d,prepared:c},this.compositor.set({method:a,methodUniforms:g,inkUniforms:this.inputs.inkUniforms,coverage:this.main.layered,image:this.working,imageWidth:n,imageHeight:i,outputScale:r,visible:this.inputs.visible,background:this.host.background}),this.host.preview.setSource("inks",this.compositor)})}startBitmap(t,n,i,a,r,s,o){this.bitmapBuilding=t,this.setBusy("bitmap","Diffusing…");const l=this.readCoverage(this.main.layered,a,r);n.fromCoverage.build(i,l,a,r,o,"preview").then(u=>{this.bitmapBuilding===t&&(this.bitmap={key:t,methodId:n.id,value:{bits:u,width:a,height:r,cell:s},id:++this.preparedCount},this.bitmapBuilding=null,this.setBusy("bitmap",null),this.schedule())}).catch(u=>{u instanceof We||(this.bitmapBuilding===t?(this.bitmapBuilding=null,this.setBusy("bitmap",null),this.reportError("Dithering",u)):console.error(u))})}readCoverage(t,n,i){return this.coverageRead=this.gpu.ensureTarget(this.coverageRead,n,i,"coverage"),this.gpu.pass(bt,this.coverageRead,{uImage:{texture:t.texture},uRatio:[t.width/n,t.height/i],uRegion:[0,0,1,1],uSize:[n,i]}),this.gpu.read(this.coverageRead)}startHalftonePrepare(t,n,i,a){this.halftonePreparing=t;const s={spiral:"Building spiral…",turing:"Growing Turing pattern…"}[n.id]??"Building halftone map…";this.setBusy("halftone",s);const o=l=>{this.halftonePreparing===t&&this.setBusy("halftone",`${s} ${Math.round(l*100)}%`)};n.prepare(i,{...a,progress:o}).then(l=>{this.halftonePreparing===t&&(this.halftonePrepared={key:t,methodId:n.id,value:l,id:++this.preparedCount},this.halftonePreparing=null,this.setBusy("halftone",null),this.schedule())}).catch(l=>{l instanceof We||(this.halftonePreparing===t?(this.halftonePreparing=null,this.setBusy("halftone",null),this.reportError("Building the halftone",l)):console.error(l))})}showMixed(){const t=this.main.mixed;t&&this.host.preview.setSource("inks",{kind:"texture",texture:t.texture,textureWidth:t.width,detail:this.detail})}clearDetail(){this.detail&&(this.detail=null,this.releaseTargets(this.detailTargets),this.halftoned||this.showMixed())}renderDetail(){const t=this.inputs;if(this.held||!t||!this.working||!this.sourceTexture||this.halftoned)return;const n=this.host.preview.currentView,i=this.host.preview.canvasSize,a=this.imageSize.width,r=this.imageSize.height,s=this.working.width/a,o=this.sourceTextureWidth/a;if(n.scale<=s*1.05||o<=s*1.01){this.clearDetail();return}const l=performance.now(),u=t.adjust,c=u.smoothing*Math.max(a,r)/1e3,h=(u.smoothing>0?Math.ceil(c*2.5):0)+Math.ceil(this.splitReach()+this.simReach())+2,p=Math.max(0,Math.floor(-n.originX/n.scale-h)),d=Math.max(0,Math.floor(-n.originY/n.scale-h)),m=Math.min(a,Math.ceil((i.width-n.originX)/n.scale+h)),f=Math.min(r,Math.ceil((i.height-n.originY)/n.scale+h));if(m<=p||f<=d){this.clearDetail();return}const g=m-p,v=f-d;let b=Math.min(n.scale,o);g*v*b*b>ta&&(b=Math.sqrt(ta/(g*v)));const k=this.renderRegion({x:p,y:d,width:g,height:v},b,this.detailTargets,{mix:!0,visible:t.visible});this.detail={texture:k.mixed.texture,x:p,y:d,width:g,height:v},this.showMixed(),this.host.debug&&console.debug(`[pipeline] detail ${k.layered.width}×${k.layered.height} ${(performance.now()-l).toFixed(1)}ms`)}renderRegion(t,n,i,a){const r=this.inputs,s=this.imageSize.width,o=this.imageSize.height,l=Math.max(1,Math.round(t.width*n)),u=Math.max(1,Math.round(t.height*n));i.source=this.gpu.ensureTarget(i.source,l,u,"image"),this.gpu.pass(bt,i.source,{uImage:{texture:this.sourceTexture},uRatio:[this.sourceTextureWidth*(t.width/s)/l,this.sourceTextureWidth*(o/s)*(t.height/o)/u],uRegion:[t.x/s,t.y/o,t.width/s,t.height/o],uSize:[l,u]});const c=r.adjust,h=c.smoothing*Math.max(s,o)/1e3,p=this.adjustPasses(c,i.source,i,h*(l/t.width),[t.x,t.y,t.width,t.height]),d=this.splitPass(r,p,i,n),m=this.layersPass(r.layers,d,i,n),f=a.visible??[1,1,1,1],g=a.mix?this.mixPass(r.inkUniforms,f,m,i.source,i,[t.x,t.y,t.width,t.height]):null;return{source:i.source,layered:m,mixed:g}}releaseTargets(t){for(const n of Object.keys(t)){const i=t[n];i&&this.gpu.deleteTarget(i),t[n]=null}}get busy(){return[...this.busyMessages.keys()].some(n=>n!=="export")||this.preparing!==null||this.halftonePreparing!==null||this.bitmapBuilding!==null}exportState(){const t=this.imageSize;return!this.host.source.get()||!this.inputs||!this.sourceTexture?null:{gpu:this.gpu,imageWidth:t.width,imageHeight:t.height,sourceScale:this.sourceTextureWidth/t.width,inkCount:this.inputs.ctx.inkCount,inkUniforms:this.inputs.inkUniforms,smoothing:this.inputs.adjust.smoothing,splitReach:this.splitReach(),simReach:this.simReach(),sim:n=>{const i=this.simSetup;return Ci(i.settings,n,i.W,i.H,i.scale,i.density)},border:this.border??It(this.host.settings.get().border,t.width,t.height,this.inputs.ctx.inkCount),halftone:this.halftoneState}}flush(){this.run()}}function Xn(){return{...yr(),source:null}}const qu=["levelsBlack","levelsWhite","levelsMid","curve","trap"],ju={levelsBlack:"Levels: ink starts at",levelsWhite:"Levels: full ink at",levelsMid:"Levels: midtone",curve:"Curve",trap:"Choke (−) / spread (+)"};function St(e,t){const n=document.createElement("button");return n.type="button",n.className="layer-toggle",n.textContent=e,n.title=t,n.setAttribute("aria-label",t),n.setAttribute("aria-pressed","false"),n}function Vu(e){const t=document.createElement("div");t.className="layers-block";const n=document.createElement("p");n.className="control-help",n.textContent="In print order, which is set in Palette (top prints first). Solo and mute only change the preview.";const i=document.createElement("ol");i.className="layer-list",t.append(n,i);let a="",r=[];const s=new Set;function o(){const u=e.get().palette;i.innerHTML="",r=[];for(let c=0;c<u.inkCount;c++){const h=document.createElement("li");h.className="layer-row";const p=document.createElement("div");p.className="layer-head";const d=document.createElement("span");d.className="ink-order",d.textContent=String(c+1);const m=document.createElement("span");m.className="layer-name";const f=document.createElement("span");f.className="ink-dot",f.style.setProperty("--swatch",u.inkColor[c]??"#000"),m.append(f,(u.inkColor[c]??"").toUpperCase());const g=St("Invert",`Invert layer ${c+1}`);g.addEventListener("click",()=>e.setInkValue("layers","invert",c,!e.get().layers.invert[c]));const v=St("Solo",`Solo layer ${c+1}: show only soloed layers (preview only)`);v.addEventListener("click",()=>e.setInkValue("layers","solo",c,!e.get().layers.solo[c]));const b=St("Mute",`Mute layer ${c+1}: hide it (preview only)`),k=St("Knockout",`Knockout: layer ${c+1} clears the layers printed before it where it has ink`);k.addEventListener("click",()=>e.setInkValue("layers","knockout",c,!e.get().layers.knockout[c])),b.addEventListener("click",()=>e.setInkValue("layers","mute",c,!e.get().layers.mute[c])),p.append(d,m);const x=document.createElement("div");x.className="layer-toggles",x.append(g,k,v,b);const S=document.createElement("label");S.className="layer-density";const y=document.createElement("span");y.textContent="Density";const w=document.createElement("input");w.type="range",w.min="0",w.max="200",w.step="1",w.setAttribute("aria-label",`Layer ${c+1} density`);const T=document.createElement("input");T.type="number",T.className="control-number",T.min="0",T.max="200",T.setAttribute("aria-label",`Layer ${c+1} density value`),w.addEventListener("input",()=>{T.value=w.value,e.setInkValue("layers","density",c,Number(w.value),{commit:!1})}),w.addEventListener("change",()=>e.setInkValue("layers","density",c,Number(w.value))),T.addEventListener("change",()=>e.setInkValue("layers","density",c,Number(T.value)));const M=document.createElement("span");M.className="control-unit",M.textContent="%",S.append(y,w,T,M);const A=document.createElement("details");A.className="layer-more",A.open=s.has(c),A.addEventListener("toggle",()=>A.open?s.add(c):s.delete(c));const P=document.createElement("summary");P.textContent="Levels, curve, trapping",A.append(P);const _=[],L=e.get().layers;for(const D of qu){const I={...te("layers",D),help:void 0},N=Q(I,L[D]?.[c],($,z)=>e.setInkValue("layers",D,c,$,{commit:z}),ju[D]);A.append(N.element),_.push({key:D,control:N})}const F=document.createElement("p");F.className="control-help",F.textContent="In output pixels. Spread a lower layer (or choke a knockout layer) so small registration shifts don't leave paper gaps.",A.append(F),h.append(p,x,S,A),i.append(h),r.push({element:h,density:w,densityNumber:T,invert:g,knockout:k,solo:v,mute:b,more:_})}}function l(){const{palette:u,layers:c}=e.get(),h=`${u.inkCount}|${u.inkColor.slice(0,u.inkCount).join()}`;h!==a&&(a=h,o());const p=c.solo.slice(0,u.inkCount).some(Boolean);r.forEach((d,m)=>{const f=String(c.density[m]??100);document.activeElement!==d.density&&(d.density.value=f),document.activeElement!==d.densityNumber&&(d.densityNumber.value=f);const g=(k,x)=>{k.classList.toggle("active",x),k.setAttribute("aria-pressed",String(x))};g(d.invert,!!c.invert[m]),g(d.solo,!!c.solo[m]),g(d.mute,!!c.mute[m]),g(d.knockout,!!c.knockout[m]);const v=c;for(const{key:k,control:x}of d.more)x.update(v[k]?.[m]);const b=p?!c.solo[m]:!!c.mute[m];d.element.classList.toggle("layer-hidden",b)})}return l(),e.subscribe(l),t}function Yu(e){let[t,n,i]=e;const a=Math.min(1,Math.max(0,.2126*t+.7152*n+.0722*i)),r=Math.min(t,n,i);if(r<0){const l=a/Math.max(a-r,1e-6);t=a+(t-a)*l,n=a+(n-a)*l,i=a+(i-a)*l}const s=Math.max(t,n,i);if(s>1){const l=(1-a)/Math.max(s-a,1e-6);t=a+(t-a)*l,n=a+(n-a)*l,i=a+(i-a)*l}const o=l=>Math.min(1,Math.max(0,l));return[o(t),o(n),o(i)]}const Lt=e=>e.map(([t,n])=>[t,n]);function Ku(e,t,n,i,a){const r=Lt(e);let s;if(a==="first")s=0;else if(a==="last")s=r.length-1;else{if(r.length<=2)return r;s=1;for(let h=2;h<r.length-1;h++)Math.abs(r[h][0]-t[0])<Math.abs(r[s][0]-t[0])&&(s=h)}const[o,l]=r[s],u=s>0?r[s-1][0]+.01:0,c=s<r.length-1?r[s+1][0]-.01:1;return r[s]=[a?o:Math.min(c,Math.max(u,o+n)),Math.min(1,Math.max(0,l+i))],r}function Ju(e){const t=document.createElement("div");t.className="tone-curves";const n=Q(te("splitToneMap","linkCurves"),e.get().splitToneMap.linkCurves,d=>e.setValue("splitToneMap","linkCurves",d)),i=document.createElement("p");i.className="control-help",i.textContent="Each curve maps lightness (left = dark, right = light) to how much of that ink prints. Inks stack like a duotone or tritone.";const a=document.createElement("div");a.className="tone-curve-rows",t.append(i,n.element,a);let r="",s=[],o=[];const l=()=>e.get().splitToneMap.inkCurve.map(Lt);function u(d,m){o=d.map(Lt),e.setValue("splitToneMap","inkCurve",d,{commit:m})}function c(d,m,f){const g=l(),v=o[d]??g[d]??[];g[d]=m;const b=e.get().palette.inkCount;if(e.get().splitToneMap.linkCurves&&v.length===m.length){let k=-1,x=1e-6;if(m.forEach(([S,y],w)=>{const T=Math.abs(S-v[w][0])+Math.abs(y-v[w][1]);T>x&&(x=T,k=w)}),k>=0){const S=m[k][0]-v[k][0],y=m[k][1]-v[k][1],w=k===0?"first":k===m.length-1?"last":null;for(let T=0;T<b;T++)T!==d&&(g[T]=Ku(g[T],v[k],S,y,w),s[T]?.update(g[T]))}}u(g,f)}function h(){const{palette:d}=e.get();a.innerHTML="",s=[],o=l();for(let m=0;m<d.inkCount;m++){const f=document.createElement("div");f.className="tone-curve-row";const g=document.createElement("div");g.className="tone-curve-head";const v=document.createElement("span");v.className="layer-name";const b=document.createElement("span");b.className="ink-dot",b.style.setProperty("--swatch",d.inkColor[m]??"#000"),v.append(b,`${m+1} · ${(d.inkColor[m]??"").toUpperCase()}`);const k=document.createElement("select");k.setAttribute("aria-label",`Preset for ink ${m+1}`),k.innerHTML='<option value="">Preset…</option>'+Ui.map(S=>`<option value="${S.id}">${S.label}</option>`).join(""),k.addEventListener("change",()=>{const S=Ui.find(w=>w.id===k.value);if(k.value="",!S)return;const y=l();y[m]=Lt(S.points),s[m]?.update(y[m]),u(y,!0)}),g.append(v,k);const x=mr(`Ink ${m+1} curve`,o[m]??[],(S,y)=>c(m,S,y));f.append(g,x.element),a.append(f),s.push(x)}}function p(){const{palette:d,splitToneMap:m}=e.get();n.update(m.linkCurves);const f=`${d.inkCount}|${d.inkColor.slice(0,W).join()}`;if(f!==r){r=f,h();return}const g=l();s.forEach((v,b)=>v.update(g[b]??[])),o=g}return p(),e.subscribe((d,m)=>{(m.section==="splitToneMap"||m.section==="palette"||m.section==="*")&&p()}),t}const Zu=96,Qu=20,ec=8,Et=1,na=["cutoff1","cutoff2","cutoff3"],un=["band1Ink","band2Ink","band3Ink","band4Ink"],tc=[["Shadows"],["Shadows","Highlights"],["Shadows","Midtones","Highlights"],["Shadows","Dark mids","Light mids","Highlights"]];function nc(e,t){const n=document.createElement("div");n.className="tonemap-block";const i=document.createElement("div");i.className="palette-heading",i.innerHTML='<span class="control-label">Bands</span><span class="control-help">Drag the lines to move band edges</span>';const a=document.createElement("canvas");a.className="tonemap-hist",a.setAttribute("role","img"),a.setAttribute("aria-label","Lightness histogram with band edges");const r=document.createElement("div");r.className="tonemap-axis",r.innerHTML="<span>Dark</span><span>Light</span>";const s=document.createElement("span");s.className="control-label",s.textContent="Printed color at each tone";const o=document.createElement("canvas");o.className="tonemap-strip",o.setAttribute("role","img"),o.setAttribute("aria-label","Printed color at each tone, dark to light");const l=document.createElement("div");l.className="tonemap-bands";const u=document.createElement("div");u.className="control",u.innerHTML='<span class="control-label">Mode</span>';const c=document.createElement("div");c.className="segmented";const h=[["simple","Simple (bands)"],["advanced","Advanced (curves)"]].map(([R,I])=>{const N=document.createElement("button");return N.type="button",N.textContent=I,N.dataset.value=R,N.addEventListener("click",()=>m(R)),c.append(N),N});u.append(c);const p=Ju(e),d=[i,a,r,l];n.append(u,i,a,r,s,o,l,p);function m(R){const I=b();if(R!==I.mode){if(R==="advanced"){const N=k(),$=sr(I,N),z=I.inkCurve.map((B,E)=>E<N.length?Zo($,E):B.map(([C,O])=>[C,O]));e.setValue("splitToneMap","inkCurve",z)}e.setValue("splitToneMap","mode",R)}}let f=null,g=null;const v=new Wn;t.onHistogram(R=>{f=R,P()});const b=()=>e.get().splitToneMap,k=()=>{const R=e.get().palette;return R.inkColor.slice(0,R.inkCount)},x=()=>{const R=b();return na.slice(0,R.bandCount-1).map(I=>R[I])};function S(R){const I=e.get().palette;return R===null?I.paper:I.inkColor[R]??"#000"}function y(R,I){const N=Math.max(120,n.clientWidth||300),$=window.devicePixelRatio||1;(R.width!==Math.round(N*$)||R.height!==Math.round(I*$))&&(R.width=Math.round(N*$),R.height=Math.round(I*$),R.style.height=`${I}px`);const z=R.getContext("2d");return z.setTransform($,0,0,$,0,0),{w:N,h:I,ctx:z}}function w(){const{w:R,h:I,ctx:N}=y(a,Zu),$=b(),z=$t($,k()),B=[0,...x().map(E=>E/100).sort((E,C)=>E-C),1];N.clearRect(0,0,R,I);for(let E=0;E<$.bandCount;E++)N.fillStyle=S(z[E]??null),N.globalAlpha=.35,N.fillRect(B[E]*R,0,(B[E+1]-B[E])*R,I);if(N.globalAlpha=1,f){let E=1;for(const C of f)E=Math.max(E,C);N.fillStyle="rgba(28, 28, 28, 0.75)";for(let C=0;C<256;C++){const O=Math.sqrt(f[C]/E)*(I-4);N.fillRect(C/256*R,I-O,R/256+.5,O)}}x().forEach((E,C)=>{const O=E/100*R;N.fillStyle=C===g?"#f78f28":"#1c1c1c",N.fillRect(O-1,0,2,I),N.beginPath(),N.arc(O,7,5,0,Math.PI*2),N.fill()})}function T(){const{w:R,h:I,ctx:N}=y(o,Qu),$=e.get(),z=v.get(it($)),B=rr(b(),k()),E=new Float32Array(W),C=N.createImageData(Math.max(1,Math.round(R)),1);for(let U=0;U<C.width;U++){const G=Math.round(U/Math.max(1,C.width-1)*(ie-1));for(let se=0;se<W;se++)E[se]=B[G*W+se];const q=Yu(Ru(z,E));C.data[U*4]=Math.round(be(q[0])*255),C.data[U*4+1]=Math.round(be(q[1])*255),C.data[U*4+2]=Math.round(be(q[2])*255),C.data[U*4+3]=255}const O=new OffscreenCanvas(C.width,1);O.getContext("2d").putImageData(C,0,0),N.imageSmoothingEnabled=!1,N.clearRect(0,0,R,I),N.drawImage(O,0,0,R,I)}let M="";function A(){const R=b(),I=e.get().palette,N=$t(R,k()),$=`${R.bandCount}|${I.inkCount}|${I.inkColor.join()}|${un.map(B=>R[B]).join()}|${N.join()}`;if($===M)return;M=$,l.innerHTML="";const z=tc[R.bandCount-1]??[];for(let B=0;B<R.bandCount;B++){const E=document.createElement("label");E.className="tonemap-band";const C=document.createElement("span");C.className="ink-dot",C.style.setProperty("--swatch",S(N[B]??null));const O=document.createElement("span");O.textContent=`${B+1}. ${z[B]??""}`;const U=document.createElement("select");U.setAttribute("aria-label",`Ink for band ${B+1}`);const G=N[B],q=[["auto",`Auto (${G==null?"paper":`ink ${G+1}`})`],["paper","Paper (no ink)"],...Array.from({length:I.inkCount},(Le,fe)=>[String(fe),`Ink ${fe+1} · ${(I.inkColor[fe]??"").toUpperCase()}`])];for(const[Le,fe]of q){const Pe=document.createElement("option");Pe.value=Le,Pe.textContent=fe,U.append(Pe)}const se=R[un[B]];U.value=q.some(([Le])=>Le===se)?se:"auto",U.addEventListener("change",()=>e.setValue("splitToneMap",un[B],U.value)),E.append(C,O,U),l.append(E)}}function P(){const R=b().mode==="advanced";for(const I of h)I.classList.toggle("active",I.dataset.value===(R?"advanced":"simple"));for(const I of d)I.hidden=R;p.hidden=!R,n.offsetParent!==null&&(T(),!R&&(w(),A()))}const _=R=>{const I=a.getBoundingClientRect();return{pct:(R.clientX-I.left)/I.width*100,px:R.clientX-I.left,w:I.width}},L=(R,I)=>{let N=-1,$=ec;return x().forEach((z,B)=>{const E=Math.abs(z/100*I-R);E<=$&&($=E,N=B)}),N},F=(R,I,N)=>{const $=x(),z=R>0?$[R-1]+Et:Et,B=R<$.length-1?$[R+1]-Et:100-Et,E=Math.round(Math.min(B,Math.max(z,I))*2)/2;e.setValue("splitToneMap",na[R],E,{commit:N})};a.addEventListener("pointerdown",R=>{const I=_(R),N=L(I.px,I.w);N<0||(g=N,a.setPointerCapture(R.pointerId),P())}),a.addEventListener("pointermove",R=>{const I=_(R);if(g===null){a.style.cursor=L(I.px,I.w)>=0?"ew-resize":"default";return}F(g,I.pct,!1)});const D=R=>{g!==null&&(F(g,_(R).pct,!0),g=null,P())};return a.addEventListener("pointerup",D),a.addEventListener("pointercancel",D),e.subscribe((R,I)=>{(I.section==="splitToneMap"||I.section==="palette"||I.section==="*"||I.section==="split")&&P()}),new ResizeObserver(()=>P()).observe(n),n}const ic=[{label:"Standard",title:"15°, 75°, 0°, 45° by print order (the classic CMYK set, which avoids moiré)",angles:Na},{label:"All 45°",title:"Every ink at 45°",angles:[45,45,45,45]},{label:"All 0°",title:"Every ink at 0°",angles:[0,0,0,0]}],ac=[{label:"Standard",title:"0°, 30°, 15°, 45° by print order (15° apart, the most two hex screens can differ)",angles:[0,30,15,45]},{label:"All 30°",title:"Every ink at 30°",angles:[30,30,30,30]},{label:"All 0°",title:"Every ink at 0°",angles:[0,0,0,0]}];function xr(e,t,n){const i=document.createElement("div");i.className="control";const a=document.createElement("span");a.className="control-label",a.textContent="Angle presets";const r=document.createElement("div");r.className="button-row";for(const s of n){const o=document.createElement("button");o.type="button",o.textContent=s.label,o.title=s.title,o.addEventListener("click",()=>e.setValue(t,"angle",s.angles.slice(0,W))),r.append(o)}return i.append(a,r),i}const rc=e=>xr(e,"halftoneAm",ic),sc=e=>xr(e,"halftoneHex",ac);var Z=Uint8Array,ne=Uint16Array,Hn=Int32Array,qn=new Z([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),jn=new Z([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),ia=new Z([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),wr=function(e,t){for(var n=new ne(31),i=0;i<31;++i)n[i]=t+=1<<e[i-1];for(var a=new Hn(n[30]),i=1;i<30;++i)for(var r=n[i];r<n[i+1];++r)a[r]=r-n[i]<<5|i;return{b:n,r:a}},Sr=wr(qn,2),oc=Sr.b,En=Sr.r;oc[28]=258,En[258]=28;var lc=wr(jn,0),aa=lc.r,Tn=new ne(32768);for(var X=0;X<32768;++X){var ve=(X&43690)>>1|(X&21845)<<1;ve=(ve&52428)>>2|(ve&13107)<<2,ve=(ve&61680)>>4|(ve&3855)<<4,Tn[X]=((ve&65280)>>8|(ve&255)<<8)>>1}var at=function(e,t,n){for(var i=e.length,a=0,r=new ne(t);a<i;++a)e[a]&&++r[e[a]-1];var s=new ne(t);for(a=1;a<t;++a)s[a]=s[a-1]+r[a-1]<<1;var o;if(n){o=new ne(1<<t);var l=15-t;for(a=0;a<i;++a)if(e[a])for(var u=a<<4|e[a],c=t-e[a],h=s[e[a]-1]++<<c,p=h|(1<<c)-1;h<=p;++h)o[Tn[h]>>l]=u}else for(o=new ne(i),a=0;a<i;++a)e[a]&&(o[a]=Tn[s[e[a]-1]++]>>15-e[a]);return o},Ie=new Z(288);for(var X=0;X<144;++X)Ie[X]=8;for(var X=144;X<256;++X)Ie[X]=9;for(var X=256;X<280;++X)Ie[X]=7;for(var X=280;X<288;++X)Ie[X]=8;var Ut=new Z(32);for(var X=0;X<32;++X)Ut[X]=5;var uc=at(Ie,9,0),cc=at(Ut,5,0),Er=function(e){return(e+7)/8|0},Tr=function(e,t,n){return(n==null||n>e.length)&&(n=e.length),new Z(e.subarray(t,n))},hc=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],jt=function(e,t,n){var i=new Error(t||hc[e]);if(i.code=e,Error.captureStackTrace&&Error.captureStackTrace(i,jt),!n)throw i;return i},ue=function(e,t,n){n<<=t&7;var i=t/8|0;e[i]|=n,e[i+1]|=n>>8},Qe=function(e,t,n){n<<=t&7;var i=t/8|0;e[i]|=n,e[i+1]|=n>>8,e[i+2]|=n>>16},cn=function(e,t){for(var n=[],i=0;i<e.length;++i)e[i]&&n.push({s:i,f:e[i]});var a=n.length,r=n.slice();if(!a)return{t:Rr,l:0};if(a==1){var s=new Z(n[0].s+1);return s[n[0].s]=1,{t:s,l:1}}n.sort(function(S,y){return S.f-y.f}),n.push({s:-1,f:25001});var o=n[0],l=n[1],u=0,c=1,h=2;for(n[0]={s:-1,f:o.f+l.f,l:o,r:l};c!=a-1;)o=n[n[u].f<n[h].f?u++:h++],l=n[u!=c&&n[u].f<n[h].f?u++:h++],n[c++]={s:-1,f:o.f+l.f,l:o,r:l};for(var p=r[0].s,i=1;i<a;++i)r[i].s>p&&(p=r[i].s);var d=new ne(p+1),m=Mn(n[c-1],d,0);if(m>t){var i=0,f=0,g=m-t,v=1<<g;for(r.sort(function(y,w){return d[w.s]-d[y.s]||y.f-w.f});i<a;++i){var b=r[i].s;if(d[b]>t)f+=v-(1<<m-d[b]),d[b]=t;else break}for(f>>=g;f>0;){var k=r[i].s;d[k]<t?f-=1<<t-d[k]++-1:++i}for(;i>=0&&f;--i){var x=r[i].s;d[x]==t&&(--d[x],++f)}m=t}return{t:new Z(d),l:m}},Mn=function(e,t,n){return e.s==-1?Math.max(Mn(e.l,t,n+1),Mn(e.r,t,n+1)):t[e.s]=n},ra=function(e){for(var t=e.length;t&&!e[--t];);for(var n=new ne(++t),i=0,a=e[0],r=1,s=function(l){n[i++]=l},o=1;o<=t;++o)if(e[o]==a&&o!=t)++r;else{if(!a&&r>2){for(;r>138;r-=138)s(32754);r>2&&(s(r>10?r-11<<5|28690:r-3<<5|12305),r=0)}else if(r>3){for(s(a),--r;r>6;r-=6)s(8304);r>2&&(s(r-3<<5|8208),r=0)}for(;r--;)s(a);r=1,a=e[o]}return{c:n.subarray(0,i),n:t}},et=function(e,t){for(var n=0,i=0;i<t.length;++i)n+=e[i]*t[i];return n},Mr=function(e,t,n){var i=n.length,a=Er(t+2);e[a]=i&255,e[a+1]=i>>8,e[a+2]=e[a]^255,e[a+3]=e[a+1]^255;for(var r=0;r<i;++r)e[a+r+4]=n[r];return(a+4+i)*8},sa=function(e,t,n,i,a,r,s,o,l,u,c){ue(t,c++,n),++a[256];for(var h=cn(a,15),p=h.t,d=h.l,m=cn(r,15),f=m.t,g=m.l,v=ra(p),b=v.c,k=v.n,x=ra(f),S=x.c,y=x.n,w=new ne(19),T=0;T<b.length;++T)++w[b[T]&31];for(var T=0;T<S.length;++T)++w[S[T]&31];for(var M=cn(w,7),A=M.t,P=M.l,_=19;_>4&&!A[ia[_-1]];--_);var L=u+5<<3,F=et(a,Ie)+et(r,Ut)+s,D=et(a,p)+et(r,f)+s+14+3*_+et(w,A)+2*w[16]+3*w[17]+7*w[18];if(l>=0&&L<=F&&L<=D)return Mr(t,c,e.subarray(l,l+u));var R,I,N,$;if(ue(t,c,1+(D<F)),c+=2,D<F){R=at(p,d,0),I=p,N=at(f,g,0),$=f;var z=at(A,P,0);ue(t,c,k-257),ue(t,c+5,y-1),ue(t,c+10,_-4),c+=14;for(var T=0;T<_;++T)ue(t,c+3*T,A[ia[T]]);c+=3*_;for(var B=[b,S],E=0;E<2;++E)for(var C=B[E],T=0;T<C.length;++T){var O=C[T]&31;ue(t,c,z[O]),c+=A[O],O>15&&(ue(t,c,C[T]>>5&127),c+=C[T]>>12)}}else R=uc,I=Ie,N=cc,$=Ut;for(var T=0;T<o;++T){var U=i[T];if(U>255){var O=U>>18&31;Qe(t,c,R[O+257]),c+=I[O+257],O>7&&(ue(t,c,U>>23&31),c+=qn[O]);var G=U&31;Qe(t,c,N[G]),c+=$[G],G>3&&(Qe(t,c,U>>5&8191),c+=jn[G])}else Qe(t,c,R[U]),c+=I[U]}return Qe(t,c,R[256]),c+I[256]},dc=new Hn([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Rr=new Z(0),mc=function(e,t,n,i,a,r){var s=r.z||e.length,o=new Z(i+s+5*(1+Math.ceil(s/7e3))+a),l=o.subarray(i,o.length-a),u=r.l,c=(r.r||0)&7;if(t){c&&(l[0]=r.r>>3);for(var h=dc[t-1],p=h>>13,d=h&8191,m=(1<<n)-1,f=r.p||new ne(32768),g=r.h||new ne(m+1),v=Math.ceil(n/3),b=2*v,k=function(Yt){return(e[Yt]^e[Yt+1]<<v^e[Yt+2]<<b)&m},x=new Hn(25e3),S=new ne(288),y=new ne(32),w=0,T=0,M=r.i||0,A=0,P=r.w||0,_=0;M+2<s;++M){var L=k(M),F=M&32767,D=g[L];if(f[F]=D,g[L]=F,P<=M){var R=s-M;if((w>7e3||A>24576)&&(R>423||!u)){c=sa(e,l,0,x,S,y,T,A,_,M-_,c),A=w=T=0,_=M;for(var I=0;I<286;++I)S[I]=0;for(var I=0;I<30;++I)y[I]=0}var N=2,$=0,z=d,B=F-D&32767;if(R>2&&L==k(M-B))for(var E=Math.min(p,R)-1,C=Math.min(32767,M),O=Math.min(258,R);B<=C&&--z&&F!=D;){if(e[M+N]==e[M+N-B]){for(var U=0;U<O&&e[M+U]==e[M+U-B];++U);if(U>N){if(N=U,$=B,U>E)break;for(var G=Math.min(B,U-2),q=0,I=0;I<G;++I){var se=M-B+I&32767,Le=f[se],fe=se-Le&32767;fe>q&&(q=fe,D=se)}}}F=D,D=f[F],B+=F-D&32767}if($){x[A++]=268435456|En[N]<<18|aa[$];var Pe=En[N]&31,Qn=aa[$]&31;T+=qn[Pe]+jn[Qn],++S[257+Pe],++y[Qn],P=M+N,++w}else x[A++]=e[M],++S[e[M]]}}for(M=Math.max(M,P);M<s;++M)x[A++]=e[M],++S[e[M]];c=sa(e,l,u,x,S,y,T,A,_,M-_,c),u||(r.r=c&7|l[c/8|0]<<3,c-=7,r.h=g,r.p=f,r.i=M,r.w=P)}else{for(var M=r.w||0;M<s+u;M+=65535){var Vt=M+65535;Vt>=s&&(l[c/8|0]=u,Vt=s),c=Mr(l,c+1,e.subarray(M,Vt))}r.i=s}return Tr(o,0,i+Er(c)+a)},pc=function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var n=t,i=9;--i;)n=(n&1&&-306674912)^n>>>1;e[t]=n}return e}(),fc=function(){var e=-1;return{p:function(t){for(var n=e,i=0;i<t.length;++i)n=pc[n&255^t[i]]^n>>>8;e=n},d:function(){return~e}}},gc=function(e,t,n,i,a){if(!a&&(a={l:1},t.dictionary)){var r=t.dictionary.subarray(-32768),s=new Z(r.length+e.length);s.set(r),s.set(e,r.length),e=s,a.w=r.length}return mc(e,t.level==null?6:t.level,t.mem==null?a.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,i,a)},Cr=function(e,t){var n={};for(var i in e)n[i]=e[i];for(var i in t)n[i]=t[i];return n},V=function(e,t,n){for(;n;++t)e[t]=n,n>>>=8};function vc(e,t){return gc(e,t||{},0,0)}var Ir=function(e,t,n,i){for(var a in e){var r=e[a],s=t+a,o=i;Array.isArray(r)&&(o=Cr(i,r[1]),r=r[0]),ArrayBuffer.isView(r)?n[s]=[r,o]:(n[s+="/"]=[new Z(0),o],Ir(r,s,n,i))}},oa=typeof TextEncoder<"u"&&new TextEncoder,bc=typeof TextDecoder<"u"&&new TextDecoder,kc=0;try{bc.decode(Rr,{stream:!0}),kc=1}catch{}function la(e,t){var n;if(oa)return oa.encode(e);for(var i=e.length,a=new Z(e.length+(e.length>>1)),r=0,s=function(u){a[r++]=u},n=0;n<i;++n){if(r+5>a.length){var o=new Z(r+8+(i-n<<1));o.set(a),a=o}var l=e.charCodeAt(n);l<128||t?s(l):l<2048?(s(192|l>>6),s(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|e.charCodeAt(++n)&1023,s(240|l>>18),s(128|l>>12&63),s(128|l>>6&63),s(128|l&63)):(s(224|l>>12),s(128|l>>6&63),s(128|l&63))}return Tr(a,0,r)}var Rn=function(e){var t=0;if(e)for(var n in e){var i=e[n].length;i>65535&&jt(9),t+=i+4}return t},ua=function(e,t,n,i,a,r,s,o){var l=i.length,u=n.extra,c=o&&o.length,h=Rn(u);V(e,t,s!=null?33639248:67324752),t+=4,s!=null&&(e[t++]=20,e[t++]=n.os),e[t]=20,t+=2,e[t++]=n.flag<<1|(r<0&&8),e[t++]=a&&8,e[t++]=n.compression&255,e[t++]=n.compression>>8;var p=new Date(n.mtime==null?Date.now():n.mtime),d=p.getFullYear()-1980;if((d<0||d>119)&&jt(10),V(e,t,d<<25|p.getMonth()+1<<21|p.getDate()<<16|p.getHours()<<11|p.getMinutes()<<5|p.getSeconds()>>1),t+=4,r!=-1&&(V(e,t,n.crc),V(e,t+4,r<0?-r-2:r),V(e,t+8,n.size)),V(e,t+12,l),V(e,t+14,h),t+=16,s!=null&&(V(e,t,c),V(e,t+6,n.attrs),V(e,t+10,s),t+=14),e.set(i,t),t+=l,h)for(var m in u){var f=u[m],g=f.length;V(e,t,+m),V(e,t+2,g),e.set(f,t+4),t+=4+g}return c&&(e.set(o,t),t+=c),t},yc=function(e,t,n,i,a){V(e,t,101010256),V(e,t+8,n),V(e,t+10,n),V(e,t+12,i),V(e,t+16,a)};function xc(e,t){t||(t={});var n={},i=[];Ir(e,"",n,t);var a=0,r=0;for(var s in n){var o=n[s],l=o[0],u=o[1],c=u.level==0?0:8,h=la(s),p=h.length,d=u.comment,m=d&&la(d),f=m&&m.length,g=Rn(u.extra);p>65535&&jt(11);var v=c?vc(l,u):l,b=v.length,k=fc();k.p(l),i.push(Cr(u,{size:l.length,crc:k.d(),c:v,f:h,m,u:p!=s.length||m&&d.length!=f,o:a,compression:c})),a+=30+p+g+b,r+=76+2*(p+g)+(f||0)+b}for(var x=new Z(r+22),S=a,y=r-a,w=0;w<i.length;++w){var h=i[w];ua(x,h.o,h,h.f,h.u,h.c.length);var T=30+h.f.length+Rn(h.extra);x.set(h.c,h.o+T),ua(x,a,h,h.f,h.u,h.c.length,h.o,h.m),a+=16+T+(h.m?h.m.length:0)}return yc(x,a,i.length,y,S),x}class Vn{chunks=[];writer;reading;done=!1;constructor(){const t=new CompressionStream("deflate");this.writer=t.writable.getWriter();const n=t.readable.getReader();this.reading=(async()=>{for(;;){const{done:i,value:a}=await n.read();if(i)return;this.chunks.push(a)}})()}async write(t){await this.writer.ready,this.writer.write(t)}async finish(){if(this.done)throw new Error("Stream already finished");this.done=!0,await this.writer.close(),await this.reading;const t=wc(this.chunks);return this.chunks=[],t}}function wc(e){let t=0;for(const a of e)t+=a.length;const n=new Uint8Array(t);let i=0;for(const a of e)n.set(a,i),i+=a.length;return n}let hn=null;function Ar(){if(hn)return hn;const e=new TextEncoder,t=v=>Math.round(v*65536)|0,n=(v,b,k)=>{const x=new DataView(new ArrayBuffer(20));return x.setUint32(0,1482250784),x.setInt32(8,t(v)),x.setInt32(12,t(b)),x.setInt32(16,t(k)),new Uint8Array(x.buffer)},i=()=>{const b=new DataView(new ArrayBuffer(2060));b.setUint32(0,1668641398),b.setUint32(8,1024);for(let k=0;k<1024;k++){const x=k/1023,S=x<=.04045?x/12.92:Math.pow((x+.055)/1.055,2.4);b.setUint16(12+k*2,Math.round(S*65535))}return new Uint8Array(b.buffer)},a=v=>{const b=e.encode(v),k=new DataView(new ArrayBuffer(12+b.length+1+4+4+2+1+67));return k.setUint32(0,1684370275),k.setUint32(8,b.length+1),new Uint8Array(k.buffer).set(b,12),new Uint8Array(k.buffer)},r=v=>{const b=e.encode(v),k=new Uint8Array(8+b.length+1);return new DataView(k.buffer).setUint32(0,1952807028),k.set(b,8),k},s=i(),o=[["desc",a("sRGB (Photo Inker)")],["cprt",r("No copyright, use freely")],["wtpt",n(.9642,1,.8249)],["rXYZ",n(.4360747,.2225045,.0139322)],["gXYZ",n(.3850649,.7168786,.0971045)],["bXYZ",n(.1430804,.0606169,.7141733)],["rTRC",s],["gTRC",s],["bTRC",s]],l=v=>v+3&-4;let c=128+(4+o.length*12);const h=[],p=new Map;for(const[v,b]of o){const k=p.get(b);if(k!==void 0){h.push({sig:v,offset:k,size:b.length,data:b});continue}c=l(c),p.set(b,c),h.push({sig:v,offset:c,size:b.length,data:b}),c+=b.length}const d=l(c),m=new Uint8Array(d),f=new DataView(m.buffer),g=(v,b)=>m.set(e.encode(b),v);return f.setUint32(0,d),f.setUint32(8,34603008),g(12,"mntr"),g(16,"RGB "),g(20,"XYZ "),f.setUint16(24,2026),f.setUint16(26,1),f.setUint16(28,1),g(36,"acsp"),f.setInt32(68,t(.9642)),f.setInt32(72,t(1)),f.setInt32(76,t(.8249)),f.setUint32(128,h.length),h.forEach((v,b)=>{g(132+b*12,v.sig),f.setUint32(136+b*12,v.offset),f.setUint32(140+b*12,v.size),m.set(v.data,v.offset)}),hn=m,m}async function Sc(e,t){const n=new Uint8Array(await e.arrayBuffer());if(n[0]!==255||n[1]!==216)return e;const i=new TextEncoder().encode("ICC_PROFILE\0"),a=l=>i.every((u,c)=>n[l+4+c]===u),r=[n.subarray(0,2)];let s=2,o=1;for(;s+4<=n.length&&n[s]===255&&n[s+1]!==218;){const l=n[s+2]<<8|n[s+3],u=n.subarray(s,s+2+l);n[s+1]===226&&a(s)||(r.push(u),n[s+1]===224&&r.length===2&&(o=2)),s+=2+l}if(r.push(n.subarray(s)),t){const l=Ar(),u=2+i.length+2+l.length,c=new Uint8Array(2+u);c.set([255,226,u>>8,u&255]),c.set(i,4),c.set([1,1],4+i.length),c.set(l,6+i.length),r.splice(o,0,c)}return new Blob(r,{type:"image/jpeg"})}const oe=(e,t)=>t/25.4*(e.dpi??300);function Lr(e){const t=e.palette.inkCount;return Array.from({length:t},(n,i)=>`${e.upload.projectName||"Photo Inker"} · layer ${i+1} of ${t} · ${(e.palette.inkColor[i]??"#000000").toUpperCase()}`)}function Yn(e,t,n){const i=t.export;if(e.kind!=="print"||i.pageSize==="image")return[];const a=[],r=e.cut,s=(c,h)=>c>=0&&h>=0&&c<=e.width&&h<=e.height,o=oe(e,lr(i)),l=Math.max(oe(e,1.5),i.placement==="fill"?o+oe(e,1):0),u=oe(e,5);if(i.cropMarks){const c=[[r.x,r.y,-1,-1],[r.x+r.width,r.y,1,-1],[r.x,r.y+r.height,-1,1],[r.x+r.width,r.y+r.height,1,1]];for(const[h,p,d,m]of c){const f=h+d*l,g=h+d*(l+u);s(Math.min(f,g),p)&&s(Math.max(f,g),p)&&a.push({kind:"line",x0:f,y0:p,x1:g,y1:p});const v=p+m*l,b=p+m*(l+u);s(h,Math.min(v,b))&&s(h,Math.max(v,b))&&a.push({kind:"line",x0:h,y0:v,x1:h,y1:b})}}if(i.regMarks&&i.printTarget==="riso"){const c=oe(e,2.5),h=c*1.5,p=r.x+r.width/2,d=r.y+r.height/2,m=l+h;for(const[f,g]of[[p,r.y-m],[p,r.y+r.height+m],[r.x-m,d],[r.x+r.width+m,d]])s(f-h,g-h)&&s(f+h,g+h)&&a.push({kind:"target",cx:f,cy:g,r:c})}if(n&&i.layerLabels&&i.printTarget==="riso"){const c=oe(e,2.5),h=r.y+r.height+l+(i.regMarks?oe(e,2.5)*3+oe(e,1):0)+c,p=r.y-l-(i.regMarks?oe(e,2.5)*3+oe(e,1):0),d=h+c*.3<=e.height?h:p-c>=0?p:null;d!==null&&n.forEach((m,f)=>a.push({kind:"label",x:Math.max(r.x,l),y:d,size:c,text:m,layer:f}))}return a}function Pr(e,t){const n=Math.max(1,Math.round(oe(e,.2))),i=[];for(const a of t){if(a.kind==="line"){const h=Math.round(Math.min(a.x0,a.x1)-(a.x0===a.x1?n/2:0)),p=Math.round(Math.min(a.y0,a.y1)-(a.y0===a.y1?n/2:0)),d=Math.max(n,Math.round(Math.abs(a.x1-a.x0))),m=Math.max(n,Math.round(Math.abs(a.y1-a.y0)));i.push({x:h,y:p,width:d,height:m,alpha:new Uint8Array(d*m).fill(255),layer:null});continue}if(a.kind==="target"){const h=a.r*1.5,p=Math.ceil(h*2)+n*2,m=new OffscreenCanvas(p,p).getContext("2d"),f=p/2;m.strokeStyle="#000",m.lineWidth=n,m.beginPath(),m.arc(f,f,a.r,0,Math.PI*2),m.moveTo(f-h,f),m.lineTo(f+h,f),m.moveTo(f,f-h),m.lineTo(f,f+h),m.stroke(),i.push({x:Math.round(a.cx-f),y:Math.round(a.cy-f),width:p,height:p,alpha:ca(m,p,p),layer:null});continue}const r=`${Math.round(a.size)}px system-ui, sans-serif`,s=new OffscreenCanvas(1,1).getContext("2d");s.font=r;const o=Math.max(1,Math.ceil(s.measureText(a.text).width)+2),l=Math.ceil(a.size*1.4),c=new OffscreenCanvas(o,l).getContext("2d");c.font=r,c.fillStyle="#000",c.textBaseline="alphabetic",c.fillText(a.text,1,Math.round(a.size*1.05)),i.push({x:Math.round(a.x),y:Math.round(a.y-a.size*1.05),width:o,height:l,alpha:ca(c,o,l),layer:a.layer})}return i}function ca(e,t,n){const i=e.getImageData(0,0,t,n).data,a=new Uint8Array(t*n);for(let r=0;r<a.length;r++)a[r]=i[r*4+3];return a}function Bt(e,t,n,i,a,r,s,o=1){for(const l of a){const u=l.x/o,c=l.y/o,h=l.width/o,p=l.height/o,d=Math.max(n,Math.floor(c)),m=Math.min(n+i,Math.ceil(c+p)),f=Math.max(0,Math.floor(u)),g=Math.min(t,Math.ceil(u+h));for(let v=d;v<m;v++){const b=Math.floor((v-c)*o);if(!(b<0||b>=l.height))for(let k=f;k<g;k++){const x=Math.floor((k-u)*o);if(x<0||x>=l.width)continue;const S=l.alpha[b*l.width+x];if(S===0)continue;const y=((v-n)*t+k)*4;if(r==="layers"){if(S<128)continue;if(l.layer===null)for(let w=0;w<s;w++)e[y+w]=0;else e[y+l.layer]=0}else{const w=1-S/255;e[y]=Math.round(e[y]*w),e[y+1]=Math.round(e[y+1]*w),e[y+2]=Math.round(e[y+2]*w),e[y+3]=Math.max(e[y+3],S)}}}}}function Nr(e,t){const n=new TextEncoder,i=[],a=[];let r=0;const s=m=>{const f=typeof m=="string"?n.encode(m):m;i.push(f),r+=f.length},o=(m,f,g)=>{a[m]=r,s(`${m} 0 obj
${f}
`),g&&(s(`stream
`),s(g),s(`
endstream
`)),s(`endobj
`)};s(`%PDF-1.4
%âãÏÓ
`);const l=t?3:0,u=t?4:3,c=e.map((m,f)=>u+f*3);o(1,"<< /Type /Catalog /Pages 2 0 R >>"),o(2,`<< /Type /Pages /Kids [${c.map(m=>`${m} 0 R`).join(" ")}] /Count ${e.length} >>`),t&&o(3,`<< /N 3 /Length ${t.length} >>`,t),e.forEach((m,f)=>{const g=c[f],v=g+1,b=g+2,k=m.width/m.dpi*72,x=m.height/m.dpi*72,S=`${k.toFixed(3)} ${x.toFixed(3)}`;o(g,`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${S}] /Resources << /XObject << /Im0 ${b} 0 R >> >> /Contents ${v} 0 R >>`);const y=n.encode(`q ${k.toFixed(3)} 0 0 ${x.toFixed(3)} 0 0 cm /Im0 Do Q`);o(v,`<< /Length ${y.length} >>`,y);const w=m.color==="gray"?"/DeviceGray":l?`[/ICCBased ${l} 0 R]`:"/DeviceRGB";o(b,`<< /Type /XObject /Subtype /Image /Width ${m.width} /Height ${m.height} /ColorSpace ${w} /BitsPerComponent 8 /Filter /FlateDecode /Length ${m.data.length} >>`,m.data)});const h=u+e.length*3,p=r;let d=`xref
0 ${h}
0000000000 65535 f 
`;for(let m=1;m<h;m++)d+=`${String(a[m]??0).padStart(10,"0")} 00000 n 
`;return s(d),s(`trailer
<< /Size ${h} /Root 1 0 R >>
startxref
${p}
%%EOF
`),new Blob(i,{type:"application/pdf"})}const Ec=(()=>{const e=new Uint32Array(256);for(let t=0;t<256;t++){let n=t;for(let i=0;i<8;i++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n>>>0}return e})();function Tc(e){let t=4294967295;for(const n of e)for(let i=0;i<n.length;i++)t=Ec[(t^n[i])&255]^t>>>8;return(t^4294967295)>>>0}function De(e,t){const n=new Uint8Array(12+t.length),i=new DataView(n.buffer);i.setUint32(0,t.length);const a=new TextEncoder().encode(e);return n.set(a,4),n.set(t,8),i.setUint32(8+t.length,Tc([a,t])),n}const Mc={gray:1,rgb:3,rgba:4},Rc={gray:0,rgb:2,rgba:6};class Ot{constructor(t,n,i,a={}){this.width=t,this.height=n,this.color=i,this.options=a,this.channels=Mc[i]}deflate=new Vn;channels;rowsWritten=0;done=!1;async writeRows(t,n){const i=this.width*this.channels,a=this.channels,r=new Uint8Array(n*(i+1));for(let s=0;s<n;s++){const o=t.subarray(s*i,(s+1)*i),l=s*(i+1);if(this.color==="gray")r[l]=0,r.set(o,l+1);else{r[l]=1;for(let u=0;u<i;u++)r[l+1+u]=o[u]-(u>=a?o[u-a]:0)&255}}this.rowsWritten+=n,await this.deflate.write(r)}async finish(){if(this.done)throw new Error("PNG already finished");if(this.rowsWritten!==this.height)throw new Error(`PNG got ${this.rowsWritten} of ${this.height} rows`);this.done=!0;const t=await this.deflate.finish(),n=new Uint8Array(13),i=new DataView(n.buffer);i.setUint32(0,this.width),i.setUint32(4,this.height),n[8]=8,n[9]=Rc[this.color],n[10]=0,n[11]=0,n[12]=0;const a=[new Uint8Array([137,80,78,71,13,10,26,10]),De("IHDR",n)];if(this.options.srgb&&this.color!=="gray"&&a.push(De("sRGB",new Uint8Array([0]))),this.options.dpi){const r=new Uint8Array(9),s=new DataView(r.buffer),o=Math.round(this.options.dpi/.0254);s.setUint32(0,o),s.setUint32(4,o),r[8]=1,a.push(De("pHYs",r))}for(let r=0;r<t.length;r+=1<<20)a.push(De("IDAT",t.subarray(r,Math.min(t.length,r+(1<<20)))));return t.length===0&&a.push(De("IDAT",t)),a.push(De("IEND",new Uint8Array(0))),new Blob(a,{type:"image/png"})}}const ha=1275,dn=1650;function Cn(e,t,n){const i=a=>{switch(e.kind){case"number":return`${Number(a).toFixed(e.step<1?e.step<.1?2:1:0)}${e.unit?e.unit==="%"||e.unit==="°"?e.unit:` ${e.unit}`:""}`;case"select":{const r=e.options.find(o=>o.value===a);if(!r)return String(a);const s=r.group?/\((\w+)\)/.exec(r.group)?.[1]:void 0;return s?`${s}: ${r.label}`:r.label}case"toggle":return a?"on":"off";case"curve":{const r=a;return r.length===2&&r[0][0]===r[0][1]&&r[1][0]===r[1][1]?"straight":`${r.length}-point curve`}default:return String(a)}};return e.perInk?t.slice(0,n).map(i).join(" / "):i(t)}function da(e,t){const n=e,i=e.palette.inkCount,a=[],r=s=>{for(const o of s.settings)o.hidden||o.kind==="seed"||!hr(o,e,s.id)||a.push(`${o.label}: ${Cn(o,n[s.id][o.key],i)}`)};for(const s of we)(s.id===t||s.parent===t&&s.id!=="layers"&&(!s.visibleWhen||s.visibleWhen(n)))&&r(s);return a}function Cc(e){const t=we.find(r=>r.id==="layers"),n=e.layers,i=e.palette.inkCount,a=[];for(const r of t.settings){if(r.stage==="mix")continue;const s=n[r.key];if(!r.perInk){a.push(`${r.label}: ${Cn(r,s,i)}`);continue}s.slice(0,i).some((l,u)=>JSON.stringify(l)!==JSON.stringify(ot(r,u)))&&a.push(`${r.label}: ${Cn(r,s,i)}`)}return a}async function Ic(e,t,n,i){const a=new OffscreenCanvas(ha,dn),r=a.getContext("2d");r.fillStyle="#fff",r.fillRect(0,0,ha,dn);const s=90;let o=110;const l=(g,v,b="normal",k="#222",x=s)=>{r.font=`${b} ${v}px system-ui, sans-serif`,r.fillStyle=k,r.fillText(g,x,o)};l(e.upload.projectName||"Photo Inker",40,"bold"),o+=38,l(`Riso print sheet · ${new Date().toLocaleDateString()}`,22,"normal","#666"),o+=60;const u=t.dpi??600,c=g=>`${(g/u).toFixed(2)} in (${(g/u*25.4).toFixed(1)} mm)`,h=e.export,d=[`Page: ${Ac("export","pageSize",h.pageSize)}${h.pageSize==="image"?"":`, ${h.orientation}`} · ${t.width} × ${t.height} px at ${u} DPI`,`Artwork: ${c(t.art.width)} × ${c(t.art.height)}, ${(t.art.x/u).toFixed(2)} in from the left, ${(t.art.y/u).toFixed(2)} in from the top`,h.pageSize==="image"?"":`Placement: ${h.placement} · margins ${h.units==="mm"?`${h.margin} mm`:`${h.marginIn} in`} · bleed ${h.units==="mm"?`${h.bleed} mm`:`${h.bleedIn} in`}`,`Marks: ${[h.cropMarks&&"crop",h.regMarks&&"registration",h.layerLabels&&"labels"].filter(Boolean).join(", ")||"none"}`,`Source image: ${i}`].filter(Boolean);for(const g of d)l(g,22),o+=34;o+=30,l("Inks, in print order",28,"bold"),o+=20;const m=e.palette.inkCount;for(let g=0;g<m;g++){o+=56;const v=(e.palette.inkColor[g]??"#000000").toUpperCase();r.fillStyle=v,r.fillRect(s,o-36,64,44),r.strokeStyle="#999",r.strokeRect(s+.5,o-35.5,63,43),l(`${g+1}.  ${v}`,26,"bold","#222",s+90),l(n[g]??"",20,"normal","#555",s+330)}o+=40,l(`Paper: ${e.palette.paper.toUpperCase()}`,22),o+=60;const f=(g,v)=>{l(g,26,"bold"),o+=36;for(const b of v){if(o>dn-60)return;l(b,19,"normal","#333"),o+=28}o+=24};return f("Color splitting",da(e,"split")),f("Halftone",da(e,"halftone")),f("Layers",Cc(e)),a.convertToBlob({type:"image/png"})}function Ac(e,t,n){const a=we.find(r=>r.id===e)?.settings.find(r=>r.key===t);return a?.kind==="select"?a.options.find(r=>r.value===n)?.label??n:n}const Dr=e=>`#version 300 es
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
${ft}
${Ht}
${re}
${Xt}
${Ya}

vec2 regionUv(vec2 outputPx) {
  return clamp((outputPx / uOutScale - uRegion.xy) / uRegion.zw, vec2(0.0), vec2(1.0));
}

float htCoverageRaw(int ink, vec2 p) {
  vec2 uv = regionUv(p);
  return textureLod(uCoverage, uv, 0.0)[ink] * textureLod(uImage, uv, 0.0).a;
}
${zn(e)}
float htCoverage(int ink, vec2 p) { return simTone(ink, htCoverageRaw(ink, p)); }

vec4 layersOf(int mask) {
  vec4 gray = vec4(1.0);
  for (int ink = 0; ink < 4; ink++) if ((mask & (1 << ink)) != 0) gray[ink] = 0.0;
  return gray;
}
`;function Lc(e,t){return`${Dr(t)}
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
`}const Pc=e=>`${Dr(e)}
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
`,_e=2048,Nc=12e7,ma=16384,Dc=150,mn=32768,_c=1e9,pa=200,_r="The graphics card stopped responding and was reset. Reload the page to continue.";class Ae extends Error{constructor(){super("Export cancelled"),this.name="ExportCancelled"}}function Fr(e,t,n){const i=qt(e,t,n),a=e.export,r=e.upload.mode==="print";return{kind:r?a.printTarget==="standard"?"standard":"riso":"digital",layout:i,width:i.width,height:i.height,dpi:i.dpi,format:r?a.fileFormat==="pdf"?"pdf":"png":a.digitalFormat==="jpg"?"jpg":"png",inkCount:e.palette.inkCount}}function $r(e){const{width:t,height:n}=e;if(Math.max(t,n)>mn||t*n>_c){const i=e.dpi?` (about ${(mn/e.dpi).toFixed(0)} in at ${e.dpi} DPI)`:"";return`Too large to export: ${t} × ${n} px. The limit is ${mn} px per side${i} and 1,000 megapixels. Use a smaller size or resolution.`}return e.format==="pdf"&&e.dpi&&Math.max(t,n)/e.dpi>pa?`PDF pages can be at most ${pa} in per side. Use PNG, or a smaller page.`:e.format==="jpg"&&(t*n>Nc||Math.max(t,n)>ma)?`JPG export is limited to ${ma} px per side and 120 megapixels. Use PNG for larger images.`:null}function gt(e){return e.replace(/[\\/:*?"<>|\x00-\x1f]+/g,"-").replace(/\s+/g," ").trim()||"Photo Inker"}function Fc(e,t,n,i="png"){return`${gt(e)}_${String(t).padStart(2,"0")}_${n.replace("#","").toUpperCase()}.${i}`}const In=()=>new Promise(e=>setTimeout(e,0));function ut(e,t=1,n=2){return{width:Math.max(1,Math.ceil(e.width/t)),height:Math.max(1,Math.ceil(e.height/t)),imageX:e.imageX/t,imageY:e.imageY/t,scale:e.scale,pixel:t,samples:n,art:{x:e.art.x/t,y:e.art.y/t,width:e.art.width/t,height:e.art.height/t}}}async function Xe(e,t,n,i,a,r,s,o){const{gpu:l}=t,u=n.pixel/n.scale,c=Math.min(t.sourceScale,1/u),h=t.smoothing*Math.max(t.imageWidth,t.imageHeight)/1e3,p=(t.halftone?t.halftone.reach/n.scale:0)+(t.smoothing>0?h*2.5:0)+t.splitReach+t.simReach+2,d=a.sim.uSimOn===1,m=t.halftone?Lc(t.halftone.method.glsl,d):Pc(d),f=a.outside.map(w=>Math.round(w*255)),g=`export|${t.halftone?.method.id??"smooth"}|${d}|${i}|${n.samples}`;let v=performance.now();const b=Xn();let k=null;const x=Math.ceil(n.width/_e),S=Math.ceil(n.height/_e);let y=0;try{for(let w=0;w<S;w++){const T=w*_e,M=Math.min(_e,n.height-T),A=new Uint8Array(n.width*M*4);for(let P=0;P<x;P++){if(o())throw new Ae;const _=P*_e,L=Math.min(_e,n.width-_);if(y++,_>=n.art.x+n.art.width||_+L<=n.art.x||T>=n.art.y+n.art.height||T+M<=n.art.y){for(let U=0;U<M;U++)for(let G=0;G<L;G++)A.set(f,(U*n.width+_+G)*4);s(y/(x*S));continue}const D=_-n.imageX,R=T-n.imageY,I=Math.min(t.imageWidth-1,Math.max(0,Math.floor(D*u-p))),N=Math.min(t.imageHeight-1,Math.max(0,Math.floor(R*u-p))),$=Math.max(I+1,Math.min(t.imageWidth,Math.ceil((D+L)*u+p))),z=Math.max(N+1,Math.min(t.imageHeight,Math.ceil((R+M)*u+p))),B={x:I,y:N,width:$-I,height:z-N},E=e.renderRegion(B,c,b,{mix:i===0&&!t.halftone});k=l.ensureTarget(k,L,M,"coverage");const C={...t.inkUniforms,...t.halftone?.methodUniforms??{},...Ka(t.border),...a.sim,uCoverage:{texture:E.layered.texture},uImage:{texture:E.source.texture},...E.mixed?{uMixed:{texture:E.mixed.texture}}:{},uTileOrigin:[D,R],uPixel:n.pixel,uSamples:n.samples,uRegion:[B.x,B.y,B.width,B.height],uOutScale:n.scale,uMode:i,uOutside:a.outside,uTransparent:a.transparent?1:0,uSize:[L,M]};for(let U=0;U<M;){if(o())throw new Ae;const G={y:U,height:$n(g,L,M-U)},q=k;Un(l,q.framebuffer,g,L*G.height,()=>l.draw(m,q.framebuffer,L,M,C,G)),U+=G.height,performance.now()-v>100&&(await In(),v=performance.now())}if(l.gl.isContextLost())throw new Error(_r);const O=l.read(k);for(let U=0;U<M;U++)A.set(O.subarray(U*L*4,(U+1)*L*4),(U*n.width+_)*4);s(y/(x*S)),await In()}await r(A,T,M)}}finally{e.releaseTargets(b),k&&l.deleteTarget(k)}}async function $c(e,t,n,i,a){const r=t.halftone;if(!r?.method.fromCoverage)return{state:t,release:()=>{}};const s=t.imageWidth*n.layout.scale,o=r.method.fromCoverage.cell(r.values,r.ctx),l=Math.ceil(s/o),u=Math.ceil(t.imageHeight*n.layout.scale/o);if(Math.max(l,u)>t.gpu.maxTextureSize)throw new Error(`Error diffusion at this size needs a larger dot size (the dot grid would be ${l} × ${u}).`);const c=l/t.imageWidth,h=t.smoothing*Math.max(t.imageWidth,t.imageHeight)/1e3,p=Math.ceil(((t.smoothing>0?h*2.5:0)+t.splitReach+2)*c),d=new Uint8Array(l*u*4),m=Xn(),f=512;try{for(let k=0;k<u;k+=f){if(a())throw new Ae;const x=Math.min(f,u-k),S=Math.min(p,k),y=Math.min(p,u-k-x),w={x:0,y:(k-S)/c,width:t.imageWidth,height:(x+S+y)/c},T=e.renderRegion(w,c,m,{mix:!1}),M=t.gpu.read(T.layered),A=Math.min(l,T.layered.width);for(let P=0;P<x;P++){const _=P+S;if(_>=T.layered.height)break;d.set(M.subarray(_*T.layered.width*4,(_*T.layered.width+A)*4),(k+P)*l*4)}i((k+x)/u/3,"Preparing dithering…"),await In()}}finally{e.releaseTargets(m)}i(.34,"Diffusing…");const g=await r.method.fromCoverage.build(r.values,d,l,u,t.inkCount,"export");if(a())throw new Ae;const v=new Set(Object.values(r.methodUniforms).flatMap(k=>typeof k=="object"&&k&&"texture"in k?[k.texture]:[])),b=r.method.uniforms(r.values,r.ctx,r.prepared,{bits:g,width:l,height:u,cell:s/l});return{state:{...t,halftone:{...r,methodUniforms:b}},release:()=>{for(const k of Object.values(b))typeof k=="object"&&k&&"texture"in k&&!v.has(k.texture)&&t.gpu.gl.deleteTexture(k.texture)}}}async function Uc(e,t,n){for(e.flush();e.busy;){if(n())throw new Ae;t(0,"Waiting for ink matching to finish…"),await new Promise(a=>setTimeout(a,150)),e.flush()}const i=e.exportState();if(!i)throw new Error("Upload an image first.");return i}async function Bc(e,t,n,i,a){const r=await Uc(e,i,a);e.hold(!0);try{const s=t(),o=Fr(s,r.imageWidth,r.imageHeight),l=$r(o);if(l)throw new Error(l);const{state:u,release:c}=await $c(e,r,o,i,a);try{return o.kind==="digital"?await Oc(e,u,o,s,i,a):o.kind==="standard"?await zc(e,u,o,s,i,a):await Wc(e,u,o,s,n,i,a)}finally{c()}}finally{e.hold(!1)}}const zt=(e,t)=>{const n=new Uint8Array(t*3);for(let i=0,a=0;i<t*4;i+=4,a+=3)n[a]=e[i],n[a+1]=e[i+1],n[a+2]=e[i+2];return n};function Ur(e){const t=e.inkUniforms.uPaperSrgb;return[t[0]??1,t[1]??1,t[2]??1,1]}async function Oc(e,t,n,i,a,r){const s=gt(i.upload.projectName),o=i.export,l=ut(n.layout),u=n.format==="png"&&o.transparent,c={sim:t.sim("digital"),outside:u?[0,0,0,0]:Ur(t),transparent:u},h=d=>a(d,"Rendering…");if(n.format==="jpg"){const d=new OffscreenCanvas(n.width,n.height),m=d.getContext("2d");return await Xe(e,t,l,0,c,(g,v,b)=>{m.putImageData(new ImageData(new Uint8ClampedArray(g.buffer,g.byteOffset,g.length),n.width,b),0,v)},h,r),a(1,"Encoding JPG…"),{blob:await Sc(await d.convertToBlob({type:"image/jpeg",quality:o.jpgQuality/100}),o.embedProfile),fileName:`${s}.jpg`}}const p=new Ot(n.width,n.height,u?"rgba":"rgb",{srgb:o.embedProfile});return await Xe(e,t,l,0,c,async(d,m,f)=>{await p.writeRows(u?d:zt(d,n.width*f),f)},h,r),a(1,"Finishing PNG…"),{blob:await p.finish(),fileName:`${s}.png`}}async function zc(e,t,n,i,a,r){const s=gt(i.upload.projectName),o=i.export,l=n.dpi??600,u=Pr(n.layout,Yn(n.layout,i,null)),c={sim:t.sim("standard"),outside:[1,1,1,1],transparent:!1},h=d=>a(d,"Rendering page…");if(n.format==="pdf"){const d=new Vn;await Xe(e,t,ut(n.layout),0,c,async(f,g,v)=>{Bt(f,n.width,g,v,u,"color",n.inkCount),await d.write(zt(f,n.width*v))},h,r),a(1,"Writing PDF…");const m={width:n.width,height:n.height,dpi:l,color:"rgb",data:await d.finish()};return{blob:Nr([m],o.embedProfile?Ar():void 0),fileName:`${s}_print.pdf`}}const p=new Ot(n.width,n.height,"rgb",{dpi:l,srgb:o.embedProfile});return await Xe(e,t,ut(n.layout),0,c,async(d,m,f)=>{Bt(d,n.width,m,f,u,"color",n.inkCount),await p.writeRows(zt(d,n.width*f),f)},h,r),a(1,"Finishing PNG…"),{blob:await p.finish(),fileName:`${s}_print.png`}}async function Wc(e,t,n,i,a,r,s){const o=gt(i.upload.projectName),l=i.export,u=n.dpi??600,c=n.inkCount,h=Array.from({length:c},(y,w)=>(i.palette.inkColor[w]??"#000000").toUpperCase()),p=Pr(n.layout,Yn(n.layout,i,Lr(i))),d=n.format==="pdf",f=1/(1+((l.includeProof?1:0)+(l.includeSheet?.2:0))*.25),g={sim:t.sim("riso"),outside:[1,1,1,1],transparent:!1},v=d?[]:h.map(()=>new Ot(n.width,n.height,"gray",{dpi:u})),b=d?h.map(()=>new Vn):[];await Xe(e,t,ut(n.layout),1,g,async(y,w,T)=>{Bt(y,n.width,w,T,p,"layers",c);const M=n.width*T;await Promise.all(h.map((A,P)=>{const _=new Uint8Array(M);for(let L=0;L<M;L++)_[L]=y[L*4+P];return d?b[P].write(_):v[P].writeRows(_,T)}))},y=>r(y*f,"Rendering layers…"),s);const k={},x=h.map((y,w)=>Fc(i.upload.projectName,w+1,y));if(d){r(f,"Writing PDF…");const y=[];for(const w of b)y.push({width:n.width,height:n.height,dpi:u,color:"gray",data:await w.finish()});k[`${o}_riso_layers.pdf`]=new Uint8Array(await Nr(y).arrayBuffer())}else for(let y=0;y<c;y++)k[x[y]]=new Uint8Array(await(await v[y].finish()).arrayBuffer());if(l.includeProof){const y=Math.max(1,u/Dc),w=ut(n.layout,y,Math.min(8,Math.max(2,Math.ceil(y)+1))),T={sim:t.sim("preview"),outside:Ur(t),transparent:!1},M=p.filter(P=>P.layer===null),A=new Ot(w.width,w.height,"rgb",{dpi:u/y,srgb:l.embedProfile});await Xe(e,t,w,0,T,async(P,_,L)=>{Bt(P,w.width,_,L,M,"color",c,y),await A.writeRows(zt(P,w.width*L),L)},P=>r(f+P*(1-f)*.9,"Rendering proof…"),s),k[`${o}_proof.png`]=new Uint8Array(await(await A.finish()).arrayBuffer())}if(l.includeSheet){r(.97,"Writing print sheet…");const y=await Ic(i,n.layout,d?h.map((w,T)=>`${o}_riso_layers.pdf, page ${T+1} (${w})`):x,a);k[`${o}_print_sheet.png`]=new Uint8Array(await y.arrayBuffer())}r(1,"Zipping…");const S=xc(k,{level:0});return{blob:new Blob([S],{type:"application/zip"}),fileName:`${o}_riso_layers.zip`}}function Br(e,t){const n=URL.createObjectURL(e),i=document.createElement("a");i.href=n,i.download=t,document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(n),6e4)}function Gc(e,t,n){const i=document.createElement("div");i.className="export-block";const a=document.createElement("p");a.className="export-summary";const r=document.createElement("button");r.type="button",r.className="export-button";const s=document.createElement("div");s.className="export-progress",s.hidden=!0;const o=document.createElement("progress");o.max=1,o.value=0;const l=document.createElement("button");l.type="button",l.textContent="Cancel",s.append(o,l);const u=document.createElement("p");u.className="export-warning",u.hidden=!0;const c=document.createElement("p");c.className="control-help export-message",c.setAttribute("aria-live","polite"),i.append(a,u,r,s,c);let h=!1,p=!1;function d(){const f=t.get(),g=e.get(),v=g.export,b=g.upload.mode==="print";if(r.textContent=b?v.printTarget==="standard"?`Export ${v.fileFormat.toUpperCase()} page`:"Export riso layers":`Export ${v.digitalFormat.toUpperCase()}`,r.disabled=h||!f,u.hidden=!0,!f){a.textContent="Upload an image to export.";return}const k=Fr(g,f.width,f.height),x=$r(k);x&&(u.textContent=x,u.hidden=!1,r.disabled=!0);const S=`${k.width} × ${k.height} px`,y=`${(k.width/(k.dpi??600)).toFixed(2)} × ${(k.height/(k.dpi??600)).toFixed(2)} in`;if(k.kind==="riso"){const w=g.halftone.type==="none"?"smooth grayscale (the riso screens it)":"black and white",T=k.format==="pdf"?"one PDF, a page per layer":"PNGs",M=[v.includeProof&&"a color proof",v.includeSheet&&"a print sheet"].filter(Boolean).join(" and ");a.textContent=`${k.inkCount} ${k.inkCount===1?"layer":"layers"}, ${w}, ${y} at ${k.dpi} DPI (${S}), as ${T}${M?` with ${M}`:""}, zipped.`}else k.kind==="standard"?a.textContent=`One color page, ${y} at ${k.dpi} DPI (${S}), as ${k.format.toUpperCase()}. No print simulation.`:a.textContent=`${k.format.toUpperCase()}, ${S}${k.format==="png"&&v.transparent?", transparent background":""}.`}r.addEventListener("click",async()=>{if(h)return;h=!0,p=!1,s.hidden=!1,o.value=0,c.textContent="Starting…",d();const f=performance.now();try{const g=await Bc(n,()=>e.get(),t.get()?.fileName??"",(b,k)=>{o.value=b,c.textContent=k},()=>p);Br(g.blob,g.fileName);const v=g.blob.size/(1024*1024);c.textContent=`Saved ${g.fileName} (${v.toFixed(1)} MB) in ${((performance.now()-f)/1e3).toFixed(1)} s.`}catch(g){c.textContent=g instanceof Ae?"Export cancelled.":`Export failed: ${g instanceof Error?g.message:String(g)}`,g instanceof Ae||console.error(g)}finally{h=!1,s.hidden=!0,d()}}),l.addEventListener("click",()=>{p=!0,c.textContent="Cancelling…"});let m=e.get().export.units;return e.subscribe((f,g)=>{const v=f.export;if(g.section!=="export"||g.key!=="units"||v.units===m)return;m=v.units;const b=v.units==="mm",k=(x,S)=>Number((Math.round((b?x*25.4:x/25.4)/S)*S).toFixed(2));b?(e.set("export","margin",k(v.marginIn,.5)),e.set("export","bleed",k(v.bleedIn,.5))):(e.set("export","marginIn",k(v.margin,.01)),e.set("export","bleedIn",k(v.bleed,.01))),e.set("export","pageWidth",k(v.pageWidth,.01)),e.set("export","pageHeight",k(v.pageHeight,.01)),e.set("export","imageWidth",k(v.imageWidth,.01))}),d(),e.subscribe(d),t.subscribe(d),i}function Xc(e){const t=document.createElement("div");t.className="channel-block";const n=Q(te("splitChannel","advanced"),!1,p=>u(!!p)),i=document.createElement("div");i.className="channel-body",t.append(i,n.element);const a=p=>e.getValue("splitChannel",p),r=(p,d,m=!0)=>e.setValue("splitChannel",p,d,{commit:m});let s="",o=[];function l(p){return`Ink ${p+1} · ${(e.get().palette.inkColor[p]??"").toUpperCase()}`}function u(p){if(p)for(let d=0;d<W;d++){for(let m=0;m<J;m++){const g=String(a(`ch${m}Ink`))===String(d)?Number(a(`ch${m}Intensity`))/100*(Number(a(`ch${m}Opacity`))/100):0;r(`m${d}_${m}`,Math.round(g*100)/100)}r(`m${d}_offset`,0)}r("advanced",p)}function c(){const{splitChannel:p,palette:d}=e.get();i.innerHTML="",o=[];const m=ko(String(p.space),!!p.splitSigned),f=(v,b,k)=>{const x=te("splitChannel",b),S=Q({...x,help:void 0},a(b),(y,w)=>r(b,y,w),k);v.append(S.element),o.push({key:b,control:S})};if(!p.advanced){m.forEach((v,b)=>{const k=document.createElement("div");k.className="channel-card";const x=document.createElement("h4");x.textContent=v,k.append(x);const S=`ch${b}Ink`,y=document.createElement("label");y.className="control",y.innerHTML='<span class="control-label">Goes to</span>';const w=document.createElement("select");w.innerHTML='<option value="none">Dropped</option>'+Array.from({length:d.inkCount},(M,A)=>`<option value="${A}">${l(A)}</option>`).join("");const T=M=>{w.value=String(M),w.value!==String(M)&&(w.value="none")};T(a(S)),w.addEventListener("change",()=>r(S,w.value)),y.append(w),k.append(y),o.push({key:S,control:{element:y,update:T}}),f(k,`ch${b}Intensity`,"Intensity"),f(k,`ch${b}Opacity`,"Opacity"),i.append(k)});return}const g=document.createElement("p");g.className="control-help",g.textContent="Each ink = the sum of every channel times its weight, plus an offset.",i.append(g);for(let v=0;v<d.inkCount;v++){const b=document.createElement("div");b.className="channel-card";const k=document.createElement("h4");k.textContent=l(v),b.append(k),m.forEach((x,S)=>f(b,`m${v}_${S}`,x)),f(b,`m${v}_offset`,"Offset"),i.append(b)}}function h(){const p=e.get();n.update(!!p.splitChannel.advanced);const d=[p.splitChannel.space,p.splitChannel.splitSigned,p.splitChannel.advanced,p.palette.inkCount,p.palette.inkColor.join()].join("|");if(d!==s){s=d,c();return}for(const{key:m,control:f}of o)f.update(a(m))}return h(),e.subscribe((p,d)=>{(d.section==="splitChannel"||d.section==="palette"||d.section==="*")&&h()}),t}const fa='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M20.7 5.6 18.4 3.3a1 1 0 0 0-1.4 0l-3.1 3.1-1.3-1.3-1.4 1.4 1.3 1.3-7.8 7.8-.7 3.5-.9.9 1.4 1.4.9-.9 3.5-.7 7.8-7.8 1.3 1.3 1.4-1.4-1.3-1.3 3.1-3.1a1 1 0 0 0 0-1.4ZM8 18.3l-1.9.4.4-1.9 7.7-7.7 1.5 1.5L8 18.3Z"/></svg>';function Hc(e){const t=ee(e)??{r:0,g:0,b:0},n=t.r/255,i=t.g/255,a=t.b/255,r=Math.max(n,i,a),s=Math.min(n,i,a),o=(r+s)/2,l=r-s,u=l<1e-5?0:l/(1-Math.abs(2*o-1));let c=0;return l>1e-5&&(r===n?c=((i-a)/l+6)%6:r===i?c=(a-n)/l+2:c=(n-i)/l+4),[c*60,Math.min(1,u),o]}function qc(e,t,n){const i=document.createElement("div");i.className="selective-block";const a=document.createElement("div");a.className="selective-cards";const r=document.createElement("div");r.className="button-row";const s=document.createElement("button");s.type="button",s.textContent="+ Add range";const o=document.createElement("button");o.type="button",o.innerHTML=`${fa} Add range from image`,o.className="icon-text-button",r.append(s,o),i.append(a,r);const l=S=>e.getValue("splitSelective",S),u=(S,y,w=!0)=>e.setValue("splitSelective",S,y,{commit:w}),c=()=>Number(l("rangeCount"));function h(S,y){const[w,T,M]=Hc(y);u(`r${S}Hue`,Math.round(w)),u(`r${S}Width`,40),u(`r${S}SatMin`,Math.max(0,Math.round(T*100-35))),u(`r${S}SatMax`,100),u(`r${S}LightMin`,Math.max(0,Math.round(M*100-35))),u(`r${S}LightMax`,Math.min(100,Math.round(M*100+35)))}s.addEventListener("click",()=>{c()<K&&u("rangeCount",c()+1)});const p={kind:"custom",id:"selective-new",onPick:S=>{if(c()>=K)return;const y=c();h(y,S),u("rangeCount",y+1)}};o.addEventListener("click",()=>n.toggle(p));function d(S){const y=c();for(let w=S;w<y-1;w++)for(const T of _i)u(`r${w}${T}`,l(`r${w+1}${T}`));u("rangeCount",y-1),u("maskPreview","none")}let m="",f=[],g=[],v=[],b=[];function k(){const S=e.get().palette;a.innerHTML="",f=[],g=[],v=[],b=[];for(let y=0;y<c();y++){const w=document.createElement("div");w.className="channel-card";const T=document.createElement("div");T.className="tone-curve-head";const M=document.createElement("h4"),A=document.createElement("span");A.className="ink-dot",M.append(A,`Range ${y+1}`),g.push(A);const P=document.createElement("span");P.className="button-row";const _=document.createElement("button");_.type="button",_.className="icon-button eyedropper",_.innerHTML=fa,_.title=`Set range ${y+1} from a color in the image`,_.setAttribute("aria-label",_.title);const L={kind:"custom",id:`selective-${y}`,onPick:R=>h(y,R)};_.addEventListener("click",()=>n.toggle(L)),b.push(_);const F=document.createElement("button");F.type="button",F.className="layer-toggle",F.textContent="Mask",F.title=`Show what range ${y+1} selects (preview only)`,F.addEventListener("click",()=>u("maskPreview",l("maskPreview")===String(y)?"none":String(y))),v.push(F);const D=document.createElement("button");D.type="button",D.className="icon-button remove",D.textContent="×",D.title=`Remove range ${y+1}`,D.setAttribute("aria-label",D.title),D.addEventListener("click",()=>d(y)),P.append(_,F,D),T.append(M,P),w.append(T);for(const R of _i){const I=`r${y}${R}`;if(R==="Ink"){const z=document.createElement("label");z.className="control",z.innerHTML='<span class="control-label">Ink</span>';const B=document.createElement("select");B.innerHTML=Array.from({length:S.inkCount},(E,C)=>`<option value="${C}">Ink ${C+1} · ${(S.inkColor[C]??"").toUpperCase()}</option>`).join(""),B.value=String(l(I)),B.addEventListener("change",()=>u(I,B.value)),z.append(B),w.append(z),f.push({key:I,control:{element:z,update:E=>B.value=String(E)}});continue}const N=te("splitSelective",I),$=Q(N,l(I),(z,B)=>u(I,z,B));R==="Hue"&&$.element.classList.add("hue-control"),w.append($.element),f.push({key:I,control:$})}a.append(w)}s.disabled=c()>=K,o.disabled=c()>=K||!t.get()}function x(){const S=e.get().palette,y=`${c()}|${S.inkCount}|${S.inkColor.join()}`;y!==m&&(m=y,k());for(const{key:w,control:T}of f)T.update(l(w));for(let w=0;w<g.length;w++){g[w].style.setProperty("--swatch",`hsl(${Number(l(`r${w}Hue`))} 80% 50%)`);const T=l("maskPreview")===String(w);v[w].classList.toggle("active",T),v[w].setAttribute("aria-pressed",String(T)),b[w].disabled=!t.get(),b[w].classList.toggle("active",lt(n.active,{kind:"custom",id:`selective-${w}`}))}o.disabled=c()>=K||!t.get(),o.classList.toggle("active",lt(n.active,p))}return x(),e.subscribe((S,y)=>{(y.section==="splitSelective"||y.section==="palette"||y.section==="*")&&x()}),t.subscribe(x),n.subscribe(x),i}const jc=200;class Vc{constructor(t){this.store=t,this.baseline=t.get(),t.subscribe((n,i)=>{if(!(this.restoring||!i.commit)){if(this.quiet>0){this.baseline=t.get();return}this.pending||(this.pending={before:this.baseline,timer:setTimeout(()=>this.close(),0)})}})}undoStack=[];redoStack=[];baseline;pending=null;quiet=0;restoring=!1;listeners=new Set;close(){const t=this.pending;if(!t)return;clearTimeout(t.timer),this.pending=null;const n=this.store.get();this.baseline=n,!Yc(t.before,n)&&(this.undoStack.push(t.before),this.undoStack.length>jc&&this.undoStack.shift(),this.redoStack=[],this.notify())}get canUndo(){return this.undoStack.length>0||this.pending!==null}get canRedo(){return this.redoStack.length>0}undo(){this.close();const t=this.undoStack.pop();t&&(this.redoStack.push(this.store.get()),this.restore(t))}redo(){this.close();const t=this.redoStack.pop();t&&(this.undoStack.push(this.store.get()),this.restore(t))}silently(t){this.quiet++;try{t()}finally{this.quiet--,this.baseline=this.store.get()}}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}restore(t){this.restoring=!0;try{this.store.replace(t)}finally{this.restoring=!1}this.baseline=this.store.get(),this.notify()}notify(){for(const t of this.listeners)t()}}function Yc(e,t){return e===t||JSON.stringify(e)===JSON.stringify(t)}const ga={x:0,y:0,w:1,h:1},An=["turn","straighten","cropX","cropY","cropW","cropH"];function Kn(e){const t=Number(e.turn);return{turn:t===90||t===180||t===270?t:0,straighten:Number(e.straighten)||0,crop:{x:Number(e.cropX)||0,y:Number(e.cropY)||0,w:Number(e.cropW)||1,h:Number(e.cropH)||1}}}const Or=e=>e.turn===0&&Math.abs(e.straighten)<1e-6&&e.crop.x<=1e-6&&e.crop.y<=1e-6&&e.crop.w>=1-1e-6&&e.crop.h>=1-1e-6;function Jn(e,t,n){return n===90||n===270?[t,e]:[e,t]}function Ln(e,t,n,i){const a=i*Math.PI/180,r=Math.cos(a),s=Math.sin(a),o=t/2+.5,l=n/2+.5;for(const[u,c]of[[e.x,e.y],[e.x+e.w,e.y],[e.x,e.y+e.h],[e.x+e.w,e.y+e.h]]){const h=u-t/2,p=c-n/2,d=r*h+s*p,m=-s*h+r*p;if(Math.abs(d)>o||Math.abs(m)>l)return!1}return!0}function zr(e,t,n,i){const a=n*Math.PI/180,r=Math.abs(Math.cos(a)),s=Math.abs(Math.sin(a)),o=i??e/t,l=Math.min(e/2/(o*r+s),t/2/(o*s+r)),u=o*l;return{x:e/2-u,y:t/2-l,w:2*u,h:2*l}}const va=(e,t,n)=>({x:e.x+(t.x-e.x)*n,y:e.y+(t.y-e.y)*n,w:e.w+(t.w-e.w)*n,h:e.h+(t.h-e.h)*n});function Pt(e,t,n,i,a){if(Ln(t,n,i,a))return t;let r=0,s=1;for(let o=0;o<30;o++){const l=(r+s)/2;Ln(va(e,t,l),n,i,a)?r=l:s=l}return va(e,t,r)}function ba(e,t,n,i){if(Ln(e,t,n,i))return e;const a=zr(t,n,i,e.w/e.h);return Pt(a,e,t,n,i)}const Wt=(e,t,n)=>({x:e.x*t,y:e.y*n,w:e.w*t,h:e.h*n}),Kc=(e,t,n)=>({x:e.x/t,y:e.y/n,w:e.w/t,h:e.h/n});function Wr(e,t,n,i,a,r=1){const[s,o]=Jn(n,i,a.turn),l=Wt(a.crop,s,o);e.save(),e.scale(r,r),e.translate(-l.x,-l.y),e.translate(s/2,o/2),e.rotate(a.straighten*Math.PI/180),e.rotate(a.turn*Math.PI/180),e.drawImage(t,-n/2,-i/2,n,i),e.restore()}function Jc(e,t){if(Or(t))return e;const[n,i]=Jn(e.width,e.height,t.turn),a=Wt(t.crop,n,i),r=new OffscreenCanvas(Math.max(1,Math.round(a.w)),Math.max(1,Math.round(a.h))),s=r.getContext("2d");return s.imageSmoothingEnabled=!0,s.imageSmoothingQuality="high",Wr(s,e,e.width,e.height,t),r.transferToImageBitmap()}const Zc=2048,Fe=16,Qc=14,pn=[{value:"free",label:"Free",ratio:null},{value:"original",label:"Original",ratio:null},{value:"page",label:"Page",ratio:null},{value:"1:1",label:"1:1",ratio:1},{value:"4:5",label:"4:5",ratio:4/5},{value:"2:3",label:"2:3",ratio:2/3},{value:"3:4",label:"3:4",ratio:3/4},{value:"16:9",label:"16:9",ratio:16/9}];class eh{constructor(t){this.options=t,this.element=document.createElement("div"),this.element.className="crop-editor",this.element.hidden=!0,this.element.setAttribute("role","dialog"),this.element.setAttribute("aria-label","Crop and rotate"),this.canvas=document.createElement("canvas"),this.canvas.className="crop-canvas",this.ctx=this.canvas.getContext("2d");const n=document.createElement("div");n.className="crop-toolbar";const i=(...o)=>{const l=document.createElement("div");return l.className="crop-group",l.append(...o),l},a=(o,l,u,c="")=>{const h=document.createElement("button");return h.type="button",h.textContent=o,h.title=l,h.setAttribute("aria-label",l),c&&(h.className=c),h.addEventListener("click",u),h},r=o=>{const l=document.createElement("span");return l.className="crop-label",l.textContent=o,l};this.ratioSelect=document.createElement("select"),this.ratioSelect.setAttribute("aria-label","Aspect ratio");for(const o of pn){const l=document.createElement("option");l.value=o.value,l.textContent=o.label,this.ratioSelect.append(l)}this.ratioSelect.addEventListener("change",()=>this.setRatio(this.ratioSelect.value)),this.swapButton=a("⇄","Swap portrait / landscape",()=>{this.swapped=!this.swapped,this.applyRatio()}),this.straightenRange=document.createElement("input"),this.straightenRange.type="range",this.straightenRange.min="-45",this.straightenRange.max="45",this.straightenRange.step="0.1",this.straightenRange.setAttribute("aria-label","Straighten"),this.straightenNumber=document.createElement("input"),this.straightenNumber.type="number",this.straightenNumber.className="control-number",this.straightenNumber.min="-45",this.straightenNumber.max="45",this.straightenNumber.step="0.1",this.straightenNumber.setAttribute("aria-label","Straighten angle"),this.straightenRange.addEventListener("input",()=>this.setStraighten(Number(this.straightenRange.value),!0)),this.straightenRange.addEventListener("change",()=>this.endStraighten()),this.straightenNumber.addEventListener("change",()=>{this.setStraighten(Number(this.straightenNumber.value),!1),this.endStraighten()});const s=o=>{const l=document.createElement("input");return l.type="number",l.className="control-number crop-field",l.min="0",l.step="1",l.setAttribute("aria-label",`Crop ${o}, px`),l.addEventListener("change",()=>this.typed()),l};this.fields={x:s("left"),y:s("top"),w:s("width"),h:s("height")},n.append(i(r("Aspect"),this.ratioSelect,this.swapButton),i(a("⟲","Rotate left 90°",()=>this.turnBy(-90)),a("⟳","Rotate right 90°",()=>this.turnBy(90))),i(r("Straighten"),this.straightenRange,this.straightenNumber,r("°")),i(r("X"),this.fields.x,r("Y"),this.fields.y,r("W"),this.fields.w,r("H"),this.fields.h,r("px")),i(a("Reset","Undo every crop and rotation",()=>this.reset()),a("Cancel","Close without changes (Esc)",()=>this.close()),a("Done","Apply the crop (Enter)",()=>this.done(),"crop-done"))),this.element.append(this.canvas,n),this.canvas.addEventListener("pointerdown",o=>this.pointerDown(o)),this.canvas.addEventListener("pointermove",o=>this.pointerMove(o)),this.canvas.addEventListener("pointerup",o=>this.pointerUp(o)),this.canvas.addEventListener("pointercancel",o=>this.pointerUp(o)),this.element.addEventListener("keydown",o=>{o.key==="Escape"?(o.preventDefault(),this.close()):o.key==="Enter"&&!(o.target instanceof HTMLInputElement||o.target instanceof HTMLSelectElement)&&(o.preventDefault(),this.done())}),new ResizeObserver(()=>this.isOpen&&this.draw()).observe(this.element)}element;canvas;ctx;display=null;isOpen=!1;turn=0;straighten=0;crop={x:0,y:0,w:1,h:1};intended={x:0,y:0,w:1,h:1};ratio="free";swapped=!1;width=1;height=1;scale=1;ox=0;oy=0;drag=null;straightening=!1;ratioSelect;swapButton;straightenRange;straightenNumber;fields;get open(){return this.isOpen}async show(){const t=this.options.original();if(!t)return;if(this.display?.source!==t){this.display?.display.close();const r=Math.min(1,Zc/Math.max(t.width,t.height)),s=await createImageBitmap(t,{resizeWidth:Math.max(1,Math.round(t.width*r)),resizeHeight:Math.max(1,Math.round(t.height*r)),resizeQuality:"high"});this.display={source:t,display:s}}this.width=t.width,this.height=t.height;const n=Kn(this.options.store.get().adjust);this.turn=n.turn,this.straighten=n.straighten;const[i,a]=this.frame();this.crop=Wt(n.crop,i,a),this.intended=this.crop,this.ratio="free",this.swapped=!1,this.ratioSelect.value="free",this.isOpen=!0,this.element.hidden=!1,this.syncControls(),this.draw(),this.element.querySelector(".crop-done")?.focus()}close(){this.isOpen=!1,this.element.hidden=!0}frame(){return Jn(this.width,this.height,this.turn)}done(){const[t,n]=this.frame(),i=Kc(this.crop,t,n),a=s=>Math.min(1,Math.max(0,s)),r=this.options.store.get();this.options.store.replace({...r,adjust:{...r.adjust,turn:this.turn,straighten:Math.round(this.straighten*10)/10,cropX:a(i.x),cropY:a(i.y),cropW:a(i.w),cropH:a(i.h)}}),this.close()}reset(){this.turn=0,this.straighten=0;const[t,n]=this.frame();this.crop=Wt(ga,t,n),this.intended=this.crop,this.ratio="free",this.ratioSelect.value="free",this.syncControls(),this.draw()}turnBy(t){const[n,i]=this.frame(),a=this.crop;this.crop=t>0?{x:i-(a.y+a.h),y:a.x,w:a.h,h:a.w}:{x:a.y,y:n-(a.x+a.w),w:a.h,h:a.w},this.intended=this.crop,this.turn=((this.turn+t)%360+360)%360,this.ratio!=="free"&&this.ratio!=="original"&&this.ratio!=="page"&&(this.swapped=!this.swapped);const[r,s]=this.frame();this.crop=ba(this.crop,r,s,this.straighten),this.syncControls(),this.draw()}setStraighten(t,n){if(!Number.isFinite(t))return;this.straightening||(this.straightening=!0,this.intended=this.crop),this.straighten=Math.max(-45,Math.min(45,t));const[i,a]=this.frame();this.crop=ba(this.intended,i,a,this.straighten),this.syncControls(n?"range":void 0),this.draw()}endStraighten(){this.straightening=!1,this.draw()}ratioValue(){const[t,n]=this.frame();let i;if(this.ratio==="original")i=t/n;else if(this.ratio==="page"){const a=qt(this.options.store.get(),1e3,1e3).printable;i=a?a.width/a.height:null}else i=pn.find(a=>a.value===this.ratio)?.ratio??null;return i&&this.swapped&&(i=1/i),i}setRatio(t){this.ratio=t;const n=pn.find(i=>i.value===t)?.ratio;this.swapped=n!=null&&n!==1&&this.crop.w>=this.crop.h!=n>=1,this.applyRatio()}applyRatio(){const t=this.ratioValue();if(!t)return this.draw();const[n,i]=this.frame(),a=zr(n,i,this.straighten,t),r=this.crop.x+this.crop.w/2,s=this.crop.y+this.crop.h/2,o={...a,x:r-a.w/2,y:s-a.h/2};this.crop=Pt(a,o,n,i,this.straighten),this.intended=this.crop,this.syncControls(),this.draw()}typed(){const t=s=>Number(this.fields[s].value),n=this.ratioValue();let i=Math.max(Fe,t("w")),a=Math.max(Fe,t("h"));n&&(document.activeElement===this.fields.h?i=a*n:a=i/n);const r={x:t("x"),y:t("y"),w:i,h:a};if([r.x,r.y,r.w,r.h].every(Number.isFinite)){const[s,o]=this.frame();this.crop=Pt(this.crop,r,s,o,this.straighten),this.intended=this.crop}this.syncControls(),this.draw()}toFrame(t){const n=this.canvas.getBoundingClientRect(),i=this.canvas.width/Math.max(1,n.width);return[((t.clientX-n.left)*i-this.ox)/this.scale,((t.clientY-n.top)*i-this.oy)/this.scale]}handleAt(t,n){const i=this.canvas.getBoundingClientRect(),a=Qc*(this.canvas.width/Math.max(1,i.width))/this.scale,r=this.crop,s=Math.abs(t-r.x)<a,o=Math.abs(t-(r.x+r.w))<a,l=Math.abs(n-r.y)<a,u=Math.abs(n-(r.y+r.h))<a,c=t>r.x-a&&t<r.x+r.w+a,h=n>r.y-a&&n<r.y+r.h+a;return l&&s?"nw":l&&o?"ne":u&&s?"sw":u&&o?"se":l&&c?"n":u&&c?"s":s&&h?"w":o&&h?"e":t>r.x&&t<r.x+r.w&&n>r.y&&n<r.y+r.h?"move":null}pointerDown(t){const[n,i]=this.toFrame(t),a=this.handleAt(n,i);a&&(this.canvas.setPointerCapture(t.pointerId),this.drag={handle:a,start:this.crop,fx:n,fy:i})}pointerMove(t){const[n,i]=this.toFrame(t);if(!this.drag){const h=this.handleAt(n,i),p={move:"move",n:"ns-resize",s:"ns-resize",e:"ew-resize",w:"ew-resize",ne:"nesw-resize",sw:"nesw-resize",nw:"nwse-resize",se:"nwse-resize"};this.canvas.style.cursor=h?p[h]:"default";return}const{handle:a,start:r}=this.drag,s=n-this.drag.fx,o=i-this.drag.fy,[l,u]=this.frame();let c;a==="move"?c={...r,x:r.x+s,y:r.y+o}:c=this.resized(r,a,s,o),this.crop=Pt(this.crop,c,l,u,this.straighten),this.intended=this.crop,this.syncControls(),this.draw()}pointerUp(t){this.drag&&(this.drag=null,this.canvas.hasPointerCapture(t.pointerId)&&this.canvas.releasePointerCapture(t.pointerId),this.draw())}resized(t,n,i,a){let r=t.x,s=t.y,o=t.x+t.w,l=t.y+t.h;n.includes("w")&&(r=Math.min(o-Fe,r+i)),n.includes("e")&&(o=Math.max(r+Fe,o+i)),n.includes("n")&&(s=Math.min(l-Fe,s+a)),n.includes("s")&&(l=Math.max(s+Fe,l+a));const u=this.ratioValue();if(!u)return{x:r,y:s,w:o-r,h:l-s};let c=o-r,h=l-s;n==="n"||n==="s"?c=h*u:n==="e"||n==="w"||c/h>u?h=c/u:c=h*u;const p=t.x+t.w/2,d=t.y+t.h/2,m=n.includes("w")?o-c:n.includes("e")?r:p-c/2,f=n.includes("n")?l-h:n.includes("s")?s:d-h/2;return{x:m,y:f,w:c,h}}syncControls(t){t!=="range"&&(this.straightenRange.value=String(this.straighten)),this.straightenNumber.value=this.straighten.toFixed(1);const n=this.crop;for(const[s,o]of[["x",n.x],["y",n.y],["w",n.w],["h",n.h]])document.activeElement!==this.fields[s]&&(this.fields[s].value=String(Math.round(o)));const i=this.ratio!=="free";this.swapButton.disabled=!i||this.ratio==="original"||this.ratio==="page";const a=this.ratioSelect.querySelector('option[value="page"]'),r=this.options.store.get();a.hidden=r.upload.mode!=="print"||r.export.pageSize==="image"}draw(){if(!this.isOpen||!this.display)return;const t=this.canvas.getBoundingClientRect(),n=window.devicePixelRatio||1,i=Math.max(1,Math.round(t.width*n)),a=Math.max(1,Math.round(t.height*n));(this.canvas.width!==i||this.canvas.height!==a)&&(this.canvas.width=i,this.canvas.height=a);const r=this.ctx,[s,o]=this.frame(),l=28*n;this.scale=Math.min((i-l*2)/s,(a-l*2)/o),this.ox=(i-s*this.scale)/2,this.oy=(a-o*this.scale)/2,r.setTransform(1,0,0,1,0,0),r.fillStyle="#2f2f2a",r.fillRect(0,0,i,a),r.setTransform(this.scale,0,0,this.scale,this.ox,this.oy),r.imageSmoothingQuality="high",Wr(r,this.display.display,this.width,this.height,{turn:this.turn,straighten:this.straighten,crop:ga});const u=this.crop;r.setTransform(1,0,0,1,0,0);const c=k=>this.ox+k*this.scale,h=k=>this.oy+k*this.scale;r.beginPath(),r.rect(0,0,i,a),r.rect(c(u.x),h(u.y),u.w*this.scale,u.h*this.scale),r.fillStyle="rgba(20, 20, 18, 0.62)",r.fill("evenodd");const p=this.straightening?8:3;r.strokeStyle="rgba(255, 255, 255, 0.45)",r.lineWidth=Math.max(1,n*.75),r.beginPath();for(let k=1;k<p;k++){const x=c(u.x+u.w*k/p),S=h(u.y+u.h*k/p);r.moveTo(x,h(u.y)),r.lineTo(x,h(u.y+u.h)),r.moveTo(c(u.x),S),r.lineTo(c(u.x+u.w),S)}r.stroke(),r.strokeStyle="#ffffff",r.lineWidth=1.5*n,r.strokeRect(c(u.x),h(u.y),u.w*this.scale,u.h*this.scale);const d=18*n,m=4*n;r.fillStyle="#ffffff";const f=c(u.x),g=h(u.y),v=c(u.x+u.w),b=h(u.y+u.h);for(const[k,x,S,y]of[[f,g,1,1],[v,g,-1,1],[f,b,1,-1],[v,b,-1,-1]])r.fillRect(S>0?k-m/2:k-d+m/2,x-m/2,d,m),r.fillRect(k-m/2,y>0?x-m/2:x-d+m/2,m,d);for(const[k,x,S]of[[(f+v)/2,g,!0],[(f+v)/2,b,!0],[f,(g+b)/2,!1],[v,(g+b)/2,!1]])S?r.fillRect(k-d/2,x-m/2,d,m):r.fillRect(k-m/2,x-d/2,m,d)}}function th(e,t,n){const i=Kn(e);if(Or(i))return null;const a=[];(!(i.crop.x<=1e-6&&i.crop.y<=1e-6&&i.crop.w>=1-1e-6&&i.crop.h>=1-1e-6)||Math.abs(i.straighten)>1e-6)&&a.push(`cropped to ${t} × ${n} px`),i.turn&&a.push(`turned ${i.turn}°`),Math.abs(i.straighten)>1e-6&&a.push(`straightened ${i.straighten>0?"+":""}${i.straighten.toFixed(1)}°`);const s=a.join(", ");return s.charAt(0).toUpperCase()+s.slice(1)+"."}function nh(e,t,n){const i=document.createElement("div");i.className="control crop-block";const a=document.createElement("span");a.className="control-label",a.textContent="Crop & rotate";const r=document.createElement("div");r.className="button-row";const s=document.createElement("button");s.type="button",s.textContent="Crop & rotate…",s.addEventListener("click",()=>void n.show());const o=document.createElement("button");o.type="button",o.textContent="Reset",o.title="Back to the photo as uploaded",o.addEventListener("click",()=>{const c=e.get(),h={...c.adjust};for(const p of An)h[p]=p==="cropW"||p==="cropH"?1:0;e.replace({...c,adjust:h})}),r.append(s,o);const l=document.createElement("p");l.className="control-help",i.append(a,r,l);const u=()=>{const c=t.get(),h=c?th(e.get().adjust,c.width,c.height):null;s.disabled=!c,o.disabled=!h,l.textContent=c?h??"The photo as uploaded.":"Upload an image to crop or rotate it."};return u(),e.subscribe(u),t.subscribe(u),i}const ih=1,Pn="photo-inker",Gr="photo-inker.presets.v1",ah=new Set(["upload","presets","export"]),Xr=new Set(["adjust.turn","adjust.straighten","adjust.cropX","adjust.cropY","adjust.cropW","adjust.cropH","layers.solo","layers.mute"]);class rt extends Error{}const Hr=()=>we.filter(e=>!ah.has(e.id));function ka(e,t){const n=t,i={};for(const a of Hr()){const r={};for(const s of a.settings)Xr.has(`${a.id}.${s.key}`)||(r[s.key]=n[a.id]?.[s.key]);i[a.id]=r}return{app:Pn,kind:"preset",version:ih,name:e.trim()||"Preset",savedAt:new Date().toISOString(),settings:JSON.parse(JSON.stringify(i))}}function qr(e){let t;try{t=JSON.parse(e)}catch{throw new rt("That file isn't a Photo Inker preset (it isn't valid JSON).")}const n=t;if(!n||typeof n!="object"||n.app!==Pn||n.kind!=="preset"||typeof n.settings!="object"||!n.settings)throw new rt("That file isn't a Photo Inker preset.");return{app:Pn,kind:"preset",version:typeof n.version=="number"?n.version:1,name:typeof n.name=="string"&&n.name.trim()?n.name.trim().slice(0,60):"Preset",savedAt:typeof n.savedAt=="string"?n.savedAt:"",settings:n.settings}}function ya(e){return Array.isArray(e)&&e.length>=2&&e.every(t=>Array.isArray(t)&&t.length===2&&t.every(n=>typeof n=="number"&&Number.isFinite(n)&&n>=0&&n<=1))}function rh(e,t,n){if(e.kind==="curve"){if(e.perInk){const i=Array.isArray(t)?t:[];return n.map((r,s)=>ya(i[s])?i[s]:r)}return ya(t)?t:n}return bn(e,t)}function sh(e,t){const n={...e};for(const i of Hr()){const a=cr(i),r=t.settings[i.id]??{},s={...n[i.id]};for(const o of i.settings)Xr.has(`${i.id}.${o.key}`)||(s[o.key]=o.key in r?rh(o,JSON.parse(JSON.stringify(r[o.key])),a[o.key]):a[o.key]);n[i.id]=s}return n}function oh(e){return new Blob([JSON.stringify(e,null,2)],{type:"application/json"})}function Zn(){try{const e=localStorage.getItem(Gr);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t.flatMap(n=>{try{return[qr(JSON.stringify(n))]}catch{return[]}}):[]}catch{return null}}function jr(e){try{return localStorage.setItem(Gr,JSON.stringify(e)),!0}catch{return!1}}function xa(e){const t=Zn();if(!t)return!1;const n=t.findIndex(i=>i.name.toLowerCase()===e.name.toLowerCase());return n>=0?t[n]=e:t.push(e),t.sort((i,a)=>i.name.localeCompare(a.name)),jr(t)}function lh(e){const t=Zn();return t?jr(t.filter(n=>n.name!==e)):!1}function tt(e,t){const n=document.createElement("button");return n.type="button",n.textContent=e,t&&(n.title=t),n}function wa(e,...t){const n=document.createElement("div");n.className="control";const i=document.createElement("span");i.className="control-label",i.textContent=e;const a=document.createElement("div");return a.className="control-body",a.append(...t),n.append(i,a),n}function uh(e){const t=document.createElement("div");t.className="presets-block";const n=document.createElement("p");n.className="control-help",n.textContent="A preset keeps the look: palette, adjustments, color splitting, halftone, border and print simulation. Mode, export and page settings stay as they are.";const i=document.createElement("input");i.type="text",i.maxLength=60,i.placeholder="Preset name",i.setAttribute("aria-label","Preset name");const a=tt("Save","Save the current look in this browser"),r=tt("Download","Download the current look as a .json file"),s=wa("Save the current look",i),o=document.createElement("div");o.className="button-row",o.append(a,r);const l=document.createElement("select");l.setAttribute("aria-label","Saved presets");const u=tt("Apply"),c=tt("Delete"),h=wa("Saved in this browser",l),p=document.createElement("div");p.className="button-row",p.append(u,c);const d=document.createElement("p");d.className="control-help";const m=document.createElement("input");m.type="file",m.accept=".json,application/json",m.hidden=!0;const f=tt("Upload preset file…","Apply a preset .json file (it is also saved in this browser)");f.className="presets-upload";const g=document.createElement("p");g.className="control-help presets-message",g.setAttribute("aria-live","polite"),t.append(n,s,o,h,p,d,f,m,g);let v=[];const b=(y,w=!1)=>{g.textContent=y,g.classList.toggle("presets-error",w)};function k(y){v=Zn();const w=y??l.value;l.replaceChildren(...(v??[]).map(M=>{const A=document.createElement("option");return A.value=M.name,A.textContent=M.name,A})),v?.some(M=>M.name===w)&&(l.value=w);const T=!v||v.length===0;h.hidden=T,p.hidden=T,a.hidden=v===null,d.hidden=!T,d.textContent=v===null?"This browser isn't letting the app save presets (private window or blocked site data). Use Download and Upload instead.":"No presets saved yet."}const x=y=>{e.replace(sh(e.get(),y)),b(`Applied “${y.name}”. Undo goes back to how it was.`)},S=()=>i.value.trim()||e.get().upload.projectName||"Preset";return a.addEventListener("click",()=>{const y=ka(S(),e.get()),w=v?.some(T=>T.name.toLowerCase()===y.name.toLowerCase());if(!xa(y))return b("Couldn't save in this browser. Use Download instead.",!0);k(y.name),b(w?`Updated “${y.name}”.`:`Saved “${y.name}”.`)}),r.addEventListener("click",()=>{const y=ka(S(),e.get());Br(oh(y),`${gt(y.name)}.photo-inker.json`),b(`Downloaded “${y.name}”.`)}),u.addEventListener("click",()=>{const y=v?.find(w=>w.name===l.value);y&&x(y)}),c.addEventListener("click",()=>{const y=l.value;!y||!confirm(`Delete the preset “${y}” from this browser?`)||(lh(y),k(),b(`Deleted “${y}”.`))}),f.addEventListener("click",()=>m.click()),m.addEventListener("change",async()=>{const y=m.files?.[0];if(m.value="",!!y)try{if(y.size>1e6)throw new rt("That file is too big to be a Photo Inker preset.");const w=qr(await y.text());x(w),xa(w)&&k(w.name)}catch(w){b(w instanceof rt?w.message:"Couldn't read that file.",!0),w instanceof rt||console.error(w)}}),k(),t}const Tt=new URLSearchParams(location.search).has("debug"),Sa=[237,242,233].map(e=>ae(e/255));function ch(e){const t=new Al,n=new ts,i=new Vc(t),a=/Mac|iPhone|iPad/.test(navigator.platform),r=(E,C=!1)=>`${a?"⌘":"Ctrl+"}${C?a?"⇧":"Shift+":""}${E}`,s=document.createElement("header");s.className="app-header",s.innerHTML='<h1 class="app-title">Photo Inker</h1><span class="mode-badge"></span>';const o=s.querySelector(".mode-badge"),l=document.createElement("div");l.className="history-buttons";const u=(E,C,O,U)=>{const G=document.createElement("button");return G.type="button",G.className="history-button",G.innerHTML=`<span aria-hidden="true">${C}</span> ${E}`,G.title=O,G.addEventListener("click",U),l.append(G),G},c=u("Undo","↶",`Undo (${r("Z")})`,()=>i.undo()),h=u("Redo","↷",`Redo (${r("Z",!0)})`,()=>i.redo()),p=()=>{c.disabled=!i.canUndo,h.disabled=!i.canRedo};i.subscribe(p),p(),s.append(l);const d=document.createElement("div");d.className="notice",d.setAttribute("role","alert"),d.hidden=!0;const m=(E,C="error",O)=>{d.innerHTML="",d.className=`notice notice-${C}`;const U=document.createElement("span");if(U.textContent=E,d.append(U),O){const q=document.createElement("button");q.type="button",q.className="notice-action",q.textContent=O.label,q.addEventListener("click",O.onClick),d.append(q)}const G=document.createElement("button");G.type="button",G.textContent="×",G.setAttribute("aria-label","Dismiss"),G.addEventListener("click",()=>d.hidden=!0),d.append(G),d.hidden=!1};let f=null,g="",v=!1;const b=()=>{if(!f||v)return;const E=Kn(t.get().adjust),C=JSON.stringify(E);if(C===g)return;g=C;const O=Jc(f.bitmap,E);n.set(f.fileName,O,O!==f.bitmap)};t.subscribe((E,C)=>{(C.section==="*"||C.section==="adjust"&&An.includes(C.key))&&b()});let k=!0;const x=Ll(E=>void S(E));async function S(E){const C=E[0];if(C){E.length>1?m("Only one image can be used at a time. Using the first one.","info"):d.hidden=!0,x.setBusy(!0);try{const O=await Qr(C);i.silently(()=>{const U=f;f={fileName:C.name,bitmap:O},v=!0;for(const G of An)t.setValue("adjust",G,G==="cropW"||G==="cropH"?1:0);v=!1,g="",b(),U&&U.bitmap!==O&&U.bitmap.close(),k&&(t.set("upload","projectName",es(C.name).slice(0,60)),k=!0)})}catch(O){m(O instanceof Te?O.message:"Something went wrong opening that image."),O instanceof Te||console.error(O)}finally{x.setBusy(!1)}}}const y=document.createElement("footer");y.className="status";let w=100,T=null;function M(){const E=n.get(),C=E?[`${E.width} × ${E.height} px`,`${w}%`]:["No image loaded"];T&&C.push(T),y.textContent=C.join(" · ")}let A=null,P;try{P=new Ql({background:Sa,onFilesDropped:E=>void S(E),onViewSettled:()=>A?.renderDetail(),onViewChange:E=>{w=Math.round(E*100),M()}})}catch(E){e.innerHTML="";const C=document.createElement("p");C.className="fatal",C.textContent=E instanceof Error?E.message:"Photo Inker couldn't start in this browser.",e.append(C);return}P.element.append(d);const _=new eh({store:t,original:()=>f?.bitmap??null});P.element.append(_.element),P.onContextLost(()=>m(_r,"error",{label:"Reload",onClick:()=>location.reload()}));const L=new gu(t,n),F=new vu(P,()=>n.get()?.bitmap??null,(E,C)=>{E.kind==="ink"?L.setInkColor(E.slot,C):E.kind==="paper"?L.setPaper(C):E.onPick(C)}),D=xu(t,n,L,F);if(Tt){const E=new _u(t,Tt);P.element.append(E.element);const C=document.createElement("button");C.type="button",C.className="ink-test-open",C.textContent="Show ink mixing test",C.addEventListener("click",()=>{E.toggle(),C.textContent=E.open?"Hide ink mixing test":"Show ink mixing test"}),new MutationObserver(()=>{C.textContent=E.open?"Hide ink mixing test":"Show ink mixing test"}).observe(E.element,{attributes:!0,attributeFilter:["hidden"]}),D.append(C)}const R=()=>{const E=ee(t.get().palette.paper)??{r:255,g:255,b:255};P.setPaper([E.r,E.g,E.b].map(C=>ae(C/255)))};R();const I=new Hu({settings:t,source:n,preview:P,background:Sa,debug:Tt});A=I,I.onBusy(E=>{T=E,M()}),I.onError(E=>m(E));const N=new Gl(t,{upload:x.element,presets:uh(t),palette:D,splitToneMap:nc(t,I),layers:Vu(t),halftoneAm:rc(t),halftoneHex:sc(t),splitChannel:Xc(t),splitSelective:qc(t,n,F),adjust:nh(t,n,_)},{export:Gc(t,n,I)}),$=document.createElement("main");$.className="app-main",$.append(N.element,P.element),e.append(s,$,y);const z=()=>{const E=n.get(),C=t.get();if(!E||C.upload.mode!=="print"||C.export.pageSize==="image"){P.setPage(null);return}const O=qt(C,E.width,E.height),U=C.export.printTarget==="standard"?"#ffffff":C.palette.paper;P.setPage({layout:O,marks:Yn(O,C,Lr(C)),paper:U})};n.subscribe(E=>{E&&(F.stop(),P.setImageSize(E.width,E.height),z(),x.showImage(E),M())});const B=()=>{const E=t.get().upload.mode;o.textContent=E==="digital"?"Digital mode":"Print mode",document.body.dataset.mode=E};B(),t.subscribe((E,C)=>{if(z(),(C.section==="*"||C.section==="upload"&&C.key==="mode")&&B(),(C.section==="*"||C.section==="palette"&&C.key==="paper")&&R(),C.section==="upload"&&C.key==="projectName"&&(k=!1),Tt&&C.commit){const O=te(C.section,C.key);console.debug(`[settings] ${C.section}.${C.key} → stage: ${C.stage??"none"}`,O?.kind)}}),window.addEventListener("keydown",E=>{const C=E.target;if(_.open)return;const O=C instanceof HTMLInputElement?["text","number","search"].includes(C.type):C?.tagName==="TEXTAREA";if((E.ctrlKey||E.metaKey)&&!E.altKey&&!O){const U=E.key.toLowerCase();if(U==="z"||U==="y"){E.preventDefault(),U==="y"||E.shiftKey?i.redo():i.undo();return}}if(!(C&&(C.tagName==="INPUT"||C.tagName==="SELECT"||C.tagName==="TEXTAREA"))&&!(E.ctrlKey||E.metaKey||E.altKey)){if(E.key==="0")P.fit();else if(E.key==="1")P.zoomTo(1);else if(E.key==="+"||E.key==="=")P.zoomBy(Math.SQRT2);else if(E.key==="-"||E.key==="_")P.zoomBy(1/Math.SQRT2);else if(E.key==="i"||E.key==="I")P.setDisplayMode("inks");else if(E.key==="o"||E.key==="O")P.setDisplayMode("original");else return;E.preventDefault()}}),window.addEventListener("dragover",E=>E.preventDefault()),window.addEventListener("drop",E=>E.preventDefault()),M()}const Ea=document.querySelector("#app");Ea&&ch(Ea);
