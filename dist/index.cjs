var t=require("react");function e(){return e=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},e.apply(this,arguments)}var r=0;function n(t){return"__private_"+r+++"_"+t}function o(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var i=/*#__PURE__*/n("apiURL"),u=/*#__PURE__*/n("appURL"),a=/*#__PURE__*/n("authenticateEndpoint"),s=/*#__PURE__*/n("userInfoEndpoint"),c=/*#__PURE__*/n("mode"),l=/*#__PURE__*/n("ssoURL"),h=/*#__PURE__*/n("preflightURL"),f=/*#__PURE__*/n("redirectPath"),p=/*#__PURE__*/n("localStorageKey"),d=/*#__PURE__*/n("originSourceQuery"),g=new(/*#__PURE__*/function(){function t(){Object.defineProperty(this,i,{writable:!0,value:void 0}),Object.defineProperty(this,u,{writable:!0,value:window.location.origin}),Object.defineProperty(this,a,{writable:!0,value:"/api/authenticate/"}),Object.defineProperty(this,s,{writable:!0,value:"/api/user-info/"}),Object.defineProperty(this,c,{writable:!0,value:"production"}),Object.defineProperty(this,l,{writable:!0,value:"https://sso.tga.gov.tr"}),Object.defineProperty(this,h,{writable:!0,value:"https://preflight.tga.gov.tr/api/preflight/"}),Object.defineProperty(this,f,{writable:!0,value:"/"}),Object.defineProperty(this,p,{writable:!0,value:"token"}),Object.defineProperty(this,d,{writable:!0,value:""})}var e,r,n=t.prototype;return n.setupOriginSource=function(t){o(this,d)[d]=null==t?void 0:t.replaceAll("https://","").replaceAll("http://","")},n.setupSSOModeAndURL=function(t){o(this,c)[c]=t,o(this,l)[l]="development"===t?"https://tga-sso-frontend-dev.arge-tga.com":"https://sso.tga.gov.tr"},n.configure=function(t){o(this,i)[i]=t.apiURL||o(this,i)[i],o(this,u)[u]=t.appURL||o(this,u)[u],o(this,a)[a]=t.authenticateEndpoint||o(this,a)[a],o(this,s)[s]=t.userInfoEndpoint||o(this,s)[s],o(this,h)[h]=t.preflightURL||o(this,h)[h],o(this,f)[f]=t.redirectPath||o(this,f)[f],o(this,p)[p]=t.localStorageKey||o(this,p)[p],this.setupOriginSource(t.originSourceQuery||o(this,d)[d]),this.setupSSOModeAndURL(t.mode||o(this,c)[c])},e=t,(r=[{key:"appURL",get:function(){return o(this,u)[u]}},{key:"apiURL",get:function(){return o(this,i)[i]}},{key:"authenticateEndpoint",get:function(){return o(this,a)[a]}},{key:"userInfoEndpoint",get:function(){return o(this,s)[s]}},{key:"preflightURL",get:function(){return o(this,h)[h]}},{key:"ssoURL",get:function(){return o(this,l)[l]}},{key:"mode",get:function(){return o(this,c)[c]}},{key:"localStorageKey",get:function(){return o(this,p)[p]}},{key:"originSourceQuery",get:function(){return o(this,d)[d]}},{key:"redirectPath",get:function(){return o(this,f)[f]}}])&&function(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,"symbol"==typeof(o=function(t,e){if("object"!=typeof t||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key))?o:String(o),n)}var o}(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}()),v=function(t,r){try{var n=r.timeout,o=void 0===n?25e3:n,i=new AbortController,u=setTimeout(function(){return i.abort()},o);return Promise.resolve(fetch(t,e({},r,{signal:i.signal,headers:e({"Content-Type":"application/json"},r.headers)}))).then(function(t){return clearTimeout(u),t})}catch(t){return Promise.reject(t)}};function y(t){t&&console.error(t);var e=window.location;window.open(g.ssoURL+"/login?url="+e.host+("localhost"===e.hostname?"&origin="+g.originSourceQuery:""),"_self")}exports.SSO=g,exports.useAuth=function(e,r){void 0===e&&(e=!0);var n=t.useState(!1),o=n[0],i=n[1],u=t.useState(!1),a=u[0],s=u[1],c=t.useState(null),l=c[0],h=c[1],f=t.useRef(),p=t.useRef(g.redirectPath),d=t.useCallback(function(t,e){try{return Promise.resolve(v(""+g.apiURL+g.authenticateEndpoint,{signal:e,method:"POST",body:JSON.stringify({token:t})})).then(function(t){return Promise.resolve(t.json()).then(function(t){var e;return null!=t&&t.success?(localStorage.setItem(g.localStorageKey,JSON.stringify(null==t||null==(e=t.data)?void 0:e.token)),i(!0),null==t?void 0:t.data):y("autheticate !data?.success on :35")})})}catch(t){return Promise.reject(t)}},[]),b=t.useCallback(function(t){try{return Promise.resolve(v(""+g.apiURL+g.userInfoEndpoint,{signal:t,method:"GET",headers:{Authorization:"Token "+JSON.parse(localStorage.getItem(g.localStorageKey))}})).then(function(t){return Promise.resolve(t.json()).then(function(t){return null!=t&&t.success?(p.current=window.location.pathname,i(!0),null==t?void 0:t.data):y("userInfo !data.success on :59")})})}catch(t){return Promise.reject(t)}},[]),m=t.useCallback(function(){try{s(!0);var t=JSON.parse(localStorage.getItem(g.localStorageKey)),e=new URLSearchParams(window.location.search).get("token");return Promise.resolve(t||e?function(n,o){try{var i=function(n,o){try{var i=(f.current=new AbortController,Promise.resolve(t?b(f.current.signal):d(e,f.current.signal)).then(function(t){h(t),r&&r(t)}))}catch(t){return o()}return i&&i.then?i.then(void 0,o):i}(0,function(){return localStorage.removeItem(g.localStorageKey),y("handleAuth catch error on :82")})}catch(t){return o(!0,t)}return i&&i.then?i.then(o.bind(null,!1),o.bind(null,!0)):o(!1,i)}(0,function(t,e){if(s(!1),window.history.pushState({},document.title,p.current),t)throw e;return e}):y("handleAuth !token && !ssoToken on :71 "))}catch(t){return Promise.reject(t)}},[]);return t.useEffect(function(){if(e)return m(),function(){var t;"production"===g.mode&&(null==(t=f.current)||t.abort())}},[e]),{isAuthed:o,isAuthing:a,user:l}},exports.usePreflight=function(){var e=t.useState(!1),r=e[0],n=e[1],o=t.useState(!0),i=o[0],u=o[1],a=t.useRef();return t.useEffect(function(){return function(){try{var t=function(t,e){try{var r=function(t,e){try{var r=(a.current=new AbortController,Promise.resolve(v(g.preflightURL,{signal:a.current.signal,method:"GET",timeout:25e3})).then(function(t){return Promise.resolve(t.json()).then(function(e){t.ok&&e.success&&n(!0)})}))}catch(t){return e()}return r&&r.then?r.then(void 0,e):r}(0,function(){n(!1)})}catch(t){return e(!0,t)}return r&&r.then?r.then(e.bind(null,!1),e.bind(null,!0)):e(!1,r)}(0,function(t,e){if(u(!1),t)throw e;return e});Promise.resolve(t&&t.then?t.then(function(){}):void 0)}catch(t){return Promise.reject(t)}}(),function(){var t;"production"===g.mode&&(null==(t=a.current)||t.abort())}},[]),{isPreflighting:i,isAllowed:r}};
