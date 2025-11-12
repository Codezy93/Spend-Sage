'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthScreens from '@/app/auth/page'
import { signUp } from 'aws-amplify/auth'

export default function Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  return (
    <AuthScreens
      mode="signup"
      loading={loading}
      onSignUp={async ({ name, email, password, phone_number }) => {
        setLoading(true)
        try {
          await signUp({
            username: email,
            password,
            options: {
              userAttributes: { email, name, phone_number },
              autoSignIn: true,
            },
          })
          if (typeof window !== 'undefined') {
            const profile = { email, name, phoneNumber: phone_number }
            sessionStorage.setItem('spendsage_pending_profile', JSON.stringify(profile))
          }
          router.push(`/auth/verify?email=${encodeURIComponent(email)}`)
        } finally {
          setLoading(false)
        }
      }}
    />
  )
}
