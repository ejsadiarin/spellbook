import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCards } from "@/components/stats-cards"
import { SystemStatus } from "@/components/system-status"
import { RecentActivity } from "@/components/recent-activity"
import { QuickActions } from "@/components/quick-actions"
import { DashboardSkeleton } from "@/components/dashboard-skeleton"
import { Sparkles } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <DashboardHeader heading="Dashboard" text="Welcome to your personal developer platform.">
                <div className="flex items-center space-x-1 text-purple-400">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm">Spellbook</span>
                </div>
            </DashboardHeader>

            <Suspense fallback={<DashboardSkeleton />}>
                <StatsCards />

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <SystemStatus className="md:col-span-1 lg:col-span-4" />
                    <RecentActivity className="md:col-span-1 lg:col-span-3" />
                </div>

                <QuickActions />
            </Suspense>
        </div>
    )
}

