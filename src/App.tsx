

import { useState, useRef, useEffect } from "react"
import logo from './assets/logo.svg';
import './App.css';
import { DisplayToggle, Map, ResultCard, Filter, SearchService, Marker } from "./components";
import { VIEW , LOCAL_STORAGE_KEY, smallScreenMax} from './constants';
import { loadGoogleScripts, getLocation, useWindowSize } from './utilities';

function App() {

  const size = useWindowSize();
  const inforWindoRef = useRef<google.maps.InfoWindow>();

  const [view, setView] = useState(VIEW.LIST);
  const [results, setResults] = useState<google.maps.places.PlaceResult[]>([]);
  const [queryText, setQueryText] = useState('');
  const [map, setMap] = useState<google.maps.Map>();
  const [scriptsReady, setScriptsReady] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number, lng: number, radius?: number }>();
  const [favorites, setFavorites] = useState<{ [place_id: string | number]: boolean }>(() => {
    const lsFavorites = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (lsFavorites) {
      return JSON.parse(lsFavorites);
    }
    return {};
  })

  

  useEffect(() => {
    loadGoogleScripts(() => setScriptsReady(true))

    getLocation(response => {
        setCoordinates({ lat: response.coords.latitude, lng: response.coords.longitude })
      }, 
      console.warn);

    return () => { }
  }, []);

  useEffect(() => {
    if (scriptsReady) {
      inforWindoRef.current = new google.maps.InfoWindow();
    }
  }, [scriptsReady])

  const updateFavorites = (id: string | number, newValue: boolean) => {
    const updatedFavorites = {...favorites};
    if (!newValue) {
      delete updatedFavorites[id];
    } else {
      updatedFavorites[id] = newValue;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  }

  useEffect(() => {

  }, [queryText])

  const search = (text: string) => {
    const center = map?.getCenter();

    setQueryText(text);
    setCoordinates({
      lat: center?.lat()!,
      lng: center?.lng()!
    })
  }

  /** Render */
  return (
    <div className={`App overflow-y-hidden h-min-screen bg-gray-100 h-screen`}>
      <nav className="bg-white h-32 fixed md:block md:h-20 w-full shadow z-10">
        <div className="flex items-center flex-col md:flex-row md:justify-between">
          <img src={logo} className="h-8 my-6" alt="logo" />
          <div className="w-11/12 md:mr-8 md:w-80">
            <Filter onFilter={search} />
          </div>
        </div>
      </nav>

      <SearchService onRequestFulfilled={setResults} map={map} query={queryText} centeredAround={coordinates} />
      <main className="pt-32 md:pt-18 md:flex md:flex-row">

        <div className={view === VIEW.LIST || size.width! >= smallScreenMax ? 'block md:w-96 md:overflow-y-auto md:relative' : 'hidden'}>
          <div className="flex flex-col items-center w-full md:absolute">
            <div className="result-container pt-4 md:pt-0 w-full flex  max-w-lg justify-center flex-col items-center">
              {
                results.map((place, i) => <ResultCard key={i} businessInfo={place} isFavorite={favorites[place.place_id!]} onFavoritesChanged={updateFavorites} />)
              }
              {results.length === 0 && map != null && <div className="">No Results. Try looking for something else.</div> }
            </div>
          </div>
        </div>

        <div className={`${view === VIEW.MAP || size.width! >= smallScreenMax ? 'block ' : 'hidden'} md:flex-grow`}>

          <Map scriptsReady={scriptsReady} onMapLoaded={setMap} coordinates={coordinates}  > </Map>
          {map &&
            results.map(
              result => <Marker
                key={result.place_id}
                infoWindow={inforWindoRef.current}
                map={map}
                data={result} />)
          }
        </div>

        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 translate-y-1/2 block md:hidden">
          <DisplayToggle view={VIEW.MAP} onUpdate={setView} />
        </div>
      </main>

    </div>
  );
}




export default App;
