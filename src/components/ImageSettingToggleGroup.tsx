import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ImageSetting } from '~/constants/DataStructure';
import { ToggleButton } from './ToggleButton';

type Props = {
    onUpdated: (imageSetting: ImageSetting) => void;
}

export const ImageSettingToggleGroup = (props: Props) => {

    const [invert, setInvert] = useState(false);
    const [white, setWhite] = useState(false);

    useEffect(() => {

        const setting : ImageSetting = {
            invert: invert,
            white: white
        }

        props.onUpdated(setting);

    }, [invert, white]);


    return (
        <Container>
            <ToggleButton label="i" onClick={(isOn) => {setInvert(isOn)}}></ToggleButton>
            <ToggleButton label="w" onClick={(isOn) => {setWhite(isOn)}}></ToggleButton>
        </Container>
    )

}


const Container = styled.div`
`;