"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sparkles, Wand2 } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // In a real app, you would validate credentials with your Go backend
        setTimeout(() => {
            router.push("/dashboard")
            setIsLoading(false)
        }, 1000)
    }

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse-glow" />
                <div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse-glow"
                    style={{ animationDelay: "1s" }}
                />
            </div>

            <div className="absolute top-4 right-4 z-10">
                <ThemeToggle />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <Wand2 className="h-12 w-12 text-purple-500" />
                            <Sparkles className="h-6 w-6 text-blue-400 absolute -top-2 -right-2 animate-pulse-glow" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold font-heading tracking-tight mb-1 text-white neon-glow">Spellbook</h1>
                    <p className="text-muted-foreground">Your personal developer platform</p>
                </div>

                <div className="futuristic-panel p-6 backdrop-blur-lg">
                    <h2 className="text-xl font-semibold mb-4 text-center">Sign In</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                autoComplete="email"
                                required
                                className="futuristic-input"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Password
                                </Label>
                                <Link href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="futuristic-input"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                            Contact admin
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

