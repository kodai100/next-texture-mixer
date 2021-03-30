import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


type Props = {
    children?: React.ReactNode; 
}

export const Fullscreen = (props:Props) => {

    const [appHeight, setAppHeight] = useState(0);

    const set = () => {
        setAppHeight(window.innerHeight);
    }

    useEffect(() => {

        set();

        window.addEventListener('resize', set);

        return () => window.removeEventListener('resize', set);

    }, []);


    return (
        <Container appHeight={appHeight}>{props.children}</Container>
    )
}


const Container = styled.div<{appHeight: number}>`
    display: flex;  /* for centering */
    justify-content: center;
    align-items: center;

    width: 100%;
    min-height: ${props => (props.appHeight === 0 ? '100vh' : `${props.appHeight}px`)};
`;
