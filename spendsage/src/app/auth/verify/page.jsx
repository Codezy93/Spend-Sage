'use client'
import AuthScreens from '@/app/auth/page'
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth'

export default function Page() {
  return (
    <AuthScreens
      mode="verify"
      onVerify={({ email, code }) => confirmSignUp({ username: email, confirmationCode: code })}
      onResendCode={({ email }) => resendSignUpCode({ username: email })}
    />
  )
}
