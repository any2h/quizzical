import React from 'react'
import styled from 'styled-components'
import Button from './Button'

const StyledIntroPage = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        margin-bottom: 1.75rem;
    }
   
`

export default function IntroPage({onClick}) {
    return (
        <StyledIntroPage>            
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <Button padding="14px 59px" weight="500" onClick={onClick}>Start quiz</Button>
        </StyledIntroPage>
    )
}
