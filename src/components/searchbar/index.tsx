import { useRef, ChangeEvent } from 'react';
import css from './search-bar.module.css';
import { usePlacesContext } from '@/hooks';
import { SearchResults } from '@/components';

export function SearchBar() {
  const debouncerRef = useRef<NodeJS.Timeout>();
  const { searchPlacesByQuery } = usePlacesContext();

  const onQueryChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    debouncerRef.current && clearTimeout(debouncerRef.current);

    /* Vuelve a generar el timeout del debounce */
    debouncerRef.current = setTimeout(() => {
      /* realizar el llamado a la api */
      searchPlacesByQuery(e.target.value);
    }, 400);
  };

  return (
    <>
      <div className={css.container}>
        <input
          type='text'
          placeholder='Buscar lugar en el mapa'
          className='input-search'
          onChange={onQueryChanged}
        />
      </div>
      <SearchResults />
    </>
  );
}
