'use client'
import { useRouter } from 'next/navigation'
import AuthScreens from '@/components/AuthScreens'
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth'
export default function Page(){
    const router = useRouter()
    return (
        <AuthScreens
        mode="verify"
        onVerify={async ({ email, code }) => {
            await confirmSignUp({ username: email, confirmationCode: code })
            router.push('/auth/signin')
        }}
        onResendCode={async ({ email }) => {
            await resendSignUpCode({ username: email })
        }}
        />
    )
}