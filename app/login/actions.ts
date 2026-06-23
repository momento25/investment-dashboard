"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export type LoginState = {
  error: { message: string } | null
} | null

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function loginWithEmail(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!email || !password) {
    return { error: { message: "이메일과 비밀번호를 입력해주세요" } }
  }
  if (!EMAIL_RE.test(email)) {
    return { error: { message: "이메일 형식이 올바르지 않습니다" } }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    // Supabase는 이메일/비번 어느 쪽이 틀렸는지 분리해 알려주지 않음
    return { error: { message: "이메일 또는 비밀번호가 올바르지 않습니다" } }
  }

  redirect("/")
}
