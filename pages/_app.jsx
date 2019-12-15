import React, { useState } from 'react';
import App from 'next/app';

import withData from '../lib/withData';

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
        <Component {...pageProps} />
      </CodeContextWrapper>
    );
  }
}

export default withData(MyApp);
