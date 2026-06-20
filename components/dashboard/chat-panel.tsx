"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Send, Sparkles } from "lucide-react"

const suggestions = ["오늘 시장 어떻게 봐?", "반도체·AI 인프라 흐름 정리해줘", "원/달러 환율과 미국 금리 관계는?"]

export function ChatPanel() {
  const [input, setInput] = useState("")
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })
  const scrollRef = useRef<HTMLDivElement>(null)
  const briefedRef = useRef(false)
  const busy = status === "streaming" || status === "submitted"

  // 접속 시 오늘의 지표 자동 브리핑 (PRD 서브기능 ①)
  useEffect(() => {
    if (briefedRef.current) return
    briefedRef.current = true
    sendMessage({
      text: "접속하자마자 보는 오늘의 시장 브리핑이야. 핵심 지표를 바탕으로 오늘 시장 분위기를 3~4문장으로 한 단락 요약해줘.",
    })
  }, [sendMessage])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  function submit(text: string) {
    const value = text.trim()
    if (!value || busy) return
    sendMessage({ text: value })
    setInput("")
  }

  return (
    <div className="flex h-full flex-col bg-sidebar/80 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3.5">
        <span className="flex size-7 items-center justify-center rounded-md bg-brand text-primary-foreground">
          <Sparkles className="size-4" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold text-foreground">AI 시장 비서</p>
          <p className="text-xs text-muted-foreground">Claude · 실시간 데이터 기반</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex flex-col gap-3 pt-2">
            <p className="text-sm text-muted-foreground">오늘의 지표를 불러와 브리핑을 준비하고 있어요…</p>
          </div>
        ) : (
          messages.map((m, idx) => {
            const text = m.parts
              .filter((p): p is { type: "text"; text: string } => p.type === "text")
              .map((p) => p.text)
              .join("")
            const isUser = m.role === "user"
            // 자동 브리핑 프롬프트(첫 user 메시지)는 숨김
            if (isUser && idx === 0) return null
            const isBriefing = idx === 1 && m.role === "assistant"
            return (
              <div key={m.id} className={`flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}>
                {isBriefing ? (
                  <span className="flex items-center gap-1 text-xs font-semibold text-brand">
                    <Sparkles className="size-3" /> 오늘의 브리핑
                  </span>
                ) : null}
                <div
                  className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    isUser ? "bg-brand text-primary-foreground" : "glass-inset text-card-foreground"
                  }`}
                >
                  {text || (busy ? "…" : "")}
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Suggestions + Input */}
      <div className="border-t border-border">
        <div className="flex flex-wrap gap-1.5 px-3 pt-3">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => submit(s)}
              disabled={busy}
              className="rounded-full border border-border bg-card/60 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-brand hover:text-brand disabled:opacity-40"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit(input)
          }}
          className="flex items-end gap-2 p-3"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                submit(input)
              }
            }}
            rows={1}
            placeholder="시장에 대해 질문하기..."
            className="max-h-28 min-h-9 flex-1 resize-none rounded-xl border border-border bg-card/70 px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand text-primary-foreground transition-opacity disabled:opacity-40"
            aria-label="메시지 보내기"
          >
            <Send className="size-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
