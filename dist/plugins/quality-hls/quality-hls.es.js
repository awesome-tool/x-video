import e from"video.js";function t(){return t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n])}return e},t.apply(this,arguments)}function l(e,t){return l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},l(e,t)}var n="";try{n=localStorage&&localStorage.getItem("vjs-plus-log")}catch(e){}var o="normal"===n||e.browser.IE_VERSION?console.info.bind(console,"[VJS Plus]:"):n?console.info.bind(console,"%c[VJS Plus]:","font-weight: bold; color:#2196F3;"):function(){},i=function(e){var n,i;function r(l,n){var o;return(o=e.call(this,l,t({},n,{name:"QualityHlsSettingItem",label:"Quality",icon:"vjs-icon-hd"}))||this).addClass("vjs-setting-quality"),o.levels=[],o.handleAllLevelsAdded(),o}i=e,(n=r).prototype=Object.create(i.prototype),n.prototype.constructor=n,l(n,i);var s=r.prototype;return s.handleAllLevelsAdded=function(){var e=this,t=this.player_;if(!t.qualityLevels)return o("plugin videojs-contrib-quality-levels do not exsits"),!1;var l,n=t.qualityLevels(),i=[];n.on("addqualitylevel",(function(n){var o=n.qualityLevel;clearTimeout(l),i.push(o);l=setTimeout((function(){e.levels=i.slice(0),t.trigger("before-quality-setup",{levels:e.levels}),e.onAllLevelsAdded(),i=[]}),10)}))},s.onAllLevelsAdded=function(){var e=this,t=[].concat(this.levels.map((function(t){var l=t.height,n=t.width,o=n<l?n:l;return{label:e.localize(o+"p"),value:l,default:!1}})).sort((function(e,t){return t.value-e.value})),[{label:"Auto",value:"auto",default:!0}]);this.levels.length>1?(this.setEntries(t,t.length-1),this.show(),this.player_.trigger("hls-quality",this.levels)):this.hide()},s.onChange=function(){for(var l,n=this,o=arguments.length,i=new Array(o),r=0;r<o;r++)i[r]=arguments[r];(l=e.prototype.onChange).call.apply(l,[this].concat(i));var s=this.selected.value;this.levels.forEach((function(e){e.enabled=e.height===s||"auto"===s})),this.player_.trigger("hls-qualitychange",this.entries.reduce((function(e,l,o){l.value===s&&(e=t({index:o,level:n.levels.find((function(e){return e.height===s}))||{}},l));return e}),{}))},r}(e.getComponent("SettingOptionItem"));e.getComponent("SettingMenuButton").prototype.options_.entries.push("QualityHlsSettingItem"),e.registerComponent("QualityHlsSettingItem",i);
