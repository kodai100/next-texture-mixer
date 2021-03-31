import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { RadioButton } from '~/components/RadioButton';
import { Channel } from '~/lib/WebGLUtil';

type Props = {
    onSelected: (channel: Channel) => void;
}

export const InputRadioButtonGroup = (props: Props) => {

    const [selected, setSelected] = useState<Channel>("r");

    useEffect(() => {
        props.onSelected(selected);
    },[selected]);

    return (
        <Container>
            <RadioButton channel="r" selected={selected} onClick={(channel)=>{setSelected(channel)}}></RadioButton>
            <RadioButton channel="g" selected={selected} onClick={(channel)=>{setSelected(channel)}}></RadioButton>
            <RadioButton channel="b" selected={selected} onClick={(channel)=>{setSelected(channel)}}></RadioButton>
            <RadioButton channel="a" selected={selected} onClick={(channel)=>{setSelected(channel)}}></RadioButton>
        </Container>
    )

}


const Container = styled.div`
`;