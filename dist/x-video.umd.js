!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(require("video.js")):"function"==typeof define&&define.amd?define(["video.js"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).videojs)}(this,(function(t){"use strict";function e(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var n=e(t);function i(t,e,n){var o=[];if(t&&t.childIndex_&&Object.keys(t.childIndex_).length)for(var s in t.childIndex_){var r,l=t.childIndex_[s];if(l&&l.name_==e)n.push(((r={parent:t,component:l,index:t.children_.indexOf(l)})[e]=l,r));o.push(i(l,e,n))}return{name:e,parent:t,children:o}}n.default.getComponent("Component").prototype.findChild=function(t){var e=[];return i(this,t,e),e};var o=n.default.browser,s=o.IS_IPHONE,r=o.IOS_VERSION;function l(){return l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},l.apply(this,arguments)}function a(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,u(t,e)}function u(t,e){return u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},u(t,e)}function c(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}n.default.hook("setup",(function(t){t.playsinline(!1!==t.options_.playsinline),t.addClass("video-js"),s&&(t.addClass("vjs-is-iphone"),r<11&&t.addClass("vjs-iphone-below-11"))}));var d=n.default.getComponent("Component"),p=n.default.getComponent("ControlBar"),h=function(t){function e(e,n){var i;return(i=t.call(this,e,n)||this).addClass("vjs-control-separator"),i.addClass(n.className||""),i}return a(e,t),e}(d);n.default.registerComponent("ControlSeparator",h),n.default.hook("beforesetup",(function(t,e){var n=p.prototype.options_.children.slice(0),i=n.indexOf("CustomControlSpacer");return i>-1&&(p.prototype.options_.children=[{name:"ControlSeparator",className:"top",children:[]},{name:"ControlSeparator",className:"middle",children:n.splice(0,i+1)},{name:"ControlSeparator",className:"bottom",children:n}]),e})),n.default.hook("setup",(function(t){var e,n=!1!==t.options_.mobileView;e=480,(window.matchMedia?window.matchMedia("(max-width: "+e+"px)").matches:window.innerWidth<=e)&&n&&(t.controlBar.hide(),t.one("playing",(function(){var e=["mouseover","userinactive","touchstart"];t.one(e,(function n(){t.off(e,n),t.controlBar.show()})),t.one("touchend",(function(){t.userActive(!0)}))})),t.addClass("vjs-mobile-view"))}));var f=n.default.getComponent("SeekBar");f.prototype.getPercent=function(){var t=this.player_.currentTime()/this.player_.duration();return t>=1?1:t},f.prototype.handleMouseMove=function(t){var e=this.player_;if(n.default.dom.isSingleLeftClick(t)){var i=this.calculateDistance(t)*e.duration();i===e.duration()&&(i-=.1),e.currentTime(i),this.update()}},n.default.getComponent("ControlBar").prototype.options_.children=["PlayToggle","CustomControlSpacer","VolumePanel","CurrentTimeDisplay","TimeDivider","DurationDisplay","ProgressControl","CustomControlSpacer","SettingMenuButton","FullscreenToggle"],n.default.hook("setup",(function(t){t.on("mouseleave",(function(){t.userActive(!1)})),t.ready((function(){t.controls(!1!==t.options_.controls)}))}));var m=function(t){function e(e,n){var i;return(i=t.call(this,e,n)||this).title_=n.playerOptions.title||"",i.update(i.title_),i}a(e,t);var i=e.prototype;return i.createEl=function(){var e=t.prototype.createEl.call(this,"div",{className:"vjs-title"});return this.contentEl_=n.default.dom.createEl("div",{className:"vjs-title-field"}),e.appendChild(this.contentEl_),e},i.update=function(t){t?this.show():this.hide(),this.player_.cache_.title=this.title_,this.title_=t,this.contentEl_.innerHTML=t},e}(n.default.getComponent("Component"));n.default.registerPlugin("title",(function(t){var e=this.player_.getChild("VideoTitle");if(void 0===t)return e.title_;e.update(t)})),n.default.registerComponent("VideoTitle",m),n.default.getComponent("Player").prototype.options_.children.splice(2,0,"VideoTitle");var v=n.default.getComponent("PlayToggle"),C=function(t){function e(){return t.apply(this,arguments)||this}a(e,t);var i=e.prototype;return i.createEl=function(){return n.default.dom.createEl("div",{className:"vjs-play-toggle-layer"})},i.handleClick=function(t){(this.player_.userActive()||this.player_.paused())&&v.prototype.handleClick.call(this,t)},e}(n.default.getComponent("ClickableComponent"));n.default.registerComponent("PlayToggleLayer",C);var g=n.default.getComponent("Player").prototype.options_.children,y=g.indexOf("loadingSpinner");g.splice(y,0,"PlayToggleLayer");var _=function(t){function e(){return t.apply(this,arguments)||this}a(e,t);var n=e.prototype;return n.buildCSSClass=function(){return"vjs-close-menu-layer vjs-close-context-menu"},n.handleClick=function(){this.options_.menu.hide()},e}(n.default.getComponent("ClickableComponent"));n.default.registerComponent("CloseContextMenu",_);var b=function(t){function e(e,n){var i;return(i=t.call(this,e,n)||this).addClass("vjs-context-menu"),i.hide(),i.player_.on("contextmenu",i.onContextmenu.bind(c(i))),i}a(e,t);var n=e.prototype;return n.createEl=function(){for(var e,n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];var s=(e=t.prototype.createEl).call.apply(e,[this].concat(i)),r=new _(this.player_,{menu:this});return s.insertBefore(r.el_,s.firstElementChild),s},n.show=function(e,n){t.prototype.show.call(this),this.el_.style.top=n+"px",this.el_.style.left=e+"px"},n.onContextmenu=function(t){t.preventDefault();var e=this.player_.el().getBoundingClientRect(),n=t.pageX,i=t.pageY;if(i>e.y&&i-e.height<e.y&&n>e.x&&n-e.width<e.x){var o=n-e.x,s=i-e.y;this.show(o,s)}else this.hide()},n.handleClick=function(t){(t.button||0===t.button)&&2!==t.button&&this.hide()},e}(n.default.getComponent("Menu"));b.prototype.options_={children:[]},n.default.registerComponent("ContextMenu",b),n.default.getComponent("Player").prototype.options_.children.push("ContextMenu");var j=function(t){function e(){return t.apply(this,arguments)||this}a(e,t);var n=e.prototype;return n.buildCSSClass=function(){return"vjs-close-menu-layer vjs-close-setting-menu"},n.handleClick=function(){this.options_.menu.menuButton_.hideMenu()},e}(n.default.getComponent("ClickableComponent"));n.default.registerComponent("CloseSettingMenu",j);var S=function(t){function e(e,n){var i;return(i=t.call(this,e,l({},n,{name:"SettingMenu"}))||this).addClass("vjs-setting-menu"),i}a(e,t);var n=e.prototype;return n.init=function(){this.contentEl_&&(this.mainMenuItems=this.children().slice(0),this.transform(this.mainMenuItems),this.addClass("vjs-setting-menu-ready"))},n.createEl=function(){var e=t.prototype.createEl.call(this),n=new j(this.player_,{menu:this});return e.insertBefore(n.el_,e.firstElementChild),e},n.update=function(t){var e=this;void 0===t&&(t=[]),this.children().slice(0).forEach((function(t){e.removeChild(t)})),t.forEach((function(t){e.addChild(t)}))},n.resize=function(t){var e=t.width,n=t.height;this.contentEl_.style.width=e+"px",this.contentEl_.style.height=n+"px"},n.getMenuDimension=function(t){var e=this.player_,n=new E(e);n.update(t),e.addChild(n);var i=n.contentEl_.getBoundingClientRect();return n.update(),n.dispose(),e.removeChild(n),i},n.transform=function(t){var e=this.getMenuDimension(t);this.update(t),this.resize(e)},n.restore=function(){this.transform(this.mainMenuItems)},n.removeStyle=function(){this.contentEl_.removeAttribute("style")},n.hide=function(){},e}(n.default.getComponent("Menu")),E=function(t){function e(e){return t.call(this,e,{name:"SettingMenuTemp"})||this}return a(e,t),e}(S);n.default.registerComponent("SettingMenu",S);var M=function(t){function e(e,i){var o;return(o=t.call(this,e,n.default.mergeOptions({selectable:!1},i))||this).menu=i.menu,o}return a(e,t),e}(n.default.getComponent("MenuItem"));n.default.registerComponent("SettingMenuItem",M);var x=function(t){function e(){return t.apply(this,arguments)||this}a(e,t);var i=e.prototype;return i.createEl=function(){var t=this.options_;return n.default.dom.createEl("li",{className:"vjs-menu-item vjs-setting-onoff-item",innerHTML:'\n        <div class="vjs-icon-placeholder '+(this.options_.icon||"")+'"></div>\n        <div>'+this.localize(t.label)+'</div>\n        <div class="vjs-spacer"></div>\n        <div>\n          <div class="vjs-onoff-button"></div>\n        </div>\n      '})},i.update=function(t){this.active=void 0===t?!this.active:t,this.active?this.addClass("vjs-active"):this.removeClass("vjs-active")},i.handleClick=function(){this.update()},i.selected=function(){},e}(M);n.default.registerComponent("SettingOnOffItem",x);var w=function(t){function e(e,n){var i;return(i=t.call(this,e,n)||this).addChild("Component",{},0),i.addClass("vjs-settings-sub-menu-item"),i.addClass("vjs-settings-sub-menu-title"),i}return a(e,t),e.prototype.handleClick=function(){this.options_.menu.restore()},e}(M);n.default.registerComponent("SettingSubOptionTitle",w);var k=function(t){function e(e,n){var i;return(i=t.call(this,e,n)||this).selectable=!0,Object.assign(c(i),n),i.addChild("Component",{},0),i.addClass("vjs-settings-sub-menu-item"),i.addClass("vjs-settings-sub-menu-option"),i.update(),i}a(e,t);var n=e.prototype;return n.update=function(){this.selected(this.value===this.parent.selected.value)},n.handleClick=function(){this.parent.onChange({index:this.options_.index}),this.menu.restore()},e}(M);n.default.registerComponent("SettingSubOptionItem",k);var O=function(t){function e(e,n){var i;return void 0===n&&(n={}),(i=t.call(this,e,n)||this).setEntries(i.options_.entries),i.entries.length||i.hide(),i}a(e,t);var i=e.prototype;return i.createEl=function(){var t=this.options_,e=t.icon,i=t.label,o=n.default.dom.createEl("li",{className:"vjs-menu-item vjs-setting-menu-item",innerHTML:'\n        <div class="vjs-icon-placeholder '+(e||"")+'"></div>\n        <div class="vjs-setting-menu-label">'+this.localize(i)+'</div>\n        <div class="vjs-spacer"></div>\n      '});return this.selectedValueEl=n.default.dom.createEl("div",{className:"vjs-setting-menu-value"}),o.appendChild(this.selectedValueEl),o},i.setEntries=function(t,e){var i=this;void 0===t&&(t=[]),Object.assign(this,function(t,e){return{entries:t=t.map((function(t,n){null!==t&&"object"!=typeof t&&(t={value:t,label:t});var i=!1;return void 0===e&&!0===t.default&&(i=!0,e=n),l({},t,{index:n,default:i})})),selected:t[e||0]}}(t,e)),this.updateSelectedValue();var o=n.default.getComponent(this.name_+"Child")||k;this.subMenuItems=[new w(this.player_,{label:this.options_.label,menu:this.menu})].concat(this.entries.map((function(t,e){var n=t.label,s=t.value;return new o(i.player_,{index:e,label:n,value:s,parent:i,menu:i.menu})})))},i.handleClick=function(){this.menu.transform(this.subMenuItems)},i.select=function(t){this.selected=this.entries[t],this.updateSelectedValue()},i.update=function(){this.subMenuItems.forEach((function(t){t.update&&t.update()}))},i.onChange=function(t){var e=t.index;this.select(e),this.update(e)},i.updateSelectedValue=function(){this.selected&&(this.selectedValueEl.innerHTML=this.localize(this.selected.label))},e}(M);n.default.registerComponent("SettingOptionItem",O);var T=function(t){function e(e,n){var i;return i=t.call(this,e,n)||this,e.addChild(i.menu),e.SettingMenu=i.menu,i.removeChild(i.menu),i}a(e,t);var n=e.prototype;return n.buildCSSClass=function(){return"vjs-setting-button "+t.prototype.buildCSSClass.call(this)},n.buildWrapperCSSClass=function(){return"vjs-setting-button "+t.prototype.buildWrapperCSSClass.call(this)},n.createMenu=function(){var t=new S(this.player_,{menuButton:this});return(this.options_.entries||[]).forEach((function(e){var n=t.addChild(e,{menu:t});t[e]=n})),t},n.hideMenu=function(){this.unpressButton(),this.el_.blur()},n.pressButton=function(){t.prototype.pressButton.call(this),this.menu.init()},n.unpressButton=function(){t.prototype.unpressButton.call(this),this.player_.removeClass("vjs-keep-control-showing"),this.menu.restore()},n.handleClick=function(){var t=this;this.player_.addClass("vjs-keep-control-showing"),this.buttonPressed_?this.unpressButton():this.pressButton(),this.off(document.body,"click",this.hideMenu),setTimeout((function(){t.one(document.body,"click",t.hideMenu)}),0)},e}(n.default.getComponent("MenuButton"));T.prototype.controlText_="Settings",T.prototype.options_={entries:[]},n.default.registerComponent("SettingMenuButton",T)}));
