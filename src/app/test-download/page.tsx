"use client"

import { useState } from "react"
import PremiumModal from "@/components/PremiumModal"

export default function TestDownloadPage() {
  const [result, setResult] = useState("")
  const [showPremium, setShowPremium] = useState(false)

  const handleDownload = async () => {
    setResult("")

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        }),
      })

      if (res.status === 403) {
        setShowPremium(true)
        return
      }

      if (!res.ok) {
  const errorText = await res.text()
  setResult("ERROR STATUS: " + res.status + " | " + errorText)
  return
}

      const data = await res.json()
      setResult(data.message)

    } catch (err: any) {
      setResult("ERROR: " + err.message)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Test Download</h1>

      <button onClick={handleDownload}>
        Test Download
      </button>

      {result && (
        <p style={{ color: "green", marginTop: 20 }}>
          ✅ {result}
        </p>
      )}

      {showPremium && (
        <PremiumModal onClose={() => setShowPremium(false)} />
      )}
    </div>
  )
}