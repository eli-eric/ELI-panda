import { yupResolver } from '@hookform/resolvers/yup'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import AuthAlertComponent from 'src/components/auth/auth-alert.comp'
import AuthFormComponent, { AuthForm } from 'src/components/auth/auth-form.comp'
import { message } from 'src/i18n/src/messages'
import * as yup from 'yup'

import { PATH } from '@/types/constants/paths'

const messages = message.authPage

const LoginPage: NextPage = (): JSX.Element => {
  const intl = useIntl()
  const router = useRouter()
  const { status } = useSession()
  const callbackUrl = decodeURI(
    (router.query?.callbackUrl as string) ?? PATH.DASHBOARD,
  )
  const authValidationSchema = yup.object().shape({
    password: yup.string().required(),
    username: yup.string().required(),
  })
  const { register, handleSubmit, formState } = useForm<AuthForm>({
    resolver: yupResolver(authValidationSchema),
  })
  const [errorMessage, setErrorMessage] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  const handleLoginSubmit = data => {
    setLoading(true)
    setErrorMessage(undefined)
    signIn('credentials', {
      redirect: false,
      ...data,
    })
      .then(e => {
        if (e?.error) {
          console.log(e.error)
          setErrorMessage(e.error)
          setLoading(false)
        }
      })
      .finally(() => {
        setLoading(false)
        router.replace(callbackUrl, undefined, { shallow: false })
      })
  }

  useEffect(() => {
    if (status === 'authenticated') router.push(PATH.DASHBOARD)
  }, [status, router])

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
          <AuthAlertComponent message={errorMessage} />
        </div>
      )}
    </Fragment>
  )
}

export default LoginPage
