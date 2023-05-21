import { useReducer, useEffect } from 'react';
import { PlacesContext, placesReducer } from '@/context';
import { getUserLocation } from '@/helpers';
import { Props } from '@/interfaces';

export interface Places {
  isLoading: boolean;
  userLocation?: [number, number];
}

const INITIAL_STATE: Places = {
  isLoading: true,
  userLocation: undefined,
};

export function PlacesProvider({ children }: Props) {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((data) => {
      dispatch({ type: 'user_location', payload: data });
    });
  }, []);

  return (
    <PlacesContext.Provider value={{ ...state }}>
      {children}
    </PlacesContext.Provider>
  );
}
