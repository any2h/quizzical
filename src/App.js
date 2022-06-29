import React, { useEffect, useState } from "react";
import { nanoid } from 'nanoid'
import {decode} from 'html-entities';
import styled from "styled-components";
import IntroPage from "./components/IntroPage";
import GamePage from "./components/GamePage";

const Quizzical = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 680px;
    min-height: 600px;
    margin: 6rem auto 0;
    padding-inline: 1rem;

    &::before {
        content: '';
        position: fixed;
        height: 120px;
        width: 150px;
        left: 0;
        bottom: 0; 
        background-image: url('./images/blob-baby.png');
        background-repeat: no-repeat;
        
        @media (max-width: 768px) {
            position: absolute;
            height: 80px;
        }
    }

    &::after {
        content: '';
        position: fixed;
        height: 160px;
        width: 160px;
        right: 0;
        top: 0;
        background-image: url('./images/blob-lemony.png');
        background-repeat: no-repeat;
        
        @media (max-width: 768px) {
            position: absolute;
            width: 100px;
            height: 150px;
        }
    }
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
            const cleanState = prevState.map(quest => {
                const newAnswers = quest.answers.map(answer => answer.isClicked ? answer.isClicked = false : answer)
                return { ...quest, newAnswers }
            })

            const newState = cleanState.map(quest => {
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

    const introPage = (
        <IntroPage onClick={() => setQuizStarted(true)} />
    )

    const gamePage = (
        <GamePage
            quizInfo={quizInfo}
            quizLength={quizInfo.length}
            quizCheck={quizCheck}
            handleClick={handleClick}
            handleGameRestart={handleGameRestart}
            setQuizCheck={() => setQuizCheck(true)}
        />
    )

    return (
        <Quizzical>
            {quizStarted ?
                gamePage
                :
                introPage
            }
        </Quizzical>
    )
}
