"use client"

import type React from "react"

import { useState } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { MobileNav } from "@/components/mobile-nav"
import { cn } from "@/lib/utils"

interface DashboardShellProps {
    children: React.ReactNode
    className?: string
}

export function DashboardShell({ children, className }: DashboardShellProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="flex min-h-screen flex-col">
            <MobileNav isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <div className="flex flex-1">
                <DashboardNav isOpen={isSidebarOpen} />
                <main className={cn("flex-1 overflow-y-auto p-4 md:p-8", className)}>{children}</main>
            </div>
        </div>
    )
}

