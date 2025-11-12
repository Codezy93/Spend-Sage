'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, signOut } from 'aws-amplify/auth'
import { clearSessionCookie } from '@/utils/auth-cookies'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState('')
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    let mounted = true
    getCurrentUser()
      .then((user) => {
        if (!mounted) return
        const loginId = user?.signInDetails?.loginId || user?.username || ''
        setUserEmail(loginId)
      })
      .catch(() => {
        // If we cannot load the user, force them back to sign in.
        router.push('/auth/signin')
      })
    return () => {
      mounted = false
    }
  }, [router])

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await signOut()
    } finally {
      clearSessionCookie()
      setSigningOut(false)
      router.push('/auth/signin')
    }
  }

  return (
    <main className="min-h-screen bg-muted/40 py-10">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <h1 className="text-3xl font-semibold tracking-tight">{userEmail || 'Loading...'}</h1>
          </div>
          <Button variant="outline" onClick={handleSignOut} disabled={signingOut}>
            {signingOut ? 'Signing out…' : 'Sign out'}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Spend Sage</CardTitle>
              <CardDescription>Connect your accounts and start tracking spend.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>This is where your personalized insights and charts will live.</p>
              <p>Use the navigation to explore forecasts, budgets, and alerts.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next steps</CardTitle>
              <CardDescription>Checklist to finish onboarding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>- Verify your email address from the link we sent.</p>
              <p>- Connect a bank account to start streaming transactions.</p>
              <p>- Configure alerts to catch overspend early.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
