!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react")):"function"==typeof define&&define.amd?define(["exports","react"],t):t((e||self).ssoClient={},e.react)}(this,function(e,t){function r(){return r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},r.apply(this,arguments)}var n=0;function o(e){return"__private_"+n+++"_"+e}function i(e,t){if(!Object.prototype.hasOwnProperty.call(e,t))throw new TypeError("attempted to use private field on non-instance");return e}var u=/*#__PURE__*/o("apiURL"),a=/*#__PURE__*/o("appURL"),s=/*#__PURE__*/o("authenticateEndpoint"),c=/*#__PURE__*/o("userInfoEndpoint"),l=/*#__PURE__*/o("mode"),h=/*#__PURE__*/o("ssoURL"),f=/*#__PURE__*/o("preflightURL"),p=/*#__PURE__*/o("redirectPath"),d=/*#__PURE__*/o("localStorageKey"),g=/*#__PURE__*/o("originSourceQuery"),v=new(/*#__PURE__*/function(){function e(){Object.defineProperty(this,u,{writable:!0,value:void 0}),Object.defineProperty(this,a,{writable:!0,value:window.location.origin}),Object.defineProperty(this,s,{writable:!0,value:"/api/authenticate/"}),Object.defineProperty(this,c,{writable:!0,value:"/api/user-info/"}),Object.defineProperty(this,l,{writable:!0,value:"production"}),Object.defineProperty(this,h,{writable:!0,value:"https://sso.tga.gov.tr"}),Object.defineProperty(this,f,{writable:!0,value:"https://preflight.tga.gov.tr/api/preflight/"}),Object.defineProperty(this,p,{writable:!0,value:"/"}),Object.defineProperty(this,d,{writable:!0,value:"token"}),Object.defineProperty(this,g,{writable:!0,value:""})}var t,r,n=e.prototype;return n.setupOriginSource=function(e){i(this,g)[g]=null==e?void 0:e.replaceAll("https://","").replaceAll("http://","")},n.setupSSOModeAndURL=function(e){i(this,l)[l]=e,i(this,h)[h]="development"===e?"https://tga-sso-frontend-dev.arge-tga.com":"https://sso.tga.gov.tr"},n.configure=function(e){i(this,u)[u]=e.apiURL||i(this,u)[u],i(this,a)[a]=e.appURL||i(this,a)[a],i(this,s)[s]=e.authenticateEndpoint||i(this,s)[s],i(this,c)[c]=e.userInfoEndpoint||i(this,c)[c],i(this,f)[f]=e.preflightURL||i(this,f)[f],i(this,p)[p]=e.redirectPath||i(this,p)[p],i(this,d)[d]=e.localStorageKey||i(this,d)[d],this.setupOriginSource(e.originSourceQuery||i(this,g)[g]),this.setupSSOModeAndURL(e.mode||i(this,l)[l])},t=e,(r=[{key:"appURL",get:function(){return i(this,a)[a]}},{key:"apiURL",get:function(){return i(this,u)[u]}},{key:"authenticateEndpoint",get:function(){return i(this,s)[s]}},{key:"userInfoEndpoint",get:function(){return i(this,c)[c]}},{key:"preflightURL",get:function(){return i(this,f)[f]}},{key:"ssoURL",get:function(){return i(this,h)[h]}},{key:"mode",get:function(){return i(this,l)[l]}},{key:"localStorageKey",get:function(){return i(this,d)[d]}},{key:"originSourceQuery",get:function(){return i(this,g)[g]}},{key:"redirectPath",get:function(){return i(this,p)[p]}}])&&function(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,"symbol"==typeof(o=function(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key))?o:String(o),n)}var o}(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}()),y=function(e,t){try{var n=t.timeout,o=void 0===n?25e3:n,i=new AbortController,u=setTimeout(function(){return i.abort()},o);return Promise.resolve(fetch(e,r({},t,{signal:i.signal,headers:r({"Content-Type":"application/json"},t.headers)}))).then(function(e){return clearTimeout(u),e})}catch(e){return Promise.reject(e)}};function b(e){e&&console.error(e);var t=window.location;window.open(v.ssoURL+"/login?url="+t.host+("localhost"===t.hostname?"&origin="+v.originSourceQuery:""),"_self")}e.SSO=v,e.useAuth=function(e,r){void 0===e&&(e=!0);var n=t.useState(!1),o=n[0],i=n[1],u=t.useState(!1),a=u[0],s=u[1],c=t.useState(null),l=c[0],h=c[1],f=t.useRef(),p=t.useRef(v.redirectPath),d=t.useCallback(function(e,t){try{return Promise.resolve(y(""+v.apiURL+v.authenticateEndpoint,{signal:t,method:"POST",body:JSON.stringify({token:e})})).then(function(e){return Promise.resolve(e.json()).then(function(e){var t;return null!=e&&e.success?(localStorage.setItem(v.localStorageKey,JSON.stringify(null==e||null==(t=e.data)?void 0:t.token)),i(!0),null==e?void 0:e.data):b("autheticate !data?.success on :35")})})}catch(e){return Promise.reject(e)}},[]),g=t.useCallback(function(e){try{return Promise.resolve(y(""+v.apiURL+v.userInfoEndpoint,{signal:e,method:"GET",headers:{Authorization:"Token "+JSON.parse(localStorage.getItem(v.localStorageKey))}})).then(function(e){return Promise.resolve(e.json()).then(function(e){return null!=e&&e.success?(p.current=window.location.pathname,i(!0),null==e?void 0:e.data):b("userInfo !data.success on :59")})})}catch(e){return Promise.reject(e)}},[]),m=t.useCallback(function(){try{s(!0);var e=JSON.parse(localStorage.getItem(v.localStorageKey)),t=new URLSearchParams(window.location.search).get("token");return Promise.resolve(e||t?function(n,o){try{var i=function(n,o){try{var i=(f.current=new AbortController,Promise.resolve(e?g(f.current.signal):d(t,f.current.signal)).then(function(e){h(e),r&&r(e)}))}catch(e){return o()}return i&&i.then?i.then(void 0,o):i}(0,function(){return localStorage.removeItem(v.localStorageKey),b("handleAuth catch error on :82")})}catch(e){return o(!0,e)}return i&&i.then?i.then(o.bind(null,!1),o.bind(null,!0)):o(!1,i)}(0,function(e,t){if(s(!1),window.history.pushState({},document.title,p.current),e)throw t;return t}):b("handleAuth !token && !ssoToken on :71 "))}catch(e){return Promise.reject(e)}},[]);return t.useEffect(function(){if(e)return m(),function(){var e;"production"===v.mode&&(null==(e=f.current)||e.abort())}},[e]),{isAuthed:o,isAuthing:a,user:l}},e.usePreflight=function(){var e=t.useState(!1),r=e[0],n=e[1],o=t.useState(!0),i=o[0],u=o[1],a=t.useRef();return t.useEffect(function(){return function(){try{var e=function(e,t){try{var r=function(e,t){try{var r=(a.current=new AbortController,Promise.resolve(y(v.preflightURL,{signal:a.current.signal,method:"GET",timeout:25e3})).then(function(e){return Promise.resolve(e.json()).then(function(t){e.ok&&t.success&&n(!0)})}))}catch(e){return t()}return r&&r.then?r.then(void 0,t):r}(0,function(){n(!1)})}catch(e){return t(!0,e)}return r&&r.then?r.then(t.bind(null,!1),t.bind(null,!0)):t(!1,r)}(0,function(e,t){if(u(!1),e)throw t;return t});Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(e){return Promise.reject(e)}}(),function(){var e;"production"===v.mode&&(null==(e=a.current)||e.abort())}},[]),{isPreflighting:i,isAllowed:r}}});