import{useState as t,useRef as e,useCallback as r,useEffect as n}from"react";function o(){return o=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},o.apply(this,arguments)}var i=0;function u(t){return"__private_"+i+++"_"+t}function a(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var c=/*#__PURE__*/u("apiURL"),s=/*#__PURE__*/u("appURL"),l=/*#__PURE__*/u("authenticateEndpoint"),h=/*#__PURE__*/u("userInfoEndpoint"),f=/*#__PURE__*/u("mode"),p=/*#__PURE__*/u("ssoURL"),d=/*#__PURE__*/u("preflightURL"),g=/*#__PURE__*/u("redirectPath"),v=/*#__PURE__*/u("localStorageKey"),y=/*#__PURE__*/u("originSourceQuery"),m=new(/*#__PURE__*/function(){function t(){Object.defineProperty(this,c,{writable:!0,value:void 0}),Object.defineProperty(this,s,{writable:!0,value:window.location.origin}),Object.defineProperty(this,l,{writable:!0,value:"/api/authenticate/"}),Object.defineProperty(this,h,{writable:!0,value:"/api/user-info/"}),Object.defineProperty(this,f,{writable:!0,value:"production"}),Object.defineProperty(this,p,{writable:!0,value:"https://sso.tga.gov.tr"}),Object.defineProperty(this,d,{writable:!0,value:"https://preflight.tga.gov.tr/api/preflight/"}),Object.defineProperty(this,g,{writable:!0,value:"/"}),Object.defineProperty(this,v,{writable:!0,value:"token"}),Object.defineProperty(this,y,{writable:!0,value:""})}var e,r,n=t.prototype;return n.setupOriginSource=function(t){a(this,y)[y]=null==t?void 0:t.replaceAll("https://","").replaceAll("http://","")},n.setupSSOModeAndURL=function(t){a(this,f)[f]=t,a(this,p)[p]="development"===t?"https://tga-sso-frontend-dev.arge-tga.com":"https://sso.tga.gov.tr"},n.configure=function(t){a(this,c)[c]=t.apiURL||a(this,c)[c],a(this,s)[s]=t.appURL||a(this,s)[s],a(this,l)[l]=t.authenticateEndpoint||a(this,l)[l],a(this,h)[h]=t.userInfoEndpoint||a(this,h)[h],a(this,d)[d]=t.preflightURL||a(this,d)[d],a(this,g)[g]=t.redirectPath||a(this,g)[g],a(this,v)[v]=t.localStorageKey||a(this,v)[v],this.setupOriginSource(t.originSourceQuery||a(this,y)[y]),this.setupSSOModeAndURL(t.mode||a(this,f)[f])},e=t,(r=[{key:"appURL",get:function(){return a(this,s)[s]}},{key:"apiURL",get:function(){return a(this,c)[c]}},{key:"authenticateEndpoint",get:function(){return a(this,l)[l]}},{key:"userInfoEndpoint",get:function(){return a(this,h)[h]}},{key:"preflightURL",get:function(){return a(this,d)[d]}},{key:"ssoURL",get:function(){return a(this,p)[p]}},{key:"mode",get:function(){return a(this,f)[f]}},{key:"localStorageKey",get:function(){return a(this,v)[v]}},{key:"originSourceQuery",get:function(){return a(this,y)[y]}},{key:"redirectPath",get:function(){return a(this,g)[g]}}])&&function(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,"symbol"==typeof(o=function(t,e){if("object"!=typeof t||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key))?o:String(o),n)}var o}(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}()),b=function(t,e){try{var r=e.timeout,n=void 0===r?25e3:r,i=new AbortController,u=setTimeout(function(){return i.abort()},n);return Promise.resolve(fetch(t,o({},e,{signal:i.signal,headers:o({"Content-Type":"application/json"},e.headers)}))).then(function(t){return clearTimeout(u),t})}catch(t){return Promise.reject(t)}},w=function(o,i){void 0===o&&(o=!0);var u=t(!1),a=u[0],c=u[1],s=t(!1),l=s[0],h=s[1],f=t(null),p=f[0],d=f[1],g=e(),v=e(m.redirectPath),y=r(function(t,e){try{return Promise.resolve(b(""+m.apiURL+m.authenticateEndpoint,{signal:e,method:"POST",body:JSON.stringify({token:t})})).then(function(t){return Promise.resolve(t.json()).then(function(t){var e;return null!=t&&t.success?(localStorage.setItem(m.localStorageKey,JSON.stringify(null==t||null==(e=t.data)?void 0:e.token)),c(!0),null==t?void 0:t.data):P("autheticate !data?.success on :35")})})}catch(t){return Promise.reject(t)}},[]),w=r(function(t){try{return Promise.resolve(b(""+m.apiURL+m.userInfoEndpoint,{signal:t,method:"GET",headers:{Authorization:"Token "+JSON.parse(localStorage.getItem(m.localStorageKey))}})).then(function(t){return Promise.resolve(t.json()).then(function(t){return null!=t&&t.success?(v.current=window.location.pathname,c(!0),null==t?void 0:t.data):P("userInfo !data.success on :59")})})}catch(t){return Promise.reject(t)}},[]),S=r(function(){try{h(!0);var t=JSON.parse(localStorage.getItem(m.localStorageKey)),e=new URLSearchParams(window.location.search).get("token");return Promise.resolve(t||e?function(r,n){try{var o=function(r,n){try{var o=(g.current=new AbortController,Promise.resolve(t?w(g.current.signal):y(e,g.current.signal)).then(function(t){d(t),i&&i(t)}))}catch(t){return n()}return o&&o.then?o.then(void 0,n):o}(0,function(){return localStorage.removeItem(m.localStorageKey),P("handleAuth catch error on :82")})}catch(t){return n(!0,t)}return o&&o.then?o.then(n.bind(null,!1),n.bind(null,!0)):n(!1,o)}(0,function(t,e){if(h(!1),window.history.pushState({},document.title,v.current),t)throw e;return e}):P("handleAuth !token && !ssoToken on :71 "))}catch(t){return Promise.reject(t)}},[]);return n(function(){if(o)return S(),function(){var t;"production"===m.mode&&(null==(t=g.current)||t.abort())}},[o]),{isAuthed:a,isAuthing:l,user:p}};function P(t){t&&console.error(t);var e=window.location;window.open(m.ssoURL+"/login?url="+e.host+("localhost"===e.hostname?"&origin="+m.originSourceQuery:""),"_self")}var S=function(){var r=t(!1),o=r[0],i=r[1],u=t(!0),a=u[0],c=u[1],s=e();return n(function(){return function(){try{var t=function(t,e){try{var r=function(t,e){try{var r=(s.current=new AbortController,Promise.resolve(b(m.preflightURL,{signal:s.current.signal,method:"GET",timeout:25e3})).then(function(t){return Promise.resolve(t.json()).then(function(e){t.ok&&e.success&&i(!0)})}))}catch(t){return e()}return r&&r.then?r.then(void 0,e):r}(0,function(){i(!1)})}catch(t){return e(!0,t)}return r&&r.then?r.then(e.bind(null,!1),e.bind(null,!0)):e(!1,r)}(0,function(t,e){if(c(!1),t)throw e;return e});Promise.resolve(t&&t.then?t.then(function(){}):void 0)}catch(t){return Promise.reject(t)}}(),function(){var t;"production"===m.mode&&(null==(t=s.current)||t.abort())}},[]),{isPreflighting:a,isAllowed:o}};export{m as SSO,w as useAuth,S as usePreflight};
