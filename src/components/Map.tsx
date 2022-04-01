import { FC, useRef, useEffect } from "react";
interface IMapProps {
    onMapLoaded: (map: google.maps.Map) => void,
    coordinates: { lat: number, lng: number } | undefined,
    scriptsReady: boolean
}

export const Map: FC<IMapProps> = (props: IMapProps) => {

    const mapRef = useRef<HTMLDivElement | null>(null);
    const map = useRef<google.maps.Map>();
    const { coordinates, onMapLoaded, scriptsReady } = props;

    useEffect(() => {

        let coords;
        if(coordinates){
            coords = new google.maps.LatLng(coordinates)
        }
        if(map.current != null && coords) {
            map.current.setCenter(coords);
        } else if (coords && scriptsReady) {

            map.current = new google.maps.Map(mapRef.current!, {
                center: coords,
                zoom: 13,
                disableDefaultUI: true,
            });
            onMapLoaded(map.current);
        }
    }, [coordinates, scriptsReady]);


    return (
        <div data-cy="map" id="map" className="flex flex-col items-center w-full h-screen" ref={mapRef}></div>
    );
}



