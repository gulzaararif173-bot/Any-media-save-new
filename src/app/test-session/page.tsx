"use client"

import { useSession } from "next-auth/react"

export default function TestSession() {
  const { data } = useSession()

  return (
    <div style={{ padding: 20 }}>
      <h2>Session Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}