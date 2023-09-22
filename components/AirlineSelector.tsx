import React,{useEffect} from 'react';
import { AirlineInfo, useSearch } from '@/context/SearchContext';
import { useFilterContext } from '@/context/FilterContext';

const AirlineSelector: React.FC = () => {
  const {selectedAirlines, updateSelectedAirlines } = useSearch();

const {airlinesAvailable}=useFilterContext()




  const handleAirlineChange = (airline: string) => {
    if (selectedAirlines.includes(airline)) {
      updateSelectedAirlines(selectedAirlines.filter((a) => a !== airline));
    } else {
      updateSelectedAirlines([...selectedAirlines, airline]);
    }
  };

  return (
    <div>
  
      <ul className='airline-list'>
        {airlinesAvailable.map((airline:AirlineInfo) => (
          <li key={airline.iata} className='airline-item'>
            <label className="airline-label">
              <input
                type="checkbox"
                className='custom-checkbox'
                checked={selectedAirlines.includes(airline.iata)}
                onChange={() => handleAirlineChange(airline.iata)}
              />
             
            <span className="checkmark">
            </span>
            <span>{airline.iata}</span>
            
             
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AirlineSelector;
