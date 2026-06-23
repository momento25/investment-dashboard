import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { MypageClient } from "./mypage-client"

export const metadata = {
  title: "마이페이지 · 투자 대시보드",
}

export default async function MyPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // middleware가 비로그인 진입을 막아주지만 타입 안전성 위해 처리
  if (!user) {
    return null
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("nickname, bio")
    .eq("id", user.id)
    .single()

  return (
    <main className="min-h-svh bg-background">
      <div className="mx-auto max-w-2xl px-5 py-10 md:px-8">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="font-display text-3xl font-bold text-white">마이페이지</h1>
          <Link
            href="/"
            className="text-sm text-white/60 underline-offset-4 hover:text-white hover:underline"
          >
            ← 대시보드로
          </Link>
        </header>

        <MypageClient
          initialNickname={profile?.nickname ?? null}
          initialBio={profile?.bio ?? null}
          email={user.email ?? ""}
        />
      </div>
    </main>
  )
}
