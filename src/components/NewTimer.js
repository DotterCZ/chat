import React from 'react'

function NewTimer() {

    let newDate = new Date()
        let todayYear = newDate.getFullYear();
        let todayMonth = newDate.getMonth() + 1;
        let todayDay = newDate.getDate() + 1;

        const today = (todayDay - 1) + '.' + todayMonth + '.' + todayYear;
        const difference = +new Date(`${todayYear}-${todayMonth}-${todayDay}`) - +new Date();
        
        const [hours, setHours] = React.useState(Math.floor(difference / (1000 * 60 * 60)));
        const [minutes, setMinutes] = React.useState(Math.floor((difference / 1000 / 60) % 60));
        const [seconds, setSeconds] = React.useState(Math.floor((difference / 1000) % 60));


    React.useEffect(() => {

        


        setTimeout(() => {

            const difference = +new Date(`${todayYear}-${todayMonth}-${todayDay}`) - +new Date();
        
            setHours(Math.floor(difference / (1000 * 60 * 60)));
            setMinutes(Math.floor((difference / 1000 / 60) % 60));
            setSeconds(Math.floor((difference / 1000) % 60));

        }, 1000);

    }, 
    [
        setHours,
        hours,
        setMinutes,
        minutes,
        setSeconds,
        seconds
    ]);

    return (
        <>
            <div className='timer-box'>
                <span className='time'>{hours}</span>
                <span className='interval'>Hodin</span>
            </div>
            <div className='timer-box'>
                <span className='time'>{minutes}</span>
                <span className='interval'>Minut</span>
            </div>
            <div className='timer-box'>
                <span className='time'>{seconds}</span>
                <span className='interval'>Vteřin</span>
            </div>
        </>
    );
    
}

export default NewTimer
