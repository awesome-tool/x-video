import e from"video.js";function n(e,r){return n=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e},n(e,r)}var r="";try{r=localStorage&&localStorage.getItem("vjs-plus-log")}catch(e){}var o,t="normal"===r||e.browser.IE_VERSION?console.info.bind(console,"[VJS Plus]:"):r?console.info.bind(console,"%c[VJS Plus]:","font-weight: bold; color:#2196F3;"):function(){};try{o=require("electron").remote.getCurrentWindow()}catch(e){o=window.getCurrentWindow}var l=function(e){var r,o;function t(n,r){var o;o=e.call(this,n,r)||this;var t=window.getCurrentWindow(),l=function(e){return t.setFullScreen(e),n},c=function(){n.trigger("fullscreenchange")};return n.requestFullscreen=l.bind(n,!0),n.exitFullscreen=l.bind(n,!1),n.isFullscreen=function(){return t.isFullScreen()},t.addListener("enter-full-screen",c),t.addListener("leave-full-screen",c),n.on("dispose",(function(){t.removeListener("enter-full-screen",c),t.removeListener("leave-full-screen",c)})),n.isFullscreen()&&(o.handleFullscreenChange(),n.addClass("vjs-fullscreen")),o}return o=e,(r=t).prototype=Object.create(o.prototype),r.prototype.constructor=r,n(r,o),t.prototype.handleClick=function(){this.player_.isFullscreen()?this.player_.exitFullscreen():this.player_.requestFullscreen()},t}(e.getComponent("FullscreenToggle"));if(o){e.registerComponent("ElectronFullscreenToggle",l);var c=e.getComponent("ControlBar").prototype.options_.children,s=c.indexOf("fullscreenToggle");c[s]="ElectronFullscreenToggle"}else t('Plugin "ElectronFullscreenToggle" is not enabled, please check the docs for more information');