import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Resolution } from '~/constants/DataStructure';

type Props = {
    resolution: Resolution;
    selected: Resolution;
    onClick: (channel: Resolution) => void;
}

export const ResolutionRadioButton = (props: Props) => {

    const [selected, setSelected] = useState(false);

    useEffect(() => {

        if(props.resolution == props.selected){
            setSelected(true);
        } else {
            setSelected(false);
        }

    }, [props.selected]);

    return (
        <Container selected={selected} onClick={() => {props.onClick(props.resolution)}}>
            <div>
                {props.resolution.toUpperCase()}
            </div>
        </Container>
    )

}


const Container = styled.div<{selected: boolean}>`
    background-color: ${({selected}) => selected?'#eee':''};

    display: flex;
    justify-content: center;
    align-items: center;

    width: 50px;
    height: 28.3px;

    cursor: pointer;

    border: 1px #666 dashed;
`;