import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, ArrowRight } from 'lucide-react'

// Mock chat history data
const recentChats = [
  {
    id: 1,
    title: 'How can I save more on groceries?',
    preview: 'Based on your spending patterns, you could save...',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    title: 'What are my biggest spending categories?',
    preview: 'Your top spending categories are Dining ($450)...',
    timestamp: '1 day ago',
  },
  {
    id: 3,
    title: 'Budget recommendations for next month',
    preview: 'I recommend allocating $800 for groceries...',
    timestamp: '2 days ago',
  },
  {
    id: 4,
    title: 'Compare spending to last month',
    preview: "You've spent 12% less this month compared...",
    timestamp: '3 days ago',
  },
  {
    id: 5,
    title: 'Investment suggestions',
    preview: 'With your current savings rate, you could...',
    timestamp: '5 days ago',
  },
]

export function RecentChats() {
  return (
    <Card className="bg-white/60 dark:bg-background/60 backdrop-blur-sm border-emerald-200/50 dark:border-emerald-800/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Conversations</CardTitle>
          <CardDescription>Your latest chats with SpendSage AI</CardDescription>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href="/chat">
            View All
            <ArrowRight className="size-4 ml-2" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentChats.map((chat) => (
            <Link
              key={chat.id}
              href={`/chat?id=${chat.id}`}
              className="block p-4 rounded-lg bg-white dark:bg-background border border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-lg bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="size-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {chat.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-1">{chat.preview}</p>
                  <p className="text-xs text-muted-foreground mt-1">{chat.timestamp}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}