import React, { useState } from 'react';
import App from 'next/app';
import Head from 'next/head';
import * as Sentry from '@sentry/browser';

import withData from '../lib/withData';

import styles from './_app.css?type=global';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://7ff1270109f14669bfe2edbec0529457@sentry.io/1477328',
  });
}

export const CodeContext = React.createContext({ code: '', setCode: () => {} });

const CodeContextWrapper = ({ children, ...props }) => {
  const [code, setCode] = useState('');

  return (
    <CodeContext.Provider value={{ code, setCode }}>
      {children}
    </CodeContext.Provider>
  );
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <CodeContextWrapper>
        <Head>
          <title>Die Schlawiner</title>
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          />
        </Head>
        <style jsx global>
          {styles}
        </style>
        <Component {...pageProps} />
      </CodeContextWrapper>
    );
  }
}

export default withData(MyApp);
