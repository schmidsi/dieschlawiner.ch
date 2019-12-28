import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import gql from 'graphql-tag';
import * as Yup from 'yup';

import { CodeContext } from './_app';

const Form = () => {
  const apolloClient = useApolloClient();
  const router = useRouter();

  const { code } = useContext(CodeContext);
  const { data: { greeting } = {} } = useQuery(
    gql`
      query Greeting($code: String!) {
        greeting(code: $code)
      }
    `,
    { variables: { code } },
  );

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
      eingeladen_von: process.env.NODE_ENV === 'development' ? 'Hans' : '',
    },
    validationSchema: Yup.object({
      vorname: Yup.string().required('Required'),
      nachname: Yup.string().required('Required'),
      adresse: Yup.string().required('Required'),
      plz: Yup.string().required('Required'),
      ort: Yup.string().required('Required'),
      mobile: Yup.string().required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      eingeladen_von: Yup.string().required('Required'),
    }),
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

        if (result.data.register) {
          router.push('/congrats');
        } else {
          router.push('/');
        }
      } catch (error) {
        console.warn(error);
      }
    },
  });

  console.log(formik);

  return (
    <form onSubmit={formik.handleSubmit}>
      <img src="/form-header.png" />
      {greeting && <h2>{greeting}</h2>}
      {Object.entries(formik.values).map(([name, value]) => (
        <input
          type="string"
          key={name}
          name={name}
          placeholder={name.replace('_', ' ')}
          onChange={formik.handleChange}
          value={value}
          className={formik.errors[name] && 'error'}
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

        img {
          margin-bottom: 20px;
        }

        h2 {
          margin: 30px 20px;
          font-family: Helvetica, sans-serif;
          font-weight: bold;
        }

        input {
          box-sizing: border-box;
          display: block;
          width: calc(100% - 40px);
          background-color: #ebebeb;
          border: none;
          font-size: 18px;
          margin: 10px 20px;
          padding: 13px;
          font-family: Helvetica, sans-serif;
          font-weight: bold;
        }

        input.error {
          background-color: #ffd4d4;
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
