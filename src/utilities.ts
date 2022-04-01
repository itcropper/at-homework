import { useState, useEffect } from 'react';

const googleApiKey = process.env.REACT_APP_PLACES_KEY;

export function getLocation(onLocated: (response: any) => void, error: (response: any) => void) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onLocated, error);
    } else {
        error("Navigator not enabled");
    }
}

export function loadGoogleScripts(callback: () => void) {
    const apiScriptId = 'google_maps_api_scripts';
    if (window && document) {
        Array.from(document.querySelectorAll('#google_maps_api_scripts')).forEach(el => el?.remove());
        const ifAlreadyLoaded = document.getElementById('apiScriptId');
        if (ifAlreadyLoaded) {
            return;
        }
        const script = document.createElement('script');
        const body = document.getElementsByTagName('body')[0]
        script.setAttribute('id', apiScriptId);
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`
        body.appendChild(script)
        script.addEventListener('load', callback)
    }
}

export function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState<{ width: number | undefined, height: number | undefined }>({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

export function getRadiusFromBounds(bounds: google.maps.LatLngBounds) {
    var center = bounds.getCenter();
    var ne = bounds.getNorthEast();

    // r = radius of the earth in statute miles
    var r = 3963.0;

    // Convert lat or lng from decimal degrees into radians (divide by 57.2958)
    var lat1 = center.lat() / 57.2958;
    var lon1 = center.lng() / 57.2958;
    var lat2 = ne.lat() / 57.2958;
    var lon2 = ne.lng() / 57.2958;

    // distance = circle radius from center to Northeast corner of bounds
    var distance = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));

    return distance * 1.60934;
}