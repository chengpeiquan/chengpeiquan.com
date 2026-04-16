'use client'

import { clipboard } from '@bassist/utils'
import { Button, cn } from 'blackwork'
import { Check, type IconProps } from 'blackwork/icons'
import { useTranslations } from 'next-intl'
import React from 'react'

const LANGUAGE_LABELS: Record<string, string> = {
  bash: 'Bash',
  css: 'CSS',
  html: 'HTML',
  javascript: 'JavaScript',
  js: 'JavaScript',
  json: 'JSON',
  jsx: 'JSX',
  md: 'Markdown',
  markdown: 'Markdown',
  shell: 'Shell',
  sh: 'Shell',
  ts: 'TypeScript',
  tsx: 'TSX',
  typescript: 'TypeScript',
  vue: 'Vue',
  xml: 'XML',
  yaml: 'YAML',
  yml: 'YAML',
}

const WRAPPED_LANGUAGES = new Set([
  '',
  'md',
  'markdown',
  'text',
  'plaintext',
  'txt',
])

const CopyIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
)

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  fileName?: string
  language?: string
  rawCode?: string
}

export const CodeBlock: React.FC<React.PropsWithChildren<CodeBlockProps>> = ({
  fileName = '',
  language = '',
  rawCode = '',
  className,
  children,
  ...rest
}) => {
  const t = useTranslations('basicConfig.codeBlock')
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const onCopy = async () => {
    if (!rawCode) return

    const success = await clipboard.write(rawCode)
    if (!success) return

    setCopied(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setCopied(false)
    }, 1600)
  }

  const normalizedLanguage = language.trim().toLowerCase()
  const shouldWrap = WRAPPED_LANGUAGES.has(normalizedLanguage)
  const languageLabel =
    (LANGUAGE_LABELS[normalizedLanguage] ?? language) || 'Text'
  const label = copied ? t('copied') : t('copy')
  const Icon = copied ? Check : CopyIcon

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-border bg-card shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="min-w-0 flex-1">
          {fileName && (
            <span className="block truncate font-mono text-[13px] text-foreground/80 dark:text-zinc-300">
              {fileName}
            </span>
          )}
        </div>

        <span className="shrink-0 font-mono text-[10px] text-muted-foreground/80 dark:text-zinc-500">
          {languageLabel}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={label}
          disabled={!rawCode}
          onClick={onCopy}
          className={cn(
            'size-8 rounded-md border border-border bg-background text-muted-foreground',
            'transition-colors hover:bg-accent hover:text-foreground',
            'dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        >
          <Icon className="size-4" />
          <span className="sr-only">{label}</span>
        </Button>
      </div>

      <pre
        {...rest}
        className={cn(
          'm-0 border-0 bg-transparent p-4 text-[13px] leading-6',
          shouldWrap
            ? 'overflow-x-hidden whitespace-pre-wrap break-words [&_code]:whitespace-pre-wrap [&_code]:break-words'
            : 'overflow-x-auto',
          'rounded-none',
          className,
        )}
      >
        {children}
      </pre>
    </div>
  )
}
