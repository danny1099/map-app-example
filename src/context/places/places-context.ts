import { Feature } from '@/interfaces';
import { createContext } from 'react';

export interface ContextProps {
  isLoading: boolean;
  userLocation: [number, number];
  places_response?: Feature[];
  searchPlacesByQuery: (query: string) => void;
}

export const PlacesContext = createContext({} as ContextProps);
