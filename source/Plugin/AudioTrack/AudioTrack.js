import videojs from 'video.js';
import './AudioTrackSettingItem';

class audio extends videojs.getPlugin('plugin') {
  constructor(player, options = {}) {
    super(player, options);

    this.track = this.values().find(track => track.enabled);

    // I am worried about audio changed by other factor
    // So also listen on `audio-change` and update the value
    player.on('audio-change', (_, { index }) => {
      this.track = this.values()[index];
    });
  }

  values() {
    const tracks = this.player.audioTracks();
    const result = [];

    for (let i = 0; i < tracks.length; i++) {
      result.push(tracks[i]);
    }

    return result;
  }

  pick(index) {
    const values = this.values();
    const newAudio = values[index];

    if (newAudio) {
      this.track.enabled = false;
      this.track = newAudio;

      newAudio.enabled = true;
    }
  }
}

videojs.registerPlugin('audio', audio);
