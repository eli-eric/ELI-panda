import { Form, Formik } from 'formik'
import React, { Fragment } from 'react'
import * as yup from 'yup'

interface Props {
  edit: boolean
  children: React.ReactNode
}

const SystemInfoFormWrapper = ({ children, edit = false }) => {
  const validationSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required')
  })
  return (
    <Fragment>
      {edit ? (
        <Formik
          initialValues={{}}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values)
            setSubmitting(false)
          }}
        >
          {({ isSubmitting }) => <Form>{children}</Form>}
        </Formik>
      ) : (
        children
      )}
    </Fragment>
  )
}

export default SystemInfoFormWrapper
