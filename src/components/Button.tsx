import React from 'react';
import styled from 'styled-components';

type Props = {
    className?: string;
    onClick: () => void;
}

export const Button = (props: Props) => {

    return (
        <Container className={props.className} onClick={() => {props.onClick()}}>

        </Container>
    )

}


const Container = styled.div`
    width: 50px;
    height: 50px;
    cursor: pointer;

    background-color: white;
`;