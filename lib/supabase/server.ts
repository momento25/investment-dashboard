import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * 서버(Server Components, Server Actions, Route Handlers)에서 사용하는 Supabase 클라이언트.
 * 요청별 쿠키를 읽어 세션을 인식한다.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // Server Component에서 호출된 경우 set이 막혀 있을 수 있다.
            // 그럴 때는 미들웨어가 세션을 갱신해주므로 무시한다.
          }
        },
      },
    },
  )
}
