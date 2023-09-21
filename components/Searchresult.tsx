import { useSearch } from '@/context/SearchContext';
import React, { useState } from 'react';
import RouteCard from './RouteCard';
import { useFilterContext } from '@/context/FilterContext';

function Searchresult() {
  const { searchResult } = useSearch();
  const {tripType}=useFilterContext()
  const [page,setPage]=useState(0);
  console.log(searchResult);

  // Check if searchResult is empty or undefined
  if (!searchResult || searchResult.length === 0) {
    // Render a loading state or a message when there are no search results
    return (
      <div className='search-result-container'>
        <div className="search-result-heading">
          <h4>Loading...</h4>
        </div>
      </div>
    );
  }

  // Render the search results when available
  return (
    <div className='search-result-container'>
      <div className="search-result-heading">
        <h4>Result</h4>
      </div>
      <div className="page-section">
        {tripType!="oneWay" && 
        <div className="trip-button-container">
          {
            searchResult.map((value,index)=>
<button onClick={()=>setPage(index)}>{value.departure}-{value.arrival}</button>
            )
          }
          
        </div>
        }
      </div>
      {searchResult[page].route ?

      <div className="search-result">
        <div className="search-route">
          <div className="from-airport-container">
            <div className="t-airport-title">
              From
            </div>
            <div className="t-airport-iata">{searchResult[page].departure}</div>
            <div className="t-airport">{searchResult[page].route[0]?.ResAirportFrom.name}</div>
          </div>
          <div className="to-airport-container">
            <div className="t-airport-title">To</div>
            <div className="t-airport-iata">{searchResult[page].arrival}</div>
            <div className="t-airport">{searchResult[page].route[0]?.ResAirportTo.name}</div>
          </div>
        </div>
        <div className="route-results">
         {searchResult[page].route.map((value)=><RouteCard  route={value} date={searchResult[page].date}/>)}
        
      </div>
    </div>: <div> not route</div>
}
    </div>
  );
}

export default Searchresult;
