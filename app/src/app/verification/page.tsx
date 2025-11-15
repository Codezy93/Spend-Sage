'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function VerificationPage() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()
  }, [])

  const handleResend = async () => {
    // Simulate resend
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="size-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Sparkles className="size-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            SpendSage
          </span>
        </Link>
        <div className="bg-white/80 dark:bg-background/80 backdrop-blur-xl rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50 shadow-xl shadow-emerald-500/10 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Verify your email</h1>
            <p className="text-sm text-muted-foreground">
              We&apos;ve sent a verification link code to your email
            </p>
          </div>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Didn&apos;t receive the code?{' '}
            <button
              onClick={handleResend}
              className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium"
            >
              Resend
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}