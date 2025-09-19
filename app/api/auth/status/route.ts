import { NextResponse } from "next/server"
import { getUser } from "@/lib/auth"

export async function GET() {
  try {
    const user = await getUser()
    return NextResponse.json({
      authenticated: !!user,
      user: user ? { id: user.id, email: user.email } : null,
    })
  } catch (error) {
    console.error("Status check error:", error)
    return NextResponse.json({ authenticated: false, user: null })
  }
}
