import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
        Validate Your Startup Idea with AI
      </h1>
      <p className="text-xl mb-8 max-w-2xl">
        Enter your startup idea, and our AI will analyze, validate, and generate a stunning pitch for you.
      </p>
      <Link
        href="/idea"
        className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold rounded-full bg-indigo-600 text-white transition duration-300 ease-out hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600"
      >
        Get Started
        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  )
}

