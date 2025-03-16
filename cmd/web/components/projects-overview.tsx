"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface ProjectsOverviewProps {
    className?: string
}

interface Project {
    id: string
    name: string
    status: "healthy" | "warning" | "critical"
    environment: "production" | "staging" | "development"
    lastDeployed: string
}

export function ProjectsOverview({ className }: ProjectsOverviewProps) {
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // TODO: In a real app, you would fetch this data from your Go API
        // Example: fetch('/api/projects').then(res => res.json()).then(data => setProjects(data))

        // Simulating API call with timeout
        const timeout = setTimeout(() => {
            setProjects([
                {
                    id: "1",
                    name: "API Gateway",
                    status: "healthy",
                    environment: "production",
                    lastDeployed: "2 days ago",
                },
                {
                    id: "2",
                    name: "Auth Service",
                    status: "healthy",
                    environment: "production",
                    lastDeployed: "1 day ago",
                },
                {
                    id: "3",
                    name: "User Service",
                    status: "warning",
                    environment: "staging",
                    lastDeployed: "5 hours ago",
                },
                {
                    id: "4",
                    name: "Payment Service",
                    status: "critical",
                    environment: "development",
                    lastDeployed: "1 hour ago",
                },
                {
                    id: "5",
                    name: "Notification Service",
                    status: "healthy",
                    environment: "production",
                    lastDeployed: "3 days ago",
                },
            ])
            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timeout)
    }, [])

    const getStatusColor = (status: Project["status"]) => {
        switch (status) {
            case "healthy":
                return "bg-green-500"
            case "warning":
                return "bg-yellow-500"
            case "critical":
                return "bg-red-500"
            default:
                return "bg-gray-500"
        }
    }

    const getEnvironmentColor = (env: Project["environment"]) => {
        switch (env) {
            case "production":
                return "bg-blue-100 text-blue-800"
            case "staging":
                return "bg-purple-100 text-purple-800"
            case "development":
                return "bg-gray-100 text-gray-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <Card className={cn("col-span-1", className)}>
            <CardHeader>
                <CardTitle>Projects Overview</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-12 animate-pulse rounded-md bg-muted"></div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {projects.map((project) => (
                            <div key={project.id} className="flex items-center justify-between rounded-md border p-3">
                                <div className="flex items-center space-x-3">
                                    <div className={cn("h-3 w-3 rounded-full", getStatusColor(project.status))} />
                                    <div>
                                        <p className="font-medium">{project.name}</p>
                                        <p className="text-xs text-muted-foreground">Last deployed {project.lastDeployed}</p>
                                    </div>
                                </div>
                                <Badge variant="secondary" className={cn(getEnvironmentColor(project.environment))}>
                                    {project.environment}
                                </Badge>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

