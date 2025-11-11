'use client'
import { useRouter } from 'next/navigation'
import AuthScreens from '@/components/AuthScreens'
import { signIn } from 'aws-amplify/auth'
export default function Page(){
    const router = useRouter()
    return (
        <AuthScreens
        mode="signin"
        onSignIn={async ({ email, password }) => {
            const res = await signIn({ username: email, password })
            const step = res?.nextStep?.signInStep
            if (step === 'CONFIRM_SIGN_UP') {
            router.push(`/auth/verify?email=${encodeURIComponent(email)}`)
            return
            }
            router.push('/dashboard') // TODO: your post-login route
        }}
        />
    )
}