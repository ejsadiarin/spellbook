import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Code, Package, Server } from "lucide-react"

export async function StatsCards() {
    // TODO: In a real app, you would fetch this data from your Go API
    // Example: const data = await fetch('/api/stats').then(res => res.json())

    const stats = [
        {
            title: "Total Projects",
            value: "24",
            icon: Package,
        },
        {
            title: "Active Services",
            value: "42",
            icon: Server,
        },
        {
            title: "Deployments Today",
            value: "18",
            icon: Code,
        },
        {
            title: "System Health",
            value: "99.9%",
            icon: Activity,
        },
    ]

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

