import { useApolloClient } from '@apollo/react-hooks';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import gql from 'graphql-tag';

import { CodeContext } from './_app';

const Form = () => {
  const apolloClient = useApolloClient();
  const router = useRouter();

  const { code } = useContext(CodeContext);

  if (process.browser && !code) {
    router.push('/');
  }

  const formik = useFormik({
    initialValues: {
      vorname: process.env.NODE_ENV === 'development' ? 'Hans' : '',
      nachname: process.env.NODE_ENV === 'development' ? 'Muster' : '',
      adresse: process.env.NODE_ENV === 'development' ? 'Bahnhofstrasse 1' : '',
      plz: process.env.NODE_ENV === 'development' ? '8001' : '',
      ort: process.env.NODE_ENV === 'development' ? 'Zürich' : '',
      mobile: process.env.NODE_ENV === 'development' ? '0791234567' : '',
      email: process.env.NODE_ENV === 'development' ? 'hans@muster.ch' : '',
    },
    onSubmit: async values => {
      try {
        const result = await apolloClient.mutate({
          mutation: gql`
            mutation Register($code: String!, $input: RegisterInput!) {
              register(code: $code, input: $input)
            }
          `,
          variables: {
            code,
            input: values,
          },
        });

        console.log(result);
      } catch (error) {
        console.warn(error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <img src="/form-header.png" />
      {Object.entries(formik.values).map(([name, value]) => (
        <input
          type="string"
          key={name}
          name={name}
          placeholder={name}
          onChange={formik.handleChange}
          value={value}
        />
      ))}
      <button
        type="submit"
        disabled={formik.isSubmitting || Object.keys(formik.errors).length}
      />
      <style jsx>{`
        form {
          max-width: 400px;
          padding: 10px;
        }

        input {
          box-sizing: border-box;
          display: block;
          width: calc(100% - 40px);
          background-color: #ebebeb;
          border: none;
          font-size: 20px;
          margin: 10px 20px;
          padding: 10px;
        }

        button {
          width: 100%;
          margin: 20px 20px;
          padding: 10px;
          width: calc(100% - 40px);
          border: none;
          background-color: transparent;
          background-image: url(/send.png);
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          height: 30px;
        }

        button[disabled] {
          opacity: 0.5;
          cursor: url('/cursor.png'), auto;
        }
      `}</style>
    </form>
  );
};

export default Form;
