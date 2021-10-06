import React, {useEffect, useRef, useState} from 'react'

function NewTimer() {

    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');
    const [month, setMonth] = useState('');
    const [today, setToday] = useState('');

  let interval = useRef();

  const startTimer = () => {
    let newDate = new Date();
        let dateMonth = newDate.getMonth();
        let dateToday = newDate.getDate() + 2;

        setMonth(dateMonth);
        setToday(dateToday);

        let dayArr = [
            31, // Jan
            28, // Feb
            31, // Mar
            30, // Apr
            31, // May
            30, // Jun
            31, // Jul
            31, // Aug
            30, // Sep
            31, // Oct
            30, // Nov
            31  // Dec
        ];

        let monthArr = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];

        const todayCalc = () => {
            if (dateToday === dayArr[dateMonth] + 1) {
                // set today to first of month
                setToday(1);
            } else if (dateToday === dayArr[dateMonth] + 2) {
                // set today to seconds of month
                setToday(2);
            } else {
                // set today to today
                setToday(dateToday);
            }
        }

        const monthCalc = () => {
            if (dateToday > dayArr[dateMonth]) {
                setMonth(monthArr[dateMonth + 1]);
            } else {
                setMonth(monthArr[dateMonth]);
            }
        }
    
        todayCalc();
        monthCalc();

    const countdownDate = new Date(`${month} ${today}, 2021 00:00:00`).getTime();

  
    interval = setInterval(() => {

      const now = new Date().getTime();
      const difference = countdownDate - now;

    //   console.log('countdownDate: ' + countdownDate);
      // console.log('now: ' + now);
      // console.log('difference: ' + difference);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)) + (days * 24));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      if (difference < 0) {
        //stop our timer
        clearInterval(interval.current);
      } else {
        //update timer
        // setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }

    }, 1000);
  };

  // componentDidMount
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    } 
  });
  
  
  return (
    <>
      {/* <div className='timer-box'>
        <span className='time'>{timerDays}</span>
        <span className='interval'>Dnů</span>
      </div> */}
      <div className='timer-box'>
        <span className='time'>{timerHours}</span>
        <span className='interval'>Hodin</span>
      </div>
      <div className='timer-box'>
        <span className='time'>{timerMinutes}</span>
        <span className='interval'>Minut</span>
      </div>
      <div className='timer-box'>
        <span className='time'>{timerSeconds}</span>
        <span className='interval'>Vteřin</span>
      </div>
    </>
  );
    
}

export default NewTimer
