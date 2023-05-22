import { Places } from '@/context';
import { Feature } from '@/interfaces';

type PlacesAction =
  | { type: 'user_location'; payload: [number, number] }
  | { type: 'place_response'; payload: Feature[] };

export const placesReducer = (state: Places, action: PlacesAction): Places => {
  switch (action.type) {
    case 'user_location':
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };

    case 'place_response':
      return {
        ...state,
        places_response: action.payload,
      };

    default:
      return state;
  }
};
