!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("video.js")):"function"==typeof define&&define.amd?define(["video.js"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).videojs)}(this,(function(e){"use strict";function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var i=t(e),n=!1;function o(){n=!1,this.tech_.show()}i.default.use("*",(function(e){return{callPlay:function(){return n&&i.default.middleware.TERMINATOR}}})),i.default.registerPlugin("unload",(function(e){void 0===e&&(e={}),n=!0,this.pause(),this.tech_.hide(),this.off("loadstart",o),this.on("loadstart",o),e.loading&&this.addClass("vjs-seeking")}))}));
