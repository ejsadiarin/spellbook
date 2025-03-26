import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Server } from "lucide-react"
import Link from "next/link"

export default function KubernetesPage() {
    // In a real app, you would fetch this data from your Go API
    const clusters = [
        {
            id: "1",
            name: "dev-cluster",
            nodes: 3,
            status: "Running",
            version: "1.26.1",
            created: "2 days ago",
        },
        {
            id: "2",
            name: "staging-cluster",
            nodes: 5,
            status: "Running",
            version: "1.25.8",
            created: "2 weeks ago",
        },
    ]

    return (
        <div className="space-y-8">
            <DashboardHeader heading="Kubernetes" text="Manage your Kubernetes clusters.">
                <Button asChild>
                    <Link href="/dashboard/kubernetes/create">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Cluster
                    </Link>
                </Button>
            </DashboardHeader>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {clusters.map((cluster) => (
                    <Card key={cluster.id} className="futuristic-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Server className="h-5 w-5 text-blue-400" />
                                {cluster.name}
                            </CardTitle>
                            <CardDescription>
                                {cluster.nodes} nodes • {cluster.version}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Status</span>
                                    <span className="font-medium text-green-400">{cluster.status}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Created</span>
                                    <span>{cluster.created}</span>
                                </div>
                            </div>
                            <div className="mt-4 flex space-x-2">
                                <Button variant="outline" size="sm" className="flex-1">
                                    Manage
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                    Logs
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                <Card className="futuristic-card border border-dashed border-white/20 flex flex-col items-center justify-center p-6">
                    <div className="rounded-full bg-purple-500/10 p-3 mb-4">
                        <PlusCircle className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">Create New Cluster</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                        Deploy a new Kubernetes cluster for your applications
                    </p>
                    <Button asChild>
                        <Link href="/dashboard/kubernetes/create">Get Started</Link>
                    </Button>
                </Card>
            </div>
        </div>
    )
}

