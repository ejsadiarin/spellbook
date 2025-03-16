import type React from "react"
import { ThemeToggle } from "@/components/theme-toggle"

interface DashboardHeaderProps {
    heading: string
    text?: string
    children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
    return (
        <div className="flex items-center justify-between px-2">
            <div className="grid gap-1">
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{heading}</h1>
                {text && <p className="text-muted-foreground">{text}</p>}
            </div>
            <div className="flex items-center space-x-2">
                <ThemeToggle />
                {children}
            </div>
        </div>
    )
}

