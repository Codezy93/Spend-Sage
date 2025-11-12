'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import BankLinkButton from '@/components/BankLinkButton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { generateClient } from 'aws-amplify/data'
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth'

export default function PlaidConnectPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = (() => {
    const requested = searchParams?.get('redirect')
    if (requested && requested.startsWith('/') && !requested.startsWith('//')) return requested
    return '/dashboard'
  })()
  const dataClient = useMemo(() => generateClient({ authMode: 'identityPool' }), [])
  const [profile, setProfile] = useState({ email: '', name: '', phoneNumber: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        const session = await fetchAuthSession()
        const email = session?.tokens?.idToken?.payload?.email
        if (!email) {
          router.replace('/auth/signin')
          return
        }
        const user = await getCurrentUser()
        const fallbackName = user?.signInDetails?.loginId || ''
        const { data, errors } = await dataClient.models.Users.list({ filter: { email: { eq: email } } })
        if (errors?.length) throw new Error(errors[0].message)
        const record = data?.[0]
        if (record?.plaidToken) {
          if (!cancelled) {
            router.replace(redirectPath)
          }
          return
        }
        if (!cancelled) {
          setProfile({
            email,
            name: record?.fullname || fallbackName || '',
            phoneNumber: record?.phoneNumber || '',
          })
        }
      } catch (err) {
        if (!cancelled) setError(err?.message || 'Unable to load profile.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [dataClient, redirectPath, router])

  const handleLinked = () => {
    setInfo('Bank linked successfully. Redirecting…')
    setTimeout(() => router.replace(redirectPath), 1400)
  }

  return (
    <main className="min-h-screen bg-muted/40 py-10">
      <div className="mx-auto max-w-lg px-4">
        <Card>
          <CardHeader>
            <CardTitle>Connect your bank</CardTitle>
            <CardDescription>Finish onboarding by linking an account with Plaid.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {info && (
              <Alert>
                <AlertDescription>{info}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-3">
              <Label>Email</Label>
              <Input value={profile.email} disabled />
            </div>
            <div className="grid gap-3">
              <Label>Full name</Label>
              <Input
                value={profile.name}
                onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
              />
            </div>
            <div className="grid gap-3">
              <Label>Phone number</Label>
              <Input
                value={profile.phoneNumber}
                onChange={(e) => setProfile((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                placeholder="+12223334444"
              />
            </div>
            {profile.email ? (
              <BankLinkButton
                profile={profile}
                onLinked={handleLinked}
                onError={setError}
              />
            ) : (
              <Button disabled className="w-full" variant="outline">
                Loading profile…
              </Button>
            )}
            <div className="flex justify-between gap-3">
              <Button variant="ghost" onClick={() => router.replace('/auth/signin')} disabled={loading}>
                Back to sign in
              </Button>
              <Button variant="ghost" onClick={() => router.replace(redirectPath)} disabled={loading}>
                Skip for now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
