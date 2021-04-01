import React from 'react';
import styled from 'styled-components';
import { MiniLogo } from './MiniLogo';


export const Header = () => {

    return (
        <Container>
            <MiniLogoCentered className=""></MiniLogoCentered>
        </Container>
    )
}


const Container = styled.div`
    display: flex;
    flex-direction: row;

    width: 100%;
    height: 70px;
    position: fixed;
    top: 0;
    background-color: #2e2e2e;
    z-index: 100;

    user-select:none;
`;

const MiniLogoCentered = styled(MiniLogo)`
    margin-left: 60px;
    margin-top: auto;
    margin-bottom: auto;
`;