import Head from 'next/head';
import { useFormik } from 'formik';

const Home = () => {
  const formik = useFormik({
    initialValues: {
      code: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="root">
      <Head>
        <title>Schlawiner</title>
      </Head>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Code</label>
        <input
          id="code"
          name="code"
          type="string"
          onChange={formik.handleChange}
          value={formik.values.code}
        />
        <button type="submit">Submit</button>
      </form>
      <style jsx global>{`
        html,
        body {
          width: 100%;
          min-height: 100%;
          background-color: #fe0000;
          background-image: url('/bg.jpg');
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
