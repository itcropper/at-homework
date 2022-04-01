
import { FC, HTMLAttributes, useRef, useState, useEffect, useContext } from "react";

interface IMapProps {
    onMapLoaded: (map: google.maps.Map) => void,
    //onMapInitialized: (googleMaps: google.maps.Map) => void,
    // onZoom: (coordinates: {latitude: number, longitude: number, radius?: number}) => void,
    coordinates: { latitude: number, longitude: number } | undefined,
    scriptsReady: boolean
}

export const Map: FC<IMapProps> = (props: IMapProps) => {

    const mapRef = useRef<HTMLDivElement | null>(null);
    const map = useRef<google.maps.Map>();
    const { coordinates, onMapLoaded, scriptsReady } = props;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (coordinates && scriptsReady) {

            const coords = new google.maps.LatLng(
                coordinates.latitude,
                coordinates.longitude
            )

            map.current = new google.maps.Map(mapRef.current!, {
                center: coords,
                zoom: 13,
                disableDefaultUI: true,
            });

            map.current?.getBounds()
            setIsLoading(false);
            onMapLoaded(map.current);
            
        }
    }, [coordinates, scriptsReady]);


    return (
        <div id="map" className="flex flex-col items-center w-full h-screen" ref={mapRef} >
            <div className={`flex justify-center items-center ${!isLoading && 'hidden'}`}>
                <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
}



