import React from 'react';
import App from 'next/app';

import withData from '../lib/withData';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default withData(MyApp);
