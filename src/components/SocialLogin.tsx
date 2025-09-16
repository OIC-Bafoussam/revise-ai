"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => signIn("google")}
        
        className="flex items-center justify-center gap-2 border p-2 rounded-lg hover:bg-gray-100"
      >
        <FcGoogle size={20} /> Continuer avec Google
      </button>

      <button
        onClick={() => signIn("facebook")}
        className="flex items-center justify-center gap-2 border p-2 rounded-lg hover:bg-gray-100"
      >
        <FaFacebook size={20} className="text-blue-600" /> Continuer avec Facebook
      </button>

      <button
        onClick={() => signIn("github")}
        className="flex items-center justify-center gap-2 border p-2 rounded-lg hover:bg-gray-100"
      >
        <FaGithub size={20} /> Continuer avec GitHub
      </button>
    </div>
  );
}
