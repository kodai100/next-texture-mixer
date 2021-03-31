import React, { useState } from 'react';
import styled from 'styled-components';

import {InputRadioButtonGroup} from '~/components/ChannelRadioButtonGroup';
import { ImageSource } from '~/components/ImageSource';
import { Channel, ImageSetting } from '~/constants/DataStructure';
import { ImageSettingToggleGroup } from './ImageSettingToggleGroup';

type Props = {
    label: string;
    imageBlob: string;
    onSetChannel: (channel: Channel) => void;
    onSetImage: (blobURL: string) => void;
    onSetSetting: (setting: ImageSetting) => void;
}

export const InputNode = (props: Props) => {

    return (
        <Container>
            <InputRadioButtonGroup onSelected={(channel) => {props.onSetChannel(channel)}}></InputRadioButtonGroup>
            <ImageSource label={props.label} imageBlob={props.imageBlob} onSetImage={props.onSetImage}></ImageSource>
            <ImageSettingToggleGroup onUpdated={(setting) => props.onSetSetting(setting)}></ImageSettingToggleGroup>
        </Container>
    )

}

const Container = styled.div`
    display: flex;
    flex-direction: row;

    
    &:not(:first-child){
        margin-top: 10px;
    }
`;