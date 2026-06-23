"use client"

import Link from "next/link"
import { useActionState, useState } from "react"

import { Button } from "@/components/ui/button"
import { requestPasswordReset, type ResetState } from "./actions"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState<ResetState, FormData>(
    requestPasswordReset,
    null,
  )
  const [email, setEmail] = useState("")
  const [emailBlurred, setEmailBlurred] = useState(false)

  const emailValid = EMAIL_RE.test(email)
  const showEmailError = emailBlurred && email.length > 0 && !emailValid
  const formValid = emailValid
  const topError = state && !state.ok ? state.error : null

  // 제출 성공 시 sent 화면으로 교체
  if (state?.ok) {
    return (
      <div className="w-full max-w-[400px] rounded-2xl border border-white/10 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur">
        <h1 className="font-display text-2xl font-bold text-white">메일을 확인해주세요</h1>
        <p className="mt-3 text-sm text-white/70">
          <span className="font-medium text-white">{state.email}</span>로 비밀번호 재설정
          링크를 보냈습니다.
        </p>
        <p className="mt-2 text-sm text-white/60">
          메일이 보이지 않으면 스팸함도 확인해주세요.
        </p>
        <Link href="/login" className="mt-6 block">
          <Button type="button" className="w-full">
            로그인 화면으로 돌아가기
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[400px] rounded-2xl border border-white/10 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur">
      <h1 className="font-display text-2xl font-bold text-white">비밀번호 재설정</h1>
      <p className="mt-2 text-sm text-white/70">
        가입하신 이메일로 재설정 링크를 보내드립니다.
      </p>

      {topError && (
        <div
          role="alert"
          className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200"
        >
          {topError.message}
        </div>
      )}

      <form action={formAction} className="mt-5 space-y-4" noValidate>
        {/* origin을 서버 액션에 전달해서 redirectTo URL을 만든다 */}
        <input
          type="hidden"
          name="origin"
          value={typeof window !== "undefined" ? window.location.origin : ""}
        />
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/80">
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailBlurred(true)}
            disabled={pending}
            className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-800/60 px-3 py-2 text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/10 disabled:opacity-60"
          />
          {showEmailError && (
            <p className="mt-1 text-xs text-red-300">이메일 형식이 올바르지 않습니다</p>
          )}
        </div>

        <Button type="submit" disabled={!formValid || pending} className="w-full">
          {pending ? "보내는 중..." : "재설정 메일 보내기"}
        </Button>
      </form>

      <Link
        href="/login"
        className="mt-6 block text-center text-sm text-white/60 underline-offset-4 hover:text-white hover:underline"
      >
        ← 로그인으로 돌아가기
      </Link>
    </div>
  )
}
