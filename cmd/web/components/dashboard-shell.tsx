"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { MobileNav } from "@/components/mobile-nav"
import { cn } from "@/lib/utils"
import { CommandMenu } from "@/components/command-menu"

interface DashboardShellProps {
    children: React.ReactNode
    className?: string
}

export function DashboardShell({ children, className }: DashboardShellProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <CommandMenu />
            <MobileNav isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <div className="flex flex-1">
                <DashboardNav isOpen={isSidebarOpen} />
                <main className={cn("flex-1 overflow-y-auto transition-all duration-300", className)}>
                    <div className="container mx-auto p-4 md:p-8 max-w-7xl">{children}</div>
                </main>
            </div>
        </div>
    )
}

