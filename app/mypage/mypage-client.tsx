"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { updateBio, updateNickname } from "./actions"

const NICKNAME_MAX = 20
const BIO_MAX = 200

type Props = {
  initialNickname: string | null
  initialBio: string | null
  email: string
}

export function MypageClient({ initialNickname, initialBio, email }: Props) {
  const [nickname, setNickname] = useState<string | null>(initialNickname)
  const [bio, setBio] = useState<string | null>(initialBio)

  return (
    <div className="space-y-5">
      <p className="text-sm text-white/50">
        로그인 이메일: <span className="text-white/80">{email}</span>
      </p>

      <NicknameCard value={nickname} onSaved={setNickname} />
      <BioCard value={bio} onSaved={setBio} />
    </div>
  )
}

/* ============================ 닉네임 카드 ============================ */

function NicknameCard({
  value,
  onSaved,
}: {
  value: string | null
  onSaved: (next: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState("")
  const [fieldError, setFieldError] = useState<string | null>(null)
  const [topError, setTopError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function startEdit() {
    setDraft(value ?? "")
    setFieldError(null)
    setTopError(null)
    setEditing(true)
  }
  function cancel() {
    setEditing(false)
    setFieldError(null)
    setTopError(null)
  }
  function save() {
    setFieldError(null)
    setTopError(null)
    const trimmed = draft.trim()
    if (trimmed.length === 0) {
      setFieldError("닉네임을 입력해주세요")
      return
    }
    if (trimmed.length > NICKNAME_MAX) {
      setFieldError(`닉네임은 ${NICKNAME_MAX}자 이하여야 합니다`)
      return
    }
    startTransition(async () => {
      const result = await updateNickname(trimmed)
      if (!result.ok) {
        // 중복/길이 같은 필드 에러 vs 시스템 에러 구분
        if (
          result.message.includes("이미 사용") ||
          result.message.includes("이하") ||
          result.message.includes("입력")
        ) {
          setFieldError(result.message)
        } else {
          setTopError(result.message)
        }
        return
      }
      onSaved(trimmed)
      setEditing(false)
    })
  }

  return (
    <Card>
      <SectionLabel>닉네임</SectionLabel>

      {topError && <TopError>{topError}</TopError>}

      {editing ? (
        <div className="mt-3">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={NICKNAME_MAX + 5}
            placeholder="닉네임 (1~20자)"
            disabled={pending}
            autoFocus
            className="w-full rounded-lg border border-white/10 bg-zinc-800/60 px-3 py-2 text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/10 disabled:opacity-60"
          />
          {fieldError && <p className="mt-1 text-xs text-red-300">{fieldError}</p>}
          <div className="mt-3 flex gap-2">
            <Button type="button" onClick={save} disabled={pending}>
              {pending ? "저장 중..." : "저장"}
            </Button>
            <Button type="button" variant="outline" onClick={cancel} disabled={pending}>
              취소
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className={value ? "text-lg text-white" : "text-sm text-white/50"}>
            {value || "닉네임이 설정되지 않았습니다"}
          </p>
          <Button type="button" variant="outline" onClick={startEdit}>
            {value ? "수정" : "닉네임 추가"}
          </Button>
        </div>
      )}
    </Card>
  )
}

/* ============================ 자기소개 카드 ============================ */

function BioCard({
  value,
  onSaved,
}: {
  value: string | null
  onSaved: (next: string | null) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState("")
  const [fieldError, setFieldError] = useState<string | null>(null)
  const [topError, setTopError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function startEdit() {
    setDraft(value ?? "")
    setFieldError(null)
    setTopError(null)
    setEditing(true)
  }
  function cancel() {
    setEditing(false)
    setFieldError(null)
    setTopError(null)
  }
  function save() {
    setFieldError(null)
    setTopError(null)
    const trimmed = draft.trim()
    if (trimmed.length > BIO_MAX) {
      setFieldError(`자기소개는 ${BIO_MAX}자 이하여야 합니다`)
      return
    }
    const next = trimmed.length === 0 ? null : trimmed
    startTransition(async () => {
      const result = await updateBio(next)
      if (!result.ok) {
        if (result.message.includes("이하")) setFieldError(result.message)
        else setTopError(result.message)
        return
      }
      onSaved(next)
      setEditing(false)
    })
  }
  function remove() {
    if (!confirm("자기소개를 삭제할까요?")) return
    setFieldError(null)
    setTopError(null)
    startTransition(async () => {
      const result = await updateBio(null)
      if (!result.ok) {
        setTopError(result.message)
        return
      }
      onSaved(null)
    })
  }

  return (
    <Card>
      <SectionLabel>자기소개</SectionLabel>

      {topError && <TopError>{topError}</TopError>}

      {editing ? (
        <div className="mt-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={BIO_MAX + 20}
            rows={4}
            placeholder="자기소개 (최대 200자)"
            disabled={pending}
            autoFocus
            className="w-full resize-y rounded-lg border border-white/10 bg-zinc-800/60 px-3 py-2 text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/10 disabled:opacity-60"
          />
          <div className="mt-1 flex items-baseline justify-between">
            <p className="text-xs text-white/40">{draft.trim().length} / {BIO_MAX}</p>
            {fieldError && <p className="text-xs text-red-300">{fieldError}</p>}
          </div>
          <div className="mt-3 flex gap-2">
            <Button type="button" onClick={save} disabled={pending}>
              {pending ? "저장 중..." : "저장"}
            </Button>
            <Button type="button" variant="outline" onClick={cancel} disabled={pending}>
              취소
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-3">
          {value ? (
            <p className="whitespace-pre-wrap text-white/90">{value}</p>
          ) : (
            <p className="text-sm text-white/50">자기소개가 없습니다</p>
          )}
          <div className="mt-4 flex gap-2">
            <Button type="button" variant="outline" onClick={startEdit} disabled={pending}>
              {value ? "수정" : "자기소개 추가"}
            </Button>
            {value && (
              <Button type="button" variant="outline" onClick={remove} disabled={pending}>
                삭제
              </Button>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}

/* ============================ 공통 ============================ */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 shadow-xl backdrop-blur">
      {children}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
      {children}
    </p>
  )
}

function TopError({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="alert"
      className="mt-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200"
    >
      {children}
    </div>
  )
}
