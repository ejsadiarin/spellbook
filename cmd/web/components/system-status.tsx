"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Activity, AlertCircle, CheckCircle2, Server } from "lucide-react"

interface SystemStatusProps {
    className?: string
}

interface SystemNode {
    id: string
    name: string
    type: "kubernetes" | "docker" | "service"
    status: "healthy" | "warning" | "critical"
    metrics: {
        cpu: number
        memory: number
        disk?: number
        network?: number
    }
    lastUpdated: string
}

export function SystemStatus({ className }: SystemStatusProps) {
    const [nodes, setNodes] = useState<SystemNode[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // In a real app, you would fetch this data from your Go API
        // Example: fetch('/api/system/status').then(res => res.json()).then(data => setNodes(data))

        // Simulating API call with timeout
        const timeout = setTimeout(() => {
            setNodes([
                {
                    id: "1",
                    name: "master-node",
                    type: "kubernetes",
                    status: "healthy",
                    metrics: {
                        cpu: 32,
                        memory: 45,
                        disk: 28,
                        network: 15,
                    },
                    lastUpdated: "2 minutes ago",
                },
                {
                    id: "2",
                    name: "worker-node-1",
                    type: "kubernetes",
                    status: "healthy",
                    metrics: {
                        cpu: 68,
                        memory: 72,
                        disk: 45,
                        network: 22,
                    },
                    lastUpdated: "1 minute ago",
                },
                {
                    id: "3",
                    name: "worker-node-2",
                    type: "kubernetes",
                    status: "warning",
                    metrics: {
                        cpu: 89,
                        memory: 65,
                        disk: 52,
                        network: 34,
                    },
                    lastUpdated: "just now",
                },
                {
                    id: "4",
                    name: "web-app",
                    type: "docker",
                    status: "healthy",
                    metrics: {
                        cpu: 22,
                        memory: 35,
                    },
                    lastUpdated: "5 minutes ago",
                },
                {
                    id: "5",
                    name: "database",
                    type: "docker",
                    status: "critical",
                    metrics: {
                        cpu: 95,
                        memory: 88,
                    },
                    lastUpdated: "just now",
                },
                {
                    id: "6",
                    name: "cache-service",
                    type: "docker",
                    status: "healthy",
                    metrics: {
                        cpu: 15,
                        memory: 42,
                    },
                    lastUpdated: "3 minutes ago",
                },
            ])
            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timeout)
    }, [])

    const getStatusIcon = (status: SystemNode["status"]) => {
        switch (status) {
            case "healthy":
                return <CheckCircle2 className="h-4 w-4 text-green-500" />
            case "warning":
                return <AlertCircle className="h-4 w-4 text-yellow-500" />
            case "critical":
                return <AlertCircle className="h-4 w-4 text-red-500" />
            default:
                return <Activity className="h-4 w-4 text-blue-500" />
        }
    }

    const getStatusColor = (value: number) => {
        if (value < 50) return "bg-green-500"
        if (value < 80) return "bg-yellow-500"
        return "bg-red-500"
    }

    return (
        <Card className={cn("futuristic-card", className)}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-purple-400" />
                    System Status
                </CardTitle>
                <CardDescription>Real-time monitoring of your infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="kubernetes" className="space-y-4">
                    <TabsList className="grid grid-cols-2 h-9">
                        <TabsTrigger value="kubernetes">Kubernetes</TabsTrigger>
                        <TabsTrigger value="docker">Docker</TabsTrigger>
                    </TabsList>
                    <TabsContent value="kubernetes" className="space-y-4">
                        {isLoading ? (
                            <div className="space-y-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-16 animate-pulse rounded-md bg-muted"></div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {nodes
                                    .filter((node) => node.type === "kubernetes")
                                    .map((node) => (
                                        <div key={node.id} className="flex flex-col space-y-2 rounded-md border border-white/10 p-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    {getStatusIcon(node.status)}
                                                    <span className="font-medium">{node.name}</span>
                                                </div>
                                                <span className="text-xs text-muted-foreground">Updated {node.lastUpdated}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className="text-muted-foreground">CPU</span>
                                                        <span>{node.metrics.cpu}%</span>
                                                    </div>
                                                    <div className="h-1.5 w-full rounded-full bg-muted">
                                                        <div
                                                            className={`h-1.5 rounded-full ${getStatusColor(node.metrics.cpu)}`}
                                                            style={{ width: `${node.metrics.cpu}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className="text-muted-foreground">Memory</span>
                                                        <span>{node.metrics.memory}%</span>
                                                    </div>
                                                    <div className="h-1.5 w-full rounded-full bg-muted">
                                                        <div
                                                            className={`h-1.5 rounded-full ${getStatusColor(node.metrics.memory)}`}
                                                            style={{ width: `${node.metrics.memory}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className="text-muted-foreground">Disk</span>
                                                        <span>{node.metrics.disk}%</span>
                                                    </div>
                                                    <div className="h-1.5 w-full rounded-full bg-muted">
                                                        <div
                                                            className={`h-1.5 rounded-full ${getStatusColor(node.metrics.disk || 0)}`}
                                                            style={{ width: `${node.metrics.disk}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className="text-muted-foreground">Network</span>
                                                        <span>{node.metrics.network}%</span>
                                                    </div>
                                                    <div className="h-1.5 w-full rounded-full bg-muted">
                                                        <div
                                                            className={`h-1.5 rounded-full ${getStatusColor(node.metrics.network || 0)}`}
                                                            style={{ width: `${node.metrics.network}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="docker" className="space-y-4">
                        {isLoading ? (
                            <div className="space-y-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-16 animate-pulse rounded-md bg-muted"></div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {nodes
                                    .filter((node) => node.type === "docker")
                                    .map((node) => (
                                        <div key={node.id} className="flex flex-col space-y-2 rounded-md border border-white/10 p-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    {getStatusIcon(node.status)}
                                                    <span className="font-medium">{node.name}</span>
                                                </div>
                                                <span className="text-xs text-muted-foreground">Updated {node.lastUpdated}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className="text-muted-foreground">CPU</span>
                                                        <span>{node.metrics.cpu}%</span>
                                                    </div>
                                                    <div className="h-1.5 w-full rounded-full bg-muted">
                                                        <div
                                                            className={`h-1.5 rounded-full ${getStatusColor(node.metrics.cpu)}`}
                                                            style={{ width: `${node.metrics.cpu}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className="text-muted-foreground">Memory</span>
                                                        <span>{node.metrics.memory}%</span>
                                                    </div>
                                                    <div className="h-1.5 w-full rounded-full bg-muted">
                                                        <div
                                                            className={`h-1.5 rounded-full ${getStatusColor(node.metrics.memory)}`}
                                                            style={{ width: `${node.metrics.memory}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

