var G=this.G={};(function(){var e={};G.config=function(t,n){if(!arguments.length)return e;if(2===arguments.length)G.config.set(t,n);else{if(Array.isArray(t)||"string"==typeof t)return G.config.get(t);"object"==typeof t&&Object.keys(t).forEach(function(e){G.config.set(e,t[e])})}},G.config.set=function(t,n){var r=e;if(Array.isArray(t)){var i=t;t=i.pop(),i.forEach(function(e){r[e]||(r[e]={}),r=r[e]})}r[t]=n},G.config.get=function(t){if(!t)return e;var n=e;if(Array.isArray(t)){var r,i=t.length;for(r=0;i-2>=r;r++){if(!n[t[r]])return n[t[r]];n=n[t[r]]}t=t[i-1]}return n[t]}})(),G.log=function(e){G.config.debug&&"undefined"!=typeof console&&console.log&&console.log(e)},function(e){function t(e){var t=0;return parseFloat(e.replace(/\./g,function(){return 1==t++?"":"."}))}e.util={guid:function(e){return e=e||"",e+"_"+Date.now()+Math.random()}};var n=e.util;n.lang={isFunction:function(e){return"function"==typeof e},isString:function(e){return"string"==typeof e}},n.math={random:function(e,t){return parseInt(Math.random()*(t-e+1)+e,10)}};var r=/([^:\/])\/\/+/g,i=/.*(?=\/.*$)/;n.path={dirname:function(e){var t=e.match(i);return(t?t[0]:".")+"/"},isAbsolute:function(e){return e.indexOf("://")>0||0===e.indexOf("//")},isRelative:function(e){return 0===e.indexOf("./")||0===e.indexOf("../")},realpath:function(e){if(r.lastIndex=0,r.test(e)&&(e=e.replace(r,"$1/")),-1===e.indexOf("."))return e;for(var t,n=e.split("/"),i=[],o=0;n.length>o;o++)if(t=n[o],".."===t){if(0===i.length)throw Error("The path is invalid: "+e);i.pop()}else"."!==t&&i.push(t);return i.join("/")}};var o=n.ua={ie:0,opera:0,gecko:0,webkit:0,chrome:0,mobile:null,air:0,ipad:0,iphone:0,ipod:0,ios:null,android:0,os:null},a=window.navigator.userAgent;/windows|win32/i.test(a)?o.os="windows":/macintosh/i.test(a)?o.os="macintosh":/rhino/i.test(a)&&(o.os="rhino"),/KHTML/.test(a)&&(o.webkit=!0);var u=a.match(/AppleWebKit\/([^\s]*)/);u&&u[1]&&(o.webkit=t(u[1]),/ Mobile\//.test(a)?(o.mobile="Apple",u=a.match(/OS ([^\s]*)/),u&&u[1]&&(u=t(u[1].replace("_","."))),o.ipad="iPad"===navigator.platform?u:0,o.ipod="iPod"===navigator.platform?u:0,o.iphone="iPhone"===navigator.platform?u:0,o.ios=o.ipad||o.iphone||o.ipod):(u=a.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/),u&&(o.mobile=u[0]),/ Android/.test(o)&&(o.mobile="Android",u=a.match(/Android ([^\s]*);/),u&&u[1]&&(o.android=t(u[1])))),u=a.match(/Chrome\/([^\s]*)/),u&&u[1]?o.chrome=t(u[1]):(u=a.match(/AdobeAIR\/([^\s]*)/),u&&(o.air=u[0]))),o.webkit||(u=a.match(/Opera[\s\/]([^\s]*)/),u&&u[1]?(o.opera=t(u[1]),u=a.match(/Opera Mini[^;]*/),u&&(o.mobile=u[0])):(u=a.match(/MSIE\s([^;]*)/),u&&u[1]?o.ie=t(u[1]):(u=a.match(/Gecko\/([^\s]*)/),u&&(o.gecko=1,u=a.match(/rv:([^\s\)]*)/),u&&u[1]&&(o.gecko=t(u[1]))))))}(G),function(){G.Deferred=function(){function e(e){for(;(cb=e.shift())||(cb=o.always.shift());)setTimeout(function(e){return function(){e.apply({},a)}}(cb),0)}var t="pending",n="done",r="fail",i=t,o={done:[],fail:[],always:[]},a=[],u={},s={done:function(e){return i===n&&setTimeout(function(){e.apply(u,a)},0),i===t&&o.done.push(e),s},fail:function(e){return i===r&&setTimeout(function(){e.apply(u,a)},0),i===t&&o.fail.push(e),s},always:function(e){return i!==t?(setTimeout(function(){e.apply(u,a)},0),void 0):(o.always.push(e),s)},resolve:function(){return i!==t?s:(a=[].slice.call(arguments),i=n,e(o.done),s)},reject:function(){return i!==t?s:(a=[].slice.call(arguments),i=r,e(o.fail),s)},state:function(){return i},promise:function(){var e={};return Object.keys(s).forEach(function(t){"resolve"!==t&&"reject"!==t&&(e[t]=s[t])}),e}};return s},G.when=function(e){Array.isArray(e)||(e=[].slice.call(arguments));var t=G.Deferred(),n=e.length,r=0;return n?(e.forEach(function(e){e.fail(function(){t.reject()}).done(function(){++r===n&&t.resolve()})}),t.promise()):t.resolve().promise()}}(G),function(e,t,n){function r(e,t){var r=o(n.guid("module")),i=r.id;return r.isAnonymous=!0,e=c(e,this.context),r.dependencies=e,r.factory=t,o.wait(r),o.defers[i].promise()}function i(e){function i(e){if(e=i.resolve(e),!o.cache[e]||o.cache[e].status!==d.COMPILED)throw Error("This module is not found:"+e);return o.cache[e].exports}return e=e||window.location.href,i.resolve=function(r){if(g.alias[r])return g.alias[r];if(o.cache[r])return r;if(n.path.isAbsolute(r))return r;if(n.path.isRelative(r)){r=n.path.realpath(n.path.dirname(e)+r);var i=t.config("baseUrl");0===r.indexOf(i)&&(r=r.replace(i,""))}return/(\.[a-z]*$)|([\?;].*)$/.test(r)?r:r+".js"},i.async=function(t,n){return r.call({context:e},t,n)},i.cache=o.cache,i}function o(e){return o.cache[e]||(o.cache[e]={id:e,status:0,dependencies:[]},o.defers[e]=t.Deferred()),o.cache[e]}function a(e,t){var n=e.id,r=t.combine[n];if(r){if(t.debug)return m(n,r);r=r.map(function(e){return o(e)}),r.forEach(function(e){e.status<d.FETCHING&&(e.status=d.FETCHING)})}u(e,t)}function u(e){var n=p.createElement("script"),r=!1,i=setTimeout(function(){h.removeChild(n),o.fail(e,"Load timeout")},3e4);n.setAttribute("type","text/javascript"),n.setAttribute("charset","utf-8"),n.setAttribute("src",e.url),n.setAttribute("async",!0),n.onload=n.onreadystatechange=function(){r||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(r=!0,clearTimeout(i),n.onload=n.onreadystatechange=null,e.status===d.FETCHING&&(e.status=d.FETCHED),e.status>0&&e.status<d.SAVED&&(t.log(e.id+" is not a module"),o.ready(e)))},n.onerror=function(){clearTimeout(i),h.removeChild(n),o.fail(e,Error("Load Fail"))},e.status=d.FETCHING,h.appendChild(n)}function s(e){function t(){clearTimeout(r),e.status===d.FETCHING&&(e.status=d.FETCHED),o.ready(e)}function n(e,t){var r;if(v)e.sheet&&(r=!0);else if(e.sheet)try{e.sheet.cssRules&&(r=!0)}catch(i){"NS_ERROR_DOM_SECURITY_ERR"===i.name&&(r=!0)}setTimeout(function(){r?t():n(e,t)},1)}var r,i=p.createElement("link");return i.setAttribute("type","text/css"),i.setAttribute("href",e.url),i.setAttribute("rel","stylesheet"),v||y?setTimeout(function(){n(i,t)},0):(i.onload=t,i.onerror=function(){clearTimeout(r),h.removeChild(i),o.fail(e,Error("Load Fail"))}),e.status=d.FETCHING,h.appendChild(i),r=setTimeout(function(){h.removeChild(i),o.fail(e,Error("Load timeout"))},3e4),i}function c(e,t){var n=i(t),r=e.map(function(e){return o(n.resolve(e))}),a=r.filter(function(e){return e.status<d.FETCHING});return a.forEach(o.fetch),r}function f(e){var r=e;if(n.path.isAbsolute(e))return e;if(g.version){var i=Date.now();if(g.version[e]?i=g.version[e]:i-=i%g.cacheExpire,g.versionTemplate){var o=/(\.(js|css|html?|swf|gif|png|jpe?g))$/i.exec(e);o=o?".js":o[0],r=g.versionTemplate({version:i,url:{href:e,ext:o}})}else r=e.replace(/(\.(js|css|html?|swf|gif|png|jpe?g))$/i,"-"+i+"$1")}return n.path.realpath(t.config("baseUrl")+r)}function l(e){var t=e.split(".");return t.length>1?"."+t[t.length-1]:void 0}var d={ERROR:-2,FAILED:-1,FETCHING:1,FETCHED:2,SAVED:3,READY:4,COMPILING:5,PAUSE:6,COMPILED:7},p=document,h=p.head||p.getElementsByTagName("head")[0]||p.documentElement,g=t.config();t.use=function(e,t){return r.call({context:window.location.href},e,t)};var m=e.define=function(e,t,n){if("string"!=typeof e)throw"ID must be a string";return n||(n=t,t=[]),o.save(e,t,n)};m.amd={},o.cache={},o.defers={},o.queue=[],o.wait=function(e){var n=e.dependencies.map(function(e){return o.defers[e.id]});t.when(n).done(function(){o.ready(e)}).fail(function(t){o.fail(e,Error(t))})},o.ready=function(e){var t,n;if(e.status=d.READY,"function"==typeof e.factory){e.status=d.COMPILING;try{e.isAnonymous?(t=e.dependencies.map(function(e){return e.exports}),e.exports=e.factory.apply(window,t)):(e.exports={},e.async=function(){return e.status=d.PAUSE,function(){e.status=d.COMPILED,o.defers[e.id].resolve(e.exports)}},o.defers[e.id].done(function(){delete e.async}),n=e.factory.call(window,i(e.id),e.exports,e),n&&(e.exports=n))}catch(r){throw e.status=d.ERROR,o.fail(e,r),r}}else e.exports=e.factory;e.status!==d.PAUSE&&(e.status=d.COMPILED,o.defers[e.id].resolve(e.exports))},o.fail=function(e,n){throw t.log("MOD: "+e.id),t.log("DEP: "+e.dependencies.map(function(e){return e.id})),t.log("ERR: "+n.message),o.defers[e.id].reject(),n},o.fetch=function(e){var t=e.id;e.url=f(t);var n=l(e.url)||".js",r=o.Plugin.Loaders[n]||o.Plugin.Loaders[".js"];r(e,g)},o.save=function(e,t,n){var r=o(e);t=c(t,e),r.dependencies=t,r.factory=n,r.status=d.SAVED,o.wait(r)},o.remove=function(e){var t=o(e);delete o.cache[t.id],delete o.defers[t.id]},o.Plugin={Loaders:{".js":u,".css":s,".cmb.js":a}};var v=n.ua.webkit&&536>n.ua.webkit,y=window.navigator.userAgent.indexOf("Firefox")>0&&!("onload"in document.createElement("link"));t.Module={cache:o.cache,queue:o.queue,remove:o.remove},m("Promise",[],function(){return{when:t.when,defer:t.Deferred}}),m("util",[],t.util),m("config",[],t.config()),m("require",[],function(){return i(window.location.href)})}(window,G,G.util);