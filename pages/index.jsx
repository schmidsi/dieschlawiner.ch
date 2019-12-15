import Head from 'next/head';
import { useFormik } from 'formik';
import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const Home = () => {
  const apolloClient = useApolloClient();

  const formik = useFormik({
    initialValues: {
      code: 'asdf12',
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

      <div className="logo-holder">
        <img src="/logo.png" />
      </div>

      <form onSubmit={formik.handleSubmit}>
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

      <style jsx>{`
        .logo-holder {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        img {
          width: 60%;
          margin-bottom: 75px;
        }
        .pw {
          background-image: url('/pw.png');
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .pw input {
          margin-top: -10px;
          padding: 0;
          margin-left: 60px;
          /*border: 1px solid black;*/
          border: none;
          background-color: transparent;
          font-size: 30px;
          font-family: 'Courier Prime', monospace;
          width: 140px;
          letter-spacing: 5px;
        }
      `}</style>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Courier+Prime&display=swap');

        html {
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100%;
          background-color: #ff0000;
        }

        img {
          max-width: 100%;
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

          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Home;
