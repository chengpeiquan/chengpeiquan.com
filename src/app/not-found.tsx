// https://github.com/vercel/next.js/issues/65447
import React from 'react'

export const dynamic = 'force-dynamic'

export default function NotFound({ children }: React.PropsWithChildren) {
  return <>{children}</>
}
