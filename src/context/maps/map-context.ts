import {createContext} from 'react'
import { Map } from 'mapbox-gl'

interface MapProps {
  isMapReady: boolean,
  map?: Map,
  setMap: (map: Map) => void
}

export const MapContext = createContext({} as MapProps)