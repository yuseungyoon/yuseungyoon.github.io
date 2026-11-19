import { useEffect, useRef, useState } from 'react'
import * as css from './Code.css'
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons'
import { color } from 'styles/vars/color.css'

export function CopyBtn({ codeText }: { codeText: string }) {
  const [isCopied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(codeText)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1000)
    } catch {
      setCopied(false)
    }
  }
  return (
    <button type="button" className={css.copyCode} onClick={copy} aria-label="코드 복사">
      {isCopied ? <CheckIcon color={color.ok} /> : <CopyIcon />}
    </button>
  )
}
