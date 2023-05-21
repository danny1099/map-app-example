import { useMapContext, usePlacesContext } from '@/hooks';
import { useLayoutEffect, useRef } from 'react';
import { Map } from 'mapbox-gl';
import css from './mapview.module.css';

export function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const { isLoading, userLocation } = usePlacesContext();
  const { setMap } = useMapContext();

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: userLocation,
        zoom: 14,
      });

      /* Actualiza el mapa en el contexto global */
      setMap(map);
    }
  }, [isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <div className={css.map} ref={mapContainer}></div>;
}
