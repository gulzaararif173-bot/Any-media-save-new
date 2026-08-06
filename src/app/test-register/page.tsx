"use client"

import { useState } from "react"

export default function TestRegister() {
  const [result, setResult] = useState<any>(null)

  const handleRegister = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@example.com",
        password: "123456",
      }),
    })

    const data = await res.json()
    setResult(data)
  }

  return (
    <div style={{ padding: 40 }}>
      <button onClick={handleRegister}>
        Test Register
      </button>

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  )
}