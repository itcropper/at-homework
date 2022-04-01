import { useState, useEffect } from 'react';
import {googleApiKey} from './constants';

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