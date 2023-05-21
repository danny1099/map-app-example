import { Places } from "@/context";

type PlacesAction = {
  type: 'user_location',
  payload: [number, number]
}

export const placesReducer = (state: Places, action: PlacesAction): Places => {
  switch (action.type) {
    case 'user_location':
        return {
          ...state,
          isLoading: false,
          userLocation: action.payload
        }
    
        default: 
          return state
  }
}