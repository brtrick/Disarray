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
        

        const updateTime = () => {
            if (minutes === 0 && seconds === 0) {
                setSeconds(0);
                setMinutes(0);
                timeUp();
            }
            else {
                if (seconds === 0){
                    setMinutes(minutes => minutes - 1);
                    setSeconds(59);
                } else {
                    setSeconds(seconds => seconds - 1);
                }
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