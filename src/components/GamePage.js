import React from 'react'
import styled from 'styled-components'
import Question from './Question'
import Button from './Button'

const StyledGamePage = styled.div`
    max-width: 500px;

    > div:last-child {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1.5rem;
        gap: 1rem;
    }

    > div:last-child > p {
        font-size: .8rem;
        font-weight: 700;
    }
`

export default function GamePage({quizInfo, quizLength, quizCheck, handleClick, handleGameRestart, setQuizCheck}) {
    const questElements = quizInfo.map((quest, i) => 
        <Question
            key={i}
            question={quest.question}
            answers={quest.answers}
            quizCheck={quizCheck}
            handleClick={handleClick}
        />
    )

    const correctAnswersArray = quizInfo.map(quest => {
        let answersArr = []

        quest.answers.map(answer => answer.isClicked && answer.isCorrect ? answersArr.push(answer) : false)

        return answersArr
    })

    const filteredCorrectAnswers = correctAnswersArray.filter(answer => answer.length)

    return (
        <StyledGamePage>
            {questElements}
            <div>
                {quizCheck && <p>You scored {filteredCorrectAnswers.length}/{quizLength} correct answers</p>}
                {quizCheck ?
                    <Button fsize=".64rem" weight="600" padding="10px 23px" onClick={handleGameRestart}>Play again</Button>
                    :
                    <Button fsize=".64rem" weight="600" padding="10px 23px" onClick={() => setQuizCheck(true)}>Check answers</Button>
                }
            </div>
        </StyledGamePage>
    )
}
