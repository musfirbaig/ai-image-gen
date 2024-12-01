'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Image, Clock} from 'lucide-react'

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Generate", href: "/generate", icon: Image },
  { name: "History", href: "/history", icon: Clock },
  // { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-800 transition-colors ${
              pathname === item.href ? "bg-gray-800" : ""
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

