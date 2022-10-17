import videojs from "video.js";
const Component = videojs.getComponent('Component');

export default class MarkerBreakOverlay extends Component {
  constructor(player, options) {
    this.breakOverlay = null
    this.overlayIndex = NULL_INDEX
    this.player = player
    this.options = options
  }

  createEl() {
    if (this.options.breakOverlay.display) {
      this.initializeOverlay();
    }
  }

  initializeOverlay() {
    this.breakOverlay = videojs.dom.createEl('div', {
      className: 'vjs-break-overlay',
      innerHTML: "<div class='vjs-break-overlay-text'></div>"
    });
    Object.keys(this.options.breakOverlay.style).forEach(key => {
      if (this.breakOverlay) {
        this.breakOverlay.style[key] = this.options.breakOverlay.style[key];
      }
    });
    this.player.el().appendChild(this.breakOverlay);
    this.overlayIndex = NULL_INDEX;
  }

  updateBreakOverlay() {
    if (!this.options.breakOverlay.display || this.currentMarkerIndex < 0) {
      return;
    }

    const currentTime = this.player.currentTime();
    const marker = this.markers[this.currentMarkerIndex];
    const markerTime = this.options.markerTip.time(marker);

    if (
      currentTime >= markerTime &&
      currentTime <= (markerTime + this.options.breakOverlay.displayTime)
    ) {
      if (this.overlayIndex !== this.currentMarkerIndex) {
        this.overlayIndex = this.currentMarkerIndex;
        if (this.breakOverlay) {
          this.breakOverlay.querySelector('.vjs-break-overlay-text').innerHTML = setting.breakOverlay.text(marker);
        }
      }

      if (this.breakOverlay) {
        this.breakOverlay.style.visibility = "visible";
      }
    } else {
      this.overlayIndex = NULL_INDEX;
      if (this.breakOverlay) {
        this.breakOverlay.style.visibility = "hidden";
      }
    }
  }
}