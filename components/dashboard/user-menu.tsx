import Link from "next/link"
import { logout } from "@/app/auth/actions"

export function UserMenu({ email }: { email: string }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <Link
        href="/mypage"
        className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      >
        마이페이지
      </Link>
      <span className="hidden text-white/60 sm:inline" title={email}>
        {email}
      </span>
      <form action={logout}>
        <button
          type="submit"
          className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          로그아웃
        </button>
      </form>
    </div>
  )
}
