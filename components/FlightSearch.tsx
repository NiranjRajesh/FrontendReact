import React, { useState } from 'react'
import TripSelector from './TripSelector'
import TripSearch from './TripSearch'
import MultiCity from './MultiCity';

const FlightSearch = () => {
  const [tripType, setTripType] = useState('roundTrip');
  return (
    <div className='flight-search-container'>
        <div className='flight-content'>
        <div className='flight-title'></div>
        <div className='flight-image'></div>
        </div>

       
    <div className='flight-search'>
    
      {tripType === 'roundTrip' &&<TripSearch/>}
      {tripType === 'oneWay' && <TripSearch/>}
      {tripType=='multiCity' && <MultiCity/>}
      {/* {tripType === 'multiCity' && <MultiCity tripType={''} />} */}
    </div>
   
    </div>
  )
}

export default FlightSearch