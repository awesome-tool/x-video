import t from"video.js";function n(){return n=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},n.apply(this,arguments)}function e(t,n){t.prototype=Object.create(n.prototype),t.prototype.constructor=t,i(t,n)}function i(t,n){return i=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t},i(t,n)}var r=function(){function t(t,n){this.values=t.slice(0),this.index_=n||0,this.loop_=!0}var n=t.prototype;return n.index=function(t){if(void 0===t)return this.index_;this.index_=Math.max(0,Math.min(t,this.values.length-1))},n.loop=function(t){if(void 0===t)return this.loop_;this.loop_=!!t},n.calc=function(t){var n=this.index_+t,e=this.values.length;return this.loop_?(e+n)%e:Math.max(0,Math.min(n,e-1))},n.step=function(t){return this.index_=this.calc(t),this.values[this.index_]},n.current=function(){return this.values[this.index_]},n.next=function(){return this.step(1)},n.prev=function(){return this.step(-1)},n.ended=function(){return this.index_===this.values.length-1},t}(),o=function(t){function i(e,i){var r;return(r=t.call(this,e,n({},i,{name:"QualitySettingItem",label:"Quality",icon:"vjs-icon-hd",entries:e.options_.quality||[]}))||this).addClass("vjs-setting-quality"),e.on("quality",(function(t,n){var i=n.map((function(t,n){return t.value=n,t}));r.setEntries(i,e.qualities.index()),r.show()})),e.on("qualitychange",(function(t,n){var e=n.index;r.select(e),r.update(e)})),r}return e(i,t),i.prototype.onChange=function(){for(var n,e=arguments.length,i=new Array(e),r=0;r<e;r++)i[r]=arguments[r];(n=t.prototype.onChange).call.apply(n,[this].concat(i)),this.player_.qualities.pick(this.selected.value)},i}(t.getComponent("SettingOptionItem"));t.getComponent("SettingMenuButton").prototype.options_.entries.push("QualitySettingItem"),t.registerComponent("QualitySettingItem",o);var u=function(t){function i(n,e,i){var r;return void 0===i&&(i=0),(r=t.call(this,e,i)||this).player_=n,r.pick(i,!0),r}return e(i,t),i.prototype.pick=function(t,e){void 0!==t&&this.index(t);var i=this.player_,r=this.current(),o=i.ended()?0:i.currentTime();!e&&o&&i.one("loadedmetadata",(function(){i.one("canplaythrough",(function(){i.currentTime(o)})),i.play()})),i.src(r.sources),i.trigger("qualitychange",n({},r,{index:this.index()}))},i}(r);t.registerPlugin("setQualities",(function(t,n){var e=this.player_;e.qualities=new u(e,t,n),e.trigger("quality",t)})),t.hook("setup",(function(t){var n=t.options_.qualities;if(n&&n.length){var e=n.findIndex((function(t){return t.default}));t.setQualities(n,e)}}));