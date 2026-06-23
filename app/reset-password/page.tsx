import { ResetPasswordForm } from "./reset-password-form"

export const metadata = {
  title: "비밀번호 재설정 · 투자 대시보드",
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-svh flex items-center justify-center bg-background p-4">
      <ResetPasswordForm />
    </main>
  )
}
