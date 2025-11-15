import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, TrendingUp, Brain, Shield, Sparkles } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-background/70 border-b border-emerald-200/50 dark:border-emerald-800/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Sparkles className="size-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              SpendSage
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Login
            </Link>
            <Button asChild className="bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/30">
              <Link href="/signup">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-8 animate-fade-in-up">
            <Sparkles className="size-4" />
            AI-Powered Financial Intelligence
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-balance animate-fade-in-up [animation-delay:100ms]">
            Track, Save, and{' '}
            <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Optimize
            </span>{' '}
            Your Finances
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed text-pretty animate-fade-in-up [animation-delay:200ms]">
            SpendSage uses artificial intelligence to help you understand your spending patterns, 
            forecast future expenses, and get personalized tips to achieve your financial goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up [animation-delay:300ms]">
            <Button asChild size="lg" className="bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/30">
              <Link href="/signup" className="gap-2">
                Start Free Trial
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-emerald-200 dark:border-emerald-800">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Everything You Need to Master Your Money
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Powerful features designed to give you complete control over your financial future
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="group p-6 rounded-2xl bg-white/60 dark:bg-background/60 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="size-12 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="size-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Tracking</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Automatically categorize and track all your transactions in real-time
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-6 rounded-2xl bg-white/60 dark:bg-background/60 backdrop-blur-sm border border-teal-200/50 dark:border-teal-800/50 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="size-12 rounded-xl bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="size-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Forecasting</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Predict spending patterns for the next 30 days and 6 months ahead
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-6 rounded-2xl bg-white/60 dark:bg-background/60 backdrop-blur-sm border border-cyan-200/50 dark:border-cyan-800/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="size-12 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="size-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Optimization Tips</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get personalized AI-powered recommendations to save more money
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-6 rounded-2xl bg-white/60 dark:bg-background/60 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="size-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="size-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Bank-Level Security</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your financial data is encrypted and protected with industry standards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-500 via-teal-600 to-cyan-600 p-12 text-center text-white shadow-2xl shadow-emerald-500/30">
            <div className="absolute inset-0 bg-[url('/abstract-linear-pattern.png')] opacity-10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                Ready to Take Control of Your Finances?
              </h2>
              <p className="text-lg mb-8 text-emerald-50 max-w-2xl mx-auto text-pretty">
                Join thousands of users who are already saving more and spending smarter with SpendSage
              </p>
              <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 shadow-lg">
                <Link href="/signup" className="gap-2">
                  Get Started Free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-emerald-200/50 dark:border-emerald-800/50 bg-white/40 dark:bg-background/40 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Sparkles className="size-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                SpendSage
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 SpendSage. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}