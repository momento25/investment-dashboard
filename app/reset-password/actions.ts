"use server"

import { createClient } from "@/lib/supabase/server"

export type ResetState =
  | { ok: true; email: string }
  | { ok: false; error: { message: string } }
  | null

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function requestPasswordReset(
  _prev: ResetState,
  formData: FormData,
): Promise<ResetState> {
  const email = String(formData.get("email") ?? "").trim()
  const origin = String(formData.get("origin") ?? "")

  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: { message: "이메일 형식이 올바르지 않습니다" } }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password/new`,
  })

  // 보안: 가입 여부와 무관하게 항상 sent 상태로 응답한다 (사용자 열거 방어).
  // Supabase 자체도 그렇게 동작하지만, 만약 다른 종류의 에러가 나도 사용자에게는 sent로 표시.
  if (error) {
    // 네트워크/시스템 오류만 사용자에게 노출
    return {
      ok: false,
      error: { message: "잠시 후 다시 시도해주세요." },
    }
  }

  return { ok: true, email }
}
