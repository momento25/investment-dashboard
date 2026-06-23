"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export type SignupState = {
  error: { message: string; linkLabel?: string; linkHref?: string } | null
} | null

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function signUpWithEmail(
  _prev: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!EMAIL_RE.test(email)) {
    return { error: { message: "이메일 형식이 올바르지 않습니다" } }
  }
  if (password.length < 8 || password.length > 72) {
    return { error: { message: "비밀번호는 8자 이상 72자 이하여야 합니다" } }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    const msg = error.message?.toLowerCase() ?? ""
    if (
      error.code === "user_already_exists" ||
      msg.includes("already registered") ||
      msg.includes("already been registered")
    ) {
      return {
        error: {
          message: "이미 가입된 이메일입니다.",
          linkLabel: "로그인하기",
          linkHref: "/login",
        },
      }
    }
    return { error: { message: "잠시 후 다시 시도해주세요." } }
  }

  redirect("/")
}
