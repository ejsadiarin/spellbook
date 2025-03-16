import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface RecentActivityProps {
    className?: string
}

export async function RecentActivity({ className }: RecentActivityProps) {
    // TODO: In a real app, you would fetch this data from your Go API
    // Example: const activities = await fetch('/api/activities').then(res => res.json())

    const activities = [
        {
            user: {
                name: "Alex Johnson",
                avatar: "/placeholder.svg?height=32&width=32",
                initials: "AJ",
            },
            action: "deployed",
            target: "api-service",
            time: "2 minutes ago",
        },
        {
            user: {
                name: "Sarah Chen",
                avatar: "/placeholder.svg?height=32&width=32",
                initials: "SC",
            },
            action: "created",
            target: "new-project",
            time: "1 hour ago",
        },
        {
            user: {
                name: "Miguel Rodriguez",
                avatar: "/placeholder.svg?height=32&width=32",
                initials: "MR",
            },
            action: "updated",
            target: "auth-service",
            time: "3 hours ago",
        },
        {
            user: {
                name: "Emma Wilson",
                avatar: "/placeholder.svg?height=32&width=32",
                initials: "EW",
            },
            action: "merged",
            target: "feature-branch",
            time: "5 hours ago",
        },
        {
            user: {
                name: "David Kim",
                avatar: "/placeholder.svg?height=32&width=32",
                initials: "DK",
            },
            action: "scaled",
            target: "web-service",
            time: "yesterday",
        },
    ]

    return (
        <Card className={cn("col-span-1", className)}>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                                <AvatarFallback>{activity.user.initials}</AvatarFallback>
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

