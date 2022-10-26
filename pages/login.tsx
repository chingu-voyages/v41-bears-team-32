import { ChangeEvent, useEffect, useState } from 'react';
import type { FormikProps } from 'formik';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ConnectedFocusError } from 'focus-formik-error';

function login() {
  // initialvalues
  const initialValues = {
    email: '',
    password: '',
    rememberme: false
  };
  // validate form
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email address is required.')
      .max(150, 'Email should not exceed 150 characters'),
    password: Yup.string()
      .required('Password is required.')
      .max(32, 'Password should not exceed 32 characters'),
    rememberme: Yup.bool()
  });

  return (
    <div className="py-[4em]">
      <div className="relative max-w-[768px] mx-auto bg-slate-100 p-8 rounded-[5px] lgmx:max-w-full lgmx:w-[90%] lgmx:py-4 lgmx:px-8">
        <div className="w-full p-5">
          <div className="max-w-md">
            <h4 className="text-3xl font-bold">Log In</h4>
          </div>
        </div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await new Promise((r) => setTimeout(r, 500));
            // wait until the login API comes
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <Form className="relative p-5">
              <ConnectedFocusError />
              <div className="flex flex-col items-start mb-4">
                <label className="mb-2">Email</label>
                <Field
                  type="text"
                  name="email"
                  placeholder="Email"
                  className={`w-full h-10 pl-4  rounded-md  ${
                    formik.errors.email
                      ? 'border-solid border-2 border-red-600'
                      : 'border-solid border-2 border-slate-200'
                  }`}
                  autoComplete="off"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <div className="validate-show">
                <ErrorMessage name="email" component="div" className="text-red-600" />
              </div>
              <div className="flex flex-col items-start mb-4">
                <label className="mb-2">Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`w-full h-10 pl-4 px-5 rounded-lg  ${
                    formik.errors.password
                      ? 'border-solid border-2 border-red-600'
                      : 'border-solid border-2 border-slate-200'
                  }`}
                  autoComplete="off"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              <div className="validate-show">
                <ErrorMessage name="password" component="div" className="text-red-600" />
              </div>

              <div className="text-center">
                <button type="submit" className="w-full my-4 p-3 bg-amber-900 text-white">
                  Login
                </button>
              </div>

              <div className="text-center p3-regular-14 mb-4 mt-7">
                <p>
                  Don&#39;t have an account?
                  <a href="/signup">
                    <span className="ml-1 info underline cursor-pointer">Sign Up</span>
                  </a>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default login;
