(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e,t,n,r,i,a,o,s,c,l,u,d={},f=[],p=/^m(i|n|o|s|text|space)$/,m=Array.isArray,h=f.slice,g=Object.assign;function _(e){e&&e.parentNode&&e.remove()}function v(n,r,i,a,o){var s={type:n,props:r,key:i,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:o||++t,__i:-1,__u:0};return!o&&e.vnode&&e.vnode(s),s}function y(e){return e.children}function b(e,t){this.props=e,this.context=t,this.__g=0}function x(e,t){if(t==null)return e.__?x(e.__,e.__i+1):null;for(var n;t<e.__k.length;t++)if((n=e.__k[t])&&n.__e)return n.__e;return typeof e.type!=`function`||e.props.__P?null:x(e)}function S(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(t){return t&&(e.__e=t.__e)}),S(e)}function C(t){(8&t.__g||!(t.__g|=8)||!r.push(t)||a++)&&i==e.debounceRendering||((i=e.debounceRendering)||queueMicrotask)(w)}function w(){var t,n,i,s,c,l,u,d,f;try{for(n=1;r.length;)r.length>n&&r.sort(o),t=r.shift(),n=r.length,8&t.__g&&(s=void 0,c=void 0,l=(c=(i=t).__v).__e,u=[],d=[],(f=i.__P)&&((s=g({constructor:void 0},c)).__v=c.__v+1,e.vnode&&e.vnode(s),ie(f,s,c,i.__n,f.namespaceURI,32&c.__u?[l]:null,u,l||x(c),32&c.__u,d),s.__v=c.__v,s.__.__k[s.__i]=s,oe(u,s,d),c.__=c.__e=null,s.__e!=l&&S(s)))}finally{r.length=a=0}}function ee(e,t,n,r,i,a,o,s,c,l,u){var p,m,h,g,_,v,y=r.__k||f,b=t.length;for(c=te(n,t,y,c,b),p=0;p<b;p++)(h=n.__k[p])!=null&&(m=~h.__i&&y[h.__i]||d,h.__i=p,v=ie(e,h,m,i,a,o,s,c,l,u),g=h.__e,(m.ref!=h.ref||8&m.__u)&&(m.ref&&ce(m.ref,null,h,m),h.ref&&u.push(h.ref,h.__c||g,h)),_||=g,4&h.__u?(c=T(h,c,e,!m.__v),m.__e&&(m.__e=null)):typeof h.type==`function`&&v!==void 0?c=v:g&&(c=g.nextSibling),h.__u&=-7);return n.__e=_,c}function te(e,t,n,r,i){var a,o,s,c,l,u,d,f,p,h,g=n.length,_=g,b=0,S=!1,C=e.__k=Array(i);for(a=0;a<i;a++)(o=t[a])!=null&&typeof o!=`boolean`&&typeof o!=`function`?(typeof o!=`object`||o.constructor==String?o=C[a]=v(null,o):m(o)?o=C[a]=v(y,{children:o}):o.constructor===void 0&&o.__b?o=C[a]=v(o.type,o.props,o.key,o.ref,o.__v):C[a]=o,c=a+b,o.__=e,o.__b=e.__b+1,s=null,~(l=o.__i=E(o,n,c,_))&&(_--,(s=n[l])&&(s.__u|=2)),s&&s.__v?(o.__u|=2,l==c-1?b--:l==c+1?b++:l!=c&&(l>c?b--:b++,S=!0)):(~l||(i>g?b--:i<g&&b++),typeof o.type!=`function`&&(o.__u|=4))):C[a]=null;if(S){for(u=[],d=[],a=0;a<i;a++)if((o=C[a])&&2&o.__u){for(f=0,p=u.length;f<p;)u[h=f+p>>1]<o.__i?f=h+1:p=h;u[f]=o.__i,d[a]=f+1}for(b=u.length;a--;)d[a]&&(d[a]==b?b--:C[a].__u|=4)}if(_)for(a=0;a<g;a++)!(s=n[a])||2&s.__u||(s.__e==r&&(r=x(s)),le(s,s));return r}function T(e,t,n,r){var i,a,o;if(typeof e.type==`function`){if(e.props.__P)return t;if(i=e.__k)for(a=0;a<i.length;a++)i[a]&&(i[a].__=e,t=T(i[a],t,n,!1));return t}for(t&&!t.parentNode&&(t=x(e))&&!t.parentNode&&(t=null),o=t;o&&o.nodeType==8;)o=o.nextSibling;for(e.__e!=o&&(!r&&n.moveBefore&&e.__e.parentNode?n.moveBefore(e.__e,t):n.insertBefore(e.__e,t||null)),t=e.__e;(t&&=t.nextSibling)&&t.nodeType==8;);return t}function E(e,t,n,r){var i,a,o,s=e.key,c=e.type,l=t[n],u=l&&!(2&l.__u);if(l===null&&s==null||u&&s==l.key&&c==l.type)return n;if(r>+!!u){for(i=n-1,a=n+1;i>=0||a<t.length;)if((l=t[o=i>=0?i--:a++])&&!(2&l.__u)&&s==l.key&&c==l.type)return o}return-1}function D(e,t,n){n??=``,t[0]==`-`?e.setProperty(t,n):e[t]=n}function ne(e,t,n,r,i){var a,o;n:if(t==`style`){if(typeof n==`string`)e.style.cssText=n;else{if(typeof r==`string`&&(e.style.cssText=r=``),r)for(t in r)n&&t in n||D(e.style,t,``);if(n)for(t in n)r&&n[t]==r[t]||D(e.style,t,n[t])}}else if(t[0]==`o`&&t[1]==`n`)(e.__e||={})[t]=n,n&&r||(o=u[t]||(u[t]=re(t)),(e.__a||={})[t]=l,a=t!=(t=t.replace(c,`$1`)),(t=t.slice(2))[0]<`a`&&(t=t.toLowerCase()),n?e.addEventListener(t,o,a):e.removeEventListener(t,o,a));else{if(i==`http://www.w3.org/2000/svg`)t=t.replace(/xlink(H|:h)/,`h`).replace(/sName$/,`s`);else if(t!=`width`&&t!=`height`&&t!=`href`&&t!=`list`&&t!=`form`&&t!=`tabIndex`&&t!=`download`&&t!=`rowSpan`&&t!=`colSpan`&&t!=`role`&&t!=`popover`&&t in e)try{e[t]=n??``;break n}catch{}typeof n==`function`||(n==null||!1===n&&t[4]!=`-`?e.removeAttribute(t):e.setAttribute(t,t==`popover`&&n==1?``:n))}}function re(t){return function(n){if(this.__e){var r=this.__e[t];if(n[s]==null)n[s]=l++;else if(n[s]<this.__a[t])return;return r(e.event?e.event(n):n)}}}function ie(t,n,r,i,a,o,s,c,l,u){var d,p,h,v,S,C,w,te,T,E,D,ne,re,ie,oe,ce,de,fe,O,pe,me=n.type;if(n.constructor!==void 0)return null;if(128&r.__u&&(l=32&r.__u,d=r.__c.__z)){if(n.__u|=l,p=o=[],d.nodeType==8)for(h=1,v=d.nextSibling;v;v=v.nextSibling){if(v.nodeType==8){if(v.data.startsWith(`$s`))h++;else if(v.data.startsWith(`/$s`)&&!--h)break}o.push(v)}else o.push(d);c=o[0]}(d=e.__b)&&d(n);n:if(typeof me==`function`){S=s.length;try{if(E=n.props,D=(d=me.prototype)&&d.render,ne=(d=me.contextType)&&i[d.__c],re=d?ne?ne.props.value:d.__:i,r.__c?2&(C=n.__c=r.__c).__g&&(C.__g|=1):(D?n.__c=C=new me(E,re):(n.__c=C=new b(E,re),C.constructor=me,C.render=ue),ne&&ne.sub(C),C.state||(C.state={}),C.__n=i,C.__g|=8,C.__h=[],C.__k=[]),D&&(C.__s||(C.__s=C.state),me.getDerivedStateFromProps&&(C.__s==C.state&&(C.__s=g({},C.__s)),g(C.__s,me.getDerivedStateFromProps(E,C.__s)))),w=C.props,te=C.state,C.__v=n,r.__c){if(D&&!me.getDerivedStateFromProps&&E!==w&&C.componentWillReceiveProps&&C.componentWillReceiveProps(E,re),n.__v==r.__v&&!(8&C.__g)||!(4&C.__g)&&C.shouldComponentUpdate&&!1===C.shouldComponentUpdate(E,C.__s,re)){n.__v!=r.__v&&(C.props=E,C.state=C.__s,C.__g&=-9),n.__e=r.__e,n.__k=r.__k,n.__k.some(function(e){e&&(e.__=n)}),f.push.apply(C.__h,C.__k),C.__k=[],C.__h.length&&s.push(C),c=x(r);break n}C.componentWillUpdate&&C.componentWillUpdate(E,C.__s,re),D&&C.componentDidUpdate&&C.__h.push(function(){C.componentDidUpdate(w,te,T)})}else D&&!me.getDerivedStateFromProps&&C.componentWillMount&&C.componentWillMount(),D&&C.componentDidMount&&C.__h.push(C.componentDidMount);if(C.context=re,C.props=E,C.__P=t,C.__g&=-5,ie=e.__r,oe=0,D)C.state=C.__s,C.__g&=-9,ie&&ie(n),d=C.render(C.props,C.state,C.context),f.push.apply(C.__h,C.__k),C.__k=[];else do C.__g&=-9,ie&&ie(n),d=C.render(C.props,C.state,C.context),C.state=C.__s;while(8&C.__g&&++oe<25);C.state=C.__s,C.getChildContext&&(i=g({},i,C.getChildContext())),D&&r.__c&&C.getSnapshotBeforeUpdate&&(T=C.getSnapshotBeforeUpdate(w,te)),ce=d&&d.type===y&&d.key==null?d.props.children:d,E.__P&&(d=c,a=(t=E.__P).namespaceURI,l=o=null,r.props&&r.props.__P!=t&&(r.__k.some(function(e){e&&le(e,e)}),r.__k=null),c=r.__k?x(r,0):null),c=ee(t,m(ce)?ce:[ce],n,r,i,a,o,s,c,l,u),E.__P&&(n.__e=null,c=d),n.__u&=-161,128&r.__u&&(C.__z=null),p&&p.some(_),C.__h.length&&s.push(C),1&C.__g&&(C.__g&=-4)}catch(t){if(s.length=S,n.__v=null,l||o){if(t.then){if(de=0,n.__u|=l?160:128,o){for(~(O=o.indexOf(c||void 0))||(O=o.length);(pe=o[O-1])&&pe.nodeType==8;)O--;for(;O<o.length;O++)if(pe=o[O]){if(o[O]=null,pe.nodeType==8){if(pe.data.startsWith(`$s`))de++||(fe=pe);else if(de&&pe.data.startsWith(`/$s`)&&!--de){c=pe;break}}else if(!de)break}}if(!fe){for(;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;fe=c}n.__c.__z||(n.__c.__z=fe),n.__e=c}else o&&o.some(_)}else n.__e=r.__e;n.__k||=r.__k||[],t.then||ae(n),e.__e(t,n,r)}}else c=n.__e=se(r.__e,n,r,i,a,o,s,l,u,t);return(d=e.diffed)&&d(n),128&n.__u?void 0:c}function ae(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(ae))}function oe(t,n,r){for(var i=0;i<r.length;)ce(r[i++],r[i++],r[i++]);e.__c&&e.__c(n,t),t.some(function(n){try{t=n.__h,n.__h=[],t.some(function(e){e.call(n)})}catch(t){e.__e(t,n.__v)}})}function se(t,n,r,i,a,o,s,c,l,u){var f,g,v,y,b,S,C,w,te,T=r.props||d,E=n.props,D=n.type;if(D==`svg`?a=`http://www.w3.org/2000/svg`:D==`math`?a=`http://www.w3.org/1998/Math/MathML`:a||=`http://www.w3.org/1999/xhtml`,o){for(f=0;f<o.length;f++)if((b=o[f])&&(D?b.localName==D:b.nodeType==3)){t=b,o[f]=null;break}}if(!t){if(w=u.ownerDocument||document,!D)return w.createTextNode(E);t=w.createElementNS(a,D,E.is&&E),c&&=(e.__m&&e.__m(n,o),!1),o=null}if(D){if(u=D==`template`?t.content:t,o=D==`textarea`&&E.defaultValue!=null?null:o&&h.call(u.childNodes),!c&&o)for(T={},f=0;f<t.attributes.length;f++)T[(b=t.attributes[f]).name]=b.value;for(f in T)b=T[f],f==`dangerouslySetInnerHTML`?v=b:f==`children`||f in E||f==`value`&&`defaultValue`in E||f==`checked`&&`defaultChecked`in E||ne(t,f,null,b,a);for(f in te=1&r.__u,E)b=E[f],f==`children`?y=b:f==`dangerouslySetInnerHTML`?g=b:f==`value`?S=b:f==`checked`?C=b:c&&typeof b!=`function`||!(T[f]!==b||te&&b!=null)||ne(t,f,b,T[f],a);g?(c||v&&(g.__html==v.__html||g.__html==t.innerHTML)||(t.innerHTML=g.__html),n.__k=[]):(v&&(t.textContent=``),(D==`foreignObject`||a==`http://www.w3.org/1998/Math/MathML`&&p.test(D))&&(a=`http://www.w3.org/1999/xhtml`),ee(u,m(y)?y:[y],n,r,i,a,o,s,o?o[0]:r.__k&&x(r,0),c,l),o&&o.some(_)),c&&D!=`textarea`||(f=`value`,D==`progress`&&S==null?t.removeAttribute(f):S==null||S===t[f]&&(D!=`progress`||S)||ne(t,f,S,T[f],a),f=`checked`,C!=null&&C!=t[f]&&ne(t,f,C,T[f],a))}else T===E||c&&t.data==E||(t.data=E);return t}function ce(t,n,r,i){try{typeof t==`function`?n?n.__x=t(n)||1:(i&&=i.__c||i.__e)&&(n=i.__x)&&(i.__x=null,typeof n==`function`?n():t(null)):t.current=n}catch(t){e.__e(t,r)}}function le(t,n,r){var i,a;if(e.unmount&&e.unmount(t),!(i=t.ref)||i.current&&i.current!=t.__e||ce(i,null,n,t),i=t.__c){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(t){e.__e(t,n)}i.__P=i.__n=null}if(i=t.__k)for(a=0;a<i.length;a++)i[a]&&le(i[a],n,typeof t.type!=`function`||r&&!t.props.__P);(i=t.__e)&&(r||_(i),i.__e&&(i.__e=null)),t.__e=t.__c=t.__=null}function ue(e,t,n){return this.constructor(e,n)}function de(t,n){var r,i,a,o;e.__&&e.__(t,n),n.nodeType==9&&(n=n.documentElement),i=(r=t&&32&t.__u)?null:n.__k,n.__k=v(y,{children:[t]}),a=[],o=[],ie(n,n.__k,i||d,d,n.namespaceURI,i?null:n.firstChild?h.call(n.childNodes):null,a,i?i.__e:n.firstChild,r,o),oe(a,n.__k,o),n.__k.props.children=null}e={__e:function(e,t,n,r){for(var i,o,s;t=t.__;)if((i=t.__c)&&!(1&i.__g)){i.__g|=4;try{if((o=i.constructor)&&o.getDerivedStateFromError&&(i.setState(o.getDerivedStateFromError(e)),s=8&i.__g),i.componentDidCatch&&(i.componentDidCatch(e,r||{}),s=8&i.__g),s)return void(i.__g|=2)}catch(t){e=t,s=0}}throw a=0,e}},t=0,n=function(e){return e!=null&&e.constructor===void 0},b.prototype.setState=function(e,t){var n=this.__s;n&&n!=this.state||(n=this.__s=g({},this.state)),typeof e==`function`&&(e=e(g({},n),this.props)),e&&(g(n,e),this.__v&&(t&&this.__k.push(t),C(this)))},b.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),C(this))},b.prototype.render=y,r=[],a=0,o=function(e,t){return e.__v.__b-t.__v.__b},s=Symbol(),c=/(PointerCapture)$|Capture$/i,l=0,u={};var fe,O,pe,me,he=Object.is,ge=0,_e=[],ve=[],k=e,ye=k.__b,be=k.__r,xe=k.diffed,Se=k.__c,Ce=k.unmount,we=k.__;function Te(e,t){k.__h&&k.__h(O,e,ge||t),ge=0;var n=O.__H||(O.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function Ee(e){return ge=1,De(Re,e)}function De(e,t,n){var r=Te(fe++,2);if(r.t=e,!r.__c&&(r.__=[n?n(t):Re(void 0,t),function(e){var t=r.__N?r.__N[0]:r.__[0],n=r.t(t,e);he(t,n)||(r.__N=[n,r.__[1]],r.__c.setState({}))}],r.__c=O,!O.__f)){O.__f=!0;var i=O.shouldComponentUpdate;O.shouldComponentUpdate=function(e,t,n){var r=this.__H;if(!r)return!0;var a=!1,o=this.props!=e;if(r.__.some(function(e){e.__N&&(a=!0,he(e.__[0],e.__N[0])||(o=!0))}),i){var s=i.call(this,e,t,n);return a?s||o:s}return!a||o}}return r.__}function Oe(e,t){var n=Te(fe++,3);!k.__s&&Le(n.__H,t)&&(n.__P=!0,n.__=e,n.u=t,O.__H.__h.push(n))}function ke(e){return ge=5,Ae(function(){return{current:e}},[])}function Ae(e,t){var n=Te(fe++,7);return Le(n.__H,t)&&(n.__=e(),n.__H=t),n.__}function je(){var e;do{for(;e=ve.shift();)try{Fe(e)}catch(t){k.__e(t,{__:(e=e.__P)&&e.__v})}for(;e=_e.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(Fe),t.__h.some(Ie),t.__h=[]}catch(n){t.__h=[],k.__e(n,e.__v)}}}while(ve.length)}k.__b=function(e){O=null,ye&&ye(e)},k.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),we&&we(e,t)},k.__r=function(e){be&&be(e),fe=0;var t=(O=e.__c).__H;t&&(pe==O?O.__h=[]:(t.__h.some(Fe),t.__h.some(Ie),fe=0),t.__h=[],t.__.some(function(e){e.__N&&(e.__=e.__N),e.u=e.__N=void 0})),pe=O},k.diffed=function(e){xe&&xe(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&Pe(_e.push(t)),t.__H.__.some(function(e){e.u&&(e.__H=e.u)})),pe=O=null},k.__c=function(e,t){t.some(function(e){try{e.__h.some(Fe),e.__h=e.__h.filter(function(e){return!e.__||Ie(e)})}catch(n){t.some(function(e){e.__h&&=[]}),t=[],k.__e(n,e.__v)}}),Se&&Se(e,t)},k.unmount=function(e){Ce&&Ce(e);var t,n,r=e.__c;r&&r.__H&&(r.__H.__.some(function(r){try{if(r.__P&&r.__c){if(n===void 0){for(n=e.__;n&&(!n.__c||!n.__c.__P);)n=n.__;n&&=n.__c}r.__P=n,Pe(ve.push(r))}else Fe(r)}catch(e){t=e}}),r.__H=void 0,t&&k.__e(t,r.__v))};var Me=typeof requestAnimationFrame==`function`;function Ne(e){var t,n=function(){clearTimeout(r),Me&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,35);Me&&(t=requestAnimationFrame(n))}function Pe(e){e!=1&&me==k.requestAnimationFrame||((me=k.requestAnimationFrame)||Ne)(je)}function Fe(e){var t=O,n=e.__c;typeof n==`function`&&(e.__c=void 0,n()),O=t}function Ie(e){var t=O;e.__c=e.__(),O=t}function Le(e,t){return!e||e.length!=t.length||t.some(function(t,n){return!he(t,e[n])})}function Re(e,t){return typeof t==`function`?t(e):t}var ze=Symbol.for(`preact-signals`);function Be(){if(Ge>1)Ge--;else{var e,t=!1;for((function(){var e=Ye;for(Ye=void 0;e!==void 0;){var t=e.S;if(t.v===e.v)for(var n=t.t;n!==void 0;n=n.x)n.i===e.i&&(n.i=t.i);e=e.o}})();We!==void 0;){var n=We;for(We=void 0,Ke++;n!==void 0;){var r=n.u;if(n.u=void 0,n.f&=-3,!(8&n.f)&&Qe(n))try{n.c()}catch(n){t||=(e=n,!0)}n=r}}if(Ke=0,Ge--,t)throw e}}function Ve(e){if(Ge>0)return e();Je=++qe,Ge++;try{return e()}finally{Be()}}var He,A=void 0;function Ue(e){var t=A,n=He;A=void 0,He=void 0;try{return e()}finally{A=t,He=n}}var We=void 0,Ge=0,Ke=0,qe=0,Je=0,Ye=void 0,Xe=0;function Ze(e){if(A!==void 0){var t=e.n;if(t===void 0||t.t!==A)return t={i:0,S:e,p:A.s,n:void 0,t:A,e:void 0,x:void 0,r:t},A.s!==void 0&&(A.s.n=t),A.s=t,e.n=t,32&A.f&&e.S(t),t;if(t.i===-1)return t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=A.s,t.n=void 0,A.s.n=t,A.s=t),t}}function j(e,t){this.v=e,this.i=0,this.n=void 0,this.t=void 0,this.l=0,this.W=t?.watched,this.Z=t?.unwatched,this.name=t?.name}j.prototype.brand=ze,j.prototype.h=function(){return!0},j.prototype.S=function(e){var t=this,n=this.t;n!==e&&e.e===void 0&&(e.x=n,this.t=e,n===void 0?Ue(function(){var e;(e=t.W)==null||e.call(t)}):n.e=e)},j.prototype.U=function(e){var t=this;if(this.t!==void 0){var n=e.e,r=e.x;n!==void 0&&(n.x=r,e.e=void 0),r!==void 0&&(r.e=n,e.x=void 0),e===this.t&&(this.t=r,r===void 0&&Ue(function(){var e;(e=t.Z)==null||e.call(t)}))}},j.prototype.subscribe=function(e){var t=this;return st(function(){var n=t.value;Ue(function(){return e(n)})},{name:`sub`})},j.prototype.valueOf=function(){return this.value},j.prototype.toString=function(){return this.value+``},j.prototype.toJSON=function(){return this.value},j.prototype.peek=function(){var e=this;return Ue(function(){return e.value})},Object.defineProperty(j.prototype,"value",{get:function(){var e=Ze(this);return e!==void 0&&(e.i=this.i),this.v},set:function(e){if(e!==this.v){if(Ke>100)throw Error(`Cycle detected`);(function(e){Ge!==0&&Ke===0&&e.l!==Je&&(e.l=Je,Ye={S:e,v:e.v,i:e.i,o:Ye})})(this),this.v=e,this.i++,Xe++,Ge++;try{for(var t=this.t;t!==void 0;t=t.x)t.t.N()}finally{Be()}}}});function M(e,t){return new j(e,t)}function Qe(e){for(var t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function $e(e){for(var t=e.s;t!==void 0;t=t.n){var n=t.S.n;if(n!==void 0&&(t.r=n),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function et(e){for(var t=e.s,n=void 0;t!==void 0;){var r=t.p;t.i===-1?(t.S.U(t),r!==void 0&&(r.n=t.n),t.n!==void 0&&(t.n.p=r)):n=t,t.S.n=t.r,t.r!==void 0&&(t.r=void 0),t=r}e.s=n}function tt(e,t){j.call(this,void 0,t),this.x=e,this.s=void 0,this.g=Xe-1,this.f=4}tt.prototype=new j,tt.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Xe))return!0;if(this.g=Xe,this.f|=1,this.i>0&&!Qe(this))return this.f&=-2,!0;var e=A;try{$e(this),A=this;var t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return A=e,et(this),this.f&=-2,!0},tt.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(var t=this.s;t!==void 0;t=t.n)t.S.S(t)}j.prototype.S.call(this,e)},tt.prototype.U=function(e){if(this.t!==void 0&&(j.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(var t=this.s;t!==void 0;t=t.n)t.S.U(t)}},tt.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var e=this.t;e!==void 0;e=e.x)e.t.N()}},Object.defineProperty(tt.prototype,"value",{get:function(){if(1&this.f)throw Error(`Cycle detected`);var e=Ze(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}});function nt(e,t){return new tt(e,t)}function rt(e){var t=e.m;if(e.m=void 0,typeof t==`function`){Ge++;var n=A;A=void 0;try{t()}catch(t){throw e.f&=-2,e.f|=8,it(e),t}finally{A=n,Be()}}}function it(e){for(var t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,rt(e)}function at(e){if(A!==this)throw Error(`Out-of-order effect`);et(this),A=e,this.f&=-2,8&this.f&&it(this),Be()}function ot(e,t){this.x=e,this.m=void 0,this.s=void 0,this.u=void 0,this.f=32,this.name=t?.name,He&&He.push(this)}ot.prototype.c=function(){var e=this.S();try{if(8&this.f||this.x===void 0)return;var t=this.x();typeof t==`function`&&(this.m=t)}finally{e()}},ot.prototype.S=function(){if(1&this.f)throw Error(`Cycle detected`);this.f|=1,this.f&=-9,rt(this),$e(this),Ge++;var e=A;return A=this,at.bind(this,e)},ot.prototype.N=function(){2&this.f||(this.f|=2,this.u=We,We=this)},ot.prototype.d=function(){this.f|=8,1&this.f||it(this)},ot.prototype.dispose=function(){this.d()};function st(e,t){var n=new ot(e,t);try{n.c()}catch(e){throw n.d(),e}var r=n.d.bind(n);return r[Symbol.dispose]=r,r}var ct,lt,ut=typeof window<`u`&&!!window.__PREACT_SIGNALS_DEVTOOLS__,dt=[];st(function(){ct=this.N})();function ft(t,n){e[t]=n.bind(null,e[t]||function(){})}function pt(e){if(lt){var t=lt;lt=void 0,t()}lt=e&&e.S()}function mt(e){var t=this,r=e.data,i=gt(r);i.name=`ReactiveDom`,i.value=r;var a=Ae(function(){for(var e=t,r=t.__v;r=r.__;)if(r.__c){r.__c.__$f|=4;break}var a=nt(function(){var e=i.value.value;return e===0?0:!0===e?``:e||``}),o=nt(function(){return!Array.isArray(a.value)&&!n(a.value)}),s=st(function(){if(this.N=yt,o.value){var t=a.value;e.__v&&e.__v.__e&&e.__v.__e.nodeType===3&&(e.__v.__e.data=t)}}),c=t.__$u.d;return t.__$u.d=function(){s(),c.call(this)},[o,a]},[]),o=a[0],s=a[1];return o.value?s.peek():s.value}mt.displayName=`ReactiveTextNode`,Object.defineProperties(j.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:mt},props:{configurable:!0,get:function(){var e=this;return{data:{get value(){return e.value}}}}},__b:{configurable:!0,value:1}}),ft(`__b`,function(e,t){if(pt(),typeof t.type==`string`){var n,r=t.props;for(var i in r)if(i!==`children`){var a=r[i];a instanceof j&&(n||(t.__np=n={}),n[i]=a,r[i]=a.peek())}}e(t)}),ft(`__r`,function(e,t){if(e(t),t.type!==y){pt();var n,r=t.__c;r&&(r.__$f&=-2,(n=r.__$u)===void 0&&(r.__$u=n=function(e,t){var n;return st(function(){n=this},{name:t}),n.c=e,n}(function(e){return function(){var t;ut&&((t=this.y)==null||t.call(this)),e.__$f|=1,e.setState({})}}(r),typeof t.type==`function`?t.type.displayName||t.type.name:``))),pt(n)}}),ft(`__e`,function(e,t,n,r){pt(),e(t,n,r)}),ft(`diffed`,function(e,t){pt();var n;if(typeof t.type==`string`&&(n=t.__e)){var r=t.__np,i=t.props,a=n.U;if(a)for(var o in a){var s=a[o];s===void 0||r&&o in r||(s.d(),a[o]=void 0)}if(r)for(var c in a||(a={},n.U=a),r){var l=a[c],u=r[c];l===void 0?(l=ht(n,c,u,i),a[c]=l):l.o(u,i)}}e(t)});function ht(e,t,n,r){var i=t in e&&e.ownerSVGElement===void 0,a=M(n);return{o:function(e,t){a.value=e,r=t},d:st(function(){this.N=yt;var n=a.value.value;r[t]!==n&&(r[t]=n,i?e[t]=n:n!=null&&(!1!==n||t[4]===`-`)?e.setAttribute(t,n):e.removeAttribute(t))})}}ft(`unmount`,function(e,t){if(typeof t.type==`string`){var n=t.__e;if(n){var r=n.U;if(r)for(var i in n.U=void 0,r){var a=r[i];a&&a.d()}}var o=t.__np;if(o){var s=t.props;for(var c in o)s[c]=o[c]}t.__np=void 0}else{var l=t.__c;if(l){l.__$f|=8;var u=l.__$u;u&&(l.__$u=void 0,u.d())}}e(t)}),ft(`__h`,function(e,t,n,r){r<3&&(t.__$f|=2),e(t,n,r)}),b.prototype.shouldComponentUpdate=function(e,t){if(this.__R)return!0;var n=this.__$u,r=n&&n.s!==void 0;for(var i in t)return!0;if(this.__f||typeof this.u==`boolean`&&!0===this.u){var a=2&this.__$f;if(!(r||a||4&this.__$f)||1&this.__$f)return!0}else if(!(r||4&this.__$f)||3&this.__$f)return!0;for(var o in e)if(o!==`__source`&&e[o]!==this.props[o])return!0;for(var s in this.props)if(!(s in e))return!0;return!1};function gt(e,t){return Ae(function(){return M(e,t)},[])}var _t=function(e){queueMicrotask(function(){queueMicrotask(e)})};function vt(){Ve(function(){for(var e;e=dt.shift();)ct.call(e)})}function yt(){dt.push(this)===1&&(e.requestAnimationFrame||_t)(vt)}var N={carveDepth:{type:`number`,section:`carving`,label:`Overall depth`,unit:`%`,min:0,max:100,step:1,default:50,mode:`carve`,help:`How deep the whole carving is (each tool's Depth is a share of this). Relative to the canvas size, so exports look the same at any size.`},carveProfile:{type:`select`,section:`carving`,label:`Profile`,advanced:!0,default:`u`,mode:`carve`,options:[{value:`v`,label:`V / conical`},{value:`u`,label:`U / rounded`},{value:`flat`,label:`Flat-bottom chisel`},{value:`feathered`,label:`Feathered`}],help:`Cross-section of the groove.`},carveWallSteepness:{type:`number`,section:`carving`,label:`Wall steepness`,advanced:!0,min:0,max:1,step:.01,default:.3,mode:`carve`,help:`How quickly the groove reaches full depth from its edge.`},carveRoughness:{type:`number`,section:`carving`,label:`Edge roughness`,advanced:!0,unit:`px`,min:0,max:12,step:.1,default:1.5,mode:`carve`,help:`How far the edge wanders in and out, so it looks hand-pecked rather than drawn.`},carveRoughnessType:{type:`select`,section:`carving`,label:`Roughness type`,advanced:!0,default:`organic`,mode:`carve`,options:[{value:`organic`,label:`Soft organic`},{value:`chippy`,label:`Chippy / flaky`},{value:`cracked`,label:`Cracked`}],help:`Soft wandering edges, chipped-out bites, or thin cracks running out from the edge.`},carveRoughnessScale:{type:`number`,section:`carving`,label:`Roughness scale`,advanced:!0,unit:`px`,min:2,max:80,step:.5,default:12,mode:`carve`,help:`Size of the roughness features.`},carveRoughnessSharpness:{type:`number`,section:`carving`,label:`Roughness sharpness`,advanced:!0,min:0,max:1,step:.01,default:.5,mode:`carve`,help:`Rounded (0) to crisp (1) roughness.`},carvePeckDensity:{type:`number`,section:`carving`,label:`Pecking density`,advanced:!0,min:0,max:1,step:.01,default:.5,mode:`carve`,help:`Pitted crater marks on the carving floor. 0 = smooth floor.`},carvePeckSize:{type:`number`,section:`carving`,label:`Peck size`,advanced:!0,unit:`px`,min:.5,max:12,step:.1,default:2.5,mode:`carve`,help:`Radius of each peck mark.`},carvePeckVariation:{type:`number`,section:`carving`,label:`Peck size variation`,advanced:!0,min:0,max:1,step:.01,default:.5,mode:`carve`,help:`How much peck marks differ in size.`},carveSurfaceColor:{type:`color`,section:`carveColor`,label:`Varnish color`,default:`#5b4433`,mode:`carve`,help:`The rock's typical surface (varnish) color. Rock of exactly this color turns into the interior color where carved. Set from the rock photo when you pick a rock.`},carveVarnishAmount:{type:`number`,section:`carveColor`,label:`Varnish`,source:`material`,mode:`carve`,min:0,max:1,step:.01,default:.7,help:`How strongly the uncarved surface is darkened toward the varnish color. Carving reveals the clean rock underneath.`},carveVarnishPatchiness:{type:`number`,section:`carveColor`,label:`Varnish patchiness`,advanced:!0,source:`material`,mode:`carve`,min:0,max:1,step:.01,default:.4,help:`Uneven, blotchy varnish instead of an even coat.`},carveInteriorColor:{type:`color`,section:`carveColor`,label:`Interior color`,advanced:!0,default:`#bea78f`,mode:`carve`,source:`photo`,help:`Color of the fresh rock exposed by carving.`},carveLightSpotProtection:{type:`number`,section:`carveColor`,label:`Light-spot protection`,advanced:!0,min:0,max:1,step:.01,default:.6,mode:`carve`,source:`photo`,help:`How much spots that are already light are left alone when carved.`},carveTextureStrength:{type:`number`,section:`carveColor`,label:`Texture strength`,advanced:!0,min:0,max:2,step:.01,default:1,mode:`carve`,help:`How much of the photo's grain and pitting shows through the carving. 0 looks flat and painted.`},carveDetailSize:{type:`number`,section:`carveColor`,label:`Texture detail size`,advanced:!0,unit:`px`,min:2,max:200,step:1,default:24,mode:`carve`,help:`Where color ends and texture begins: features smaller than this count as grain and carry through.`},carveDepthReveal:{type:`number`,section:`carveColor`,label:`Depth reveal`,advanced:!0,min:0,max:1,step:.01,default:.5,mode:`carve`,help:`Shallow parts stay partly varnished; deeper parts show more interior color.`},carveEdgeSoftness:{type:`number`,section:`carveColor`,label:`Edge transition`,advanced:!0,unit:`px`,min:0,max:20,step:.1,default:1,mode:`carve`,help:`Crisp (0) to a soft glowing edge where the interior color fades out past the cut.`},carveInteriorBrightness:{type:`number`,section:`carveColor`,label:`Interior brightness`,advanced:!0,min:-.5,max:.5,step:.01,default:0,mode:`carve`,help:`Lighter or darker interior.`},carveInteriorContrast:{type:`number`,section:`carveColor`,label:`Interior contrast`,advanced:!0,min:0,max:2,step:.01,default:1,mode:`carve`,help:`Contrast of the interior rock.`},carveInteriorSaturation:{type:`number`,section:`carveColor`,label:`Interior saturation`,advanced:!0,min:0,max:2,step:.01,default:1,mode:`carve`,help:`Color intensity of the interior rock.`},carveAge:{type:`number`,section:`carveColor`,label:`Age`,advanced:!0,min:0,max:1,step:.01,default:0,mode:`carve`,help:`Re-patination: older carvings fade back toward the varnish color and their edges soften.`},carveCracks:{type:`toggle`,section:`carving`,label:`Rock cracks cut through`,advanced:!0,default:!0,mode:`carve`,help:`Where the rock photo has cracks or spalls (if the rock has a crack map), carvings break.`},carveInteriorTexture:{type:`number`,section:`carveColor`,label:`Interior texture image`,advanced:!0,min:0,max:1,step:.01,default:0,mode:`carve`,help:`Blend in the rock's own interior texture photo, if it has one.`},rockFollowSurface:{type:`number`,section:`carving`,label:`Follow surface`,advanced:!0,min:0,max:1,step:.01,default:.3,mode:`carve`,help:`Carvings dip and rise with the rock's own bumps and hollows. On materials: how much of the rock's relief stays on the carving floor (0 = flat floor).`},raisedHeight:{type:`number`,section:`raised`,label:`Overall height`,unit:`%`,mode:`raised`,min:0,max:100,step:1,default:50,help:`How far the glyphs stand up from the surface.`},raisedProfile:{type:`select`,section:`raised`,label:`Bevel`,advanced:!0,default:`rounded`,mode:`raised`,options:[{value:`rounded`,label:`Rounded`},{value:`chamfered`,label:`Chamfered`},{value:`steep`,label:`Steep-sided`},{value:`eroded`,label:`Eroded`}],help:`Shape of the glyph's edge, from the ground up to its flat top.`},raisedBevelWidth:{type:`number`,section:`raised`,label:`Bevel width`,advanced:!0,unit:`px`,mode:`raised`,min:.5,max:60,step:.5,default:8,help:`How far in from the edge the bevel reaches before the top flattens (never more than half a line's width).`},raisedWeathering:{type:`number`,section:`raised`,label:`Weathering`,advanced:!0,mode:`raised`,min:0,max:1,step:.01,default:.35,help:`High points and upper edges wear lighter and smoother.`},raisedTexture:{type:`number`,section:`raised`,label:`Rock texture`,advanced:!0,mode:`raised`,min:0,max:1,step:.01,default:.5,help:`How much of the rock's own bumps show on the glyph's surface.`},raisedShadow:{type:`toggle`,section:`raised`,label:`Drop shadow`,default:!0,mode:`raised`,help:`A soft shadow on the ground behind the glyphs, falling away from the light.`},raisedShadowDistance:{type:`number`,section:`raised`,label:`Shadow distance`,advanced:!0,unit:`px`,mode:`raised`,min:0,max:100,step:.5,default:10,help:`How far the shadow falls (longer when the light is low).`},raisedShadowSoftness:{type:`number`,section:`raised`,label:`Shadow softness`,advanced:!0,unit:`px`,mode:`raised`,min:0,max:60,step:.5,default:8,help:`How blurry the shadow's edge is.`},lightAngle:{type:`number`,section:`light`,label:`Angle`,advanced:!0,unit:`°`,min:0,max:360,step:1,default:135,help:`Direction the light comes from (relative to the rock photo; turns with it).`},lightElevation:{type:`number`,section:`light`,label:`Elevation`,advanced:!0,unit:`°`,min:5,max:90,step:1,default:35,help:`Low = raking light that rakes across the grooves; high = overhead.`},lightIntensity:{type:`number`,section:`light`,label:`Intensity`,advanced:!0,min:0,max:2,step:.01,default:1,help:`Strength of the direct light on the carving.`},lightAmbient:{type:`number`,section:`light`,label:`Ambient`,advanced:!0,min:0,max:1,step:.01,default:.35,help:`Fill light: how dark the shadowed walls get.`},lightColor:{type:`color`,section:`light`,label:`Light color`,advanced:!0,default:`#ffffff`,help:`Warm or cool light on the carving.`},lightShadowLength:{type:`number`,section:`light`,label:`Shadow length`,advanced:!0,min:0,max:3,step:.01,default:1,help:`Stretches the shadows the carving walls cast (1 = true to the light angle, 0 = none).`},lightShadowSoftness:{type:`number`,section:`light`,label:`Shadow softness`,advanced:!0,min:0,max:1,step:.01,default:.3,help:`Crisp to soft shadow edges.`},lightOcclusion:{type:`number`,section:`light`,label:`Ambient occlusion`,advanced:!0,min:0,max:1,step:.01,default:.5,help:`Darkening inside deep, narrow grooves.`},lightHighlight:{type:`number`,section:`light`,label:`Highlight`,advanced:!0,min:0,max:1,step:.01,default:.1,help:`Subtle shine on carving walls facing the light.`},snapOn:{type:`toggle`,section:`snapping`,label:`Snapping`,default:!0,help:`New points snap to stroke ends, points and paths nearby (and the grid, if on). Hold Ctrl (Cmd on Mac) to draw freely.`},snapToStrokes:{type:`toggle`,section:`snapping`,label:`Snap to strokes`,advanced:!0,default:!0,help:`Snap to the ends, points and paths of strokes already drawn.`},snapGrid:{type:`toggle`,section:`snapping`,label:`Snap to grid`,advanced:!0,default:!1,help:`Snap to a square grid.`},gridSpacing:{type:`number`,section:`snapping`,label:`Grid spacing`,advanced:!0,unit:`px`,min:5,max:500,step:1,default:50,help:`Distance between grid lines, in canvas pixels.`},showGrid:{type:`toggle`,section:`snapping`,label:`Show grid`,advanced:!0,default:!1,help:`Draw the grid over the canvas (it's never carved or exported).`},snapDistance:{type:`number`,section:`snapping`,label:`Snap & join distance`,advanced:!0,unit:`px`,min:2,max:60,step:1,default:12,help:`How close (in screen pixels) the pointer must be to snap, and a stroke's end must be to join another stroke.`},snapAngleStep:{type:`select`,section:`snapping`,label:`Angle steps`,advanced:!0,default:`15`,options:[{value:`15`,label:`15°`},{value:`30`,label:`30°`},{value:`45`,label:`45°`}],help:`Straight segments snap to these angle steps while you hold Shift.`},snapAngleAlways:{type:`toggle`,section:`snapping`,label:`Always snap angles`,advanced:!0,default:!1,help:`Snap segment and handle angles without holding Shift.`},joinOn:{type:`toggle`,section:`snapping`,label:`Auto-join`,advanced:!0,default:!0,help:`A brush stroke that ends near another stroke connects to it cleanly.`},tangentBlend:{type:`number`,section:`snapping`,label:`Tangent blend`,advanced:!0,min:0,max:1,step:.01,default:.5,help:`Joined lines bend into each other instead of meeting at an angle. 0 = meet straight on.`},symMode:{type:`select`,section:`symmetry`,label:`Mode`,default:`none`,options:[{value:`none`,label:`None`},{value:`mirror`,label:`Mirror`},{value:`radial`,label:`Radial`},{value:`kaleidoscope`,label:`Kaleidoscope`},{value:`spiral`,label:`Spiral`},{value:`linear`,label:`Linear array`},{value:`grid`,label:`Grid array`},{value:`gridMirror`,label:`Grid with mirroring`}],help:`Strokes drawn while a mode is on get live copies. Setting this back to None turns every copy into a normal stroke.`},symCount:{type:`number`,section:`symmetry`,label:`Count`,showIf:{key:`symMode`,is:[`radial`,`kaleidoscope`,`spiral`,`linear`]},min:2,max:48,step:1,default:6,help:`How many copies (including the one you draw).`},symTwoAxes:{type:`toggle`,section:`symmetry`,label:`Two axes`,default:!1,showIf:{key:`symMode`,is:[`mirror`]},help:`Mirror across a second axis at right angles too (four copies).`},symGuides:{type:`toggle`,section:`symmetry`,label:`Show guides`,default:!0,showIf:{key:`symMode`,is:[`mirror`,`radial`,`kaleidoscope`,`spiral`,`linear`,`grid`,`gridMirror`]},help:`Show the symmetry axes and the handles to move the center and turn the axis.`},symAngle:{type:`number`,section:`symmetry`,label:`Angle`,advanced:!0,unit:`°`,showIf:{key:`symMode`,is:[`mirror`,`radial`,`kaleidoscope`,`linear`]},min:-180,max:180,step:1,default:90,help:`Mirror axis (90 = vertical), the radial wedges' start, or the linear array's direction.`},symCenterX:{type:`number`,section:`symmetry`,label:`Center X`,advanced:!0,unit:`%`,showIf:{key:`symMode`,is:[`mirror`,`radial`,`kaleidoscope`,`spiral`,`gridMirror`]},min:-50,max:150,step:.1,default:50,help:`Symmetry center, as a percent of the canvas width (or drag the center handle).`},symCenterY:{type:`number`,section:`symmetry`,label:`Center Y`,advanced:!0,unit:`%`,showIf:{key:`symMode`,is:[`mirror`,`radial`,`kaleidoscope`,`spiral`,`gridMirror`]},min:-50,max:150,step:.1,default:50,help:`Symmetry center, as a percent of the canvas height.`},symRotStep:{type:`number`,section:`symmetry`,label:`Rotation step`,advanced:!0,unit:`°`,showIf:{key:`symMode`,is:[`spiral`]},min:-180,max:180,step:1,default:30,help:`How far each copy turns from the one before.`},symScaleStep:{type:`number`,section:`symmetry`,label:`Scale step`,advanced:!0,unit:`×`,showIf:{key:`symMode`,is:[`spiral`]},min:.5,max:1.5,step:.01,default:.85,help:`How much each copy grows (>1) or shrinks (<1) from the one before.`},symSpacing:{type:`number`,section:`symmetry`,label:`Spacing`,advanced:!0,unit:`px`,showIf:{key:`symMode`,is:[`linear`,`grid`,`gridMirror`]},min:5,max:2e3,step:1,default:200,help:`Distance between copies (between columns, for grids).`},symSpacingY:{type:`number`,section:`symmetry`,label:`Row spacing`,advanced:!0,unit:`px`,showIf:{key:`symMode`,is:[`grid`,`gridMirror`]},min:5,max:2e3,step:1,default:200,help:`Distance between rows.`},symCols:{type:`number`,section:`symmetry`,label:`Columns`,advanced:!0,showIf:{key:`symMode`,is:[`grid`,`gridMirror`]},min:1,max:20,step:1,default:3,help:`Copies across (the one you draw is the top-left cell).`},symRows:{type:`number`,section:`symmetry`,label:`Rows`,advanced:!0,showIf:{key:`symMode`,is:[`grid`,`gridMirror`]},min:1,max:20,step:1,default:3,help:`Copies down.`},symBrick:{type:`number`,section:`symmetry`,label:`Row offset (brick)`,advanced:!0,showIf:{key:`symMode`,is:[`grid`,`gridMirror`]},min:0,max:1,step:.01,default:0,help:`Shift every other row sideways by this much of the spacing (0.5 = brick pattern).`},symFlipCols:{type:`toggle`,section:`symmetry`,label:`Flip every other column`,advanced:!0,default:!0,showIf:{key:`symMode`,is:[`gridMirror`]},help:`Mirror alternate columns left-right (tile patterns).`},symFlipRows:{type:`toggle`,section:`symmetry`,label:`Flip every other row`,advanced:!0,default:!0,showIf:{key:`symMode`,is:[`gridMirror`]},help:`Mirror alternate rows top-bottom.`},symInner:{type:`select`,section:`symmetry`,label:`Stack inside`,advanced:!0,default:`none`,showIf:{key:`symMode`,is:[`mirror`,`radial`,`kaleidoscope`,`spiral`,`linear`,`grid`,`gridMirror`]},options:[{value:`none`,label:`Nothing`},{value:`mirror`,label:`Mirror`},{value:`radial`,label:`Radial`}],help:`Apply a second symmetry to each copy first, e.g. a radial pattern inside a mirror.`},symInnerCount:{type:`number`,section:`symmetry`,label:`Stacked count`,advanced:!0,showIf:{key:`symInner`,is:[`radial`]},min:2,max:24,step:1,default:4,help:`Copies of the stacked radial symmetry.`},symVariation:{type:`number`,section:`symmetry`,label:`Per-copy variation`,advanced:!0,showIf:{key:`symMode`,is:[`mirror`,`radial`,`kaleidoscope`,`spiral`,`linear`,`grid`,`gridMirror`]},min:0,max:1,step:.01,default:0,help:`Each copy is nudged and turned a little (seeded), so copies aren't identical.`},strokeWidthVariation:{type:`number`,section:`lines`,label:`Width variation`,min:0,max:1,step:.01,default:.15,help:`Lines get gently fatter and thinner along their length. Applies to the whole drawing.`},strokeJitter:{type:`number`,section:`lines`,label:`Jitter`,unit:`px`,min:0,max:12,step:.1,default:0,help:`Small random wobble of the line edges. Applies to the whole drawing.`},strokeSettleAnimated:{type:`toggle`,section:`defaults`,label:`Animate settle`,advanced:!0,default:!0,help:`When you lift the pen, fade the quick drawing preview into the finished carving (off = instant).`},areaMerge:{type:`number`,section:`area`,label:`Merge`,unit:`px`,min:0,max:60,step:.5,default:8,help:`Where lines meet, cross (including a line crossing itself) or come close, they blend with a curved fillet this size, like clay pressed together.`},areaCornerRounding:{type:`number`,section:`area`,label:`Corner rounding`,advanced:!0,unit:`px`,min:0,max:40,step:.5,default:0,help:`Rounds sharp corners inside and out, including sharp turns within one stroke.`},areaFillGaps:{type:`number`,section:`area`,label:`Fill gaps`,advanced:!0,unit:`px`,min:0,max:40,step:.5,default:0,help:`Fills tight inner corners and gaps narrower than about twice this, keeping the outer shape.`},areaSoftenPoints:{type:`number`,section:`area`,label:`Soften points`,advanced:!0,unit:`px`,min:0,max:40,step:.5,default:0,help:`Rounds sharp outer points and trims thin spurs.`},areaGrow:{type:`number`,section:`area`,label:`Grow / shrink`,advanced:!0,unit:`px`,min:-30,max:30,step:.5,default:0,help:`Makes every carved area fatter (+) or thinner (−) by this much.`},canvasWidth:{type:`number`,section:`canvas`,label:`Width`,unit:`px`,control:`field`,min:256,max:8192,step:1,default:2e3,help:`Canvas width in pixels at 1x export size.`},canvasHeight:{type:`number`,section:`canvas`,label:`Height`,unit:`px`,control:`field`,min:256,max:8192,step:1,default:2e3,help:`Canvas height in pixels at 1x export size.`},backgroundId:{type:`text`,section:`background`,label:`Rock`,default:``,hidden:!0,help:`Which rock photo is behind the canvas.`},backgroundScale:{type:`number`,section:`background`,label:`Scale`,advanced:!0,min:.25,max:4,step:.01,default:1,unit:`×`,help:`Size of the rock photo. 1 = the photo just covers the canvas. For materials, the size of each repeating tile.`},backgroundOffsetX:{type:`number`,section:`background`,label:`Position X`,advanced:!0,min:-100,max:100,step:.1,default:0,unit:`%`,help:`Slide the rock left or right behind the canvas (percent of canvas width).`},backgroundOffsetY:{type:`number`,section:`background`,label:`Position Y`,advanced:!0,min:-100,max:100,step:.1,default:0,unit:`%`,help:`Slide the rock up or down behind the canvas (percent of canvas height).`},backgroundRotation:{type:`number`,section:`background`,label:`Rotation`,advanced:!0,min:-180,max:180,step:1,default:0,unit:`°`,help:`Rotate the rock photo. The default light direction turns with it.`},backgroundReliefStrength:{type:`number`,section:`background`,label:`Rock relief`,source:`material`,min:0,max:3,step:.01,default:1,unit:`×`,help:`How strongly the material's bumps and hollows are shaded by the light.`},backgroundNormalDetail:{type:`number`,section:`background`,label:`Fine detail`,advanced:!0,source:`material`,min:0,max:1,step:.01,default:.5,help:`Extra fine surface detail from the material's normal map (only if it has one).`},workingResolution:{type:`number`,section:`defaults`,label:`Working resolution`,unit:`px`,min:512,max:4096,step:256,default:2048,help:`Longest side of the live preview render. Exports always render at full size.`},exportDetail:{type:`number`,section:`defaults`,label:`Export detail`,unit:`px`,min:1024,max:8192,step:256,default:4096,help:`Finest carving detail for exports (longest side of the carving render). Higher = crisper pecks and edges at 2x/4x, but more GPU memory. Lower it if big exports fail.`}},bt={raised:[{label:`Rounded`,values:{raisedProfile:`rounded`,raisedBevelWidth:8,raisedWeathering:.35}},{label:`Chamfered`,values:{raisedProfile:`chamfered`,raisedBevelWidth:5,raisedWeathering:.25}},{label:`Steep-sided`,values:{raisedProfile:`steep`,raisedBevelWidth:2,raisedWeathering:.15}},{label:`Eroded`,values:{raisedProfile:`eroded`,raisedBevelWidth:12,raisedWeathering:.6}}],carving:[{label:`Pecked`,values:{carveDepth:45,carveProfile:`u`,carveWallSteepness:.4,carveRoughness:2.5,carveRoughnessType:`chippy`,carveRoughnessScale:10,carveRoughnessSharpness:.6,carvePeckDensity:.7,carvePeckSize:2.5,carvePeckVariation:.6,carveEdgeSoftness:1,carveDepthReveal:.4,carveTextureStrength:1,carveInteriorContrast:1,strokeWidthVariation:.25}},{label:`Incised`,values:{carveDepth:55,carveProfile:`u`,carveWallSteepness:.5,carveRoughness:.3,carveRoughnessType:`organic`,carveRoughnessScale:12,carveRoughnessSharpness:.3,carvePeckDensity:0,carvePeckSize:2.5,carvePeckVariation:.5,carveEdgeSoftness:.5,carveDepthReveal:.3,carveTextureStrength:1,carveInteriorContrast:1,strokeWidthVariation:.05}},{label:`Cupule`,values:{carveDepth:75,carveProfile:`feathered`,carveWallSteepness:.1,carveRoughness:.8,carveRoughnessType:`organic`,carveRoughnessScale:14,carveRoughnessSharpness:.3,carvePeckDensity:.4,carvePeckSize:2.5,carvePeckVariation:.5,carveEdgeSoftness:1.5,carveDepthReveal:.5,carveTextureStrength:1,carveInteriorContrast:1,strokeWidthVariation:.1}},{label:`Scratched`,values:{carveDepth:15,carveProfile:`v`,carveWallSteepness:.8,carveRoughness:.5,carveRoughnessType:`organic`,carveRoughnessScale:4,carveRoughnessSharpness:.7,carvePeckDensity:0,carvePeckSize:1.5,carvePeckVariation:.5,carveEdgeSoftness:.3,carveDepthReveal:.2,carveTextureStrength:1.2,carveInteriorContrast:1.1,strokeWidthVariation:.15}},{label:`Deep pecked`,values:{carveDepth:90,carveProfile:`flat`,carveWallSteepness:.85,carveRoughness:3,carveRoughnessType:`chippy`,carveRoughnessScale:9,carveRoughnessSharpness:.8,carvePeckDensity:.9,carvePeckSize:3,carvePeckVariation:.6,carveEdgeSoftness:.6,carveDepthReveal:.2,carveTextureStrength:1.1,carveInteriorContrast:1.3,strokeWidthVariation:.2}}],light:[{label:`Raking evening`,values:{lightElevation:14,lightIntensity:1.2,lightAmbient:.25,lightColor:`#ffd8a8`,lightShadowLength:1.3,lightShadowSoftness:.25,lightOcclusion:.6,lightHighlight:.12}},{label:`Midday`,values:{lightElevation:70,lightIntensity:1,lightAmbient:.4,lightColor:`#ffffff`,lightShadowLength:1,lightShadowSoftness:.3,lightOcclusion:.5,lightHighlight:.1}},{label:`Overcast`,values:{lightElevation:80,lightIntensity:.5,lightAmbient:.75,lightColor:`#eef2ff`,lightShadowLength:.3,lightShadowSoftness:.9,lightOcclusion:.7,lightHighlight:0}}],canvas:[{label:`Square`,values:{canvasWidth:2e3,canvasHeight:2e3}},{label:`Portrait`,values:{canvasWidth:1600,canvasHeight:2e3}},{label:`Landscape`,values:{canvasWidth:2400,canvasHeight:1600}},{label:`Phone wallpaper`,values:{canvasWidth:1170,canvasHeight:2532}}]},xt={carving:`Custom`,canvas:`Custom`};function St(e){return N[e]}var Ct=Object.keys(N);function wt(e){let t={};for(let[n,r]of Object.entries(e))t[n]=r.default;return t}function Tt(){return wt(N)}var Et=/^#[0-9a-f]{6}$/i;function Dt(e,t){switch(e.type){case`number`:return typeof t!=`number`||!Number.isFinite(t)?void 0:Math.min(e.max,Math.max(e.min,t));case`toggle`:return typeof t==`boolean`?t:void 0;case`select`:return typeof t==`string`&&e.options.some(e=>e.value===t)?t:void 0;case`color`:return typeof t==`string`&&Et.test(t)?t.toLowerCase():void 0;case`text`:return typeof t==`string`?t:void 0}}function Ot(e,t){return kt(N,e,t)}function kt(e,t,n){if(typeof n!=`object`||!n)return t;let r={...t},i=!1;for(let[t,a]of Object.entries(n)){let n=Object.hasOwn(e,t)?e[t]:void 0;if(!n)continue;let o=Dt(n,a);o!==void 0&&o!==r[t]&&(r[t]=o,i=!0)}return i?r:t}function At(e,t){return Object.entries(t).every(([t,n])=>e[t]===n)}var jt=[`circle`,`rings`,`spiral`,`rays`];function Mt(){return Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4)}function Nt(){return Math.random()*4294967296>>>0}function Pt(e,t=200){let n=[],r=[],i=0,a=null,o=0,s=M(0),c=()=>s.value++,l=e=>{n.push(e),n.length>t&&n.shift(),r=[],c()};return{canUndo:nt(()=>s.value>=0&&n.length>0),canRedo:nt(()=>s.value>=0&&r.length>0),record(e){o>0||i>0||l(e)},begin(){i++===0&&(a=e.peek())},end(){if(i===0||--i>0)return;let t=a;a=null,o===0&&e.peek()!==t&&l(t)},inTransaction:()=>i>0,undo(){if(i>0)return;let t=n.pop();t!==void 0&&(r.push(e.peek()),e.value=t,c())},redo(){if(i>0)return;let t=r.pop();t!==void 0&&(n.push(e.peek()),e.value=t,c())},silently(e){o++;try{e()}finally{o--}},clear(){n=[],r=[],i=0,a=null,c()}}}function Ft(e=Tt()){return{version:5,mode:`carve`,settings:e,strokes:[],symmetry:null}}var P=M(Ft()),It=nt(()=>P.value.strokes),F=nt(()=>P.value.mode),Lt=Pt(P);function Rt(e){let t=P.peek(),n=e(t);n!==t&&(P.value=n,Lt.record(t))}function zt(e){P.value=e,Lt.clear()}var Bt=()=>Lt.begin(),Vt=()=>Lt.end();function Ht(e){Rt(t=>t.mode===e?t:{...t,mode:e})}function Ut(e){Rt(t=>{let n=t.settings.symMode!==`none`&&!e.symmetric?{...e,symmetric:!0}:e;return{...t,strokes:[...t.strokes,n]}})}function Wt(e,t){Rt(n=>{let r=n.strokes.findIndex(t=>t.id===e);if(r<0)return n;let i=[...n.strokes];return i[r]={...n.strokes[r],...t},{...n,strokes:i}})}function Gt(e){let t=new Set(e);Rt(e=>{let n=e.strokes.filter(e=>!t.has(e.id));return n.length===e.strokes.length?e:{...e,strokes:n}})}function Kt(e){Rt(()=>Ft(e))}var qt=e=>Math.round(e*10)/10;function Jt(e){return{stabilizer:Math.round(.004*e*e),simplify:qt(.04*e),fitTolerance:qt(.03*e+5e-4*e*e)}}var Yt={smoothing:{type:`number`,section:`path`,label:`Smoothing`,unit:`%`,min:0,max:100,step:1,default:50,drives:Jt,help:`How calm and flowing new lines are. Sets the stabilizer, simplify and curve fit together.`},stabilizer:{type:`number`,section:`path`,label:`Stabilizer`,advanced:!0,unit:`px`,min:0,max:80,step:1,default:10,help:`The brush trails the pointer on a string this long (screen pixels), absorbing wobble.`},simplify:{type:`number`,section:`path`,label:`Simplify`,advanced:!0,unit:`px`,min:0,max:10,step:.1,default:2,help:`Drops points that are within this distance of a straight line, for cleaner curves.`},fitTolerance:{type:`number`,section:`path`,label:`Curve fit`,advanced:!0,unit:`px`,min:0,max:20,step:.1,default:2.8,help:`Refits lines to smooth curves that stay within this distance of what you drew. 0 = off.`},taper:{type:`number`,section:`path`,label:`Taper`,advanced:!0,unit:`px`,min:0,max:500,step:1,default:0,help:`Thins the line out over this distance at its start and end. 0 = blunt ends.`},speedWidth:{type:`number`,section:`path`,label:`Speed width`,advanced:!0,min:0,max:1,step:.01,default:0,help:`Speed as pressure: slower drawing makes the line wider and deeper. 0 = off.`},cornerMode:{type:`select`,section:`path`,label:`Corners`,advanced:!0,default:`sharp`,options:[{value:`sharp`,label:`Keep sharp`},{value:`round`,label:`Round`}],help:`What happens at sharp turns in a line.`},cornerAngle:{type:`number`,section:`path`,label:`Corner angle`,advanced:!0,unit:`°`,min:20,max:170,step:1,default:70,help:`Turns sharper than this count as corners.`},cornerRadius:{type:`number`,section:`path`,label:`Corner radius`,advanced:!0,unit:`px`,min:0,max:200,step:1,default:12,help:`How round corners are when Corners is set to Round.`}},Xt=Object.keys(Yt);function Zt(){return wt(Yt)}function Qt(e,t=Zt()){return kt(Yt,t,e)}var $t=`glyphy`,en=class extends Error{},tn=e=>typeof e==`object`&&!!e&&!Array.isArray(e),nn=e=>typeof e==`number`&&Number.isFinite(e);function rn(e){return JSON.stringify({format:$t,version:5,mode:e.mode,settings:e.settings,strokes:e.strokes,symmetry:e.symmetry})}function an(e){let t=nn(e.version)?e.version:1;if(t>5)throw new en(`This file was saved by a newer version of Glyphy.`);let n=e;if(t===1){let e=tn(n.settings)?n.settings:{},r={smoothing:e.pathSmoothing,stabilizer:e.pathStabilizer,simplify:e.pathSimplify,fitTolerance:e.pathFitTolerance,cornerMode:e.pathCornerMode,cornerAngle:e.pathCornerAngle,cornerRadius:e.pathCornerRadius},i=Array.isArray(n.strokes)?n.strokes.map(e=>tn(e)&&!tn(e.path)?{...e,path:r}:e):n.strokes;n={...n,strokes:i},t=2}return t===2&&(t=3),t===3&&(t=4),t===4&&(t=5),{...n,version:t}}var on=[`line`,`fill`,`cupule`,`eraser`,`damage`];function sn(e,t,n){return!Array.isArray(e)||e.length<t*n||e.length%t!==0||!e.every(nn)?null:e}function cn(e){if(!tn(e))return null;switch(e.type){case`freehand`:{let t=sn(e.points,3,1);return t&&{type:`freehand`,points:t}}case`polyline`:{let t=sn(e.points,2,1);return t&&{type:`polyline`,points:t}}case`bezier`:{let t=sn(e.nodes,4,1);return t&&{type:`bezier`,nodes:t}}case`shape`:{let t=jt.includes(e.shape)?e.shape:null;return!t||!nn(e.cx)||!nn(e.cy)||!nn(e.radius)||!nn(e.angle)||e.radius<=0?null:{type:`shape`,shape:t,cx:e.cx,cy:e.cy,radius:e.radius,angle:e.angle}}case`region`:{if(!Array.isArray(e.loops))return null;let t=e.loops.map(e=>sn(e,2,3)).filter(e=>e!==null);return t.length?{type:`region`,loops:t}:null}default:return null}}function ln(e){if(!tn(e)||typeof e.id!=`string`||!e.id)return null;let t=on.includes(e.kind)?e.kind:null,n=cn(e.input);if(!t||!n||!nn(e.size)||e.size<=0)return null;let r={};if(tn(e.params))for(let[t,n]of Object.entries(e.params))(nn(n)||typeof n==`boolean`||typeof n==`string`)&&(r[t]=n);let i={id:e.id,tool:typeof e.tool==`string`?e.tool:`freehand`,kind:t,input:n,closed:e.closed===!0,filled:e.filled===!0,size:e.size,depth:nn(e.depth)?Math.min(1,Math.max(0,e.depth)):.5,path:Qt(e.path),seed:nn(e.seed)?e.seed>>>0:0,params:r};return typeof e.groupId==`string`&&(i.groupId=e.groupId),e.symmetric===!0&&(i.symmetric=!0),i}function un(e){let t;try{t=JSON.parse(e)}catch{throw new en(`This file isn't valid JSON.`)}if(!tn(t)||t.format!==`glyphy`)throw new en(`This isn't a Glyphy project file.`);let n=an(t),r=n.mode===`raised`?`raised`:`carve`,i=Array.isArray(n.strokes)?n.strokes.map(ln).filter(e=>e!==null):[];return{version:5,mode:r,settings:Ot(Tt(),n.settings),strokes:i,symmetry:null}}function dn(e){let t=/^#?([0-9a-f]{6})$/i.exec(e.trim()),n=t?parseInt(t[1],16):0;return[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]}function fn(e){let t=e=>Math.round(Math.min(1,Math.max(0,e))*255).toString(16).padStart(2,`0`);return`#${t(e[0])}${t(e[1])}${t(e[2])}`}function pn([e,t,n]){let r=Math.max(e,t,n),i=Math.min(e,t,n),a=(r+i)/2;if(r===i)return[0,0,a];let o=r-i,s=a>.5?o/(2-r-i):o/(r+i),c=r===e?(t-n)/o+(t<n?6:0):r===t?(n-e)/o+2:(e-t)/o+4;return c/=6,[c,s,a]}function mn([e,t,n]){if(t===0)return[n,n,n];let r=n<.5?n*(1+t):n+t-n*t,i=2*n-r,a=e=>{let t=(e%1+1)%1;return t<1/6?i+(r-i)*6*t:t<1/2?r:t<2/3?i+(r-i)*(2/3-t)*6:i};return[a(e+1/3),a(e),a(e-1/3)]}function hn(e){let[t,n,r]=pn(e);return mn([t,n*.55,r+(1-r)*.5])}function gn(e){let[t,n,r]=pn(e);return mn([(t+((.06-t+1.5)%1-.5)*.5+1)%1,Math.min(1,Math.max(n,.25)*1.2),r*.5])}function _n(e){let t=0,n=0,r=0,i=0;for(let a=0;a+3<e.length;a+=4)e[a+3]<128||(t+=e[a],n+=e[a+1],r+=e[a+2],i++);return i>0?[t/i/255,n/i/255,r/i/255]:[.5,.5,.5]}var vn=[1,0,0,1,0,0],I=(e,t)=>[1,0,0,1,e,t],yn=(e,t=e)=>[e,0,0,t,0,0];function bn(e){let t=Math.cos(e),n=Math.sin(e);return[t,n,-n,t,0,0]}function xn(e,t){return[e[0]*t[0]+e[2]*t[1],e[1]*t[0]+e[3]*t[1],e[0]*t[2]+e[2]*t[3],e[1]*t[2]+e[3]*t[3],e[0]*t[4]+e[2]*t[5]+e[4],e[1]*t[4]+e[3]*t[5]+e[5]]}function Sn(...e){return e.reduce((e,t)=>xn(t,e),vn)}function Cn(e){let[t,n,r,i,a,o]=e,s=t*i-n*r;if(Math.abs(s)<1e-12)throw Error(`Matrix is not invertible`);return[i/s,-n/s,-r/s,t/s,(r*o-i*a)/s,(n*a-t*o)/s]}function wn(e,t){return{x:e[0]*t.x+e[2]*t.y+e[4],y:e[1]*t.x+e[3]*t.y+e[5]}}function Tn(e){return new Float32Array([e[0],e[1],0,e[2],e[3],0,e[4],e[5],1])}function En(e,t){let n=Math.imul(e^2654435769,2246822507)^Math.imul(t,3266489909);return n=Math.imul(n^n>>>16,2146121005),n=Math.imul(n^n>>>15,2221713035),(n^n>>>16)>>>0}var Dn=e=>e/4294967296*2-1;function On(e,t){let n=Math.floor(e),r=e-n,i=Dn(En(t,n)),a=Dn(En(t,n+1)),o=r*r*r*(r*(r*6-15)+10);return i+(a-i)*o}function kn(e,t){return(On(e,t)*2+On(e*2.1,t+7919))/3}function An(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var jn=Math.PI/180;function Mn(e,t,n){let r=Math.cos(2*n*jn),i=Math.sin(2*n*jn);return Sn(I(-e,-t),[r,i,i,-r,0,0],I(e,t))}function Nn(e,t,n){return Sn(I(-e,-t),bn(n*jn),I(e,t))}function Pn(e){let t=Math.max(1,Math.round(e.count)),n=[];switch(e.mode){case`mirror`:n.push(I(0,0),Mn(e.cx,e.cy,e.angle)),e.twoAxes&&n.push(Mn(e.cx,e.cy,e.angle+90),Nn(e.cx,e.cy,180));break;case`radial`:for(let r=0;r<t;r++)n.push(Nn(e.cx,e.cy,360*r/t));break;case`kaleidoscope`:{let r=Mn(e.cx,e.cy,e.angle);for(let r=0;r<t;r++)n.push(Nn(e.cx,e.cy,360*r/t));for(let i=0;i<t;i++)n.push(Sn(r,Nn(e.cx,e.cy,360*i/t)));break}case`spiral`:for(let r=0;r<t;r++)n.push(Sn(I(-e.cx,-e.cy),yn(e.scaleStep**r),bn(r*e.rotStep*jn),I(e.cx,e.cy)));break;case`linear`:{let r=Math.cos(e.angle*jn)*e.spacing,i=Math.sin(e.angle*jn)*e.spacing;for(let e=0;e<t;e++)n.push(I(e*r,e*i));break}case`grid`:case`gridMirror`:for(let t=0;t<Math.max(1,Math.round(e.rows));t++)for(let r=0;r<Math.max(1,Math.round(e.cols));r++){let i=I(r*e.spacing+(t%2==1?e.brick*e.spacing:0),t*e.spacingY),a=[];e.mode===`gridMirror`&&e.flipCols&&r%2==1&&a.push(Mn(e.cx,e.cy,90)),e.mode===`gridMirror`&&e.flipRows&&t%2==1&&a.push(Mn(e.cx,e.cy,0)),n.push(Sn(...a,i))}break;case`none`:n.push(I(0,0))}return n}function Fn(e){if(e.inner===`mirror`)return[I(0,0),Mn(e.cx,e.cy,e.angle)];if(e.inner===`radial`){let t=Math.max(1,Math.round(e.innerCount));return Array.from({length:t},(n,r)=>Nn(e.cx,e.cy,360*r/t))}return[I(0,0)]}function In(e){if(e.mode===`none`)return[I(0,0)];let t=[];for(let n of Pn(e))for(let r of Fn(e))t.push(Sn(r,n));return t.slice(0,256)}function Ln(e,t,n,r){if(t<=0||e===0)return I(0,0);let i=An((n^Math.imul(e,2654435761))>>>0),a=(i()-.5)*8*t;return Sn(Nn(r.x,r.y,a),I((i()-.5)*12*t,(i()-.5)*12*t))}var Rn=wn,zn=e=>e[0]*e[3]-e[1]*e[2]<0,Bn=e=>Math.sqrt(Math.abs(e[0]*e[3]-e[1]*e[2])),Vn=e=>Math.round(e*100)/100||0;function Hn(e,t,n){return[Vn(e[0]*t+e[2]*n+e[4]),Vn(e[1]*t+e[3]*n+e[5])]}function Un(e,t,n){let r=t.slice();for(let i=0;i+1<t.length;i+=n){let[n,a]=Hn(e,t[i],t[i+1]);r[i]=n,r[i+1]=a}return r}function Wn(e){let t=[];for(let n=e.length-2;n>=0;n-=2)t.push(e[n],e[n+1]);return t}function Gn(e,t,n){switch(t.type){case`freehand`:return{type:`freehand`,points:Un(e,t.points,3)};case`polyline`:return{type:`polyline`,points:Un(e,t.points,2)};case`bezier`:{let n=t.nodes.slice();for(let t=0;t+3<n.length;t+=4){let[r,i]=Hn(e,n[t],n[t+1]),a=n[t+2],o=n[t+3];n[t]=r,n[t+1]=i,n[t+2]=Vn(e[0]*a+e[2]*o),n[t+3]=Vn(e[1]*a+e[3]*o)}return{type:`bezier`,nodes:n}}case`shape`:{let[n,r]=Hn(e,t.cx,t.cy),i=e[0]*Math.cos(t.angle)+e[2]*Math.sin(t.angle),a=e[1]*Math.cos(t.angle)+e[3]*Math.sin(t.angle);return{...t,cx:n,cy:r,radius:t.radius*Bn(e),angle:Math.atan2(a,i)}}case`region`:return{type:`region`,loops:t.loops.map(t=>n?Wn(Un(e,t,2)):Un(e,t,2))}}}function Kn(e,t,n){let r=zn(t),i={...e.params};r&&e.input.type===`shape`&&e.input.shape===`spiral`&&(i.direction=i.direction===`cw`?`ccw`:`cw`);let a={...e,id:`${e.id}~${n}`,input:Gn(t,e.input,r),size:e.size*Bn(t),seed:e.seed+Math.imul(n,625341585)>>>0,params:i};return delete a.symmetric,a}function qn(e){let t=e.symMode;return t===`none`?null:{mode:t,count:e.symCount,twoAxes:e.symTwoAxes,angle:e.symAngle,cx:e.symCenterX/100*e.canvasWidth,cy:e.symCenterY/100*e.canvasHeight,rotStep:e.symRotStep,scaleStep:e.symScaleStep,spacing:e.symSpacing,spacingY:e.symSpacingY,cols:e.symCols,rows:e.symRows,brick:e.symBrick,flipCols:e.symFlipCols,flipRows:e.symFlipRows,inner:e.symInner===`mirror`||e.symInner===`radial`?e.symInner:`none`,innerCount:e.symInnerCount,variation:e.symVariation}}var Jn=e=>JSON.stringify(e);function Yn(e){let t=e.input;switch(t.type){case`freehand`:case`polyline`:return{x:t.points[0]??0,y:t.points[1]??0};case`bezier`:return{x:t.nodes[0]??0,y:t.nodes[1]??0};case`shape`:return{x:t.cx,y:t.cy};case`region`:return{x:t.loops[0]?.[0]??0,y:t.loops[0]?.[1]??0}}}var Xn=new WeakMap;function Zn(e,t,n=Jn(t)){let r=Xn.get(e);if(r&&r.key===n)return r.copies;let i=Yn(e),a=In(t).slice(1).map((n,r)=>{let a=r+1;return Kn(e,Sn(n,Ln(a,t.variation,e.seed,Rn(n,i))),a)});return Xn.set(e,{key:n,copies:a}),a}function Qn(e,t){if(!t||!e.some(e=>e.symmetric))return e;let n=Jn(t);if($n&&$n.strokes===e&&$n.key===n)return $n.out;let r=e.flatMap(e=>e.symmetric?[e,...Zn(e,t,n)]:[e]);return $n={strokes:e,key:n,out:r},r}var $n=null,er=e=>e.split(`~`)[0];function tr(e,t){return e.flatMap(e=>{if(!e.symmetric)return[e];let{symmetric:n,...r}=e;if(!t)return[r];let i=e.groupId??`sym-${e.id}`;return[{...r,groupId:i},...Zn(e,t).map(e=>({...e,id:Mt(),groupId:i}))]})}var L=nt(()=>P.value.settings);function nr(e){Rt(t=>t.settings===e?t:t.settings.symMode!==`none`&&e.symMode===`none`&&t.strokes.some(e=>e.symmetric)?{...t,settings:e,strokes:tr(t.strokes,qn(t.settings))}:{...t,settings:e})}function rr(e,t){let n=N[e];ir({...n.type===`number`&&n.drives&&typeof t==`number`?n.drives(t):{},[e]:t})}function ir(e){nr(Ot(P.value.settings,e))}var ar=1024;function or(e){return{source:e?.source===`material`?`material`:`photo`,tileSize:e?.tiling?e.tileSize&&e.tileSize>0?e.tileSize:ar:null,heightEncoding:e?.heightEncoding===`rg16`?`rg16`:`gray8`}}function sr(e){return new Promise(t=>{let n=new Image;n.onload=()=>t(n),n.onerror=()=>t(null),n.src=e})}var cr=M(null),lr=M(null),R=M(null),ur=M(null),dr=M(null),fr=M(null),pr=e=>`./${e}`,mr=(e,t)=>pr(`backgrounds/${encodeURIComponent(e)}/${t}`);async function hr(e){let t=await fetch(e);if(!t.ok)throw Error(`${t.status} ${t.statusText}`);return await t.json()}var gr={backgroundScale:N.backgroundScale.default,backgroundOffsetX:N.backgroundOffsetX.default,backgroundOffsetY:N.backgroundOffsetY.default,backgroundRotation:N.backgroundRotation.default,backgroundReliefStrength:N.backgroundReliefStrength.default,backgroundNormalDetail:N.backgroundNormalDetail.default};function _r(e){let t=e?.naturalLight;return t?{lightAngle:t.angle,lightElevation:t.elevation}:{}}var vr=new Map;async function yr(e,t=`photo`){let n=await br(e);return n?t===`material`?{carveSurfaceColor:fn(gn(n))}:{carveSurfaceColor:fn(n),carveInteriorColor:fn(hn(n))}:{}}async function br(e){let t=vr.get(e);if(t)return t;let n=await sr(mr(e,`thumb.jpg`));if(!n)return null;try{let t=document.createElement(`canvas`);t.width=t.height=32;let r=t.getContext(`2d`,{willReadFrequently:!0});r.drawImage(n,0,0,32,32);let i=_n(r.getImageData(0,0,32,32).data);return vr.set(e,i),i}catch{return null}}async function xr(e){let t=R.value?.id===e?R.value:null,n=e?await yr(e,t?.source):{};return{..._r(t),...n,...t?.defaults??{}}}async function Sr(e,{record:t=!0}={}){if(e===L.value.backgroundId)return;let n=await hr(mr(e,`bundle.json`)).catch(()=>null),r=await yr(e,n?.source);R.value=n;let i=()=>ir({...gr,..._r(n),...r,...n?.defaults??{},backgroundId:e});t?i():Lt.silently(i)}var Cr=!1;function wr(){if(Cr)return;Cr=!0,hr(pr(`backgrounds/index.json`)).then(e=>{cr.value=e.backgrounds;let t=e.backgrounds[0],n=L.value.backgroundId,r=e.backgrounds.some(e=>e.id===n);(!n||!r)&&t&&Sr(t.id,{record:!1})}).catch(e=>{lr.value=`Couldn't load the rock list (${String(e)}).`});let e=``;st(()=>{let t=L.value.backgroundId;if(t===e)return;if(e=t,!t){ur.value=null;return}let n=R.peek(),r=n?.id===t?Promise.resolve(n):hr(mr(t,`bundle.json`)).then(n=>(e===t&&(R.value=n),n)).catch(()=>null);dr.value=t,fr.value=null;let i=Promise.all([`photo.jpg`,`height.png`,`cracks.png`,`interior.jpg`,`normal.png`].map(e=>sr(mr(t,e))));Promise.all([i,r]).then(([[n,r,i,a,o],s])=>{dr.value===t&&(dr.value=null),e===t&&(n?ur.value={id:t,image:n,height:r??null,cracks:i??null,interior:a??null,normal:o??null,layout:or(s)}:fr.value=`Couldn't load this rock photo.`)})})}function Tr(e,t,n=`application/json`){Er(e,new Blob([t],{type:n}))}function Er(e,t){let n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=e,document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}function Dr(e,t){Tr(e,JSON.stringify(t,null,2)+`
`)}function Or(e){return new Promise(t=>{let n=document.createElement(`input`);n.type=`file`,n.accept=e,n.addEventListener(`change`,()=>t(n.files?.[0]??null),{once:!0}),n.addEventListener(`cancel`,()=>t(null),{once:!0}),n.click()})}async function kr(e,t){return Dr(e.split(`/`).pop(),t),`downloaded`}function Ar(e=new Date){let t=e=>String(e).padStart(2,`0`);return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}-${t(e.getHours())}${t(e.getMinutes())}`}var z=M(Zt()),jr=M(Zt()),Mr=!1;function Nr(e,t){let n=Yt[e];z.value=Qt({...`drives`in n&&typeof t==`number`?n.drives(t):{},[e]:t},z.value),Mr=!0}function Pr(e){z.value=Qt(e,z.value),Mr=!0}function Fr(e){jr.value=Qt(e,Zt()),Mr||(z.value=jr.value)}function Ir(){z.value=jr.value}var B=M(null),Lr=M(null),Rr=M(null),zr=M(null),Br;function Vr(e,t=4e3){zr.value=e,clearTimeout(Br),Br=setTimeout(()=>zr.value=null,t)}var Hr=M({}),Ur=M({});function Wr(e,t){switch(e.type){case`toggle`:return typeof t==`boolean`?t:void 0;case`select`:return e.options.some(e=>e.value===t)?t:void 0;default:return typeof t==`number`&&Number.isFinite(t)?Math.min(e.max,Math.max(e.min,t)):void 0}}function Gr(e,t){let n=e.params?.[t];if(!n)throw Error(`Tool ${e.id} has no param ${t}`);return Wr(n,Hr.value[e.id]?.[t])??Wr(n,Ur.value[e.id]?.[t])??n.default}function V(e,t){let n=Gr(e,t);return typeof n==`number`?n:0}function Kr(e,t,n){let r=e.params?.[t],i=r?Wr(r,n):void 0;if(i===void 0)return;let a=Hr.value;Hr.value={...a,[e.id]:{...a[e.id],[t]:i}}}var qr=64,Jr=class{points=new Map;segs=new Map;constructor(e){for(let t of e){for(let e of t.points)this.add(this.points,Yr(Math.floor(e.x/qr),Math.floor(e.y/qr)),{p:e,id:t.id});for(let e of t.paths){let n=e.points,r=n.length/2,i=e.closed?r:r-1;for(let e=0;e<i;e++){let i=(e+1)%r,a={ax:n[2*e],ay:n[2*e+1],bx:n[2*i],by:n[2*i+1],id:t.id},o=Math.floor(Math.min(a.ax,a.bx)/qr),s=Math.floor(Math.max(a.ax,a.bx)/qr),c=Math.floor(Math.min(a.ay,a.by)/qr),l=Math.floor(Math.max(a.ay,a.by)/qr);for(let e=c;e<=l;e++)for(let t=o;t<=s;t++)this.add(this.segs,Yr(t,e),a)}}}}add(e,t,n){let r=e.get(t);r?r.push(n):e.set(t,[n])}*cells(e,t){let n=Math.floor((e.x-t)/qr),r=Math.floor((e.x+t)/qr),i=Math.floor((e.y-t)/qr),a=Math.floor((e.y+t)/qr);for(let e=i;e<=a;e++)for(let t=n;t<=r;t++)yield Yr(t,e)}nearestPoint(e,t,n){let r=null,i=t;for(let a of this.cells(e,t))for(let{p:t,id:o}of this.points.get(a)??[]){if(o===n)continue;let a=Math.hypot(t.x-e.x,t.y-e.y);a<=i&&(i=a,r={x:t.x,y:t.y,kind:`point`,strokeId:o})}return r}nearestOnPath(e,t,n){let r=null,i=t;for(let a of this.cells(e,t))for(let t of this.segs.get(a)??[]){if(t.id===n)continue;let a=t.bx-t.ax,o=t.by-t.ay,s=a*a+o*o,c=s>0?Math.max(0,Math.min(1,((e.x-t.ax)*a+(e.y-t.ay)*o)/s)):0,l=t.ax+c*a,u=t.ay+c*o,d=Math.hypot(l-e.x,u-e.y);if(d<=i){i=d;let e=Math.sqrt(s)||1;r={x:l,y:u,kind:`path`,tangent:{x:a/e,y:o/e},strokeId:t.id}}}return r}},Yr=(e,t)=>(e+524288)*1048576+(t+524288);function Xr(e,t){if(t.index){let n=t.index.nearestPoint(e,t.maxDist,t.exclude);if(n)return n;let r=t.index.nearestOnPath(e,t.maxDist,t.exclude);if(r)return r}return t.grid&&t.grid>0?{x:Math.round(e.x/t.grid)*t.grid,y:Math.round(e.y/t.grid)*t.grid,kind:`grid`}:null}var Zr=(e,t)=>({x:e.x+t.x,y:e.y+t.y}),H=(e,t)=>({x:e.x-t.x,y:e.y-t.y}),Qr=(e,t)=>({x:e.x*t,y:e.y*t}),U=(e,t)=>e.x*t.x+e.y*t.y,$r=(e,t)=>e.x*t.y-e.y*t.x,ei=e=>Math.hypot(e.x,e.y),ti=(e,t)=>Math.hypot(e.x-t.x,e.y-t.y),ni=(e,t,n)=>({x:e.x+(t.x-e.x)*n,y:e.y+(t.y-e.y)*n});function ri(e){let t=ei(e);return t>1e-12?{x:e.x/t,y:e.y/t}:{x:0,y:0}}function ii(e,t){return Math.atan2(Math.abs($r(e,t)),U(e,t))}function ai(e,t,n){let r=H(n,t),i=U(r,r);if(i<1e-12)return ti(e,t);let a=Math.max(0,Math.min(1,U(H(e,t),r)/i));return ti(e,{x:t.x+r.x*a,y:t.y+r.y*a})}function oi(e,t){let n=1-t,r=n*n*n,i=3*n*n*t,a=3*n*t*t,o=t*t*t;return{x:r*e[0].x+i*e[1].x+a*e[2].x+o*e[3].x,y:r*e[0].y+i*e[1].y+a*e[2].y+o*e[3].y}}function si(e,t){let n=1-t,r=3*n*n,i=6*n*t,a=3*t*t;return{x:r*(e[1].x-e[0].x)+i*(e[2].x-e[1].x)+a*(e[3].x-e[2].x),y:r*(e[1].y-e[0].y)+i*(e[2].y-e[1].y)+a*(e[3].y-e[2].y)}}function ci(e,t){let n=1-t;return{x:6*n*(e[2].x-2*e[1].x+e[0].x)+6*t*(e[3].x-2*e[2].x+e[1].x),y:6*n*(e[2].y-2*e[1].y+e[0].y)+6*t*(e[3].y-2*e[2].y+e[1].y)}}function li(e,t){let n=ni(e[0],e[1],t),r=ni(e[1],e[2],t),i=ni(e[2],e[3],t),a=ni(n,r,t),o=ni(r,i,t),s=ni(a,o,t);return[[e[0],n,a,s],[s,o,i,e[3]]]}function ui(e,t){return[e,ni(e,t,1/3),ni(e,t,2/3),t]}var di=24;function fi(e){let t=[0],n=e[0],r=0;for(let i=1;i<=di;i++){let a=oi(e,i/di);r+=ti(n,a),t.push(r),n=a}return t}function pi(e){return fi(e)[di]}function mi(e,t){let n=fi(e),r=n[di];if(t<=0)return 0;if(t>=r)return 1;let i=1;for(;n[i]<t;)i++;let a=n[i-1],o=n[i];return(i-1+(t-a)/Math.max(1e-12,o-a))/di}function hi(e,t){let n=[];return e.forEach((e,r)=>{r===0&&n.push(e[0].x,e[0].y);let i=Math.max(1,Math.ceil(pi(e)/t));for(let t=1;t<=i;t++){let r=oi(e,t/i);n.push(r.x,r.y)}}),n}var gi=(e,t,n)=>Zr(e,Qr(t,n));function _i(e){let t=[];for(let n=0;n+1<e.length;n+=3)t.push({x:e[n],y:e[n+1]});return t}function vi(e){let t=[0];for(let n=1;n<e.length;n++)t.push(t[n-1]+ti(e[n-1],e[n]));return t}function yi(e,t,n){if(n<=0)return e[0];if(n>=t[t.length-1])return e[e.length-1];let r=0,i=t.length-1;for(;i-r>1;){let e=r+i>>1;t[e]<=n?r=e:i=e}let a=t[i]-t[r];return ni(e[r],e[i],a>0?(n-t[r])/a:0)}function bi(e,t,n){let r=e.length;if(r<3)return[];let i=vi(e),a=new Float64Array(r);for(let t=1;t<r-1;t++){let r=yi(e,i,i[t]-n),o=yi(e,i,i[t]+n),s=H(e[t],r),c=H(o,e[t]);a[t]=Math.hypot(s.x,s.y)>1e-9&&Math.hypot(c.x,c.y)>1e-9?ii(s,c):0}let o=[];for(let e=1;e<r-1;e++){if(a[e]<=t)continue;let s=!0;for(let t=e-1;t>=1&&i[e]-i[t]<=n;t--)a[t]>=a[e]&&(s=!1);for(let t=e+1;t<r-1&&i[t]-i[e]<=n;t++)a[t]>a[e]&&(s=!1);s&&o.push(e)}return o}function xi(e,t,n){if(n<=0)return null;let r=ii(si(e,1),si(t,0));if(r<.001)return null;let i=pi(e),a=pi(t),o=Math.min(n*Math.tan(Math.min(r,Math.PI-.001)/2),i/2,a/2);if(o<1e-6)return null;let s=li(e,mi(e,i-o))[0],c=li(t,mi(t,o))[1],l=s[3],u=c[0],d=ri(si(s,1)),f=ri(si(c,0)),p=ii(d,f),m=ti(l,u),h=m/3;if(p>.001){let e=m/(2*Math.sin(p/2));h=4/3*Math.tan(p/4)*e}return[s,[l,gi(l,d,h),gi(u,f,-h),u],c]}var Si=4;function Ci(e,t,n,r){let i=e.length;if(i<2)return[];if(i===2)return[ui(e[0],e[1])];let a=n??ri(H(e[1],e[0])),o=r??ri(H(e[i-2],e[i-1])),s=[];return wi(e,0,i-1,a,o,Math.max(1e-6,t*t),s),s}function wi(e,t,n,r,i,a,o){if(n-t===1){let a=e[t],s=e[n],c=ti(a,s)/3;o.push([a,gi(a,r,c),gi(s,i,c),s]);return}let s=Ti(e,t,n),c=Ei(e,t,n,s,r,i),{maxSq:l,split:u}=Di(e,t,n,c,s);if(l<=a){o.push(c);return}if(l<=a*16){for(let d=0;d<Si;d++)if(s=Oi(e,t,s,c),c=Ei(e,t,n,s,r,i),{maxSq:l,split:u}=Di(e,t,n,c,s),l<=a){o.push(c);return}}let d=ri(H(e[u-1],e[u+1])),f=U(d,d)>0?d:ri(H(e[u-1],e[u]));wi(e,t,u,r,f,a,o),wi(e,u,n,{x:-f.x,y:-f.y},i,a,o)}function Ti(e,t,n){let r=[0];for(let i=t+1;i<=n;i++)r.push(r[r.length-1]+ti(e[i],e[i-1]));let i=r[r.length-1];return i>0?r.map(e=>e/i):r.map((e,t)=>t/(r.length-1))}function Ei(e,t,n,r,i,a){let o=e[t],s=e[n],c=0,l=0,u=0,d=0,f=0;for(let n=0;n<r.length;n++){let p=r[n],m=1-p,h=3*m*m*p,g=3*m*p*p,_={x:i.x*h,y:i.y*h},v={x:a.x*g,y:a.y*g};c+=U(_,_),l+=U(_,v),u+=U(v,v);let y=m*m*m+3*m*m*p,b=3*m*p*p+p*p*p,x=H(e[t+n],{x:o.x*y+s.x*b,y:o.y*y+s.y*b});d+=U(_,x),f+=U(v,x)}let p=c*u-l*l,m=ti(o,s),h=1e-6*m,g=0,_=0;Math.abs(p)>1e-12&&(g=(d*u-f*l)/p,_=(c*f-l*d)/p);let v=0;for(let r=t+1;r<=n;r++)v+=ti(e[r-1],e[r]);let y=H(s,o),b=U({x:i.x*g,y:i.y*g},y)-U({x:a.x*_,y:a.y*_},y)>m*m;return(!(g>h)||!(_>h)||g>v||_>v||b)&&(g=_=m/3),[o,gi(o,i,g),gi(s,a,_),s]}function Di(e,t,n,r,i){let a=0,o=Math.floor((t+n)/2);for(let s=t+1;s<n;s++){let n=H(oi(r,i[s-t]),e[s]),c=U(n,n);c>=a&&(a=c,o=s)}return{maxSq:a,split:o}}function Oi(e,t,n,r){return n.map((n,i)=>{let a=e[t+i],o=H(oi(r,n),a),s=si(r,n),c=ci(r,n),l=U(o,s),u=U(s,s)+U(o,c);return Math.abs(u)<1e-12?n:Math.min(1,Math.max(0,n-l/u))})}function ki(e,t){if(e.length<=2||t<=0)return e.slice();let n=new Uint8Array(e.length);n[0]=1,n[e.length-1]=1;let r=[[0,e.length-1]];for(;r.length>0;){let[i,a]=r.pop(),o=-1,s=-1;for(let t=i+1;t<a;t++){let n=ai(e[t],e[i],e[a]);n>o&&(o=n,s=t)}s>=0&&o>t&&(n[s]=1,r.push([i,s],[s,a]))}return e.filter((e,t)=>n[t]===1)}function Ai(e,t=1e-6){let n=[];for(let r of e){let e=n[n.length-1];(!e||Math.hypot(r.x-e.x,r.y-e.y)>t)&&n.push(r)}let r=e[e.length-1];return r&&n.length>1&&n[n.length-1]!==r&&(n[n.length-1]=r),n}var ji=1.5;function Mi(e,t,n){let r=n?[...e].reverse():e,i=vi(r);return ri(H(yi(r,i,Math.min(t,i[i.length-1]/2)),r[0]))}function Ni(e,t,n){if(t.fitTolerance<=0||e.length<3){let t=[];for(let n=1;n<e.length;n++)t.push(ui(e[n-1],e[n]));return t}return Ci(e,t.fitTolerance,Mi(e,n,!1),Mi(e,n,!0))}function Pi(e,t){let n=Ai(_i(e));if(n.length===0)return{curves:[],anchors:[],polyline:[]};if(n.length===1){let e=n[0];return{curves:[],anchors:[{...e,corner:!1}],polyline:[e.x,e.y]}}let r=ki(n,t.simplify),i=Math.max(4,3*t.simplify,1.5*t.fitTolerance),a=bi(r,t.cornerAngle*Math.PI/180,i),o=[],s=0;for(let e of[...a,r.length-1])o.push(r.slice(s,e+1)),s=e;let c=[],l=new Set;for(let e of o){let n=Ni(e,t,i);if(c.length>0&&n.length>0){let e=t.cornerMode===`round`?xi(c[c.length-1],n[0],t.cornerRadius):null;e?(c[c.length-1]=e[0],c.push(e[1]),n[0]=e[2]):l.add(c.length)}c.push(...n)}let u=c.map((e,t)=>({...e[0],corner:l.has(t)})),d=c[c.length-1];return d&&u.push({...d[3],corner:!1}),{curves:c,anchors:u,polyline:hi(c,ji)}}var Fi=new WeakMap;function Ii(e,t){let n=`${t.simplify}|${t.fitTolerance}|${t.cornerMode}|${t.cornerAngle}|${t.cornerRadius}`,r=Fi.get(e);if(r&&r.key===n)return r.path;let i=Pi(e,t);return Fi.set(e,{key:n,path:i}),i}var Li=e=>({label:`Line width`,min:1,max:200,step:1,default:e,unit:`px`,help:`Width of the carved line, in canvas pixels.`}),Ri={label:`Depth`,min:0,max:1,step:.01,default:.5,help:`How deep the shape is carved.`},zi={label:`Roundness`,min:.2,max:1,step:.01,default:1,help:`1 = a circle; lower = an ellipse, squashed across the drag direction.`},Bi={label:`Imperfection`,min:0,max:1,step:.01,default:.3,help:`How far the outline wanders from a perfect, computer-drawn curve.`},Vi={circle:{size:Li(24),depth:Ri,filled:{type:`toggle`,label:`Filled disc`,default:!1,help:`Peck out the whole disc instead of a ring.`},aspect:zi,imperfection:Bi},rings:{size:Li(16),depth:Ri,count:{label:`Rings`,min:1,max:20,step:1,default:4,help:`How many rings, from the outside in.`},spacing:{label:`Spacing`,min:4,max:200,step:1,default:30,unit:`px`,help:`Gap between neighbouring rings.`},spacingVariation:{label:`Spacing irregularity`,min:0,max:1,step:.01,default:.2,help:`How uneven the gaps are.`},aspect:zi,imperfection:{...Bi,advanced:!0}},spiral:{size:Li(18),depth:Ri,turns:{label:`Turns`,min:.5,max:12,step:.25,default:3,help:`How many times it winds around.`},spiralType:{type:`select`,label:`Type`,default:`archimedean`,options:[{value:`archimedean`,label:`Even (Archimedean)`},{value:`log`,label:`Opening (logarithmic)`}],help:`Evenly spaced arms, or arms that spread out as they grow.`},direction:{type:`select`,label:`Direction`,default:`ccw`,options:[{value:`ccw`,label:`Counter-clockwise`},{value:`cw`,label:`Clockwise`}],help:`Which way it winds outward.`},tail:{label:`Tail`,min:0,max:600,step:1,default:0,unit:`px`,help:`A straight line continuing from the outer end.`}},rays:{size:Li(14),depth:Ri,count:{label:`Rays`,min:2,max:60,step:1,default:12,help:`How many rays around the center.`},inner:{label:`Inner radius`,min:0,max:.9,step:.01,default:.25,help:`Where the rays start, as a fraction of the outer radius.`},lengthVariation:{label:`Length variation`,min:0,max:1,step:.01,default:.2,help:`How uneven the ray lengths are.`},spacingVariation:{label:`Spacing irregularity`,min:0,max:1,step:.01,default:.3,help:`How uneven the angles between the rays are.`}}};function Hi(e,t,n){let r=t[n],i=Vi[e][n];if(!i)throw Error(`Shape ${e} has no param ${n}`);return typeof r==typeof i.default?r:i.default}var Ui=1.5;function Wi(e,t){if(e<=0)return()=>1;let n=An(t),r=[2,3,4,5].map(e=>({k:e,amp:(.5+n())/e,phase:n()*Math.PI*2})),i=r.reduce((e,t)=>e+t.amp,0);return t=>1+.12*e*r.reduce((e,n)=>e+n.amp*Math.sin(n.k*t+n.phase),0)/i}function Gi(e){let t=Math.PI*(3*(e.rx+e.ry)-Math.sqrt((3*e.rx+e.ry)*(e.rx+3*e.ry))),n=Math.max(24,Math.ceil(t/Ui)),r=Wi(e.imperfection,e.seed),i=Math.cos(e.rotation),a=Math.sin(e.rotation),o=[];for(let t=0;t<n;t++){let s=t/n*Math.PI*2,c=r(s),l=e.rx*c*Math.cos(s),u=e.ry*c*Math.sin(s);o.push(e.cx+l*i-u*a,e.cy+l*a+u*i)}return{points:o,closed:!0}}function Ki(e){let t=An(e.seed^625341585),n=[],r=e.radius;for(let i=0;i<Math.max(1,Math.round(e.count))&&!(r<1);i++)n.push(Gi({...e,rx:r,ry:r*e.aspect,seed:e.seed+i*977})),r-=e.spacing*(1+e.spacingVariation*(t()-.5));return n}var qi=.06;function Ji(e){let t=Math.max(.25,e.turns)*Math.PI*2,n=e.radius*qi,r=Math.log(1/qi)/t,i=i=>e.type===`log`?e.radius*Math.exp(r*(i-t)):n+(e.radius-n)*(i/t),a=-e.direction,o=n=>{let r=e.angle+a*(n-t),o=i(n);return{x:e.cx+o*Math.cos(r),y:e.cy+o*Math.sin(r)}},s=[],c=0;for(;;){let e=o(c);if(s.push(e.x,e.y),c>=t)break;c=Math.min(t,c+Ui/Math.max(i(c),Ui))}if(e.tail>0){let t=s.length,n=s[t-2],r=s[t-1],i=n-s[t-4],a=r-s[t-3],o=Math.hypot(i,a)||1,c=Math.ceil(e.tail/Ui);for(let t=1;t<=c;t++){let l=e.tail*t/c;s.push(n+i/o*l,r+a/o*l)}}return{points:s,closed:!1}}function Yi(e){let t=An(e.seed^1759714724),n=Math.max(1,Math.round(e.count)),r=[];for(let i=0;i<n;i++){let a=Math.PI*2/n,o=e.radius*(1-.6*e.lengthVariation*t()),s=e.angle+i*a+(i>0?.4*(e.angleJitter??0)*a*(t()-.5):0),c=Math.min(e.radius*e.inner,o-1),l=Math.cos(s),u=Math.sin(s),d=Math.max(1,Math.ceil((o-c)/Ui)),f=[];for(let t=0;t<=d;t++){let n=c+(o-c)*t/d;f.push(e.cx+l*n,e.cy+u*n)}r.push({points:f,closed:!1})}return r}function Xi(e,t,n){let r=n=>Hi(e.shape,t,n),i=e=>r(e),a={cx:e.cx,cy:e.cy,rotation:e.angle,seed:n};switch(e.shape){case`circle`:return[Gi({...a,rx:e.radius,ry:e.radius*i(`aspect`),imperfection:i(`imperfection`)})];case`rings`:return Ki({...a,radius:e.radius,aspect:i(`aspect`),count:i(`count`),spacing:i(`spacing`),spacingVariation:i(`spacingVariation`),imperfection:i(`imperfection`)});case`spiral`:return[Ji({cx:e.cx,cy:e.cy,radius:e.radius,angle:e.angle,turns:i(`turns`),type:r(`spiralType`)===`log`?`log`:`archimedean`,direction:r(`direction`)===`cw`?-1:1,tail:i(`tail`)})];case`rays`:return Yi({cx:e.cx,cy:e.cy,radius:e.radius,angle:e.angle,count:i(`count`),inner:i(`inner`),lengthVariation:i(`lengthVariation`),angleJitter:i(`spacingVariation`),seed:n})}}var Zi=[`rake`,`zigzag`,`dotrow`],Qi=e=>({label:`Depth`,min:0,max:1,step:.01,default:e,help:`How deep it's carved.`}),$i={rake:{size:{label:`Line width`,min:1,max:100,step:1,default:10,unit:`px`,help:`Width of each line.`},depth:Qi(.5),count:{label:`Lines`,min:2,max:15,step:1,default:5,help:`How many parallel lines.`},spacing:{label:`Spacing`,min:4,max:100,step:1,default:18,unit:`px`,help:`Distance between neighbouring lines.`},lengthVariation:{label:`Length variation`,min:0,max:1,step:.01,default:.2,help:`Lines start and end at slightly different places.`},spacingVariation:{label:`Spacing irregularity`,min:0,max:1,step:.01,default:.3,help:`How uneven the gaps between the lines are.`}},zigzag:{size:{label:`Line width`,min:1,max:100,step:1,default:12,unit:`px`,help:`Width of the line.`},depth:Qi(.5),amplitude:{label:`Amplitude`,min:2,max:150,step:1,default:20,unit:`px`,help:`How far the line swings to each side.`},frequency:{label:`Frequency`,min:.2,max:15,step:.1,default:2.5,help:`Waves per 100 px of path.`},sharpness:{label:`Sharpness`,min:0,max:1,step:.01,default:1,help:`0 = a smooth wave, 1 = sharp zigzag chevrons.`}},dotrow:{size:{label:`Dot size`,min:2,max:150,step:1,default:20,unit:`px`,help:`Diameter of each cupule.`},depth:Qi(.6),spacing:{label:`Spacing`,min:4,max:300,step:1,default:30,unit:`px`,help:`Distance between dot centers.`},sizeVariation:{label:`Size variation`,min:0,max:1,step:.01,default:.2,help:`How uneven the dot sizes are.`},spacingVariation:{label:`Spacing irregularity`,min:0,max:1,step:.01,default:.3,help:`How uneven the gaps between the dots are.`}}};function ea(e,t,n){let r=t[n],i=$i[e][n];if(!i)throw Error(`Pattern ${e} has no param ${n}`);return typeof r==typeof i.default?r:i.default}function ta(e,t=1.5){let n=[],r=[],i=e.length/2;if(i===0)return{pts:n,s:r};n.push(e[0],e[1]),r.push(0);let a=0,o=0;for(let s=1;s<i;s++){let i=e[2*s-2],c=e[2*s-1],l=e[2*s],u=e[2*s+1],d=Math.hypot(l-i,u-c),f=t-o;for(;f<=d;)n.push(i+(l-i)*f/d,c+(u-c)*f/d),a+=t,r.push(a),f+=t;o=d-(f-t)}let s=e[2*i-2],c=e[2*i-1];return Math.hypot(s-n[n.length-2],c-n[n.length-1])>.1&&(n.push(s,c),r.push(a+o)),{pts:n,s:r}}function na(e,t=3){let n=e.length/2,r=[];for(let i=0;i<n;i++){let a=Math.max(0,i-t),o=Math.min(n-1,i+t),s=e[2*o]-e[2*a],c=e[2*o+1]-e[2*a+1],l=Math.hypot(s,c)||1;r.push(-c/l,s/l)}return r}function ra(e,t,n,r){let i=t=>ea(e,n,t),a=e===`zigzag`?0:i(`spacingVariation`),{pts:o,s}=ta(t),c=o.length/2;if(c===0)return[];let l=s[c-1],u=An(r^1369682375);if(e===`dotrow`){let e=Math.max(1,i(`spacing`)),t=i(`sizeVariation`),n=[],r=0;for(let i=0;i<=l+1e-6;){for(;r<c-1&&s[r+1]<i;)r++;let l=Math.min(c-1,r+1),d=s[l]>s[r]?(i-s[r])/(s[l]-s[r]):0;n.push({points:[o[2*r]+(o[2*l]-o[2*r])*d,o[2*r+1]+(o[2*l+1]-o[2*r+1])*d],closed:!1,scale:1+t*(u()-.5)}),i+=e*(1+a*.6*(u()-.5))}return n}let d=na(o),f=(e,t=0,n=c-1)=>{let r=[];for(let i=t;i<=n;i++){let n=e(i),a=o[2*i]+d[2*i]*n,s=o[2*i+1]+d[2*i+1]*n,c=r.length;if(c>=2&&i>t){let e=o[2*i]-o[2*i-2],t=o[2*i+1]-o[2*i-1];if((a-r[c-2])*e+(s-r[c-1])*t<=0)continue}r.push(a,s)}return r};if(e===`zigzag`){let e=i(`amplitude`),t=i(`frequency`)/100,n=i(`sharpness`);return[{points:f(r=>{let i=2*Math.PI*t*s[r],a=2/Math.PI*Math.asin(Math.sin(i));return e*(Math.sin(i)*(1-n)+a*n)}),closed:!1}]}let p=Math.max(1,Math.round(i(`count`))),m=i(`spacing`),h=i(`lengthVariation`),g=[];for(let e=0;e<p;e++){let t=(e-(p-1)/2)*m+a*.4*m*(u()-.5),n=e=>e*.3*h*l,r=n(u()),i=l-n(u()),o=0;for(;o<c-1&&s[o]<r;)o++;let d=c-1;for(;d>o&&s[d]>i;)d--;let _=f(()=>t,o,d);_.length>=4&&g.push({points:_,closed:!1})}return g}var ia=new WeakMap;function aa(e){return e.input.type===`region`?!1:e.input.type!==`freehand`||typeof e.params.pattern==`string`}function oa(e){if(e.input.type===`region`)return{subpaths:e.input.loops.map(e=>({points:e,closed:!0})),curves:[],anchors:[]};if(!aa(e)&&e.input.type===`freehand`){let t=Ii(e.input.points,e.path);return{subpaths:[{points:t.polyline,closed:e.closed}],curves:t.curves,anchors:t.anchors}}let t=ia.get(e);if(t)return t;let n=sa(e);return ia.set(e,n),n}function sa(e){let t=e.input;switch(t.type){case`polyline`:{let n=[];for(let e=0;e+1<t.points.length;e+=2)n.push({x:t.points[e],y:t.points[e+1]});let r=typeof e.params.cornerRadius==`number`?e.params.cornerRadius:0;return la(ca(n,r),n,r<=0)}case`bezier`:{let e=t.nodes,n=[];for(let t=0;t+3<e.length;t+=4)n.push({x:e[t],y:e[t+1]});let r=[];for(let t=0;t+1<n.length;t++){let i=n[t],a=n[t+1],o={x:e[t*4+2],y:e[t*4+3]},s={x:e[(t+1)*4+2],y:e[(t+1)*4+3]};r.push([i,{x:i.x+o.x,y:i.y+o.y},{x:a.x-s.x,y:a.y-s.y},a])}return la(r,n,!1)}case`shape`:return{subpaths:Xi(t,e.params,e.seed),curves:[],anchors:[{x:t.cx,y:t.cy,corner:!1}]};case`region`:return{subpaths:t.loops.map(e=>({points:e,closed:!0})),curves:[],anchors:[]};case`freehand`:{let n=e.params.pattern;return Zi.includes(n)?{subpaths:ra(n,Ii(t.points,e.path).polyline,e.params,e.seed),curves:[],anchors:[]}:{subpaths:[],curves:[],anchors:[]}}}}function ca(e,t){let n=[];for(let r=1;r<e.length;r++){let i=ui(e[r-1],e[r]),a=n[n.length-1],o=a?xi(a,i,t):null;o?(n[n.length-1]=o[0],n.push(o[1],o[2])):n.push(i)}return n}function la(e,t,n){let r=e.length>0?hi(e,ji):t[0]?[t[0].x,t[0].y]:[];return{subpaths:r.length?[{points:r,closed:!1}]:[],curves:e,anchors:t.map((e,r)=>({...e,corner:n&&r>0&&r<t.length-1}))}}var ua=Math.PI/180;function da(e,t,n){let r=2*Math.hypot(t,n),i={x:e.cx,y:e.cy},a=(t,n=!1)=>{let i=Math.cos(t*ua)*r,a=Math.sin(t*ua)*r;return n?[e.cx,e.cy,e.cx+i,e.cy+a]:[e.cx-i,e.cy-a,e.cx+i,e.cy+a]},o=Math.max(1,Math.round(e.count));switch(e.mode){case`mirror`:return{center:i,lines:e.twoAxes?[a(e.angle),a(e.angle+90)]:[a(e.angle)],hasAngle:!0};case`radial`:case`kaleidoscope`:return{center:i,lines:Array.from({length:o},(t,n)=>a(e.angle+360*n/o,!0)),hasAngle:!0};case`spiral`:return{center:i,lines:[],hasAngle:!1};case`gridMirror`:return{center:i,lines:[a(0),a(90)],hasAngle:!1};case`linear`:return{center:null,lines:[],hasAngle:!1};default:return{center:null,lines:[],hasAngle:!1}}}function fa(e,t){return{x:e.cx+Math.cos(e.angle*ua)*t,y:e.cy+Math.sin(e.angle*ua)*t}}var pa=M(null),ma=null;function ha(e){let t=[];for(let n of e){if(n.kind===`eraser`||n.kind===`damage`)continue;let e=oa(n),r=[];for(let t of e.subpaths){let e=t.points;e.length<2||t.closed||(r.push({x:e[0],y:e[1]}),e.length>=4&&r.push({x:e[e.length-2],y:e[e.length-1]}))}n.input.type!==`freehand`&&r.push(...e.anchors),t.push({id:n.id,points:r,paths:e.subpaths})}return t}function ga(e,t,n){if(!e)return[];let r=da(e,t,n);return[{id:`symmetry`,points:r.center?[r.center]:[],paths:r.lines.map(e=>({points:e,closed:!1}))}]}function _a(){let e=L.value,t=qn(e),n=Qn(P.value.strokes,t),r=t?JSON.stringify(t):``;if(ma&&ma.strokes===n&&ma.key===r)return ma.index;let i=new Jr([...ha(n),...ga(t,e.canvasWidth,e.canvasHeight)]);return ma={strokes:n,key:r,index:i},i}function va(e,t){let n=L.value;if(!n.snapOn||t.noSnap)return pa.value=null,null;let r=Xr(e,{index:n.snapToStrokes?_a():null,grid:n.snapGrid&&t.grid!==!1?n.gridSpacing:null,maxDist:n.snapDistance*t.pixelSize,exclude:t.exclude});return pa.value=r,r}function ya(e,t){let n=L.value;if(!n.snapOn||!n.joinOn||t.noSnap)return null;let r=_a(),i=n.snapDistance*t.pixelSize;return r.nearestPoint(e,i,t.exclude)??r.nearestOnPath(e,i,t.exclude)}function ba(){pa.value&&=null}function xa(e){let t=L.value;return e||t.snapAngleAlways?Number(t.snapAngleStep):0}var Sa=e=>Math.round(e*100)/100;function Ca(e){let t=e.points[e.points.length-1];if(!t)return null;let n=va(t,{pixelSize:e.pixelSize,noSnap:e.noSnap})??t;return{x:Sa(n.x),y:Sa(n.y)}}var wa={id:`cupule`,label:`Dot / cupule`,hint:`Click to place a cupule (drag before releasing to move it).`,shortcut:`d`,cursor:`crosshair`,params:{size:{label:`Size`,min:2,max:300,step:1,default:40,unit:`px`,help:`Diameter of the cupule, in canvas pixels.`},depth:{label:`Depth`,min:0,max:1,step:.01,default:.7,help:`How deep the dish is at its center.`}},onPointerDown(e){let t=Ca(e);t&&(B.value={id:Mt(),tool:wa.id,kind:`cupule`,input:{type:`freehand`,points:[t.x,t.y,0]},closed:!1,filled:!1,size:V(wa,`size`),depth:V(wa,`depth`),path:{...z.value},seed:Nt(),params:{}})},onPointerMove(e){let t=B.value,n=Ca(e);t&&n&&(B.value={...t,input:{type:`freehand`,points:[n.x,n.y,0]}})},onPointerHover(e){Ca(e)},onPointerUp(){ba();let e=B.value;B.value=null,e&&Ut(e)},onCancel(){B.value=null}},Ta=40;function Ea(e){let t=Math.floor(e.length/3);if(t<4)return null;let n=new Float64Array(t);for(let r=1;r<t;r++){let t=(r-1)*3,i=r*3;n[r]=n[r-1]+Math.hypot(e[i]-e[t],e[i+1]-e[t+1])}let r=n[t-1];if(r<=0)return null;let i=new Float64Array(t),a=0,o=0;for(let r=0;r<t;r++){for(;n[r]-n[a]>Ta/2;)a++;for(;o<t-1&&n[o+1]-n[r]<=Ta/2;)o++;let s=e[o*3+2]-e[a*3+2];i[r]=s>0?(n[o]-n[a])/s:NaN}let s=e[(t-1)*3+2]-e[2];if(!(s>0))return null;let c=r/s,l=Array.from(i,e=>Number.isFinite(e)?Math.max(-.6,Math.min(1,1-e/c)):0);return e=>{let i=Math.min(1,Math.max(0,e))*r,a=0,o=t-1;for(;o-a>1;){let e=a+o>>1;n[e]<=i?a=e:o=e}let s=n[o]>n[a]?(i-n[a])/(n[o]-n[a]):0;return l[a]+(l[o]-l[a])*s}}function Da(e){let t=0,n=e.length/2;for(let r=0;r<n;r++){let i=(r+1)%n;t+=e[2*r]*e[2*i+1]-e[2*i]*e[2*r+1]}return t/2}function Oa(e,t){let n=e.length/2,r=Da(e)>0?1:-1,i=[];for(let a=0;a<n;a++){let o=(a+n-1)%n,s=(a+1)%n,c=e[2*s]-e[2*o],l=e[2*s+1]-e[2*o+1],u=Math.hypot(c,l)||1;i.push(e[2*a]-l/u*t*r,e[2*a+1]+c/u*t*r)}return i}function ka(e,t){let n=[],r=e.length/2;for(let i=0;i<r;i++){let a=(i+1)%r,o=e[2*i+1],s=e[2*a+1];if(o<=t&&s>t||s<=t&&o>t){let r=(t-o)/(s-o);n.push(e[2*i]+r*(e[2*a]-e[2*i]))}}return n.sort((e,t)=>e-t)}function Aa(e,t){let n=e.length/2,r=[];for(let i=0;i<n;i++){let a=(i+n-1)%n,o=(i+1)%n,s=e[2*o]-e[2*a],c=e[2*o+1]-e[2*a+1],l=Math.hypot(s,c)||1;r.push(e[2*i]+c/l*t,e[2*i+1]-s/l*t)}return r}function ja(e,t,n,r,i){let a=1/0,o=-1/0;for(let t of e)for(let e=1;e<t.length;e+=2)a=Math.min(a,t[e]),o=Math.max(o,t[e]);if(!Number.isFinite(a))return new Float32Array;let s=Math.max(.5,Math.min(t,(o-a)/4)),c=e.filter(e=>e.length>=6).map(e=>Aa(e,s)),l=[],u=(e,t,a,o)=>l.push(e,t,a,o,s,s,n,r,i,0,0,0);for(let e of c){let t=e.length/2;for(let n=0;n<t;n++){let r=(n+1)%t;u(e[2*n],e[2*n+1],e[2*r],e[2*r+1])}}for(let e=a+s;e<o-s*.5;e+=s){let t=c.flatMap(t=>ka(t,e)).sort((e,t)=>e-t);for(let n=0;n+1<t.length;n+=2)u(t[n],e,t[n+1],e)}return Float32Array.from(l)}function Ma(e,t,n,r,i){if(e.length<6)return new Float32Array;let a=1/0,o=-1/0;for(let t=1;t<e.length;t+=2)a=Math.min(a,e[t]),o=Math.max(o,e[t]);let s=Math.max(.5,Math.min(t,(o-a)/4)),c=Oa(e,s),l=[],u=(e,t,a,o)=>l.push(e,t,a,o,s,s,n,r,i,0,0,0),d=c.length/2;for(let e=0;e<d;e++){let t=(e+1)%d;u(c[2*e],c[2*e+1],c[2*t],c[2*t+1])}for(let e=a+s;e<o-s*.5;e+=s){let t=ka(c,e);for(let n=0;n+1<t.length;n+=2)u(t[n],e,t[n+1],e)}let f=Float32Array.from(l);return f.length%12==0?f:f.subarray(0,f.length-f.length%12)}var Na=e=>e%2047+1,Pa={line:1,fill:2,cupule:3,eraser:4,damage:5},Fa=.45;function Ia(e){let t=Pa[e.kind],n=e.params?.texture;return e.kind===`fill`&&typeof n==`number`?t+Fa*Math.min(1,Math.max(0,n)):t}function La(e){return{widthVariation:e.strokeWidthVariation,jitter:e.strokeJitter}}var Ra=160,za=.12,Ba=7,Va=e=>Math.sin(Math.min(1,Math.max(0,e))*Math.PI/2);function Ha(e,t,n,{taperEnd:r,closed:i=!1}={taperEnd:!0},a=1){i&&e.length>=6&&(e=[...e,e[0],e[1]]);let o=e.length/2;if(o<1)return new Float32Array;let s=new Float64Array(o);for(let t=1;t<o;t++)s[t]=s[t-1]+Math.hypot(e[2*t]-e[2*t-2],e[2*t+1]-e[2*t-1]);let c=s[o-1],l=i?0:Math.min(t.taper,c/2),u=i?c:0,d=t.size/2,f=t.seed,p=(t.seed^1540483477)>>>0,m=e=>{let t=d;if(l>0){let n=Va(s[e]/l),i=r?Va((c-s[e])/l):1;t*=za+.88*Math.min(n,i)}return t*=Math.max(.2,1+n.widthVariation*kn(s[e]/Ra,f)),n.jitter>0&&(t+=.5*n.jitter*On(s[e]/Ba,p)),Math.max(.25,t)},h=new Float64Array(o),g=new Float64Array(o);for(let t=0;t<o;t++)h[t]=e[2*t],g[t]=e[2*t+1];if(n.jitter>0&&o>1)for(let t=0;t<o;t++){let r=Math.max(0,t-1),i=Math.min(o-1,t+1),a=e[2*i]-e[2*r],c=e[2*i+1]-e[2*r+1],l=Math.hypot(a,c)||1,u=.5*n.jitter*On(s[t]/Ba,p+1);h[t]=h[t]-c/l*u,g[t]=g[t]+a/l*u}let _=Ia(t),v=Math.max(1,o-1),y=new Float32Array(v*12);if(o===1){let e=m(0);return y.set([h[0],g[0],h[0],g[0],e,e,t.depth,_,a,0,0,0]),y}let b=m(0);for(let e=1;e<o;e++){let n=m(e);y.set([h[e-1],g[e-1],h[e],g[e],b,n,t.depth,_,a,s[e-1],s[e],u],(e-1)*12),b=n}return y}var Ua=(e,t)=>`${e.widthVariation}|${e.jitter}|${t}`,Wa=new WeakMap;function Ga(e){let t=new Float32Array(e.reduce((e,t)=>e+t.length,0)),n=0;for(let r of e)t.set(r,n),n+=r.length;return t}function Ka(e){return e.input.type===`region`?1:Math.max(1,oa(e).subpaths.length)}function qa(e,t,n=0){let r=Ua(t,n),i=Wa.get(e);if(i&&i.key===r)return i.data;if(e.input.type===`region`){let t=ja(e.input.loops,e.size/2,e.depth,Ia(e),Na(n));return Wa.set(e,{key:r,data:t}),t}let{subpaths:a}=oa(e),o={...e,taper:e.path.taper},s=Ga(a.map((r,i)=>{let a=Na(n+i);if(e.filled&&r.closed)return Ma(r.points,e.size/2,e.depth,Ia(e),a);let s=r.scale===void 0?o:{...o,size:e.size*r.scale};return Ha(r.points,s,t,{taperEnd:!0,closed:r.closed},a)}));return e.input.type===`freehand`&&!aa(e)&&e.path.speedWidth>0&&Ja(s,e.input.points,e.path.speedWidth),Wa.set(e,{key:r,data:s}),s}function Ja(e,t,n){let r=Ea(t),i=e.length/12;if(!r||i===0)return;let a=e[(i-1)*12+10]||1;for(let t=0;t<i;t++){let i=t*12,o=r(e[i+9]/a),s=r(e[i+10]/a);e[i+4]=e[i+4]*(1+.6*n*o),e[i+5]=e[i+5]*(1+.6*n*s),e[i+6]=Math.min(1.5,e[i+6]*(1+.4*n*.5*(o+s)))}}function Ya(e,t,n=0){if(aa(e)||e.input.type!==`freehand`)return qa(e,t,n);let r=e.input.points,i=[];for(let e=0;e+1<r.length;e+=3)i.push(r[e],r[e+1]);return Ha(i,{...e,taper:e.path.taper},t,{taperEnd:!1},Na(n))}function Xa(e,t){let n=0;return Ga(e.map(e=>{let r=qa(e,t,n);return n+=Ka(e),r}))}function Za(e,t,n){let r=Math.max(1,Math.max(n.doc.width,n.doc.height)/(n.maxCells??1500)),i=Math.ceil(n.doc.width/r),a=Math.ceil(n.doc.height/r),o=Math.floor(t.x/r),s=Math.floor(t.y/r);if(o<0||s<0||o>=i||s>=a)return{error:`outside`};let c=Qa(e,i,a,r,n.gap/2);if(c[s*i+o])return{error:`inside`};let l=new Uint8Array(i*a);if(!$a(c,l,i,a,o,s))return{error:`open`};let u=to(eo(l,i,a,(n.gap/2+(n.overlap??4))/r),i,a).map(e=>no(e,r)).filter(e=>e.length>=6);return u.length?{loops:u}:{error:`inside`}}function Qa(e,t,n,r,i){let a=new Uint8Array(t*n);for(let o=0;o+12<=e.length;o+=12){let s=Math.floor(e[o+7]+.5),c=s===4||s===5,l=c?-i:i,u=e[o],d=e[o+1],f=e[o+2],p=e[o+3],m=e[o+4]+l,h=e[o+5]+l,g=Math.max(m,h),_=Math.max(0,Math.floor((Math.min(u,f)-g)/r)),v=Math.min(t-1,Math.floor((Math.max(u,f)+g)/r)),y=Math.max(0,Math.floor((Math.min(d,p)-g)/r)),b=Math.min(n-1,Math.floor((Math.max(d,p)+g)/r)),x=f-u,S=p-d,C=x*x+S*S;for(let e=y;e<=b;e++){let n=(e+.5)*r;for(let i=_;i<=v;i++){if(a[e*t+i]===+!c)continue;let o=(i+.5)*r,s=C>0?Math.max(0,Math.min(1,((o-u)*x+(n-d)*S)/C)):0;Math.hypot(o-u-s*x,n-d-s*S)<=m+(h-m)*s&&(a[e*t+i]=+!c)}}}return a}function $a(e,t,n,r,i,a){let o=new Int32Array(n*r),s=0,c=0;for(o[c++]=a*n+i,t[a*n+i]=1;s<c;){let i=o[s++],a=i%n,l=(i-a)/n;if(a===0||l===0||a===n-1||l===r-1)return!1;for(let r of[i-1,i+1,i-n,i+n])!e[r]&&!t[r]&&(t[r]=1,o[c++]=r)}return!0}function eo(e,t,n,r){let i=new Int32Array(t*n);for(let t=0;t<i.length;t++)i[t]=e[t]?0:536870912;let a=(e,t,n)=>{i[t]+n<i[e]&&(i[e]=i[t]+n)};for(let e=0;e<n;e++)for(let n=0;n<t;n++){let r=e*t+n;n>0&&a(r,r-1,3),e>0&&(a(r,r-t,3),n>0&&a(r,r-t-1,4),n<t-1&&a(r,r-t+1,4))}for(let e=n-1;e>=0;e--)for(let r=t-1;r>=0;r--){let i=e*t+r;r<t-1&&a(i,i+1,3),e<n-1&&(a(i,i+t,3),r<t-1&&a(i,i+t+1,4),r>0&&a(i,i+t-1,4))}let o=new Uint8Array(t*n),s=3*r;for(let e=0;e<i.length;e++)o[e]=+(i[e]<=s);return o}function to(e,t,n){let r=(r,i)=>r>=0&&i>=0&&r<t&&i<n&&e[i*t+r]===1,i=(e,n)=>n*(t+1)+e,a=new Map,o=(e,t,n,r)=>{let o=i(e,t),s=a.get(o);s?s.push(i(n,r)):a.set(o,[i(n,r)])};for(let e=0;e<n;e++)for(let n=0;n<t;n++)r(n,e)&&(r(n,e-1)||o(n+1,e,n,e),r(n,e+1)||o(n,e+1,n+1,e+1),r(n-1,e)||o(n,e,n,e+1),r(n+1,e)||o(n+1,e+1,n+1,e));let s=[];for(let[e,n]of a)for(;n.length>0;){let n=[],r=e;do n.push(r%(t+1),Math.floor(r/(t+1))),r=a.get(r).pop();while(r!==e&&a.get(r)?.length);s.push(n)}return s}function no(e,t){let n=[];for(let t=0;t<e.length;t+=2)n.push({x:e[t],y:e[t+1]});let r=ki([...n,n[0]],.75).slice(0,-1);for(let e=0;e<2;e++){let e=[];for(let t=0;t<r.length;t++){let n=r[t],i=r[(t+1)%r.length];e.push({x:.75*n.x+.25*i.x,y:.75*n.y+.25*i.y},{x:.25*n.x+.75*i.x,y:.25*n.y+.75*i.y})}r=e}return r.flatMap(e=>[e.x*t,e.y*t])}function ro(e,t,n,r){if(e.length<3)return e;if(!t)return co(ro(co(e),!0,n,r));let i=e.length/3,a=e.slice();if(!n.tangent||r<=0||i<3)return a[a.length-3]=io(n.x),a[a.length-2]=io(n.y),a;let o=0;for(let t=1;t<i;t++)o+=oo(e,t);let s=Math.min(r,o/2),c=i-1,l=0;for(;c>1&&l<s;)l+=oo(e,c),c--;let u=ao(e,c),d=ao(e,c-1),f=so({x:u.x-d.x,y:u.y-d.y}),p={x:io(n.x),y:io(n.y)},m=Math.hypot(p.x-u.x,p.y-u.y);if(m<1e-6)return a;let h=n.tangent,g=h.x*f.x+h.y*f.y>=0?1:-1,_=m/3,v={x:u.x+f.x*_,y:u.y+f.y*_},y={x:p.x-g*h.x*_,y:p.y-g*h.y*_},b=e[c*3+2],x=e[e.length-1],S=Math.max(2,Math.ceil(m/2)),C=[];for(let e=1;e<=S;e++){let t=e/S,n=1-t,r=n*n*n*u.x+3*n*n*t*v.x+3*n*t*t*y.x+t*t*t*p.x,i=n*n*n*u.y+3*n*n*t*v.y+3*n*t*t*y.y+t*t*t*p.y;C.push(io(r),io(i),Math.round(b+(x-b)*t))}return[...e.slice(0,(c+1)*3),...C]}var io=e=>Math.round(e*100)/100,ao=(e,t)=>({x:e[t*3],y:e[t*3+1]}),oo=(e,t)=>{let n=ao(e,t-1),r=ao(e,t);return Math.hypot(r.x-n.x,r.y-n.y)},so=e=>{let t=Math.hypot(e.x,e.y)||1;return{x:e.x/t,y:e.y/t}};function co(e){let t=[];for(let n=e.length-3;n>=0;n-=3)t.push(e[n],e[n+1],e[n+2]);return t}function lo(e,t){let n={...e};return{push(e){let r=e.x-n.x,i=e.y-n.y,a=Math.hypot(r,i);if(a<=t)return null;let o=(a-t)/a;return n={x:n.x+r*o,y:n.y+i*o},n},get brush(){return n}}}var uo=.75,fo=e=>Math.round(e*100)/100;function po(e){let t=[],n=0,r=null,i=null,a=e.snaps!==!1,o=e.joins!==!1;function s(e,r){let i=uo*r;for(let r of e){let e=t.length;if(e>=3){let n=r.x-t[e-3],a=r.y-t[e-2];if(n*n+a*a<i*i)continue}t.push(fo(r.x),fo(r.y),Math.max(0,Math.round(r.time-n)))}}function c(e,t){if(!r)return s(e,t);let n=[];for(let t of e){let e=r.push(t);e&&n.push({x:e.x,y:e.y,time:t.time})}s(n,t);let i=e[e.length-1];i&&(Rr.value={brush:r.brush,pointer:{x:i.x,y:i.y}})}function l(){i=null,B.value=null,Rr.value=null,r=null,t=[]}function u(e,n){let r=t,a=i;if(l(),r.length>=6&&o&&!n.noSnap){let t=L.value.tangentBlend*Math.max(30,3*e.size),i=r.length,o=ya({x:r[i-3],y:r[i-2]},{pixelSize:n.pixelSize});o&&(r=ro(r,!0,o,t)),a?.tangent&&L.value.joinOn&&(r=ro(r,!1,a,t))}r.length>=3&&Ut({...e,input:{type:`freehand`,points:r}})}function d(){let t={...e.fixedParams};for(let n of Object.keys(e.params))n!==`size`&&n!==`depth`&&(t[n]=Gr(p,n));return{id:Mt(),tool:e.id,kind:e.kind,input:{type:`freehand`,points:[]},closed:!1,filled:!1,size:V(p,`size`),depth:e.params.depth?V(p,`depth`):1,path:{...z.value},seed:Nt(),params:t}}function f(){let e=B.value;e&&(B.value={...e,input:{type:`freehand`,points:t.slice()}})}let p={id:e.id,label:e.label,hint:e.hint,shortcut:e.shortcut,inTray:e.inTray,cursor:`crosshair`,usesStrokeSettings:!0,params:e.params,onPointerDown(e){let o=e.points[0];if(!o)return;i=a?va(o,{pixelSize:e.pixelSize,noSnap:e.noSnap}):null,ba();let l=i?{x:i.x,y:i.y,time:o.time}:o;n=l.time,t=[];let u=z.value.stabilizer*e.pixelSize;r=u>0?lo(l,u):null,B.value=d(),s([l],e.pixelSize),c(e.points.slice(1),e.pixelSize),f()},onPointerMove(e){if(!B.value)return;let n=t.length;c(e.points,e.pixelSize),t.length!==n&&f()},onPointerUp(e){let t=B.value;t&&(c(e.points,e.pixelSize),s(e.points.slice(-1),e.pixelSize),u(t,e))},onPointerHover(e){let t=e.points[e.points.length-1];a&&t&&va(t,{pixelSize:e.pixelSize,noSnap:e.noSnap})},onCancel(){l()}};return p}var mo=po({id:`fill`,label:`Fill brush`,hint:`Drag to peck out a solid area (Bucket mode: click inside an enclosed area).`,shortcut:`f`,kind:`fill`,params:{mode:{type:`select`,label:`Mode`,default:`brush`,options:[{value:`brush`,label:`Brush`},{value:`bucket`,label:`Bucket`}],help:`Paint an area with a wide brush, or click inside an area enclosed by carvings to fill all of it.`},size:{label:`Size`,min:4,max:400,step:1,default:80,unit:`px`,help:`Width of the brush, in canvas pixels.`},depth:{label:`Depth`,min:0,max:1,step:.01,default:.4,help:`How deep the area is pecked out.`},texture:{label:`Fill texture`,min:0,max:1,step:.01,default:.5,help:`How pitted the floor of the area is: 0 = smooth, 1 = heavily pecked.`},gap:{label:`Close gaps`,min:0,max:60,step:1,default:8,unit:`px`,help:`Bucket: gaps between carvings narrower than this count as closed.`}}}),ho=()=>Gr(vo,`mode`)===`bucket`,go={outside:`Click inside the canvas to fill.`,inside:`That spot is already carved: click in an empty area between carvings.`,open:`This area isn't enclosed (it leaks to the canvas edge). Close the gap or raise Close gaps.`};function _o(e){let t=e.points[e.points.length-1];if(!t)return;let n=L.value,r=Za(Xa(Qn(P.value.strokes,qn(n)),La(n)),t,{doc:{width:n.canvasWidth,height:n.canvasHeight},gap:V(vo,`gap`)});`error`in r?Vr(go[r.error]):Ut({id:Mt(),tool:`fill`,kind:`fill`,input:{type:`region`,loops:r.loops.map(e=>e.map(e=>Math.round(e*100)/100))},closed:!0,filled:!0,size:16,depth:V(vo,`depth`),path:{...z.value},seed:Nt(),params:{texture:V(vo,`texture`)}})}var vo={...mo,onPointerDown(e){ho()||mo.onPointerDown(e)},onPointerMove(e){ho()||mo.onPointerMove(e)},onPointerUp(e){ho()?_o(e):mo.onPointerUp(e)}};function yo(e,t,n){let r=t.x-e.x,i=t.y-e.y,a=Math.hypot(r,i);if(n<=0||a===0)return{...t};let o=n*Math.PI/180,s=Math.round(Math.atan2(i,r)/o)*o;return{x:e.x+a*Math.cos(s),y:e.y+a*Math.sin(s)}}function bo(e,t){return yo({x:0,y:0},e,t)}function xo(e,t,n,r=400,i=6){return e?t.time-e.time<=r&&Math.hypot(t.x-e.x,t.y-e.y)<=i*n:!1}var W=[],So=null,Co=!1,wo=null,To=0,Eo=``,Do=()=>Gr(Fo,`mode`)===`curve`,Oo=e=>Math.round(e*100)/100;function ko(e){let t=e.points[e.points.length-1],n=W[W.length-1],r=xa(e.shiftKey),i;return n&&r>0?(ba(),i=yo(n,t,r)):i=va(t,{pixelSize:e.pixelSize,noSnap:e.noSnap})??t,{x:Oo(i.x),y:Oo(i.y)}}function Ao(e){return Do()?{type:`bezier`,nodes:e.flatMap(e=>[e.x,e.y,Oo(e.hx),Oo(e.hy)])}:{type:`polyline`,points:e.flatMap(e=>[e.x,e.y])}}function jo(e){return{id:Eo,tool:Fo.id,kind:`line`,input:Ao(e),closed:!1,filled:!1,size:V(Fo,`size`),depth:V(Fo,`depth`),path:{...z.value},seed:To,params:Do()?{}:{cornerRadius:V(Fo,`cornerRadius`)}}}function Mo(){if(W.length===0){B.value=null,Lr.value=null;return}B.value=jo(So&&!Co?[...W,{...So,hx:0,hy:0}]:W);let e=[],t=[];for(let n of W)t.push(n.x,n.y),(n.hx!==0||n.hy!==0)&&(e.push([n.x-n.hx,n.y-n.hy,n.x+n.hx,n.y+n.hy]),t.push(n.x+n.hx,n.y+n.hy,n.x-n.hx,n.y-n.hy));Lr.value={lines:e,points:t}}function No(){ba(),W=[],So=null,Co=!1,wo=null,B.value=null,Lr.value=null}function Po(){let e=W,t=e.length>=2?jo(e):null;No(),t&&Ut(t)}var Fo={id:`line`,label:`Line / curve`,hint:`Click to add points (drag for curve handles); double-click or Enter to finish, Esc to cancel. Shift snaps angles.`,shortcut:`l`,cursor:`crosshair`,params:{mode:{type:`select`,label:`Mode`,default:`polyline`,options:[{value:`polyline`,label:`Straight segments`},{value:`curve`,label:`Curves (pen)`}],help:`Straight segments between clicks, or smooth curves: click-drag to pull out a handle.`},size:{label:`Size`,min:1,max:300,step:1,default:20,unit:`px`,help:`Width of the carved line, in canvas pixels.`},depth:{label:`Depth`,min:0,max:1,step:.01,default:.5,help:`How deep the line is carved.`},cornerRadius:{label:`Corner rounding`,min:0,max:100,step:1,default:0,unit:`px`,help:`Rounds the corners between straight segments (straight mode).`}},onPointerDown(e){let t=e.points[e.points.length-1];if(!t)return;let n={x:t.x,y:t.y,time:t.time};W.length>0&&xo(wo,n,e.pixelSize)?Po():(wo=n,W.length===0&&(Eo=Mt(),To=Nt()),W.push({...ko(e),hx:0,hy:0}),Co=Do(),Mo())},onPointerMove(e){let t=e.points[e.points.length-1],n=W[W.length-1];if(t&&n){if(Co){let r=bo({x:t.x-n.x,y:t.y-n.y},xa(e.shiftKey));n.hx=r.x,n.hy=r.y}else So=ko(e);Mo()}},onPointerUp(){Co=!1,Mo()},onPointerHover(e){W.length===0?ko(e):(So=ko(e),Mo())},onKey(e){if(W.length===0)return!1;if(e===`Enter`)Po();else if(e===`Escape`)No();else return!1;return!0},onCancel(){No()}},Io=po({id:`freehand`,label:`Freehand`,hint:`Drag to carve a line.`,shortcut:`b`,kind:`line`,params:{size:{label:`Size`,min:1,max:300,step:1,default:24,unit:`px`,help:`Width of the carved line, in canvas pixels.`},depth:{label:`Depth`,min:0,max:1,step:.01,default:.5,help:`How deep the line is carved.`}}}),Lo=80,Ro={circle:{label:`Circle / ellipse`,hint:`Drag from the center to size and turn a circle or ellipse.`},rings:{label:`Concentric rings`,hint:`Drag from the center out to the outer ring.`},spiral:{label:`Spiral`,hint:`Drag from the center; the spiral ends in the drag direction.`},rays:{label:`Radial rays`,hint:`Drag from the center out to the ray tips; the first ray points along the drag.`}};function zo(e){let t=null,n=1,r=null;function i(){let t={};for(let n of Object.keys(Vi[e]))n!==`size`&&n!==`depth`&&(t[n]=Gr(o,n));let n=t.filled===!0;return{size:V(o,`size`),depth:V(o,`depth`),kind:n?`fill`:`line`,filled:n,params:t}}function a(r){let i=r.points[r.points.length-1],a=i&&(va(i,{pixelSize:r.pixelSize,noSnap:r.noSnap})??i),o=B.value;if(!t||!a||!o)return null;let s=a.x-t.x,c=a.y-t.y,l=Math.hypot(s,c),u=l>4*n;return{...o,input:{type:`shape`,shape:e,cx:t.x,cy:t.y,radius:u?l:Lo,angle:u?Math.atan2(c,s):0}}}let o={id:e,label:Ro[e].label,hint:Ro[e].hint,cursor:`crosshair`,inTray:`shapes`,params:Vi[e],onPointerDown(r){let a=r.points[0];if(!a)return;let o=va(a,{pixelSize:r.pixelSize,noSnap:r.noSnap})??a;t={x:o.x,y:o.y},n=r.pixelSize,B.value={id:Mt(),tool:e,input:{type:`shape`,shape:e,cx:o.x,cy:o.y,radius:Lo,angle:0},closed:e===`circle`||e===`rings`,path:{...z.value},seed:Nt(),...i()}},onPointerMove(e){let t=a(e);t&&(B.value=t)},onPointerHover(e){let t=e.points[e.points.length-1];t&&va(t,{pixelSize:e.pixelSize,noSnap:e.noSnap})},onPointerUp(e){let n=a(e);ba(),t=null,B.value=null,n&&(Ut(n),r=n.id)},onCancel(){t=null,B.value=null},onParamChange(){let e=P.value.strokes,t=e[e.length-1];t&&t.id===r&&Wt(t.id,i())}};return o}var Bo=zo(`circle`),Vo=zo(`rings`),Ho=zo(`spiral`),Uo=zo(`rays`),Wo=po({id:`rake`,label:`Rake`,hint:`Drag a path: parallel lines follow it.`,kind:`line`,inTray:`patterns`,fixedParams:{pattern:`rake`},joins:!1,params:$i.rake}),Go=po({id:`zigzag`,label:`Zigzag / wave`,hint:`Drag a path: a zigzag or wave line follows it.`,kind:`line`,inTray:`patterns`,fixedParams:{pattern:`zigzag`},joins:!1,params:$i.zigzag}),Ko=po({id:`dotrow`,label:`Dot row`,hint:`Drag a path: a row of cupules follows it.`,kind:`cupule`,inTray:`patterns`,fixedParams:{pattern:`dotrow`},joins:!1,params:$i.dotrow}),qo=po({id:`eraser`,label:`Eraser`,hint:`Drag across carving to erase it (Stroke mode: deletes whole strokes).`,shortcut:`e`,kind:`eraser`,snaps:!1,joins:!1,params:{mode:{type:`select`,label:`Mode`,default:`area`,options:[{value:`area`,label:`Area`},{value:`stroke`,label:`Whole strokes`}],help:`Area cuts away carving under the brush (undoable, non-destructive); Whole strokes deletes every stroke you touch.`},size:{label:`Size`,min:2,max:300,step:1,default:40,unit:`px`,help:`Width of the eraser, in canvas pixels.`}}}),Jo=()=>Gr(Zo,`mode`)===`stroke`,Yo=!1;function Xo(e){let t=V(Zo,`size`)/2,n=La(L.value),r=new Set;for(let i of Qn(P.value.strokes,qn(L.value))){let a=qa(i,n),o=!1;for(let n=0;n<a.length&&!o;n+=12){let r=a[n],i=a[n+1],s=a[n+2],c=a[n+3],l=Math.max(a[n+4],a[n+5]),u=s-r,d=c-i,f=u*u+d*d;for(let n of e.points){let e=f>0?Math.max(0,Math.min(1,((n.x-r)*u+(n.y-i)*d)/f)):0;if(Math.hypot(n.x-r-e*u,n.y-i-e*d)<=l+t){o=!0;break}}}o&&r.add(er(i.id))}r.size&&Gt(r)}var Zo={...qo,onPointerDown(e){if(!Jo())return qo.onPointerDown(e);Yo=!0,Bt(),Xo(e)},onPointerMove(e){if(!Jo())return qo.onPointerMove(e);Yo&&Xo(e)},onPointerUp(e){if(!Yo)return qo.onPointerUp(e);Yo=!1,Vt()},onCancel(){Yo&&(Yo=!1,Vt()),qo.onCancel()}},Qo=(e,t,n,r={})=>({...r,id:e,label:t,hint:n}),$o=[Io,vo,Fo,Qo(`shapes`,`Shapes`,`Pick a shape from the tray.`,{opensTray:`shapes`,shortcut:`s`}),Bo,Vo,Ho,Uo,Qo(`patterns`,`Patterns`,`Pick a pattern brush from the tray.`,{opensTray:`patterns`,shortcut:`r`}),Wo,Go,Ko,wa,Zo];function es(e){return $o.find(t=>t.id===e)??Io}var ts=e=>e.onPointerDown!==void 0,ns=[{id:`tools`,label:`Tools`},{id:`look`,label:`Look`},{id:`environment`,label:`Environment`},{id:`advanced`,label:`Advanced`,devOnly:!0}],rs=[{id:`snapping`,label:`Snapping`,schema:`snapping`,group:`tools`},{id:`symmetry`,label:`Symmetry`,schema:`symmetry`,group:`tools`},{id:`lines`,label:`Lines`,schema:`lines`,group:`look`},{id:`area`,label:`Area`,schema:`area`,group:`look`},{id:`carving`,label:`Carving`,schema:`carving`,group:`look`,mode:`carve`},{id:`carveColor`,label:`Color`,schema:`carveColor`,group:`look`,mode:`carve`},{id:`raised`,label:`Raised`,schema:`raised`,group:`look`,mode:`raised`},{id:`background`,label:`Background`,schema:`background`,group:`environment`},{id:`light`,label:`Light`,schema:`light`,group:`environment`},{id:`canvas`,label:`Canvas`,schema:`canvas`,group:`environment`},{id:`defaults`,label:`Defaults`,schema:`defaults`,group:`advanced`}],G=M(`freehand`),is=M({}),as=M(new Set),os=M(!1),ss=M(!1),cs=M(!1),ls=M(!1),us=`(max-width: 760px), (max-height: 500px)`,ds=M(!1),fs=M(null);function ps(){if(typeof matchMedia>`u`)return;let e=matchMedia(us),t=()=>{ds.value=e.matches,e.matches||(fs.value=null)};t(),e.addEventListener(`change`,t)}var ms=1536,hs=2048;function gs(e){return ds.value?Math.min(e,ms):e}function _s(e){return ds.peek()?Math.min(e,hs):e}function vs(e){return G.value===e.id||e.opensTray!==void 0&&es(G.value).inTray===e.opensTray}var ys=M(`final`);function bs(e){let t=es(e).opensTray;t&&(e=is.value[t]??$o.find(e=>e.inTray===t)?.id??e);let n=es(e).inTray;n&&(is.value={...is.value,[n]:e}),e!==G.value&&(es(G.value).onCancel?.(),G.value=e)}function xs(e){let t=new Set(as.value);t.has(e)?t.delete(e):t.add(e),as.value=t}function Ss(e){return es(e).hint}function Cs(){es(G.peek()).onCancel?.()}function ws(){Cs(),Lt.undo()}function Ts(){Cs(),Lt.redo()}async function Es(){if(!window.confirm(`Start a new drawing? This clears all strokes and resets settings and sliders to their defaults (keeping this rock). You can undo the drawing and settings.`))return;Cs();let e=P.value.settings.backgroundId,t=await xr(e);Kt(Ot(Tt(),{...t,backgroundId:e})),Hr.value={},Ir()}function Ds(){Tr(`glyphy-${Ar()}.glyphy`,rn(P.value))}async function Os(){let e=await Or(`.glyphy,.json,application/json`);if(e)try{let t=un(await e.text());Cs(),zt(t)}catch(t){let n=t instanceof en?t.message:`It couldn't be read.`;window.alert(`Couldn't open "${e.name}". ${n}`)}}function ks(){let e=P.value.strokes,t=e[e.length-1];t&&Wt(t.id,{seed:Nt()})}function As(){Rt(e=>e.strokes.some(e=>e.symmetric)?{...e,strokes:tr(e.strokes,qn(e.settings))}:e)}function js(){os.value=!os.value}var Ms=.02,Ns=e=>Math.min(32,Math.max(Ms,e));function Ps(e){return[e.zoom,0,0,e.zoom,e.panX,e.panY]}function Fs(e,t){return{x:(t.x-e.panX)/e.zoom,y:(t.y-e.panY)/e.zoom}}function Is(e,t,n=24){let r=Math.max(1,t.width-2*n),i=Math.max(1,t.height-2*n),a=Ns(Math.min(r/e.width,i/e.height));return{zoom:a,panX:(t.width-e.width*a)/2,panY:(t.height-e.height*a)/2}}function Ls(e,t,n){let r=Ns(e.zoom*t),i=Fs(e,n);return{zoom:r,panX:n.x-i.x*r,panY:n.y-i.y*r}}function Rs(e,t,n){return{...e,panX:e.panX+t,panY:e.panY+n}}function zs(e,t,n,r,i){let a=Ns(e.zoom*(i/Math.max(1,n))),o=Fs(e,t);return{zoom:a,panX:r.x-o.x*a,panY:r.y-o.y*a}}function Bs(e,t,n){let r=t===1?e*16:t===2?e*400:e,i=n?.01:.0015;return Math.exp(-r*i)}var K=M({zoom:1,panX:0,panY:0}),Vs=M({width:0,height:0}),Hs=M(!0),Us=null;function Ws(e){Us=e}function Gs(){return{width:L.value.canvasWidth,height:L.value.canvasHeight}}function Ks(){let e=Vs.value;e.width<=0||e.height<=0||(K.value=Is(Gs(),e),Hs.value=!0)}function qs(e){K.value=e,Hs.value=!1}function Js(e,t){let n=Us?.getBoundingClientRect();return{x:e-(n?.left??0),y:t-(n?.top??0)}}function Ys(e,t){return Fs(K.value,Js(e,t))}var Xs=[{keys:`mod+z`,label:`Undo`,run:ws,repeat:!0},{keys:`mod+shift+z`,label:`Redo`,run:Ts,repeat:!0},{keys:`mod+y`,label:`Redo`,run:Ts,repeat:!0},{keys:`mod+0`,label:`Fit canvas`,run:Ks},{keys:`p`,label:`Path view`,run:js},{keys:`shift+?`,label:`Keyboard shortcuts`,run:()=>ls.value=!ls.value},...$o.filter(e=>e.shortcut).map(e=>({keys:e.shortcut,label:e.label,run:()=>bs(e.id)}))],Zs=typeof navigator<`u`&&/Mac|iPhone|iPad/.test(navigator.platform),Qs=Zs?`⌘`:`Ctrl`,$s=Zs?`⌥ Option`:`Alt`,ec=new Set([`range`,`checkbox`,`radio`,`button`,`submit`,`reset`,`color`]);function tc(e){return e instanceof HTMLElement?e.isContentEditable||e.tagName===`TEXTAREA`||e.tagName===`SELECT`?!0:e instanceof HTMLInputElement&&!ec.has(e.type):!1}function nc(e){let t=e.toLowerCase().split(`+`);return{mod:t.includes(`mod`),shift:t.includes(`shift`),alt:t.includes(`alt`),key:t[t.length-1]??``}}function rc(e){return/^Key[A-Z]$/.test(e.code)?e.code.slice(3).toLowerCase():/^(Digit|Numpad)[0-9]$/.test(e.code)?e.code.slice(-1):e.key.toLowerCase()}function ic(e,t){return(Zs?e.metaKey:e.ctrlKey)===t.mod&&e.shiftKey===t.shift&&e.altKey===t.alt&&rc(e)===t.key}function ac(e){let t=nc(e),n=t.key.toUpperCase();return Zs?`${t.mod?`⌘`:``}${t.alt?`⌥`:``}${t.shift?`⇧`:``}${n}`:[t.mod&&`Ctrl`,t.alt&&`Alt`,t.shift&&`Shift`,n].filter(Boolean).join(`+`)}function oc(){let e=Xs.map(e=>({...e,combo:nc(e.keys)})),t=t=>{if(tc(t.target))return;if(!t.ctrlKey&&!t.metaKey&&!t.altKey&&es(G.peek()).onKey?.(t.key)){t.preventDefault();return}let n=e.find(e=>ic(t,e.combo));n&&(t.preventDefault(),(!t.repeat||n.repeat)&&n.run())};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)}var sc=0;Array.isArray;function q(t,n,r,i,a,o){n||={};var s,c,l=n;if(`ref`in l&&typeof t!=`function`)for(c in l={},n)c==`ref`?s=n[c]:l[c]=n[c];var u={type:t,props:l,key:r,ref:s,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--sc,__i:-1,__u:0};return(a||o)&&(u.__source=a,u.__self=o),e.vnode&&e.vnode(u),u}function cc(){let e=ke(null),t=t=>()=>{e.current&&(e.current.open=!1),t()};return q(`header`,{class:`top-bar`,children:[q(`h1`,{class:`app-title`,children:`Glyphy`}),q(`details`,{class:`menu`,ref:e,children:[q(`summary`,{class:`menu-button`,children:`File`}),q(`div`,{class:`menu-list`,role:`menu`,children:[q(`button`,{role:`menuitem`,title:`Start over: clear the drawing and reset settings (keeps the rock)`,onClick:t(()=>void Es()),children:`New`}),q(`button`,{role:`menuitem`,title:`Open a .glyphy project file`,onClick:t(()=>void Os()),children:`Open project…`}),q(`button`,{role:`menuitem`,title:`Download the drawing and all settings as a .glyphy file`,onClick:t(Ds),children:`Save project`})]})]}),q(`div`,{class:`top-bar-center`,children:[q(`div`,{class:`segmented`,role:`group`,"aria-label":`Mode`,children:[q(`button`,{class:F.value===`carve`?`active`:``,"aria-pressed":F.value===`carve`,onClick:()=>Ht(`carve`),children:`Carve`}),q(`button`,{class:F.value===`raised`?`active`:``,"aria-pressed":F.value===`raised`,onClick:()=>Ht(`raised`),children:`Raised`})]}),q(`div`,{class:`button-group`,children:[q(`button`,{disabled:!Lt.canUndo.value,"aria-label":`Undo`,title:`Undo (${ac(`mod+z`)})`,onClick:ws,children:[`↶`,q(`span`,{class:`btn-label`,children:` Undo`})]}),q(`button`,{disabled:!Lt.canRedo.value,"aria-label":`Redo`,title:`Redo (${ac(`mod+shift+z`)})`,onClick:Ts,children:[q(`span`,{class:`btn-label`,children:`Redo `}),`↷`]})]}),q(`button`,{class:os.value?`toggle active`:`toggle`,"aria-pressed":os.value,title:`Show the raw paths (${ac(`p`)})`,onClick:js,children:[`Path`,q(`span`,{class:`btn-label`,children:` view`})]})]}),q(`button`,{class:`primary export-button`,title:`Save the image (PNG or JPG) or a day-cycle video (MP4)`,onClick:()=>ss.value=!0,children:`Export`})]})}var lc=24,uc=[1,.55,.24],dc=.85,fc=.35,pc=e=>Math.min(1,Math.max(0,e)),mc=e=>{let t=pc(e);return t*t*(3-2*t)},hc=e=>(e%360+360)%360;function gc(e,t){let n=pc(e),r=n+fc*(mc(n)-n),i=Math.max(t.elevation,8),a=8+(i-8)*Math.sin(Math.PI*r),o=Math.min(lc,i-8),s=o>0?1-mc((a-8)/o):0,c=dn(t.color),l=dc*s,u=fn([0,1,2].map(e=>c[e]*(1+(uc[e]-1)*l)));return{angle:hc(t.angle-90+180*r),elevation:a,color:u,intensity:t.intensity*(1-.25*s)}}function _c(e,t){return Math.max(2,Math.round(e*t))}function vc(e,t){return t<=1?0:e/(t-1)}var yc=M(null),bc=M(5);function xc(){let e=L.peek();return{angle:e.lightAngle,elevation:e.lightElevation,color:e.lightColor,intensity:e.lightIntensity}}var Sc=0,Cc=e=>{e.key===`Escape`&&wc()};function wc(){Sc&&cancelAnimationFrame(Sc),Sc=0,window.removeEventListener(`keydown`,Cc),yc.value=null}function Tc(){if(wc(),F.peek()!==`carve`)return;let e=xc(),t=bc.peek()*1e3,n=performance.now(),r=i=>{let a=(i-n)/t;a>=1?wc():(yc.value=gc(a,e),Sc=requestAnimationFrame(r))};yc.value=gc(0,e),window.addEventListener(`keydown`,Cc),Sc=requestAnimationFrame(r)}F.subscribe(e=>{e!==`carve`&&yc.peek()&&wc()});function Ec(e){let t=String(e),n=t.indexOf(`.`);return n<0?0:t.length-n-1}function Dc(e){let{label:t,value:n,min:r,max:i,step:a,defaultValue:o,unit:s,help:c,onInput:l,onDragStart:u,onDragEnd:d}=e,f=()=>l(o),p=n===o,m=ke(n);m.current=n;let h=Ec(a),g=ke(!1);return q(`div`,{class:`control control-slider`,title:c,children:[q(`div`,{class:`control-head`,children:[q(`label`,{class:`control-label`,onDblClick:f,children:t}),q(`span`,{class:`control-readout`,children:[q(`input`,{type:`number`,class:`control-number`,value:n.toFixed(h),min:r,max:i,step:a,"aria-label":`${t} value`,onChange:e=>{let t=e.currentTarget,n=parseFloat(t.value);Number.isFinite(n)&&l(n),requestAnimationFrame(()=>t.value=m.current.toFixed(h))}}),s&&q(`span`,{class:`control-unit`,children:s})]})]}),q(`input`,{type:`range`,class:p?`is-default`:``,min:r,max:i,step:a,value:n,"aria-label":t,onPointerDown:()=>{if(g.current||!u)return;g.current=!0,u();let e=()=>{window.removeEventListener(`pointerup`,e),window.removeEventListener(`pointercancel`,e),g.current=!1,d?.()};window.addEventListener(`pointerup`,e),window.addEventListener(`pointercancel`,e)},onInput:e=>l(parseFloat(e.currentTarget.value)),onDblClick:f})]})}function Oc(){let e=yc.value!==null,t=F.value===`raised`;return q(`div`,{class:`day-controls`,children:[q(`button`,{class:e?`small toggle active`:`small`,"aria-pressed":e,disabled:t,title:t?`The day cycle is for carvings only (switch to Carve mode)`:`Preview the light crossing the sky, sunrise to sunset, centred on the current light (Esc stops)`,onClick:()=>e?wc():Tc(),children:e?`■ Stop`:`▶ Play day`}),q(Dc,{label:`Day length`,value:bc.value,min:2,max:10,step:1,defaultValue:5,unit:`s`,help:`How long Play day and the day-cycle video take, sunrise to sunset.`,onInput:e=>bc.value=Math.round(e)})]})}var kc=e=>e.credit&&e.credit!==e.name?`${e.name}
${e.credit} (CC0)`:e.name;function Ac({entries:e,selected:t}){return q(`div`,{class:`rock-grid`,children:e.map(e=>q(`button`,{class:e.id===t?`rock-thumb active`:`rock-thumb`,"aria-pressed":e.id===t,"aria-busy":dr.value===e.id,title:kc(e),onClick:()=>void Sr(e.id),children:q(`img`,{src:pr(e.thumb),alt:e.name,loading:`lazy`,draggable:!1})},e.id))})}function jc(){let e=cr.value,t=L.value.backgroundId;return q(`div`,{class:`rock-picker`,children:[lr.value&&q(`p`,{class:`placeholder`,children:lr.value}),!e&&!lr.value&&q(`p`,{class:`placeholder`,children:`Loading rocks…`}),e&&q(Ac,{entries:e,selected:t}),q(`button`,{class:cs.value?`toggle active move-rock`:`toggle move-rock`,"aria-pressed":cs.value,title:`Drag on the canvas to slide the rock behind it. You can also hold Alt and drag.`,onClick:()=>cs.value=!cs.value,children:`Move rock`})]})}var Mc=[`backgroundId`,`canvasWidth`,`canvasHeight`,`workingResolution`,`lightAngle`,`lightElevation`],Nc=new Set([`symmetry`,`snapping`,`defaults`]);function Pc(e){let t={};for(let n of Ct)!Mc.includes(n)&&!Nc.has(N[n].section)&&(t[n]=e[n]);return{naturalLight:{angle:e.lightAngle,elevation:e.lightElevation},defaults:t}}function Fc(e,t){return{...e,naturalLight:t.naturalLight,defaults:t.defaults}}var Ic=`glyphy-settings`;function Lc(e,t){return{format:Ic,version:1,background:e,...t}}var Rc=`glyphy-tool-defaults`;function zc(e){return{format:Rc,version:1,...e}}var Bc=e=>typeof e==`object`&&!!e&&!Array.isArray(e);function Vc(e){if(!Bc(e)||e.format!==`glyphy-tool-defaults`)return null;let t={};if(Bc(e.toolParams))for(let[n,r]of Object.entries(e.toolParams)){if(!Bc(r))continue;let e={};for(let[t,n]of Object.entries(r))(typeof n==`number`&&Number.isFinite(n)||typeof n==`boolean`||typeof n==`string`)&&(e[t]=n);t[n]=e}return{toolParams:t,strokeSettings:Bc(e.strokeSettings)?e.strokeSettings:{}}}var Hc=`tool-defaults.json`;async function Uc(){try{let e=await fetch(pr(Hc),{cache:`no-store`});if(!e.ok)return;let t=Vc(await e.json());if(!t)return;Ur.value=t.toolParams,Fr(t.strokeSettings)}catch{}}async function Wc(){let e=L.value.backgroundId;if(!e)throw Error(`No rock is selected.`);let t=`backgrounds/${e}/bundle.json`,n=Fc(await fetch(pr(t),{cache:`no-store`}).then(e=>e.ok?e.json():null).catch(()=>null)??{id:e},Pc(L.value)),r=await kr(t,n);return R.value?.id===e&&(R.value=n),r===`saved`?`Saved to public/${t}.`:`Downloaded bundle.json: copy it to public/${t}.`}async function Gc(){let e={};for(let t of $o){let n=Object.keys(t.params??{});n.length&&(e[t.id]=Object.fromEntries(n.map(e=>[e,Gr(t,e)])))}let t=await kr(Hc,zc({toolParams:e,strokeSettings:{...z.value}}));return Ur.value=e,Fr(z.value),t===`saved`?`Saved to public/${Hc}.`:`Downloaded ${Hc}: copy it to public/.`}function Kc(){let e=L.value.backgroundId||`settings`,t=`${e}-settings.json`;return Dr(t,Lc(e,Pc(L.value))),`Downloaded ${t}.`}async function qc(){let e=L.value,t=await xr(e.backgroundId);ir(Ot(Tt(),{...t,backgroundId:e.backgroundId,canvasWidth:e.canvasWidth,canvasHeight:e.canvasHeight})),Hr.value={},Ir()}function Jc(){let[e,t]=Ee(null),n=e=>async()=>{try{t({text:await e()})}catch(e){t({text:`Couldn't save: ${e instanceof Error?e.message:String(e)}`,error:!0})}},r=R.value?.name??`this rock`;return q(`div`,{class:`defaults-panel`,children:[q(`button`,{class:`small`,title:`Write the current look (carving, light, colors, framing…) and light direction into this rock's bundle.json`,disabled:!R.value,onClick:n(Wc),children:[`Save as default for `,r]}),q(`button`,{class:`small`,title:`Write the current tool and path slider values (size, depth, smoothing…) to tool-defaults.json`,onClick:n(Gc),children:`Save tool defaults`}),q(`button`,{class:`small`,title:`Download the current look as a settings file`,onClick:n(Kc),children:`Export settings only`}),q(`button`,{class:`small`,title:`Put every setting and slider back to the shipped defaults (keeps the drawing)`,onClick:n(async()=>window.confirm(`Reset every setting and slider to the shipped defaults? The drawing stays.`)?(await qc(),`Settings reset to the shipped defaults.`):``),children:`Reset to shipped defaults`}),e?.text&&q(`p`,{class:e.error?`defaults-status error`:`defaults-status`,children:e.text})]})}function Yc({children:e}){let[t,n]=Ee(!1);return q(`div`,{class:t?`advanced open`:`advanced`,children:[q(`button`,{class:`advanced-toggle`,"aria-expanded":t,onClick:()=>n(!t),children:[`Advanced `,q(`span`,{class:`chevron`,children:`›`})]}),t&&q(`div`,{class:`advanced-body`,children:e})]})}var Xc=5;function Zc({presets:e,activeIndex:t,customLabel:n,onPick:r}){return e.length>Xc?q(`select`,{class:`preset-select`,value:t,onChange:t=>{let n=e[parseInt(t.currentTarget.value,10)];n&&r(n)},children:[t<0&&q(`option`,{value:-1,children:n??`Custom`}),e.map((e,t)=>q(`option`,{value:t,children:e.label},e.label))]}):q(`div`,{class:`preset-row`,role:`group`,"aria-label":`Presets`,children:[e.map((e,n)=>q(`button`,{class:n===t?`preset active`:`preset`,"aria-pressed":n===t,onClick:()=>r(e),children:e.label},e.label)),n&&q(`span`,{class:t<0?`preset preset-custom active`:`preset preset-custom`,children:n})]})}function Qc({label:e,value:t,help:n,onInput:r,onDragStart:i,onDragEnd:a}){let o=ke(!1),s=()=>{o.current&&(o.current=!1,a?.())};return q(`div`,{class:`control`,title:n,children:[q(`span`,{class:`control-label`,children:e}),q(`div`,{class:`control-row`,children:[q(`input`,{type:`color`,class:`swatch-input`,value:t,"aria-label":e,onInput:e=>{o.current||(o.current=!0,i?.()),r(e.currentTarget.value)},onChange:s,onBlur:s}),q(`input`,{type:`text`,class:`control-hex`,value:t,spellcheck:!1,"aria-label":`${e} hex`,onChange:e=>{let n=e.currentTarget.value.trim(),i=n.startsWith(`#`)?n:`#${n}`;/^#[0-9a-f]{6}$/i.test(i)?r(i.toLowerCase()):e.currentTarget.value=t}})]})]})}function $c({label:e,value:t,min:n,max:r,step:i,unit:a,help:o,onCommit:s}){let c=ke(t);c.current=t;let l=e=>{let n=parseFloat(e.value);Number.isFinite(n)&&n!==t&&s(n),requestAnimationFrame(()=>e.value=String(c.current))};return q(`label`,{class:`control control-field`,title:o,children:[q(`span`,{class:`control-label`,children:e}),q(`span`,{class:`control-readout`,children:[q(`input`,{type:`number`,class:`control-number`,value:t,min:n,max:r,step:i,onBlur:e=>l(e.currentTarget),onKeyDown:e=>{e.key===`Enter`&&l(e.currentTarget),e.key===`Escape`&&(e.currentTarget.value=String(t))}}),a&&q(`span`,{class:`control-unit`,children:a})]})]})}function el({label:e,value:t,options:n,help:r,onChange:i}){return q(`label`,{class:`control`,title:r,children:[q(`span`,{class:`control-label`,children:e}),q(`select`,{value:t,onChange:e=>i(e.currentTarget.value),children:n.map(e=>q(`option`,{value:e.value,children:e.label},e.value))})]})}function tl({label:e,value:t,help:n,onChange:r}){return q(`label`,{class:`control control-toggle`,title:n,children:[q(`input`,{type:`checkbox`,checked:t,onChange:e=>r(e.currentTarget.checked)}),q(`span`,{class:`control-label`,children:e})]})}function nl({def:e,value:t,onChange:n,onDragStart:r,onDragEnd:i}){switch(e.type){case`number`:return e.control===`field`?q($c,{label:e.label,value:t,min:e.min,max:e.max,step:e.step,unit:e.unit,help:e.help,onCommit:n}):q(Dc,{label:e.label,value:t,min:e.min,max:e.max,step:e.step,defaultValue:e.default,unit:e.unit,help:e.help,onInput:n,onDragStart:r,onDragEnd:i});case`toggle`:return q(tl,{label:e.label,value:t,help:e.help,onChange:n});case`select`:return q(el,{label:e.label,value:t,options:e.options,help:e.help,onChange:n});case`color`:return q(Qc,{label:e.label,value:t,help:e.help,onInput:n,onDragStart:r,onDragEnd:i});case`text`:return null}}function rl({settingKey:e}){return q(nl,{def:St(e),value:L.value[e],onChange:t=>rr(e,t),onDragStart:Bt,onDragEnd:Vt})}function il(e){let t=R.value?.source??`photo`;return Ct.filter(n=>{let r=St(n);if(r.section!==e||r.hidden||r.source&&r.source!==t||r.showIf&&!r.showIf.is.includes(L.value[r.showIf.key]))return!1;let i=r.mode??`both`;return i===`both`||i===F.value})}var al=e=>St(e).advanced===!0;function ol({section:e,children:t}){let n=il(e),r=n.filter(e=>!al(e)),i=n.filter(al),a=bt[e]??[],o=a.findIndex(e=>At(L.value,e.values));return q(`div`,{class:`settings-body`,children:[a.length>0&&q(Zc,{presets:a,activeIndex:o,customLabel:xt[e],onPick:e=>ir(e.values)}),t,r.map(e=>q(rl,{settingKey:e},e)),i.length>0&&q(Yc,{children:i.map(e=>q(rl,{settingKey:e},e))})]})}function sl({withTools:e=!1}){return q(y,{children:ns.filter(t=>(e||t.id!==`tools`)&&!(`devOnly`in t)).map(e=>q(`section`,{class:`panel-block`,children:[q(`h2`,{class:`panel-heading`,children:e.label}),q(cl,{group:e.id})]},e.id))})}function cl({group:e}){return q(y,{children:rs.map(t=>{if(t.group!==e||`mode`in t&&t.mode!==F.value)return null;let n=as.value.has(t.id);return q(`div`,{class:n?`settings-section open`:`settings-section`,children:[q(`button`,{class:`section-toggle`,"aria-expanded":n,onClick:()=>xs(t.id),children:[t.label,q(`span`,{class:`chevron`,children:`›`})]}),n&&q(`div`,{class:`section-body`,children:q(ol,{section:t.schema,children:q(ll,{id:t.id})})})]},t.id)})})}function ll({id:e}){switch(e){case`background`:return q(jc,{});case`defaults`:return q(Jc,{});case`symmetry`:return q(`button`,{class:`small`,title:`Turn every live symmetry copy into a normal stroke (Undo brings the live copies back)`,disabled:!It.value.some(e=>e.symmetric),onClick:As,children:`Bake copies into strokes`});case`lines`:return q(`button`,{class:`small`,title:`Give the newest stroke a new random variation (Undo brings the old one back)`,disabled:It.value.length===0,onClick:ks,children:`Re-roll last stroke`});case`light`:return q(y,{children:[q(Oc,{}),q(`button`,{class:`small`,title:`Match the light to the direction it comes from in the rock photo`,disabled:!R.value?.naturalLight,onClick:()=>ir(_r(R.value)),children:`Reset to rock's light`})]});default:return null}}function ul({tool:e,paramKey:t}){let n=e.params[t];return q(nl,{def:{...n,type:n.type??`number`,section:`path`},value:Gr(e,t),onChange:n=>{Kr(e,t,n),e.onParamChange?.(t)},onDragStart:e.onParamChange?Bt:void 0,onDragEnd:e.onParamChange?Vt:void 0})}function dl({settingKey:e}){return q(nl,{def:Yt[e],value:z.value[e],onChange:t=>Nr(e,t)})}var fl=e=>`advanced`in Yt[e];function pl({tool:e}){if(e.Panel)return q(e.Panel,{});if(!ts(e))return q(`p`,{class:`placeholder`,children:[e.label,` is coming in a later step.`]});let t=Object.keys(e.params??{}),n=t.filter(t=>!e.params[t].advanced),r=t.filter(t=>e.params[t].advanced),i=e.usesStrokeSettings?Xt:[],a=i.filter(e=>!fl(e)),o=i.filter(fl);return q(`div`,{class:`settings-body`,children:[n.map(t=>q(ul,{tool:e,paramKey:t},t)),a.map(e=>q(dl,{settingKey:e},e)),r.length+o.length>0&&q(Yc,{children:[r.map(t=>q(ul,{tool:e,paramKey:t},t)),o.map(e=>q(dl,{settingKey:e},e))]})]})}function ml({tray:e}){let t=es(G.value);return q(`div`,{class:`settings-body`,children:[q(`div`,{class:`shapes-tray`,role:`group`,"aria-label":e,children:$o.filter(t=>t.inTray===e).map(e=>q(`button`,{class:e.id===G.value?`small toggle active`:`small`,"aria-pressed":e.id===G.value,title:e.hint,onClick:()=>bs(e.id),children:e.label},e.id))}),t.inTray===e&&q(pl,{tool:t})]})}function hl(){return q(`aside`,{class:`panel`,children:[q(`section`,{class:`panel-block`,children:[q(`h2`,{class:`panel-heading`,children:`Tools`}),q(`ul`,{class:`tool-list`,children:$o.filter(e=>!e.inTray).map(e=>{let t=vs(e);return q(`li`,{children:[q(`button`,{class:t?`tool-button active`:`tool-button`,"aria-pressed":t,"aria-expanded":t,title:e.shortcut?`${e.label} (${ac(e.shortcut)}): ${e.hint}`:e.hint,onClick:()=>bs(e.id),children:[e.label,e.opensTray&&q(`span`,{class:`chevron`,children:`›`})]}),t&&q(`div`,{class:`tool-panel`,children:e.opensTray?q(ml,{tray:e.opensTray}):q(pl,{tool:e})})]},e.id)})}),q(cl,{group:`tools`})]}),q(sl,{})]})}function gl(e,t){switch(t){case`rgba8`:return e.RGBA8;case`rgba16f`:return e.RGBA16F;case`rgba32f`:return e.RGBA32F;case`rg16f`:return e.RG16F;case`rg32f`:return e.RG32F;case`r16f`:return e.R16F;case`r32f`:return e.R32F;case`rgba16ui`:return e.RGBA16UI}}function _l(e,t,{mipmaps:n=!0,repeat:r=!1,nearest:i=!1}={}){let a=e.createTexture();if(!a)throw Error(`Could not create texture`);e.bindTexture(e.TEXTURE_2D,a),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.NONE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,t),n&&e.generateMipmap(e.TEXTURE_2D);let o=n?e.LINEAR_MIPMAP_LINEAR:e.LINEAR;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,i?e.NEAREST:o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,i?e.NEAREST:e.LINEAR);let s={handle:a,width:t.width,height:t.height,format:`rgba8`};return vl(e,s,r),s}function vl(e,t,n){let r=n?e.REPEAT:e.CLAMP_TO_EDGE;e.bindTexture(e.TEXTURE_2D,t.handle),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,r)}function yl(e,t,n,r,{linear:i=!1}={}){let a=e.createTexture();if(!a)throw Error(`Could not create texture`);e.bindTexture(e.TEXTURE_2D,a),e.texStorage2D(e.TEXTURE_2D,1,gl(e,r),t,n);let o=i&&r!==`rgba16ui`?e.LINEAR:e.NEAREST;return e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),{handle:a,width:t,height:n,format:r}}function bl(e,t,n){e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,n.handle)}function J(e,t){t&&e.deleteTexture(t.handle)}function Y(e,t,n,r,i){let a=yl(e,t,n,r,i),o=e.createFramebuffer();if(!o)throw Error(`Could not create framebuffer`);e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a.handle,0);let s=e.checkFramebufferStatus(e.FRAMEBUFFER);if(e.bindFramebuffer(e.FRAMEBUFFER,null),s!==e.FRAMEBUFFER_COMPLETE)throw Error(`Framebuffer incomplete (${r} ${t}×${n}): 0x${s.toString(16)}`);return{fbo:o,texture:a}}function xl(e,t,n){e.bindFramebuffer(e.FRAMEBUFFER,t?t.fbo:null);let r=t?t.texture.width:n?.width??e.drawingBufferWidth,i=t?t.texture.height:n?.height??e.drawingBufferHeight;e.viewport(0,0,r,i)}function X(e,t){t&&(e.deleteFramebuffer(t.fbo),J(e,t.texture))}var Sl=16384,Cl=2e8,wl=2048;function Tl(e,t){let n=`scale`in t?t.scale:t.width/e.width;return{width:Math.max(1,Math.round(e.width*n)),height:Math.max(1,Math.round(e.height*n))}}function El(e){return e.width>16384||e.height>16384?`Too big: the longest side can be at most ${Sl} px.`:e.width*e.height>2e8?`Too big: at most ${Math.round(Cl/1e6)} million pixels.`:null}function Dl(e,t,n){return Math.max(1,Math.min(Math.max(e.width,e.height),t,n))}function Ol(e,t=wl){let n=[];for(let r=0;r<e.height;r+=t)for(let i=0;i<e.width;i+=t)n.push({x:i,y:r,width:Math.min(t,e.width-i),height:Math.min(t,e.height-r)});return n}function kl(e,t,n){let r=t,i=n,a=-1,o=-1;for(let s=0;s<n;s++){let n=s*t*4;for(let c=0;c<t;c++)e[n+c*4+3]>0&&(c<r&&(r=c),c>a&&(a=c),s<i&&(i=s),s>o&&(o=s))}return a<0?null:{x:r,y:i,width:a-r+1,height:o-i+1}}function Al(e,t){if(!e)return t;if(!t)return e;let n=Math.min(e.x,t.x),r=Math.min(e.y,t.y);return{x:n,y:r,width:Math.max(e.x+e.width,t.x+t.width)-n,height:Math.max(e.y+e.height,t.y+t.height)-r}}function jl(e,t,n){let r=Math.max(0,e.x-t),i=Math.max(0,e.y-t);return{x:r,y:i,width:Math.min(n.width,e.x+e.width+t)-r,height:Math.min(n.height,e.y+e.height+t)-i}}function Ml(e,t,n){return`glyphy-${e.replace(/[^a-z0-9-]+/gi,`-`).replace(/^-+|-+$/g,``)||`drawing`}-${t}.${n}`}var Nl=M(!1),Pl=null;function Fl(e){Pl=e}function Il(){return Pl}var Ll=()=>new Promise(e=>setTimeout(e,0)),Rl=`The graphics card ran out of memory. Try a smaller export size.`;async function zl(e,t){if(!Pl)throw Error(`The canvas isn't ready yet.`);let n=El(e.size);if(n)throw Error(n);let{renderer:r}=Pl,i=r.gl,a=e.kind===`glyph`;Nl.value=!0;let o=Y(i,wl,wl,`rgba8`);try{let n=Pl.baseFrame(),s=Dl(e.size,e.detail,i.getParameter(i.MAX_TEXTURE_SIZE)),c=e.size.width/n.doc.width,l=t=>({...n,pipeline:{...n.pipeline,workingResolution:s,allowUpscale:!0},view:{zoom:c,panX:-t.x,panY:-t.y},dpr:1,draft:null,debugView:`final`,pathView:!1,glyphOnly:a,noDropShadow:!e.dropShadow}),u=document.createElement(`canvas`);u.width=e.size.width,u.height=e.size.height;let d=u.getContext(`2d`);if(!d)throw Error(`Couldn't create an image that big in this browser.`);let f=Ol(e.size),p=null;for(let[e,n]of f.entries()){if(t(e===0?`Carving at export resolution…`:`Rendering ${e+1} of ${f.length}…`),await Ll(),i.getError(),r.render(l(n),o),i.isContextLost()||i.getError()===i.OUT_OF_MEMORY)throw Error(Rl);let{width:s,height:c}=n,u=new Uint8Array(s*c*4);i.bindFramebuffer(i.FRAMEBUFFER,o.fbo),i.readPixels(0,wl-c,s,c,i.RGBA,i.UNSIGNED_BYTE,u),i.bindFramebuffer(i.FRAMEBUFFER,null);let m=new ImageData(s,c);for(let e=0;e<c;e++)m.data.set(u.subarray((c-1-e)*s*4,(c-e)*s*4),e*s*4);if(a){let e=kl(m.data,s,c);p=Al(p,e&&{...e,x:e.x+n.x,y:e.y+n.y})}d.putImageData(m,n.x,n.y)}let m=u;if(a&&e.crop){if(!p)throw Error(`Nothing is carved yet, so there's no glyph to export.`);let t=jl(p,e.padding,e.size);m=document.createElement(`canvas`),m.width=t.width,m.height=t.height,m.getContext(`2d`).drawImage(u,t.x,t.y,t.width,t.height,0,0,t.width,t.height)}t(e.format===`jpg`?`Encoding JPG…`:`Encoding PNG…`),await Ll();let h=e.format===`jpg`&&!a?`image/jpeg`:`image/png`,g=await new Promise(t=>m.toBlob(t,h,e.quality));if(!g)throw Error(`The browser couldn't encode the image (it may be too big).`);return{blob:g,size:{width:m.width,height:m.height}}}finally{X(i,o),Nl.value=!1,Pl?.redraw()}}var Bl=class extends Error{};function Vl(e){let t=e.getContext(`webgl2`,{alpha:!1,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1});if(!t)throw new Bl(`Glyphy needs WebGL2, which this browser or device doesn't support. Try a recent Chrome, Edge, Firefox or Safari, and make sure hardware acceleration is on.`);if(!t.getExtension(`EXT_color_buffer_float`))throw new Bl(`Glyphy needs float render targets (EXT_color_buffer_float), which this GPU doesn't support. Try another browser or device.`);return t.getExtension(`OES_texture_float_linear`),t}function Hl(e,t){return Math.max(e.width/t.width,e.height/t.height)}function Ul(e,t,n){return(n.tileSize?n.tileSize/Math.max(t.width,t.height):Hl(e,t))*n.scale}function Wl(e,t,n){let r=Ul(e,t,n);return Sn(I(-t.width/2,-t.height/2),yn(r),bn(n.rotation*Math.PI/180),I(e.width/2+n.offsetX/100*e.width,e.height/2+n.offsetY/100*e.height))}function Gl(e,t,n){return Sn(Cn(Wl(e,t,n)),yn(1/t.width,1/t.height))}function Kl(e,t,n){return{dx:t/e.width*100,dy:n/e.height*100}}var ql=e=>(e%360+360)%360;function Jl(e,t){return ql(e-t)}function Yl(e,t){return ql(e+t)}function Xl(e,t){let n=e*Math.PI/180,r=t*Math.PI/180;return[Math.cos(n)*Math.cos(r),-Math.sin(n)*Math.cos(r),Math.sin(r)]}function Zl(e,t){let n=e*Math.PI/180,r=Math.cos(t*Math.PI/180);return{x:Math.cos(n)*r,y:-Math.sin(n)*r}}function Ql(e,t=5){let n=Math.min(1,Math.hypot(e.x,e.y));return{angle:ql(Math.atan2(-e.y,e.x)*180/Math.PI),elevation:Math.max(t,Math.acos(n)*180/Math.PI)}}function $l(e){return e.split(`
`).map((e,t)=>`${String(t+1).padStart(3)}  ${e}`).join(`
`)}function eu(e,t,n,r){let i=e.createShader(t);if(!i)throw Error(`Could not create shader ${r}`);if(e.shaderSource(i,n),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS)&&!e.isContextLost()){let t=e.getShaderInfoLog(i)??``;throw e.deleteShader(i),Error(`Shader ${r} failed to compile:\n${t}\n${$l(n)}`)}return i}function tu(e,t,n,r){let i=eu(e,e.VERTEX_SHADER,t,`${r}.vert`),a=eu(e,e.FRAGMENT_SHADER,n,`${r}.frag`),o=e.createProgram();if(!o)throw Error(`Could not create program ${r}`);if(e.attachShader(o,i),e.attachShader(o,a),e.linkProgram(o),e.deleteShader(i),e.deleteShader(a),!e.getProgramParameter(o,e.LINK_STATUS)&&!e.isContextLost()){let t=e.getProgramInfoLog(o)??``;throw e.deleteProgram(o),Error(`Program ${r} failed to link:\n${t}`)}return{gl:e,handle:o,uniforms:new Map}}function nu(e,t){let n=e.uniforms.get(t);return n===void 0&&(n=e.gl.getUniformLocation(e.handle,t),e.uniforms.set(t,n)),n}function ru(e,t){let n=e.gl;for(let[r,i]of Object.entries(t)){let t=nu(e,r);if(t){if(typeof i==`number`)n.uniform1f(t,i);else if(i.length===2)n.uniform2fv(t,i);else if(i.length===3)n.uniform3fv(t,i);else if(i.length===4)n.uniform4fv(t,i);else if(i.length===9)n.uniformMatrix3fv(t,!1,i);else throw Error(`Unsupported uniform length ${i.length} for ${r}`)}}}function iu(e,t,n){let r=nu(e,t);r&&e.gl.uniform1i(r,n)}function au(e){let t=e.createVertexArray();if(!t)throw Error(`Could not create vertex array`);return t}function Z(e,t,n){xl(e,n.target,n.screenSize),e.useProgram(n.program.handle);let r=0;for(let[t,i]of Object.entries(n.textures??{}))bl(e,r,i),iu(n.program,t,r),r++;n.uniforms&&ru(n.program,n.uniforms);for(let[e,t]of Object.entries(n.ints??{}))iu(n.program,e,t);e.bindVertexArray(t),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)}var ou=`#version 300 es
// Ambient occlusion: how enclosed each point of the carving is. Comparing the height with
// a blurred height (the average surrounding height) at a radius r: in a narrow, deep
// groove the surroundings are much higher than the point, so (blurred − h) / r is large
// and it darkens; in a wide, shallow groove they're about the same. Two radii (fine and
// broad) are averaged. Uses the carving height only (the photo already shows the rock's own).

precision highp float;

uniform sampler2D uHeight;
uniform sampler2D uBlurA; // height blurred at radius uRadiusA (document px)
uniform sampler2D uBlurB; // ... at radius uRadiusB
uniform float uRadiusA;
uniform float uRadiusB;

out vec4 outAo;

void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  float h = texelFetch(uHeight, p, 0).r;
  float a = clamp((texelFetch(uBlurA, p, 0).r - h) / uRadiusA, 0.0, 1.0);
  float b = clamp((texelFetch(uBlurB, p, 0).r - h) / uRadiusB, 0.0, 1.0);
  outAo = vec4(0.5 * (a + b), 0.0, 0.0, 1.0);
}
`,su=`#version 300 es
// Area pass, corner rounding + grow: one direction of a separable Gaussian blur of the
// distance field, then + uOffset. Blurring a distance field averages it over a disc, which
// leaves straight edges where they are but pulls sharp convex corners in and pushes sharp
// concave corners out, rounding both by about the blur radius (including a single stroke's
// own sharp turns). Taps are spread \`uStride\` texels apart so wide radii stay cheap.
// uRadius = 0 just copies (used to apply grow/shrink when there's no rounding).

precision highp float;

uniform sampler2D uField;
uniform vec2 uDir;      // (1,0) or (0,1)
uniform int uRadius;    // in taps
uniform int uStride;    // texels between taps
uniform float uSigma;   // in texels
uniform float uOffset;  // added after blurring (−grow), document px

out vec4 outField;

void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  ivec2 hi = textureSize(uField, 0) - 1;
  float sum = 0.0;
  float wsum = 0.0;
  for (int i = -uRadius; i <= uRadius; i++) {
    float x = float(i * uStride);
    float w = exp(-0.5 * x * x / max(uSigma * uSigma, 1e-6));
    sum += w * texelFetch(uField, clamp(p + ivec2(uDir) * i * uStride, ivec2(0), hi), 0).r;
    wsum += w;
  }
  outField = vec4(sum / wsum + uOffset, 0.0, 0.0, 1.0);
}
`,cu=`#version 300 es
// One triangle that covers the whole target (vertices at (-1,-1), (3,-1), (-1,3)); the
// part outside clip space is discarded, so every pixel gets exactly one fragment.
// vUv runs 0–1 across the target, bottom-left origin (GL convention).

out vec2 vUv;

void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`,lu=`#version 300 es
// Height pass: the carving's height (document px, 0 = rock surface, negative = cut into it).
// For each texel inside the carved area:
//   u = how far in from the edge, as a fraction of the local half-width (0 at the edge, 1 on
//       the centerline), from the area SDF and the blended stroke radius;
//   u is stretched by wall steepness (steeper = full depth reached closer to the edge);
//   a profile curve turns u into a depth fraction f;
//   height = −(depth in px) × stroke depth × f.
// Then pecking: small round dents (one per jittered grid cell, seeded, in document
// coordinates) are pressed into the floor, fading in from the edge so the outline stays
// clean.
// Damage (ids A, painted by the damage brush) presses in flake scars anywhere, carved or not:
// shallow scallops shaped by cellular noise (deepest in each cell, ridges where flakes meet),
// like the conchoidal scars of flakes broken off the rock.
// Stroke kinds change the cross-section: cupules are dishes (1 − (1 − u)², deepest in the
// middle, lightly pecked); fills have a flat floor (steep walls) pitted by their own fill
// texture, which rides along as a fraction on the kind code (strokeExpansion.ts kindValue). Outside the carving the height is 0. (The rock's relief is added in the surface pass.)
// Raised mode builds *positive* height instead: the same SDF, but a bevel from the outline up
// to a flat top one bevel width in (never more than the local half-width, so thin lines are
// fully rounded); "eroded" adds noise that wears the shoulder and pits the top. No pecking.

precision highp float;

// #include noise

// #include profile

uniform sampler2D uArea;  // R32F area SDF, document px
uniform sampler2D uAttrs; // G depth 0–1, B radius (document px), A kind (+ fill texture)
uniform sampler2D uIds;   // A = damage × its depth (0 = none)
uniform float uSpallPx;   // flake scar depth for damage 1, document px
uniform float uDepthPx;   // full depth in document px for a stroke depth of 1
uniform float uSteepness; // 0–1
uniform int uProfile;     // 0 V, 1 U, 2 flat chisel, 3 feathered
uniform vec2 uTexel;      // document px per texel (x, y)
uniform float uPeckDensity;   // 0 = no pecking
uniform float uPeckSize;      // pit radius, document px
uniform float uPeckVariation; // 0–1
uniform int uRaised;          // 1 = raised glyphs (positive height)
uniform int uBevel;           // raised edge: 0 rounded, 1 chamfered, 2 steep, 3 eroded
uniform float uBevelPx;       // bevel width, document px

const uint SEED_PECK = 0x9e37u;
const uint SEED_ERODE = 0x51edu;
const uint SEED_SPALL = 0x7a11u;
const float SPALL_CELL = 11.0; // flake size, document px

out vec4 outHeight;

/**
 * Deepest pit at this point (≤ 0, document px). Pits are dome-shaped dents (1 − (d/r)²)²
 * about 0.45·r deep; denser pecking = smaller cells and fewer empty ones.
 */
float pecking(vec2 doc, float density) {
  float cellSize = uPeckSize * mix(6.0, 2.0, density);
  float keep = mix(0.35, 1.0, density);
  ivec2 i = ivec2(floor(doc / cellSize));
  float pit = 0.0;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      ivec2 c = i + ivec2(x, y);
      vec2 r = rand2(c, SEED_PECK);
      if (rand01(hashCell(c, SEED_PECK + 1u)) > keep) continue;
      float radius = uPeckSize * (1.0 + uPeckVariation * (r.y - 0.5) * 1.6);
      float d = length(doc - (vec2(c) + r) * cellSize) / radius;
      if (d < 1.0) {
        float w = 1.0 - d * d;
        pit = min(pit, -0.45 * radius * w * w);
      }
    }
  }
  return pit;
}

/** Raised glyph height at a point inside the area (≥ 0, document px). */
const float KIND_LINE = 1.0, KIND_FILL = 2.0, KIND_CUPULE = 3.0;

float raisedHeight(float d, vec4 attrs, vec2 doc, float kind) {
  // Cupules become round domes (the bevel spans the whole radius).
  bool dome = kind == KIND_CUPULE;
  float bevel = dome ? max(attrs.b, 0.5) : max(min(uBevelPx, attrs.b), 0.5);
  float u = -d / bevel;
  float top = 1.0;
  if (dome) return uDepthPx * attrs.g * raisedProfile(u, 0);
  if (uBevel == 3) {
    // Eroded: fractal noise at the bevel's scale makes the shoulder uneven, and a broader,
    // gentler noise wears the top down in patches.
    u *= 1.0 + 0.7 * fbm(doc / max(uBevelPx * 1.2, 1.0), SEED_ERODE);
    top = 1.0 - 0.3 * max(0.0, fbm(doc / max(uBevelPx * 4.0, 2.0), SEED_ERODE + 7u));
  }
  return uDepthPx * attrs.g * raisedProfile(u, uBevel) * top;
}

void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  float d = texelFetch(uArea, p, 0).r;
  vec4 attrs = texelFetch(uAttrs, p, 0);
  float h = 0.0;
  float kind = floor(attrs.a + 0.5);
  float fillTexture = clamp((attrs.a - kind) / 0.45, 0.0, 1.0);
  vec2 doc = (vec2(p) + 0.5) * uTexel;
  if (d < 0.0 && uRaised == 1) {
    h = raisedHeight(d, attrs, doc, kind);
  } else if (d < 0.0) {
    float radius = max(attrs.b, 0.5);
    float u = -d / radius;
    float profile;
    float density = uPeckDensity;
    float pitScale = 1.0;
    if (kind == KIND_CUPULE) {
      profile = 1.0 - (1.0 - min(u, 1.0)) * (1.0 - min(u, 1.0)); // dish
      pitScale = 0.4; // cupules were ground smooth after pecking
    } else if (kind == KIND_FILL) {
      // Flat floor: full depth a short wall (a few peck sizes) in from the edge, whatever the width.
      float wall = min(radius, 3.0 * uPeckSize + 4.0);
      profile = smoothstep(0.0, 0.5, -d / max(wall, 1.0));
      density = max(uPeckDensity, fillTexture);
      pitScale = 0.3 + 1.4 * fillTexture;
    } else {
      profile = carveProfile(u, uSteepness, uProfile);
    }
    h = -uDepthPx * attrs.g * profile;
    if (density > 0.0 && uPeckSize > 0.0 && pitScale > 0.0) {
      h += pitScale * pecking(doc, density) * smoothstep(0.0, 1.0, -d / (1.5 * uPeckSize));
    }
  }
  float damage = texelFetch(uIds, p, 0).a;
  if (damage > 0.0) {
    ivec2 cell;
    vec2 f = worley(doc / SPALL_CELL, SEED_SPALL, cell);
    float scallop = 0.55 + 0.45 * smoothstep(0.0, 0.35, f.y - f.x);
    float dish = 1.0 - 0.35 * f.x * f.x; // each flake deepest near its cell's center
    h -= uSpallPx * damage * scallop * dish;
  }
  outHeight = vec4(h, 0.0, 0.0, 1.0);
}
`,uu={noise:`// Shared seeded noise for shaders, pasted in by include.ts where a shader asks for "noise".
// Integer hashing (PCG) so results are bit-identical on every GPU and every frame; all
// inputs are document coordinates, so nothing shimmers when you pan, zoom or move the light.

/** PCG hash: one well-mixed 32-bit value per input. */
uint pcg(uint v) {
  uint state = v * 747796405u + 2891336453u;
  uint word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
  return (word >> 22u) ^ word;
}

/** Hash of an integer cell and a seed. */
uint hashCell(ivec2 c, uint seed) {
  return pcg(uint(c.x) ^ pcg(uint(c.y) ^ pcg(seed)));
}

float rand01(uint h) {
  return float(h >> 8u) / 16777216.0;
}

vec2 rand2(ivec2 c, uint seed) {
  uint h = hashCell(c, seed);
  return vec2(rand01(h), rand01(pcg(h)));
}

/** Smooth value noise in [-1, 1]: random values on the integer grid, smootherstep between. */
float valueNoise(vec2 p, uint seed) {
  ivec2 i = ivec2(floor(p));
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = rand01(hashCell(i, seed));
  float b = rand01(hashCell(i + ivec2(1, 0), seed));
  float c = rand01(hashCell(i + ivec2(0, 1), seed));
  float d = rand01(hashCell(i + ivec2(1, 1), seed));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y) * 2.0 - 1.0;
}

/** Fractal noise: 4 octaves, each twice as fine and half as strong. Roughly [-1, 1]. */
float fbm(vec2 p, uint seed) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    sum += amp * valueNoise(p, seed + uint(i) * 101u);
    p = p * 2.03 + 17.1;
    amp *= 0.5;
  }
  return sum / 0.9375;
}

/**
 * Worley (cellular) noise: one jittered feature point per grid cell. Returns the distances
 * to the nearest (x) and second-nearest (y) feature points, in cell units; \`cell\` is the
 * nearest point's cell (a stable id for per-cell randomness).
 */
vec2 worley(vec2 p, uint seed, out ivec2 cell) {
  ivec2 i = ivec2(floor(p));
  float f1 = 1e9;
  float f2 = 1e9;
  cell = i;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      ivec2 c = i + ivec2(x, y);
      vec2 f = vec2(c) + rand2(c, seed);
      float d = length(p - f);
      if (d < f1) {
        f2 = f1;
        f1 = d;
        cell = c;
      } else if (d < f2) {
        f2 = d;
      }
    }
  }
  return vec2(f1, f2);
}
`,capsule:`// Exact signed distance to a tapered capsule: two circles of radius ra (at pa) and rb (at pb)
// joined by their common tangents (Inigo Quilez's "uneven capsule"). Negative inside.
// Pasted in by include.ts where a shader asks for "capsule".

float cross2(vec2 a, vec2 b) { return a.x * b.y - a.y * b.x; }

float sdUnevenCapsule(vec2 p, vec2 pa, vec2 pb, float ra, float rb) {
  p -= pa;
  pb -= pa;
  float h = dot(pb, pb);
  float dr = ra - rb;
  // Degenerate: a point, or one end circle swallows the other.
  if (h <= dr * dr + 1e-6) {
    return ra >= rb ? length(p) - ra : length(p - pb) - rb;
  }
  // Work in the segment's frame (x across, y along, both scaled by 1/h), mirrored across the axis.
  vec2 q = vec2(dot(p, vec2(pb.y, -pb.x)), dot(p, pb)) / h;
  q.x = abs(q.x);
  vec2 c = vec2(sqrt(h - dr * dr), dr);
  float k = cross2(c, q);
  float m = dot(c, q);
  float n = dot(q, q);
  if (k < 0.0) return sqrt(h * n) - ra;                      // nearest the start circle
  if (k > c.x) return sqrt(h * (n + 1.0 - 2.0 * q.y)) - rb;  // nearest the end circle
  return m - ra;                                             // nearest the tangent side
}
`,profile:`// Groove cross-section, shared by the height pass and the live drawing preview.
// u = how far in from the edge as a fraction of the half-width (0 edge, 1 centerline);
// wall steepness stretches u so full depth is reached closer to the edge; the profile
// curve turns it into a depth fraction 0–1.
// Pasted in by include.ts where a shader asks for "profile".

float carveProfile(float u, float steepness, int profile) {
  u = min(1.0, clamp(u, 0.0, 1.0) / (1.0 - 0.8 * steepness));
  if (profile == 0) return u;                                     // V: straight walls to a point
  if (profile == 1) return sqrt(max(0.0, 1.0 - (1.0 - u) * (1.0 - u))); // U: quarter circle
  if (profile == 2) return smoothstep(0.0, 0.35, u);              // chisel: steep walls, flat floor
  return u * u * (3.0 - 2.0 * u);                                 // feathered: soft edge and floor
}

// Raised glyph edge (bevel), from the ground (u = 0, at the outline) up to the flat top
// (u = 1, one bevel width in). Returns the height fraction 0–1.
float raisedProfile(float u, int bevel) {
  u = clamp(u, 0.0, 1.0);
  if (bevel == 0) return sqrt(max(0.0, 1.0 - (1.0 - u) * (1.0 - u))); // rounded: quarter circle
  if (bevel == 1) return u;                                            // chamfered: straight slope
  if (bevel == 2) return smoothstep(0.0, 0.25, u);                     // steep-sided: near-vertical wall
  return u * u * (3.0 - 2.0 * u);                                      // eroded: soft shoulder (+ noise)
}
`};function du(e){return e.replace(/^\/\/ #include (\w+)\r?$/gm,(e,t)=>uu[t]??e)}var fu=`#version 300 es
// Normals pass: surface normals from heights with a Sobel filter (a 3×3 slope estimate
// that's less noisy than plain neighbour differences), in document px per document px so
// the result doesn't depend on the working resolution:  N = normalize(−dh/dx, −dh/dy, 1).
// Two normals are made from the surface pass (surface.frag.glsl):
//   total: carving + rock relief + rock texture on the carving floor
//   rock:  rock relief only (photos: what the photo's own lighting already shows)
// Output: xy of each (z = sqrt(1 − x² − y²)): R,G = total, B,A = rock.

precision highp float;

uniform sampler2D uSurface;      // R total height, G rock-only height, document px
uniform vec2 uTexel;             // document px per texel (x, y)

out vec4 outNormals;

vec2 sobelSlope(float tl, float t, float tr, float l, float r, float bl, float b, float br) {
  float dx = ((tr + 2.0 * r + br) - (tl + 2.0 * l + bl)) / (8.0 * uTexel.x);
  float dy = ((bl + 2.0 * b + br) - (tl + 2.0 * t + tr)) / (8.0 * uTexel.y);
  return normalize(vec3(-dx, -dy, 1.0)).xy;
}

void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  ivec2 hi = textureSize(uSurface, 0) - 1;
  float T[9];
  float R[9];
  for (int j = 0; j < 3; j++) {
    for (int i = 0; i < 3; i++) {
      vec2 tr = texelFetch(uSurface, clamp(p + ivec2(i - 1, j - 1), ivec2(0), hi), 0).rg;
      T[j * 3 + i] = tr.x;
      R[j * 3 + i] = tr.y;
    }
  }
  // Index layout: 0 1 2 / 3 4 5 / 6 7 8 (row 0 = one texel up in the document).
  vec2 nt = sobelSlope(T[0], T[1], T[2], T[3], T[5], T[6], T[7], T[8]);
  vec2 nr = sobelSlope(R[0], R[1], R[2], R[3], R[5], R[6], R[7], R[8]);
  outNormals = vec4(nt, nr);
}
`,pu=`#version 300 es
// Surface pass: the whole surface height in document px, per working texel.
//   rock  = rock relief (bundle height map, −0.5…0.5) × uReliefPx
//   total = carving height + rock, where inside the cut only uInsideFollow of the rock's
//           relief remains (0 = flat floor, 1 = the floor keeps every bump).
// Output R = total, G = rock only. The normals pass shades from these; for materials the
// shadow and occlusion passes also use \`total\`, so the rock's own bumps cast shadows.
// Raised glyphs: the ground around them isn't drawn, so the rock's bumps go only on the
// glyph (fading in with its height), uReliefPx of them.

precision highp float;

uniform sampler2D uHeight;     // carving height, document px (≤ 0)
uniform sampler2D uRock;       // rock relief (R16F, −0.5 low … 0.5 high), photo uv
uniform float uHasRock;
uniform mat3 uDocToRockUv;
uniform float uRockLod;        // mip level matching one working texel
uniform float uReliefPx;       // relief height range on the uncarved surface, document px
uniform float uInsideFollow;   // fraction of that relief kept on the carving floor
uniform float uCarveDepthPx;   // full carving depth (stroke depth 1), document px; raised: height
uniform float uRaised;         // 1 = raised glyphs (height ≥ 0)
uniform vec2 uTexel;           // document px per texel (x, y)

out vec4 outSurface;

void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  float c = texelFetch(uHeight, p, 0).r;
  vec2 doc = (vec2(p) + 0.5) * uTexel;
  vec2 uv = (uDocToRockUv * vec3(doc, 1.0)).xy;
  float r = uHasRock * textureLod(uRock, uv, uRockLod).r;
  float rock = r * uReliefPx;
  float total;
  if (uRaised > 0.5) {
    total = c + rock * smoothstep(0.0, 1.0, c / max(uCarveDepthPx * 0.25, 1e-3));
  } else {
    float inside = smoothstep(0.0, 1.0, -c / max(uCarveDepthPx * 0.5, 1e-3));
    total = c + rock * mix(1.0, uInsideFollow, inside);
  }
  outSurface = vec4(total, rock, 0.0, 1.0);
}
`,mu=`#version 300 es
// Area pass, combine: merge (smooth union) between different strokes (or far-apart parts
// of one stroke, see jfaSecond.frag.glsl), plus the per-texel carving attributes.
//   d1 = signed distance to the carving (its nearest stroke A)
//   d2 = distance to the nearest *different* stroke/part B
//   merged = smin(d1, d2, k): a polynomial smooth minimum. Where the two distances are
//   within k of each other (the strokes meet or come close) it dips below both, filling the
//   junction with a curved fillet about k wide; elsewhere it equals d1 exactly.
// Depth and radius blend from A to B with the same weight, so a shallow stroke merging into
// a deep one transitions smoothly instead of stepping at the halfway line.
// Output: R field (document px), G depth, B radius, A kind.

precision highp float;
precision highp usampler2D;

uniform sampler2D uSdf;     // base signed distance
uniform usampler2D uBase;   // xy = nearest inside texel (stroke A)
uniform usampler2D uSecond; // xy = nearest texel of a different stroke (B)
uniform sampler2D uMask;    // depth, radius, kind at stroke texels
uniform float uTexel;       // document px per texel
uniform float uMerge;       // fillet size k, document px (0 = off)

out vec4 outArea;

const uint NONE = 65535u;

void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  vec2 me = vec2(p);
  float d1 = texelFetch(uSdf, p, 0).r;
  uvec2 a = texelFetch(uBase, p, 0).xy;
  vec4 attrA = a.x == NONE ? vec4(0.0) : texelFetch(uMask, ivec2(a), 0);
  float field = d1;
  float depth = attrA.g;
  float radius = attrA.b;

  if (uMerge > 0.0) {
    uvec2 b = texelFetch(uSecond, p, 0).xy;
    if (b.x != NONE) {
      float d2 = (length(vec2(b) - me) - 0.5) * uTexel;
      float k = uMerge;
      float h = max(k - abs(d1 - d2), 0.0) / k;
      field = min(d1, d2) - h * h * k * 0.25;
      // Blend weight toward A (1 where A is clearly nearer, 0 where B is).
      float w = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
      vec4 attrB = texelFetch(uMask, ivec2(b), 0);
      depth = mix(attrB.g, attrA.g, w);
      radius = mix(attrB.b, attrA.b, w);
    }
  }
  outArea = vec4(field, depth, radius, attrA.a);
}
`,hu=`#version 300 es
// Area pass, second-nearest flood: for each texel, the nearest carved texel that belongs to
// a *different part* than its nearest one (the base flood's xy seed). One jump-flood step:
// candidates are the 3×3 neighbours' base seeds and their current second seeds; keep the
// closest that counts as different. Merge then blends the two distances (smooth union).
// "Different" = another stroke, or the same stroke far enough away *along the line* that
// it can only be close in space by looping back (a self-crossing, a closed loop, a hairpin):
// more than 2·(both radii) + 2·merge apart in arc length. Ordinary curves and corners of a
// stroke are never compared with themselves, so they don't bulge. On a closed loop (circle,
// ring) arc distance wraps around, so the loop's start and end are neighbours, not a seam.

precision highp float;
precision highp usampler2D;

uniform usampler2D uBase;   // final base flood: xy = nearest inside texel
uniform usampler2D uSecond; // current second seeds (xy)
uniform sampler2D uIds;     // R stroke id (0 = none), G arc length / 4, B loop length / 4
uniform sampler2D uMask;    // B = half-width at stroke texels
uniform float uMerge;       // document px
uniform int uStep;

out uvec4 outSeeds;

const uint NONE = 65535u;

void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  ivec2 size = textureSize(uBase, 0);
  vec2 me = vec2(p);
  uvec2 a = texelFetch(uBase, p, 0).xy;
  if (a.x == NONE) {
    outSeeds = uvec4(NONE);
    return;
  }
  vec3 idA = texelFetch(uIds, ivec2(a), 0).rgb;
  float rA = texelFetch(uMask, ivec2(a), 0).b;

  uvec2 best = uvec2(NONE);
  float dBest = 1e30;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      ivec2 q = p + ivec2(x, y) * uStep;
      if (any(lessThan(q, ivec2(0))) || any(greaterThanEqual(q, size))) continue;
      uvec2 cands[2] = uvec2[2](texelFetch(uBase, q, 0).xy, texelFetch(uSecond, q, 0).xy);
      for (int i = 0; i < 2; i++) {
        uvec2 c = cands[i];
        if (c.x == NONE) continue;
        vec3 idC = texelFetch(uIds, ivec2(c), 0).rgb;
        if (idC.r == 0.0) continue;
        if (idC.r == idA.r) {
          float rC = texelFetch(uMask, ivec2(c), 0).b;
          float minGap = 2.0 * (rA + rC) + 2.0 * uMerge;
          float gap = abs(idC.g - idA.g) * 4.0;
          float loopLen = max(idA.b, idC.b) * 4.0;
          if (loopLen > 0.0) gap = min(gap, loopLen - gap);
          if (gap <= minGap) continue; // same part of the same stroke
        }
        vec2 d = vec2(c) - me;
        float dd = dot(d, d);
        if (dd < dBest) { dBest = dd; best = c; }
      }
    }
  }
  outSeeds = uvec4(best, NONE, NONE);
}
`,gu=`#version 300 es
// Re-flood, seeds: like jfaSeed, but the shape is "field < threshold" for a distance field
// (e.g. the carving grown by r for closing, or shrunk by r for opening). Growing or
// shrinking a distance field by a constant gives the right *edge*, but not the right
// distances on the other side of it; re-flooding the new shape fixes that, which is what
// makes the second half of closing/opening exact.

precision highp float;
precision highp usampler2D;

uniform sampler2D uField;
uniform float uThreshold;

out uvec4 outSeeds;

const uint NONE = 65535u;

void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  uvec2 me = uvec2(p);
  bool inside = texelFetch(uField, p, 0).r < uThreshold;
  outSeeds = inside ? uvec4(me, NONE, NONE) : uvec4(NONE, NONE, me);
}
`,_u=`#version 300 es
// Distance pass 2/3, one jump-flood step (Rong & Tan, 2006): each texel looks at itself and
// its 8 neighbours \`uStep\` texels away, and keeps whichever of their seeds is closest to it
// (separately for the inside and outside floods). Running steps N/2, N/4, … 1 spreads every
// seed across the whole texture in log2(N) passes; an extra step-1 pass fixes most of the
// rare wrong picks.

precision highp float;
precision highp usampler2D;

uniform usampler2D uSeeds;
uniform int uStep;

out uvec4 outSeeds;

const uint NONE = 65535u;

void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  ivec2 size = textureSize(uSeeds, 0);
  vec2 me = vec2(p);
  uvec2 bestIn = uvec2(NONE);
  uvec2 bestOut = uvec2(NONE);
  float dIn = 1e30;
  float dOut = 1e30;

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      ivec2 q = p + ivec2(x, y) * uStep;
      if (any(lessThan(q, ivec2(0))) || any(greaterThanEqual(q, size))) continue;
      uvec4 s = texelFetch(uSeeds, q, 0);
      if (s.x != NONE) {
        vec2 d = vec2(s.xy) - me;
        float dd = dot(d, d);
        if (dd < dIn) { dIn = dd; bestIn = s.xy; }
      }
      if (s.z != NONE) {
        vec2 d = vec2(s.zw) - me;
        float dd = dot(d, d);
        if (dd < dOut) { dOut = dd; bestOut = s.zw; }
      }
    }
  }
  outSeeds = uvec4(bestIn, bestOut);
}
`,vu=`#version 300 es
// Re-flood, distance: the signed distance to the shape "field < threshold", plus \`uPost\`.
// Within a texel of the edge the input field is already accurate there, so field −
// threshold is used directly (smooth contours); farther away the flooded seeds give the
// true distance (± half a texel, as in distance.frag.glsl).
//   closing r = reflood(threshold +r, post +r)   (grow, re-measure, shrink back)
//   opening r = reflood(threshold −r, post −r)   (shrink, re-measure, grow back)

precision highp float;
precision highp usampler2D;

uniform usampler2D uSeeds;
uniform sampler2D uField;
uniform float uThreshold;
uniform float uPost;
uniform float uTexel;

out vec4 outField;

const uint NONE = 65535u;
const float FAR = 1e5;

void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  vec2 me = vec2(p);
  float v = texelFetch(uField, p, 0).r - uThreshold;
  uvec4 s = texelFetch(uSeeds, p, 0);
  float d;
  if (abs(v) < uTexel) {
    d = v;
  } else if (v < 0.0) {
    d = s.z != NONE ? -(length(vec2(s.zw) - me) - 0.5) * uTexel : -FAR;
  } else {
    d = s.x != NONE ? (length(vec2(s.xy) - me) - 0.5) * uTexel : FAR;
  }
  outField = vec4(d + uPost, 0.0, 0.0, 1.0);
}
`,yu=`#version 300 es
// Area pass, last step: hand-made edges. Works on the area's signed distance field
// (document px, negative = carved), so it only changes where the edge is:
//   organic: fractal noise pushes the edge in and out; sharpness reshapes the noise from
//            rounded swells to crisp, pointy ones.
//   chippy:  Worley cells; each cell bites a random amount out of the rock along the edge,
//            and the bites meet at angular cell borders (sharpness = crisper borders).
//   cracked: thin breaks along Worley cell borders, reaching out from the edge.

precision highp float;

// #include noise

uniform sampler2D uField;    // area SDF, document px
uniform vec2 uTexel;         // document px per texel (x, y)
uniform float uAmount;       // roughness, document px
uniform float uScale;        // roughness feature size, document px
uniform float uSharpness;    // 0–1
uniform int uType;           // 0 organic, 1 chippy, 2 cracked

out vec4 outField;

const uint SEED_EDGE = 0x1234u;

void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  vec2 doc = (vec2(p) + 0.5) * uTexel;
  float d = texelFetch(uField, p, 0).r;
  float rough = 0.0;

  if (uAmount > 0.0) {
    vec2 q = doc / uScale;
    if (uType == 0) {
      float n = fbm(q, SEED_EDGE);
      rough = uAmount * sign(n) * pow(abs(n), mix(1.6, 0.6, uSharpness));
    } else {
      ivec2 cell;
      vec2 f = worley(q, SEED_EDGE, cell);
      float border = f.y - f.x; // 0 on a cell border
      if (uType == 1) {
        float bite = rand01(hashCell(cell, SEED_EDGE + 7u));
        float soft = mix(0.35, 0.03, uSharpness);
        rough = -uAmount * 1.5 * bite * smoothstep(0.0, soft, border);
      } else {
        float width = mix(0.12, 0.03, uSharpness);
        rough = -uAmount * 2.0 * (1.0 - smoothstep(0.0, width, border));
        rough += 0.3 * uAmount * fbm(q * 2.0, SEED_EDGE + 3u);
      }
    }
  }
  d += rough;
  outField = vec4(d, 0.0, 0.0, 1.0);
}
`,bu=`#version 300 es
// Distance pass 3/3, the signed distance field (document px, negative inside the carving).
// Seeds sit at texel centers, so the boundary is half a texel from the nearest seed:
//   outside: distance to the nearest inside texel − ½ texel
//   inside:  −(distance to the nearest outside texel − ½ texel)
// Right at the edge the mask's antialiased coverage already encodes the exact distance
// (the mask wrote coverage = ½ − d/texel), so partially covered texels use that instead,
// which keeps contours smooth.

precision highp float;
precision highp usampler2D;

uniform usampler2D uSeeds;
uniform sampler2D uMask;
uniform float uTexel; // document px per texel

out vec4 outDistance;

const uint NONE = 65535u;
const float FAR = 1e5;

void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  vec2 me = vec2(p);
  uvec4 s = texelFetch(uSeeds, p, 0);
  float cov = texelFetch(uMask, p, 0).r;

  float sdf;
  if (cov > 0.0 && cov < 1.0) {
    sdf = (0.5 - cov) * uTexel;
  } else if (cov >= 0.5) {
    sdf = s.z != NONE ? -(length(vec2(s.zw) - me) - 0.5) * uTexel : -FAR;
  } else {
    sdf = s.x != NONE ? (length(vec2(s.xy) - me) - 0.5) * uTexel : FAR;
  }
  outDistance = vec4(sdf, 0.0, 0.0, 1.0);
}
`,xu=`#version 300 es
// Distance pass 1/3, seeds: every texel is a seed for one of two floods that run together.
// Carved texels (mask coverage ≥ 0.5) seed the "nearest inside" flood (xy); all other
// texels seed the "nearest outside" flood (zw). Seeds are integer texel coordinates;
// 65535 means "no seed yet".

precision highp float;
precision highp usampler2D;

uniform sampler2D uMask;

out uvec4 outSeeds;

const uint NONE = 65535u;

void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  uvec2 me = uvec2(p);
  bool inside = texelFetch(uMask, p, 0).r >= 0.5;
  outSeeds = inside ? uvec4(me, NONE, NONE) : uvec4(NONE, NONE, me);
}
`;function Su(e,t){let n=Math.max(e,t),r=1;for(;r*2<n;)r*=2;let i=[];for(;r>=1;r=Math.floor(r/2))i.push(r);return i.push(1),i}var Cu=class{gl;quad;seedProgram;stepProgram;distanceProgram;ping=null;pong=null;sdfTarget=null;result=null;constructor(e,t){this.gl=e,this.quad=t,this.seedProgram=tu(e,cu,xu,`jfaSeed`),this.stepProgram=tu(e,cu,_u,`jfaStep`),this.distanceProgram=tu(e,cu,bu,`distance`)}ensureTargets(e,t){let n=this.sdfTarget?.texture;n&&n.width===e&&n.height===t||(this.disposeTargets(),this.ping=Y(this.gl,e,t,`rgba16ui`),this.pong=Y(this.gl,e,t,`rgba16ui`),this.sdfTarget=Y(this.gl,e,t,`r32f`))}run(e,t){let n=this.gl;this.ensureTargets(e.width,e.height);let r=this.ping,i=this.pong;Z(n,this.quad,{program:this.seedProgram,target:r,textures:{uMask:e}});for(let t of Su(e.width,e.height))Z(n,this.quad,{program:this.stepProgram,target:i,textures:{uSeeds:r.texture},ints:{uStep:t}}),[r,i]=[i,r];this.result=r,Z(n,this.quad,{program:this.distanceProgram,target:this.sdfTarget,textures:{uSeeds:r.texture,uMask:e},uniforms:{uTexel:t/e.width}})}get sdf(){return this.sdfTarget?.texture??null}get seeds(){return this.result?.texture??null}disposeTargets(){for(let e of[this.ping,this.pong,this.sdfTarget])X(this.gl,e);this.ping=this.pong=this.sdfTarget=this.result=null}dispose(){this.disposeTargets();for(let e of[this.seedProgram,this.stepProgram,this.distanceProgram])this.gl.deleteProgram(e.handle)}},wu={organic:0,chippy:1,cracked:2};function Tu(e){if(e<=0)return{taps:0,stride:1,sigma:1};let t=Math.max(1,Math.ceil(e/12));return{taps:Math.ceil(e/t),stride:t,sigma:e/2}}var Eu=class{gl;quad;programs;ping=null;pong=null;combined=null;fieldA=null;fieldB=null;out=null;constructor(e,t){this.gl=e,this.quad=t;let n=(t,n)=>tu(e,cu,t,n);this.programs={second:n(hu,`jfaSecond`),combine:n(mu,`areaCombine`),seedField:n(gu,`jfaSeedField`),step:n(_u,`jfaStep`),reflood:n(vu,`refloodDistance`),blur:n(su,`areaBlur`),roughen:n(du(yu),`roughen`)}}ensureTargets(e,t){let n=this.out?.texture;if(n&&n.width===e&&n.height===t)return;this.disposeTargets();let r=this.gl;this.ping=Y(r,e,t,`rgba16ui`),this.pong=Y(r,e,t,`rgba16ui`),this.combined=Y(r,e,t,`rgba32f`),this.fieldA=Y(r,e,t,`r32f`),this.fieldB=Y(r,e,t,`r32f`),this.out=Y(r,e,t,`r32f`)}run(e,t,n){let r=this.gl,{width:i,height:a}=e.sdf;this.ensureTargets(i,a);let o=n/i,s=Su(i,a),c=e.seeds;if(t.merge>0){let n=this.ping,i=this.pong;r.bindFramebuffer(r.FRAMEBUFFER,n.fbo),r.clearBufferuiv(r.COLOR,0,new Uint32Array([65535,65535,65535,65535]));for(let a of s)Z(r,this.quad,{program:this.programs.second,target:i,textures:{uBase:e.seeds,uSecond:n.texture,uIds:e.ids,uMask:e.mask},uniforms:{uMerge:t.merge},ints:{uStep:a}}),[n,i]=[i,n];c=n.texture}Z(r,this.quad,{program:this.programs.combine,target:this.combined,textures:{uSdf:e.sdf,uBase:e.seeds,uSecond:c,uMask:e.mask},uniforms:{uTexel:o,uMerge:t.merge}});let l=this.combined.texture,u=[this.fieldA,this.fieldB],d=(e,t)=>{let n=u[0];this.flood(l,e,s),Z(r,this.quad,{program:this.programs.reflood,target:n,textures:{uSeeds:this.floodResult.texture,uField:l},uniforms:{uThreshold:e,uPost:t,uTexel:o}}),l=n.texture,u=[u[1],u[0]]};t.fillGaps>0&&d(t.fillGaps,t.fillGaps),t.softenPoints>0&&d(-t.softenPoints,-t.softenPoints);let f=Tu(t.cornerRounding/o);if(f.taps>0){let e=u[0];this.blur(l,e,[1,0],f,0),l=e.texture}let p=u.find(e=>e.texture!==l);this.blur(l,p,[0,1],f,-t.grow),Z(r,this.quad,{program:this.programs.roughen,target:this.out,textures:{uField:p.texture},uniforms:{uTexel:[n/i,n/i],uAmount:t.roughness,uScale:Math.max(1,t.roughnessScale),uSharpness:t.roughnessSharpness},ints:{uType:wu[t.roughnessType]??0}})}floodResult=null;flood(e,t,n){let r=this.ping,i=this.pong;Z(this.gl,this.quad,{program:this.programs.seedField,target:r,textures:{uField:e},uniforms:{uThreshold:t}});for(let e of n)Z(this.gl,this.quad,{program:this.programs.step,target:i,textures:{uSeeds:r.texture},ints:{uStep:e}}),[r,i]=[i,r];this.floodResult=r}blur(e,t,n,r,i){Z(this.gl,this.quad,{program:this.programs.blur,target:t,textures:{uField:e},uniforms:{uDir:n,uSigma:r.sigma,uOffset:i},ints:{uRadius:r.taps,uStride:r.stride}})}get sdf(){return this.out?.texture??null}get attributes(){return this.combined?.texture??null}disposeTargets(){for(let e of[this.ping,this.pong,this.combined,this.fieldA,this.fieldB,this.out])X(this.gl,e);this.ping=this.pong=this.combined=this.fieldA=this.fieldB=this.out=null,this.floodResult=null}dispose(){this.disposeTargets();for(let e of Object.values(this.programs))this.gl.deleteProgram(e.handle)}},Du={v:0,u:1,flat:2,feathered:3},Ou={rounded:0,chamfered:1,steep:2,eroded:3},ku=.02,Au=.01,ju=.006,Mu=.03;function Nu(e){if(e.raised){let t=e.material?e.strength*Mu*e.tileDocPx:ju*e.longSide;return{reliefPx:(e.raisedTexture??0)*t,insideFollow:1}}return e.material?{reliefPx:e.strength*Mu*e.tileDocPx,insideFollow:e.follow}:{reliefPx:e.follow*Au*e.longSide,insideFollow:1}}var Pu=[.002,.006];function Fu(e,t){return e/100*ku*t}var Iu=class{gl;quad;programs;heightTarget=null;surfaceTarget=null;fullyLit=!1;normalsTarget=null;aoTarget=null;tmp=null;blurA=null;blurB=null;constructor(e,t){this.gl=e,this.quad=t;let n=(t,n)=>tu(e,cu,t,n);this.programs={height:n(du(lu),`height`),surface:n(pu,`surface`),normals:n(fu,`normals`),blur:n(su,`heightBlur`),ao:n(ou,`ao`)}}ensureTargets(e,t){let n=this.heightTarget?.texture;if(n&&n.width===e&&n.height===t)return;this.disposeTargets();let r=this.gl;this.heightTarget=Y(r,e,t,`r32f`),this.surfaceTarget=Y(r,e,t,`rg32f`),this.normalsTarget=Y(r,e,t,`rgba16f`,{linear:!0}),this.aoTarget=Y(r,e,t,`r16f`,{linear:!0}),this.tmp=Y(r,e,t,`r32f`),this.blurA=Y(r,e,t,`r32f`),this.blurB=Y(r,e,t,`r32f`)}run(e,t,n,r,i,a,o){let s=this.gl,{width:c,height:l}=e;this.ensureTargets(c,l);let u=Math.max(a,o),d=a/c,f=Fu(r.depth,u);Z(s,this.quad,{program:this.programs.height,target:this.heightTarget,textures:{uArea:e,uAttrs:t,uIds:n},uniforms:{uDepthPx:f,uSpallPx:Math.max(2,.6*Fu(Math.max(r.depth,30),u)),uSteepness:r.steepness,uTexel:[a/c,o/l],uPeckDensity:r.raised?0:r.peckDensity,uPeckSize:r.peckSize,uPeckVariation:r.peckVariation,uBevelPx:r.bevelWidth},ints:{uProfile:Du[r.profile]??1,uRaised:+!!r.raised,uBevel:Ou[r.bevel]??0}});let p=this.heightTarget.texture,m=i?.amounts;Z(s,this.quad,{program:this.programs.surface,target:this.surfaceTarget,textures:{uHeight:p,...i?{uRock:i.texture}:{}},uniforms:{uHasRock:+!!i,uDocToRockUv:i?.docToUv??new Float32Array([1,0,0,0,1,0,0,0,1]),uRockLod:i?this.reliefLod(i,d):0,uReliefPx:m?.reliefPx??0,uInsideFollow:m?.insideFollow??1,uCarveDepthPx:f,uRaised:+!!r.raised,uTexel:[a/c,o/l]}}),this.fullyLit=(i?.fullyLit??!1)||r.raised;let h=this.shadowHeight,g=Pu.map(e=>e*u);g.forEach((e,t)=>{let n=Tu(e/d),r=t===0?this.blurA:this.blurB;this.blur(h,this.tmp,[1,0],n),this.blur(this.tmp.texture,r,[0,1],n)}),Z(s,this.quad,{program:this.programs.ao,target:this.aoTarget,textures:{uHeight:h,uBlurA:this.blurA.texture,uBlurB:this.blurB.texture},uniforms:{uRadiusA:g[0],uRadiusB:g[1]}}),Z(s,this.quad,{program:this.programs.normals,target:this.normalsTarget,textures:{uSurface:this.surfaceTarget.texture},uniforms:{uTexel:[a/c,o/l]}})}reliefLod(e,t){let n=e.docToUv,r=Math.hypot(n[0],n[1])*e.texture.width*t;return Math.max(0,Math.log2(Math.max(1e-6,r)))}blur(e,t,n,r){Z(this.gl,this.quad,{program:this.programs.blur,target:t,textures:{uField:e},uniforms:{uDir:n,uSigma:r.sigma,uOffset:0},ints:{uRadius:r.taps,uStride:r.stride}})}get height(){return this.heightTarget?.texture??null}get shadowHeight(){return(this.fullyLit?this.surfaceTarget?.texture:this.heightTarget?.texture)??null}get normals(){return this.normalsTarget?.texture??null}get ao(){return this.aoTarget?.texture??null}disposeTargets(){let e=[this.heightTarget,this.surfaceTarget,this.normalsTarget,this.aoTarget,this.tmp,this.blurA,this.blurB];for(let t of e)X(this.gl,t);this.heightTarget=this.surfaceTarget=this.normalsTarget=this.aoTarget=this.tmp=this.blurA=this.blurB=null}dispose(){this.disposeTargets();for(let e of Object.values(this.programs))this.gl.deleteProgram(e.handle)}},Lu=.5;function Ru(e,t,n){let[r,i]=Xl(e,t),a=Math.hypot(r,i);if(a<1e-4)return[0,0];let o=t*Math.PI/180,s=n*Math.min(4,Math.max(.25,Math.cos(o)/Math.max(Math.sin(o),.001)));return[r/a*s,i/a*s]}function zu(e){let t=Math.max(e.doc.width,e.doc.height),n=e.rock,r=e.raised,i=r&&r.shadow&&!e.noDropShadow;return{uniforms:{uLightDir:Xl(e.light.angle,e.light.elevation),uLightColor:dn(e.light.color),uOcclusion:e.light.occlusion,uHighlight:e.light.highlight,uIntensity:e.light.intensity,uAmbient:e.light.ambient,uMaxDepthPx:Fu(100,t),uCarveDepthPx:Fu(r?r.height:n.carveDepth,t),uSurface:dn(n.surface),uInterior:dn(n.interior),uProtection:n.protection,uTextureStrength:n.textureStrength,uDepthReveal:n.depthReveal,uEdgeSoftness:n.edgeSoftness,uBrightness:n.brightness,uContrast:n.contrast,uSaturation:n.saturation,uDraftRadius:e.draft?.radius??1,uDraftDepthPx:e.draft?.depthPx??0,uSteepness:e.steepness,uAge:n.age,uWorkspaceColor:e.workspaceColor,uEmptyColor:e.emptyColor,uRaised:+!!r,uBevelPx:r?.bevelWidth??1,uWeathering:r?.weathering??0,uDropShadow:i?Lu:0,uShadowOffset:r?Ru(e.light.angle,e.light.elevation,r.shadowDistance):[0,0],uShadowSoftness:Math.max(r?.shadowSoftness??0,.5/(e.view.zoom*e.dpr)),uCheckerPx:8*e.dpr,uTransparent:+!!e.glyphOnly},ints:{uProfile:Du[e.profile]??1,uBevel:Ou[r?.bevel??`rounded`]??0}}}var Bu={final:0,mask:1,photo:2,sdf:3,nearestDepth:4,area:5,areaDepth:6,height:7,normals:8,lighting:9,reveal:10,interior:11,shadows:12,occlusion:13,rockRelief:14,varnish:15},Vu=`#version 300 es
// Photo split, step 2: one direction of a separable Gaussian blur of the downsampled photo.
// Two passes (horizontal then vertical) give the photo's broad color and tone; the fine
// texture is whatever the blur removed (photo − blurred), worked out in the view pass.
// Tiling backgrounds wrap around the edges (the photo repeats), so the blur has no seams.

precision highp float;

uniform sampler2D uImage;
uniform vec2 uDir;     // (1,0) or (0,1)
uniform int uRadius;   // taps each side
uniform float uSigma;  // texels
uniform int uWrap;     // 1 = tiling: taps past an edge wrap to the other side; 0 = clamp

out vec4 outColor;

void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  ivec2 size = textureSize(uImage, 0);
  vec3 sum = vec3(0.0);
  float wsum = 0.0;
  for (int i = -uRadius; i <= uRadius; i++) {
    float w = exp(-0.5 * float(i * i) / max(uSigma * uSigma, 1e-6));
    ivec2 q = p + ivec2(uDir) * i;
    q = uWrap == 1 ? (q % size + size) % size : clamp(q, ivec2(0), size - 1);
    sum += w * texelFetch(uImage, q, 0).rgb;
    wsum += w;
  }
  outColor = vec4(sum / wsum, 1.0);
}
`,Hu=`#version 300 es
// Photo split, step 1: copy the photo into a smaller target by reading one of its mipmap
// levels (each level is an average of 2×2 texels of the one above, so this is a cheap,
// alias-free downsample). Target texel (x, y) ↔ photo uv ((x+½)/w, (y+½)/h), top-left origin.

precision highp float;

uniform sampler2D uPhoto;
uniform vec2 uSize;  // target size in texels
uniform float uLod;  // mip level to read

out vec4 outColor;

void main() {
  outColor = vec4(textureLod(uPhoto, gl_FragCoord.xy / uSize, uLod).rgb, 1.0);
}
`;function Uu(e,t,n){let r=Math.max(0,Math.floor(Math.log2(Math.max(1,e/3)))),i=2**r,a=Math.max(1,Math.round(t/i)),o=Math.max(1,Math.round(n/i)),s=Math.max(.5,e/i);return{lod:r,width:a,height:o,sigma:s,radius:Math.ceil(s*2.5)}}var Wu=class{gl;quad;downProgram;blurProgram;a=null;b=null;key=``;constructor(e,t){this.gl=e,this.quad=t,this.downProgram=tu(e,cu,Hu,`photoDown`),this.blurProgram=tu(e,cu,Vu,`photoBlur`)}update(e,t,n,r=!1){let i=Uu(n,e.width,e.height),a=`${qu(t)}|${i.lod}|${i.sigma.toFixed(2)}|${r}`;if(a===this.key)return;this.key=a;let o=this.a?.texture;(!o||o.width!==i.width||o.height!==i.height)&&(X(this.gl,this.a),X(this.gl,this.b),this.a=Y(this.gl,i.width,i.height,`rgba16f`,{linear:!0}),this.b=Y(this.gl,i.width,i.height,`rgba16f`,{linear:!0})),vl(this.gl,this.a.texture,r),vl(this.gl,this.b.texture,r),Z(this.gl,this.quad,{program:this.downProgram,target:this.a,textures:{uPhoto:e},uniforms:{uSize:[i.width,i.height],uLod:i.lod}});for(let[e,t,n]of[[this.a,this.b,[1,0]],[this.b,this.a,[0,1]]])Z(this.gl,this.quad,{program:this.blurProgram,target:t,textures:{uImage:e.texture},uniforms:{uDir:n,uSigma:i.sigma},ints:{uRadius:i.radius,uWrap:+!!r}})}get low(){return this.a?.texture??null}dispose(){X(this.gl,this.a),X(this.gl,this.b),this.gl.deleteProgram(this.downProgram.handle),this.gl.deleteProgram(this.blurProgram.handle)}},Gu=new WeakMap,Ku=0;function qu(e){let t=Gu.get(e);return t===void 0&&Gu.set(e,t=++Ku),t}var Ju=`#version 300 es
// Relief decode: turns the bundle's height.png into a float height, centered on 0
// (−0.5 = lowest, +0.5 = highest). "rg16" maps store 16 bits as R = high byte, G = low byte
// (browsers decode PNGs to 8 bits per channel, so this is how the precision survives);
// "gray8" maps are just R. Run once per upload, texel for texel (no filtering, which would
// blend the high and low bytes separately and break the packing).

precision highp float;

uniform sampler2D uSrc;
uniform int uRg16; // 1 = rg16, 0 = gray8

out vec4 outColor;

void main() {
  vec4 c = texelFetch(uSrc, ivec2(gl_FragCoord.xy), 0);
  float h = uRg16 == 1 ? (round(c.r * 255.0) * 256.0 + round(c.g * 255.0)) / 65535.0 : c.r;
  outColor = vec4(h - 0.5, 0.0, 0.0, 1.0);
}
`,Yu=class{gl;quad;program;constructor(e,t){this.gl=e,this.quad=t,this.program=tu(e,cu,Ju,`reliefDecode`)}decode(e,t,n){let r=this.gl,{width:i,height:a}=e,o=_l(r,e,{mipmaps:!1,nearest:!0}),s=r.createTexture();if(!s)throw Error(`Could not create texture`);let c=Math.floor(Math.log2(Math.max(i,a)))+1;r.bindTexture(r.TEXTURE_2D,s),r.texStorage2D(r.TEXTURE_2D,c,r.R16F,i,a);let l={handle:s,width:i,height:a,format:`r16f`},u=r.createFramebuffer();if(!u)throw Error(`Could not create framebuffer`);return r.bindFramebuffer(r.FRAMEBUFFER,u),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,s,0),Z(r,this.quad,{program:this.program,target:{fbo:u,texture:l},textures:{uSrc:o},ints:{uRg16:+(t===`rg16`)}}),r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteFramebuffer(u),J(r,o),r.bindTexture(r.TEXTURE_2D,s),r.generateMipmap(r.TEXTURE_2D),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR_MIPMAP_LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),vl(r,l,n),l}dispose(){this.gl.deleteProgram(this.program.handle)}},Xu=.2,Zu=class{gl;ext;pending=[];active=null;times=new Map;constructor(e,t){this.gl=e,this.ext=t?e.getExtension(`EXT_disjoint_timer_query_webgl2`):null}get available(){return this.ext!==null}begin(e){if(!this.ext||this.active)return;let t=this.gl.createQuery();t&&(this.gl.beginQuery(this.ext.TIME_ELAPSED_EXT,t),this.active={label:e,query:t})}end(){this.ext&&this.active&&(this.gl.endQuery(this.ext.TIME_ELAPSED_EXT),this.pending.push(this.active),this.active=null)}poll(){if(!this.ext)return;let e=this.gl,t=e.getParameter(this.ext.GPU_DISJOINT_EXT);for(;this.pending.length>0;){let n=this.pending[0];if(!e.getQueryParameter(n.query,e.QUERY_RESULT_AVAILABLE))break;if(this.pending.shift(),!t){let t=e.getQueryParameter(n.query,e.QUERY_RESULT)/1e6,r=this.times.get(n.label);this.times.set(n.label,r===void 0?t:r+(t-r)*Xu)}e.deleteQuery(n.query)}}dispose(){for(let e of this.pending)this.gl.deleteQuery(e.query);this.pending.length=0}},Qu=`#version 300 es
// Draft pass: the stroke being drawn, as a signed distance field (document px), for the
// fast live preview. Each capsule writes its exact distance over its quad and the pass
// blends with MIN, so the result is the distance to the whole stroke near it (the target
// is cleared to "far" everywhere else). Uses the same vertex shader as the mask pass.

precision highp float;

// #include capsule

in vec2 vDoc;
flat in vec4 vSeg;
flat in vec4 vData;

out vec4 outDistance;

void main() {
  outDistance = vec4(sdUnevenCapsule(vDoc, vSeg.xy, vSeg.zw, vData.x, vData.y));
}
`,$u=`#version 300 es
// Mask pass, vertex stage: one instance per capsule. The 4 corners of a triangle strip
// span an oriented box around the capsule: along the segment from p0 − r·dir to
// p1 + r·dir, and r to each side (r = the larger radius plus one texel, so
// the antialiased edge fits). Document px map to the mask texture with y = 0 at the top.

layout(location = 0) in vec4 aSeg;  // p0.xy, p1.xy (document px)
layout(location = 1) in vec4 aData; // r0, r1, depth, kind
layout(location = 2) in vec2 aCorner; // per vertex: (0,0) (1,0) (0,1) (1,1)
layout(location = 3) in float aId;   // stroke id (1–2047)
layout(location = 4) in vec3 aArc;   // arc length along the stroke at p0, p1; loop length (0 = open)

uniform vec2 uDocSize;
uniform float uTexel; // document px per mask texel

out vec2 vDoc;
flat out vec4 vSeg;
flat out vec4 vData;
flat out float vId;
flat out vec3 vArc;

void main() {
  vec2 a = aSeg.xy;
  vec2 b = aSeg.zw;
  vec2 d = b - a;
  float len = length(d);
  vec2 dir = len > 1e-5 ? d / len : vec2(1.0, 0.0);
  vec2 nrm = vec2(-dir.y, dir.x);
  float r = max(aData.x, aData.y) + uTexel * 1.5;

  vec2 pos = mix(a - dir * r, b + dir * r, aCorner.x) + nrm * r * (aCorner.y * 2.0 - 1.0);

  vDoc = pos;
  vSeg = aSeg;
  vData = aData;
  vId = aId;
  vArc = aArc;
  gl_Position = vec4(pos / uDocSize * 2.0 - 1.0, 0.0, 1.0);
}
`,ed=[[0,4,0],[1,4,16],[3,1,32],[4,3,36]],td=class{gl;vao;buffer;corners;count=0;capacity=0;constructor(e){this.gl=e;let t=e.createVertexArray(),n=e.createBuffer(),r=e.createBuffer();if(!t||!n||!r)throw Error(`Could not create capsule buffers`);this.vao=t,this.buffer=n,this.corners=r,e.bindVertexArray(t),e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ARRAY_BUFFER,n);for(let[t,n,r]of ed)e.enableVertexAttribArray(t),e.vertexAttribPointer(t,n,e.FLOAT,!1,48,r),e.vertexAttribDivisor(t,1);e.bindVertexArray(null)}upload(e){let t=this.gl;t.bindBuffer(t.ARRAY_BUFFER,this.buffer),e.length>this.capacity&&(this.capacity=Math.max(1024,Math.ceil(e.length*1.5)),t.bufferData(t.ARRAY_BUFFER,this.capacity*4,t.DYNAMIC_DRAW)),e.length>0&&t.bufferSubData(t.ARRAY_BUFFER,0,e),this.count=e.length/12}draw(){this.drawRange(0,this.count)}drawRange(e,t){if(t<=0)return;let n=this.gl;n.bindVertexArray(this.vao),n.bindBuffer(n.ARRAY_BUFFER,this.buffer);let r=e*48;for(let[e,t,i]of ed)n.vertexAttribPointer(e,t,n.FLOAT,!1,48,r+i);n.drawArraysInstanced(n.TRIANGLE_STRIP,0,4,t),n.bindVertexArray(null)}dispose(){this.gl.deleteBuffer(this.buffer),this.gl.deleteBuffer(this.corners),this.gl.deleteVertexArray(this.vao)}},nd=1e3,rd=class{gl;program;capsules;target=null;lastData=null;constructor(e){this.gl=e,this.program=tu(e,$u,du(Qu),`draft`),this.capsules=new td(e)}update(e,t,n,r,i){let a=this.target?.texture,o=!a||a.width!==t||a.height!==n;if(!o&&e===this.lastData)return;this.lastData=e;let s=this.gl;o&&(X(s,this.target),this.target=Y(s,t,n,`r16f`,{linear:!0})),this.capsules.upload(e),s.bindFramebuffer(s.FRAMEBUFFER,this.target.fbo),s.viewport(0,0,t,n),s.clearColor(nd,nd,nd,nd),s.clear(s.COLOR_BUFFER_BIT),s.clearColor(0,0,0,0),s.useProgram(this.program.handle),ru(this.program,{uDocSize:[r,i],uTexel:r/t}),s.enable(s.BLEND),s.blendEquation(s.MIN),this.capsules.draw(),s.blendEquation(s.FUNC_ADD),s.disable(s.BLEND)}get sdf(){return this.target?.texture??null}dispose(){X(this.gl,this.target),this.capsules.dispose(),this.gl.deleteProgram(this.program.handle)}},id=`#version 300 es
// Shadows: from each texel, walk toward the light across the carving height field. A ray
// leaving this point toward the light climbs uRise document px per document px; if the
// carving surface along the way rises above the ray, the point is in shadow. Softness: a
// surface that pokes above the ray by less than t·uSlope (t = distance walked) only
// partly blocks it, which gives penumbras that widen with distance like real shadows.
// Only the carving casts shadows (the photo already contains the rock's own), so flat
// uncarved rock always gets 1 (lit).

precision highp float;

uniform sampler2D uHeight; // carving height, document px
uniform vec2 uDir;         // unit direction toward the light in the document (y down)
uniform float uTexel;      // document px per texel
uniform float uMaxDist;    // how far to walk, document px (0 = no shadows)
uniform float uRise;       // ray climb per document px
uniform float uSlope;      // penumbra width per document px walked

out vec4 outShadow;

const int STEPS = 24;

void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  ivec2 size = textureSize(uHeight, 0);
  float h0 = texelFetch(uHeight, p, 0).r;
  float vis = 1.0;
  if (uMaxDist > 0.0) {
    for (int i = 1; i <= STEPS; i++) {
      float t = uMaxDist * float(i) / float(STEPS);
      ivec2 q = ivec2(vec2(p) + 0.5 + uDir * (t / uTexel));
      if (any(lessThan(q, ivec2(0))) || any(greaterThanEqual(q, size))) break;
      float above = texelFetch(uHeight, q, 0).r - (h0 + t * uRise);
      vis = min(vis, clamp(1.0 - above / (t * uSlope + 1e-3), 0.0, 1.0));
      if (vis <= 0.0) break;
    }
  }
  outShadow = vec4(vis, 0.0, 0.0, 1.0);
}
`,ad=.1;function od(e,t,n){let r=Math.hypot(e.dir[0],e.dir[1]);if(e.length<=0||r<1e-4||t<=0)return null;let i=e.dir[2]/r/e.length,a=Math.min(t/Math.max(i,.001),ad*n);return{dir:[e.dir[0]/r,e.dir[1]/r],rise:i,maxDist:a,slope:.02+.3*e.softness}}var sd=class{gl;quad;program;target=null;constructor(e,t){this.gl=e,this.quad=t,this.program=tu(e,cu,id,`shadow`)}run(e,t,n,r,i){let a=this.target?.texture;(!a||a.width!==e.width||a.height!==e.height)&&(X(this.gl,this.target),this.target=Y(this.gl,e.width,e.height,`r16f`,{linear:!0}));let o=od(t,n,Math.max(r,i));Z(this.gl,this.quad,{program:this.program,target:this.target,textures:{uHeight:e},uniforms:{uDir:o?.dir??[1,0],uTexel:r/e.width,uMaxDist:o?.maxDist??0,uRise:o?.rise??1,uSlope:o?.slope??1}})}get visibility(){return this.target?.texture??null}dispose(){X(this.gl,this.target),this.gl.deleteProgram(this.program.handle)}},cd=`#version 300 es
// Mask pass, fragment stage: exact signed distance to a tapered capsule (two circles of
// radius r0, r1 joined by their common tangents; Inigo Quilez's "uneven capsule"). Inside
// is negative. Coverage is a one-texel antialiased edge. Outputs:
//   mask: R coverage 0–1, G depth, B half-width (radius) at this point, A kind code.
//   ids:  R stroke id, G arc length along the stroke / 4 (half floats stay precise to a
//         few px up to ~16k px of line), B loop length / 4 for closed subpaths (0 = open),
//         all only where this capsule covers at least half the texel (else 0), so they
//         label stroke interiors, not antialiased fringes.
// The pass blends with MAX, so overlapping capsules merge into one shape and keep the
// deepest depth / widest radius (and, where strokes overlap, the higher id).
// Eraser (kind 4) and damage (kind 5) capsules are drawn with MIN on coverage instead
// (maskPass.ts): they output 1 − coverage, cutting away what was drawn before them. Damage
// edges are bitten by cellular noise (chippy, scalloped, like flakes breaking off), and damage
// writes its strength × depth to the ids' A channel (MAX) for the flake scars.

precision highp float;

in vec2 vDoc;
flat in vec4 vSeg;
flat in vec4 vData;
flat in float vId;
flat in vec3 vArc;

uniform float uTexel;

layout(location = 0) out vec4 outMask;
layout(location = 1) out vec4 outId;

// #include capsule
// #include noise

const uint SEED_CHIP = 0x3c6eu;

void main() {
  vec2 a = vSeg.xy;
  vec2 b = vSeg.zw;
  float d = sdUnevenCapsule(vDoc, a, b, vData.x, vData.y);
  float kind = floor(vData.w + 0.5);
  if (kind == 4.0 || kind == 5.0) {
    float r = max(vData.x, vData.y);
    if (kind == 5.0) {
      // Chippy edge: the nearest cell point bites the outline in by up to 45% of the radius.
      ivec2 cell;
      vec2 f = worley(vDoc / max(r * 0.55, 1.0), SEED_CHIP + uint(vId), cell);
      d += r * 0.45 * (0.5 - f.x);
    }
    float cut = clamp(0.5 - d / uTexel, 0.0, 1.0);
    if (cut <= 0.0) discard;
    outMask = vec4(1.0 - cut, 0.0, 0.0, 0.0);
    outId = vec4(65504.0, 0.0, 0.0, kind == 5.0 ? cut * vData.z : 0.0);
    return;
  }
  float coverage = clamp(0.5 - d / uTexel, 0.0, 1.0);
  if (coverage <= 0.0) discard;
  vec2 ab = b - a;
  float t = clamp(dot(vDoc - a, ab) / max(dot(ab, ab), 1e-6), 0.0, 1.0);
  outMask = vec4(coverage, vData.z, mix(vData.x, vData.y, t), vData.w);
  outId = coverage >= 0.5 ? vec4(vId, mix(vArc.x, vArc.y, t) * 0.25, vArc.z * 0.25, 0.0) : vec4(0.0);
}
`,ld=class{gl;program;capsules;fbo=null;maskTex=null;idTex=null;constructor(e){this.gl=e,this.program=tu(e,$u,du(cd),`mask`),this.capsules=new td(e)}runs=[];setCapsules(e){this.capsules.upload(e),this.runs=dd(e)}ensureTargets(e,t){let n=this.gl;if(this.maskTex&&this.maskTex.width===e&&this.maskTex.height===t)return;this.disposeTargets(),this.maskTex=yl(n,e,t,`rgba16f`,{linear:!0}),this.idTex=yl(n,e,t,`rgba16f`),this.fbo=n.createFramebuffer(),n.bindFramebuffer(n.FRAMEBUFFER,this.fbo),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,this.maskTex.handle,0),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT1,n.TEXTURE_2D,this.idTex.handle,0),n.drawBuffers([n.COLOR_ATTACHMENT0,n.COLOR_ATTACHMENT1]);let r=n.checkFramebufferStatus(n.FRAMEBUFFER);if(n.bindFramebuffer(n.FRAMEBUFFER,null),r!==n.FRAMEBUFFER_COMPLETE)throw Error(`Mask framebuffer incomplete: 0x${r.toString(16)}`)}render(e,t,n,r){let i=this.gl;this.ensureTargets(e,t),i.bindFramebuffer(i.FRAMEBUFFER,this.fbo),i.viewport(0,0,e,t),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.useProgram(this.program.handle),ru(this.program,{uDocSize:[n,r],uTexel:n/e}),i.enable(i.BLEND);for(let[e,t,n]of this.runs)n?(i.blendEquationSeparate(i.MIN,i.MAX),i.colorMask(!0,!1,!1,!0)):(i.blendEquation(i.MAX),i.colorMask(!0,!0,!0,!0)),this.capsules.drawRange(e,t);i.colorMask(!0,!0,!0,!0),i.blendEquation(i.FUNC_ADD),i.disable(i.BLEND)}get mask(){return this.maskTex}get ids(){return this.idTex}disposeTargets(){J(this.gl,this.maskTex),J(this.gl,this.idTex),this.fbo&&this.gl.deleteFramebuffer(this.fbo),this.maskTex=this.idTex=null,this.fbo=null}dispose(){this.disposeTargets(),this.runs=[],this.capsules.dispose(),this.gl.deleteProgram(this.program.handle)}},ud=new Set([Pa.eraser,Pa.damage]);function dd(e){let t=[],n=Math.floor(e.length/12);for(let r=0;r<n;r++){let n=ud.has(Math.floor(e[r*12+7]+.5)),i=t[t.length-1];i&&i[2]===n?i[1]++:t.push([r,1,n])}return t}function fd(e,t,n=!1){let r=t/Math.max(e.width,e.height),i=n?r:Math.min(1,r);return{width:Math.max(1,Math.round(e.width*i)),height:Math.max(1,Math.round(e.height*i))}}var pd=[`expand`,`mask`,`distance`,`area`,`height`,`shadow`];function md(e,t){return Object.keys(e).every(n=>e[n]===t[n])}var hd=class{timer;maskPass;distancePass;areaPass;heightPass;shadowPass;inputs=null;dirty=new Set(pd);constructor(e,t,n=null){this.timer=n,this.maskPass=new ld(e),this.distancePass=new Cu(e,t),this.areaPass=new Eu(e,t),this.heightPass=new Iu(e,t),this.shadowPass=new sd(e,t)}invalidate(e){for(let t of pd.slice(pd.indexOf(e)))this.dirty.add(t)}setInputs(e){let t=this.inputs;this.inputs=e,t&&((e.strokes!==t.strokes||!md(e.globals,t.globals))&&this.invalidate(`expand`),(e.doc.width!==t.doc.width||e.doc.height!==t.doc.height||e.workingResolution!==t.workingResolution||e.allowUpscale!==t.allowUpscale)&&this.invalidate(`mask`),md(e.area,t.area)||this.invalidate(`area`),(!md(e.carve,t.carve)||e.rock?.key!==t.rock?.key)&&this.invalidate(`height`),(e.shadow.length!==t.shadow.length||e.shadow.softness!==t.shadow.softness||e.shadow.dir.some((e,n)=>e!==t.shadow.dir[n]))&&this.invalidate(`shadow`))}run(){let e=this.inputs;if(!e||this.dirty.size===0)return!1;let t=fd(e.doc,e.workingResolution,e.allowUpscale);this.dirty.has(`expand`)&&this.maskPass.setCapsules(Xa(e.strokes,e.globals));let n=(e,t)=>{this.timer?.begin(e),t(),this.timer?.end()};this.dirty.has(`mask`)&&n(`mask`,()=>this.maskPass.render(t.width,t.height,e.doc.width,e.doc.height));let r=this.maskPass.mask,i=this.maskPass.ids;this.dirty.has(`distance`)&&r&&n(`distance`,()=>this.distancePass.run(r,e.doc.width));let a=this.distancePass.sdf,o=this.distancePass.seeds;this.dirty.has(`area`)&&r&&i&&a&&o&&n(`area`,()=>this.areaPass.run({sdf:a,seeds:o,mask:r,ids:i},e.area,e.doc.width));let s=this.areaPass.sdf,c=this.areaPass.attributes;this.dirty.has(`height`)&&s&&c&&i&&n(`height`,()=>this.heightPass.run(s,c,i,e.carve,e.rock,e.doc.width,e.doc.height));let l=this.heightPass.shadowHeight;if(this.dirty.has(`shadow`)&&l){let t=e.rock&&(e.rock.fullyLit||e.carve.raised)?e.rock.amounts.reliefPx:0,r=Fu(e.carve.depth,Math.max(e.doc.width,e.doc.height))+t;n(`shadow`,()=>this.shadowPass.run(l,e.shadow,r,e.doc.width,e.doc.height))}return this.dirty.clear(),!0}get mask(){return this.maskPass.mask}get ids(){return this.maskPass.ids}get sdf(){return this.distancePass.sdf}get seeds(){return this.distancePass.seeds}get area(){return this.areaPass.sdf}get areaAttributes(){return this.areaPass.attributes}get height(){return this.heightPass.height}get normals(){return this.heightPass.normals}get ao(){return this.heightPass.ao}get shadow(){return this.shadowPass.visibility}dispose(){this.heightPass.dispose(),this.shadowPass.dispose(),this.maskPass.dispose(),this.distancePass.dispose(),this.areaPass.dispose()}},gd=`#version 300 es
// View pass: draws the document onto the screen through the zoom/pan view, in screen space.
// Each screen pixel is mapped to a document point, and from there to the rock photo, so the
// photo is sampled at its full resolution (sharp when zoomed in, mipmapped when zoomed out).
// Outside the document it draws the workspace color with a soft drop shadow.
// Stage 6 (color + shading) happens here, every frame, so color and light changes are free:
//   1. interior: the photo turned into freshly exposed rock (see interiorColor below)
//   2. reveal: how much interior shows at each pixel (edge transition × depth reveal)
//   3. color = mix(surface, interior, reveal); surface = the photo, or for materials the
//      color map darkened by a varnish layer (varnishedSurface below)
//   4. × lighting (see lighting() below). Photos: *relative to the rock*: shade(carving +
//      rock relief, with shadows, occlusion and highlight) / shade(rock relief alone). The
//      photo already shows the rock lit by its own light, so on uncarved rock the ratio is
//      exactly 1 and the photo is untouched; only the carving (and its shadows) change.
//      Materials (de-lit color maps): the whole surface is lit, shade(carving + rock relief)
//      / a neutral level, so the light dial moves light across the entire rock.
//   Raised mode instead: glyphs of rock texture (worn lighter on high points), fully lit,
//   over a soft drop shadow, on a checkerboard (or transparent, for exports).
//   5. the stroke being drawn is overlaid as a quick preview groove (its own distance field,
//      profile, normals and light; no merge/roughness/shadows), fading out on pen lift
//      while the finished carving settles in underneath.

precision highp float;
precision highp usampler2D;

// #include profile
// #include noise

uniform mat3 uFragToDoc;     // gl_FragCoord (device px, bottom-left origin) → document px
uniform mat3 uDocToPhotoUv;  // document px → photo uv (0–1, top-left origin)
uniform vec2 uDocSize;       // document size in px
uniform float uDevicePerDoc; // device pixels per document pixel (zoom × devicePixelRatio)
uniform float uHasPhoto;
uniform float uTiling;       // 1 = tiling background: the photo repeats, so there is no edge
uniform float uTransparent;  // export: alpha = the glyph (and its drop shadow); no background
uniform float uRaised;       // 1 = raised glyphs on a transparent canvas
uniform int uBevel;          // raised edge shape (profile.glsl raisedProfile)
uniform float uBevelPx;      // raised bevel width, document px
uniform float uWeathering;   // raised: high points wear lighter/smoother, 0–1
uniform float uDropShadow;   // raised drop shadow opacity (0 = off)
uniform vec2 uShadowOffset;  // where the shadowing glyph is, relative to a ground point (doc px)
uniform float uShadowSoftness; // document px
uniform float uCheckerPx;    // checkerboard square, device px
uniform float uFullyLit;     // 1 = material: the whole surface is lit here (no photo lighting)
uniform sampler2D uNormalMap; // optional OpenGL normal map (materials), photo uv
uniform float uNormalAmount; // fine detail from it, 0 = off / no map
uniform vec2 uRockRot;       // (cos, sin) of the rock's rotation: image directions → document
uniform float uRockDocPerUv; // document px per photo uv unit (one tile / the photo's width)
uniform float uVarnish;      // material varnish amount 0–1
uniform float uVarnishPatchiness;
uniform sampler2D uPhoto;
uniform sampler2D uPhotoLow; // blurred photo (broad color/tone), photo uv
uniform sampler2D uCracks;   // optional crack/spall mask (white = crack), photo uv
uniform sampler2D uInteriorTex; // optional interior texture photo, photo uv
uniform float uCracksAmount; // 1 = cracks cut through carvings, 0 = off / no mask
uniform float uInteriorTexAmount;
uniform sampler2D uDraft;    // live preview: distance to the stroke being drawn (doc px)
uniform float uDraftAlpha;   // 1 drawing, → 0 while settling, 0 = none
uniform float uDraftRadius;  // its half-width, doc px
uniform float uDraftDepthPx; // its full depth, doc px
uniform float uSteepness;
uniform int uProfile;
uniform float uAge;          // 0 fresh – 1 faint ghost
uniform sampler2D uMask;     // stage 2: coverage, depth, radius, kind
uniform sampler2D uIds;      // stage 2: A = damage (flake scars expose fresh, lighter rock)
uniform sampler2D uSdf;      // stage 3: signed distance, document px (NEAREST, R32F)
uniform usampler2D uSeeds;   // stage 3: nearest inside texel (xy)
uniform sampler2D uArea;     // stage 4: area signed distance (R32F, NEAREST)
uniform sampler2D uAreaAttrs; // stage 4: G depth, B radius, A kind
uniform sampler2D uHeight;   // stage 5: height, document px (R32F)
uniform sampler2D uNormals;  // stage 5: RG carving+rock normal xy, BA rock-only normal xy
uniform sampler2D uAo;       // stage 5: ambient occlusion 0–1
uniform sampler2D uShadow;   // stage 6: light visibility 0–1
uniform vec3 uLightColor;
uniform float uOcclusion;    // AO amount 0–1
uniform float uHighlight;    // specular amount 0–1
uniform vec3 uLightDir;      // toward the light (x right, y down, z up)
uniform float uIntensity;
uniform float uAmbient;
uniform float uMaxDepthPx;   // depth at 100% for scaling the Height debug view
uniform float uCarveDepthPx; // full depth at the current Depth setting (stroke depth 1)
uniform vec3 uSurface;       // varnish color (sRGB 0–1)
uniform vec3 uInterior;      // interior color
uniform float uProtection;   // light-spot protection 0–1
uniform float uTextureStrength;
uniform float uDepthReveal;  // 0–1
uniform float uEdgeSoftness; // document px
uniform float uBrightness;
uniform float uContrast;
uniform float uSaturation;
uniform float uHasMask;      // 1 once the pipeline stages exist
uniform float uShowMask;     // 0 in Path view (raw lines on the overlay instead)
uniform int uDebugView;      // 0 final, 1 mask, 2 photo, 3 sdf, 4 nearest depth, 5 area,
                             // 6 area depth, 7 height, 8 normals, 9 lighting only,
                             // 10 reveal, 11 interior only, 12 shadows, 13 occlusion,
                             // 14 rock relief (lit rock, no carving), 15 varnish
uniform vec3 uWorkspaceColor;
uniform vec3 uEmptyColor;    // inside the canvas where there's no rock

out vec4 outColor;

const uint NONE = 65535u;

/** Normal from its stored xy (always facing up). */
vec3 unpackNormal(vec2 xy) {
  return vec3(xy, sqrt(max(0.0, 1.0 - dot(xy, xy))));
}

/**
 * Light reaching a surface with normal n: ambient (reduced by occlusion) + colored direct
 * light (diffuse, times shadow visibility) + a subtle Blinn-Phong highlight (viewer
 * straight above).
 */
vec3 shade(vec3 n, float visibility, float occlusion) {
  vec3 light = uLightColor * uIntensity;
  float diffuse = max(dot(n, uLightDir), 0.0);
  vec3 halfway = normalize(uLightDir + vec3(0.0, 0.0, 1.0));
  float spec = uHighlight * pow(max(dot(n, halfway), 0.0), 24.0);
  return vec3(uAmbient * (1.0 - uOcclusion * occlusion)) + light * (diffuse + spec) * visibility;
}

float luma(vec3 c) {
  return dot(c, vec3(0.2126, 0.7152, 0.0722));
}

/**
 * Materials: the light level that leaves the color map unchanged: flat rock lit from 30° up
 * (the materials' default light). Higher light brightens the rock, raking light darkens it.
 */
float neutralLight() {
  return max(uAmbient + uIntensity * 0.5, 1e-3);
}

/**
 * Light multiplier for a surface with normal n. Photos: relative to the rock alone (1 on
 * uncarved rock). Materials: absolute, over the neutral level (the color map has no light).
 */
vec3 lighting(vec3 n, float visibility, float occlusion, vec3 nRock) {
  vec3 base = uFullyLit > 0.5 ? vec3(neutralLight()) : shade(nRock, 1.0, 0.0);
  return clamp(shade(n, visibility, occlusion) / max(base, vec3(1e-3)), 0.0, 2.5);
}

/**
 * Adds the normal map's fine detail to a normal, as slopes (so detail adds up the way small
 * bumps on a larger slope do). OpenGL convention: green = up in the image, so the image-down
 * component is −y; then it's turned with the rock into document directions.
 */
vec3 withDetail(vec3 n, vec3 nm) {
  vec2 t = vec2(nm.x, -nm.y) / max(nm.z, 0.2);
  vec2 d = vec2(uRockRot.x * t.x - uRockRot.y * t.y, uRockRot.y * t.x + uRockRot.x * t.y);
  return normalize(vec3(n.xy / max(n.z, 0.05) + uNormalAmount * d, 1.0));
}

/**
 * The fresh rock a carving exposes, made from the photo itself so grain and pits continue
 * through the cut. The photo is split into broad color/tone (low, a blur) and fine texture
 * (photo − low). The broad part is gradient-mapped: rock of exactly the varnish color
 * becomes exactly the interior color, and darker/lighter spots keep half their difference.
 * Spots already about as light as the interior are mostly left alone (light-spot
 * protection). Then the fine texture is added back at texture strength, and brightness,
 * contrast and saturation are applied.
 */
vec3 interiorColor(vec3 photo, vec3 low, vec3 interiorPhoto) {
  vec3 high = photo - low;
  vec3 target = uInterior + (low - uSurface) * 0.5;
  float li = luma(uInterior);
  float protect = uProtection * smoothstep(li - 0.25, li, luma(low));
  // Materials: the color map is already clean (un-varnished) rock, so it *is* the interior.
  vec3 broad = uFullyLit > 0.5 ? low : mix(target, low, protect);
  vec3 c = broad + high * uTextureStrength;
  c = mix(c, interiorPhoto, uInteriorTexAmount); // optional per-rock interior texture image
  c += uBrightness;
  c = (c - 0.5) * uContrast + 0.5;
  c = mix(vec3(luma(c)), c, uSaturation);
  return clamp(c, 0.0, 1.0);
}

/**
 * Varnish strength 0–1 for a material at a point on the rock (document px of the rock's own
 * surface, so it moves with the rock and doesn't repeat with the tiles). Patchiness mixes in
 * large, soft blotches of fractal noise.
 */
float varnishAmount(vec2 rockPx) {
  float blotch = smoothstep(-0.35, 0.35, fbm(rockPx / 350.0, 7u));
  return uVarnish * mix(1.0, blotch, uVarnishPatchiness);
}

/**
 * A material's uncarved surface: the clean color map darkened toward the varnish color.
 * The varnish keeps the rock's grain (its brightness relative to the blurred color map).
 */
vec3 varnishedSurface(vec3 photo, vec3 low, float amount) {
  vec3 coat = uSurface * (luma(photo) / max(luma(low), 0.04));
  return mix(photo, clamp(coat, 0.0, 1.0), amount);
}

/** Preview groove height at a document point (≤ 0), from the draft distance field. */
float draftHeight(vec2 doc) {
  float d = texture(uDraft, doc / uDocSize).r;
  if (d >= 0.0) return 0.0;
  if (uRaised > 0.5) {
    // Raised preview: a ridge with the glyphs' bevel (≥ 0).
    return uDraftDepthPx * raisedProfile(-d / max(min(uBevelPx, uDraftRadius), 0.5), uBevel);
  }
  return -uDraftDepthPx * carveProfile(-d / max(uDraftRadius, 0.5), uSteepness, uProfile);
}

/** Bilinear lookup by hand (float textures aren't guaranteed linear-filterable). */
float sampleBilinear(sampler2D tex, vec2 doc) {
  vec2 size = vec2(textureSize(tex, 0));
  vec2 t = doc / uDocSize * size - 0.5;
  vec2 f = fract(t);
  ivec2 i = ivec2(floor(t));
  ivec2 hi = ivec2(size) - 1;
  float a = texelFetch(tex, clamp(i, ivec2(0), hi), 0).r;
  float b = texelFetch(tex, clamp(i + ivec2(1, 0), ivec2(0), hi), 0).r;
  float c = texelFetch(tex, clamp(i + ivec2(0, 1), ivec2(0), hi), 0).r;
  float d = texelFetch(tex, clamp(i + ivec2(1, 1), ivec2(0), hi), 0).r;
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

/** Debug: inside blue / outside orange, darker far from the edge, bands every 8 px, white edge. */
vec3 sdfColor(float d) {
  vec3 col = d > 0.0 ? vec3(0.9, 0.6, 0.3) : vec3(0.65, 0.85, 1.0);
  col *= 1.0 - 0.5 * exp(-abs(d) / 60.0);
  col *= 0.8 + 0.2 * cos(6.2831853 * d / 8.0);
  return mix(col, vec3(1.0), 1.0 - smoothstep(0.0, 1.5 / uDevicePerDoc, abs(d)));
}

void main() {
  vec2 doc = (uFragToDoc * vec3(gl_FragCoord.xy, 1.0)).xy;

  // Sample first, outside any branch: mipmapped lookups need screen-space derivatives,
  // which are only defined when all neighbouring pixels run the same code.
  vec2 uv = (uDocToPhotoUv * vec3(doc, 1.0)).xy;
  vec3 photo = texture(uPhoto, uv).rgb;
  vec3 photoLow = texture(uPhotoLow, uv).rgb;
  float crack = uCracksAmount * texture(uCracks, uv).r;
  vec3 interiorPhoto = texture(uInteriorTex, uv).rgb;
  vec3 normalMap = texture(uNormalMap, uv).xyz * 2.0 - 1.0;
  bool inTile = all(greaterThanEqual(uv, vec2(0.0))) && all(lessThanEqual(uv, vec2(1.0)));
  bool onPhoto = uHasPhoto > 0.5 && (uTiling > 0.5 || inTile);
  float varnish = uFullyLit > 0.5 ? varnishAmount(uv * uRockDocPerUv) : 0.0;
  vec3 surface = uFullyLit > 0.5 ? varnishedSurface(photo, photoLow, varnish) : photo;
  vec3 inside = onPhoto ? (uDebugView == 2 ? photo : surface) : uEmptyColor;
  // Raised mode: the canvas is transparent, shown as a checkerboard (screen-sized squares).
  vec2 cell = floor(gl_FragCoord.xy / uCheckerPx);
  vec3 ground = mix(vec3(0.94), vec3(0.86), mod(cell.x + cell.y, 2.0));
  if (uRaised > 0.5 && uDebugView != 2) inside = ground;

  float glyphAlpha = 0.0; // transparent exports: how much of this pixel is glyph
  float shadowAlpha = 0.0; // raised: drop shadow on the ground
  vec3 glyphRGB = vec3(0.0);
  if (uHasMask > 0.5) {
    vec2 docUv = clamp(doc / uDocSize, 0.0, 1.0); // mask/SDF are in document uv, top-left origin
    float areaSdf = sampleBilinear(uArea, doc);
    // Antialiased coverage over one device pixel.
    float coverage = clamp(0.5 - areaSdf * uDevicePerDoc, 0.0, 1.0);
    glyphAlpha = coverage * uShowMask;

    vec4 nn = texture(uNormals, docUv);
    vec3 n = unpackNormal(nn.xy);
    vec3 nRock = unpackNormal(nn.zw);
    if (uNormalAmount > 0.0) {
      n = withDetail(n, normalMap);
      nRock = withDetail(nRock, normalMap);
    }
    float visibility = texture(uShadow, docUv).r;
    float occlusion = texture(uAo, docUv).r;
    // Photos: exactly 1 on uncarved rock, so the photo is untouched. Materials: lit everywhere.
    vec3 relative = lighting(n, visibility, occlusion, nRock);
    // The rock with no carving (what cracks show, and Path view for materials).
    vec3 rockLight = uFullyLit > 0.5 ? lighting(nRock, 1.0, 0.0, nRock) : vec3(1.0);

    // Reveal: the edge ramps from 1 at softness inside the cut to 0 at softness outside it
    // (a soft glow); at 0 softness it's a one-device-pixel antialiased edge. Depth reveal
    // then keeps shallow parts partly varnished: (1 − amount) at the surface → 1 at full depth.
    // Age softens the edge and fades the reveal back toward the varnish (re-patination).
    float soft = max(uEdgeSoftness + 4.0 * uAge, 0.5 / uDevicePerDoc);
    float edge = clamp(0.5 - areaSdf / (2.0 * soft), 0.0, 1.0);
    float h = sampleBilinear(uHeight, doc);
    float strokeDepth = texelFetch(uAreaAttrs, ivec2(docUv * vec2(textureSize(uAreaAttrs, 0) - 1)), 0).g;
    float depthFrac = clamp(-h / max(uCarveDepthPx * strokeDepth, 1e-3), 0.0, 1.0);
    float reveal = edge * mix(1.0 - uDepthReveal, 1.0, smoothstep(0.0, 1.0, depthFrac));
    reveal *= (1.0 - 0.85 * uAge) * (1.0 - crack); // cracks interrupt the carving
    // Flake scars (damage brush) expose fresh rock: partly lighter, like a recent break.
    float damage = clamp(1.5 * texelFetch(uIds, ivec2(docUv * vec2(textureSize(uIds, 0) - 1)), 0).a, 0.0, 1.0);
    reveal = max(reveal, 0.6 * damage);
    vec3 interior = interiorColor(photo, photoLow, interiorPhoto);
    // Inside a crack, the rock's own surface shows: no carving light either.
    relative = mix(relative, rockLight, crack);

    if (uDebugView == 0) {
      float draftCover = 0.0;
      if (uDraftAlpha > 0.0) {
        // Live preview of the stroke being drawn: where its groove is deeper than the
        // finished carving, show it with its own normal (finite differences of its height).
        float e = uDocSize.x / float(textureSize(uDraft, 0).x);
        float hd = draftHeight(doc);
        vec2 slope = vec2(draftHeight(doc + vec2(e, 0.0)) - draftHeight(doc - vec2(e, 0.0)),
                          draftHeight(doc + vec2(0.0, e)) - draftHeight(doc - vec2(0.0, e))) / (2.0 * e);
        vec3 nd = normalize(vec3(nRock.xy - slope, nRock.z));
        float dd = texture(uDraft, docUv).r;
        float cover = clamp(0.5 - dd * uDevicePerDoc, 0.0, 1.0) * uDraftAlpha;
        // Shown where the preview is deeper (carve) / higher (raised) than the finished glyphs.
        float s = uRaised > 0.5 ? -1.0 : 1.0;
        float w = cover * step(s * hd, s * h + 1e-3);
        draftCover = cover;
        vec3 relDraft = uFullyLit > 0.5 ? lighting(nd, visibility, occlusion, nRock) : lighting(nd, 1.0, 0.0, nRock);
        float draftFrac = clamp(-hd / max(uDraftDepthPx, 1e-3), 0.0, 1.0);
        relative = mix(relative, relDraft, w);
        reveal = max(reveal, cover * mix(1.0 - uDepthReveal, 1.0, smoothstep(0.0, 1.0, draftFrac)));
      }
      if (uRaised > 0.5) {
        // Raised glyph: the rock texture (through the Background placement), worn lighter and
        // smoother (toward the blurred photo) on its high points and upper edges, fully lit.
        float heightFrac = clamp(h / max(uCarveDepthPx * strokeDepth, 1e-3), 0.0, 1.0);
        float exposure = smoothstep(0.55, 1.0, heightFrac) +
                         smoothstep(0.05, 0.35, 1.0 - n.z) * smoothstep(0.35, 0.9, heightFrac);
        vec3 worn = clamp(mix(surface, photoLow, 0.6) + 0.12, 0.0, 1.0);
        glyphRGB = mix(surface, worn, clamp(uWeathering * exposure + 0.6 * damage, 0.0, 1.0)) * relative;
        glyphAlpha = max(coverage, draftCover) * uShowMask;
        // Drop shadow: a ground point is shadowed where the glyph sits toward the light; the
        // area SDF there, ramped over the softness, gives a soft-edged shadow for free.
        float sd = sampleBilinear(uArea, doc + uShadowOffset);
        shadowAlpha = uDropShadow * uShowMask * (1.0 - smoothstep(-uShadowSoftness, uShadowSoftness, sd));
        inside = mix(mix(ground, vec3(0.0), shadowAlpha), glyphRGB, glyphAlpha);
      } else {
        vec3 carved = mix(inside, interior, reveal) * relative;
        // Path view hides the carving; a material's rock stays lit.
        inside = mix(inside * rockLight, carved, uShowMask);
      }
    } else if (uDebugView == 1) {
      inside = vec3(texelFetch(uMask, ivec2(docUv * vec2(textureSize(uMask, 0) - 1)), 0).r);
    } else if (uDebugView == 3) {
      inside = sdfColor(sampleBilinear(uSdf, doc));
    } else if (uDebugView == 4) {
      // Depth of the nearest stroke, everywhere (what fillets will inherit in step 3.3).
      ivec2 t = ivec2(docUv * vec2(textureSize(uSeeds, 0) - 1));
      uvec2 seed = texelFetch(uSeeds, t, 0).xy;
      inside = seed.x == NONE ? vec3(0.0) : vec3(texelFetch(uMask, ivec2(seed), 0).g);
    } else if (uDebugView == 5) {
      inside = sdfColor(areaSdf);
    } else if (uDebugView == 6) {
      // Blended depth (fillets between strokes of different depth blend smoothly), inside only.
      float depth = texelFetch(uAreaAttrs, ivec2(docUv * vec2(textureSize(uAreaAttrs, 0) - 1)), 0).g;
      inside = vec3(depth * coverage);
    } else if (uDebugView == 7) {
      // Black = deepest possible (Depth 100%, stroke depth 1), white = rock surface.
      inside = vec3(1.0 + h / max(uMaxDepthPx, 1e-4));
    } else if (uDebugView == 8) {
      inside = n * 0.5 + 0.5;
    } else if (uDebugView == 9) {
      inside = vec3(0.5 * relative);
    } else if (uDebugView == 10) {
      inside = vec3(reveal);
    } else if (uDebugView == 11) {
      inside = onPhoto ? interior : uEmptyColor;
    } else if (uDebugView == 12) {
      inside = vec3(visibility);
    } else if (uDebugView == 13) {
      inside = vec3(1.0 - occlusion);
    } else if (uDebugView == 14) {
      // The rock's own relief, lit on mid-gray (photos too, to judge their height map).
      inside = vec3(0.5) * shade(nRock, 1.0, 0.0) / neutralLight();
    } else if (uDebugView == 15) {
      inside = vec3(1.0 - varnish); // white = clean rock, dark = heavy varnish
    }
  }

  // Distance outside the document rectangle, in device pixels (0 inside).
  vec2 outside = max(-doc, doc - uDocSize);
  float distPx = length(max(outside, 0.0)) * uDevicePerDoc;
  // Soft shadow: darkest right at the edge, gone after ~14 device px.
  float shadow = 1.0 - 0.18 * (1.0 - smoothstep(0.0, 14.0, distPx));
  vec3 workspace = uWorkspaceColor * shadow;

  if (uTransparent > 0.5) {
    // Transparent export: Carve keeps just the carving (its color and light); Raised keeps
    // the glyphs over their drop shadow (black at shadowAlpha). Straight (not premultiplied).
    vec3 g = uRaised > 0.5 ? glyphRGB : inside;
    float a = glyphAlpha + shadowAlpha * (1.0 - glyphAlpha);
    outColor = vec4(a > 0.0 ? g * glyphAlpha / a : vec3(0.0), a);
  } else {
    outColor = vec4(distPx > 0.0 ? workspace : inside, 1.0);
  }
}
`,_d=class{canvas;gl;quad;viewProgram;pipeline;photoSplit;draftPass;reliefDecoder;timer;photo=null;photoSource=null;relief=null;reliefSource=null;reliefVersion=0;cracks=null;cracksSource=null;interiorTex=null;interiorSource=null;normalMap=null;normalSource=null;source=`photo`;tileSize=null;heightEncoding=`gray8`;constructor(e){this.canvas=e,this.gl=Vl(e),this.quad=au(this.gl),this.viewProgram=tu(this.gl,cu,du(gd),`view`),this.timer=new Zu(this.gl,!1),this.pipeline=new hd(this.gl,this.quad,this.timer),this.photoSplit=new Wu(this.gl,this.quad),this.draftPass=new rd(this.gl),this.reliefDecoder=new Yu(this.gl,this.quad)}get repeat(){return this.tileSize!==null}setRockExtras(e,t,n=null){n!==this.normalSource&&(J(this.gl,this.normalMap),this.normalMap=n?_l(this.gl,n,{repeat:this.repeat}):null,this.normalSource=n),e!==this.cracksSource&&(J(this.gl,this.cracks),this.cracks=e?_l(this.gl,e,{repeat:this.repeat}):null,this.cracksSource=e),t!==this.interiorSource&&(J(this.gl,this.interiorTex),this.interiorTex=t?_l(this.gl,t,{repeat:this.repeat}):null,this.interiorSource=t)}setPhoto(e,t=null,n={source:`photo`,tileSize:null,heightEncoding:`gray8`}){this.source=n.source;let r=n.tileSize!==null!==this.repeat,i=n.heightEncoding!==this.heightEncoding;if(this.tileSize=n.tileSize,this.heightEncoding=n.heightEncoding,e!==this.photoSource&&(J(this.gl,this.photo),this.photo=e?_l(this.gl,e,{repeat:this.repeat}):null,this.photoSource=e),(t!==this.reliefSource||i)&&(J(this.gl,this.relief),this.relief=t?this.reliefDecoder.decode(t,this.heightEncoding,this.repeat):null,this.reliefSource=t,this.reliefVersion++),r){for(let e of[this.photo,this.relief,this.cracks,this.interiorTex,this.normalMap])e&&vl(this.gl,e,this.repeat);this.reliefVersion++}}resize(e,t,n){let r=Math.max(1,Math.round(e*n)),i=Math.max(1,Math.round(t*n));return this.canvas.width===r&&this.canvas.height===i?!1:(this.canvas.width=r,this.canvas.height=i,!0)}render(e,t=null){let n=this.gl;if(n.isContextLost())return;let r=t?t.texture.width:this.canvas.width,i=t?t.texture.height:this.canvas.height,a=Xl(e.light.angle,e.light.elevation),o=this.tileSize?{...e.placement,tileSize:this.tileSize}:e.placement,s=this.photo?Tn(Gl(e.doc,this.photo,o)):null,c=this.source===`material`,l=e.raised,u=this.photo?Ul(e.doc,this.photo,o)*this.photo.width:1,d=Nu({material:c,raised:l!==null,raisedTexture:l?.texture??0,follow:e.rock.followSurface,strength:e.rock.reliefStrength,tileDocPx:u,longSide:Math.max(e.doc.width,e.doc.height)}),f=this.relief&&s?{texture:this.relief,docToUv:s,amounts:d,fullyLit:c,key:`${this.reliefVersion}|${Array.from(s).join(`,`)}|${Object.values(d).join(`,`)}|${c}`}:null;if(this.pipeline.setInputs({...e.pipeline,doc:e.doc,rock:f,shadow:{dir:a,length:e.light.shadowLength,softness:e.light.shadowSoftness}}),this.timer.poll(),this.pipeline.run(),e.draft&&e.draft.alpha>0){let t=fd(e.doc,e.pipeline.workingResolution,e.pipeline.allowUpscale);this.timer.begin(`draft`),this.draftPass.update(e.draft.capsules,t.width,t.height,e.doc.width,e.doc.height),this.timer.end()}let p=e.draft&&e.draft.alpha>0?this.draftPass.sdf:null,m=this.pipeline.mask;if(this.photo&&this.photoSource){let t=Ul(e.doc,this.photo,o);this.photoSplit.update(this.photo,this.photoSource,e.rock.detailSize/2/t,this.repeat)}let h=this.photo?this.photoSplit.low:null,g=this.pipeline.sdf,_=this.pipeline.seeds,v=this.pipeline.area,y=this.pipeline.areaAttributes,b=this.pipeline.height,x=this.pipeline.normals,S=this.pipeline.ao,C=this.pipeline.shadow,w=m&&this.pipeline.ids&&g&&_&&v&&y&&b&&x&&S&&C,ee=Sn([1/e.dpr,0,0,-1/e.dpr,0,i/e.dpr],Cn(Ps(e.view))),te=this.photo??{width:1,height:1},T=this.photo?Gl(e.doc,te,o):yn(0),E=zu(e);this.timer.begin(`view`),Z(n,this.quad,{program:this.viewProgram,target:t,screenSize:{width:r,height:i},textures:{...this.photo&&h?{uPhoto:this.photo,uPhotoLow:h}:{},...this.cracks?{uCracks:this.cracks}:{},...p?{uDraft:p}:{},...this.interiorTex?{uInteriorTex:this.interiorTex}:{},...this.normalMap?{uNormalMap:this.normalMap}:{},...w?{uMask:m,uIds:this.pipeline.ids,uSdf:g,uSeeds:_,uArea:v,uAreaAttrs:y,uHeight:b,uNormals:x,uAo:S,uShadow:C}:{}},uniforms:{uFragToDoc:Tn(ee),uDocToPhotoUv:Tn(T),uDocSize:[e.doc.width,e.doc.height],uDevicePerDoc:e.view.zoom*e.dpr,uHasPhoto:+!!this.photo,uTiling:+!!this.repeat,uFullyLit:c||l?1:0,uNormalAmount:c&&this.normalMap?e.rock.normalDetail:0,uRockRot:[Math.cos(o.rotation*Math.PI/180),Math.sin(o.rotation*Math.PI/180)],uRockDocPerUv:u,uVarnish:c&&!l?e.rock.varnish:0,uVarnishPatchiness:e.rock.varnishPatchiness,uHasMask:+!!w,uShowMask:+!e.pathView,uDraftAlpha:p?e.draft.alpha:0,uCracksAmount:this.cracks&&e.rock.cracks&&!l?1:0,uInteriorTexAmount:this.interiorTex?e.rock.interiorTexture:0,...E.uniforms},ints:{...E.ints,uDebugView:Bu[e.debugView],...w?{}:{uSeeds:15}}}),this.timer.end()}dispose(){this.pipeline.dispose(),this.draftPass.dispose(),this.timer.dispose(),J(this.gl,this.relief),J(this.gl,this.cracks),J(this.gl,this.interiorTex),J(this.gl,this.normalMap),this.reliefDecoder.dispose(),this.photoSplit.dispose(),J(this.gl,this.photo),this.photo=null,this.photoSource=null,this.gl.deleteProgram(this.viewProgram.handle),this.gl.deleteVertexArray(this.quad)}},vd=class{stroke=null;preview=null;settleStart=0;update(e,t,n,r,i,a,o=null){e&&(e.kind===`eraser`||e.kind===`damage`)&&(e=null),e?(e!==this.stroke&&(this.stroke=e,this.preview={capsules:yd([e,...o?Zn(e,o):[]].map((e,r)=>Ya(e,n,t+r))),radius:e.size/2,depthPx:Fu(r,i)*e.depth}),this.settleStart=0):this.stroke&&(this.stroke=null,this.settleStart=a?performance.now():0,a||(this.preview=null))}current(e){if(!this.preview)return null;if(this.stroke)return{...this.preview,alpha:1};let t=(e-this.settleStart)/280;return t>=1?(this.preview=null,null):{...this.preview,alpha:(1-t)*(1-t)}}get settling(){return this.preview!==null&&this.stroke===null}};function yd(e){if(e.length===1)return e[0];let t=new Float32Array(e.reduce((e,t)=>e+t.length,0)),n=0;for(let r of e)t.set(r,n),n+=r.length;return t}function bd(e){return La(e)}function xd(e,t,n){let r=n===`raised`;return{workingResolution:gs(e.workingResolution),strokes:Qn(t,qn(e)),globals:bd(e),area:{merge:e.areaMerge,cornerRounding:e.areaCornerRounding,fillGaps:e.areaFillGaps,softenPoints:e.areaSoftenPoints,grow:e.areaGrow,roughness:e.carveRoughness,roughnessType:e.carveRoughnessType,roughnessScale:e.carveRoughnessScale,roughnessSharpness:e.carveRoughnessSharpness},carve:{raised:r,depth:r?e.raisedHeight:e.carveDepth,bevel:e.raisedProfile,bevelWidth:e.raisedBevelWidth,profile:e.carveProfile,steepness:e.carveWallSteepness,peckDensity:e.carvePeckDensity,peckSize:e.carvePeckSize,peckVariation:e.carvePeckVariation}}}function Sd(e,t,n){return{...e,angle:Jl(t.angle,n),elevation:t.elevation,color:t.color,intensity:t.intensity}}function Cd(e,t){return{raised:t===`raised`?{height:e.raisedHeight,bevel:e.raisedProfile,bevelWidth:e.raisedBevelWidth,weathering:e.raisedWeathering,texture:e.raisedTexture,shadow:e.raisedShadow,shadowDistance:e.raisedShadowDistance,shadowSoftness:e.raisedShadowSoftness}:null,doc:{width:e.canvasWidth,height:e.canvasHeight},placement:{scale:e.backgroundScale,offsetX:e.backgroundOffsetX,offsetY:e.backgroundOffsetY,rotation:e.backgroundRotation},rock:{surface:e.carveSurfaceColor,interior:e.carveInteriorColor,protection:e.carveLightSpotProtection,textureStrength:e.carveTextureStrength,detailSize:e.carveDetailSize,depthReveal:e.carveDepthReveal,edgeSoftness:e.carveEdgeSoftness,brightness:e.carveInteriorBrightness,contrast:e.carveInteriorContrast,saturation:e.carveInteriorSaturation,carveDepth:e.carveDepth,followSurface:e.rockFollowSurface,age:e.carveAge,cracks:e.carveCracks,interiorTexture:e.carveInteriorTexture,reliefStrength:e.backgroundReliefStrength,normalDetail:e.backgroundNormalDetail,varnish:e.carveVarnishAmount,varnishPatchiness:e.carveVarnishPatchiness},light:{angle:Jl(e.lightAngle,e.backgroundRotation),elevation:e.lightElevation,intensity:e.lightIntensity,ambient:e.lightAmbient,color:e.lightColor,shadowLength:e.lightShadowLength,shadowSoftness:e.lightShadowSoftness,occlusion:e.lightOcclusion,highlight:e.lightHighlight},profile:e.carveProfile,steepness:e.carveWallSteepness}}var wd=10;function Td(e){let t=L.value,n=qn(t);if(!n||!t.symGuides)return null;let r=da(n,t.canvasWidth,t.canvasHeight);return{center:r.center,angle:r.center&&r.hasAngle?fa(n,90*e):null}}function Ed(e,t){let n=Td(t);if(!n)return null;let r=n=>n!==null&&Math.hypot(n.x-e.x,n.y-e.y)<=wd*t;return r(n.angle)?`angle`:r(n.center)?`center`:null}function Dd(e,t){let n=L.value;if(e===`center`){ir({symCenterX:t.x/n.canvasWidth*100,symCenterY:t.y/n.canvasHeight*100});return}let r=n.symCenterX/100*n.canvasWidth,i=n.symCenterY/100*n.canvasHeight;ir({symAngle:Math.round(Math.atan2(t.y-i,t.x-r)*180/Math.PI)})}var Od=`#e8833a`,kd=`#fff`,Ad=`rgb(0 0 0 / 0.6)`,jd=`rgb(255 255 255 / 0.8)`,Md=`#35c9e8`,Nd=`rgb(140 220 255 / 0.85)`;function Pd(e,t){let n=t[0];if(n){e.moveTo(n[0].x,n[0].y);for(let n of t)e.bezierCurveTo(n[1].x,n[1].y,n[2].x,n[2].y,n[3].x,n[3].y)}}function Fd(e,t){e.moveTo(t[0],t[1]);for(let n=3;n<t.length;n+=3)e.lineTo(t[n],t[n+1])}function Id(e,t,n,r){e.beginPath(),e.arc(t,n,r,0,Math.PI*2),e.fill()}function Ld(e,t){for(let n of t.subpaths){let t=n.points;if(!(t.length<2)){e.moveTo(t[0],t[1]);for(let n=2;n+1<t.length;n+=2)e.lineTo(t[n],t[n+1]);n.closed&&e.closePath()}}}function Rd(e,t,n){e.strokeStyle=Od,e.lineWidth=1.5*n,e.beginPath(),t.curves.length>0?Pd(e,t.curves):Ld(e,t),e.stroke(),e.fillStyle=kd,e.strokeStyle=Ad,e.lineWidth=1*n;let r=2.5*n;e.beginPath();for(let n of t.anchors)n.corner?e.rect(n.x-r,n.y-r,2*r,2*r):(e.moveTo(n.x+r,n.y),e.arc(n.x,n.y,r,0,Math.PI*2));e.fill(),e.stroke()}function zd(e,t,n){if(t.input.type!==`freehand`||typeof t.params.pattern==`string`){Rd(e,oa(t),n);return}let r=t.input.points;r.length<3||(e.strokeStyle=Od,e.fillStyle=Od,r.length===3?Id(e,r[0],r[1],2.5*n):(e.lineWidth=1.5*n,e.beginPath(),Fd(e,r),e.stroke()))}function Bd(e,t){if(t.input.type!==`freehand`)return;let n=t.input.points;e.strokeStyle=t.kind===`damage`?`rgb(255 140 60 / 0.35)`:`rgb(255 255 255 / 0.4)`,e.fillStyle=e.strokeStyle,n.length===3?Id(e,n[0],n[1],t.size/2):(e.lineWidth=t.size,e.beginPath(),Fd(e,n),e.stroke())}function Vd(e,t,n){let r=t.spacing;for(;r/n<6;)r*=2;e.strokeStyle=`rgb(255 255 255 / 0.25)`,e.lineWidth=n,e.beginPath();for(let n=0;n<=t.width;n+=r)e.moveTo(n,0),e.lineTo(n,t.height);for(let n=0;n<=t.height;n+=r)e.moveTo(0,n),e.lineTo(t.width,n);e.stroke()}function Hd(e,t,n){e.strokeStyle=Nd,e.lineWidth=1*n,e.setLineDash([6*n,4*n]),e.beginPath();for(let n of t.lines)e.moveTo(n[0],n[1]),e.lineTo(n[2],n[3]);e.stroke(),e.setLineDash([]),e.fillStyle=Nd,e.strokeStyle=Ad,t.center&&t.angle&&(e.beginPath(),e.moveTo(t.center.x,t.center.y),e.lineTo(t.angle.x,t.angle.y),e.strokeStyle=Nd,e.stroke(),e.strokeStyle=Ad);for(let[r,i]of[[t.center,6],[t.angle,4.5]])r&&(e.beginPath(),e.arc(r.x,r.y,i*n,0,Math.PI*2),e.fill(),e.stroke())}function Ud(e,t,n){let r=6*n;e.lineWidth=2*n,e.strokeStyle=Md,e.beginPath(),t.kind===`grid`?e.rect(t.x-r*.8,t.y-r*.8,r*1.6,r*1.6):(e.arc(t.x,t.y,r,0,Math.PI*2),t.kind===`path`&&t.tangent&&(e.moveTo(t.x-t.tangent.x*r*2,t.y-t.tangent.y*r*2),e.lineTo(t.x+t.tangent.x*r*2,t.y+t.tangent.y*r*2))),e.stroke()}function Wd(e,t,n){e.strokeStyle=jd,e.lineWidth=1*n,e.setLineDash([4*n,3*n]),e.beginPath();for(let n of t.lines)if(!(n.length<4)){e.moveTo(n[0],n[1]);for(let t=2;t+1<n.length;t+=2)e.lineTo(n[t],n[t+1])}e.stroke(),e.setLineDash([]),e.fillStyle=kd,e.strokeStyle=Ad;for(let r=0;r+1<t.points.length;r+=2)e.beginPath(),e.arc(t.points[r],t.points[r+1],3.5*n,0,Math.PI*2),e.fill(),e.stroke()}function Gd(e,t,n){e.strokeStyle=jd,e.fillStyle=jd,e.lineWidth=1*n,e.setLineDash([3*n,3*n]),e.beginPath(),e.moveTo(t.brush.x,t.brush.y),e.lineTo(t.pointer.x,t.pointer.y),e.stroke(),e.setLineDash([]),Id(e,t.pointer.x,t.pointer.y,2*n)}function Kd(e,t){e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,e.canvas.width,e.canvas.height);let n=t.view.zoom*t.dpr;e.setTransform(n,0,0,n,t.view.panX*t.dpr,t.view.panY*t.dpr),e.lineCap=`round`,e.lineJoin=`round`;let r=1/t.view.zoom;if(t.grid&&Vd(e,t.grid,r),t.pathView){for(let n of t.strokes)Rd(e,oa(n),r);t.draft&&zd(e,t.draft,r);for(let n of t.symmetry?.draftCopies??[])zd(e,n,r)}if(t.symmetry&&(t.symmetry.lines.length||t.symmetry.center)&&Hd(e,t.symmetry,r),t.draft&&(t.draft.kind===`eraser`||t.draft.kind===`damage`)){Bd(e,t.draft);for(let n of t.symmetry?.draftCopies??[])Bd(e,n)}t.string&&Gd(e,t.string,r),t.guides&&Wd(e,t.guides,r),t.snap&&Ud(e,t.snap,r)}M({fps:null,stages:{}});var qd=class{renderer;last=0;avgFrameMs=0;lastPublish=0;constructor(e){this.renderer=e}frame(e){}},Jd=48,Yd=Jd/2,Xd=20;function Zd(){let e=ke(null),t=L.value,n=yc.value,r=n?n.elevation:t.lightElevation,i=Jl(n?n.angle:t.lightAngle,t.backgroundRotation),a=Zl(i,r),o=Yd+a.x*Xd,s=Yd+a.y*Xd,c=t=>{let n=e.current.getBoundingClientRect(),r=Jd/n.width,i=Ql({x:((t.clientX-n.left)*r-Yd)/Xd,y:((t.clientY-n.top)*r-Yd)/Xd});ir({lightAngle:Math.round(Yl(i.angle,L.value.backgroundRotation)),lightElevation:Math.round(i.elevation)})};return q(`div`,{class:`light-dial`,title:`Light: ${Math.round(i)}°, ${Math.round(r)}° high. Drag to move it.`,onPointerDown:e=>{e.stopPropagation(),e.currentTarget.setPointerCapture(e.pointerId),wc(),Bt(),c(e)},onPointerMove:e=>{e.currentTarget.hasPointerCapture(e.pointerId)&&c(e)},onPointerUp:e=>{e.currentTarget.hasPointerCapture(e.pointerId)&&(e.currentTarget.releasePointerCapture(e.pointerId),Vt())},onPointerCancel:()=>Vt(),children:q(`svg`,{ref:e,viewBox:`0 0 ${Jd} ${Jd}`,"aria-hidden":`true`,children:[q(`circle`,{cx:Yd,cy:Yd,r:Xd}),q(`circle`,{class:`light-dial-ring`,cx:Yd,cy:Yd,r:Xd/2}),q(`line`,{x1:Yd,y1:Yd,x2:o,y2:s}),q(`circle`,{class:`light-dial-dot`,cx:o,cy:s,r:4})]})})}var Qd=M(!1),$d=M(`none`),ef=(e,t)=>({x:(e.x+t.x)/2,y:(e.y+t.y)/2}),tf=(e,t)=>Math.hypot(e.x-t.x,e.y-t.y),nf=300,rf=12;function af(e,t){let n=t.length>0?t:[e];return{pointerId:e.pointerId,pointerType:e.pointerType,points:n.map(e=>({...Ys(e.clientX,e.clientY),time:e.timeStamp})),pixelSize:1/K.value.zoom,shiftKey:e.shiftKey,altKey:e.altKey,noSnap:e.ctrlKey||e.metaKey}}function of(e,t){let n=new Map,r=null,i=e=>{(r?.mode===`rock`||r?.mode===`symmetry`)&&Vt(),(e?.mode===`rock`||e?.mode===`symmetry`)&&Bt(),r=e,$d.value=e?.mode??`none`},a=()=>{r?.mode===`tool`&&(r.tool.onCancel?.(),i(null))},o=n=>{let r=t();r.onPointerDown&&(e.setPointerCapture(n.pointerId),i({mode:`tool`,id:n.pointerId,tool:r}),r.onPointerDown(af(n,[n])))},s=()=>{let[e,t]=[...n.values()];e&&t&&(a(),i({mode:`pinch`,startView:K.value,startMid:ef(e,t),startDist:tf(e,t),startTime:performance.now(),moved:!1}))},c=t=>{let a=Js(t.clientX,t.clientY);if(t.pointerType===`touch`)n.set(t.pointerId,a),e.setPointerCapture(t.pointerId),n.size===2?s():n.size===1&&cs.value?l(t,a):n.size===1&&o(t);else if(t.button===1||t.button===0&&Qd.value)t.preventDefault(),e.setPointerCapture(t.pointerId),i({mode:`pan`,id:t.pointerId,last:a});else if(t.button===0&&(t.altKey||cs.value))t.preventDefault(),e.setPointerCapture(t.pointerId),l(t,a);else if(t.button===0&&!r){let n=Ed(Ys(t.clientX,t.clientY),1/K.value.zoom);n?(e.setPointerCapture(t.pointerId),i({mode:`symmetry`,id:t.pointerId,handle:n})):o(t)}},l=(e,t)=>{let n=L.value;i({mode:`rock`,id:e.pointerId,start:t,offsetX:n.backgroundOffsetX,offsetY:n.backgroundOffsetY})},u=e=>{let i=Js(e.clientX,e.clientY);if(n.has(e.pointerId)&&n.set(e.pointerId,i),!r)e.pointerType!==`touch`&&t().onPointerHover?.(af(e,[e]));else if(r.mode===`pinch`){let[e,t]=[...n.values()];if(e&&t){let n=ef(e,t);(tf(n,r.startMid)>rf||Math.abs(tf(e,t)-r.startDist)>rf)&&(r.moved=!0),qs(zs(r.startView,r.startMid,r.startDist,n,tf(e,t)))}}else if(r.id!==e.pointerId)return;else if(r.mode===`tool`)r.tool.onPointerMove?.(af(e,e.getCoalescedEvents?.()??[]));else if(r.mode===`symmetry`)Dd(r.handle,Ys(e.clientX,e.clientY));else if(r.mode===`pan`)qs(Rs(K.value,i.x-r.last.x,i.y-r.last.y)),r.last=i;else{let e=K.value.zoom,t=Kl(Gs(),(i.x-r.start.x)/e,(i.y-r.start.y)/e);ir({backgroundOffsetX:r.offsetX+t.dx,backgroundOffsetY:r.offsetY+t.dy})}},d=t=>{n.delete(t.pointerId),e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId),r&&(r.mode===`tool`&&r.id===t.pointerId?(r.tool.onPointerUp?.(af(t,[t])),i(null)):r.mode===`pinch`?(!r.moved&&performance.now()-r.startTime<nf&&(qs(r.startView),ws()),i(null)):r.id===t.pointerId&&i(null))},f=e=>{n.delete(e.pointerId),r?.mode===`tool`&&r.id===e.pointerId?a():r&&(r.mode===`pinch`||r.id===e.pointerId)&&i(null)},p=e=>{e.preventDefault();let t=Bs(e.deltaY,e.deltaMode,e.ctrlKey);qs(Ls(K.value,t,Js(e.clientX,e.clientY)))},m=e=>{e.code!==`Space`||tc(e.target)||(e.preventDefault(),Qd.value=!0)},h=e=>{e.code===`Space`&&(Qd.value=!1)},g=()=>{Qd.value=!1,a(),(r?.mode===`rock`||r?.mode===`symmetry`)&&i(null)},_=e=>e.preventDefault();return e.addEventListener(`pointerdown`,c),e.addEventListener(`pointermove`,u),e.addEventListener(`pointerup`,d),e.addEventListener(`pointercancel`,f),e.addEventListener(`pointerleave`,ba),e.addEventListener(`wheel`,p,{passive:!1}),e.addEventListener(`auxclick`,_),window.addEventListener(`keydown`,m),window.addEventListener(`keyup`,h),window.addEventListener(`blur`,g),()=>{a(),r?.mode===`rock`&&i(null),e.removeEventListener(`pointerdown`,c),e.removeEventListener(`pointermove`,u),e.removeEventListener(`pointerup`,d),e.removeEventListener(`pointercancel`,f),e.removeEventListener(`pointerleave`,ba),e.removeEventListener(`wheel`,p),e.removeEventListener(`auxclick`,_),window.removeEventListener(`keydown`,m),window.removeEventListener(`keyup`,h),window.removeEventListener(`blur`,g)}}function sf(e,t){let n=document.createElement(`div`);n.style.color=`var(${t})`,e.appendChild(n);let r=getComputedStyle(n).color.match(/[\d.]+/g)??[];return n.remove(),[Number(r[0]??0)/255,Number(r[1]??0)/255,Number(r[2]??0)/255]}function cf(){let e=ke(null),t=ke(null),n=ke(null),[r,i]=Ee(null);Oe(()=>{let r=e.current,a=t.current,o=n.current,s=o.getContext(`2d`);Ws(r),wr();let c;try{c=new _d(a)}catch(e){i(e instanceof Bl?e.message:`Couldn't start the renderer: ${String(e)}`),e instanceof Bl||console.error(e);return}let l=e=>{e.preventDefault(),i(`The graphics card was reset, so the canvas stopped drawing. Reload the page to carry on: your drawing is autosaved.`)};a.addEventListener(`webglcontextlost`,l);let u=sf(r,`--canvas-bg`),d=sf(r,`--doc-bg`),f=new ResizeObserver(()=>{let e=r.getBoundingClientRect();Vs.value={width:e.width,height:e.height}});f.observe(r);let p=``,m=st(()=>{let{width:e,height:t}=Vs.value,n=`${L.value.canvasWidth}x${L.value.canvasHeight}`;e<=0||t<=0||(n!==p||Hs.peek())&&(p=n,Ks())}),h=0,g=!1,_=!1,v=null,y=null,b=new vd,x=new qd(c),S=()=>{h||=requestAnimationFrame(e=>{h=0;let t=window.devicePixelRatio||1,{width:n,height:r}=Vs.peek();c.resize(n,r,t)&&(o.width=a.width,o.height=a.height,g=_=!0),g&&!Nl.peek()&&(v?.(),x.frame(e),g=!1),_&&y?.(),_=!1,b.settling&&(g=!0,S())})},C=st(()=>{let e=L.value,t=K.value,n=ur.value?.image??null,r=ur.value?.height??null,i=ur.value?.cracks??null,a=ur.value?.interior??null,o=ur.value?.normal??null,s=ur.value?.layout,l=ys.value,f=os.value,p=It.value,m=F.value,h=Cd(e,m),_=yc.value,y=_?{...h,light:Sd(h.light,_,e.backgroundRotation)}:h,x=xd(e,p,m),C=Math.max(e.canvasWidth,e.canvasHeight),w=m===`raised`?e.raisedHeight:e.carveDepth;b.update(B.value,p.length,x.globals,w,C,e.strokeSettleAnimated,qn(e)),Vs.value,v=()=>{c.setPhoto(n,r,s),c.setRockExtras(i,a,o),c.render({...y,view:t,dpr:window.devicePixelRatio||1,debugView:l,pathView:f,draft:b.current(performance.now()),pipeline:x,workspaceColor:u,emptyColor:d})},g=!0,S()}),w=st(()=>{let e=qn(L.value),t=Td(1/K.value.zoom),n=e&&t?da(e,L.value.canvasWidth,L.value.canvasHeight):null,r={view:K.value,strokes:Qn(It.value,e),draft:B.value,string:Rr.value,pathView:os.value,guides:Lr.value,grid:L.value.showGrid?{spacing:L.value.gridSpacing,width:L.value.canvasWidth,height:L.value.canvasHeight}:null,snap:pa.value,symmetry:e?{lines:n?.lines??[],center:t?.center??null,angle:t?.angle??null,draftCopies:B.value?Zn(B.value,e):[]}:null};Vs.value,y=()=>Kd(s,{...r,dpr:window.devicePixelRatio||1}),_=!0,S()}),ee=of(r,()=>es(G.peek()));return Fl({renderer:c,baseFrame:()=>{let e=L.peek(),t=F.peek();return{...Cd(e,t),view:K.peek(),dpr:1,debugView:`final`,pathView:!1,draft:null,pipeline:xd(e,It.peek(),t),workspaceColor:u,emptyColor:d}},redraw:()=>{g=!0,S()}}),()=>{a.removeEventListener(`webglcontextlost`,l),Fl(null),cancelAnimationFrame(h),C(),w(),m(),ee(),f.disconnect(),c.dispose(),Ws(null)}},[]);let a=$d.value,o=a===`pan`||a===`rock`?`grabbing`:Qd.value||cs.value?`grab`:``,s=es(G.value).cursor;return q(`section`,{ref:e,class:`canvas-area ${o}`,style:o||!s?void 0:{cursor:s},"aria-label":`Canvas`,children:[q(`canvas`,{ref:t,class:`gl-canvas`}),q(`canvas`,{ref:n,class:`overlay-canvas`}),r&&q(`div`,{class:`canvas-message error`,children:r}),!r&&dr.value&&q(`div`,{class:`canvas-message`,children:`Loading rock…`}),!r&&fr.value&&q(`div`,{class:`canvas-message error`,children:fr.value}),!r&&!dr.value&&It.value.length===0&&!B.value&&q(`div`,{class:`canvas-hint`,children:`Pick a tool and draw on the rock. Change the rock under Environment → Background. Press ? for shortcuts.`}),q(Zd,{})]})}function lf(){return q(`footer`,{class:`status-bar`,children:[q(`div`,{class:`status-left`,children:[q(`span`,{class:`zoom-label`,children:[Math.round(K.value.zoom*100),`%`]}),q(`button`,{class:`small`,title:`Fit the canvas in the window (${ac(`mod+0`)})`,onClick:Ks,children:`Fit`}),q(`span`,{children:[L.value.canvasWidth,` × `,L.value.canvasHeight]}),q(`button`,{class:L.value.snapOn?`small toggle active`:`small toggle`,"aria-pressed":L.value.snapOn,title:`Snapping on/off (hold Ctrl / Cmd while drawing to skip it once)`,onClick:()=>ir({snapOn:!L.value.snapOn}),children:`Snap`}),q(`button`,{class:`small`,title:`Keyboard shortcuts (?)`,onClick:()=>ls.value=!0,children:`?`}),!1,!1]}),q(`div`,{class:zr.value?`status-hint message`:`status-hint`,children:zr.value??Ss(G.value)})]})}function uf(e){return q(`div`,{class:`segmented`,children:e.options.map(t=>q(`button`,{class:t.value===e.value?`active`:``,"aria-pressed":t.value===e.value,disabled:t.disabled||e.disabled,onClick:()=>e.onPick(t.value),children:t.label},String(t.value)))})}var df=1e3,ff=[65536,0,0,0,65536,0,0,0,1073741824],Q=class{parts=[];u8(e){return this.parts.push(e&255),this}u16(e){return this.u8(e>>>8).u8(e)}u32(e){return this.u16(e>>>16).u16(e)}zeros(e){for(let t=0;t<e;t++)this.u8(0);return this}ascii(e){for(let t of e)this.u8(t.charCodeAt(0));return this}bytes(e){for(let t of e)this.u8(t);return this}done(){return Uint8Array.from(this.parts)}};function pf(e){let t=new Uint8Array(e.reduce((e,t)=>e+t.length,0)),n=0;for(let r of e)t.set(r,n),n+=r.length;return t}function mf(e,...t){let n=pf(t);return pf([new Q().u32(n.length+8).ascii(e).done(),n])}function $(e,t,n,...r){return mf(e,new Q().u8(t).u8(n>>>16).u16(n).done(),...r)}var hf=()=>{let e=new Q;for(let t of ff)e.u32(t);return e.done()};function gf(e,t){let n=e.samples.length,r=mf(`avc1`,new Q().zeros(6).u16(1).zeros(16).u16(e.width).u16(e.height).u32(4718592).u32(4718592).zeros(4).u16(1).zeros(32).u16(24).u16(65535).done(),mf(`avcC`,e.avcC)),i=$(`stsd`,0,0,new Q().u32(1).done(),r),a=$(`stts`,0,0,new Q().u32(1).u32(n).u32(e.sampleDuration).done()),o=e.samples.map((t,n)=>t.pts-n*e.sampleDuration),s=[i,a];if(o.some(e=>e!==0)){let e=new Q().u32(n);for(let t of o)e.u32(1).u32(t);s.push($(`ctts`,1,0,e.done()))}let c=e.samples.flatMap((e,t)=>e.key?[t+1]:[]),l=new Q().u32(c.length);for(let e of c)l.u32(e);let u=new Q().u32(0).u32(n);for(let t of e.samples)u.u32(t.data.length);return s.push($(`stss`,0,0,l.done()),$(`stsc`,0,0,new Q().u32(1).u32(1).u32(n).u32(1).done()),$(`stsz`,0,0,u.done()),$(`stco`,0,0,new Q().u32(1).u32(t).done())),mf(`stbl`,...s)}function _f(e,t){let n=e.samples.length*e.sampleDuration,r=Math.round(n*df/e.timescale);return mf(`moov`,$(`mvhd`,0,0,new Q().u32(0).u32(0).u32(df).u32(r).u32(65536).u16(256).zeros(10).bytes(hf()).zeros(24).u32(2).done()),mf(`trak`,$(`tkhd`,0,3,new Q().u32(0).u32(0).u32(1).zeros(4).u32(r).zeros(8).u16(0).u16(0).u16(0).zeros(2).bytes(hf()).u32(e.width*65536).u32(e.height*65536).done()),mf(`mdia`,$(`mdhd`,0,0,new Q().u32(0).u32(0).u32(e.timescale).u32(n).u16(21956).u16(0).done()),$(`hdlr`,0,0,new Q().u32(0).ascii(`vide`).zeros(12).ascii(`VideoHandler`).u8(0).done()),mf(`minf`,$(`vmhd`,0,1,new Q().zeros(8).done()),mf(`dinf`,$(`dref`,0,0,new Q().u32(1).done(),$(`url `,0,1))),gf(e,t)))))}function vf(e){let t=mf(`ftyp`,new Q().ascii(`isom`).u32(512).ascii(`isomiso2avc1mp41`).done()),n=_f(e,0).length,r=t.length+n+8,i=pf(e.samples.map(e=>e.data)),a=new Q().u32(i.length+8).ascii(`mdat`).done();return pf([t,_f(e,r),a,i])}var yf=[720,1080,1440,2160];function bf(e,t){let n=e=>Math.max(2,2*Math.round(e/2));return{width:n(t*e.width/e.height),height:n(t)}}var xf=[[`1f`,3600,108e3],[`28`,8192,245760],[`2a`,8704,522240],[`32`,22080,589824],[`33`,36864,983040],[`34`,36864,2073600],[`3c`,139264,4177920]];function Sf(e){let t=Math.ceil(e.width/16)*Math.ceil(e.height/16);return xf.filter(([,n,r])=>t<=n&&t*30<=r&&Math.max(e.width,e.height)/16<=Math.sqrt(8*n)).map(([e])=>`avc1.6400${e}`)}function Cf(e){return Math.round(Math.min(4e7,Math.max(4e6,e.width*e.height*30*.15)))}function wf(e,t){return Cf(e)*t/8/1e6}function Tf(e,t,n){return`glyphy-day-${e.replace(/[^a-z0-9-]+/gi,`-`).replace(/^-+|-+$/g,``)||`drawing`}-${t}s-${n}p.mp4`}var Ef=3e4,Df=60,Of=4,kf=new MessageChannel,Af=[];kf.port1.onmessage=()=>Af.shift()?.();var jf=()=>new Promise(e=>{Af.push(e),kf.port2.postMessage(0)});function Mf(e){return e.encodeQueueSize<=Of?Promise.resolve():new Promise(t=>{let n=()=>{e.encodeQueueSize>Of&&e.state===`configured`||(e.removeEventListener(`dequeue`,n),t())};e.addEventListener(`dequeue`,n)})}function Nf(e,t){return{codec:e,width:t.width,height:t.height,bitrate:Cf(t),framerate:30,avc:{format:`avc`}}}async function Pf(e){if(typeof VideoEncoder>`u`)return null;for(let t of Sf(e)){let n=Nf(t,e);try{let{supported:e}=await VideoEncoder.isConfigSupported(n);if(e)return n}catch{}}return null}async function Ff(e,t){for(let n of[...yf].reverse())if(n<t&&await Pf(bf(e,n)))return n;return null}async function If(e,t,n){let r=Il();if(!r)throw Error(`The canvas isn't ready yet.`);if(typeof VideoEncoder>`u`||typeof VideoFrame>`u`)throw Error(`This browser can't make videos (it needs WebCodecs). Try a current Chrome, Edge, Safari or Firefox.`);let i=await Pf(e.size);if(!i){let t=L.peek(),n=await Ff({width:t.canvasWidth,height:t.canvasHeight},e.size.height);throw Error(`This browser can't encode a ${e.size.width} × ${e.size.height} video`+(n?`. Try ${n}p.`:`, even at 720p.`))}wc();let{renderer:a}=r,o=a.gl,{width:s,height:c}=e.size;Nl.value=!0;let l=Y(o,s,c,`rgba8`),u=[],d=null,f=null,p=new VideoEncoder({output:(e,t)=>{let n=new Uint8Array(e.byteLength);e.copyTo(n),u.push({data:n,key:e.type===`key`,pts:Math.round(e.timestamp*Ef/1e6)});let r=t?.decoderConfig?.description;r&&!d&&(d=new Uint8Array(ArrayBuffer.isView(r)?r.buffer.slice(r.byteOffset,r.byteOffset+r.byteLength):r))},error:e=>f=e instanceof Error?e:Error(String(e))});try{p.configure(i);let m=r.baseFrame(),h=L.peek().backgroundRotation,g=xc(),_=Dl(e.size,e.detail,o.getParameter(o.MAX_TEXTURE_SIZE)),v=s/m.doc.width,y=_c(e.seconds,30),b=new Uint8Array(s*c*4),x=new Uint8Array(s*c*4),S=s*4;for(let e=0;e<y;e++){if(n.aborted)throw Error(`Cancelled.`);if(f)throw f;t(e===0?`Carving at video resolution…`:`Rendering frame ${e+1} of ${y}…`,e/y),await jf();let r={...m,light:Sd(m.light,gc(vc(e,y),g),h),pipeline:{...m.pipeline,workingResolution:_,allowUpscale:!0},view:{zoom:v,panX:0,panY:0},dpr:1,draft:null,debugView:`final`,pathView:!1,glyphOnly:!1};if(a.render(r,l),o.isContextLost())throw Error(`The graphics card gave up. Try a smaller video size.`);o.bindFramebuffer(o.FRAMEBUFFER,l.fbo),o.readPixels(0,0,s,c,o.RGBA,o.UNSIGNED_BYTE,b),o.bindFramebuffer(o.FRAMEBUFFER,null);for(let e=0;e<c;e++)x.set(b.subarray((c-1-e)*S,(c-e)*S),e*S);let i=Math.round(e*1e6/30),u=new VideoFrame(x,{format:`RGBA`,codedWidth:s,codedHeight:c,timestamp:i,duration:33333});p.encode(u,{keyFrame:e%Df===0}),u.close(),await Mf(p)}if(t(`Finishing the video…`,1),await p.flush(),f)throw f;if(!d||u.length===0)throw Error(`The video encoder didn't produce anything.`);let C=vf({width:s,height:c,timescale:Ef,sampleDuration:1e3,avcC:d,samples:u});return new Blob([C],{type:`video/mp4`})}finally{p.state!==`closed`&&p.close(),X(o,l),Nl.value=!1,r.redraw()}}var Lf=M(1080),Rf=M(null),zf=M(0),Bf=null;function Vf({close:e}){let t=L.value,n=bf({width:t.canvasWidth,height:t.canvasHeight},Lf.value),r=bc.value,i=Nl.value,a=dr.value?`The rock is still loading.`:null,o=async()=>{Bf=new AbortController,Rf.value={text:`Starting…`},zf.value=0;try{let e=await If({size:n,seconds:r,detail:_s(t.exportDetail)},(e,t)=>{Rf.value={text:e},zf.value=t},Bf.signal),i=Tf(t.backgroundId,r,Lf.value);Er(i,e),Rf.value={text:`Saved ${i} (${n.width} × ${n.height} px, ${(e.size/1e6).toFixed(1)} MB).`}}catch(e){Rf.value={text:e instanceof Error?e.message:String(e),error:!0}}finally{Bf=null}};return q(y,{children:[q(`p`,{class:`modal-hint`,children:`A day passing over the carving: the light rises low on one side, crosses the sky (centred on the current light) and sets on the other, warm at sunrise and sunset. MP4, 30 frames a second.`}),q(Dc,{label:`Length`,value:r,min:2,max:10,step:1,defaultValue:5,unit:`s`,help:`Sunrise to sunset, in seconds (the same as Light → Day length).`,onInput:e=>bc.value=Math.round(e)}),q(`div`,{class:`modal-row`,children:[q(`span`,{class:`modal-label`,children:`Height`}),q(uf,{value:Lf.value,options:yf.map(e=>({value:e,label:`${e}p`})),onPick:e=>Lf.value=e,disabled:i})]}),q(`p`,{class:a?`modal-hint error`:`modal-hint`,children:[n.width,` × `,n.height,` px, about `,wf(n,r).toFixed(0),` MB`,a?` — ${a}`:``]}),Rf.value&&q(`p`,{class:Rf.value.error?`modal-status error`:`modal-status`,children:Rf.value.text}),i&&q(`progress`,{class:`modal-progress`,max:1,value:zf.value}),q(`div`,{class:`modal-actions`,children:[i?q(`button`,{onClick:()=>Bf?.abort(),children:`Cancel`}):q(`button`,{onClick:e,children:`Close`}),q(`button`,{class:`primary`,onClick:()=>void o(),disabled:i||!!a,children:i?`Exporting…`:`Export video`})]})]})}var Hf=M({kind:`full`,format:`png`,scale:1,customWidth:3e3,quality:.92,crop:!0,padding:32,dropShadow:null}),Uf=M(null),Wf=e=>Hf.value={...Hf.value,...e},Gf=M(`image`);function Kf(){let e=Hf.value,t=L.value,n=Tl({width:t.canvasWidth,height:t.canvasHeight},e.scale>0?{scale:e.scale}:{width:Math.max(1,e.customWidth||1)}),r=dr.value?`The rock is still loading.`:El(n),i=F.value===`raised`,a=i||e.kind===`glyph`,o=e.dropShadow??t.raisedShadow,s=a?`png`:e.format,c=Nl.value,l=!i&&Gf.value===`video`,u=()=>{c||(ss.value=!1)};Oe(()=>{let e=e=>e.key===`Escape`&&u();return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)});let d=async()=>{Uf.value={text:`Starting…`};try{let{blob:r,size:c}=await zl({kind:a?`glyph`:`full`,format:s,size:n,quality:e.quality,crop:a&&e.crop,padding:e.padding,dropShadow:i&&o,detail:_s(t.exportDetail)},e=>Uf.value={text:e}),l=Ml(t.backgroundId,Ar(),s);Er(l,r),Uf.value={text:`Saved ${l} (${c.width} × ${c.height} px, ${(r.size/1e6).toFixed(1)} MB).`}}catch(e){Uf.value={text:e instanceof Error?e.message:String(e),error:!0}}};return q(`div`,{class:`modal-backdrop`,onClick:e=>e.target===e.currentTarget&&u(),children:q(`div`,{class:`modal`,role:`dialog`,"aria-modal":`true`,"aria-labelledby":`export-title`,children:[q(`h2`,{id:`export-title`,children:`Export`}),!i&&q(`div`,{class:`modal-row`,children:[q(`span`,{class:`modal-label`,children:`Export`}),q(uf,{value:Gf.value,options:[{value:`image`,label:`Image`},{value:`video`,label:`Day-cycle video`}],onPick:e=>Gf.value=e,disabled:c})]}),l?q(Vf,{close:u}):q(y,{children:[i?q(y,{children:[q(`p`,{class:`modal-hint`,children:`The raised glyphs on a transparent background (PNG). Day-cycle videos are for carvings only.`}),q(`label`,{class:`modal-row`,children:[q(`input`,{type:`checkbox`,checked:o,disabled:c,onChange:e=>Wf({dropShadow:e.currentTarget.checked})}),q(`span`,{children:`Include drop shadow`})]})]}):q(y,{children:[q(`div`,{class:`modal-row`,children:[q(`span`,{class:`modal-label`,children:`Image`}),q(uf,{value:e.kind,options:[{value:`full`,label:`Full image`},{value:`glyph`,label:`Glyph only`}],onPick:e=>Wf({kind:e}),disabled:c})]}),q(`p`,{class:`modal-hint`,children:a?`Just the carving and its lighting, on a transparent background (PNG).`:`The rock with the carving, lit as on screen.`})]}),q(`div`,{class:`modal-row`,children:[q(`span`,{class:`modal-label`,children:`Format`}),q(uf,{value:s,options:[{value:`png`,label:`PNG`},{value:`jpg`,label:`JPG`,disabled:a}],onPick:e=>Wf({format:e}),disabled:c})]}),s===`jpg`&&q(Dc,{label:`JPG quality`,value:e.quality,min:.5,max:1,step:.01,defaultValue:.92,help:`Higher is sharper but makes a bigger file.`,onInput:e=>Wf({quality:e})}),q(`div`,{class:`modal-row`,children:[q(`span`,{class:`modal-label`,children:`Size`}),q(uf,{value:e.scale,options:[{value:1,label:`1x`},{value:2,label:`2x`},{value:4,label:`4x`},{value:0,label:`Custom`}],onPick:e=>Wf({scale:e}),disabled:c})]}),e.scale===0&&q(`label`,{class:`modal-row`,children:[q(`span`,{class:`modal-label`,children:`Width`}),q(`input`,{type:`number`,min:1,step:1,value:e.customWidth,disabled:c,onInput:e=>Wf({customWidth:Math.round(Number(e.currentTarget.value))})}),q(`span`,{class:`modal-hint`,children:`px (height keeps the canvas shape)`})]}),q(`p`,{class:r?`modal-hint error`:`modal-hint`,children:[n.width,` × `,n.height,` px`,r?` — ${r}`:``]}),a&&q(`label`,{class:`modal-row`,children:[q(`input`,{type:`checkbox`,checked:e.crop,disabled:c,onChange:e=>Wf({crop:e.currentTarget.checked})}),q(`span`,{children:`Crop to the glyph, with`}),q(`input`,{type:`number`,class:`small-number`,min:0,step:1,value:e.padding,disabled:c||!e.crop,onInput:e=>Wf({padding:Math.max(0,Math.round(Number(e.currentTarget.value)))})}),q(`span`,{children:`px padding`})]}),Uf.value&&q(`p`,{class:Uf.value.error?`modal-status error`:`modal-status`,children:Uf.value.text}),q(`div`,{class:`modal-actions`,children:[q(`button`,{onClick:u,disabled:c,children:`Close`}),q(`button`,{class:`primary`,onClick:()=>void d(),disabled:c||!!r,children:c?`Exporting…`:`Export`})]})]})]})})}var qf=[[`Space + drag, or middle-drag`,`Pan`],[`Mouse wheel / trackpad pinch`,`Zoom`],[`${$s} + drag`,`Move the rock behind the canvas`],[`Shift while drawing`,`Straight segments snap to angle steps`],[`Hold ${Qs} while drawing`,`Draw without snapping`],[`Enter / double-click`,`Finish a line or curve`],[`Esc`,`Cancel the line being drawn, stop Play day, close dialogs`],[`Double-click a slider`,`Reset it to its default`]];function Jf(){let e=()=>ls.value=!1;Oe(()=>{let t=t=>t.key===`Escape`&&e();return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)});let t=new Map;for(let e of Xs)t.set(e.label,[...t.get(e.label)??[],ac(e.keys)]);return q(`div`,{class:`modal-backdrop`,onClick:t=>t.target===t.currentTarget&&e(),children:q(`div`,{class:`modal shortcuts`,role:`dialog`,"aria-modal":`true`,"aria-labelledby":`shortcuts-title`,children:[q(`h2`,{id:`shortcuts-title`,children:`Keyboard shortcuts`}),q(`table`,{class:`shortcut-table`,children:q(`tbody`,{children:[[...t].map(([e,t])=>q(`tr`,{children:[q(`td`,{children:t.map((e,t)=>q(`kbd`,{children:e},t))}),q(`td`,{children:e})]},e)),qf.map(([e,t])=>q(`tr`,{children:[q(`td`,{class:`gesture`,children:e}),q(`td`,{children:t})]},t))]})}),q(`div`,{class:`modal-actions`,children:q(`button`,{class:`primary`,onClick:e,children:`Done`})})]})})}var Yf=60;function Xf(){let e=fs.value,t=ke(null);if(!e)return null;let n=es(G.value),r=n.inTray?$o.find(e=>e.opensTray===n.inTray):void 0;return q(`section`,{class:`bottom-sheet`,"aria-label":`Settings`,children:[q(`div`,{class:`sheet-handle`,onPointerDown:e=>{t.current=e.clientY,e.currentTarget.setPointerCapture(e.pointerId)},onPointerUp:e=>{t.current!==null&&e.clientY-t.current>Yf&&(fs.value=null),t.current=null},children:q(`span`,{class:`sheet-grip`})}),q(`div`,{class:`sheet-tabs`,role:`tablist`,children:[q(`button`,{role:`tab`,"aria-selected":e===`tool`,class:e===`tool`?`active`:``,onClick:()=>fs.value=`tool`,children:r?r.label:n.label}),q(`button`,{role:`tab`,"aria-selected":e===`settings`,class:e===`settings`?`active`:``,onClick:()=>fs.value=`settings`,children:`Settings`}),q(`button`,{class:`sheet-close`,"aria-label":`Close`,onClick:()=>fs.value=null,children:`✕`})]}),q(`div`,{class:`sheet-body`,children:e===`tool`?q(`div`,{class:`panel-block`,children:r?.opensTray?q(ml,{tray:r.opensTray}):q(pl,{tool:n})}):q(sl,{withTools:!0})})]})}function Zf(){let e=$o.filter(e=>!e.inTray);return q(`nav`,{class:`mobile-bar`,"aria-label":`Tools`,children:[zr.value&&q(`div`,{class:`mobile-toast`,children:zr.value}),q(`div`,{class:`mobile-tools`,children:e.map(e=>{let t=vs(e);return q(`button`,{class:t?`mobile-tool active`:`mobile-tool`,"aria-pressed":t,title:e.hint,onClick:()=>{(t||e.opensTray)&&(fs.value=fs.value===`tool`&&t?null:`tool`),bs(e.id)},children:e.label},e.id)})}),q(`button`,{class:fs.value===`settings`?`mobile-settings active`:`mobile-settings`,"aria-pressed":fs.value===`settings`,onClick:()=>fs.value=fs.value===`settings`?null:`settings`,children:`Settings`})]})}function Qf(){let e=ds.value;return q(`div`,{class:e?`app compact`:`app`,children:[q(cc,{}),q(`main`,{class:`app-main`,children:[!e&&q(hl,{}),q(cf,{}),e&&q(Xf,{})]}),q(e?Zf:lf,{}),ss.value&&q(Kf,{}),ls.value&&q(Jf,{})]})}var $f=`glyphy.autosave`,ep=`glyphy.autosave.unreadable`,tp=`glyphy.toolParams`,np=`glyphy.strokeSettings`,rp=1e3;function ip(e){try{return localStorage.getItem(e)}catch{return null}}function ap(e,t){try{localStorage.setItem(e,t)}catch(e){console.warn(`Glyphy: couldn't autosave (${String(e)})`)}}function op(){let e=ip($f);if(e)try{zt(un(e))}catch(t){console.warn(`Glyphy: the autosaved drawing couldn't be loaded; kept a copy.`,t),ap(ep,e)}let t=ip(tp);if(t)try{let e=JSON.parse(t);for(let t of $o)for(let[n,r]of Object.entries(e[t.id]??{}))Kr(t,n,r)}catch{}let n=ip(np);if(n)try{Pr(JSON.parse(n))}catch{}}function sp(){let e,t=!1,n=()=>{clearTimeout(e),t&&(t=!1,ap($f,rn(P.peek())),ap(tp,JSON.stringify(Hr.peek())),ap(np,JSON.stringify(z.peek())))},r=!0,i=st(()=>{P.value,Hr.value,z.value,r?r=!1:(t=!0,clearTimeout(e),e=setTimeout(n,rp))}),a=()=>{document.visibilityState===`hidden`&&n()};return document.addEventListener(`visibilitychange`,a),window.addEventListener(`pagehide`,n),()=>{n(),i(),document.removeEventListener(`visibilitychange`,a),window.removeEventListener(`pagehide`,n)}}op(),sp(),Uc(),oc(),ps(),de(q(Qf,{}),document.getElementById(`app`));