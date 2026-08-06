"use client"

import { useRouter } from "next/navigation"

export default function PricingPage() {
  const router = useRouter()

  return (
    <div style={{ padding: 50, maxWidth: 600, margin: "auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>
        🚀 Upgrade to Premium
      </h1>

      <div
        style={{
          border: "1px solid #ddd",
          padding: 30,
          borderRadius: 12,
        }}
      >
        <h2>Premium Plan</h2>

        <h3 style={{ marginTop: 10 }}>499 PKR / month</h3>

        <ul style={{ marginTop: 20 }}>
          <li>✅ Unlimited downloads</li>
          <li>✅ 1080p & Best Quality</li>
          <li>✅ Playlist Download</li>
          <li>✅ No Ads</li>
          <li>✅ Instant Processing</li>
        </ul>

        <button
          style={{
            marginTop: 25,
            padding: "10px 20px",
            background: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
          onClick={() => {
            alert("Stripe integration next step")
          }}
        >
          Upgrade Now
        </button>
      </div>
    </div>
  )
}