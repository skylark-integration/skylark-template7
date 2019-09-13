/**
 * skylark-parsers-templating - The skylark template engine library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(e,r){var n=r.define,i=r.require,a="function"==typeof n&&n.amd,l=!a&&"undefined"!=typeof exports;if(!a&&!n){var s={};n=r.define=function(e,t,r){"function"==typeof r?(s[e]={factory:r,deps:t.map(function(t){return function(e,t){if("."!==e[0])return e;var r=t.split("/"),n=e.split("/");r.pop();for(var i=0;i<n.length;i++)"."!=n[i]&&(".."==n[i]?r.pop():r.push(n[i]));return r.join("/")}(t,e)}),resolved:!1,exports:null},i(e)):s[e]={factory:null,resolved:!0,exports:r}},i=r.require=function(e){if(!s.hasOwnProperty(e))throw new Error("Module "+e+" has not been defined");var t=s[e];if(!t.resolved){var n=[];t.deps.forEach(function(e){n.push(i(e))}),t.exports=t.factory.apply(r,n)||null,t.resolved=!0}return t.exports}}if(!n)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(e,r){e("skylark-parsers-templating/templating",["skylark-langx/skylark"],function(e){return e.attach("scripts.templating",{helpers:{}})}),e("skylark-parsers-templating/helpers/each",["skylark-langx/types","../templating"],function(e,t){return t.helpers.each=function(t,r){var n="",i=0;if(e.isFunction(t)&&(t=t.call(this)),e.isArray(t)){for(r.hash.reverse&&(t=t.reverse()),i=0;i<t.length;i++)t[i].templater=this.templater,n+=r.fn(t[i],{first:0===i,last:i===t.length-1,index:i});r.hash.reverse&&(t=t.reverse())}else for(var a in t)i++,t[a].templater=this.templater,n+=r.fn(t[a],{key:a});return i>0?n:r.inverse(this)}}),e("skylark-parsers-templating/helpers/if",["skylark-langx/types","../templating"],function(e,t){return t.helpers.if=function(t,r){return e.isFunction(t)&&(t=t.call(this)),t?r.fn(this,r.data):r.inverse(this,r.data)}}),e("skylark-parsers-templating/helpers/join",["skylark-langx/types","../templating"],function(e,t){return t.helpers.join=function(t,r){return e.isFunction(t)&&(t=t.call(this)),t.join(r.hash.delimiter)}}),e("skylark-parsers-templating/helpers/js",["skylark-langx/types","../templating"],function(e,t){return t.helpers.js=function(e,t){var r;return r=e.indexOf("return")>=0?"(function(){"+e+"})":"(function(){return ("+e+")})",eval.call(this,r).call(this)}}),e("skylark-parsers-templating/helpers/js_compare",["skylark-langx/types","../templating"],function(e,t){return t.helpers.js_compare=function(e,t){var r;r=e.indexOf("return")>=0?"(function(){"+e+"})":"(function(){return ("+e+")})";var n=eval.call(this,r).call(this);return n?t.fn(this,t.data):t.inverse(this,t.data)}}),e("skylark-parsers-templating/helpers/partial",["skylark-langx/types","../templating"],function(e,t){return t.helpers.partial=function(e,t){const r=this,n=this.templater._partials[e];return!n||n&&!n.template?"":(n.compiled||(n.compiled=this.templater.compile(n.template)),Object.keys(t.hash).forEach(function(e){r[e]=t.hash[e]}),n.compiled(r,t.data,t.root))}}),e("skylark-parsers-templating/helpers/unless",["skylark-langx/types","../templating"],function(e,t){return t.helpers.unless=function(t,r){return e.isFunction(t)&&(t=t.call(this)),t?r.inverse(this,r.data):r.fn(this,r.data)}}),e("skylark-parsers-templating/helpers/with",["skylark-langx/types","../templating"],function(e,t){return t.helpers.with=function(t,r){return e.isFunction(t)&&(t=t.call(this)),r.fn(t)}}),e("skylark-parsers-templating/Templater",["skylark-langx/types","skylark-langx/objects","skylark-langx/Evented","./templating","./helpers/each","./helpers/if","./helpers/join","./helpers/js","./helpers/js_compare","./helpers/partial","./helpers/unless","./helpers/with"],function(e,r,n,i,a,l,s,p,o,f,h,u){"use strict";function c(e){var t,r,n,i=e.replace(/[{}#}]/g,"").split(" "),a=[];for(r=0;r<i.length;r++){var l=i[r];if(0===r)a.push(l);else if(0===l.indexOf('"'))if(2===l.match(/"/g).length)a.push(l);else{for(t=0,n=r+1;n<i.length;n++)if(l+=" "+i[n],i[n].indexOf('"')>=0){t=n,a.push(l);break}t&&(r=t)}else if(l.indexOf("=")>0){var s=l.split("="),p=s[0],o=s[1];if(2!==o.match(/"/g).length){for(t=0,n=r+1;n<i.length;n++)if(o+=" "+i[n],i[n].indexOf('"')>=0){t=n;break}t&&(r=t)}var f=[p,o.replace(/"/g,"")];a.push(f)}else a.push(l)}return a}var g=n.inherit({klassName:"Templater",init:function(e,t){this._options=e||{},this._helpers=r.mixin({each:a,if:l,join:s,js:p,js_compare:o,partial:f,unless:h,with:u},t),this._partials={},this._cache={}},compile:function(r){var n=this;function i(e,t){return e.content?p(e.content,t):function(){return""}}function a(e,t){return e.inverseContent?p(e.inverseContent,t):function(){return""}}function l(e,t){var r,n,i=0;if(0===e.indexOf("../")){i=e.split("../").length-1;var a=t.split("_")[1]-i;t="ctx_"+(a>=1?a:1),n=e.split("../")[i].split(".")}else 0===e.indexOf("@global")?(t="$.Template7.global",n=e.split("@global.")[1].split(".")):0===e.indexOf("@root")?(t="ctx_1",n=e.split("@root.")[1].split(".")):n=e.split(".");r=t;for(var l=0;l<n.length;l++){var s=n[l];0===s.indexOf("@")?l>0?r+="[(data && data."+s.replace("@","")+")]":r="(data && data."+e.replace("@","")+")":isFinite(s)?r+="["+s+"]":0===s.indexOf("this")?r=s.replace("this",t):r+="."+s}return r}function s(e,t){for(var r=[],n=0;n<e.length;n++)0===e[n].indexOf('"')?r.push(e[n]):r.push(l(e[n],t));return r.join(", ")}function p(r,p){if(p=p||1,"string"!=typeof(r=r||t.template))throw new Error("Template7: Template must be a string");var o=function(t){var r,n,i=[];if(!t)return[];var a=t.split(/({{[^{^}]*}})/);for(r=0;r<a.length;r++){var l=a[r];if(""!==l)if(l.indexOf("{{")<0)i.push({type:"plain",content:l});else{if(l.indexOf("{/")>=0)continue;if(l.indexOf("{#")<0&&l.indexOf(" ")<0&&l.indexOf("else")<0){i.push({type:"variable",contextName:l.replace(/[{}]/g,"")});continue}var s=c(l),p=s[0],o=">"===p,f=[],h={};for(n=1;n<s.length;n++){var u=s[n];e.isArray(u)?h[u[0]]="false"!==u[1]&&u[1]:f.push(u)}if(l.indexOf("{#")>=0){var g,m="",d="",y=0,v=!1,k=!1,x=0;for(n=r+1;n<a.length;n++)if(a[n].indexOf("{{#")>=0&&x++,a[n].indexOf("{{/")>=0&&x--,a[n].indexOf("{{#"+p)>=0)m+=a[n],k&&(d+=a[n]),y++;else if(a[n].indexOf("{{/"+p)>=0){if(!(y>0)){g=n,v=!0;break}y--,m+=a[n],k&&(d+=a[n])}else a[n].indexOf("else")>=0&&0===x?k=!0:(k||(m+=a[n]),k&&(d+=a[n]));v&&(g&&(r=g),i.push({type:"helper",helperName:p,contextName:f,content:m,inverseContent:d,hash:h}))}else l.indexOf(" ")>0&&(o&&(p="partial",f[0]&&(0===f[0].indexOf("[")?f[0]=f[0].replace(/[[\]]/g,""):f[0]=f[0].replace(/"|'/g,""))),i.push({type:"helper",helperName:p,contextName:f,hash:h}))}}return i}(r);if(0===o.length)return function(){return""};var f,h="ctx_"+p,u="(function ("+h+", data) {\n";for(1===p&&(u+=h+".templater = this\n",u+="function isArray(arr){return Object.prototype.toString.apply(arr) === '[object Array]';}\n",u+="function isFunction(func){return (typeof func === 'function');}\n",u+='function c(val, ctx) {if (typeof val !== "undefined") {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n'),u+="var r = '';\n",f=0;f<o.length;f++){var g,m,d=o[f];if("plain"!==d.type){if("variable"===d.type&&(g=l(d.contextName,h),u+="r += c("+g+", "+h+");"),"helper"===d.type)if(d.helperName in n._helpers)m=s(d.contextName,h),u+="r += "+h+".templater._helpers."+d.helperName+".call("+h+", "+(m&&m+", ")+"{hash:"+JSON.stringify(d.hash)+", data: data || {}, fn: "+i(d,p+1)+", inverse: "+a(d,p+1)+", root: ctx_1});";else{if(d.contextName.length>0)throw new Error('Missing helper: "'+d.helperName+'"');g=l(d.helperName,h),u+="if ("+g+") {",u+="if (isArray("+g+")) {",u+="r += "+h+".templater._helpers.each.call("+h+", "+g+", {hash:"+JSON.stringify(d.hash)+", data: data || {}, fn: "+i(d,p+1)+", inverse: "+a(d,p+1)+", root: ctx_1});",u+="}else {",u+="r += "+h+".templater._helpers.with.call("+h+", "+g+", {hash:"+JSON.stringify(d.hash)+", data: data || {}, fn: "+i(d,p+1)+", inverse: "+a(d,p+1)+", root: ctx_1});",u+="}}"}}else u+="r +='"+d.content.replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/'/g,"\\'")+"';"}return u+="\nreturn r;})",eval.call(window,u)}var o=this._cache[r];if(!o){var f=p(r);o=this._cache[r]=function(){return f.apply(n,arguments)}}return o},render:function(e,t){var r=this.compile(e);return r(t)},registerHelper:function(e,t){this._helpers[e]=t},unregisterHelper:function(e){this._helpers[e]=void 0,delete this._helpers[e]},registerPartial:function(e,t){this._partials[e]={template:t}},unregisterPartial:function(e){this._partials[e]&&(this._partials[e]=void 0,delete this._partials[e])}}),m=g.defaultTemplater=new g;return["registerHelper","registerPartial","unregisterHelper","unregisterPartial","render","compile"].forEach(function(e){i[e]=function(){return g.prototype[e].apply(m,arguments)}}),i.Templater=g}),e("skylark-parsers-templating/main",["./templating","./Templater"],function(e){return e}),e("skylark-parsers-templating",["skylark-parsers-templating/main"],function(e){return e})}(n),!a){var p=i("skylark-langx/skylark");l?module.exports=p:r.skylarkjs=p}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-parsers-templating.js.map