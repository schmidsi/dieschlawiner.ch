import { useContext } from 'react';
import { useFormik } from 'formik';

import { CodeContext } from './_app';

const Form = () => {
  const { code } = useContext(CodeContext);

  console.log(code);

  // const formik = useFormik({
  //   initialValues: {
  //     vorname: '',
  //     nachname: '',
  //     adresse: '',
  //     plz: '',
  //     ort: '',
  //     mobile: '',
  //     email: '',
  //   },
  //   onSubmit: values => console.log(values),
  // });

  return (
    <form>
      <h1>Hallo</h1>
    </form>
  );
};

export default Form;
