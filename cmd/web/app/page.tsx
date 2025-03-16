"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // TODO: In a real app, you would validate credentials with your Go backend
        // For now, we'll just redirect to the dashboard
        setTimeout(() => {
            router.push("/dashboard")
            setIsLoading(false)
        }, 1000)
    }

    return (
        <ThemeProvider defaultTheme="dark">
            <div className="flex min-h-screen flex-col items-center justify-center p-4">
                <div className="absolute top-4 right-4">
                    <ThemeToggle />
                </div>
                <div className="w-full max-w-md">
                    <Card>
                        <CardHeader className="space-y-1">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
                            </div>
                            <CardDescription>Enter your credentials to access the platform</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="name@example.com" autoComplete="email" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password">Password</Label>
                                            <Link href="#" className="text-sm text-primary underline-offset-4 hover:underline">
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <Input id="password" type="password" autoComplete="current-password" required />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading ? "Signing in..." : "Sign in"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <div className="text-sm text-muted-foreground mt-2">
                                Don&apos;t have an account?{" "}
                                <Link href="#" className="text-primary underline-offset-4 hover:underline">
                                    Sign up
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </ThemeProvider>
    )
}

