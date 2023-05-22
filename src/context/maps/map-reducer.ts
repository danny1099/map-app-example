import { Map, Marker } from 'mapbox-gl';
import { MapState } from './map-provider';

type MapActions =
  | { type: 'setMap'; payload: Map }
  | { type: 'setMaker'; payload: Marker[] };

export const MapReducer = (state: MapState, action: MapActions): MapState => {
  switch (action.type) {
    case 'setMap':
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      };
    case 'setMaker':
      return {
        ...state,
        markers: action.payload,
      };

    default:
      return state;
  }
};
