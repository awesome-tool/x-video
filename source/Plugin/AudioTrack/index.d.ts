import videojs, { VideoJsPlayer } from 'video.js';

declare module 'video.js' {
  export interface Audio {
    id: string;
    kind: string;
    label: string;
    language: string;
    index: number;
    track: AudioTrack;
  }

  export interface AudioPlugin extends videojs.Plugin {
    track: AudioTrack;
    values(): AudioTrack[];
    pick(index: number): AudioPlugin;
  }

  export type BeforeAudioSetupListener = (event: Event, data: Audio[]) => void;

  export type AudioListener = (event: Event, data: Audio[]) => void;

  export type AudioChangeListener = (event: Event, data: Audio) => void;

  interface VideoJsPlayer {
    audio: () => AudioPlugin;
    one(type: 'audio', listener?: AudioListener): void;
    one(type: 'audio-change', listener?: AudioChangeListener): void;
    one(type: 'before-audio-setup', listener?: AudioChangeListener): void;
  }
}
