import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, GripVertical } from "lucide-react"
import Link from "next/link"

export default function KanbanPage() {
    // In a real app, you would fetch this data from your Go API
    const columns = [
        {
            id: "todo",
            title: "To Do",
            cards: [
                {
                    id: "c1",
                    title: "Update Kubernetes configuration",
                    priority: "high",
                    tags: ["kubernetes", "config"],
                },
                {
                    id: "c2",
                    title: "Write documentation for API endpoints",
                    priority: "medium",
                    tags: ["docs", "api"],
                },
            ],
        },
        {
            id: "in-progress",
            title: "In Progress",
            cards: [
                {
                    id: "c3",
                    title: "Debug database connection issue",
                    priority: "critical",
                    tags: ["database", "bug"],
                },
            ],
        },
        {
            id: "done",
            title: "Done",
            cards: [
                {
                    id: "c4",
                    title: "Set up monitoring alerts",
                    priority: "low",
                    tags: ["monitoring"],
                },
            ],
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
            <DashboardHeader heading="Kanban Board" text="Visualize your workflow.">
                <Button asChild>
                    <Link href="/dashboard/tasks/create">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Card
                    </Link>
                </Button>
            </DashboardHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {columns.map((column) => (
                    <div key={column.id} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium text-lg">{column.title}</h3>
                            <Badge variant="outline">{column.cards.length}</Badge>
                        </div>
                        <div className="space-y-3">
                            {column.cards.map((card) => (
                                <Card key={card.id} className="futuristic-card">
                                    <CardHeader className="p-3 pb-0">
                                        <div className="flex items-center justify-between">
                                            <Badge className={getPriorityColor(card.priority)}>{card.priority}</Badge>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <GripVertical className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-3">
                                        <p className="font-medium">{card.title}</p>
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {card.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary" className="bg-white/5">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            <Button variant="outline" className="w-full border-dashed">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Card
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

