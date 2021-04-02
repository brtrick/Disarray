import React, { useEffect, useState } from "react";


    // const RoundTimer = () => {
    //     const [counter, setCounter] = React.useState(60);
    //     setTimeout(() => setCounter(counter - 1), 1000);

    //     return (
    //         <div className="timer-div">
    //             <div className="timer">Timer: {counter}</div>
    //         </div>
    //     )
    // }

    // export default RoundTimer;


    const RoundTimer = ({timeUp}) => {
        
        const [seconds, setSeconds] = useState(20);
        const [minutes, setMinutes] = useState(0);
        
        const start = new Date().getTime()
        const target = start + minutes*60000 + seconds*1000;
        // const target = new Date().getTime() + 0*60000 + 20*1000;
        const updateTime = () => {
            const timeLeft = target - (new Date());
            console.log(target + ", " + timeLeft);
            console.log("Minutes: " + minutes);
            console.log("Seconds: " + seconds);
        
            if (timeLeft <= 0) {
            // if (minutes === 0 && seconds === 0) {
                setSeconds(0);
                setMinutes(0);
                timeUp();
            }
            else {
                setMinutes(Math.floor((timeLeft/60000)%60));
                setSeconds(Math.floor((timeLeft/1000)%60));
                // if (seconds === 0){
                //     setMinutes(minutes => minutes - 1);
                //     setSeconds(59);
                // } else {
                //     setSeconds(seconds => seconds - 1);
                // }
            }
        }
        
        useEffect(() => {
            const timeout = setTimeout(updateTime, 1000);
            return () => {
                clearTimeout(timeout);
            }
        });

       const stringify = num => {
           if (num < 10){
               return "0" + num.toString();
           } else {
               return num;
           }
       }

        return (
            <div className='timer-container'>
                <div className='timer-header'>Timer</div>
                <span>{minutes}:{stringify(seconds)}</span>
            </div>
        )
    }



export default RoundTimer;