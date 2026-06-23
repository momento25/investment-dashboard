import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * OAuth(구글) 로그인과 비밀번호 재설정 메일 링크의 공통 콜백 라우트.
 *
 * 호출 케이스:
 * 1) Google OAuth 동의 후 Supabase가 ?code=...로 호출 → 코드를 세션으로 교환
 * 2) 비밀번호 재설정 메일의 링크 클릭 시 ?code=... + ?next=/reset-password/new
 *
 * 성공 시 ?next 파라미터 경로(없으면 /)로 리다이렉트.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"

  // OAuth 거부/실패는 Supabase가 error 파라미터를 붙여 콜백한다.
  const oauthError = searchParams.get("error")
  if (oauthError) {
    const redirectUrl = new URL("/login", origin)
    redirectUrl.searchParams.set("oauth_error", "1")
    return NextResponse.redirect(redirectUrl)
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(new URL(next, origin))
    }
  }

  // code가 없거나 교환 실패한 경우
  const fallback = new URL("/login", origin)
  fallback.searchParams.set("oauth_error", "1")
  return NextResponse.redirect(fallback)
}
