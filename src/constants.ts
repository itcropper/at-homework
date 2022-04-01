

export const BRAND = {
    Primary: "#438a14",
    Accent: "#2C611F"
}

export enum VIEW {
    MAP,
    LIST
}

export enum ACTIONS {
    PLACES_API_LOADED = "PLACES_API_LOADED",
    UPDATE_FAVORITES = "UPDATE_FAVORITES",
}

export enum PRICE_LEVEL {
    "FREE" = 0,
    "INEXPENSIVE" = 1,
    "MODERATE" = 2,
    "EXPENSIVE" = 3,
    "VERY_EXPENSIVE" = 4
}

export const LOCAL_STORAGE_KEY = "AT_Favorite_Places";
export const smallScreenMax = 768;
export const googleApiKey = process.env.REACT_APP_PLACES_KEY;