"use client"

import { useRouter } from "next/navigation"

export default function PremiumModal({
  onClose,
}: {
  onClose: () => void
}) {
  const router = useRouter()

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: 30,
          borderRadius: 16,
          width: 420,
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ fontSize: 22, marginBottom: 10 }}>
          🚀 Go Premium
        </h2>

        <p style={{ marginBottom: 15 }}>
          You’ve reached today’s free download limit.
        </p>

        <p style={{ fontSize: 14, color: "#555" }}>
          Upgrade to remove limits and enjoy faster, ad‑free downloads.
        </p>

        <ul
          style={{
            textAlign: "left",
            marginTop: 20,
            marginBottom: 20,
            lineHeight: "1.8",
          }}
        >
          <li>✅ Unlimited downloads</li>
          <li>✅ 1080p & Best Quality</li>
          <li>✅ Full Playlist Download</li>
          <li>✅ No Ads</li>
          <li>✅ Instant Processing</li>
        </ul>

        <button
          onClick={() => router.push("/pricing")}
          style={{
            width: "100%",
            padding: "12px 0",
            background: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 16,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Upgrade Now – 499 PKR/month
        </button>

        <button
          onClick={onClose}
          style={{
            marginTop: 15,
            background: "transparent",
            border: "none",
            color: "#666",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          Maybe Later
        </button>
      </div>
    </div>
  )
}