
import { FC, HTMLAttributes, useRef, useState, useEffect, useContext } from "react";

interface IMapProps {
    onMapLoaded: (map: google.maps.Map) => void,
    //onMapInitialized: (googleMaps: google.maps.Map) => void,
    // onZoom: (coordinates: {latitude: number, longitude: number, radius?: number}) => void,
    coordinates: {latitude: number, longitude: number} | undefined,
    scriptsReady: boolean
}

export const Map: FC<IMapProps> = (props: IMapProps) => {

    const mapRef = useRef<HTMLDivElement | null>(null);
    const map = useRef<google.maps.Map>();
    const {coordinates, onMapLoaded, scriptsReady} = props;

    useEffect(() => {
        if (coordinates && scriptsReady) {
            
            const coords  = new google.maps.LatLng(
                coordinates.latitude,
                coordinates.longitude
            )

            map.current = new google.maps.Map(mapRef.current!, {
                center: coords,
                zoom: 13,
                disableDefaultUI: true,
            });
            
            onMapLoaded(map.current);
        }
    }, [coordinates, scriptsReady]);


    return (
        <div id="map" className="flex flex-col items-center w-full h-screen" ref={mapRef}> </div>
    );
}



