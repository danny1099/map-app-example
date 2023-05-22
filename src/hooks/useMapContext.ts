import { MapContext } from '@/context';
import { useContext } from 'react';

export function useMapContext() {
  const { setMap, map, getRouteByPoints } = useContext(MapContext);

  return { setMap, map, getRouteByPoints };
}
