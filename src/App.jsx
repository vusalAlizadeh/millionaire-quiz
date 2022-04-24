import React, { useMemo, useState, useEffect } from "react";
import "./App.css";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import Start from "./components/Start";
import End from './components/End';

const App = () => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earn, setEarn] = useState("$ 0");
  const [user, setUser] = useState(null);
  const [pyramidClassName, setPyramidClassName] = useState("pyramid");
  const [selectedAnswer, setSelectedAnswer] = useState(null);

 
  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1.000" },
        { id: 6, amount: "$ 2.000" },
        { id: 7, amount: "$ 4.000" },
        { id: 8, amount: "$ 8.000" },
        { id: 9, amount: "$ 16.000" },
        { id: 10, amount: "$ 32.000" },
        { id: 11, amount: "$ 64.000" },
        { id: 12, amount: "$ 125.000" },
        { id: 13, amount: "$ 250.000" },
        { id: 14, amount: "$ 500.000" },
        { id: 15, amount: "$ 1.000.000" },
      ].reverse(),
    []
  );
   
  useEffect(() => {
    questionNumber > 1 &&
      setEarn(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  return (
    <div className="app">
      {user ? (
        <>
          <div className="main">
            {stop || questionNumber > 15? (
              <End earn={earn} setQuestionNumber={setQuestionNumber} 
              setStop={setStop} setSelectedAnswer={setSelectedAnswer} questionNumber={questionNumber}/>
            ) : (
              <>
                <div className="top">
                  <Timer setStop={setStop} questionNumber={questionNumber}
                  selectedAnswer={selectedAnswer}/>
                </div>
                <div className="bottom">
                  <Trivia
                    questionNumber={questionNumber}
                    setStop={setStop}
                    setQuestionNumber={setQuestionNumber}
                    setEarn={setEarn}
                    moneyPyramid={moneyPyramid}
                    setPyramidClassName={setPyramidClassName}
                    selectedAnswer={selectedAnswer}
                    setSelectedAnswer={setSelectedAnswer}
                  />
                </div>
              </>
            )}
          </div>
          <div className={pyramidClassName}>
            <ul className="moneyList">
              {moneyPyramid.map((item) => {
                return (
                  <li
                    key={item.id}
                    className={
                      questionNumber === item.id
                        ? "moneyListItem active"
                        : "moneyListItem"
                    }
                  >
                    <span className="listItemNumber">{item.id}</span>
                    <span className="listItemAmount">{item.amount}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <Start setUser={setUser} />
      )}
    </div>
  );
};

export default App;
