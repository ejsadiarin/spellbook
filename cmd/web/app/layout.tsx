import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] })

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Spellbook IDP",
    description: "Dashboard for Spellbook",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                {/* <body */}
                {/*     className={`${geistSans.variable} ${geistMono.variable} antialiased`} */}
                {/* > */}
                <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
            </body>
        </html>
    );
}
