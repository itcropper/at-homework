import { useEffect, useRef, FunctionComponent} from 'react';
import {ResultCard} from './ResultCard'

interface IMarker {
    map: google.maps.Map,
    data: google.maps.places.PlaceResult,
    infoWindow: google.maps.InfoWindow | undefined,
    selected?: boolean
}


export const Marker: FunctionComponent<IMarker> = (props: IMarker) => {

    const cardRef = useRef<HTMLDivElement>(null);

    const {data, map, infoWindow, selected} = props;

    useEffect(() => {
        if(!data || !data.geometry){
            return;
        }
        const marker = new google.maps.Marker({
            position: data.geometry?.location,
            map: map,
        });

        const setSelectedMarker = () => {
            if(infoWindow){
                cardRef.current?.classList.remove('hidden');
                infoWindow.close();
                infoWindow.setContent(cardRef.current?.outerHTML);
                infoWindow.open(marker.getMap(), marker);
            }
        }

        const closeWindow = (event:any) =>  infoWindow?.close(); 

        const clickListener = marker.addListener("click", setSelectedMarker)

        const mapClickListener = google.maps.event.addListener(map, "click", closeWindow);

        return () => {
            google.maps.event.removeListener(clickListener);
            google.maps.event.removeListener(mapClickListener);
            marker.setMap(null);
        };
    }, [props])

    return (
        <div ref={cardRef} className="hidden">
            <ResultCard businessInfo={props.data} forInfoWindow={true} />
        </div>
    )
}