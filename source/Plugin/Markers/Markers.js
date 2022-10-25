import videojs from 'video.js';
import './Markers.scss'

const NULL_INDEX = -1;
const DEFAULT_MARKERS_SETTING = {
  markerStyle: {
    'width': '7px',
    'border-radius': '30%',
    'background-color': 'red',
    'top': '0em'
  },
  markerTip: {
    display: true,
    text: (marker) => {
      return marker.text;
    },
    time: (marker) => {
      return marker.time;
    },
  },
  breakOverlay: {
    display: true,
    displayTime: 3,
    text: (marker) => {
      return "Break overlay: " + marker.overlayText;
    },
    style: {
      'width': '100%',
      'height': '20%',
      'background-color': 'rgba(0,0,0,0.7)',
      'color': 'white',
      'font-size': '17px',
    },
  },
  markers: [],
};

const generateUUID = () => {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};

const getElementBounding = (element) => {
  let elementBounding;
  const defaultBoundingRect = {
    top: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
    right: 0
  };

  try {
    elementBounding = element.getBoundingClientRect();
  } catch (e) {
    elementBounding = defaultBoundingRect;
  }

  return elementBounding;
}

class Markers {
  constructor(player, options = {}) {
    this.player_ = player
    this.options_ = videojs.mergeOptions(DEFAULT_MARKERS_SETTING, options)
    this.markersMap_ = {}
    this.currentMarkerIndex_ = NULL_INDEX
    this.markerTip_ = null
    this.breakOverlay_ = null
    this.overlayIndex_ = NULL_INDEX
    this.markers = []

    this.player_.on("loadedmetadata", () => {
      this.initialize();
    });
  }

  sortMarkers() {
    this.markers.sort((a, b) => {
      return this.options_.markerTip.time(a) - this.options_.markerTip.time(b)
    })
  }

  getPosition(marker) {
    return this.options_.markerTip.time(marker) / this.player_.duration() * 100
  }

  addMarkers(list) {
    if(Array.isArray(list)) {
      list.forEach(marker => {
        marker.key = generateUUID()
        const element = this.createMarkerEl(marker)
        this.player_.el().querySelector('.vjs-progress-holder').appendChild(element)
        this.markersMap_[marker.key] = marker
        this.markers.push(marker)
      });
      this.sortMarkers()
    }
  }

  createMarkerEl(marker) {

    const markerEl = videojs.dom.createEl('div', {}, {
      'data-marker-key': marker.key,
      'data-marker-time': this.options_.markerTip.time(marker)
    });

    this.setMarkerElStyle(marker, markerEl);

    // bind click event to seek to marker time
    markerEl.addEventListener('click', () => {
      const key = markerEl.getAttribute('data-marker-key');
      this.player_.currentTime(this.options_.markerTip.time(this.markersMap_[key]));
      this.player_.trigger('marker-click', marker)
    });

    if (this.options_.markerTip.display) {
      this.registerMarkerTipHandler(markerEl);
    }
    return markerEl
  }

  updateMarkers(force) {

    this.markers.forEach((marker) => {
      const element = this.player_.el().querySelector(".vjs-marker[data-marker-key='" + marker.key + "']");
      const markerTime = this.options_.markerTip.time(marker);

      if (force || !element || element.getAttribute('data-marker-time') !== markerTime) {
        this.setMarkerElStyle(marker, element);
        element.setAttribute('data-marker-time', markerTime);
      }
    });
    this.sortMarkers();
  }

  removeMarkers(indexArray) {
    // reset overlay
    if (!!this.breakOverlay_) {
      this.overlayIndex_ = NULL_INDEX;
      this.breakOverlay_.style.visibility = "hidden";
    }
    this.currentMarkerIndex_ = NULL_INDEX;

    let deleteIndexList = [];
    indexArray.forEach((index) => {
      let marker = this.markers[index];
      if (marker) {
        // delete from memory
        delete this.markersMap_[marker.key];
        deleteIndexList.push(index);

        // delete from dom
        let el = this.player_.el().querySelector(".vjs-marker[data-marker-key='" + marker.key + "']");
        el && el.parentNode.removeChild(el);
      }
    });

    // clean up markers array
    deleteIndexList.reverse();
    deleteIndexList.forEach((deleteIndex) => {
      this.markers.splice(deleteIndex, 1);
    });

    // sort again
    this.sortMarkers();
  }

  setMarkerElStyle(marker, element) {
    element.className = `vjs-marker ${marker.class || ""}`;

    Object.keys(this.options_.markerStyle).forEach(key => {
      element.style[key] = this.options_.markerStyle[key];
    });

    const ratio = marker.time / this.player_.duration();
    if (ratio < 0 || ratio > 1) {
      element.style.display = 'none';
    }

    element.style.left = this.getPosition(marker) + '%';
    if (marker.duration) {
      element.style.width = (marker.duration / this.player_.duration()) * 100 + '%';
      element.style.marginLeft = '0px';
    } else {
      const markerDivBounding = getElementBounding(element);
      element.style.marginLeft = markerDivBounding.width / 2 + 'px';
    }
  }

  registerMarkerTipHandler(element) {
    element.addEventListener('mouseover', () => {
      const marker = this.markersMap_[element.getAttribute('data-marker-key')];
      if (!!this.markerTip_) {
        if (this.options_.markerTip.html) {
          this.markerTip_.querySelector('.vjs-tip-inner').innerHTML = this.options_.markerTip.html(marker);
        } else {
          this.markerTip_.querySelector('.vjs-tip-inner').innerText = this.options_.markerTip.text(marker);
        }
        this.markerTip_.style.left = this.getPosition(marker) + '%';
        const markerTipBounding = getElementBounding(this.markerTip_);
        const markerDivBounding = getElementBounding(element);
        const markerInnerBounding = getElementBounding(this.markerTip_.querySelector('.vjs-tip-inner'));
        this.markerTip_.style.marginLeft =
          -parseFloat(markerTipBounding.width / 2) + parseFloat(markerDivBounding.width / 4) + 'px';
        this.markerTip_.style.top = - parseFloat(markerInnerBounding.height) - 10 + 'px';
        this.markerTip_.style.visibility = 'visible';
      }
    });

    element.addEventListener('mouseout', () => {
      if (!!this.markerTip_) {
        this.markerTip_.style.visibility = "hidden";
      }
    });
  }

  initializeMarkerTip() {
    this.markerTip_ = videojs.dom.createEl('div', {
      className: 'vjs-tip',
      innerHTML: "<div class='vjs-tip-inner'></div>",
    });
    this.player_.el().querySelector('.vjs-progress-holder').appendChild(this.markerTip_);
  }

  updateBreakOverlay() {
    if (!this.options_.breakOverlay.display || this.currentMarkerIndex_ < 0) {
      return;
    }

    const currentTime = this.player_.currentTime();
    const marker = this.markers[this.currentMarkerIndex_];
    const markerTime = this.options_.markerTip.time(marker);
    const isShowText = marker.overlayText

    if (
      currentTime >= markerTime &&
      currentTime <= (markerTime + this.options_.breakOverlay.displayTime)
      && isShowText
    ) {
      if (this.overlayIndex_ !== this.currentMarkerIndex_) {
        this.overlayIndex_ = this.currentMarkerIndex_;
        if (this.breakOverlay_) {
          this.breakOverlay_.querySelector('.vjs-break-overlay-text').innerHTML = this.options_.breakOverlay.text(marker);
        }
      }

      if (this.breakOverlay_) {
        this.breakOverlay_.style.visibility = "visible";
      }
    } else {
      this.overlayIndex_ = NULL_INDEX;
      if (this.breakOverlay_) {
        this.breakOverlay_.style.visibility = "hidden";
      }
    }
  }

  initializeOverlay() {
    this.breakOverlay_ = videojs.dom.createEl('div', {
      className: 'vjs-break-overlay',
      innerHTML: "<div class='vjs-break-overlay-text'></div>"
    });
    Object.keys(this.options_.breakOverlay.style).forEach(key => {
      if (this.breakOverlay_) {
        this.breakOverlay_.style[key] = this.options_.breakOverlay.style[key];
      }
    });
    this.player_.el().appendChild(this.breakOverlay_);
    this.overlayIndex_ = NULL_INDEX;
  }

  onUpdateMarker() {
    if (!this.markers.length) {
      return;
    }

    const getNextMarkerTime = (index) => {
      if (index < this.markers.length - 1) {
        return this.options_.markerTip.time(this.markers[index + 1]);
      }
      // next marker time of last marker would be end of video time
      return this.player_.duration();
    }
    let currentTime = this.player_.currentTime();
    let newMarkerIndex = NULL_INDEX;

    if (this.currentMarkerIndex_ !== NULL_INDEX) {
      let nextMarkerTime = getNextMarkerTime(this.currentMarkerIndex_);
      if (
        currentTime >= this.options_.markerTip.time(this.markers[this.currentMarkerIndex_]) &&
        currentTime < nextMarkerTime
      ) {
        return;
      }

      // check for ending (at the end current time equals player duration)
      if (
        this.currentMarkerIndex_ === this.markers.length - 1 &&
        currentTime === this.player_.duration()
      ) {
        return;
      }
    }

    // check first marker, no marker is selected
    if (currentTime < this.options_.markerTip.time(this.markers[0])) {
      newMarkerIndex = NULL_INDEX;
    } else {
      // look for new index
      for (let i = 0; i < this.markers.length; i++) {
        let nextMarkerTime = getNextMarkerTime(i);
        if (
          currentTime >= this.options_.markerTip.time(this.markers[i]) &&
          currentTime < nextMarkerTime
        ) {
          newMarkerIndex = i;
          break;
        }
      }
    }

    if (newMarkerIndex !== this.currentMarkerIndex_) {
      if (newMarkerIndex !== NULL_INDEX) {
        this.player_.trigger('marker-reached', { index: newMarkerIndex, marker: this.markers[newMarkerIndex] })
        // this.options_.onMarkerReached(this.markers[newMarkerIndex], newMarkerIndex);
      }
      this.currentMarkerIndex_ = newMarkerIndex;
    }
  }

  onTimeUpdate() {
    this.onUpdateMarker();
    this.updateBreakOverlay();
    // this.options_.onTimeUpdateAfterMarkerUpdate && this.options_.onTimeUpdateAfterMarkerUpdate();
  }

  initialize() {
    if (this.options_.markerTip.display) {
      this.initializeMarkerTip();
    }

    this.removeAll();
    this.addMarkers(this.options_.markers);

    if (this.options_.breakOverlay.display) {
      this.initializeOverlay();
    }
    this.onTimeUpdate();
    this.player_.on("timeupdate", () => this.onTimeUpdate());
    this.player_.off("loadedmetadata");
  }


  // expose API

  getMarkers() {
    return this.markers
  }
  next() {
    const currentTime = this.player_.currentTime();
    for (let i = 0; i < this.markers.length; i++) {
      const markerTime = this.options_.markerTip.time(this.markers[i]);
      if (markerTime > currentTime) {
        this.player_.currentTime(markerTime);
        break;
      }
    }
  }
  prev() {
    const currentTime = this.player_.currentTime();
    for (let i = this.markers.length - 1; i >= 0; i--) {
      const markerTime = this.options_.markerTip.time(this.markers[i]);
      // add a threshold
      if (markerTime + 0.5 < currentTime) {
        this.player_.currentTime(markerTime);
        return;
      }
    }
  }

  add(list) {
    this.addMarkers(list);
  }

  remove(indexArray) {
    this.removeMarkers(indexArray);
  }

  removeAll() {
    const indexArray = [];
    for (var i = 0; i < this.markers.length; i++) {
      indexArray.push(i);
    }
    this.removeMarkers(indexArray);
  }

  updateTime(force) {
    this.updateMarkers(force);
  }

  reset(list) {
    this.removeAll();
    this.addMarkers(list);
  }

  destroy() {
    this.removeAll();
    this.breakOverlay_ && this.breakOverlay_.remove();
    this.markerTip_ && this.markerTip_.remove();
    this.player_.off("timeupdate", this.updateBreakOverlay);
    this.player_.off("timeupdate", this.onTimeUpdate)
    delete this.player_.marker;
  }
}

videojs.registerPlugin('setMarkers', function(markerOptions) {
  this.player_.markers = new Markers(this.player_, markerOptions)
});

videojs.hook('setup', vjsPlayer => {
  const { markerOptions } = vjsPlayer.options_;
  vjsPlayer.setMarkers(markerOptions);
});