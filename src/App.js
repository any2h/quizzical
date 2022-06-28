import React, { useEffect, useState } from "react";
import { nanoid } from 'nanoid'
import {decode} from 'html-entities';
import styled from "styled-components";
import IntroPage from "./components/IntroPage";
import Question from "./components/Question";

const Quizzical = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
    background-color: #F5F7FB;
`

export default function App() {
    const [quizInfo, setQuizInfo] = useState([])
    const [quizStarted, setQuizStarted] = useState(false)
    const [quizCheck, setQuizCheck] = useState(false)

    useEffect(() => {
        getQuizData()
    }, [])

    async function getQuizData() {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            const result = await response.json()
            const quizArray = result.results

            const filteredQuizInfo = quizArray.map(quiz => {
                const question = decode(quiz.question)
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
    }

    function handleClick(id) {
        setQuizInfo(prevState => {
            const newState = prevState.map(quest => {
                const newAnswers = quest.answers.map(answer =>
                    answer.id === id ? { ...answer, isClicked: !answer.isClicked } : answer
                )
                
                return { ...quest, answers: [...newAnswers] }
            })

            return newState
        })
    }

    function handleGameRestart() {
        setQuizStarted(false)
        setQuizCheck(false)
        getQuizData()
    }
 
    const questElements = quizInfo.map(quest => 
        <Question
            question={quest.question}
            answers={quest.answers}
            quizCheck={quizCheck}
            handleClick={handleClick}
        />
    )

    const correctAnswersArray = quizInfo.map(quest => {
        let answerArr = []

        quest.answers.map(answer => answer.isClicked && answer.isCorrect ? answerArr.push(answer) : false)

        return answerArr
    })

    const filteredCorrectAnswers = correctAnswersArray.filter(answer => answer.length)

    const gamePage = (
        <div>
            {questElements}
            {quizCheck && <p>You scored {filteredCorrectAnswers.length}/5 correct answers</p>}
            {quizCheck ?
                <button onClick={handleGameRestart}>Play again</button> :
                <button onClick={() => setQuizCheck(true)}>Check answers</button>
            }
        </div>
    )

    return (
        <Quizzical>
            {quizStarted ? gamePage : <IntroPage onClick={() => setQuizStarted(true)} />}
        </Quizzical>
    )
}
