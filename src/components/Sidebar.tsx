"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Lightbulb, PieChart, Users } from "lucide-react"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Idea Input", href: "/idea", icon: Lightbulb },
  { name: "Dashboard", href: "/dashboard", icon: PieChart },
  { name: "Investors", href: "/investors", icon: Users },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="w-64 bg-white bg-opacity-20 backdrop-blur-lg rounded-r-3xl p-6 space-y-8">
      <div className="text-2xl font-bold text-indigo-600">AI Startup Validator</div>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                pathname === item.href ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

