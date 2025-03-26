"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import type { DialogProps } from "@radix-ui/react-dialog"
import { CircleUser, Cog, FileText, Laptop, LayoutDashboard, LogOut, MessageSquare, Search, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"

export function CommandMenu({ ...props }: DialogProps) {
    const router = useRouter()
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [])

    return (
        <>
            <Button
                variant="outline"
                className="fixed right-4 top-4 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm md:right-8 md:top-8 lg:hidden"
                onClick={() => setOpen(true)}
            >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen} {...props}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Navigation">
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/kubernetes"))}>
                            <Server className="mr-2 h-4 w-4" />
                            <span>Kubernetes</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/docker"))}>
                            <Laptop className="mr-2 h-4 w-4" />
                            <span>Docker</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/tasks"))}>
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Tasks</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/notifications"))}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>Notifications</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/profile"))}>
                            <CircleUser className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings"))}>
                            <Cog className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Session">
                        <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}

