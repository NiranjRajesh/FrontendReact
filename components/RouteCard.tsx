import { MultiCityInfo } from '@/context/SearchContext'
import { stringToDateformat } from '@/util/dateformatter';
import React, { MouseEventHandler } from 'react'
import { on } from 'stream';


interface RouteCardProps {
  route: MultiCityInfo;
  date:string;
  onClick:MouseEventHandler<HTMLDivElement>;
}
const RouteCard: React.FC<RouteCardProps> = ({route,date, onClick}) => {
  return (
    <div className="card" onClick={onClick}>

      <div className="card-header">
      <img src={route.AirlineInfo.logo} className='card-img' alt="Card Image" />
      <h3>{route.airline}</h3>
      </div>

 

    <div className="card-content">

      <p>{route.AirlineInfo.name}</p>

      <p>{stringToDateformat(date)}</p>

    </div>

  </div>
  )
}

export default RouteCard