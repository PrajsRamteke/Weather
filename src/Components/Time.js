import React, { useState, useEffect } from 'react';

function Time() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  //   const sec = time.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const good = hours >= 12 ? 'Good Afternoon' : 'Good Morning';

  return (
    <>
        <div className='good'> {good}, {hours}:{minutes} {ampm}</div>
        
    </>
  );
}

export default Time;
