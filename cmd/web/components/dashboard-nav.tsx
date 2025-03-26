"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    BarChart3,
    Bell,
    CheckSquare,
    CircleUser,
    Cog,
    Laptop,
    LayoutDashboard,
    LayoutGrid,
    Server,
    Sparkles,
    Wand2,
} from "lucide-react"

interface DashboardNavProps {
    isOpen: boolean
}

export function DashboardNav({ isOpen }: DashboardNavProps) {
    const pathname = usePathname()

    const navItems = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Kubernetes",
            href: "/dashboard/kubernetes",
            icon: Server,
        },
        {
            title: "Docker",
            href: "/dashboard/docker",
            icon: Laptop,
        },
        {
            title: "Tasks",
            href: "/dashboard/tasks",
            icon: CheckSquare,
        },
        {
            title: "Kanban",
            href: "/dashboard/kanban",
            icon: LayoutGrid,
        },
        {
            title: "Monitoring",
            href: "/dashboard/monitoring",
            icon: BarChart3,
        },
        {
            title: "Notifications",
            href: "/dashboard/notifications",
            icon: Bell,
        },
        {
            title: "Settings",
            href: "/dashboard/settings",
            icon: Cog,
        },
    ]

    return (
        <nav
            className={cn(
                "fixed left-0 top-0 z-20 h-full w-64 -translate-x-full transform border-r border-white/10 bg-black/40 backdrop-blur-xl p-4 transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
                isOpen && "translate-x-0",
            )}
        >
            <div className="mb-8 flex items-center space-x-2 px-2">
                <Link href="/dashboard" className="flex items-center space-x-2">
                    <div className="relative">
                        <Wand2 className="h-6 w-6 text-purple-500" />
                        <Sparkles className="h-3 w-3 text-blue-400 absolute -top-1 -right-1 animate-pulse-glow" />
                    </div>
                    <span className="text-lg font-bold font-heading">Spellbook</span>
                </Link>
            </div>
            <div className="space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10",
                            pathname === item.href
                                ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white"
                                : "text-muted-foreground",
                        )}
                    >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                    </Link>
                ))}
            </div>

            <div className="absolute bottom-4 left-0 right-0 px-4">
                <div className="flex items-center space-x-3 rounded-md bg-white/5 p-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-700/20">
                        <CircleUser className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-sm font-medium">Admin User</p>
                        <p className="text-xs text-muted-foreground">admin@example.com</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}

