import { useState } from 'react';

interface Flight {
  from: string;
  to: string;
  date: string;
}

function MyComponent({ tripType }: { tripType: string }) {
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');

  // Function to handle swapping
  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const [flights, setFlights] = useState<Flight[]>([{
    from: '',
    to: '',
    date: '',
  }]);
  const maxFlights = 3; // The maximum total flights, including the default one

  const addFlight = () => {
    if (flights.length < maxFlights) {
      setFlights([...flights, { from: '', to: '', date: '' }]);
    }
  };

  const removeFlight = (index: number) => {
    if (index === 0) {
      return;
    }

    const newFlights = [...flights];
    newFlights.splice(index, 1);
    setFlights(newFlights);
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>, field: keyof Flight) => {
    const newFlights = [...flights];
    newFlights[index][field] = event.target.value;
    setFlights(newFlights);
  };

  return (
    <div>
      {flights.map((flight, index) => (
        <div key={index} className='multiCity'>
          <div className='travel-input-container'>
            <input
              type='text'
              placeholder='From'
              value={flight.from}
              onChange={(e) => handleInputChange(index, e, 'from')}
            />
          </div>
          <button className='roundButton' onClick={handleSwap}>
            ⇆
          </button>
          <div className='travel-input-container'>
            <input
              type='text'
              placeholder='To'
              value={flight.to}
              onChange={(e) => handleInputChange(index, e, 'to')}
            />
          </div>
          <div className='travel-input-container'>
            <input
              type='date'
              placeholder='Departure Date'
              value={flight.date}
              onChange={(e) => handleInputChange(index, e, 'date')}
            />
          </div>
          <div>
            <input
              type='button'
              value='Search'
            />
          </div>
          {index !== 0 && (
            <div>
              <button onClick={() => removeFlight(index)}>&#10006;</button>
            </div>
          )}
        </div>
      ))}
      {flights.length < maxFlights && (
        <button onClick={addFlight}>&#43;</button>
      )}
    </div>
  );
}

export default MyComponent;
