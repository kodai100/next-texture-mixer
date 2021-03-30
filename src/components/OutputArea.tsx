import React from 'react';
import styled from 'styled-components';

type Props = {
    className?: string;
}

export const OutputArea = (props: Props) => {

    return (
        <Container className={props.className}>
            <OutputCanvas />
            <OverlayText>Output</OverlayText>
        </Container>
    )

}


const Container = styled.div`
    position: relative;
`;

const OutputCanvas = styled.canvas`
    border: 1px #666 dashed;
    color: #999;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    width: 150px;
    height : 150px;
    z-index: 1;
`;

const OverlayText = styled.div`
    position: absolute;
    z-index: 3;
    top: 0;

    color: #999;
    font-size: 18px;
    font-weight: bold;
    text-align: center;

    width: 150px;
    height: 150px;

    display: flex;
    justify-content: center;
    align-items: center;
`;