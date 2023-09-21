import { MultiCityInfo } from '@/context/SearchContext'
import { stringToDateformat } from '@/util/dateformatter';
import React from 'react'


interface RouteCardProps {
  route: MultiCityInfo;
  date:string;
}
const RouteCard: React.FC<RouteCardProps> = ({route,date}) => {
  return (
    <div className="card">

      <div className="card-header">
      <img src={route.AirlineInfo.logo} className='card-img' alt="Card Image" />
      <h3>{route.ariline}</h3>
      </div>

 

    <div className="card-content">

      <p>{route.AirlineInfo.name}</p>

      <p>{stringToDateformat(date)}</p>

    </div>

  </div>
  )
}

export default RouteCard