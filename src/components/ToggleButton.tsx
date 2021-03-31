import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
    label: string;
    onClick: (isOn: boolean) => void;
}

export const ToggleButton = (props: Props) => {

    const [selected, setSelected] = useState(false);

    const onClick = () => {
        const res = !selected;
        setSelected(res);
        props.onClick(res);
    }

    return (
        <Container selected={selected} onClick={() => { onClick() }}>
            <div>
                {props.label.toUpperCase()}
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