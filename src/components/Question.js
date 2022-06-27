import React from "react";

export default function Question({ question, answers, quizCheck, handleClick }) {

    const gamePageBtns = answers.map(answer =>
        <div
            style={{ backgroundColor: answer.isClicked && 'lightblue' }}
            onClick={() => handleClick(answer.id)}
        >
            {answer.value}
        </div>
    )

    const checkPageBtns = answers.map(answer => {
        if (answer.isCorrect) {
            return <div style={{ backgroundColor: 'lightgreen' }}>{answer.value}</div>
        } else if (!answer.isCorrect && answer.isClicked) {
            return <div style={{ backgroundColor: 'coral' }}>{answer.value}</div>
        } else {
            return <div>{answer.value}</div>
        }
    })
    
    return (
        <div className="question">
            <h3>{question}</h3>
            {quizCheck ? checkPageBtns : gamePageBtns}
        </div>
    )
}
