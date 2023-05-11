import { yupResolver } from '@hookform/resolvers/yup'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'
import * as yup from 'yup'

import AuthAlertComponent from '@/modules/auth/auth-alert.comp'
import AuthFormComponent, { type AuthForm } from '@/modules/auth/auth-form.comp'
import { PATH } from '@/types/constants/paths'

const messages = message.authPage

const LoginPage: NextPage = (): JSX.Element => {
  const intl = useIntl()
  const router = useRouter()
  const callbackUrl = decodeURI((router.query?.callbackUrl as string) ?? PATH.DASHBOARD)
  const authValidationSchema = yup.object().shape({
    password: yup.string().required(),
    username: yup.string().required()
  })
  const { register, handleSubmit, formState } = useForm<AuthForm>({
    resolver: yupResolver(authValidationSchema)
  })
  const [errorMessage, setErrorMessage] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  const handleLoginSubmit = data => {
    setLoading(true)
    setErrorMessage(undefined)
    signIn('credentials', {
      redirect: false,
      callbackUrl: callbackUrl,
      ...data
    })
      .then(response => {
        if (response?.error) {
          setErrorMessage('Wrong username or password!')
          setLoading(false)
        }
        if (response?.ok) {
          router.push(callbackUrl)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <AuthFormComponent
        onSubmit={handleLoginSubmit}
        handleSubmit={handleSubmit}
        formState={formState}
        register={register}
        loading={loading}
      />
      {errorMessage && (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <AuthAlertComponent message={errorMessage as string} />
        </div>
      )}
    </Fragment>
  )
}

export default LoginPage
