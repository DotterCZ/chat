import React, { useEffect, useState } from "react";

const Timer = () => {

    let newDate = new Date()
        let todayMonth = newDate.getMonth() + 1;
        let todayYear = newDate.getFullYear();
        let todayDay = newDate.getDate() + 1;

        const today = (todayDay - 1) + '.' + todayMonth + '.' + todayYear;

    const calculateTimeLeft = () => {


        const difference = +new Date(`${todayYear}-${todayMonth}-${todayDay}`) - +new Date();
        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            Hodin: Math.floor((difference / (1000 * 60 * 60)) % 24),
            Minut: Math.floor((difference / 1000 / 60) % 60),
            Vteřin: Math.floor((difference / 1000) % 60),
          };
        }
    
        return timeLeft;
      };
    
      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    
      useEffect(() => {
        setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
      });
    
      const timerComponents = [];
    
      Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
          return;
        }
    
        timerComponents.push(

            <div className='timer-box'>
                <span className='time'>{timeLeft[interval]}</span>
                <span className='interval'>{interval}</span>
            </div>
        );
      });

      return (
        <div>
          <p className='timer-heading'>Nabídka platí pouze do <b>{today}</b></p>
          <div className='timer-box-wrapper'>
            {timerComponents.length ? timerComponents : <span className='timerOut-msg'>Time's up!</span>}
          </div>
        </div>
      );
}

export default Timer
