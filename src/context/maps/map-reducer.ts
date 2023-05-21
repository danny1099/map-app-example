import { Map } from "mapbox-gl";
import { MapState } from "./map-provider";

type MapActions = {
  type: 'setMap',
  payload: Map
}
 

export const MapReducer = (state: MapState, action: MapActions): MapState => {
  switch (action.type) {
    case 'setMap': 
      return {
        ...state,
        isMapReady: true,
        map: action.payload
      }

    default: 
      return state
  }
}