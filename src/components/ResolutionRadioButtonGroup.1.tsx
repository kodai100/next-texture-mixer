import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Resolution } from '~/constants/DataStructure';
import { ResolutionRadioButton } from './ResolutionRadioButton';

type Props = {
    onSelected: (resolution: Resolution) => void;
}

export const ResolutionRadioButtonGroup = (props: Props) => {

    const [selected, setSelected] = useState<Resolution>("2048");

    useEffect(() => {
        props.onSelected(selected);
    },[selected]);

    return (
        <Container>
            <ResolutionRadioButton resolution="256" selected={selected} onClick={(resolution)=>{setSelected(resolution)}}></ResolutionRadioButton>
            <ResolutionRadioButton resolution="512" selected={selected} onClick={(resolution)=>{setSelected(resolution)}}></ResolutionRadioButton>
            <ResolutionRadioButton resolution="1024" selected={selected} onClick={(resolution)=>{setSelected(resolution)}}></ResolutionRadioButton>
            <ResolutionRadioButton resolution="2048" selected={selected} onClick={(resolution)=>{setSelected(resolution)}}></ResolutionRadioButton>
            <ResolutionRadioButton resolution="4096" selected={selected} onClick={(resolution)=>{setSelected(resolution)}}></ResolutionRadioButton>
        </Container>
    )

}


const Container = styled.div`
`;