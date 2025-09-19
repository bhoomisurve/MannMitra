import { type NextRequest, NextResponse } from "next/server"
import { getUser } from "@/lib/auth"

// Simple in-memory storage for demo purposes
// In production, use a proper database
const moodEntries = new Map<string, any[]>()

export async function GET() {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userEntries = moodEntries.get(user.id) || []

    // Sort by timestamp, most recent first
    const sortedEntries = userEntries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    // Check if user has already checked in today
    const today = new Date().toDateString()
    const todayEntry = sortedEntries.find((entry) => new Date(entry.timestamp).toDateString() === today)

    return NextResponse.json({
      entries: sortedEntries,
      todayEntry: todayEntry || null,
    })
  } catch (error) {
    console.error("Mood GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { mood, emoji, intensity, note } = await request.json()

    if (!mood || !emoji || intensity === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user has already checked in today
    const userEntries = moodEntries.get(user.id) || []
    const today = new Date().toDateString()
    const hasCheckedInToday = userEntries.some((entry) => new Date(entry.timestamp).toDateString() === today)

    if (hasCheckedInToday) {
      return NextResponse.json({ error: "Already checked in today" }, { status: 400 })
    }

    // Create new mood entry
    const newEntry = {
      id: crypto.randomUUID(),
      mood,
      emoji,
      intensity: Number(intensity),
      note: note || undefined,
      timestamp: new Date().toISOString(),
      userId: user.id,
    }

    // Add to user's entries
    userEntries.push(newEntry)
    moodEntries.set(user.id, userEntries)

    return NextResponse.json({ success: true, entry: newEntry })
  } catch (error) {
    console.error("Mood POST error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
