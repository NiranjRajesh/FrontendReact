"use client"
import React from 'react'
import FlightSearch from './FlightSearch'
import Filter from './Filter'
import Searchresult from './Searchresult'
import {FilterProvider} from "../context/FilterContext"
import { SearchProvider, useSearch } from '@/context/SearchContext'

const Greeter = () => {
  
  return (
    <FilterProvider>
      
      <SearchProvider>
    <div className="greeter-container">
      <div className="greeter-l">
      <FlightSearch/>
      <div className="placeholder">
        
        <Searchresult/>
      </div>
    
      </div>
      <div className="greeter-r">
        <Filter/>
      </div>
      


    </div>
    </SearchProvider>
    </FilterProvider>
  
  )
}

export default Greeter