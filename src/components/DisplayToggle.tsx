
import {VIEW, BRAND} from '../constants'
import { useState, useEffect } from 'react';
import marker from '../assets/marker.svg';
import list from '../assets/list.svg';

interface IDisplayToggle extends React.HTMLAttributes<HTMLButtonElement> {
    view: VIEW,
    onUpdate: (view: VIEW) => void,
}

export const DisplayToggle: React.FunctionComponent<IDisplayToggle> = (props:IDisplayToggle) => {

    const [view, setView] = useState(props.view);
    
    useEffect(() => {
        props.onUpdate(view);
    }, [view])

    return (
        <button 
            style={{backgroundColor:  BRAND.Primary}} 
            onClick={(e) => setView(view == VIEW.MAP ? VIEW.LIST : VIEW.MAP)}
            className={`p-1 mr-2 w-24 h-12 text-white stroke-white flex justify-center items-center px-2.5 py-1.5 shadow-sm font-medium rounded text-base hover:bg-gray-50 focus:outline-none`}
            data-cy="toggle-view-button">
        <img className="w-6 h-6 mr-2 stroke-white" src={view === VIEW.MAP ? list : marker} />
        {
            view == VIEW.MAP 
                ? "List"
                : "Map"
        }
        </button>
    );
}