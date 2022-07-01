import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    font-size: ${props => props.fsize};
    font-weight: ${props => props.weight};
    padding: ${props => props.padding};
    cursor: pointer;
    color: #F5F7FB;
    border: 0;
    border-radius: 15px;
    background-color: #4D5B9E;
    transition: all .2s ease-in-out;

    &:hover {
        
        background-color: #F5F7FB;
        color: #293264;
        outline: 0.771045px solid #4D5B9E;
    }

    &:active {
        transform: scale(.97);
    }
`

export default function Button({...props}) {
    return (
        <StyledButton {...props}></StyledButton>
    )
}
