!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("video.js")):"function"==typeof define&&define.amd?define(["video.js"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).videojs)}(this,(function(e){"use strict";function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var l=t(e);function n(){return n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n])}return e},n.apply(this,arguments)}function o(e,t){return o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},o(e,t)}var i="";try{i=localStorage&&localStorage.getItem("vjs-plus-log")}catch(e){}var r="normal"===i||l.default.browser.IE_VERSION?console.info.bind(console,"[VJS Plus]:"):i?console.info.bind(console,"%c[VJS Plus]:","font-weight: bold; color:#2196F3;"):function(){},s=function(e){var t,l;function i(t,l){var o;return(o=e.call(this,t,n({},l,{name:"QualityHlsSettingItem",label:"Quality",icon:"vjs-icon-hd"}))||this).addClass("vjs-setting-quality"),o.levels=[],o.handleAllLevelsAdded(),o}l=e,(t=i).prototype=Object.create(l.prototype),t.prototype.constructor=t,o(t,l);var s=i.prototype;return s.handleAllLevelsAdded=function(){var e=this,t=this.player_;if(!t.qualityLevels)return r("plugin videojs-contrib-quality-levels do not exsits"),!1;var l,n=t.qualityLevels(),o=[];n.on("addqualitylevel",(function(n){var i=n.qualityLevel;clearTimeout(l),o.push(i);l=setTimeout((function(){e.levels=o.slice(0),t.trigger("before-quality-setup",{levels:e.levels}),e.onAllLevelsAdded(),o=[]}),10)}))},s.onAllLevelsAdded=function(){var e=this,t=[].concat(this.levels.map((function(t){var l=t.height,n=t.width,o=n<l?n:l;return{label:e.localize(o+"p"),value:l,default:!1}})).sort((function(e,t){return t.value-e.value})),[{label:"Auto",value:"auto",default:!0}]);this.levels.length>1?(this.setEntries(t,t.length-1),this.show(),this.player_.trigger("hls-quality",this.levels)):this.hide()},s.onChange=function(){for(var t,l=this,o=arguments.length,i=new Array(o),r=0;r<o;r++)i[r]=arguments[r];(t=e.prototype.onChange).call.apply(t,[this].concat(i));var s=this.selected.value;this.levels.forEach((function(e){e.enabled=e.height===s||"auto"===s})),this.player_.trigger("hls-qualitychange",this.entries.reduce((function(e,t,o){t.value===s&&(e=n({index:o,level:l.levels.find((function(e){return e.height===s}))||{}},t));return e}),{}))},i}(l.default.getComponent("SettingOptionItem"));l.default.getComponent("SettingMenuButton").prototype.options_.entries.push("QualityHlsSettingItem"),l.default.registerComponent("QualityHlsSettingItem",s)}));