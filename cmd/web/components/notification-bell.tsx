"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
    id: string
    title: string
    description: string
    time: string
    read: boolean
}

export function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "1",
            title: "Kubernetes Cluster Ready",
            description: "Your new cluster 'dev-cluster' is now ready to use",
            time: "2 minutes ago",
            read: false,
        },
        {
            id: "2",
            title: "Container Deployed",
            description: "Container 'web-app:latest' has been deployed successfully",
            time: "1 hour ago",
            read: false,
        },
        {
            id: "3",
            title: "System Alert",
            description: "High CPU usage detected on node 'worker-2'",
            time: "3 hours ago",
            read: true,
        },
    ])

    const unreadCount = notifications.filter((n) => !n.read).length

    const markAsRead = (id: string) => {
        setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
    }

    const markAllAsRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, read: true })))
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-[10px] font-medium text-white">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between border-b border-border p-3">
                    <h4 className="font-medium">Notifications</h4>
                    {unreadCount > 0 && (
                        <Button variant="ghost" size="sm" className="h-auto text-xs px-2 py-1" onClick={markAllAsRead}>
                            Mark all as read
                        </Button>
                    )}
                </div>
                <ScrollArea className="h-[300px]">
                    {notifications.length > 0 ? (
                        <div className="grid gap-1 p-1">
                            {notifications.map((notification) => (
                                <button
                                    key={notification.id}
                                    className={`flex flex-col gap-1 rounded-lg p-3 text-left text-sm transition-colors hover:bg-accent ${!notification.read ? "bg-accent/50" : ""
                                        }`}
                                    onClick={() => markAsRead(notification.id)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium">{notification.title}</div>
                                        <div className="text-xs text-muted-foreground">{notification.time}</div>
                                    </div>
                                    <div className="text-xs text-muted-foreground">{notification.description}</div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-muted-foreground">No new notifications</div>
                    )}
                </ScrollArea>
            </PopoverContent>
        </Popover>
    )
}

