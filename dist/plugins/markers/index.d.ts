import videojs from 'video.js';

declare module 'video.js' {
  export interface MarkersPlugin extends videojs.Plugin {}

}
