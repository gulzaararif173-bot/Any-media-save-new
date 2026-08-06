"use client";

import { useState } from "react";

export default function SignupPage() {
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setMessage(JSON.stringify(data));
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input name="name" placeholder="Name" /><br /><br />
        <input name="email" placeholder="Email" /><br /><br />
        <input name="password" type="password" placeholder="Password" /><br /><br />
        <button type="submit">Signup</button>
      </form>

      <p>{message}</p>
    </div>
  );
}