import React from 'react';
import { useSearch } from '@/context/SearchContext';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calender: React.FC = () => {
  const { departureDate, updateDepartureDate } = useSearch();

  return (
    <DatePicker
      showIcon
      selected={departureDate}
      placeholderText='dd/mm/yy'
      onChange={(date) => updateDepartureDate(date)}
      minDate={departureDate}
    />
  );
};

export default Calender;
