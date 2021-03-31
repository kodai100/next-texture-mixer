import React, { useState } from 'react';
import { Fullscreen } from '~/components/FullScreen';
import styled from 'styled-components';
import { InputNode } from '~/components/InputNode';
import { OutputArea } from '~/components/OutputArea';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
import { TextButton } from '~/components/TextButton';

import { makeId } from '~/lib/MakeGUID';
import { IconButton } from '~/components/IconButton';
import { Channel, Data, ImageSetting } from '~/constants/DataStructure';

export const AppScreen = () => {

    const [imageR, setImageR] = useState("");
    const [imageG, setImageG] = useState("");
    const [imageB, setImageB] = useState("");
    const [imageA, setImageA] = useState("");

    const [rChannel, setRChannel] = useState<Channel>("r");
    const [gChannel, setGChannel] = useState<Channel>("r");
    const [bChannel, setBChannel] = useState<Channel>("r");
    const [aChannel, setAChannel] = useState<Channel>("r");

    const [settingR, setSettingR] = useState<ImageSetting>({invert:false,white:false});
    const [settingG, setSettingG] = useState<ImageSetting>({invert:false,white:false});
    const [settingB, setSettingB] = useState<ImageSetting>({invert:false,white:false});
    const [settingA, setSettingA] = useState<ImageSetting>({invert:false,white:false});
    
    const [mix, setMix] = useState("");

    const data = () : Data => {
        return (
            {
                r: { fileName: imageR, selectedChannel: rChannel, setting: settingR },
                g: { fileName: imageG, selectedChannel: gChannel, setting: settingG },
                b: { fileName: imageB, selectedChannel: bChannel, setting: settingB },
                a: { fileName: imageA, selectedChannel: aChannel, setting: settingA }
            }
        )
    }

    const clearImages = () => {
        setImageR(""); setImageG(""); setImageB(""); setImageA("");
    }

    return (
        <Fullscreen>
            <Header></Header>
            <Container>
                <FlexContainer>
                    <InputContainer>
                        <InputNode label="R" imageBlob={imageR} onSetImage={(imageBlob) => setImageR(imageBlob)} onSetChannel={(id) => setRChannel(id)} onSetSetting={(setting)=>setSettingR(setting)}></InputNode>
                        <InputNode label="G" imageBlob={imageG} onSetImage={(imageBlob) => setImageG(imageBlob)} onSetChannel={(id) => setGChannel(id)} onSetSetting={(setting)=>setSettingG(setting)}></InputNode>
                        <InputNode label="B" imageBlob={imageB} onSetImage={(imageBlob) => setImageB(imageBlob)} onSetChannel={(id) => setBChannel(id)} onSetSetting={(setting)=>setSettingB(setting)}></InputNode>
                        <InputNode label="A" imageBlob={imageA} onSetImage={(imageBlob) => setImageA(imageBlob)} onSetChannel={(id) => setAChannel(id)} onSetSetting={(setting)=>setSettingA(setting)}></InputNode>
                        <StyledTextButton label="Clear All" onClick={() => {clearImages()}}></StyledTextButton>
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