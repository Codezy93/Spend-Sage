'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthScreens from '@/app/auth/page'
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth'

export default function Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  return (
    <AuthScreens
      mode="forgot"
      loading={loading}
      onForgotStart={async ({ email }) => {
        setLoading(true)
        try {
          await resetPassword({ username: email })
        } finally {
          setLoading(false)
        }
      }}
      onForgotConfirm={async ({ email, code, newPassword }) => {
        setLoading(true)
        try {
          await confirmResetPassword({ username: email, confirmationCode: code, newPassword })
          router.push('/auth/signin')
        } finally {
          setLoading(false)
        }
      }}
    />
  )
}
