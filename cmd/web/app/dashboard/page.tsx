import { Suspense } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCards } from "@/components/stats-cards"
import { RecentActivity } from "@/components/recent-activity"
import { ProjectsOverview } from "@/components/projects-overview"
import { DashboardSkeleton } from "@/components/dashboard-skeleton"

export default function DashboardPage() {
    return (
        <DashboardShell>
            <DashboardHeader heading="Dashboard" text="Welcome to your Internal Developer Platform dashboard." />
            <div className="grid gap-4 md:gap-8">
                <Suspense fallback={<DashboardSkeleton />}>
                    <StatsCards />
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <ProjectsOverview className="md:col-span-1 lg:col-span-4" />
                        <RecentActivity className="md:col-span-1 lg:col-span-3" />
                    </div>
                </Suspense>
            </div>
        </DashboardShell>
    )
}
