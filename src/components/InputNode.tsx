import React, { useState } from 'react';
import styled from 'styled-components';

import {InputRadioButtonGroup} from '~/components/InputRadioButtonGroup';
import { ImageSource } from '~/components/ImageSource';
import { Channel } from '~/lib/WebGLUtil';

type Props = {
    label: string;
    imageBlob: string;
    onSetChannel: (channel: Channel) => void;
    onSetImage: (blobURL: string) => void;
}

export const InputNode = (props: Props) => {

    return (
        <Container>
            <InputRadioButtonGroup onSelected={(channel) => {props.onSetChannel(channel)}}></InputRadioButtonGroup>
            <ImageSource label={props.label} imageBlob={props.imageBlob} onSetImage={props.onSetImage}></ImageSource>
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