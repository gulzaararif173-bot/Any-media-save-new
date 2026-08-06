"use client";

import { useEffect, useState } from "react";

function useTheme() {
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    setResolvedTheme(prefersDark ? "dark" : "light");
  }, []);

  return { resolvedTheme };
}

function Toaster(_props: Record<string, any>) {
  return null;
}

export function ToastProvider() {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  return (
    <Toaster
      position="top-right"
      gutter={8}
      containerStyle={{ top: 72 }}
      toastOptions={{
        duration: 4000,
        style: {
          background: dark ? "#1e293b" : "#ffffff",
          color: dark ? "#f1f5f9" : "#0f172a",
          border: dark ? "1px solid #334155" : "1px solid #e2e8f0",
          borderRadius: "0.75rem",
          padding: "0.75rem 1rem",
          fontSize: "0.875rem",
          fontWeight: "500",
          maxWidth: "380px",
          boxShadow: dark
            ? "0 10px 40px rgba(0,0,0,0.4)"
            : "0 10px 40px rgba(0,0,0,0.08)",
        },
        success: { iconTheme: { primary: "#22c55e", secondary: "#fff" } },
        error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        loading: { iconTheme: { primary: "#3b82f6", secondary: "#fff" } },
      }}
    />
  );
}
