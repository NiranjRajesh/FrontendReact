import React,{useEffect} from 'react';
import { useSearch } from '@/context/SearchContext';

const AirlineSelector: React.FC = () => {
  const {selectedAirlines, updateSelectedAirlines } = useSearch();

  const airlines: string[] = [
    'Airline A',
    'Airline B',
    'Airline C',
    // Add more airlines as needed
  ];



  const handleAirlineChange = (airline: string) => {
    if (selectedAirlines.includes(airline)) {
      updateSelectedAirlines(selectedAirlines.filter((a) => a !== airline));
    } else {
      updateSelectedAirlines([...selectedAirlines, airline]);
    }
  };

  return (
    <div>
      <h3>Select Airlines:</h3>
      <ul>
        {airlines.map((airline) => (
          <li key={airline}>
            <label>
              <input
                type="checkbox"
                checked={selectedAirlines.includes(airline)}
                onChange={() => handleAirlineChange(airline)}
              />
              {airline}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AirlineSelector;
