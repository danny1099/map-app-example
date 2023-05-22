import { useMapContext, usePlacesContext } from '@/hooks';
import { useState } from 'react';
import { Feature } from '@/interfaces';
import css from './search-result.module.css';

export function SearchResults() {
  const { places_response, userLocation } = usePlacesContext();
  const { getRouteByPoints, map } = useMapContext();
  const [show, setShow] = useState(true);

  if (places_response?.length === 0 || !show) {
    return <></>;
  }

  const onPlaceClicked = (place: Feature) => {
    const [lng, lat] = place.center;
    map?.flyTo({
      zoom: 10,
      center: [lng, lat],
    });
  };

  const createRouteByPoints = (place: Feature) => {
    const [lng, lat] = place.center;
    getRouteByPoints(userLocation, [lng, lat]);
  };

  return (
    <div className={css.container}>
      <button onClick={() => setShow(false)}>x</button>
      <ul>
        {places_response?.map((place) => {
          return (
            <li key={place.id} onClick={() => onPlaceClicked(place)}>
              <h6>{place.text}</h6>
              <span>{place.place_name}</span>
              <button onClick={() => createRouteByPoints(place)}>Ir a</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
