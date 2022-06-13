import React from 'react'
import Button from '@mui/material/Button'
import { Form, Formik } from 'formik'
import { object, string } from 'yup'

import AppInfoView from '@crema/core/AppInfoView'
import Box from '@mui/material/Box'
import IntlMessages from '@crema/utility/IntlMessages'
import { FormattedMessage, useIntl } from 'react-intl'
import AppTextField from '@crema/core/AppFormComponents/AppTextField'
import { useJWTAuthActions } from '@crema/services/auth/jwt-auth/JWTAuthProvider'
import { Fonts } from '../../../shared/constants/AppEnums'
import { message } from 'shared/localization/messages'

const messages = message.login

const SigninComponent = () => {
  const intl = useIntl()
  const { signInUser } = useJWTAuthActions()
  const initialValues = { email: '', password: '' }

  const validationSchema = object({
    email: string().required(intl.formatMessage({ id: messages.form.validation.email })),
    password: string().required(intl.formatMessage({ id: messages.form.validation.password }))
  })

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', mb: 5 }}>
        <Formik
          validateOnChange={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true)
            signInUser({
              email: data.email,
              password: data.password
            })
            setSubmitting(false)
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ textAlign: 'left' }} noValidate autoComplete="off">
              <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                <AppTextField
                  placeholder={intl.formatMessage({ id: messages.form.fields.email })}
                  name="email"
                  label={intl.formatMessage({ id: messages.form.fields.email })}
                  variant="outlined"
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14
                    }
                  }}
                />
              </Box>

              <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                <AppTextField
                  type="password"
                  placeholder={intl.formatMessage({ id: messages.form.fields.password })}
                  label={intl.formatMessage({ id: messages.form.fields.password })}
                  name="password"
                  variant="outlined"
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14
                    }
                  }}
                />
              </Box>

              <Box
                sx={{
                  mb: { xs: 3, xl: 4 }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                />
              </Box>

              <div>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  sx={{
                    minWidth: 160,
                    fontWeight: Fonts.REGULAR,
                    fontSize: 16,
                    textTransform: 'capitalize',
                    padding: '4px 16px 8px'
                  }}
                >
                  <FormattedMessage id={messages.butttons.confirm} />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>

      <AppInfoView />
    </Box>
  )
}

export default SigninComponent
