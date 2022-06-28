import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    font-size: ${props => props.fsize};
    font-weight: ${props => props.weight};
    padding: ${props => props.padding};
    color: #F5F7FB;
    border: 0;
    border-radius: 15px;
    background-color: #4D5B9E;
`

export default function Button({...props}) {
    return (
        <StyledButton {...props}></StyledButton>
    )
}
