import React from 'react'

interface SearchHighlightPart {
  isHighlighted: boolean
  text: string
}

const MARK_RE = /<mark>(.*?)<\/mark>/giu

const escapeRegExp = (value: string) => {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')
}

const toMarkedParts = (value: string): SearchHighlightPart[] => {
  const parts: SearchHighlightPart[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = MARK_RE.exec(value))) {
    const [raw, text] = match
    const index = match.index

    if (index > lastIndex) {
      parts.push({
        text: value.slice(lastIndex, index),
        isHighlighted: false,
      })
    }

    parts.push({
      text,
      isHighlighted: true,
    })

    lastIndex = index + raw.length
  }

  if (lastIndex < value.length) {
    parts.push({
      text: value.slice(lastIndex),
      isHighlighted: false,
    })
  }

  return parts
}

const toKeywordParts = (
  value: string,
  keyword: string,
): SearchHighlightPart[] => {
  const normalizedKeyword = keyword.trim()
  if (!normalizedKeyword) return [{ text: value, isHighlighted: false }]

  const keywordRe = new RegExp(`(${escapeRegExp(normalizedKeyword)})`, 'giu')
  const fragments = value.split(keywordRe).filter(Boolean)

  return fragments.map((text) => ({
    text,
    isHighlighted: text.toLowerCase() === normalizedKeyword.toLowerCase(),
  }))
}

export const toSearchHighlightParts = (
  value: string,
  keyword: string,
): SearchHighlightPart[] => {
  if (MARK_RE.test(value)) {
    MARK_RE.lastIndex = 0
    return toMarkedParts(value)
  }

  return toKeywordParts(value, keyword)
}

export const SearchHighlight: React.FC<{
  keyword: string
  value: string
}> = ({ keyword, value }) => {
  return (
    <>
      {toSearchHighlightParts(value, keyword).map(
        ({ text, isHighlighted }, index) =>
          isHighlighted ? (
            <mark
              key={`${index}-${text}`}
              className="bg-yellow-300 px-0.5 text-gray-950"
            >
              {text}
            </mark>
          ) : (
            <React.Fragment key={`${index}-${text}`}>{text}</React.Fragment>
          ),
      )}
    </>
  )
}
