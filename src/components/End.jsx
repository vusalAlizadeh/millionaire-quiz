import React from 'react'

const End = ({earn,setQuestionNumber,setStop,setSelectedAnswer,questionNumber}) => {

    const handleClick=()=>{
        setStop(false)
        setSelectedAnswer(null)
        setQuestionNumber(1)
    }
    return (
        <div className='yourEarn'>
            {questionNumber > 15 && <h1 className="custom-end-text">Congratulations</h1>}
            <h2>You earned {earn} </h2>
            <button className='endButton' onClick={handleClick}>Play again</button>
        </div>
    )
}
export default End;
