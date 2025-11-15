import { Suspense } from 'react'
import { DashboardHeader } from '@/components/dashboard/header'
import { StatsGrid } from '@/components/dashboard/stats-grid'
import { TransactionTable } from '@/components/dashboard/transaction-table'
import { SixMonthForecast } from '@/components/dashboard/six-month-forecast'
import { ThirtyDayForecast } from '@/components/dashboard/thirty-day-forecast'
import { RecentChats } from '@/components/dashboard/recent-chats'
import { Skeleton } from '@/components/ui/skeleton'
import getTransactions  from '@/lib/transactions/transactions'

export default async function DashboardPage() {
  const transactions = await getTransactions();

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Grid */}
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <StatsGrid />
        </Suspense>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <SixMonthForecast />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <ThirtyDayForecast />
          </Suspense>
        </div>

        {/* Transaction Table */}
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <TransactionTable transactions={transactions} />
        </Suspense>

        {/* Recent Chats */}
        <Suspense fallback={<Skeleton className="h-64 w-full" />}>
          <RecentChats />
        </Suspense>
      </main>
    </div>
  )
}
