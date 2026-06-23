"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

const NICKNAME_MAX = 20
const BIO_MAX = 200

export type ActionResult = { ok: true } | { ok: false; message: string }

export async function updateNickname(input: string): Promise<ActionResult> {
  const trimmed = input.trim()
  if (trimmed.length === 0) {
    return { ok: false, message: "닉네임을 입력해주세요" }
  }
  if (trimmed.length > NICKNAME_MAX) {
    return { ok: false, message: `닉네임은 ${NICKNAME_MAX}자 이하여야 합니다` }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { ok: false, message: "로그인이 필요합니다" }
  }

  const { error } = await supabase
    .from("profiles")
    .update({ nickname: trimmed })
    .eq("id", user.id)

  if (error) {
    // PostgreSQL UNIQUE 위반
    if (error.code === "23505") {
      return { ok: false, message: "이미 사용 중인 닉네임입니다" }
    }
    return { ok: false, message: "잠시 후 다시 시도해주세요." }
  }

  // 마이페이지 + 대시보드(헤더 인사말)도 갱신
  revalidatePath("/mypage")
  revalidatePath("/")
  return { ok: true }
}

/**
 * bio = null 이면 삭제(NULL로 저장), 그 외 문자열은 trim 후 저장.
 * trim 결과가 빈 문자열이면 NULL 처리 (= 삭제와 동일).
 */
export async function updateBio(input: string | null): Promise<ActionResult> {
  let finalValue: string | null
  if (input === null) {
    finalValue = null
  } else {
    const trimmed = input.trim()
    if (trimmed.length > BIO_MAX) {
      return { ok: false, message: `자기소개는 ${BIO_MAX}자 이하여야 합니다` }
    }
    finalValue = trimmed.length === 0 ? null : trimmed
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { ok: false, message: "로그인이 필요합니다" }
  }

  const { error } = await supabase
    .from("profiles")
    .update({ bio: finalValue })
    .eq("id", user.id)

  if (error) {
    return { ok: false, message: "잠시 후 다시 시도해주세요." }
  }

  revalidatePath("/mypage")
  return { ok: true }
}
