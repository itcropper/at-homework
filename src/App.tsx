

import { useState, useRef } from "react"
import logo from './assets/logo.svg';
import './App.css';
import { BRAND, VIEW } from './constants';
import { DisplayToggle } from './components/DisplayToggle';
import { Map } from './components/Map'
import { ResultCard } from './components/ResultCard';
import { Filter } from './components/Filter';
import { useEffect } from "react";
import { IResultInfo } from './Interfaces'
import { SearchService } from "./components/SearchService";
import { loadGoogleScripts, getLocation, useWindowSize } from './utilities';
import { Marker } from './components/Marker'

const LOCAL_STORAGE_KEY = "AT_Favorite_Places";
const smallScreenMax = 768;

function App() {

  const size = useWindowSize();
  const [view, setView] = useState(VIEW.LIST);
  const [results, setResults] = useState<IResultInfo[]>([]);
  const [queryText, setQueryText] = useState('');
  const [map, setMap] = useState<google.maps.Map>();
  const [scriptsReady, setScriptsReady] = useState(false);
  const [coordinates, setCoordinates] = useState<{ latitude: number, longitude: number, radius?: number }>();
  const [favorites, setFavorites] = useState<{ [place_id: string | number]: boolean }>(() => {
    const lsFavorites = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (lsFavorites) {
      return JSON.parse(lsFavorites);
    }
    return {};
  })

  const inforWindoRef = useRef<google.maps.InfoWindow>();



  useEffect(() => {
    loadGoogleScripts(() => setScriptsReady(true))

    getLocation(response => {
      setCoordinates({ latitude: response.coords.latitude, longitude: response.coords.longitude })
    }, console.log);

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

  return (
    <div className={`App overflow-y-hidden h-min-screen bg-gray-100 h-screen `}>
      <nav className="bg-white h-32 fixed md:block md:h-20 w-full shadow z-10">
        <div className="flex items-center flex-col md:flex-row md:justify-between">
          <img src={logo} className="h-8 my-6" alt="logo" />
          <div className="w-11/12 md:mr-8 md:w-80">
            <Filter onFilter={setQueryText} />
          </div>
        </div>

      </nav>
      <SearchService onRequestFulfilled={setResults} map={map} query={queryText} coordinates={coordinates} />
      <main className="pt-32 md:pt-18 md:flex md:flex-row">

        <div className={view === VIEW.LIST || size.width! >= smallScreenMax ? 'block md:w-96 md:overflow-y-auto md:relative' : 'hidden'}>
          <div className="flex flex-col items-center w-full md:absolute">
            <div className="result-container pt-4 md:pt-0 w-full flex  max-w-lg justify-center flex-col items-center">
              {
                results.map((place, i) => <ResultCard key={i} businessInfo={place} isFavorite={favorites[place.place_id]} onFavoritesChanged={updateFavorites} />)
              }
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
                coordinates={coordinates && { lat: result.geometry.location.lat(), lng: result.geometry.location.lng(), }}
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

console.log("%cThis is a green text", "color:"+BRAND.Primary);


export default App;
