import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "~/constants/theme";

import type { NextPage } from "next";
import type { AppProps } from "next/app";

import "reset-css";

const GlobalStyle = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Roboto:wght@400;700&display=swap');

    body{
        color: #939393;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        background-color: ${({theme}) => theme.colors.background.primary};
    }
    
    a a:hover a:visited a:focus a:link a:active {
        color: ${({theme}) => theme.colors.fonts.orange};
        text-decoration: none;
    }
`;

const App: NextPage<AppProps> = ({ Component, pageProps }) => {

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
        </ThemeProvider>
    )
};

export default App;
