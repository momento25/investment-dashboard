"use client"

import { useActionState, useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { updatePassword, type NewPasswordState } from "./actions"

export function NewPasswordForm() {
  const [state, formAction, pending] = useActionState<NewPasswordState, FormData>(
    updatePassword,
    null,
  )

  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const passwordValid = password.length >= 8
  const topError = state?.error ?? null

  return (
    <div className="w-full max-w-[400px] rounded-2xl border border-white/10 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur">
      <h1 className="font-display text-2xl font-bold text-white">새 비밀번호 설정</h1>
      <p className="mt-2 text-sm text-white/70">사용하실 새 비밀번호를 입력해주세요.</p>

      {topError && (
        <div
          role="alert"
          className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200"
        >
          {topError.message}
        </div>
      )}

      <form action={formAction} className="mt-5 space-y-4" noValidate>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white/80">
            새 비밀번호
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              maxLength={72}
              autoComplete="new-password"
              placeholder="새 비밀번호 (8자 이상)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={pending}
              className="w-full rounded-lg border border-white/10 bg-zinc-800/60 px-3 py-2 pr-10 text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/10 disabled:opacity-60"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-white/50 hover:text-white"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          <p
            className={`mt-1 text-xs ${
              password.length === 0
                ? "text-white/40"
                : passwordValid
                  ? "text-emerald-400"
                  : "text-white/60"
            }`}
          >
            {passwordValid ? "✓ 사용 가능" : "8자 이상 입력"}
          </p>
        </div>

        <Button type="submit" disabled={!passwordValid || pending} className="w-full">
          {pending ? "변경 중..." : "비밀번호 변경"}
        </Button>
      </form>
    </div>
  )
}
