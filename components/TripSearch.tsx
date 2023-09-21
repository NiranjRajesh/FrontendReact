import React, { useEffect, useState, useRef, useCallback, useContext } from 'react';
import Calender from './Calender';
import { useFilterContext } from '@/context/FilterContext';
import RangeCalender from './RangeCalender';
import { PiAirplaneTakeoffBold, PiAirplaneLandingBold } from 'react-icons/pi';
import { useSearch } from '@/context/SearchContext';
import { formatDate } from '@/util/dateformatter';

type AutoCompleteResponse = {
  iata: string;
  code: string;
  name: string;
  city: string;
  state: string;
};

type Search = {
  code: string;
  name: string;
};

const TripSearch = () => {
  const { tripType } = useFilterContext();
  
  const { from, to, updateFrom, updateTo,departureDate,departureAirport,arrivalAirport,updateArrivalAirport,updateDepartureAirport,cabinClass,selectedAirlines ,setSearchResult,returnDate} = useSearch();
  const [fromSearch, setFromSearch] = useState<Search>();
  const [toSearch, setToSearch] = useState<Search>();
  const [fromSuggestions, setFromSuggestions] = useState<AutoCompleteResponse[]>([]);
  const [toSuggestions, setToSuggestions] = useState<AutoCompleteResponse[]>([]);
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);

  const fromInputRef = useRef<HTMLInputElement | null>(null);
  const toInputRef = useRef<HTMLInputElement | null>(null);
  

  const handleSearch = async () => {
  
      if(tripType=="oneWay" && departureDate){
        const date = formatDate(departureDate);
  
        const requestBody = {
          "class": cabinClass,
          "airline":selectedAirlines,
          "routes": [
            {
              "date": date,
              "departure": departureAirport,
              "arrival": arrivalAirport
            }
          ]
        };
    
        console.log(requestBody);
    
        const response = await fetch("http://localhost:8080/api/detailrecommendations", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
    
        const data = await response.json();
        setSearchResult(data.multicity);
        console.log(data);
      }
      else if(tripType=="roundTrip"  && returnDate && departureDate){
        const departurDate = formatDate(departureDate);
        const arrivalDate=formatDate(returnDate);
  
        const requestBody = {
          "class": cabinClass,
          "airline":selectedAirlines,
          "routes": [
            {
              "date": departurDate,
              "departure": departureAirport,
              "arrival": arrivalAirport
            },{
              "date": arrivalDate,
              "departure": arrivalAirport,
              "arrival":departureAirport,
            }
          ]
        }

        const response = await fetch("http://localhost:8080/api/detailrecommendations", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
    
        const data = await response.json();
        setSearchResult(data.multicity);
        console.log(data);
      }
     
    
  };
  
  const fetchSuggestions = useCallback(async (inputValue: string, setSuggestions: (suggestions: AutoCompleteResponse[]) => void) => {
    if (inputValue.length === 0) {

      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/airportautocomplete?search_string=${inputValue}`);
      const data = await response.json();
      console.log(data);
      setSuggestions(data);
     
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
  
    if (fromInputRef.current) {
      const inputValue = fromInputRef.current.value;
      console.log("in here")
      fetchSuggestions(inputValue, setFromSuggestions);
    }
  }, [fetchSuggestions,from]);

  useEffect(() => {
    if (toInputRef.current) {
      const inputValue = toInputRef.current.value;
      fetchSuggestions(inputValue, setToSuggestions);
    }
  }, [fetchSuggestions,to]);

  const handleSelection = (sugg: Search, inputType: string) => {
    console.log(sugg);
    if (inputType === 'from') {
      setFromSearch(sugg);
      updateFrom(sugg.name);
      updateDepartureAirport(sugg.code)
      setShowFromModal(false);
    } else if (inputType === 'to') {
      setToSearch(sugg);
      updateTo(sugg.name);
      updateArrivalAirport(sugg.code)
      setShowToModal(false);
    }
  };

  const handleSwap = () => {
    const temp = from;
    updateFrom(to);
    updateTo(temp);
  };

  return (
    <div className="trip-container">
      <div className="travel-input-container">
        <label htmlFor="travel-from">From</label>
        <input
          type="text"
          name="travel-from"
          autoComplete="off"
          value={from}
          onChange={(e) => updateFrom(e.target.value)}
          onFocus={() => setShowFromModal(true)}
          ref={fromInputRef}
        />
        {!showFromModal && <span className="placeholder-icon"> <PiAirplaneTakeoffBold/> </span>}
        
        {showFromModal && (
          <div className="suggestions-container">
            {fromSuggestions?.map((suggestion, index) => (
              <div className="suggestions" onClick={() => handleSelection({ name: suggestion.name, code: suggestion.code }, 'from')} key={index}>
                <div className="suggestion-name">{suggestion.name}</div>
                <div className="suggestion-code">{suggestion.code}</div>
              </div>
            ))}
          </div>
        )}
        <span className="iata-cur">{fromSearch?.code}</span>
      </div>
      <button className="roundButton" onClick={handleSwap}>
        ⇆
      </button>
      <div className="travel-input-container">
        <label htmlFor="travel-to">To</label>
        <input
          type="text"
          name="travel-to"
          autoComplete="off"
          value={to}
          onChange={(e) => updateTo(e.target.value)}
          onFocus={() => setShowToModal(true)}
          ref={toInputRef}
        />
        {showToModal && (
          <div className="suggestions-container">
            {toSuggestions?.map((suggestionT, index) => (
              <div className="suggestions" onClick={() => handleSelection({ name: suggestionT.name, code: suggestionT.code }, 'to')} key={index+'T'+suggestionT.code}>
                <div className="suggestion-name">{suggestionT.name}</div>
                <div className="suggestion-code">{suggestionT.code}</div>
              </div>
            ))}
          </div>
        )}
        <span className="placeholder-icon"> <PiAirplaneLandingBold/> </span>
        <span className="iata-cur">{toSearch?.code}</span>
      </div>
      <div className="travel-calender-container">
        {tripType === 'roundTrip' ? <RangeCalender /> : <Calender />}
        <div>
          <button onClick={handleSearch} className="search-btn">Search</button>
        </div>
      </div>
    </div>
  );
};

export default TripSearch;
