import { PlacesProvider, MapProvider } from '@/context';
import { Home } from '@/pages';

function App() {
  return (
    <main>
      <PlacesProvider>
        <MapProvider>
          <Home />
        </MapProvider>
      </PlacesProvider>
    </main>
  );
}

export default App;
