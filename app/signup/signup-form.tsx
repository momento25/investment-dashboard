"use client"

import Link from "next/link"
import { useActionState, useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { signUpWithEmail, type SignupState } from "./actions"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function SignupForm() {
  const [state, formAction, pending] = useActionState<SignupState, FormData>(
    signUpWithEmail,
    null,
  )

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [emailBlurred, setEmailBlurred] = useState(false)
  const [oauthError, setOauthError] = useState<string | null>(null)
  const [oauthPending, setOauthPending] = useState(false)

  const emailValid = EMAIL_RE.test(email)
  const passwordValid = password.length >= 8
  const formValid = emailValid && passwordValid
  const showEmailError = emailBlurred && email.length > 0 && !emailValid

  const busy = pending || oauthPending
  const topError = state?.error ?? (oauthError ? { message: oauthError } : null)

  async function handleGoogleSignup() {
    setOauthError(null)
    setOauthPending(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setOauthError("구글 로그인을 완료하지 못했습니다. 다시 시도해주세요.")
      setOauthPending(false)
    }
    // 성공 시에는 브라우저가 구글로 리다이렉트되어 이 함수는 끝나지 않는다.
  }

  return (
    <div className="w-full max-w-[400px] rounded-2xl border border-white/10 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur">
      <div className="mb-6 text-center">
        <p className="text-xs uppercase tracking-wider text-white/50">투자 대시보드</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-white">계정 만들기</h1>
      </div>

      {topError && (
        <div
          role="alert"
          className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200"
        >
          {topError.message}
          {"linkHref" in topError && topError.linkHref && (
            <>
              {" "}
              <Link
                href={topError.linkHref}
                className="ml-1 font-medium text-red-100 underline-offset-4 hover:underline"
              >
                {topError.linkLabel}
              </Link>
            </>
          )}
        </div>
      )}

      <form action={formAction} className="space-y-4" noValidate>
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
            disabled={busy}
            className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-800/60 px-3 py-2 text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/10 disabled:opacity-60"
          />
          {showEmailError && (
            <p className="mt-1 text-xs text-red-300">이메일 형식이 올바르지 않습니다</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white/80">
            비밀번호
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              maxLength={72}
              autoComplete="new-password"
              placeholder="비밀번호 (8자 이상)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={busy}
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

        <Button type="submit" disabled={!formValid || busy} className="w-full">
          {pending ? "가입 중..." : "가입하기"}
        </Button>
      </form>

      <div className="my-4 flex items-center gap-3 text-xs text-white/30">
        <span className="h-px flex-1 bg-white/10" />
        <span>또는</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleSignup}
        disabled={busy}
        className="w-full gap-2"
      >
        <GoogleIcon className="size-4" />
        구글로 계속하기
      </Button>

      <p className="mt-6 text-center text-sm text-white/60">
        이미 계정이 있으신가요?{" "}
        <Link
          href="/login"
          className="font-medium text-white underline-offset-4 hover:underline"
        >
          로그인
        </Link>
      </p>
    </div>
  )
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}
