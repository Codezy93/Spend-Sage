'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

// Mock data: last 6 months actual + next 6 months forecast
const data = [
  { month: 'Jul', actual: 2800, forecast: null },
  { month: 'Aug', actual: 3200, forecast: null },
  { month: 'Sep', actual: 2900, forecast: null },
  { month: 'Oct', actual: 3400, forecast: null },
  { month: 'Nov', actual: 3100, forecast: null },
  { month: 'Dec', actual: 3500, forecast: null },
  { month: 'Jan', actual: null, forecast: 3400 },
  { month: 'Feb', actual: null, forecast: 3200 },
  { month: 'Mar', actual: null, forecast: 3600 },
  { month: 'Apr', actual: null, forecast: 3300 },
  { month: 'May', actual: null, forecast: 3500 },
  { month: 'Jun', actual: null, forecast: 3700 },
]

export function SixMonthForecast() {
  return (
    <Card className="bg-white/60 dark:bg-background/60 backdrop-blur-sm border-emerald-200/50 dark:border-emerald-800/50">
      <CardHeader>
        <CardTitle>6-Month Spending Forecast</CardTitle>
        <CardDescription>Historical data and AI-powered predictions</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            actual: {
              label: 'Actual Spending',
              color: 'hsl(var(--chart-1))',
            },
            forecast: {
              label: 'Forecasted Spending',
              color: 'hsl(var(--chart-2))',
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="var(--color-actual)"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Actual Spending"
              />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="var(--color-forecast)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
                name="Forecasted Spending"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
