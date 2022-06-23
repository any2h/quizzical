import React, { useEffect, useState } from "react";
import { nanoid } from 'nanoid'
import './App.css';
import Question from "./components/Question";

export default function App() {
    const [quizStarted, setQuizStarted] = useState(false)
    const [quiz, setQuiz] = useState([])
    const [quizCheck, setQuizCheck] = useState(false)
    // const [userChoice, setUserChoice] = useState([])
    // console.log(quiz)

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            .then(res => res.json())
            .then(res => setQuiz(res.results))
    }, [])

    const questList = quiz.map(quiz => {
        const question = quiz.question
        const correctAnswer = { id: nanoid(), value: quiz.correct_answer, isCorrect: true, isClicked: false}
        const incorrectAnswers = quiz.incorrect_answers.map(answer => ({ id: nanoid(), value: answer, isCorrect: false, isClicked: false}))
        const answerList = [correctAnswer, ...incorrectAnswers]

        for (let i = answerList.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [answerList[i], answerList[j]] = [answerList[j], answerList[i]];
        }

        return [question, answerList]
    })

    // console.log(questionList)

    const questionElements = questList.map(quest =>
        <Question
            question={quest[0]}
            answerList={quest[1]}
            handleCheck={handleCheck}
            quizCheck={quizCheck}
        />
    )

    function handleCheck() {
        setQuizCheck(!quizCheck)
    }

    const introPage = (
        <div>
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button onClick={() => setQuizStarted(true)}>Start quiz</button>
        </div>
    )

    const quizPage = (
        <div>
            {questionElements}
            <div>
                {quizCheck && <p>You scored 5/5 correct answers</p>}
                {quizCheck ?
                    <button onClick={() => {setQuizStarted(false); setQuizCheck(false)}}>Play again</button> :
                    <button onClick={() => setQuizCheck(true)}>Check answers</button>
                }
            </div>
        </div>
    )

    return (
        <div className="app">
            {quizStarted ? quizPage : introPage}
        </div>
    )
}
