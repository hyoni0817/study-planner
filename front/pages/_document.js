  
import React from 'react';
import PropTypes from 'prop-types';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document { 
    static async getInitialProps(context) { 
        const sheet = new ServerStyleSheet();
        const originalRenderPage = context.renderPage;//renderPage로 내부페이지를 렌더링할 수 있게함.

        try {
            context.renderPage = () => originalRenderPage({
                enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
            });
            //App은 app.js이고 context에서 renderPage를 해줘야 app.js를 실행할 수 있다.

            const initialProps = await Document.getInitialProps(context);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            }
        } finally {
            sheet.seal();
        }
    }

    render() {
        return(
            <Html>
                <Head />
                <body>
                    {/* Main이 app.js가 될 것이다. */}
                    <Main /> 

                    {/* Portal을 사용한 모바일 폼을 Main 컴포넌트 위에 겹쳐서 보여주기 위해 div 추가  */}
                    <div id="mobile-form"></div>
                    <div id="mobile-login"></div>

                    {/* ie 에서의 실행을 위해 폴리필 사용 */}
                    {process.env.NODE_ENV === 'production'
                    && <script src="https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated" />}
                    {/* Next 구동에 필요한 script를 모아둔 것 */}
                    <NextScript />
                </body>
            </Html>
        )
    }
}

MyDocument.propTypes = {
    helmet: PropTypes.object.isRequired,
    styleTags: PropTypes.object.isRequired,
}

export default MyDocument;