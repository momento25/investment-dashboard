import { SignupForm } from "./signup-form"

export const metadata = {
  title: "회원가입 · 투자 대시보드",
}

export default function SignupPage() {
  return (
    <main className="min-h-svh flex items-center justify-center bg-background p-4">
      <SignupForm />
    </main>
  )
}
