import React, { useState, useEffect } from 'react';
import { Fullscreen } from '~/components/FullScreen';
import styled from 'styled-components';
import { InputNode } from '~/components/InputNode';
import { OutputArea } from '~/components/OutputArea';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
import { TextButton } from '~/components/TextButton';

import { makeId } from '~/lib/MakeGUID';
import { IconButton } from '~/components/IconButton';
import { Channel, Data } from '~/lib/WebGLUtil';

export const AppScreen = () => {

    const [imageR, setImageR] = useState("");
    const [imageG, setImageG] = useState("");
    const [imageB, setImageB] = useState("");
    const [imageA, setImageA] = useState("");

    const [imageRChannel, setImageRChannel] = useState<Channel>("r");
    const [imageGChannel, setImageGChannel] = useState<Channel>("r");
    const [imageBChannel, setImageBChannel] = useState<Channel>("r");
    const [imageAChannel, setImageAChannel] = useState<Channel>("r");
    
    const [mix, setMix] = useState("");

    const data = () : Data => {
        return (
            {
                r: {
                    fileName: imageR,
                    selectedChannel: imageRChannel
                },
                g: {
                    fileName: imageG,
                    selectedChannel: imageGChannel
                },
                b: {
                    fileName: imageB,
                    selectedChannel: imageBChannel
                },
                a: {
                    fileName: imageA,
                    selectedChannel: imageAChannel
                }
            }
        )
    }

    return (
        <Fullscreen>
            <Header></Header>
            <Container>
                <FlexContainer>
                    <InputContainer>
                        <InputNode label="R" imageBlob={imageR} onSetImage={(imageBlob) => setImageR(imageBlob)} onSetChannel={(id) => setImageRChannel(id)}></InputNode>
                        <InputNode label="G" imageBlob={imageG} onSetImage={(imageBlob) => setImageG(imageBlob)} onSetChannel={(id) => setImageGChannel(id)}></InputNode>
                        <InputNode label="B" imageBlob={imageB} onSetImage={(imageBlob) => setImageB(imageBlob)} onSetChannel={(id) => setImageBChannel(id)}></InputNode>
                        <InputNode label="A" imageBlob={imageA} onSetImage={(imageBlob) => setImageA(imageBlob)} onSetChannel={(id) => setImageAChannel(id)}></InputNode>
                        <StyledTextButton label="Clear All" onClick={() => {
                            setImageR(""); setImageG(""); setImageB(""); setImageA("");
                        }}></StyledTextButton>
                    </InputContainer>
                    <MixButtonCentered onClick={() => {setMix(makeId(5))}}></MixButtonCentered>
                    <OutputContainer>
                        <OutputAreaCentered data={data()} execute={mix} />
                    </OutputContainer>
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

const OutputContainer = styled.div`
    margin: auto 0;
`;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const OutputAreaCentered = styled(OutputArea)`
    
`;

const MixButtonCentered = styled(IconButton)`
    margin: auto 50px;
`;

const StyledTextButton = styled(TextButton)`
    margin: 0 auto;
    margin-top: 20px; 
`;