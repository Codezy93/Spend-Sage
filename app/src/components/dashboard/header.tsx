'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sparkles, MessageSquare, LogOut, User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function DashboardHeader() {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-background/70 border-b border-emerald-200/50 dark:border-emerald-800/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="size-8 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Sparkles className="size-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            SpendSage
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Button
            asChild
            className="bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/30"
          >
            <Link href="/chat">
              <MessageSquare className="size-4 mr-2" />
              AI Chat
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <User className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <User className="size-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="size-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}