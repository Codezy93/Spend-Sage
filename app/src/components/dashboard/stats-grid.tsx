import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingDown, TrendingUp, Calendar, Wallet } from 'lucide-react'

// Mock data
const stats = [
  {
    title: "Today's Spending",
    value: '$124.50',
    change: '+12.5%',
    trend: 'up' as const,
    icon: Wallet,
  },
  {
    title: 'Month to Date',
    value: '$2,845.00',
    change: '-8.2%',
    trend: 'down' as const,
    icon: Calendar,
  },
  {
    title: 'Year to Date',
    value: '$34,290.00',
    change: '+15.3%',
    trend: 'up' as const,
    icon: TrendingUp,
  },
]

export function StatsGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className="bg-white/60 dark:bg-background/60 backdrop-blur-sm border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className="size-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <stat.icon className="size-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            <div className="flex items-center gap-1 text-sm">
              {stat.trend === 'up' ? (
                <TrendingUp className="size-4 text-emerald-600" />
              ) : (
                <TrendingDown className="size-4 text-emerald-600" />
              )}
              <span className={stat.trend === 'up' ? 'text-emerald-600' : 'text-emerald-600'}>
                {stat.change}
              </span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
