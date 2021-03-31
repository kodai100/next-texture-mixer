import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

type Props = {
    className?: string;
    width?: number;
    onClick: () => void;
}

export const IconButton = (props: Props) => {

    const style = {
        fontSize: props.width?props.width:50
    }

    return (
        <Container className={props.className} onClick={() => {props.onClick()}}>
            <FontAwesomeIcon style={style} icon={faArrowRight}></FontAwesomeIcon>
        </Container>
    )

}


const Container = styled.div`
    width: 50px;
    height: 50px;
    cursor: pointer;

    &:hover {
        color: white;
    }
`;