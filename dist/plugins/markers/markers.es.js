import r from"video.js";var e={markerStyle:{width:"7px","border-radius":"30%","background-color":"red",top:"0em"},markerTip:{display:!0,text:function(r){return r.text},time:function(r){return r.time}},breakOverlay:{display:!0,displayTime:3,text:function(r){return"Break overlay: "+r.overlayText},style:{width:"100%",height:"20%","background-color":"rgba(0,0,0,0.7)",color:"white","font-size":"17px"}},markers:[]},t=function(r){var e;try{e=r.getBoundingClientRect()}catch(r){e={top:0,bottom:0,left:0,width:0,height:0,right:0}}return e},i=function(){function i(t,i){var a=this;void 0===i&&(i={}),this.player_=t,this.options_=r.mergeOptions(e,i),this.markersMap_={},this.currentMarkerIndex_=-1,this.markerTip_=null,this.breakOverlay_=null,this.overlayIndex_=-1,this.markers=[],this.player_.on("loadedmetadata",(function(){a.initialize()}))}var a=i.prototype;return a.sortMarkers=function(){var r=this;this.markers.sort((function(e,t){return r.options_.markerTip.time(e)-r.options_.markerTip.time(t)}))},a.getPosition=function(r){return this.options_.markerTip.time(r)/this.player_.duration()*100},a.addMarkers=function(r){var e=this;r.forEach((function(r){var t;r.key=(t=(new Date).getTime(),"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(r){var e=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"==r?e:3&e|8).toString(16)}))),e.player_.el().querySelector(".vjs-progress-holder").appendChild(e.createMarkerEl(r)),e.markersMap_[r.key]=r,e.markers.push(r)})),this.sortMarkers()},a.createMarkerEl=function(e){var t=this,i=r.dom.createEl("div",{},{"data-marker-key":e.key,"data-marker-time":this.options_.markerTip.time(e)});return this.setMarkerElStyle(e,i),i.addEventListener("click",(function(){var r=i.getAttribute("data-marker-key");t.player_.currentTime(t.options_.markerTip.time(t.markersMap_[r])),t.player_.trigger("marker-click",e)})),this.options_.markerTip.display&&this.registerMarkerTipHandler(i),i},a.updateMarkers=function(r){var e=this;this.markers.forEach((function(t){var i=e.player_.el().querySelector(".vjs-marker[data-marker-key='"+t.key+"']"),a=e.options_.markerTip.time(t);(r||i.getAttribute("data-marker-time")!==a)&&(setMarkerElStyle(t,i),i.setAttribute("data-marker-time",a))})),this.sortMarkers()},a.removeMarkers=function(r){var e=this;this.breakOverlay_&&(this.overlayIndex_=-1,this.breakOverlay_.style.visibility="hidden"),this.currentMarkerIndex_=-1;var t=[];r.forEach((function(r){var i=e.markers[r];if(i){delete e.markersMap_[i.key],t.push(r);var a=e.player_.el().querySelector(".vjs-marker[data-marker-key='"+i.key+"']");a&&a.parentNode.removeChild(a)}})),t.reverse(),t.forEach((function(r){e.markers.splice(r,1)})),this.sortMarkers()},a.setMarkerElStyle=function(r,e){var i=this;e.className="vjs-marker "+(r.class||""),Object.keys(this.options_.markerStyle).forEach((function(r){e.style[r]=i.options_.markerStyle[r]}));var a=r.time/this.player_.duration();if((a<0||a>1)&&(e.style.display="none"),e.style.left=this.getPosition(r)+"%",r.duration)e.style.width=r.duration/this.player_.duration()*100+"%",e.style.marginLeft="0px";else{var s=t(e);e.style.marginLeft=s.width/2+"px"}},a.registerMarkerTipHandler=function(r){var e=this;r.addEventListener("mouseover",(function(){var i=e.markersMap_[r.getAttribute("data-marker-key")];if(e.markerTip_){e.options_.markerTip.html?e.markerTip_.querySelector(".vjs-tip-inner").innerHTML=e.options_.markerTip.html(i):e.markerTip_.querySelector(".vjs-tip-inner").innerText=e.options_.markerTip.text(i),e.markerTip_.style.left=e.getPosition(i)+"%";var a=t(e.markerTip_),s=t(r);e.markerTip_.style.marginLeft=-parseFloat(a.width/2)+parseFloat(s.width/4)+"px",e.markerTip_.style.visibility="visible"}})),r.addEventListener("mouseout",(function(){e.markerTip_&&(e.markerTip_.style.visibility="hidden")}))},a.initializeMarkerTip=function(){this.markerTip_=r.dom.createEl("div",{className:"vjs-tip",innerHTML:"<div class='vjs-tip-inner'></div>"}),this.player_.el().querySelector(".vjs-progress-holder").appendChild(this.markerTip_)},a.updateBreakOverlay=function(){if(this.options_.breakOverlay.display&&!(this.currentMarkerIndex_<0)){var r=this.player_.currentTime(),e=this.markers[this.currentMarkerIndex_],t=this.options_.markerTip.time(e),i=e.overlayText;r>=t&&r<=t+this.options_.breakOverlay.displayTime&&i?(this.overlayIndex_!==this.currentMarkerIndex_&&(this.overlayIndex_=this.currentMarkerIndex_,this.breakOverlay_&&(this.breakOverlay_.querySelector(".vjs-break-overlay-text").innerHTML=this.options_.breakOverlay.text(e))),this.breakOverlay_&&(this.breakOverlay_.style.visibility="visible")):(this.overlayIndex_=-1,this.breakOverlay_&&(this.breakOverlay_.style.visibility="hidden"))}},a.initializeOverlay=function(){var e=this;this.breakOverlay_=r.dom.createEl("div",{className:"vjs-break-overlay",innerHTML:"<div class='vjs-break-overlay-text'></div>"}),Object.keys(this.options_.breakOverlay.style).forEach((function(r){e.breakOverlay_&&(e.breakOverlay_.style[r]=e.options_.breakOverlay.style[r])})),this.player_.el().appendChild(this.breakOverlay_),this.overlayIndex_=-1},a.onUpdateMarker=function(){var r=this;if(this.markers.length){var e=function(e){return e<r.markers.length-1?r.options_.markerTip.time(r.markers[e+1]):r.player_.duration()},t=this.player_.currentTime(),i=-1;if(-1!==this.currentMarkerIndex_){var a=e(this.currentMarkerIndex_);if(t>=this.options_.markerTip.time(this.markers[this.currentMarkerIndex_])&&t<a)return;if(this.currentMarkerIndex_===this.markers.length-1&&t===this.player_.duration())return}if(t<this.options_.markerTip.time(this.markers[0]))i=-1;else for(var s=0;s<this.markers.length;s++){var n=e(s);if(t>=this.options_.markerTip.time(this.markers[s])&&t<n){i=s;break}}i!==this.currentMarkerIndex_&&(-1!==i&&this.player_.trigger("marker-reached",{index:i,marker:this.markers[i]}),this.currentMarkerIndex_=i)}},a.onTimeUpdate=function(){this.onUpdateMarker(),this.updateBreakOverlay()},a.initialize=function(){var r=this;this.options_.markerTip.display&&this.initializeMarkerTip(),this.removeAll(),this.addMarkers(this.options_.markers),this.options_.breakOverlay.display&&this.initializeOverlay(),this.onTimeUpdate(),this.player_.on("timeupdate",(function(){return r.onTimeUpdate()})),this.player_.off("loadedmetadata")},a.getMarkers=function(){return this.markers},a.next=function(){for(var r=this.player_.currentTime(),e=0;e<this.markers.length;e++){var t=this.options_.markerTip.time(this.markers[e]);if(t>r){this.player_.currentTime(t);break}}},a.prev=function(){for(var r=this.player_.currentTime(),e=this.markers.length-1;e>=0;e--){var t=this.options_.markerTip.time(this.markers[e]);if(t+.5<r)return void this.player_.currentTime(t)}},a.add=function(r){this.addMarkers(r)},a.remove=function(r){this.removeMarkers(r)},a.removeAll=function(){for(var r=[],e=0;e<this.markers.length;e++)r.push(e);this.removeMarkers(r)},a.updateTime=function(r){this.updateMarkers(r)},a.reset=function(r){this.removeAll(),addMarkers(r)},a.destroy=function(){this.removeAll(),this.breakOverlay_&&this.breakOverlay_.remove(),this.markerTip_&&this.markerTip_.remove(),this.player_.off("timeupdate",this.updateBreakOverlay),this.player_.off("timeupdate",this.onTimeUpdate),delete this.player_.marker},i}();r.registerPlugin("setMarkers",(function(r){var e=this.player_;e.markers=new i(e,r)})),r.hook("setup",(function(r){var e=r.options_.markerOptions;r.setMarkers(e)}));