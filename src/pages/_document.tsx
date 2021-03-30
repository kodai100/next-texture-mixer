import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
} from "next/document";

import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {

    static async getInitialProps(context: DocumentContext): Promise<DocumentInitialProps> {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = context.renderPage;

        try {
            context.renderPage = () =>
                originalRenderPage({
                enhanceApp: (App) => (props) =>
                    sheet.collectStyles(<App {...props} />),
                });
            const initialProps = await Document.getInitialProps(context);

            return {
                ...initialProps,
                styles: (
                <>
                    {initialProps.styles}
                    {sheet.getStyleElement()}
                </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render(): React.ReactElement {
        return (
            <Html lang="ja">
                <Head>
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <title>Kodai Takao Portfolio Website</title>
                    <meta charSet="utf-8" />

                    {/* <meta name="description" content="A CG Director and Full Stack Engineer based in TOKYO."></meta>

                    <meta property="og:title" content="Kodai Takao Portfolio Website"></meta>
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://kodai100.com" />
                    <meta property="og:image" content="https://kodai100.com/logo.png" />
                    <meta property="og:description" content="A CG Director and Full Stack Engineer based in TOKYO."/>

                    <meta property="fb:app_id" content="2182209018685216" />

                    <meta name="twitter:card" content="summary"></meta>
                    <meta name="twitter:site" content="@kodai100_tw"></meta>
                    <meta name="twitter:description" content="A CG Director and Full Stack Engineer based in TOKYO."></meta> */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
