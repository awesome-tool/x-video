!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("video.js")):"function"==typeof define&&define.amd?define(["video.js"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).videojs)}(this,(function(e){"use strict";function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var i=t(e);function n(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,o(e,t)}function o(e,t){return o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},o(e,t)}var r=function(e){function t(){return e.apply(this,arguments)||this}return n(t,e),t.prototype.createEl=function(){return i.default.dom.createEl("div",{className:"vjs-live-notice",innerHTML:'\n        <div class="vjs-live-notice-spot vjs-icon-circle"></div>\n        Live\n      '})},t}(i.default.getComponent("Component"));i.default.registerComponent("LiveNotice",r);var s=function(e){function t(t,i){var n;return void 0===i&&(i={}),(n=e.call(this,t,i)||this).createLiveNative(t),n.start(t),n}n(t,e);var i=t.prototype;return i.createLiveNative=function(e){var t=e.findChild("DurationDisplay")[0],i=t.parent,n=t.index,o=new r(e);i.addChild(o,{},n),this.on("dispose",(function(){i.removeChild(o)}))},i.start=function(e){var t=this.onTimeUpdate.bind(this);e.addClass("vjs-live-streaming"),e.on("timeupdate",t),this.on("dispose",(function(){e.off("timeupdate",t),e.removeClass("vjs-live-streaming"),e.removeClass("vjs-live")}))},i.onTimeUpdate=function(){var e=this.player,t=e.duration();t===1/0||e.currentTime()>=t?e.addClass("vjs-live"):e.removeClass("vjs-live")},t}(i.default.getPlugin("plugin"));i.default.registerPlugin("live",s)}));