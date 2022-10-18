import t from"video.js";function e(t,n,o){var i=[];if(t&&t.childIndex_&&Object.keys(t.childIndex_).length)for(var r in t.childIndex_){var s,a=t.childIndex_[r];if(a&&a.name_==n)o.push(((s={parent:t,component:a,index:t.children_.indexOf(a)})[n]=a,s));i.push(e(a,n,o))}return{name:n,parent:t,children:i}}t.getComponent("Component").prototype.findChild=function(t){var n=[];return e(this,t,n),n};var n=t.browser,o=n.IS_IPHONE,i=n.IOS_VERSION;function r(){return r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},r.apply(this,arguments)}function s(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,a(t,e)}function a(t,e){return a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},a(t,e)}function l(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}t.hook("setup",(function(t){t.playsinline(!1!==t.options_.playsinline),t.addClass("video-js"),o&&(t.addClass("vjs-is-iphone"),i<11&&t.addClass("vjs-iphone-below-11"))}));var u=t.getComponent("Component"),c=t.getComponent("ControlBar"),p=function(t){function e(e,n){var o;return(o=t.call(this,e,n)||this).addClass("vjs-control-separator"),o.addClass(n.className||""),o}return s(e,t),e}(u);t.registerComponent("ControlSeparator",p),t.hook("beforesetup",(function(t,e){var n=c.prototype.options_.children.slice(0),o=n.indexOf("CustomControlSpacer");return o>-1&&(c.prototype.options_.children=[{name:"ControlSeparator",className:"top",children:[]},{name:"ControlSeparator",className:"middle",children:n.splice(0,o+1)},{name:"ControlSeparator",className:"bottom",children:n}]),e})),t.hook("setup",(function(t){var e,n=!1!==t.options_.mobileView;e=480,(window.matchMedia?window.matchMedia("(max-width: "+e+"px)").matches:window.innerWidth<=e)&&n&&(t.controlBar.hide(),t.one("playing",(function(){var e=["mouseover","userinactive","touchstart"];t.one(e,(function n(){t.off(e,n),t.controlBar.show()})),t.one("touchend",(function(){t.userActive(!0)}))})),t.addClass("vjs-mobile-view"))}));var h=t.getComponent("SeekBar");h.prototype.getPercent=function(){var t=this.player_.currentTime()/this.player_.duration();return t>=1?1:t},h.prototype.handleMouseMove=function(e){var n=this.player_;if(t.dom.isSingleLeftClick(e)){var o=this.calculateDistance(e)*n.duration();o===n.duration()&&(o-=.1),n.currentTime(o),this.update()}},t.getComponent("ControlBar").prototype.options_.children=["PlayToggle","CustomControlSpacer","VolumePanel","CurrentTimeDisplay","TimeDivider","DurationDisplay","ProgressControl","CustomControlSpacer","SettingMenuButton","FullscreenToggle"],t.hook("setup",(function(t){t.on("mouseleave",(function(){t.userActive(!1)})),t.ready((function(){t.controls(!1!==t.options_.controls)}))}));var d=function(e){function n(t,n){var o;return(o=e.call(this,t,n)||this).title_=n.playerOptions.title||"",o.update(o.title_),o}s(n,e);var o=n.prototype;return o.createEl=function(){var n=e.prototype.createEl.call(this,"div",{className:"vjs-title"});return this.contentEl_=t.dom.createEl("div",{className:"vjs-title-field"}),n.appendChild(this.contentEl_),n},o.update=function(t){t?this.show():this.hide(),this.player_.cache_.title=this.title_,this.title_=t,this.contentEl_.innerHTML=t},n}(t.getComponent("Component"));t.registerPlugin("title",(function(t){var e=this.player_.getChild("VideoTitle");if(void 0===t)return e.title_;e.update(t)})),t.registerComponent("VideoTitle",d),t.getComponent("Player").prototype.options_.children.splice(2,0,"VideoTitle");var v=t.getComponent("PlayToggle"),m=function(e){function n(){return e.apply(this,arguments)||this}s(n,e);var o=n.prototype;return o.createEl=function(){return t.dom.createEl("div",{className:"vjs-play-toggle-layer"})},o.handleClick=function(t){(this.player_.userActive()||this.player_.paused())&&v.prototype.handleClick.call(this,t)},n}(t.getComponent("ClickableComponent"));t.registerComponent("PlayToggleLayer",m);var f=t.getComponent("Player").prototype.options_.children,C=f.indexOf("loadingSpinner");f.splice(C,0,"PlayToggleLayer");var g=function(t){function e(e,n){var o;return(o=t.call(this,e,r({},n,{selectable:!0}))||this).addClass("vjs-context-menu-item"),o.controlText(n.label),o}s(e,t);var n=e.prototype;return n.createEl=function(){for(var e,n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];var r=(e=t.prototype.createEl).call.apply(e,[this].concat(o));return r.insertAdjacentHTML("afterbegin",'<span aria-hidden="true" class="vjs-icon-placeholder '+(this.options_.icon||"")+'"></span>'),r},n.handleClick=function(){this.player_.findChild("ContextMenu")[0].component.hide()},e}(t.getComponent("MenuItem"));t.registerComponent("ContextMenuItem",g);var y=function(t){function e(e){var n;return(n=t.call(this,e,{name:"ContextMenuToggleLoop",label:"Loop",icon:"vjs-icon-loop"})||this).addClass("vjs-checkbox"),e.on("loadstart",n.update.bind(l(n))),n}s(e,t);var n=e.prototype;return n.update=function(){this.selected(this.player_.loop())},n.handleClick=function(){t.prototype.handleClick.call(this),this.player_.loop(!this.player_.loop()),this.update()},e}(g);t.registerComponent("ContextMenuToggleLoop",y);var _=function(t){function e(){return t.apply(this,arguments)||this}s(e,t);var n=e.prototype;return n.buildCSSClass=function(){return"vjs-close-menu-layer vjs-close-context-menu"},n.handleClick=function(){this.options_.menu.hide()},e}(t.getComponent("ClickableComponent"));t.registerComponent("CloseContextMenu",_);var b=function(t){function e(e,n){var o;return(o=t.call(this,e,n)||this).addClass("vjs-context-menu"),o.hide(),o.player_.on("contextmenu",o.onContextmenu.bind(l(o))),o}s(e,t);var n=e.prototype;return n.createEl=function(){for(var e,n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];var r=(e=t.prototype.createEl).call.apply(e,[this].concat(o)),s=new _(this.player_,{menu:this});return r.insertBefore(s.el_,r.firstElementChild),r},n.show=function(e,n){t.prototype.show.call(this),this.el_.style.top=n+"px",this.el_.style.left=e+"px"},n.onContextmenu=function(t){t.preventDefault();var e=this.player_.el().getBoundingClientRect(),n=t.pageX,o=t.pageY;if(o>e.y&&o-e.height<e.y&&n>e.x&&n-e.width<e.x){var i=n-e.x,r=o-e.y;this.show(i,r)}else this.hide()},n.handleClick=function(t){(t.button||0===t.button)&&2!==t.button&&this.hide()},e}(t.getComponent("Menu"));b.prototype.options_={children:["ContextMenuToggleLoop","AboutThisPlayer"]},t.registerComponent("ContextMenu",b),t.getComponent("Player").prototype.options_.children.push("ContextMenu");var j=function(t){function e(){return t.apply(this,arguments)||this}s(e,t);var n=e.prototype;return n.buildCSSClass=function(){return"vjs-close-menu-layer vjs-close-setting-menu"},n.handleClick=function(){this.options_.menu.menuButton_.hideMenu()},e}(t.getComponent("ClickableComponent"));t.registerComponent("CloseSettingMenu",j);var S=function(t){function e(e,n){var o;return(o=t.call(this,e,r({},n,{name:"SettingMenu"}))||this).addClass("vjs-setting-menu"),o}s(e,t);var n=e.prototype;return n.init=function(){this.contentEl_&&(this.mainMenuItems=this.children().slice(0),this.transform(this.mainMenuItems),this.addClass("vjs-setting-menu-ready"))},n.createEl=function(){var e=t.prototype.createEl.call(this),n=new j(this.player_,{menu:this});return e.insertBefore(n.el_,e.firstElementChild),e},n.update=function(t){var e=this;void 0===t&&(t=[]),this.children().slice(0).forEach((function(t){e.removeChild(t)})),t.forEach((function(t){e.addChild(t)}))},n.resize=function(t){var e=t.width,n=t.height;this.contentEl_.style.width=e+"px",this.contentEl_.style.height=n+"px"},n.getMenuDimension=function(t){var e=this.player_,n=new M(e);n.update(t),e.addChild(n);var o=n.contentEl_.getBoundingClientRect();return n.update(),n.dispose(),e.removeChild(n),o},n.transform=function(t){var e=this.getMenuDimension(t);this.update(t),this.resize(e)},n.restore=function(){this.transform(this.mainMenuItems)},n.removeStyle=function(){this.contentEl_.removeAttribute("style")},n.hide=function(){},e}(t.getComponent("Menu")),M=function(t){function e(e){return t.call(this,e,{name:"SettingMenuTemp"})||this}return s(e,t),e}(S);t.registerComponent("SettingMenu",S);var x=function(e){function n(n,o){var i;return(i=e.call(this,n,t.mergeOptions({selectable:!1},o))||this).menu=o.menu,i}return s(n,e),n}(t.getComponent("MenuItem"));t.registerComponent("SettingMenuItem",x);var E=function(e){function n(){return e.apply(this,arguments)||this}s(n,e);var o=n.prototype;return o.createEl=function(){var e=this.options_;return t.dom.createEl("li",{className:"vjs-menu-item vjs-setting-onoff-item",innerHTML:'\n        <div class="vjs-icon-placeholder '+(this.options_.icon||"")+'"></div>\n        <div>'+this.localize(e.label)+'</div>\n        <div class="vjs-spacer"></div>\n        <div>\n          <div class="vjs-onoff-button"></div>\n        </div>\n      '})},o.update=function(t){this.active=void 0===t?!this.active:t,this.active?this.addClass("vjs-active"):this.removeClass("vjs-active")},o.handleClick=function(){this.update()},o.selected=function(){},n}(x);t.registerComponent("SettingOnOffItem",E);var w=function(t){function e(e,n){var o;return(o=t.call(this,e,n)||this).addChild("Component",{},0),o.addClass("vjs-settings-sub-menu-item"),o.addClass("vjs-settings-sub-menu-title"),o}return s(e,t),e.prototype.handleClick=function(){this.options_.menu.restore()},e}(x);t.registerComponent("SettingSubOptionTitle",w);var k=function(t){function e(e,n){var o;return(o=t.call(this,e,n)||this).selectable=!0,Object.assign(l(o),n),o.addChild("Component",{},0),o.addClass("vjs-settings-sub-menu-item"),o.addClass("vjs-settings-sub-menu-option"),o.update(),o}s(e,t);var n=e.prototype;return n.update=function(){this.selected(this.value===this.parent.selected.value)},n.handleClick=function(){this.parent.onChange({index:this.options_.index}),this.menu.restore()},e}(x);t.registerComponent("SettingSubOptionItem",k);var I=function(e){function n(t,n){var o;return void 0===n&&(n={}),(o=e.call(this,t,n)||this).setEntries(o.options_.entries),o.entries.length||o.hide(),o}s(n,e);var o=n.prototype;return o.createEl=function(){var e=this.options_,n=e.icon,o=e.label,i=t.dom.createEl("li",{className:"vjs-menu-item vjs-setting-menu-item",innerHTML:'\n        <div class="vjs-icon-placeholder '+(n||"")+'"></div>\n        <div class="vjs-setting-menu-label">'+this.localize(o)+'</div>\n        <div class="vjs-spacer"></div>\n      '});return this.selectedValueEl=t.dom.createEl("div",{className:"vjs-setting-menu-value"}),i.appendChild(this.selectedValueEl),i},o.setEntries=function(e,n){var o=this;void 0===e&&(e=[]),Object.assign(this,function(t,e){return{entries:t=t.map((function(t,n){null!==t&&"object"!=typeof t&&(t={value:t,label:t});var o=!1;return void 0===e&&!0===t.default&&(o=!0,e=n),r({},t,{index:n,default:o})})),selected:t[e||0]}}(e,n)),this.updateSelectedValue();var i=t.getComponent(this.name_+"Child")||k;this.subMenuItems=[new w(this.player_,{label:this.options_.label,menu:this.menu})].concat(this.entries.map((function(t,e){var n=t.label,r=t.value;return new i(o.player_,{index:e,label:n,value:r,parent:o,menu:o.menu})})))},o.handleClick=function(){this.menu.transform(this.subMenuItems)},o.select=function(t){this.selected=this.entries[t],this.updateSelectedValue()},o.update=function(){this.subMenuItems.forEach((function(t){t.update&&t.update()}))},o.onChange=function(t){var e=t.index;this.select(e),this.update(e)},o.updateSelectedValue=function(){this.selected&&(this.selectedValueEl.innerHTML=this.localize(this.selected.label))},n}(x);t.registerComponent("SettingOptionItem",I);var T="";try{T=localStorage&&localStorage.getItem("vjs-plus-log")}catch(t){}var O="normal"===T||t.browser.IE_VERSION?console.info.bind(console,"[VJS Plus]:"):T?console.info.bind(console,"%c[VJS Plus]:","font-weight: bold; color:#2196F3;"):function(){},B=function(t){function e(e,n){var o;return(o=t.call(this,e,r({},n,{label:"Speed",icon:"vjs-icon-slow-motion-video",entries:[.5,.75,{label:"Normal",value:1,default:!0},1.25,1.5,2]}))||this).addClass("vjs-setting-playback-rate"),e.on("ratechange",(function(){var t=e.playbackRate(),n=o.entries.findIndex((function(e){var n=e.value;return t===n}));n>-1?(o.select(n),o.update(n)):O.warn("Incorrect playbackRate value, setting menu will not updated")})),o}return s(e,t),e.prototype.onChange=function(){for(var e,n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];(e=t.prototype.onChange).call.apply(e,[this].concat(o)),this.player_.playbackRate(this.selected.value)},e}(I);t.registerComponent("PlaybackRateSettingItem",B);var P=function(t){function e(e,n){var o;return o=t.call(this,e,n)||this,e.addChild(o.menu),e.SettingMenu=o.menu,o.removeChild(o.menu),o}s(e,t);var n=e.prototype;return n.buildCSSClass=function(){return"vjs-setting-button "+t.prototype.buildCSSClass.call(this)},n.buildWrapperCSSClass=function(){return"vjs-setting-button "+t.prototype.buildWrapperCSSClass.call(this)},n.createMenu=function(){var t=new S(this.player_,{menuButton:this});return(this.options_.entries||[]).forEach((function(e){var n=t.addChild(e,{menu:t});t[e]=n})),t},n.hideMenu=function(){this.unpressButton(),this.el_.blur()},n.pressButton=function(){t.prototype.pressButton.call(this),this.menu.init()},n.unpressButton=function(){t.prototype.unpressButton.call(this),this.player_.removeClass("vjs-keep-control-showing"),this.menu.restore()},n.handleClick=function(){var t=this;this.player_.addClass("vjs-keep-control-showing"),this.buttonPressed_?this.unpressButton():this.pressButton(),this.off(document.body,"click",this.hideMenu),setTimeout((function(){t.one(document.body,"click",t.hideMenu)}),0)},e}(t.getComponent("MenuButton"));P.prototype.controlText_="Settings",P.prototype.options_={entries:["PlaybackRateSettingItem"]},t.registerComponent("SettingMenuButton",P);
