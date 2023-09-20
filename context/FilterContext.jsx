import React, { createContext, useContext, useState } from 'react';

// Create a context
const FilterContext = createContext();

// Create a custom hook to access the context
export const useFilterContext = () => {
  return useContext(FilterContext);
};

// Create a provider component to manage the filter state
export const FilterProvider = ({ children }) => {
  const [tripType, setTripType] = useState('oneWay');
  const [otherFilters, setOtherFilters] = useState({}); // Add other filter states here

  const updateTripType = (newTripType) => {
    setTripType(newTripType);
  };

  const updateOtherFilters = (newFilters) => {
    setOtherFilters(newFilters);
  };

  return (
    <FilterContext.Provider
      value={{
        tripType,
        updateTripType,
        otherFilters,
        updateOtherFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
