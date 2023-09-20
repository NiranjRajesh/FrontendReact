'use client'
import React, { useState } from 'react'
import RoundTrip from './RoundTrip';
import OneWay from './OneWay';
import MultiCity from './MultiCity';
import TripSearch from './TripSearch';
import { useFilterContext } from '@/context/FilterContext';


    const TripSelector = () => {
      const {tripType,updateTripType}=useFilterContext();
      
        const handleTripTypeChange = (e: { target: { value: React.SetStateAction<string> } }) => {
          updateTripType(e.target.value);
        };
  return (
    <div className="trip-selector">
      <div className="radio-buttons">
      <div className='oneWay'>
              <input
                type='radio'
                name='trip'
                value='oneWay'
                checked={tripType === 'oneWay'}
                onChange={handleTripTypeChange}
              />
              <label className='ml-1'>OneWay</label>
            </div> 
        <div className='roundTrip'>
              <input
                type='radio'
                name='trip'
                value='roundTrip'
                checked={tripType === 'roundTrip'}
                onChange={handleTripTypeChange}
              />
              <label className='ml-1'>Round-trip</label>
            </div>

        

            <div className='multiCity'>
              <input
                type='radio'
                name='trip'
                value='multiCity'
                checked={tripType === 'multiCity'}
                onChange={handleTripTypeChange}
              />
              <label className='ml-1'>Multi-City</label>
            </div>
            
      </div>
   
    </div>
  )
}

export default TripSelector