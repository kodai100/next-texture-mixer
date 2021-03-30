import React, { useState } from 'react';
import { Fullscreen } from '~/components/FullScreen';
import styled from 'styled-components';
import { ImageSource } from '~/components/ImageSource';
import { OutputArea } from '~/components/OutputArea';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
import { Button } from '~/components/Button';

export const AppScreen = () => {

    const [clear, setClear] = useState(false);

    return (
        <Fullscreen>
            <Header></Header>
            <Container>
                <FlexContainer>
                    <InputContainer>
                        <ImageSource name="R" clear={clear}></ImageSource>
                        <ImageSource name="G" clear={clear}></ImageSource>
                        <ImageSource name="B" clear={clear}></ImageSource>
                        <ImageSource name="A" clear={clear}></ImageSource>
                    </InputContainer>
                    <MixButtonCentered onClick={() => {}}></MixButtonCentered>
                    <OutputAreaCentered></OutputAreaCentered>
                </FlexContainer>
            </Container>
            <Footer></Footer>
        </Fullscreen>
    )
}

const Container = styled.div`
    position: relative;
`;

const InputContainer = styled.div`
`;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const OutputAreaCentered = styled(OutputArea)`
    margin: auto 0;
`;

const MixButtonCentered = styled(Button)`
    margin: auto 50px;
`;