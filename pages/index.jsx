import Head from 'next/head';
import { useFormik } from 'formik';
import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const Home = () => {
  const apolloClient = useApolloClient();

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
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

        console.log(result);

        if (result.data.isValidCode) {
          formik.submitForm();
        } else {
          return {
            errors: { code: 'Falscher code' },
          };
        }
      }
    },
  });

  // console.log(formik);

  return (
    <div className="root">
      <Head>
        <title>Schlawiner</title>
      </Head>
      <div className="cursor">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Code</label>
          <input
            id="code"
            name="code"
            type="string"
            onChange={formik.handleChange}
            value={formik.values.code}
            maxLength={6}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      //
      <style jsx global>{`
        .cursor {
          height: 100px;
          width: 100px;
        }

        html {
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100%;
          background-color: #ff0000;
        }

        * {
          cursor: url('/cursor.png'), auto;
        }

        input,
        button,
        a {
          cursor: url('/cursor_hover.png'), auto;
        }

        body {
          padding: 0;
          margin: 0;
          min-height: 100%;

          background-position: center center;
          background-repeat: no-repeat;
          background-size: 50%;
        }
      `}</style>
      <style jsx>{``}</style>
    </div>
  );
};

export default Home;
