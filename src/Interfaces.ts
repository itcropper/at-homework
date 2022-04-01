import {VIEW, PRICE_LEVEL} from './constants'


export interface IAppState {
    favorites?: any[],
    placesResult?:any[],
    display: VIEW,
    googleMap?: HTMLDivElement | null,
    placesScriptsLoaded: boolean,
    filterQuery?: string
  }


export interface IResultInfo {
    place_id: string | number,
    name?: string,
    geometry: {
        location: {
            lat:() => number,
            lng:() => number
        }
    },
    photo?: {
        getUrl: () => string
    },
    rating?: number,
    user_ratings_total?: number,
    price_level?: PRICE_LEVEL,
    desc?: string,
  }