"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface MobileNavProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

export function MobileNav({ isOpen, setIsOpen }: MobileNavProps) {
    return (
        <div className="flex items-center justify-between border-b p-4 md:hidden">
            <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">Spellbook</span>
            </div>
            <div className="flex items-center space-x-2">
                <ThemeToggle />
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>
        </div>
    )
}

