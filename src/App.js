import React, { useEffect, useState } from "react";
import { nanoid } from 'nanoid'
import './App.css';
import Question from "./components/Question";

export default function App() {
    const [quizInfo, setQuizInfo] = useState([])
    const [quizStarted, setQuizStarted] = useState(false)
    const [quizCheck, setQuizCheck] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple')
                const result = await response.json()
                const quizArray = result.results
    
                const filteredQuizInfo = quizArray.map(quiz => {
                    const question = quiz.question
                    const correctAnswer = { id: nanoid(), value: quiz.correct_answer, isCorrect: true, isClicked: false }
                    const incorrectAnswers = quiz.incorrect_answers.map(answer => ({ id: nanoid(), value: answer, isCorrect: false, isClicked: false }))
                    const answersArray = [correctAnswer, ...incorrectAnswers]
    
                    for (let i = answersArray.length - 1; i > 0; i--) {
                        let j = Math.floor(Math.random() * (i + 1));
                        [answersArray[i], answersArray[j]] = [answersArray[j], answersArray[i]];
                    }
    
                    return { question: question, answers: [...answersArray]}
                })
                
                setQuizInfo(filteredQuizInfo)
            } catch (err) {
                console.log(err);
            }
        })();
    }, [])

    console.log(quizInfo)

    const questElements = quizInfo.map(quest => 
        <Question
            question={quest.question}
            answers={quest.answers}
            quizCheck={quizCheck}
        />
    )

    const introPage = (
        <div>
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button onClick={() => setQuizStarted(true)}>Start quiz</button>
        </div>
    )

    const gamePage = (
        <div>
            {questElements}
            {quizCheck && <p>You scored 5/5 correct answers</p>}
            {quizCheck ?
                <button onClick={() => {setQuizStarted(false); setQuizCheck(false)}}>Play again</button> :
                <button onClick={() => setQuizCheck(true)}>Check answers</button>
            }
        </div>
    )

    return (
        <div className="app">
            {quizStarted ? gamePage : introPage}
        </div>
    )
}
