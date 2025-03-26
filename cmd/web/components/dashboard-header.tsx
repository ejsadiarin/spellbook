import type React from "react"
import { ThemeToggle } from "@/components/theme-toggle"

interface DashboardHeaderProps {
    heading: string
    text?: string
    children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
    return (
        <div className="flex flex-col gap-1 pb-4 md:flex-row md:items-center md:justify-between">
            <div className="grid gap-1">
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl font-heading">{heading}</h1>
                {text && <p className="text-muted-foreground">{text}</p>}
            </div>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
                {children}
                <ThemeToggle />
            </div>
        </div>
    )
}

