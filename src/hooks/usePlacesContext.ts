import {useContext} from 'react'
import {PlacesContext} from '@/context'

export function usePlacesContext() {
  const {isLoading, userLocation } = useContext(PlacesContext)
  return {isLoading, userLocation }
}
