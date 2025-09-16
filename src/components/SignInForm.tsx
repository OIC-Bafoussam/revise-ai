"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import "@/app/page"

export default function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [ confirmationPassword , setConformationPassword]=useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn("credentials", { email, password,setConformationPassword, redirect: true, callbackUrl: "/" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full border px-3 py-2 rounded-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border px-3 py-2 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
<input
        type="confirmationPassword"
        placeholder="confirmationPassword"
        className="w-full border px-3 py-2 rounded-lg"
        value={confirmationPassword}
        onChange={(e) => setConformationPassword(e.target.value)}
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
        Sign In
      </button>
    </form>
  )
}
