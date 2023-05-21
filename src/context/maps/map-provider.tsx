import { useReducer } from 'react';
import { MapContext, MapReducer } from '@/context';
import { Props } from '@/interfaces';
import { Map, Marker } from 'mapbox-gl';
import { Popup } from 'mapbox-gl';

export interface MapState {
  isMapReady: boolean;
  map?: Map;
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
};

export function MapProvider({ children }: Props) {
  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);

  const setMap = (map: Map) => {
    /* Crea el marcador para inicializar en el mapa */
    new Marker({ color: '#303030', scale: 0.5 })
      .setLngLat(map.getCenter())
      .addTo(map);

    dispatch({ type: 'setMap', payload: map });
  };

  return (
    <MapContext.Provider value={{ ...state, setMap }}>
      {children}
    </MapContext.Provider>
  );
}
