import { useEffect, useRef} from 'react';
import { FunctionComponent } from 'react';
import { IResultInfo } from "../Interfaces"
import {ResultCard} from './ResultCard'

interface IMarker {
    map: google.maps.Map,
    coordinates?: { lat: number, lng: number },
    data: IResultInfo,
    infoWindow: google.maps.InfoWindow | undefined,
    selected?: boolean
}


export const Marker: FunctionComponent<IMarker> = (props: IMarker) => {

    const {infoWindow} = props;

    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const marker = new google.maps.Marker({
            position: props.coordinates,
            map: props.map,
        });

        const setSelectedMarker = () => {
            if(infoWindow){
                cardRef.current?.classList.remove('hidden');
                infoWindow.close();
                infoWindow.setContent(cardRef.current?.outerHTML);
                infoWindow.open(marker.getMap(), marker);
            }
        }

        const clickListener = marker.addListener("click", setSelectedMarker)

        return () => {
            google.maps.event.removeListener(clickListener);
            marker.setMap(null);
        };
    }, [props])

    return (
        <div ref={cardRef} className="hidden">
            <ResultCard businessInfo={props.data} forInfoWindow={true} />
        </div>
    )
}