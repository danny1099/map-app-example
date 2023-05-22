import { useContext } from 'react';
import { PlacesContext } from '@/context';

export function usePlacesContext() {
  const { isLoading, userLocation, searchPlacesByQuery, places_response } =
    useContext(PlacesContext);
  return { isLoading, userLocation, searchPlacesByQuery, places_response };
}
