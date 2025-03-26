"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Server, Laptop, CheckSquare, LayoutGrid } from "lucide-react"
import { useRouter } from "next/navigation"

export function QuickActions() {
    const router = useRouter()

    const actions = [
        {
            title: "Create Kubernetes Cluster",
            description: "Deploy a new Kubernetes cluster",
            icon: Server,
            href: "/dashboard/kubernetes/create",
            color: "from-blue-600 to-indigo-600",
        },
        {
            title: "Launch Docker Container",
            description: "Start a new Docker container",
            icon: Laptop,
            href: "/dashboard/docker/create",
            color: "from-cyan-600 to-blue-600",
        },
        {
            title: "Add Task",
            description: "Create a new task or todo item",
            icon: CheckSquare,
            href: "/dashboard/tasks/create",
            color: "from-green-600 to-emerald-600",
        },
        {
            title: "View Kanban Board",
            description: "Manage your tasks visually",
            icon: LayoutGrid,
            href: "/dashboard/kanban",
            color: "from-purple-600 to-pink-600",
        },
    ]

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Quick Actions</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {actions.map((action, index) => (
                    <Card key={index} className="futuristic-card overflow-hidden">
                        <div className={`h-1 w-full bg-gradient-to-r ${action.color}`} />
                        <CardHeader className="pb-2">
                            <CardTitle className="text-md flex items-center gap-2">
                                <action.icon className="h-5 w-5" />
                                {action.title}
                            </CardTitle>
                            <CardDescription className="text-xs">{action.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                className={`w-full bg-gradient-to-r ${action.color} hover:opacity-90`}
                                onClick={() => router.push(action.href)}
                            >
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Start
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

