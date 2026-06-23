import Link from "next/link"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { NewPasswordForm } from "./new-password-form"

export const metadata = {
  title: "새 비밀번호 설정 · 투자 대시보드",
}

export default async function NewPasswordPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // recovery 세션이 없으면 invalid-token 화면을 보여준다.
  if (!user) {
    return (
      <main className="min-h-svh flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-[400px] rounded-2xl border border-white/10 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur">
          <h1 className="font-display text-2xl font-bold text-white">
            링크가 만료되었습니다
          </h1>
          <p className="mt-3 text-sm text-white/70">
            재설정 링크는 메일 발송 후 1시간 동안만 유효합니다.
          </p>
          <Link href="/reset-password" className="mt-6 block">
            <Button type="button" className="w-full">
              다시 요청하기
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-svh flex items-center justify-center bg-background p-4">
      <NewPasswordForm />
    </main>
  )
}
