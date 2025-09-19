import { type NextRequest, NextResponse } from "next/server"
import { setUser, clearUser } from "@/lib/auth"

// Simple in-memory user store for demo purposes
// In production, use a proper database
const users = new Map<string, { id: string; email: string; password: string; createdAt: Date }>()

export async function POST(request: NextRequest) {
  try {
    const { email, password, action } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    if (action === "signup") {
      // Check if user already exists
      if (users.has(email)) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 })
      }

      // Create new user
      const user = {
        id: crypto.randomUUID(),
        email,
        password, // In production, hash this password
        createdAt: new Date(),
      }

      users.set(email, user)

      // Set session
      await setUser({ id: user.id, email: user.email, createdAt: user.createdAt })

      return NextResponse.json({ success: true, user: { id: user.id, email: user.email } })
    } else {
      // Login
      const user = users.get(email)

      if (!user || user.password !== password) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      // Set session
      await setUser({ id: user.id, email: user.email, createdAt: user.createdAt })

      return NextResponse.json({ success: true, user: { id: user.id, email: user.email } })
    }
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    await clearUser()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
