import t from"video.js";function e(){return e=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},e.apply(this,arguments)}function n(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,i(t,e)}function i(t,e){return i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},i(t,e)}function o(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var a=function(){function t(t,e){this.values=t.slice(0),this.index_=e||0,this.loop_=!0}var e=t.prototype;return e.index=function(t){if(void 0===t)return this.index_;this.index_=Math.max(0,Math.min(t,this.values.length-1))},e.loop=function(t){if(void 0===t)return this.loop_;this.loop_=!!t},e.calc=function(t){var e=this.index_+t,n=this.values.length;return this.loop_?(n+e)%n:Math.max(0,Math.min(e,n-1))},e.step=function(t){return this.index_=this.calc(t),this.values[this.index_]},e.current=function(){return this.values[this.index_]},e.next=function(){return this.step(1)},e.prev=function(){return this.step(-1)},e.ended=function(){return this.index_===this.values.length-1},t}(),r=function(t){function e(){return t.apply(this,arguments)||this}n(e,t);var i=e.prototype;return i.buildCSSClass=function(){return"vjs-playnext-spinner"},i.createEl=function(){var e=t.prototype.createEl.call(this,"div",{innerHTML:'\n        <div class="vjs-icon-placeholder vjs-icon-play"></div>\n        <svg width="60" height="60" viewbox="0 0 60 60">\n          <circle cx="30" cy="30" r="30"/>\n          <path class="vjs-playnext-spinner-border" fill="#FFF" transform="translate(30, 30)"/>\n          <circle id="donut" cx="30" cy="30" r="27"/>\n        </svg>\n      '});return this.path=e.querySelector("path"),e},i.handleClick=function(){this.player_.getChild("BeforePlayNextLayer").timeup()},e}(t.getComponent("ClickableComponent"));r.prototype.controlText_="PlayNext",t.registerComponent("PlayNextSpinner",r);var l=function(e){function i(t,n){var i;(i=e.call(this,t,n)||this).addChild("PlayNextSpinner",{},2),i.addChild("CancelPlayNextEl",{text:"&#10005;",className:"vjs-cancel-playnext-cross"},{},2),i.addChild("CancelPlayNextEl",{text:"Cancel",className:"vjs-cancel-playnext-button"},{},2),i.originPoster=t.poster()||t.playlist.current().poster,t.poster(i.getNext().poster);var a=i.dispose.bind(o(i)),r=["timeupdate","loadstart"];return t.one(r,a),i.on("dispose",(function(){t.off(r,a),t.removeClass("vjs-play-next-ready")})),i.countdown(t.options_.playNextCountDown),t.addClass("vjs-play-next-ready"),i}n(i,e);var a=i.prototype;return a.getNext=function(){var t=this.player_.playlist;return this.next=t.values[t.calc(1)],this.next},a.createEl=function(){var e=this.getNext().title,n=t.dom.createEl("div",{className:"vjs-before-playnext"});return this.contentEl_=t.dom.createEl("div",{className:"vjs-before-playnext-content",innerHTML:'\n        <div class="vjs-upnext-text">'+this.localize("Up Next")+'</div>\n        <div class="vjs-playnext-title">\n            <div>'+e+"</div>\n        </div>\n      "}),n.appendChild(this.contentEl_),n},a.countdown=function(t){if(void 0===t&&(t=10),0==t)return this.timeup(),!1;var e=this,n=0,i=Math.PI,o=t;o=o/360*1e3,function t(){n++;var a=(n%=360)*i/180,r=125*Math.sin(a),l=-125*Math.cos(a),s="M 0 0 v -125 A 125 125 1 "+(n>180?1:0)+" 1 "+r+" "+l+" z";e.getChild("PlayNextSpinner").path.setAttribute("d",s),0===n?e.timeup():e.timer=setTimeout(t,o)}()},a.timeup=function(){this.player_.playlist.next(),this.player_.playlist.play(),this.dispose()},a.cancel=function(){return this.player_.poster(this.originPoster),this},a.dispose=function(){clearTimeout(this.timer),this.player_.removeChild(this),e.prototype.dispose.call(this)},i}(t.getComponent("Component"));t.registerPlugin("playNext",(function(){var t=this.player_,e=t.playlist,n=e.loop()||!e.ended();if(e.autoPlayNext()&&n){var i=t.getChild("ControlBar"),o=t.children().indexOf(i)-1;t.addChild("BeforePlayNextLayer",{},o)}else t.poster(e.current().poster||"")})),t.registerComponent("BeforePlayNextLayer",l);var s=t.getComponent("SettingMenuButton"),p=function(t){function e(e){var n;return(n=t.call(this,e,{name:"ToggleAutoPlayNext",label:"Autoplay",icon:"vjs-icon-next-item"})||this).updateVisibility(),n.addClass("vjs-setting-autoplay"),e.on("playlist",(function(){n.updateVisibility(),n.update(e.playlist.autoPlayNext_)})),e.on("autoplaynext",(function(t,e){n.update(e)})),n}n(e,t);var i=e.prototype;return i.updateVisibility=function(){var t=this.player_.playlist;t&&t.values.length>1?this.show():this.hide()},i.update=function(e){t.prototype.update.call(this,e),this.player_.playlist.autoPlayNext_!==this.active&&this.player_.playlist.autoPlayNext(this.active)},e}(t.getComponent("SettingOnOffItem"));t.registerComponent("ToggleAutoPlayNext",p),s.prototype.options_.entries.splice(0,0,"ToggleAutoPlayNext");var c=function(t){function e(e,n){var i;return(i=t.call(this,e,n)||this).updateVisibility(),i.controlText(n.controlText),e.on("playlist",i.updateVisibility.bind(o(i))),i}n(e,t);var i=e.prototype;return i.buildCSSClass=function(){return this.options_.className+" "+t.prototype.buildCSSClass.call(this)},i.updateVisibility=function(){var t=this.player_.playlist;t&&t.values.length>1?this.show():this.hide()},i.createEl=function(e,n,i){return t.prototype.createEl.call(this,e,{innerHTML:'<span aria-hidden="true" class="vjs-icon-placeholder '+this.options_.icon+'"></span>'},i)},i.handleClick=function(){var t=this.options_.controlText.toLowerCase();this.player_.playlist[t](),this.player_.playlist.play()},e}(t.getComponent("Button")),u=t.getComponent("ControlBar").prototype.options_.children,h=u.indexOf("PlayToggle");-1!==h&&(u.splice(0,0,{name:"PrevNextButton",className:"vjs-prev-control",icon:"vjs-icon-previous-item",controlText:"Prev"}),u.splice(h+2,0,{name:"PrevNextButton",className:"vjs-next-control",icon:"vjs-icon-next-item",controlText:"Next"})),t.registerComponent("PrevNextButton",c);var y=function(t){function e(e,n){var i;return(i=t.call(this,e,n)||this).el_.querySelector(".vjs-icon-placeholder").innerHTML=i.localize(n.text),i}n(e,t);var i=e.prototype;return i.buildCSSClass=function(){return"vjs-cancel-playnext "+this.options_.className},i.handleClick=function(){this.player_.getChild("BeforePlayNextLayer").cancel().dispose()},e}(t.getComponent("ClickableComponent"));y.prototype.controlText_="Cancel PlayNext",t.registerComponent("CancelPlayNextEl",y);var d=function(t){function i(e,n,i){var o;return void 0===i&&(i=0),(o=t.call(this,n,i)||this).player_=e,o.loadPoster_=!0,o.autoPlayNext_=!0,o.play(i),e.off("ended",e.playNext),e.on("ended",e.playNext),o}n(i,t);var o=i.prototype;return o.autoPlayNext=function(t){if(void 0===t)return this.autoPlayNext_;this.autoPlayNext_=!!t,this.player_.trigger("autoplaynext",this.autoPlayNext_)},o.play=function(t){void 0!==t&&this.index(t);var n=this.current(),i=n.poster,o=n.sources,a=n.title,r=this.player_,l=function(){r.poster(i||"")};r.title(""),r.poster(""),this.loadPoster_?(this.loadPoster_=!1,r.autoplay()?r.one("autoplay-failure",l):l()):r.one("loadedmetadata",(function(){r.play()})),"none"!==r.preload()&&(r.addClass("vjs-waiting"),r.one("loadedmetadata",(function(){r.removeClass("vjs-waiting")}))),r.src(o),r.title(a||""),r.trigger("playlist-change",e({},n,{index:this.index()}))},i}(a);t.registerPlugin("setPlayList",(function(t,e){var n=this.player_;n.playlist=new d(n,t,e),n.trigger("playlist",t)})),t.hook("setup",(function(t){var e=t.options_.playlist;if(e&&e.length){var n=e.findIndex((function(t){return t.default}));t.setPlayList(e,n)}}));