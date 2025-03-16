"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Boxes, CircleUser, Cog, Home, LayoutDashboard, Package, Server } from "lucide-react"

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
            title: "Projects",
            href: "/dashboard/projects",
            icon: Package,
        },
        {
            title: "Services",
            href: "/dashboard/services",
            icon: Server,
        },
        {
            title: "Resources",
            href: "/dashboard/resources",
            icon: Boxes,
        },
        {
            title: "Analytics",
            href: "/dashboard/analytics",
            icon: BarChart3,
        },
        {
            title: "Team",
            href: "/dashboard/team",
            icon: CircleUser,
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
                "fixed left-0 top-0 z-20 h-full w-64 -translate-x-full transform border-r bg-background p-4 transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
                isOpen && "translate-x-0",
            )}
        >
            <div className="mb-8 flex items-center space-x-2 px-2">
                <Home className="h-6 w-6" />
                <span className="text-lg font-bold">Spellbook</span>
            </div>
            <div className="space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                            pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                        )}
                    >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                    </Link>
                ))}
            </div>
        </nav>
    )
}

