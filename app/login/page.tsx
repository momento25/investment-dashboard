import { LoginForm } from "./login-form"

export const metadata = {
  title: "로그인 · 투자 대시보드",
}

export default function LoginPage() {
  return (
    <main className="min-h-svh flex items-center justify-center bg-background p-4">
      <LoginForm />
    </main>
  )
}
