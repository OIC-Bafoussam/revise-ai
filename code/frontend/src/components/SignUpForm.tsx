"use client"

import { useState } from "react"

export default function SignUpForm() {
  const [ Name ,SetName]= useState ("")
  const[Prenom ,SetPrenom]=useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Ici tu peux enregistrer l'utilisateur en DB via Prisma ou API
    console.log("Register:", Name,Prenom ,email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
       <input
        type="Name"
        placeholder="Name"
        className="w-full border px-3 py-2 rounded-lg"
        value={email}
        onChange={(e) => SetName(e.target.value)}
      />
       <input
        type="prenom"
        placeholder="prenom"
        className="w-full border px-3 py-2 rounded-lg"
        value={email}
        onChange={(e) => SetPrenom(e.target.value)}
      />
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
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg">
        s'inscrir
      </button>
    </form>
  )
}
