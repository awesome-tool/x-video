import e from"video.js";function t(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,i(e,t)}function i(e,t){return i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},i(e,t)}var n=function(i){function n(){return i.apply(this,arguments)||this}return t(n,i),n.prototype.createEl=function(){return e.dom.createEl("div",{className:"vjs-live-notice",innerHTML:'\n        <div class="vjs-live-notice-spot vjs-icon-circle"></div>\n        Live\n      '})},n}(e.getComponent("Component"));e.registerComponent("LiveNotice",n);var o=function(e){function i(t,i){var n;return void 0===i&&(i={}),(n=e.call(this,t,i)||this).createLiveNative(t),n.start(t),n}t(i,e);var o=i.prototype;return o.createLiveNative=function(e){var t=e.findChild("DurationDisplay")[0],i=t.parent,o=t.index,r=new n(e);i.addChild(r,{},o),this.on("dispose",(function(){i.removeChild(r)}))},o.start=function(e){var t=this.onTimeUpdate.bind(this);e.addClass("vjs-live-streaming"),e.on("timeupdate",t),this.on("dispose",(function(){e.off("timeupdate",t),e.removeClass("vjs-live-streaming"),e.removeClass("vjs-live")}))},o.onTimeUpdate=function(){var e=this.player,t=e.duration();t===1/0||e.currentTime()>=t?e.addClass("vjs-live"):e.removeClass("vjs-live")},i}(e.getPlugin("plugin"));e.registerPlugin("live",o);
