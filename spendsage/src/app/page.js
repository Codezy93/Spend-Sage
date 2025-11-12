"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  TrendingUp,
  Brain,
  Wallet,
  LineChart,
  Gauge,
  Lock,
  Sparkles,
  CalendarClock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// --- Sample data for charts (placeholder; replace with real API data later) ---
const monthlyData = [
  { month: "Jan", spend: 1280 },
  { month: "Feb", spend: 1140 },
  { month: "Mar", spend: 1325 },
  { month: "Apr", spend: 1420 },
  { month: "May", spend: 1380 },
  { month: "Jun", spend: 1475 },
  { month: "Jul", spend: 1600 },
  { month: "Aug", spend: 1540 },
  { month: "Sep", spend: 1490 },
  { month: "Oct", spend: 1650 },
  { month: "Nov", spend: 1710 },
  { month: "Dec", spend: 1825 },
];

const runwayData = Array.from({ length: 30 }).map((_, i) => ({
  day: i + 1,
  spend: 40 + Math.round(10 * Math.sin(i / 4)) + (i > 20 ? 15 : 0),
}));

const kpis = [
  { label: "Categorization Accuracy", value: "92%", icon: CheckCircle2 },
  { label: "Monthly MAPE", value: "≤12%", icon: LineChart },
  { label: "Daily MAPE", value: "≤18%", icon: Gauge },
  { label: "P95 Latency", value: "≤2.0s", icon: CalendarClock },
];

const features = [
  {
    icon: Wallet,
    title: "Auto‑track & categorize",
    desc: "Connect once; transactions stream in and are labeled into categories & sub‑categories.",
    bullets: ["Bank‑style descriptors normalized", "Sub‑category suggestions learn over time"],
  },
  {
    icon: TrendingUp,
    title: "Forecast your month",
    desc: "Spot seasonality and trends at a glance with a rolling monthly projection.",
    bullets: ["Holiday spikes revealed", "Backtest metrics in product"],
  },
  {
    icon: Brain,
    title: "Actionable budget tips",
    desc: "Plain‑English nudges to optimize spend—cap coffee, flag price hikes, trim unused subs.",
    bullets: ["No investment advice", "Snooze/apply micro‑actions"],
  },
  {
    icon: Shield,
    title: "Privacy by design",
    desc: "Demo runs on synthetic data with read‑only keys and least‑privilege controls.",
    bullets: ["No live PII", "Clear redaction and logging policy"],
  },
];

const faqs = [
  {
    q: "Is this using my real bank data?",
    a: "No. The demo uses synthetic transactions and read‑only sandbox connections for illustrative purposes.",
  },
  {
    q: "How do forecasts work?",
    a: "Monthly trends use a history‑aware model; daily runway uses short‑horizon time series. Both show uncertainty via bands.",
  },
  {
    q: "Will you move money or change bills?",
    a: "Never. Suggestions are informational only. You decide what to change—outside the app or via your providers.",
  },
  {
    q: "Can I export my data?",
    a: "Yes. You can export the synthetic dataset or your own uploaded CSV while testing.",
  },
  {
    q: "Accessibility support?",
    a: "We follow WCAG 2.2 AA: high contrast, keyboard nav, alt text, and reduced‑motion mode.",
  },
  {
    q: "What about pricing?",
    a: "The current release is a free educational demo. Production pricing will be announced later.",
  },
];

// --- Motion helpers ---
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white to-muted/30 text-foreground">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-backdrop-filter:bg-background/70 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-indigo-600/10 grid place-items-center">
              <Sparkles className="size-4 text-indigo-600" />
            </div>
            <span className="font-semibold tracking-tight">Spend&nbsp;Sage</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-indigo-600">Features</a>
            <a href="#how" className="hover:text-indigo-600">How it works</a>
            <a href="#forecasts" className="hover:text-indigo-600">Forecasts</a>
            <a href="#security" className="hover:text-indigo-600">Security</a>
            <a href="#faq" className="hover:text-indigo-600">FAQ</a>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/auth/signin">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Trust Banner */}
      <div className="border-b bg-amber-50 text-amber-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 text-xs sm:text-sm flex items-center gap-2">
          <Badge variant="secondary" className="bg-amber-100 text-amber-900">Demo</Badge>
          Educational preview—synthetic data only. No live banking or PII.
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            <Badge className="mb-4">AI‑powered personal finance</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
              Track. Forecast. Optimize. Automatically.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Spend Sage streams your transactions, auto‑categorizes them, projects your month, and surfaces
              plain‑English tips to grow savings—without spreadsheets.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/dashboard">Try the demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#how">See how it works</Link>
              </Button>
            </div>

            {/* KPI strip */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {kpis.map(({ label, value, icon: Icon }) => (
                <Card key={label} className="border-dashed">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Icon className="size-5 text-indigo-600" />
                    <div>
                      <div className="text-sm text-muted-foreground">{label}</div>
                      <div className="font-semibold">{value}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative background */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-20 blur-3xl opacity-20">
          <div className="mx-auto h-48 w-3/4 bg-linear-to-r from-indigo-400/30 via-violet-400/30 to-sky-400/30 rounded-full" />
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">How it works</h2>
            <p className="mt-2 text-muted-foreground">
              Three simple steps to clarity.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[{
              title: "Connect",
              desc: "Link accounts in the sandbox to stream transactions (or upload CSV).",
              Icon: Lock,
            }, {
              title: "Categorize",
              desc: "We label merchants into categories & sub‑categories—no manual tedium.",
              Icon: Wallet,
            }, {
              title: "Insight",
              desc: "Forecast your month and get gentle, actionable tips to optimize.",
              Icon: Brain,
            }].map(({ title, desc, Icon }) => (
              <Card key={title}>
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="size-10 rounded-xl bg-indigo-600/10 grid place-items-center">
                    <Icon className="size-5 text-indigo-600" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Everything you need to stay on track</h2>
            <p className="mt-2 text-muted-foreground">Powerful—but calm and clear.</p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {features.map((f) => (
              <Card key={f.title} className="hover:shadow-sm transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-indigo-600/10 grid place-items-center">
                      <f.icon className="size-5 text-indigo-600" />
                    </div>
                    <div>
                      <CardTitle className="leading-tight">{f.title}</CardTitle>
                      <CardDescription>{f.desc}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    {f.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Preview Strip */}
      <section aria-label="Dashboard preview" className="py-8 sm:py-12 bg-muted/50 border-y">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Monthly Trend</CardTitle>
                <CardDescription>Projected total spend (sample)</CardDescription>
              </CardHeader>
              <CardContent className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="currentColor" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                    <YAxis tickLine={false} axisLine={false} fontSize={12} width={35} />
                    <Tooltip cursor={{ stroke: "currentColor", opacity: 0.2 }} />
                    <Area type="monotone" dataKey="spend" stroke="currentColor" fill="url(#g1)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">30‑Day Runway</CardTitle>
                <CardDescription>Daily spend projection (sample)</CardDescription>
              </CardHeader>
              <CardContent className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={runwayData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
                    <YAxis tickLine={false} axisLine={false} fontSize={12} width={35} />
                    <Tooltip cursor={{ stroke: "currentColor", opacity: 0.2 }} />
                    <Line type="monotone" dataKey="spend" stroke="currentColor" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Optimization Tips</CardTitle>
                <CardDescription>Low‑friction, actionable suggestions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Cap weekday coffee at $18/wk","Snooze gym add‑on: unused 3 weeks","Cancel duplicate music sub"].map((tip) => (
                  <div key={tip} className="flex items-center justify-between gap-3 rounded-xl border bg-background px-3 py-2">
                    <span className="text-sm">{tip}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary">Snooze</Button>
                      <Button size="sm">Apply</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">View more</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Forecasts spotlight with tabs */}
      <section id="forecasts" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Forecasts you can actually use</h2>
            <p className="mt-2 text-muted-foreground">High‑signal summaries, not dashboard overload.</p>
          </div>

          <Tabs defaultValue="monthly" className="mt-8">
            <TabsList>
              <TabsTrigger value="monthly">Monthly trend</TabsTrigger>
              <TabsTrigger value="daily">Daily runway</TabsTrigger>
            </TabsList>
            <TabsContent value="monthly" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Projected monthly spend</CardTitle>
                  <CardDescription>Seasonality aware (sample data)</CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="currentColor" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} width={40} />
                      <Tooltip />
                      <Area type="monotone" dataKey="spend" stroke="currentColor" fill="url(#g2)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="daily" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>30‑day daily forecast</CardTitle>
                  <CardDescription>Short‑horizon projection (sample data)</CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={runwayData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="day" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} width={40} />
                      <Tooltip />
                      <Line type="monotone" dataKey="spend" stroke="currentColor" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Security & Accessibility */}
      <section id="security" className="py-8 sm:py-12 bg-muted/50 border-y">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <Card>
              <CardHeader className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-indigo-600/10 grid place-items-center">
                  <Shield className="size-5 text-indigo-600" />
                </div>
                <div>
                  <CardTitle>Security & Privacy</CardTitle>
                  <CardDescription>Read‑only, synthetic, least‑privilege</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>No live banking access. Demo uses sandbox connections and synthetic transactions.</p>
                <p>Secrets stored via environment manager; merchant strings optionally hashed in telemetry.</p>
                <p>Clear banner and guardrails—no tax/investment/lending advice.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-indigo-600/10 grid place-items-center">
                  <Lock className="size-5 text-indigo-600" />
                </div>
                <div>
                  <CardTitle>Accessibility & Sustainability</CardTitle>
                  <CardDescription>WCAG 2.2 AA; efficient by default</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>High contrast, keyboard navigation, semantic HTML, alt text, reduced‑motion mode.</p>
                <p>Prefer efficient models and caching where possible to cut compute and latency.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Frequently asked questions</h2>
            <p className="mt-2 text-muted-foreground">Quick answers to common questions.</p>
          </div>

          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">Ready to get a clearer picture?</h3>
          <p className="mt-2 text-muted-foreground">
            Spin up the demo dashboard with synthetic data in seconds.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/auth/signup">Create free demo</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">Open dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-xl bg-indigo-600/10 grid place-items-center">
                <Sparkles className="size-4 text-indigo-600" />
              </div>
              <span className="font-semibold tracking-tight">Spend Sage</span>
            </div>
            <nav className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
              <div className="space-y-2">
                <div className="font-medium">Product</div>
                <Link href="#features" className="text-muted-foreground hover:text-foreground">Features</Link>
                <Link href="#how" className="text-muted-foreground hover:text-foreground">How it works</Link>
                <Link href="#forecasts" className="text-muted-foreground hover:text-foreground">Forecasts</Link>
              </div>
              <div className="space-y-2">
                <div className="font-medium">Company</div>
                <Link href="#security" className="text-muted-foreground hover:text-foreground">Security</Link>
                <Link href="#faq" className="text-muted-foreground hover:text-foreground">FAQ</Link>
              </div>
              <div className="space-y-2">
                <div className="font-medium">Legal</div>
                <a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a>
                <a href="#" className="text-muted-foreground hover:text-foreground">Terms</a>
              </div>
              <div className="space-y-2">
                <div className="font-medium">Get started</div>
                <Link href="/auth/signup" className="text-muted-foreground hover:text-foreground">Create demo</Link>
                <Link href="/auth/login" className="text-muted-foreground hover:text-foreground">Sign in</Link>
              </div>
            </nav>
          </div>
          <div className="mt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Spend Sage. For educational purposes only—no financial advice.
          </div>
        </div>
      </footer>
    </main>
  );
}