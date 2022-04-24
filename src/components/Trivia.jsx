import { useEffect, useState ,useRef} from "react";
import { data } from "./Data";
import useSound from "use-sound";
import correct from "../sounds/sounds_correct.mp3";
import wrong from "../sounds/sounds_wrong.mp3";
import play from "../sounds/sounds_play.mp3";
import wait from "../sounds/sounds_wait.mp3";


const Trivia = ({
  questionNumber,
  setQuestionNumber,
  setStop,
  setPyramidClassName,
  selectedAnswer,
  setSelectedAnswer
}) => {
 

  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);
  const [waitAnswer, { stop }] = useSound(wait);

  const [question, setQuestion] = useState(null);
  
  const [className, setClassName] = useState("answer");

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };
  useEffect(() => {
    letsPlay();
    
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
   
  }, [questionNumber]);

  useEffect(() => {
    delay(3000, () => {
      waitAnswer();
    });
  }, [questionNumber,waitAnswer])




  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(2000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");




      delay(1500, () => {
        if (a.correct) {
          stop();
          correctAnswer();
          
          delay(2000, () => {
            if(questionNumber <=15){
              setPyramidClassName("pyramid showPanel");
            }
            delay(1500, ()=>{
              setSelectedAnswer(null)
              setQuestionNumber((prev) => prev + 1);
              setClassName("answer removeFocus")
            })
          });
          delay(4500, () => {
            setPyramidClassName("pyramid closePanel");
          });
        } else {
          stop();
          wrongAnswer();
          delay(2000, () => {
            setStop(true);
          });
        }
      });
    })

    
  };

  

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a, index) => {
          return (
            <div
              key={index}
              className={selectedAnswer === a ? className : "answer"}
              onClick={() => handleClick(a)}
             
            >
              {a.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trivia;
