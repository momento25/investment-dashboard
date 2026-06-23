import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

/**
 * 미들웨어에서 사용하는 세션 갱신 헬퍼.
 * 모든 요청마다 호출되어 (1) 만료 직전 세션을 갱신하고 (2) 현재 user를 반환한다.
 * Phase 3에서 만들 루트 middleware.ts가 이 함수를 사용해 라우트 보호를 한다.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // getUser()를 호출하면 만료 직전 세션이 자동 갱신된다.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return { supabaseResponse, user }
}
