import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, CheckSquare, Database, Server } from "lucide-react"

export async function StatsCards() {
    // In a real app, you would fetch this data from your Go API

    const stats = [
        {
            title: "Active Clusters",
            value: "3",
            icon: Server,
            description: "Kubernetes clusters",
            change: "+1 from last week",
            changeType: "positive",
        },
        {
            title: "Running Containers",
            value: "12",
            icon: Database,
            description: "Docker containers",
            change: "-2 from yesterday",
            changeType: "negative",
        },
        {
            title: "System Health",
            value: "98.2%",
            icon: Activity,
            description: "Overall uptime",
            change: "+0.5% from last week",
            changeType: "positive",
        },
        {
            title: "Pending Tasks",
            value: "7",
            icon: CheckSquare,
            description: "Tasks to complete",
            change: "3 due today",
            changeType: "neutral",
        },
    ]

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card key={index} className="futuristic-card overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-purple-500/10 p-1 flex items-center justify-center">
                            <stat.icon className="h-5 w-5 text-purple-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                        <p
                            className={`text-xs mt-2 ${stat.changeType === "positive"
                                    ? "text-green-400"
                                    : stat.changeType === "negative"
                                        ? "text-red-400"
                                        : "text-blue-400"
                                }`}
                        >
                            {stat.change}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

