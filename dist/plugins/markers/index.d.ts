declare module 'video.js' {
  export interface Marker {
    key: string;
    time: number;
    duration: number;
    text?: string;
    class?: string;
    overlayText?: string;
  }

  export interface MarkersPlugin {
    getMarker(): Marker[];
    next(): void;
    prev(): void;
    add(markers: Marker[]): void;
    remove(indexArray: number[]): void;
    removeAll(): void;
    updateTime(force: boolean): void;
    reset(markers: Marker[]): void;
    destroy(): void;
  }
  interface VideoJSPlayerOptions {
    markerOptions?: {
      markerStyle: Record<string, string>;
      markerTip: {
        display: boolean;
        text(): string;
        time(): string;
      };
      breakOverlay: {
        display: boolean;
        displayTime: number;
        style: Record<string, string>;
        text(): string;
      };
      markers: Marker[];
    };
  }

  export type MarkerClickListener = (event: Event, data: Marker) => void;

  export type MarkerReachedListener = (event: Event, data: {index: number, marker: Marker}) => void;

  interface VideoJsPlayer {
    markers: MakersPlugin;

    on(type: 'marker-click', listener?: MarkerClickListener): void;
    on(type: 'marker-reached', listener?: MarkerReachedListener): void;
  }
}
