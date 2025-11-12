'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, Phone, ShieldCheck, CircleDashed } from 'lucide-react'

// shadcn/ui
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const shellVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
}

function resolveAuthMode(explicitMode, pathname, searchParams) {
  if (explicitMode) return explicitMode
  const m = searchParams?.get?.('mode')
  if (m && ['signin', 'signup', 'forgot', 'verify'].includes(m)) return m
  const segments = (pathname || '').split('/').filter(Boolean)
  const idx = segments.indexOf('auth')
  const candidate = segments[idx + 1]
  if (['signin', 'signup', 'forgot', 'verify'].includes(candidate)) return candidate
  return 'signin'
}

function normalizeUSPhoneToE164(value) {
  if (!value) return ''
  const digits = String(value).replace(/[^0-9]/g, '')
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  if (digits.length === 10) return `+1${digits}`
  // If not clearly US 10/11‑digit, return original (Cognito will validate)
  return value
}

function PasswordInput({ id, placeholder, value, onChange, autoComplete, disabled }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        disabled={disabled}
        required
      />
      <button
        type="button"
        aria-label={show ? 'Hide password' : 'Show password'}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2"
        onClick={() => setShow((s) => !s)}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  )
}

function OtpInput({ length = 6, onChange, disabled }) {
  const refs = useRef([])
  const [digits, setDigits] = useState(Array.from({ length }, () => ''))

  useEffect(() => {
    onChange?.(digits.join(''))
  }, [digits, onChange])

  const handle = (i, v) => {
    if (!/^[0-9]?$/.test(v)) return
    const next = [...digits]
    next[i] = v
    setDigits(next)
    if (v && i < length - 1) refs.current[i + 1]?.focus()
  }

  const onKey = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus()
    if (e.key === 'ArrowRight' && i < length - 1) refs.current[i + 1]?.focus()
  }

  return (
    <div className="grid grid-cols-6 gap-2">
      {digits.map((d, i) => (
        <Input
          key={i}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          className="text-center"
          value={d}
          onChange={(e) => handle(i, e.target.value.slice(-1))}
          onKeyDown={(e) => onKey(i, e)}
          ref={(el) => (refs.current[i] = el)}
          disabled={disabled}
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  )
}

function Brand({ name = 'Spend Sage', tagline = 'Secure sign in & sign up' }) {
  return (
    <div className="mb-6 text-center">
      <div className="mx-auto mb-2 h-12 w-12 rounded-2xl bg-primary/10 grid place-items-center">
        <ShieldCheck className="h-6 w-6 text-primary" />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">{name}</h1>
      <p className="text-sm text-muted-foreground">{tagline}</p>
    </div>
  )
}

function SignInForm({ onSubmit, loading }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await onSubmit?.({ email, password, remember })
    } catch (err) {
      setError(err?.message || 'Unable to sign in.')
    }
  }

  return (
    <motion.div variants={shellVariants} initial="hidden" animate="show">
      <Brand />
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Welcome back! Enter your credentials.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Sign in failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email" className="flex items-center gap-2"><Mail className="h-4 w-4"/> Email</Label>
            <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="flex items-center gap-2"><Lock className="h-4 w-4"/> Password</Label>
            <PasswordInput id="password" placeholder="••••••••" value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="current-password" />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm"><Checkbox checked={remember} onCheckedChange={(v)=>setRemember(!!v)} /> Remember me</label>
            <Link href="/auth/forgot" className="text-sm text-primary underline-offset-4 hover:underline">Forgot password?</Link>
          </div>
          <Button type="submit" className="w-full" onClick={submit} disabled={loading}>
            {loading ? <CircleDashed className="mr-2 h-4 w-4 animate-spin"/> : null}
            Sign in
          </Button>
          <div className="text-center text-sm text-muted-foreground">Don&apos;t have an account? <Link href="/auth/signup" className="text-primary underline-offset-4 hover:underline">Sign up</Link></div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function SignUpForm({ onSubmit, loading }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [agree, setAgree] = useState(true)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!agree) return setError('Please accept the Terms to continue.')
    try {
      const phone_number = normalizeUSPhoneToE164(phone)
      await onSubmit?.({ name, email, password, phone_number })
    } catch (err) {
      setError(err?.message || 'Unable to sign up.')
    }
  }

  return (
    <motion.div variants={shellVariants} initial="hidden" animate="show">
      <Brand />
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>Full name, US phone, email & password.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Sign up failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-2">
            <Label htmlFor="name" className="flex items-center gap-2"><User className="h-4 w-4"/> Full name</Label>
            <Input id="name" autoComplete="name" required value={name} onChange={(e)=>setName(e.target.value)} placeholder="Viraj Paradkar" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="flex items-center gap-2"><Mail className="h-4 w-4"/> Email</Label>
            <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone" className="flex items-center gap-2"><Phone className="h-4 w-4"/> US phone</Label>
            <Input id="phone" type="tel" autoComplete="tel" required value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="(555) 555-1234" />
            <p className="text-xs text-muted-foreground">Enter a US number. We&apos;ll store it as E.164 (+15555551234).</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="flex items-center gap-2"><Lock className="h-4 w-4"/> Password</Label>
            <PasswordInput id="password" placeholder="At least 8 characters" value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="new-password" />
            <p className="text-xs text-muted-foreground">Use 8+ characters with a mix of letters and numbers.</p>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={agree} onCheckedChange={(v)=>setAgree(!!v)} />
            I agree to the <Link href="/legal/terms" className="text-primary underline-offset-4 hover:underline">Terms</Link> and <Link href="/legal/privacy" className="text-primary underline-offset-4 hover:underline">Privacy Policy</Link>.
          </label>
          <Button type="submit" className="w-full" onClick={submit} disabled={loading}>
            {loading ? <CircleDashed className="mr-2 h-4 w-4 animate-spin"/> : null}
            Create account
          </Button>
          <div className="text-center text-sm text-muted-foreground">Already have an account? <Link href="/auth/signin" className="text-primary underline-offset-4 hover:underline">Sign in</Link></div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ForgotForm({ onStart, onConfirm, loading }) {
  const [phase, setPhase] = useState('request') // 'request' | 'confirm'
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [info, setInfo] = useState('')
  const [error, setError] = useState('')

  const start = async (e) => {
    e.preventDefault()
    setInfo('')
    setError('')
    try {
      await onStart?.({ email })
      setInfo('If an account exists, a reset code has been sent to your email.')
      setPhase('confirm')
    } catch (err) {
      setError(err?.message || 'Unable to start reset.')
    }
  }

  const confirm = async (e) => {
    e.preventDefault()
    setInfo('')
    setError('')
    try {
      await onConfirm?.({ email, code, newPassword })
      setInfo('Password reset successful. You can now sign in.')
    } catch (err) {
      setError(err?.message || 'Could not reset the password.')
    }
  }

  return (
    <motion.div variants={shellVariants} initial="hidden" animate="show">
      <Brand />
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle>Forgot password</CardTitle>
          <CardDescription>{phase === 'request' ? 'We\'ll send a reset code to your email.' : 'Enter the code and your new password.'}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {info && (
            <Alert>
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>{info}</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Request failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-2">
            <Label htmlFor="email" className="flex items-center gap-2"><Mail className="h-4 w-4"/> Email</Label>
            <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
          </div>

          {phase === 'confirm' && (
            <>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2">Verification code</Label>
                <OtpInput length={6} onChange={setCode} disabled={loading} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newpass" className="flex items-center gap-2"><Lock className="h-4 w-4"/> New password</Label>
                <PasswordInput id="newpass" placeholder="At least 8 characters" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} autoComplete="new-password" />
              </div>
            </>
          )}

          {phase === 'request' ? (
            <Button type="submit" className="w-full" onClick={start} disabled={loading}>
              {loading ? <CircleDashed className="mr-2 h-4 w-4 animate-spin"/> : null}
              Send code
            </Button>
          ) : (
            <Button type="submit" className="w-full" onClick={confirm} disabled={loading || code.length !== 6}>
              {loading ? <CircleDashed className="mr-2 h-4 w-4 animate-spin"/> : null}
              Reset password
            </Button>
          )}

          <div className="text-center text-sm text-muted-foreground"><Link href="/auth/signin" className="text-primary underline-offset-4 hover:underline">Back to sign in</Link></div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function VerifyForm({ emailFromUrl, onSubmit, onResendCode, loading }) {
  const router = useRouter()

  const [email, setEmail] = useState(emailFromUrl || '')
  const [code, setCode] = useState('')
  const [info, setInfo] = useState('')
  const [error, setError] = useState('')
  const [verifying, setVerifying] = useState(false)

  useEffect(() => {
    if (emailFromUrl) setEmail(emailFromUrl)
  }, [emailFromUrl])

  const handleVerify = async (e) => {
    e?.preventDefault?.()
    setError('')
    setInfo('')
    if (code.length !== 6 || !email) {
      setError('Enter your email and the complete 6-digit code.')
      return
    }
    setVerifying(true)
    try {
      await onSubmit?.({ email, code })
      setInfo('Email verified successfully. Redirecting to sign in…')
      setTimeout(() => router.push(`/auth/signin?verified=1&email=${encodeURIComponent(email)}`), 1200)
    } catch (err) {
      setError(err?.message || 'Verification failed.')
    } finally {
      setVerifying(false)
    }
  }

  const handleResend = async () => {
    setInfo('')
    setError('')
    if (!email) {
      setError('Enter your email so we can resend the code.')
      return
    }
    try {
      await onResendCode?.({ email })
      setInfo("We've sent a new code to your email.")
    } catch (err) {
      setError(err?.message || 'Could not resend the code.')
    }
  }

  return (
    <motion.div variants={shellVariants} initial="hidden" animate="show">
      <Brand tagline="Check your inbox for the 6‑digit code." />
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle>Verify email</CardTitle>
          <CardDescription>Enter your email and the 6-digit code.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {info && (
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{info}</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-2">
            <Label htmlFor="vemail" className="flex items-center gap-2"><Mail className="h-4 w-4" /> Email</Label>
            <Input id="vemail" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <OtpInput length={6} onChange={setCode} disabled={loading || verifying}/>
          <Button type="button" className="w-full" onClick={handleVerify} disabled={loading || verifying || code.length !== 6 || !email}>
            {loading || verifying ? <CircleDashed className="mr-2 h-4 w-4 animate-spin"/> : null}
            Verify
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Didn&apos;t get the code?{' '}
            <button onClick={handleResend} className="text-primary underline-offset-4 hover:underline" disabled={loading || verifying || !email}>
              Resend
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function AuthScreens({
  mode = undefined,
  onSignIn,
  onSignUp,
  onForgotStart,
  onForgotConfirm,
  onVerify,
  onResendCode,
  loading,
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const resolvedMode = resolveAuthMode(mode, pathname, searchParams)
  const emailInUrl = searchParams?.get?.('email') || ''

  const content = useMemo(() => {
    switch (resolvedMode) {
      case 'signup':
        return <SignUpForm onSubmit={onSignUp} loading={loading} />
      case 'forgot':
        return <ForgotForm onStart={onForgotStart} onConfirm={onForgotConfirm} loading={loading} />
      case 'verify':
        return <VerifyForm emailFromUrl={emailInUrl} onSubmit={onVerify} onResendCode={onResendCode} loading={loading} />
      case 'signin':
      default:
        return <SignInForm onSubmit={onSignIn} loading={loading} />
    }
  }, [resolvedMode, onSignIn, onSignUp, onForgotStart, onForgotConfirm, onVerify, onResendCode, loading, emailInUrl])

  return (
    <main className="min-h-100dvh grid place-items-center p-4">
      <motion.section
        initial="hidden"
        animate="show"
        variants={shellVariants}
        className="w-full max-w-28rem"
      >
        {content}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to our
          {' '}<Link href="/legal/terms" className="text-primary underline-offset-4 hover:underline">Terms</Link> and
          {' '}<Link href="/legal/privacy" className="text-primary underline-offset-4 hover:underline">Privacy Policy</Link>.
        </p>
      </motion.section>
    </main>
  )
}
