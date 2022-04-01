import React, {FC, useEffect} from 'react';
import { getRadiusFromBounds} from '../utilities';

interface ISearchService {
    map?: google.maps.Map,
    onRequestFulfilled: (response: any) => void,
    query?: string,
    coordinates?: {
        latitude: number, 
        longitude: number, 
        radius?: number
    }


}


export const SearchService: FC<ISearchService> = (props: ISearchService) => {

    const {map, query, coordinates} = props;

    useEffect(() => {
        if(!map || !coordinates){
            return;
        }
        const service = new google.maps.places.PlacesService(map!);

        console.log(props.map?.getCenter());
        const radius = props.map?.getBounds() ? getRadiusFromBounds(props.map?.getBounds()!) : 10000;
        const center = props.map?.getCenter() ? props.map?.getCenter()! : new google.maps.LatLng(37.7749, -122.4194);

        var request = {
            keyword: query || '',
            radius,
            location: center,// new google.maps.LatLng(coordinates?.latitude, coordinates?.longitude),
            type: 'restaurant',
            fields: ['name', 'geometry', 'rating', 'price_level', 'photos'],
          };
          
          service.nearbySearch(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                let scrubbedForPhotos = results.map(r => ({...r, photo: r.photos && r.photos[0] ? {getUrl: r.photos[0].getUrl } : null}))
                props.onRequestFulfilled(scrubbedForPhotos);
            }
          });

    }, [map, query, coordinates])

    return (
        <div></div>
    );
}