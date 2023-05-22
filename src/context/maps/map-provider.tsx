import { useReducer, useEffect } from 'react';
import { MapContext, MapReducer } from '@/context';
import { Props } from '@/interfaces';
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';
import { usePlacesContext } from '@/hooks';
import { addressApi } from '@/apis';
import { AddressResponse } from '@/interfaces/address-response';

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

export function MapProvider({ children }: Props) {
  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);
  const { places_response } = usePlacesContext();

  useEffect(() => {
    if (places_response?.length === 0) return;

    /* Remueve todos los marcadores del mapa */
    state.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];

    for (const place of places_response!) {
      const [lng, lat] = place.center;
      const popup = new Popup().setText(place.place_name);
      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!);

      newMarkers.push(newMarker);
      dispatch({ type: 'setMaker', payload: newMarkers });
    }
  }, [places_response]);

  const setMap = (map: Map) => {
    /* Crea el marcador para inicializar en el mapa */
    new Marker({ color: '#303030', scale: 0.5 })
      .setLngLat(map.getCenter())
      .addTo(map);

    dispatch({ type: 'setMap', payload: map });
  };

  const getRouteByPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    addressApi
      .get<AddressResponse>(`/${start.join(',')};${end.join(',')}`)
      .then((res) => {
        console.log(res.data);
        const { coordinates } = res.data.routes[0].geometry;

        /* Contenedor de puntos y posicion del mapa */
        const bounds = new LngLatBounds(start, start);

        for (const coord of coordinates) {
          const newCoord: [number, number] = [coord[0], coord[1]];
          bounds.extend(newCoord);
        }

        state.map?.fitBounds(bounds, {
          padding: 100,
        });

        /* Remueve la polyline del mapa si existe */
        if (state.map?.getLayer('routeString')) {
          state.map.removeLayer('routeString').removeSource('routeString');
        }

        /* dibuja la Polyline del mapa */
        const sourceData: AnySourceData = {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: coordinates,
                },
              },
            ],
          },
        };

        state.map?.addSource('routeString', sourceData).addLayer({
          id: 'routeString',
          type: 'line',
          source: 'routeString',
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
          },
          paint: {
            'line-color': 'black',
            'line-width': 2,
          },
        });
      });
  };

  return (
    <MapContext.Provider value={{ ...state, setMap, getRouteByPoints }}>
      {children}
    </MapContext.Provider>
  );
}
