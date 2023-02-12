import{useState as t,useRef as e,useCallback as r,useEffect as n}from"react";function o(){return o=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},o.apply(this,arguments)}var i=0;function a(t){return"__private_"+i+++"_"+t}function s(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var l=/*#__PURE__*/a("apiURL"),c=/*#__PURE__*/a("appURL"),u=/*#__PURE__*/a("authenticateEndpoint"),h=/*#__PURE__*/a("userInfoEndpoint"),p=/*#__PURE__*/a("mode"),d=/*#__PURE__*/a("ssoURL"),g=/*#__PURE__*/a("preflightURL"),f=/*#__PURE__*/a("redirectPath"),w=/*#__PURE__*/a("localStorageKey"),y=/*#__PURE__*/a("originSourceQuery");const b=new class{constructor(){Object.defineProperty(this,l,{writable:!0,value:void 0}),Object.defineProperty(this,c,{writable:!0,value:window.location.origin}),Object.defineProperty(this,u,{writable:!0,value:"/api/authenticate/"}),Object.defineProperty(this,h,{writable:!0,value:"/api/user-info/"}),Object.defineProperty(this,p,{writable:!0,value:"production"}),Object.defineProperty(this,d,{writable:!0,value:"https://sso.tga.gov.tr"}),Object.defineProperty(this,g,{writable:!0,value:"https://preflight.tga.gov.tr/api/preflight/"}),Object.defineProperty(this,f,{writable:!0,value:"/"}),Object.defineProperty(this,w,{writable:!0,value:"token"}),Object.defineProperty(this,y,{writable:!0,value:""})}get appURL(){return s(this,c)[c]}get apiURL(){return s(this,l)[l]}get authenticateEndpoint(){return s(this,u)[u]}get userInfoEndpoint(){return s(this,h)[h]}get preflightURL(){return s(this,g)[g]}get ssoURL(){return s(this,d)[d]}get mode(){return s(this,p)[p]}get localStorageKey(){return s(this,w)[w]}get originSourceQuery(){return s(this,y)[y]}get redirectPath(){return s(this,f)[f]}setupOriginSource(t){s(this,y)[y]=null==t?void 0:t.replaceAll("https://","").replaceAll("http://","")}setupSSOModeAndURL(t){s(this,p)[p]=t,s(this,d)[d]="development"===t?"https://tga-sso-frontend-dev.arge-tga.com":"https://sso.tga.gov.tr"}configure(t){s(this,l)[l]=t.apiURL||s(this,l)[l],s(this,c)[c]=t.appURL||s(this,c)[c],s(this,u)[u]=t.authenticateEndpoint||s(this,u)[u],s(this,h)[h]=t.userInfoEndpoint||s(this,h)[h],s(this,g)[g]=t.preflightURL||s(this,g)[g],s(this,f)[f]=t.redirectPath||s(this,f)[f],s(this,w)[w]=t.localStorageKey||s(this,w)[w],this.setupOriginSource(t.originSourceQuery||s(this,y)[y]),this.setupSSOModeAndURL(t.mode||s(this,p)[p])}};async function v(t,e){const{timeout:r=25e3}=e,n=new AbortController,i=setTimeout(()=>n.abort(),r),a=await fetch(t,o({},e,{signal:n.signal,headers:o({"Content-Type":"application/json"},e.headers)}));return clearTimeout(i),a}const S=(o=!0,i)=>{const[a,s]=t(!1),[l,c]=t(!1),[u,h]=t(null),p=e(),d=e(b.redirectPath),g=r(async(t,e)=>{var r;const n=await v(`${b.apiURL}${b.authenticateEndpoint}`,{signal:e,method:"POST",body:JSON.stringify({token:t})}),o=await n.json();return null!=o&&o.success?(localStorage.setItem(b.localStorageKey,JSON.stringify(null==o||null==(r=o.data)?void 0:r.token)),s(!0),null==o?void 0:o.data):m("autheticate !data?.success on :35")},[]),f=r(async t=>{const e=await v(`${b.apiURL}${b.userInfoEndpoint}`,{signal:t,method:"GET",headers:{Authorization:`Token ${JSON.parse(localStorage.getItem(b.localStorageKey))}`}}),r=await e.json();return null!=r&&r.success?(d.current=window.location.pathname,s(!0),null==r?void 0:r.data):m("userInfo !data.success on :59")},[]),w=r(async()=>{c(!0);const t=JSON.parse(localStorage.getItem(b.localStorageKey)),e=new URLSearchParams(window.location.search).get("token");if(!t&&!e)return m("handleAuth !token && !ssoToken on :71 ");try{p.current=new AbortController;const r=t?await f(p.current.signal):await g(e,p.current.signal);h(r),i&&i(r)}catch(t){return localStorage.removeItem(b.localStorageKey),m("handleAuth catch error on :82")}finally{c(!1),window.history.pushState({},document.title,d.current)}},[]);return n(()=>{if(o)return w(),()=>{var t;"production"===b.mode&&(null==(t=p.current)||t.abort())}},[o]),{isAuthed:a,isAuthing:l,user:u}};function m(t){t&&console.error(t);const{host:e,hostname:r}=window.location;window.open(`${b.ssoURL}/login?url=${e}${"localhost"===r?`&origin=${b.originSourceQuery}`:""}`,"_self")}const O=()=>{const[r,o]=t(!1),[i,a]=t(!0),s=e();return n(()=>((async()=>{try{s.current=new AbortController;const t=await v(b.preflightURL,{signal:s.current.signal,method:"GET",timeout:25e3}),e=await t.json();t.ok&&e.success&&o(!0)}catch(t){o(!1)}finally{a(!1)}})(),()=>{var t;"production"===b.mode&&(null==(t=s.current)||t.abort())}),[]),{isPreflighting:i,isAllowed:r}};export{b as SSO,S as useAuth,O as usePreflight};
