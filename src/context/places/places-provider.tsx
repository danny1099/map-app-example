import { useReducer, useEffect } from 'react';
import { PlacesContext, placesReducer } from '@/context';
import { getUserLocation } from '@/helpers';
import { Props, PlacesResponse, Feature } from '@/interfaces';
import { searchApi } from '@/apis';

export interface Places {
  isLoading: boolean;
  userLocation: [number, number];
  places_response?: Feature[];
}

const INITIAL_STATE: Places = {
  isLoading: true,
  userLocation: [0, 0],
  places_response: [],
};

export function PlacesProvider({ children }: Props) {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((data) => {
      dispatch({ type: 'user_location', payload: data });
    });
  }, []);

  const searchPlacesByQuery = async (query: string) => {
    if (query.length === 0) {
      dispatch({ type: 'place_response', payload: [] });
      return;
    }

    /* Realiza la peticion a la url de mapbox */
    searchApi
      .get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: state.userLocation?.join(','),
          country: 'co',
        },
      })
      .then((res) => {
        dispatch({ type: 'place_response', payload: res.data.features });
      });
  };

  return (
    <PlacesContext.Provider value={{ ...state, searchPlacesByQuery }}>
      {children}
    </PlacesContext.Provider>
  );
}
