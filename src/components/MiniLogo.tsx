import Link from 'next/link';
import React, {FC} from 'react';
import styled from 'styled-components';

import logo from '~/assets/svgs/logo.svg';
import { Icon } from '~/components/Icon';

type Props = {
    className? : string;
};

export const MiniLogo : FC<Props> = (props) => {
    return (
        <Container href="https://kodai100.com" target="_blank" className={props.className}>
            <Icon svgIcon={logo} width={40}></Icon>
            <NameGroup>
                <Name>Kodai Takao</Name>
            </NameGroup>
        </Container>
    )
}


const Container = styled.a`
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 40px;

    user-select:none;

    cursor: pointer;

    text-decoration:none; 

    path {
        fill: ${({theme}) => theme.colors.fonts.primary};
    }
`;

const Logo = styled.img`
    width: 40px;
    height: 40px;
`;

const NameGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    justify-content: center;
`;

const Name = styled.div`
    font-weight: 600;
    color: #939393;
    font-size: 30px;
`;