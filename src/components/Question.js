import styled from "styled-components";

const StyledQuestion = styled.div`
    border-bottom: 1px solid #DBDEF0;
    padding-bottom: 1rem;
    margin-bottom: 1rem;

    h3 {
        font-size: 1rem;
        line-height: 1.2;
        margin-bottom: .75rem;
    }

    > div {
        display: flex;
        gap: 1rem;
    }
`

const AnswerBtn = styled.button`
    min-width: 65px;
    min-height: 20px;
    font-size: .64rem;
    font-weight: 500;
    color: #293264;
    border: 0;
    border-radius: 7.71045px;
    outline: ${props => props.isClicked ? 0 : `0.771045px solid #4D5B9E`} ;
    opacity: ${props => props.check ? '.5' : ''};
    background-color: ${props => {
            if (props.correct)  {
                return '#94D7A2'
            } else if (props.incorrect) {
                return '#F8BCBC'
            } else if (props.isClicked) {
                return `#D6DBF5`
            } else {
                return `transparent`
            }
        }};
    transition: all .15s ease-in-out;

    &:hover {
        background-color: rgba(219, 222, 240, .6);
    }
`

export default function Question({ question, answers, quizCheck, handleClick }) {

    const answerBtns = answers.map(answer => {
        if (quizCheck) {
            if (answer.isCorrect) {
                return <AnswerBtn key={answer.id} correct isClicked>{answer.value}</AnswerBtn>
            } else if (!answer.isCorrect && answer.isClicked) {
                return <AnswerBtn key={answer.id} check incorrect isClicked>{answer.value}</AnswerBtn>
            } else {
                return <AnswerBtn key={answer.id} check>{answer.value}</AnswerBtn>
            }
        } else {
            return <AnswerBtn
                        key={answer.id}
                        isClicked={answer.isClicked}
                        onClick={() => handleClick(answer.id)}
                    >
                        {answer.value}
                    </AnswerBtn>
        }
    })
    
    return (
        <StyledQuestion>
            <h3>{question}</h3>
            <div>
                {answerBtns}
            </div>
        </StyledQuestion>
    )
}
