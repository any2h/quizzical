import React, { useState } from "react";

export default function Question(props) {
    // console.log(props)
    const { question, answerList, quizCheck, handleCheck } = props
    const [answers, setAnswers] = useState(answerList)
    // console.log(quizCheck)
    // console.log(answers); 

    function handleClick(id) {
        console.log(id)
        setAnswers(prevState => prevState.map(answer => 
           answer.id === id ? {...answer, isClicked: !answer.isClicked} : answer
        ))
    }

    const answerBtns = answers.map(answer => 
        <div onClick={() => handleClick(answer.id)} style={{backgroundColor: answer.isClicked ? 'lightblue' : ''}} >{answer.value}</div>
    )

    const checkBtns = answers.map(answer => {
        if (answer.isCorrect) {
            return <div style={{backgroundColor: 'lightgreen'}}>{answer.value}</div>
        } else if (answer.isClicked && !answer.isCorrect) {
           return <div style={{backgroundColor: 'coral'}}>{answer.value}</div>
        } else {
            return<div>{answer.value}</div>
        }
    })

    return (
        <div className="question">
            <h3 className="question__heading">{question}</h3>
            {quizCheck ? checkBtns : answerBtns}
        </div>
    )
}