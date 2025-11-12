'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthScreens from '@/app/auth/page'
import { fetchAuthSession, signIn } from 'aws-amplify/auth'
import { setSessionCookie } from '@/utils/auth-cookies'

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  const requestedRedirect = searchParams?.get('redirect')
  const redirectPath =
    requestedRedirect &&
    requestedRedirect.startsWith('/') &&
    !requestedRedirect.startsWith('//')
      ? requestedRedirect
      : '/dashboard'

  return (
    <AuthScreens
      mode="signin"
      loading={loading}
      onSignIn={async ({ email, password, remember }) => {
        setLoading(true)
        try {
          const res = await signIn({ username: email, password })
          const step = res?.nextStep?.signInStep
          if (step === 'CONFIRM_SIGN_UP') {
            router.push(`/auth/verify?email=${encodeURIComponent(email)}`)
            return
          }
          const session = await fetchAuthSession()
          const cookieValue =
            session?.userSub ||
            session?.tokens?.idToken?.payload?.sub ||
            session?.tokens?.accessToken?.payload?.sub ||
            email
          const cookieLifetime = remember ? undefined : 60 * 60 * 4 // 4 hours if not remembered
          setSessionCookie(cookieValue, cookieLifetime)
          router.push(`/plaid/connect?redirect=${encodeURIComponent(redirectPath)}`)
        } finally {
          setLoading(false)
        }
      }}
    />
  )
}
