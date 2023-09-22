import React, { useState } from 'react'

function OneWay({ tripType }: { tripType: string }) {
    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');
  
    // Function to handle swapping
    const handleSwap = () => {
      const temp = from;
      setFrom(to);
      setTo(temp);
    };
  return (
    <div className='trip-container'>
              <div className='travel-input-container'>
               <label htmlFor="travel-from">From</label>
                <input
                  type='text'
                  autoComplete="off"
                  placeholder='From'
                  name='travel-from'
                  value={from}
              onChange={(e) => setFrom(e.target.value)}
                />
              </div>
              <button className='roundButton' onClick={handleSwap}>
                ⇆
              </button>
              <div className='travel-input-container'>
              <label htmlFor="travel-to">To</label>
                <input
                  type='text'
                  placeholder='To'
                  name="travel-to"
                  autoComplete="off"
                  value={to}
              onChange={(e) => setTo(e.target.value)}
                />
              </div>
              <div className='travel-input-container'>
                <input
                  type='date'
                  placeholder='Departure Date'
                  className='border rounded-md p-2'
                />
              </div>
              <div>
                <input
                  type='button'
                  value='Search'
                  className=''
                />
              </div>
            </div>
  )
}

export default OneWay