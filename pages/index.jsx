import { useContext } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useFormik } from 'formik';
import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { CodeContext } from './_app';
import styles from './index.css';

const Home = () => {
  const apolloClient = useApolloClient();
  const { code, setCode } = useContext(CodeContext);

  const formik = useFormik({
    initialValues: {
      code: 'r7qkev',
    },
    onSubmit: values => {
      console.log('onsubmit');
      setCode(values.code);
      Router.push('/form');
    },
    validate: async values => {
      if (values.code.length === 6) {
        const result = await apolloClient.query({
          query: gql`
            query IsValidCode($code: String) {
              isValidCode(code: $code)
            }
          `,
          variables: {
            code: values.code,
          },
          fetchPolicy: 'no-cache',
        });

        if (result.data.isValidCode && !code) {
          formik.submitForm();
        } else {
          return { code: 'Falscher code' };
        }
      }
    },
  });

  return (
    <div className="root">
      <Head>
        <title>Schlawiner</title>
      </Head>

      <form
        onSubmit={formik.handleSubmit}
        className={formik.errors.code && 'animated shake'}
      >
        <div className="logo-holder">
          <img src="/logo.png" />
        </div>
        <label htmlFor="code" className="pw">
          <input
            autoComplete="off"
            id="code"
            name="code"
            type="string"
            onChange={formik.handleChange}
            value={formik.values.code}
            maxLength={6}
          />
        </label>
      </form>

      <style jsx>{styles}</style>
    </div>
  );
};

export default Home;
