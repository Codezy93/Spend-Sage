'use client'
import { useRouter } from 'next/navigation'
import AuthScreens from '@/components/AuthScreens'
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth'
export default function Page(){
    const router = useRouter()
    return (
        <AuthScreens
        mode="forgot"
        onForgotStart={async ({ email }) => {
            await resetPassword({ username: email })
        }}
        onForgotConfirm={async ({ email, code, newPassword }) => {
            await confirmResetPassword({ username: email, confirmationCode: code, newPassword })
            router.push('/auth/signin')
        }}
        />
    )
}