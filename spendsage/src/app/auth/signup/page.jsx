'use client'
import { useRouter } from 'next/navigation'
import AuthScreens from '@/components/AuthScreens'
import { signUp } from 'aws-amplify/auth'
export default function Page(){
    const router = useRouter()
    return (
        <AuthScreens
        mode="signup"
        onSignUp={async ({ name, email, password, phone_number }) => {
            await signUp({
            username: email,
            password,
            options: { userAttributes: { email, name, phone_number } },
            })
            router.push(`/auth/verify?email=${encodeURIComponent(email)}`)
        }}
        />
    )
}