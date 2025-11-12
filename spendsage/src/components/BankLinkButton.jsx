'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePlaidLink } from 'react-plaid-link'
import { generateClient } from 'aws-amplify/data'
import { Schema } from '@/../amplify/data/resource'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CircleDashed } from 'lucide-react'

const dataClient = generateClient({ authMode: 'identityPool' })

function normalizePhone(value) {
  if (!value) return ''
  const digits = String(value).replace(/[^0-9]/g, '')
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  if (digits.length === 10) return `+1${digits}`
  return value
}

export default function BankLinkButton({ profile, onLinked, onError }) {
  const [linkToken, setLinkToken] = useState(null)
  const [status, setStatus] = useState('idle') // idle | creating-token | ready | linking | linked
  const [error, setError] = useState('')

  useEffect(() => {
    if (!profile?.email || !profile?.name || !profile?.phoneNumber) return
    let cancelled = false

    const createLinkToken = async () => {
      setStatus('creating-token')
      setError('')
      try {
        const response = await fetch('/api/plaid/create-link-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: profile.email,
            name: profile.name,
            phoneNumber: normalizePhone(profile.phoneNumber),
          }),
        })
        const json = await response.json()
        if (!response.ok) {
          throw new Error(json.error || 'Unable to create Plaid link token.')
        }
        if (!cancelled) {
          setLinkToken(json.link_token)
          setStatus('ready')
        }
      } catch (err) {
        const message = err?.message || 'Unable to prepare Plaid Link.'
        if (!cancelled) {
          setError(message)
          setStatus('idle')
          onError?.(message)
        }
      }
    }

    createLinkToken()
    return () => {
      cancelled = true
    }
  }, [profile, onError])

  const receivedRedirectUri =
    typeof window !== 'undefined' && window.location.href.includes('plaid_oauth_state_id')
      ? window.location.href
      : undefined

  const plaidConfig = useMemo(() => {
    if (!linkToken) return null
    return {
      token: linkToken,
      receivedRedirectUri,
      onSuccess: async (publicToken, metadata) => {
        setStatus('linking')
        setError('')
        try {
          const exchangeRes = await fetch('/api/plaid/exchange-public-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ public_token: publicToken }),
          })
          const exchangeJson = await exchangeRes.json()
          if (!exchangeRes.ok) {
            throw new Error(exchangeJson.error || 'Unable to exchange Plaid token.')
          }

          const saveResult = await dataClient.models.Users.create({
            email: profile.email,
            fullname: profile.name,
            phoneNumber: normalizePhone(profile.phoneNumber),
            plaidToken: exchangeJson.plaidToken,
          })

          if (saveResult?.errors?.length) {
            throw new Error(saveResult.errors[0].message)
          }

          setStatus('linked')
          onLinked?.()
        } catch (err) {
          const message = err?.message || 'Could not store Plaid data.'
          setError(message)
          setStatus('ready')
          onError?.(message)
        }
      },
      onExit: (exitError, metadata) => {
        if (exitError) {
          const message = exitError.display_message || exitError.error_message || 'Plaid linking was cancelled.'
          setError(message)
          onError?.(message)
        }
      },
    }
  }, [linkToken, receivedRedirectUri, profile, onLinked, onError])

  const { open, ready, error: plaidError } = usePlaidLink(
    plaidConfig || {
      token: 'placeholder-token',
      onSuccess: () => {},
    }
  )

  useEffect(() => {
    if (plaidError) {
      const message = plaidError.message || 'Plaid link encountered an unexpected error.'
      setError(message)
      onError?.(message)
    }
  }, [plaidError, onError])

  const handleClick = () => {
    if (!linkToken || !open) return
    setError('')
    open()
  }

  const disabled =
    status === 'creating-token' || status === 'linking' || !linkToken || !ready || status === 'linked'

  return (
    <div className="space-y-3">
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <Button type="button" className="w-full" onClick={handleClick} disabled={disabled}>
        {status === 'creating-token' || status === 'linking' ? (
          <>
            <CircleDashed className="mr-2 h-4 w-4 animate-spin" />
            {status === 'creating-token' ? 'Preparing Plaid…' : 'Connecting…'}
          </>
        ) : status === 'linked' ? (
          'Bank linked'
        ) : (
          'Connect bank account'
        )}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        Plaid Link is required to finish onboarding and securely add your bank connection.
      </p>
    </div>
  )
}
