import React from 'react';
import styled from 'styled-components';

import {IconDefinition} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
    className?: string;
    svgIcon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    awesomeIcon?: IconDefinition;
    color?: string;
    width?: number;
    height?: number;
    label?: string;
    link?: string;
    initialColor?: boolean;
}

export const Icon = (props: Props) => {

    const style = {
        fontSize: props.width??80,
    }

    const onClick = () => {
        if(props.link != undefined){
            window.open(props.link, '_blank');
        }
    }

    const generateSvg = () => {
        if(props.awesomeIcon==undefined && props.svgIcon!=undefined){
            return <props.svgIcon width={props.width??80} height={props.height??props.width??80} />
        }
    }

    const generateAwesome = () => {
        if(props.awesomeIcon!=undefined && props.svgIcon==undefined){
            return <FontAwesomeIcon icon={props.awesomeIcon} style={style} />
        }
    }

    return(
        <Container className={props.className} onClick={() => {onClick()}} initialColor={props.initialColor??false}>
            {generateAwesome()}
            {generateSvg()}
            {props.label != undefined ? <Label>{props.label}</Label>: <></>}
        </Container>
    )

}


const Container = styled.div<{initialColor?: boolean}>`

    path, rect, circle, polygon {
        transition: all 0.2s;
        fill: ${({theme, initialColor}) => initialColor ? theme.colors.fonts.orange : theme.colors.icons.primary} !important;
    }

    
    cursor: pointer;

    &:hover {
        path, rect, circle, polygon {
            fill: ${({theme}) => theme.colors.fonts.orange};
        }
    }
`;

const Label = styled.div`
    margin-top: 15px;
    width: 100%;
    text-align: center;
`;
