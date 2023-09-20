'use client'

 

import { useState } from "react";

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

// function addMonths(arg0: Date, arg1: number) {

//     throw new Error('Function not implemented.');

// }

 

 

const Calender=()=>{

 
  const [startDate, setStartDate] = useState<Date |null>(new Date());

  return (
<DatePicker
      showIcon
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      minDate={startDate}
    />
  )
 

}

 

 

export default Calender