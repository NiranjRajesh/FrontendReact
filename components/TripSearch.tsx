import React, { useEffect, useState } from 'react';
import Calender from './Calender';
import { useFilterContext } from '@/context/FilterContext';
import RangeCalender from './RangeCalender';
import { PiAirplaneTakeoffBold, PiAirplaneLandingBold } from 'react-icons/pi';

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
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [fromSearch, setFromSearch] = useState<Search>();
  const [toSearch, setToSearch] = useState<Search>();
  const [fromSuggestions, setFromSuggestions] = useState<AutoCompleteResponse[]>([]);
  const [toSuggestions, setToSuggestions] = useState<AutoCompleteResponse[]>([]);
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);

  const handleSelection = (sugg: Search, inputType: string) => {
    if (inputType === 'from') {
      setFromSearch(sugg);
      setShowFromModal(false);
    } else if (inputType === 'to') {
      setToSearch(sugg);
      setShowToModal(false);
    }
  };

  useEffect(() => {
    // Fetch suggestions when the "From" input value changes
    const fetchFromSuggestions = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/airportautocomplete?search_string=${from}`);
        const data = await response.json();
        setFromSuggestions(data);
        setShowFromModal(true);
      } catch (error) {
        console.error(error);
      }
    };

    if (from.length > 0) {
      fetchFromSuggestions();
    } else {
      setFromSuggestions([]); // Clear suggestions when input is empty
      setShowFromModal(false);
    }
    console.log("in from")
  }, [from]);

  useEffect(() => {
    // Fetch suggestions when the "From" input value changes
    const fetchToSuggestions = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/airportautocomplete?search_string=${from}`);
        const data = await response.json();
        setToSuggestions(data);
        setShowToModal(true);
      } catch (error) {
        console.error(error);
      }
    };

    if (to.length > 0) {
      fetchToSuggestions();
    } else {
      setToSuggestions([]); // Clear suggestions when input is empty
      setShowToModal(false);
    }
    console.log("in to")
  }, [to]);
  // Similar useEffect for the "To" input

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="trip-container">
      <div className="travel-input-container">
        <label htmlFor="travel-from">From</label>
        <input
          type="text"
          name="travel-from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          onFocus={() => setShowFromModal(true)}
        />
        <span className="placeholder-icon"> <PiAirplaneTakeoffBold/> </span>
        {showFromModal && (
          <div className="suggestions-container">
            {fromSuggestions.map((suggestion, index) => (
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
          value={to}
          onChange={(e) => setTo(e.target.value)}
          onFocus={() => setShowToModal(true)}
        />
        {showToModal && (
          <div className="suggestions-container">
            {toSuggestions.map((suggestion, index) => (
              <div className="suggestions" onClick={() => handleSelection({ name: suggestion.name, code: suggestion.code }, 'to')} key={index}>
                <div className="suggestion-name">{suggestion.name}</div>
                <div className="suggestion-code">{suggestion.code}</div>
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
          <button className="search-btn">Search</button>
        </div>
      </div>
    </div>
  );
};

export default TripSearch;
