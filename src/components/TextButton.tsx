import React from 'react';
import styled from 'styled-components';

type Props = {
    className?: string;
    label: string;
    onClick: () => void;
}

export const TextButton = (props: Props) => {

    return (
        <Container className={props.className} onClick={() => {props.onClick()}}>
            <div>
                {props.label}
            </div>
        </Container>
    )

}


const Container = styled.div`
    width: 150px;
    height: 50px;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid ${({theme}) => theme.colors.fonts.primary};

    &:hover {
        background-color: #444;
    }
`;