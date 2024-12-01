import React from 'react'

export default function TestPage() {
  const val = !!process.env.HELLO_WORLD

  return (
    <div>
      <p>NEXT_PUBLIC_HELLO: {process.env.NEXT_PUBLIC_HELLO}</p>
      <p>NEXT_PUBLIC_WORLD: {process.env.NEXT_PUBLIC_WORLD}</p>
      <p>NEXT_PUBLIC_HELLO_WORLD: {process.env.NEXT_PUBLIC_HELLO_WORLD}</p>
      <p>HELLO_WORLD: {val ? 'true' : 'false'}</p>
    </div>
  )
}
