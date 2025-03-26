import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Activity } from "lucide-react"

interface RecentActivityProps {
    className?: string
}

export async function RecentActivity({ className }: RecentActivityProps) {
    // In a real app, you would fetch this data from your Go API

    const activities = [
        {
            user: {
                name: "You",
                avatar: "/placeholder.svg?height=32&width=32",
                initials: "YO",
            },
            action: "deployed",
            target: "api-service",
            time: "2 minutes ago",
        },
        {
            user: {
                name: "System",
                avatar: "/placeholder.svg?height=32&width=32",
                initials: "SY",
            },
            action: "scaled",
            target: "web-cluster",
            time: "1 hour ago",
        },
        {
            user: {
                name: "You",
                avatar: "/placeholder.svg?height=32&width=32",
                initials: "YO",
            },
            action: "created",
            target: "new-task",
            time: "3 hours ago",
        },
        {
            user: {
                name: "System",
                avatar: "/placeholder.svg?height=32&width=32",
                initials: "SY",
            },
            action: "updated",
            target: "monitoring-config",
            time: "5 hours ago",
        },
        {
            user: {
                name: "You",
                avatar: "/placeholder.svg?height=32&width=32",
                initials: "YO",
            },
            action: "restarted",
            target: "database-container",
            time: "yesterday",
        },
    ]

    return (
        <Card className={cn("futuristic-card", className)}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-purple-400" />
                    Recent Activity
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <Avatar className="h-8 w-8 border border-white/10">
                                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                                <AvatarFallback className="bg-purple-900/50 text-purple-200">{activity.user.initials}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {activity.user.name}{" "}
                                    <span className="text-muted-foreground">
                                        {activity.action} {activity.target}
                                    </span>
                                </p>
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

