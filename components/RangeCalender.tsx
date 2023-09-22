import React from 'react';
import { useSearch } from '@/context/SearchContext';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RangeCalender: React.FC = () => {
  const { departureDate, returnDate, updateDepartureDate, updateReturnDate } = useSearch();

  const onChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    
    // Update the context with the selected dates
    updateDepartureDate(start);
    updateReturnDate(end);
  };

  return (
    <DatePicker
      selected={departureDate}
      onChange={onChange}
      startDate={departureDate}
      placeholderText='dd/mm/yy - dd/mm/yy'
      endDate={returnDate}
      minDate={departureDate}
      selectsRange
      isClearable
    />
  );
};

export default RangeCalender;
