import videojs from 'video.js';

declare module 'video.js' {
  export interface MarkersPlugin extends videojs.Plugin {}
  export interface Marker {
    time: number;
    duration: number;
    text?: string;
    class?: string;
    overlayText?: string;
    key: string;
  }
  interface VideoJSPlayerOptions {
    qualities?: Quality[];
  }
}
