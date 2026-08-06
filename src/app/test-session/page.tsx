"use client"

import { useSession } from "next-auth/react"

export default function TestSession() {
  const { data, status } = useSession()

  if (status === "loading") {
    return <div style={{ padding: 40 }}>Loading...</div>
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Session Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}