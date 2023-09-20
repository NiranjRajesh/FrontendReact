import React, { useState } from 'react'
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

const RangeCalender = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState<Date |null>(null);
    const onChange = (dates:[Date,Date]) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };
    return (
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        selectsRange

          isClearable
      />
    );
}

export default RangeCalender