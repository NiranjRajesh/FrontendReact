import React from 'react'
import TripSelector from './TripSelector'
import CabinClassSelector from './CabinClassSelector'
import AirlineSelection from './AirlineSelector'

const Filter = () => {
  return (
    <div className='filter-container'>
    <div className='filter-heading-container'>
     
      <div className='filter-title'>
        <h3>Filter</h3>
      </div>
      <div className='reset-title'>
        <h4>Reset</h4>
      </div>
    </div>
    <div className="filter-body">
    <div className='tripSelector'>
      <h4>Journey Type</h4>
    <TripSelector />
    </div>
    <div className='cabinClass'>
      <h4>Cabin Class</h4>
        <CabinClassSelector/>
    </div>
    <div className='airlineSelection'>
      <h4>Airline</h4>
      <AirlineSelection/>

    </div>
    </div>

  </div>
  )
}

export default Filter