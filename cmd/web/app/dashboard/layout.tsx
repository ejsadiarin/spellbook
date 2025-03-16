import { ThemeProvider } from "@/components/theme-provider"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ThemeProvider defaultTheme="dark">
            {children}
        </ThemeProvider>
    )
}
