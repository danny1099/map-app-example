import { createContext } from 'react';
import { Map, Marker } from 'mapbox-gl';

interface MapProps {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
  setMap: (map: Map) => void;
  getRouteByPoints: (
    start: [number, number],
    end: [number, number]
  ) => Promise<void>;
}

export const MapContext = createContext({} as MapProps);
