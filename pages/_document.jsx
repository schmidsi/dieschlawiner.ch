import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
<!--

 _____ _____ _____ _____ _____ _____ _____ _____ ____
|  |  |   | |     |  |  |  _  |     |   | |   __|    \\
|  |  | | | |   --|     |     |-   -| | | |   __|  |  |
|_____|_|___|_____|__|__|__|__|_____|_|___|_____|____/


- Technology & Engineering by Unchained Commerce GmbH - https://unchained.shop
- Design: Katrin von Niederhäusern - http://www.katrin.cool/

-->
    
  `,
          }}
        />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
