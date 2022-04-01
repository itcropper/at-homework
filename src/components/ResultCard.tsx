import React, {FunctionComponent, useEffect, useState, useContext} from 'react';
import { BRAND, ACTIONS, PRICE_LEVEL } from '../constants';
import {IResultInfo} from '../Interfaces';

interface IResultCard extends React.HTMLAttributes<HTMLButtonElement>{
    businessInfo: IResultInfo
    isFavorite?: boolean,
    onFavoritesChanged?: (id: string|number, updated: boolean) => void,
    forInfoWindow?: boolean
}

export const ResultCard: FunctionComponent<IResultCard> = (props: IResultCard) => {

    const [isFavorite, setIsFavorite] = useState(props.isFavorite || false);

    useEffect(() => {
        if(props?.businessInfo 
            && props.onFavoritesChanged 
            && props.isFavorite !== null) {
                props.onFavoritesChanged(props.businessInfo.place_id, isFavorite);
        }
    }, [isFavorite])

    useEffect(() => {
        if(isFavorite !== props.isFavorite){
            setIsFavorite(props.isFavorite!)
        }
    }, [props])

    let {
        name,
        rating,
        user_ratings_total,
        price_level,
        
    } = props.businessInfo;

    let business_photo = props.businessInfo.photo?.getUrl()

    return (
        <div className={`px-2 h-28 flex mb-4 w-11/12 bg-white divide-y divide-gray-200 ${props.forInfoWindow ? "" : "rounded-lg shadow"}`}>
        <div className="w-full flex items-center justify-between p-2 ">
            <img className={`max-h-24 rounded ${props.forInfoWindow ? "w-2/5" : "w-1/6"}`} src={business_photo} />
            <div className="content-stuff w-1/2">
                <p className="text-gray-800 font-medium line-clamp-2">{name}</p>
                {
                    rating && user_ratings_total && 
                        <div className="flex flex-row items-center">
                            <span className={`star-ratings star-rating-${ (1000 * Math.round(rating / 5 * 4)) / 4  }`} ></span>
                            <span>({user_ratings_total})</span>
                        </div>
                }
                <p className="text-gray-400">{price_level && ''.padEnd(price_level, '$')} </p>
            </div>
            <div className={`w-6 text-gray-400 ${props.forInfoWindow ? 'hidden' : ''}`} onClick={(e) => setIsFavorite(!isFavorite)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" 
                fill={(isFavorite ? BRAND.Primary : "transparent" )} 
                stroke={(isFavorite ? BRAND.Primary : "currentColor" )}>
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            </div>
        </div>
      </div>
    );
};