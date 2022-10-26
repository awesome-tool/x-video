!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(require("video.js")):"function"==typeof define&&define.amd?define(["video.js"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).videojs)}(this,(function(t){"use strict";function e(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var n=e(t);function i(){return i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},i.apply(this,arguments)}function o(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,r(t,e)}function r(t,e){return r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},r(t,e)}var u=function(){function t(t,e){this.values=t.slice(0),this.index_=e||0,this.loop_=!0}var e=t.prototype;return e.index=function(t){if(void 0===t)return this.index_;this.index_=Math.max(0,Math.min(t,this.values.length-1))},e.loop=function(t){if(void 0===t)return this.loop_;this.loop_=!!t},e.calc=function(t){var e=this.index_+t,n=this.values.length;return this.loop_?(n+e)%n:Math.max(0,Math.min(e,n-1))},e.step=function(t){return this.index_=this.calc(t),this.values[this.index_]},e.current=function(){return this.values[this.index_]},e.next=function(){return this.step(1)},e.prev=function(){return this.step(-1)},e.ended=function(){return this.index_===this.values.length-1},t}(),a=function(t){function e(e,n){var o;return(o=t.call(this,e,i({},n,{name:"QualitySettingItem",label:"Quality",icon:"vjs-icon-hd",entries:e.options_.quality||[]}))||this).addClass("vjs-setting-quality"),e.on("quality",(function(t,n){var i=n.map((function(t,e){return t.value=e,t}));o.setEntries(i,e.qualities.index()),o.show()})),e.on("qualitychange",(function(t,e){var n=e.index;o.select(n),o.update(n)})),o}return o(e,t),e.prototype.onChange=function(){for(var e,n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];(e=t.prototype.onChange).call.apply(e,[this].concat(i)),this.player_.qualities.pick(this.selected.value)},e}(n.default.getComponent("SettingOptionItem"));n.default.getComponent("SettingMenuButton").prototype.options_.entries.push("QualitySettingItem"),n.default.registerComponent("QualitySettingItem",a);var s=function(t){function e(e,n,i){var o;return void 0===i&&(i=0),(o=t.call(this,n,i)||this).player_=e,o.pick(i,!0),o}return o(e,t),e.prototype.pick=function(t,e){void 0!==t&&this.index(t);var n=this.player_,o=this.current(),r=n.ended()?0:n.currentTime();!e&&r&&n.one("loadedmetadata",(function(){n.one("canplaythrough",(function(){n.currentTime(r)})),n.play()})),n.src(o.sources),n.trigger("qualitychange",i({},o,{index:this.index()}))},e}(u);n.default.registerPlugin("setQualities",(function(t,e){var n=this.player_;n.qualities=new s(n,t,e),n.trigger("quality",t)})),n.default.hook("setup",(function(t){var e=t.options_.qualities;if(e&&e.length){var n=e.findIndex((function(t){return t.default}));t.setQualities(e,n)}}))}));