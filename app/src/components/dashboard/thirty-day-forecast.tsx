'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

// Mock data: last 15 days actual + next 15 days forecast
const data = [
  { day: 'Dec 20', actual: 85, forecast: null },
  { day: 'Dec 22', actual: 120, forecast: null },
  { day: 'Dec 24', actual: 95, forecast: null },
  { day: 'Dec 26', actual: 160, forecast: null },
  { day: 'Dec 28', actual: 110, forecast: null },
  { day: 'Dec 30', actual: 140, forecast: null },
  { day: 'Jan 1', actual: 125, forecast: null },
  { day: 'Jan 3', actual: null, forecast: 130 },
  { day: 'Jan 5', actual: null, forecast: 115 },
  { day: 'Jan 7', actual: null, forecast: 145 },
  { day: 'Jan 9', actual: null, forecast: 120 },
  { day: 'Jan 11', actual: null, forecast: 135 },
  { day: 'Jan 13', actual: null, forecast: 125 },
  { day: 'Jan 15', actual: null, forecast: 150 },
]

export function ThirtyDayForecast() {
  return (
    <Card className="bg-white/60 dark:bg-background/60 backdrop-blur-sm border-emerald-200/50 dark:border-emerald-800/50">
      <CardHeader>
        <CardTitle>30-Day Spending Forecast</CardTitle>
        <CardDescription>Daily spending trends and predictions</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            actual: {
              label: 'Actual',
              color: 'hsl(var(--chart-3))',
            },
            forecast: {
              label: 'Forecast',
              color: 'hsl(var(--chart-4))',
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="day"
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                interval={2}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="var(--color-actual)"
                fill="var(--color-actual)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="var(--color-forecast)"
                fill="var(--color-forecast)"
                fillOpacity={0.2}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
