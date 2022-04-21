import { useState, useEffect } from "react";
import wrong from "../sounds/sounds_wrong.mp3";
import wait from "../sounds/sounds_wait.mp3";
import useSound from "use-sound";

const Timer = ({ setStop, questionNumber,selectedAnswer}) => {
 
  const [timer, setTimer] = useState(20);
  const [wrongAnswer] = useSound(wrong); 
  const [waitAnswer] = useSound(wait);
  useEffect(() => {
    const interval = setInterval(() => {
      !selectedAnswer && setTimer((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(interval); 
    };
  }, [selectedAnswer]);
  
  useEffect(() => {
    setTimer(20);
  }, [questionNumber,setTimer]);

  if (timer === 0) {
   
    wrongAnswer();
    setStop(true);
  }
  return <div className="timer">{timer}</div>;
};

export default Timer;
