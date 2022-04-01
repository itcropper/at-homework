import {FC, useEffect} from 'react';

interface ISearchService {
    map?: google.maps.Map,
    centeredAround: {} | undefined,
    onRequestFulfilled: (response: google.maps.places.PlaceResult[]) => void,
    query?: string,
}


export const SearchService: FC<ISearchService> = (props: ISearchService) => {

    const {map, query, centeredAround} = props;

    useEffect(() => {
        if(!map){
            return;
        }
        const service = new google.maps.places.PlacesService(map!);
        const center = props.map?.getCenter() ? props.map?.getCenter()! : new google.maps.LatLng(37.7749, -122.4194); //default to San Fransico
        const bounds = props.map?.getBounds();

        var request:google.maps.places.PlaceSearchRequest = {
            keyword: query || '',
            location: center,
            type: 'restaurant',
          };

        if(bounds){
            request.bounds = bounds;
        }else{
            request.radius = 10000;
        }

          service.nearbySearch(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                let scrubbedForPhotos = results.map(r => ({...r, photo: r.photos && r.photos[0] ? {getUrl: r.photos[0].getUrl } : null}))
                props.onRequestFulfilled(scrubbedForPhotos);
                return;
            }
            console.warn("Places API request failed", status);
            props.onRequestFulfilled([]);
          });

    }, [map, query, centeredAround])

    return (
        <div></div>
    );
}