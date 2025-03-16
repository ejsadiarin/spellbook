// This file will contain functions to interact with your Go backend API

// Example function to fetch data from your Go API
export async function fetchFromApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
    const url = `${apiUrl}${endpoint}`

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            // Add any auth headers here if needed
        },
        ...options,
    })

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
    }

    return response.json()
}

// Example typed API functions
export async function getProjects() {
    return fetchFromApi<any[]>("/api/projects")
}

export async function getStats() {
    return fetchFromApi<any>("/api/stats")
}

export async function getActivities() {
    return fetchFromApi<any[]>("/api/activities")
}

