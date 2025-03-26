import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Laptop, PlusCircle, Play, Square, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function DockerPage() {
    // In a real app, you would fetch this data from your Go API
    const containers = [
        {
            id: "c1",
            name: "web-app",
            image: "nginx:latest",
            status: "running",
            ports: "80:80",
            created: "1 day ago",
        },
        {
            id: "c2",
            name: "database",
            image: "postgres:14",
            status: "running",
            ports: "5432:5432",
            created: "1 day ago",
        },
        {
            id: "c3",
            name: "cache",
            image: "redis:alpine",
            status: "stopped",
            ports: "6379:6379",
            created: "2 days ago",
        },
    ]

    return (
        <div className="space-y-8">
            <DashboardHeader heading="Docker" text="Manage your Docker containers.">
                <Button asChild>
                    <Link href="/dashboard/docker/create">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Container
                    </Link>
                </Button>
            </DashboardHeader>

            <div className="space-y-4">
                {containers.map((container) => (
                    <Card key={container.id} className="futuristic-card">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Laptop className="h-5 w-5 text-blue-400" />
                                    {container.name}
                                </CardTitle>
                                <Badge
                                    variant="outline"
                                    className={
                                        container.status === "running"
                                            ? "border-green-500 text-green-500"
                                            : "border-yellow-500 text-yellow-500"
                                    }
                                >
                                    {container.status}
                                </Badge>
                            </div>
                            <CardDescription>
                                {container.image} • {container.ports}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Created {container.created}</div>
                                <div className="flex space-x-2">
                                    {container.status === "running" ? (
                                        <Button size="sm" variant="outline">
                                            <Square className="mr-2 h-3 w-3" />
                                            Stop
                                        </Button>
                                    ) : (
                                        <Button size="sm" variant="outline">
                                            <Play className="mr-2 h-3 w-3" />
                                            Start
                                        </Button>
                                    )}
                                    <Button size="sm" variant="outline">
                                        <RefreshCw className="mr-2 h-3 w-3" />
                                        Restart
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

