import { useContext } from 'react';
import { useFormik } from 'formik';

import { CodeContext } from './_app';

const Form = () => {
  const { code } = useContext(CodeContext);

  console.log(code, process.env.NODE_ENV);

  const formik = useFormik({
    initialValues: {
      vorname: '',
      nachname: '',
      adresse: '',
      plz: '',
      ort: '',
      mobile: '',
      email: '',
    },
    onSubmit: values => console.log(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <img src="/form-header.png" />
      <h1>Hallo</h1>
      <style jsx>{``}</style>
    </form>
  );
};

export default Form;
