"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export type NewPasswordState = {
  error: { message: string } | null
} | null

export async function updatePassword(
  _prev: NewPasswordState,
  formData: FormData,
): Promise<NewPasswordState> {
  const password = String(formData.get("password") ?? "")

  if (password.length < 8 || password.length > 72) {
    return { error: { message: "비밀번호는 8자 이상 72자 이하여야 합니다" } }
  }

  const supabase = await createClient()

  // 진입 시점에 recovery 세션이 있어야 한다. 없으면 invalid-token 상태.
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: { message: "세션이 만료되었습니다. 다시 시도해주세요." } }
  }

  const { error } = await supabase.auth.updateUser({ password })
  if (error) {
    return { error: { message: "잠시 후 다시 시도해주세요." } }
  }

  redirect("/")
}
