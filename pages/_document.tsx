import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css"
          />
          <meta property="og:image" content="/static/og-image.jpg" />
          <meta property="og:title" content="FLOOM" />
          <meta
            property="og:description"
            content="쉽고 재미있게 공간을 탐방하며 몰입의 즐거움을 경험해보세요!"
          />
          <title>몰입의 즐거움을 경험하다, FLOOM!</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
