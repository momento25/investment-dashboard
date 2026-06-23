import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

const AUTH_ONLY_PATHS = new Set([
  "/login",
  "/signup",
  "/reset-password",
])

const PUBLIC_PATHS = new Set([
  "/login",
  "/signup",
  "/reset-password",
  "/reset-password/new",
  "/auth/callback",
])

function isPublic(pathname: string) {
  if (PUBLIC_PATHS.has(pathname)) return true
  if (pathname.startsWith("/auth/callback/")) return true
  if (pathname.startsWith("/reset-password/")) return true
  return false
}

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)
  const { pathname } = request.nextUrl

  // 로그인한 사용자가 가입/로그인/비번재설정-요청 페이지에 접근 → 대시보드로
  if (user && AUTH_ONLY_PATHS.has(pathname)) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // 비로그인 사용자가 보호 페이지에 접근 → 로그인으로
  if (!user && !isPublic(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    // API, Next 정적 자원, 이미지 파일 제외
    "/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|svg|ico|webp)$).*)",
  ],
}
