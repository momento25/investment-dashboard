"use client"

import { useState, type ReactNode } from "react"
import { MessageSquare, X } from "lucide-react"
import { ChatPanel } from "./chat-panel"

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Finance content */}
      <main className="min-w-0 flex-1">{children}</main>

      {/* Desktop chat sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[360px] shrink-0 border-l border-white/40 lg:block">
        <ChatPanel />
      </aside>

      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg lg:hidden"
      >
        <MessageSquare className="size-4" />
        AI 비서
      </button>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-sidebar">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
              aria-label="닫기"
            >
              <X className="size-4" />
            </button>
            <ChatPanel />
          </div>
        </div>
      ) : null}
    </div>
  )
}
