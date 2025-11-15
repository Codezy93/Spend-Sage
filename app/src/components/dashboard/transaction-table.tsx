import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import type { TransactionRecord } from '@/types/transactions'

const categoryColors: Record<string, string> = {
  INCOME: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200',
  TRANSFER_IN: 'bg-teal-50 text-teal-600 dark:bg-teal-900/40 dark:text-teal-200',
  TRANSFER_OUT: 'bg-sky-50 text-sky-600 dark:bg-sky-900/40 dark:text-sky-200',
  LOAN_PAYMENTS: 'bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-200',
  BANK_FEES: 'bg-rose-50 text-rose-600 dark:bg-rose-900/40 dark:text-rose-200',
  ENTERTAINMENT: 'bg-purple-50 text-purple-600 dark:bg-purple-900/40 dark:text-purple-200',
  FOOD_AND_DRINK: 'bg-orange-50 text-orange-600 dark:bg-orange-900/40 dark:text-orange-200',
  GENERAL_MERCHANDISE: 'bg-pink-50 text-pink-600 dark:bg-pink-900/40 dark:text-pink-200',
  HOME_IMPROVEMENT: 'bg-lime-50 text-lime-600 dark:bg-lime-900/40 dark:text-lime-200',
  MEDICAL: 'bg-red-50 text-red-600 dark:bg-red-900/40 dark:text-red-200',
  PERSONAL_CARE: 'bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-900/40 dark:text-fuchsia-200',
  GENERAL_SERVICES: 'bg-stone-50 text-stone-600 dark:bg-stone-900/40 dark:text-stone-200',
  GOVERNMENT_AND_NON_PROFIT: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-200',
  TRANSPORTATION: 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-200',
  TRAVEL: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-200',
  RENT_AND_UTILITIES: 'bg-violet-50 text-violet-600 dark:bg-violet-900/40 dark:text-violet-200',
};

type TransactionTableProps = {
  transactions: TransactionRecord[]
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <Card className="bg-white/60 dark:bg-background/60 backdrop-blur-sm border-emerald-200/50 dark:border-emerald-800/50">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Last 90 days of transaction history</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-emerald-200/50 dark:border-emerald-800/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                <TableHead>Date</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length ? (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10">
                    <TableCell className="font-medium">
                      {new Date(transaction.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>{transaction.vendor}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={categoryColors[transaction.category] || 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300'}
                      >
                        {transaction.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      <span className={transaction.amount > 0 ? 'text-red-400' : 'text-emerald-400'}>
                        {transaction.amount > 0 ? '-' : ''}${Math.abs(Number(transaction.amount ?? 0)).toFixed(2)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No transactions yet. Connect your bank account to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
