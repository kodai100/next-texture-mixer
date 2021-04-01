import React from 'react';
import styled from 'styled-components';


export const Footer = () => {

    return (
        <Container>
            <FlexBox>
                <div>
                    @2020 Kodai Takao All Rights Reserved.
                </div>
            </FlexBox>
        </Container>
    )

}


const Container = styled.div`
    position: fixed;
    left:0;
    bottom: 0;

    width: 100%;
    height: 50px;

    background-color: #2e2e2e;
`;

const FlexBox = styled.div`
    display: flex;
    width: 100%;
    height: 100%;

    justify-content: center;
    align-items: center;
`;