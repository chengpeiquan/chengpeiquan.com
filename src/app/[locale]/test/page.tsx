import React from 'react'

export default function TestPage() {
  return (
    <div>
      <p>NEXT_PUBLIC_HELLO: {process.env.NEXT_PUBLIC_HELLO}</p>
      <p>NEXT_PUBLIC_WORLD: {process.env.NEXT_PUBLIC_WORLD}</p>
      <p>NEXT_PUBLIC_HELLO_WORLD: {process.env.NEXT_PUBLIC_HELLO_WORLD}</p>
      <p>__HELLO_WORLD: {process.env.HELLO_WORLD}</p>
    </div>
  )
}
