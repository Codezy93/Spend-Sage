import { createClient } from '@/lib/supabase/server'
import { plaidClient } from '@/lib/plaid/config'
import type { TransactionRecord } from '@/types/transactions'
import { redirect } from 'next/navigation'

// ---- Types for the summary ----

export type SpendingSummary = {
  totalToday: number
  totalMonthToDate: number
  totalLast30Days: number
  totalYearToDate: number
  avgMonthlyCostYTD: number
  monthlyTotalsLast6Months: { month: string; total: number }[] // YYYY-MM
  dailyTotalsLast15Days: { date: string; total: number }[]     // YYYY-MM-DD
}

export type TransactionsResult = {
  transactions: TransactionRecord[]
  summary: SpendingSummary
}

// ---- Date helpers ----

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10) // YYYY-MM-DD
}

function addMonths(d: Date, delta: number): Date {
  const copy = new Date(d)
  copy.setMonth(copy.getMonth() + delta)
  return copy
}

function addDays(d: Date, delta: number): Date {
  const copy = new Date(d)
  copy.setDate(copy.getDate() + delta)
  return copy
}

function isBetween(dateStr: string, fromStr: string, toStr: string): boolean {
  return dateStr >= fromStr && dateStr <= toStr
}

// Only count real expenses (no pending, no income/transfer)
function isExpense(tx: any): boolean {
  if (tx.pending) return false
  if (tx.amount <= 0) return false

  const primary = tx.personal_finance_category?.primary
  if (primary === 'INCOME' || primary === 'TRANSFER') return false

  return true
}

// ---- Main function ----

async function getTransactions(): Promise<TransactionsResult> {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  const { data: plaidTokenData, error: plaidTokenError } = await supabase
    .from('plaid_tokens')
    .select('token')
    .eq('id', user.id)
    .single()

  if (plaidTokenError || !plaidTokenData?.token) {
    redirect('/plaid-connect')
  }

  const today = new Date()
  const todayStr = formatDate(today)

  // Fetch last 12 months to comfortably cover:
  // - YTD
  // - last 6 months
  // - last 30 / 15 days
  const startDate = addMonths(today, -11)
  const startDateStr = formatDate(startDate)
  const endDateStr = todayStr

  let allPlaidTx: any[] = []
  const pageSize = 100
  let offset = 0

  try {
    while (true) {
      const plaidResponse = await plaidClient.transactionsGet({
        access_token: plaidTokenData.token,
        start_date: startDateStr,
        end_date: endDateStr,
        options: {
          count: pageSize,
          offset,
        },
      })

      const { transactions, total_transactions } = plaidResponse.data

      allPlaidTx = allPlaidTx.concat(transactions)

      if (allPlaidTx.length >= total_transactions) break

      offset += pageSize
    }
  } catch (error) {
    console.error('Failed to fetch transactions from Plaid', error)
    // Fall back to empty
    allPlaidTx = []
  }

  // Map for UI table / list
  const transactions: TransactionRecord[] = allPlaidTx.map((transaction) => ({
    id: transaction.transaction_id,
    created_at: transaction.datetime ?? `${transaction.date}T00:00:00Z`,
    amount: Number(transaction.amount ?? 0),
    vendor: transaction.merchant_name ?? transaction.name ?? 'Unknown vendor',
    category: transaction.personal_finance_category?.primary ?? 'Uncategorized',
  }))

  // ---- Aggregations for "total amount spend" ----

  const expenseTx = allPlaidTx.filter(isExpense)

  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
  const monthStartStr = formatDate(monthStart)

  const yearStart = new Date(today.getFullYear(), 0, 1)
  const yearStartStr = formatDate(yearStart)

  const last30Start = addDays(today, -29)
  const last30StartStr = formatDate(last30Start)

  const last15Start = addDays(today, -14)
  const last15StartStr = formatDate(last15Start)

  let totalToday = 0
  let totalMonthToDate = 0
  let totalLast30Days = 0
  let totalYearToDate = 0

  const monthlyMap: Record<string, number> = {} // YYYY-MM -> total
  const dailyMap: Record<string, number> = {}   // YYYY-MM-DD -> total (for last 15 days)

  for (const tx of expenseTx) {
    const d: string = tx.date // 'YYYY-MM-DD'
    const amt: number = tx.amount

    // 1) Range-based totals
    if (d === todayStr) {
      totalToday += amt
    }

    if (isBetween(d, monthStartStr, todayStr)) {
      totalMonthToDate += amt
    }

    if (isBetween(d, last30StartStr, todayStr)) {
      totalLast30Days += amt
    }

    if (isBetween(d, yearStartStr, todayStr)) {
      totalYearToDate += amt
    }

    // 2) Monthly aggregation (for last 6 months chart)
    const monthKey = d.slice(0, 7) // YYYY-MM
    monthlyMap[monthKey] = (monthlyMap[monthKey] ?? 0) + amt

    // 3) Daily aggregation (for last 15 days)
    if (isBetween(d, last15StartStr, todayStr)) {
      dailyMap[d] = (dailyMap[d] ?? 0) + amt
    }
  }

  // Avg monthly cost this year so far
  const monthsElapsed = today.getMonth() + 1 // Jan=0
  const avgMonthlyCostYTD =
    monthsElapsed > 0 ? totalYearToDate / monthsElapsed : 0

  // Monthly totals for last 6 months (oldest -> newest)
  const monthKeys: string[] = []
  {
    let cursor = new Date(today.getFullYear(), today.getMonth(), 1)
    for (let i = 0; i < 6; i++) {
      const key = `${cursor.getFullYear()}-${String(
        cursor.getMonth() + 1,
      ).padStart(2, '0')}`
      monthKeys.unshift(key)
      cursor = addMonths(cursor, -1)
    }
  }

  const monthlyTotalsLast6Months = monthKeys.map((month) => ({
    month,
    total: monthlyMap[month] ?? 0,
  }))

  // Daily totals for last 15 days (oldest -> newest)
  const dayKeys: string[] = []
  for (let i = 14; i >= 0; i--) {
    dayKeys.push(formatDate(addDays(today, -i)))
  }

  const dailyTotalsLast15Days = dayKeys.map((date) => ({
    date,
    total: dailyMap[date] ?? 0,
  }))

  const summary: SpendingSummary = {
    totalToday,
    totalMonthToDate,
    totalLast30Days,
    totalYearToDate,
    avgMonthlyCostYTD,
    monthlyTotalsLast6Months,
    dailyTotalsLast15Days,
  }

  return { transactions, summary }
}

export default getTransactions