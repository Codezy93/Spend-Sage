'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Sparkles, Send, ArrowLeft, Loader2 } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const suggestedQuestions = [
  'How can I reduce my spending on dining out?',
  'What are my biggest spending categories?',
  'Create a budget plan for next month',
  'Compare my spending to last month',
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm SpendSage AI, your personal financial assistant. I can help you understand your spending patterns, create budgets, and provide personalized tips to save more money. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: generateMockResponse(input),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, aiMessage])
    setIsLoading(false)
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
    textareaRef.current?.focus()
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-background/70 border-b border-emerald-200/50 dark:border-emerald-800/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon">
              <Link href="/dashboard">
                <ArrowLeft className="size-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Sparkles className="size-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">SpendSage AI</h1>
                <p className="text-xs text-muted-foreground">Financial Assistant</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <ScrollArea ref={scrollAreaRef} className="h-[calc(100vh-280px)]">
          <div className="space-y-6 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="size-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0">
                    <Sparkles className="size-5 text-white" />
                  </div>
                )}
                <Card
                  className={`max-w-[80%] p-4 ${
                    message.role === 'user'
                      ? 'bg-linear-to-br from-emerald-500 to-teal-600 text-white border-0'
                      : 'bg-white/80 dark:bg-background/80 backdrop-blur-sm border-emerald-200/50 dark:border-emerald-800/50'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-emerald-100' : 'text-muted-foreground'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                </Card>
                {message.role === 'user' && (
                  <div className="size-10 rounded-xl bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center shrink-0 text-white font-semibold">
                    You
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="size-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0">
                  <Sparkles className="size-5 text-white" />
                </div>
                <Card className="p-4 bg-white/80 dark:bg-background/80 backdrop-blur-sm border-emerald-200/50 dark:border-emerald-800/50">
                  <div className="flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin text-emerald-600" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-3">Suggested questions:</p>
            <div className="grid md:grid-cols-2 gap-3">
              {suggestedQuestions.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  className="justify-start text-left h-auto py-3 px-4 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  <span className="text-sm leading-relaxed">{question}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 border-t border-emerald-200/50 dark:border-emerald-800/50 bg-white/70 dark:bg-background/70 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your finances..."
              className="min-h-[60px] max-h-[120px] resize-none bg-white dark:bg-background"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              className="size-[60px] bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/30 shrink-0"
              disabled={!input.trim() || isLoading}
            >
              <Send className="size-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

// Mock AI response generator
function generateMockResponse(input: string): string {
  const lowerInput = input.toLowerCase()

  if (lowerInput.includes('dining') || lowerInput.includes('restaurant')) {
    return `Based on your spending patterns, I've noticed you spend about $450/month on dining out. Here are some personalized tips to reduce this:

1. Meal Prep Sundays: Cooking meals in bulk can save you $200-300/month
2. Set a dining budget: Try limiting dining out to 2-3 times per week
3. Use dining rewards: Your credit card offers 3% back on dining
4. Pack lunch 3x per week: This alone could save you ~$120/month

Would you like me to create a specific action plan or track your progress?`
  }

  if (lowerInput.includes('budget') || lowerInput.includes('plan')) {
    return `I've analyzed your spending patterns and created a recommended budget for next month:

🏠 Housing: $1,200 (35%)
🍔 Food & Dining: $600 (18%)
🚗 Transportation: $400 (12%)
🎬 Entertainment: $200 (6%)
💰 Savings: $800 (24%)
📱 Other: $200 (6%)

Total Monthly Budget: $3,400

This plan allocates 24% to savings, which is above the recommended 20%. You're doing great! Would you like me to adjust any categories?`
  }

  if (lowerInput.includes('spending') || lowerInput.includes('categories')) {
    return `Here's your spending breakdown for the last 30 days:

1. Dining & Food: $450 (32%)
2. Shopping: $285 (20%)
3. Transportation: $210 (15%)
4. Entertainment: $180 (13%)
5. Health & Wellness: $140 (10%)
6. Other: $135 (10%)

Your biggest opportunity for savings is in Dining & Food. You're spending 32% of your budget here, while the average is 15-20%. Would you like specific tips to reduce this?`
  }

  if (lowerInput.includes('compare') || lowerInput.includes('last month')) {
    return `Let me compare your spending to last month:

📊 Total Spending:
This month: $2,845 (-8.2%)
Last month: $3,100

✅ Improvements:
• Dining: $450 (down from $520) - Great job!
• Entertainment: $180 (down from $240)

⚠️ Increases:
• Shopping: $285 (up from $180)
• Transportation: $210 (up from $190)

Overall, you're trending in the right direction! Your disciplined approach to dining has really paid off. Keep it up!`
  }

  return `I'd be happy to help you with that! I can provide insights on:

• Your spending patterns and trends
• Personalized savings recommendations
• Budget planning and optimization
• Financial forecasting
• Category-specific advice

Could you provide more details about what specific aspect of your finances you'd like to explore?`
}