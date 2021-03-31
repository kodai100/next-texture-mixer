import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Channel } from '~/constants/DataStructure';

type Props = {
    channel: Channel;
    selected: Channel;
    onClick: (channel: Channel) => void;
}

export const RadioButton = (props: Props) => {

    const [selected, setSelected] = useState(false);

    useEffect(() => {

        if(props.channel == props.selected){
            setSelected(true);
        } else {
            setSelected(false);
        }

    }, [props.selected]);

    return (
        <Container selected={selected} onClick={() => {props.onClick(props.channel)}}>
            <div>
                {props.channel.toUpperCase()}
            </div>
        </Container>
    )

}


const Container = styled.div<{selected: boolean}>`
    background-color: ${({selected}) => selected?'#eee':''};

    display: flex;
    justify-content: center;
    align-items: center;

    width: 36px;
    height: 36px;

    cursor: pointer;

    border: 1px #666 dashed;
`;