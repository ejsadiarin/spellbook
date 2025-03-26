import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Clock } from "lucide-react"
import Link from "next/link"

export default function TasksPage() {
    // In a real app, you would fetch this data from your Go API
    const tasks = [
        {
            id: "t1",
            title: "Update Kubernetes configuration",
            description: "Modify the deployment settings for the web service",
            status: "todo",
            priority: "high",
            dueDate: "Today",
        },
        {
            id: "t2",
            title: "Debug database connection issue",
            description: "Investigate why the app can't connect to PostgreSQL",
            status: "in-progress",
            priority: "critical",
            dueDate: "Today",
        },
        {
            id: "t3",
            title: "Write documentation for API endpoints",
            description: "Document all the REST endpoints for the team",
            status: "todo",
            priority: "medium",
            dueDate: "Tomorrow",
        },
        {
            id: "t4",
            title: "Set up monitoring alerts",
            description: "Configure alerts for CPU and memory usage",
            status: "done",
            priority: "low",
            dueDate: "Yesterday",
        },
    ]

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "critical":
                return "bg-red-500 text-white"
            case "high":
                return "bg-orange-500 text-white"
            case "medium":
                return "bg-blue-500 text-white"
            case "low":
                return "bg-green-500 text-white"
            default:
                return "bg-gray-500 text-white"
        }
    }

    return (
        <div className="space-y-8">
            <DashboardHeader heading="Tasks" text="Manage your tasks and todos.">
                <Button asChild>
                    <Link href="/dashboard/tasks/create">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Task
                    </Link>
                </Button>
            </DashboardHeader>

            <div className="space-y-4">
                {tasks.map((task) => (
                    <Card key={task.id} className="futuristic-card">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Checkbox id={task.id} checked={task.status === "done"} />
                                    <CardTitle
                                        className={`text-lg ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}
                                    >
                                        {task.title}
                                    </CardTitle>
                                </div>
                                <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="mr-2 h-4 w-4" />
                                Due {task.dueDate}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

