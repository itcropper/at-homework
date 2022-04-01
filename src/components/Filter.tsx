
import React, {useState} from 'react'
import {BRAND} from '../constants';

interface IFilterProps {
    onFilter: (text: string) => void;
}

export const Filter: React.FC<IFilterProps> = (props) => {

    const {onFilter} = props;

    const [queryText, setQueryText] = useState('');

    return (
        <div className="flex  items-center">
            <button type="button"
                className="p-1 px-8 mr-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => onFilter(queryText)}
                >Filter</button>
            <div className="w-full flex relative">
            <label htmlFor="search" className="sr-only">Search</label>
            <input type="text" name="search" id="email"
                placeholder="Search for a Restaurant" 
                className="p-1 pl-3 border w-full focus:ring-indigo-500 focus:border-indigo-500 block w-full  border-gray-900 rounded-md"
                onKeyUp={(e) => setQueryText(e.currentTarget.value)} />
            
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute right-2 top-1" fill="none" viewBox="-3 -3 30 30" stroke={BRAND.Primary} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            </div>
        </div>
    );
}