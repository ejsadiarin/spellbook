import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space",
})

export const metadata: Metadata = {
    title: "Spellbook - Developer Platform",
    description: "Your personal internal developer platform",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
                <ThemeProvider defaultTheme="dark" storageKey="spellbook-theme">
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}

