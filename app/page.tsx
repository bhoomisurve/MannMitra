"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, BarChart3, Shield, LogOut, BookOpen, LayoutDashboard } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check authentication status
    fetch("/api/auth/status")
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.authenticated)
        setLoading(false)
      })
      .catch(() => {
        setIsAuthenticated(false)
        setLoading(false)
      })
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" })
      setIsAuthenticated(false)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm onSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">MannMitra</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link href="/resources">
              <Button variant="ghost" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Resources
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Welcome to your safe space</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Your confidential AI companion is here to listen, support, and guide you through your wellness journey.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-green-100 hover:shadow-md transition-shadow">
            <MessageCircle className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Companion</h3>
            <p className="text-muted-foreground text-sm">
              Chat with your empathetic AI friend anytime, anywhere. No judgment, just support.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-green-100 hover:shadow-md transition-shadow">
            <BarChart3 className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Mood Tracking</h3>
            <p className="text-muted-foreground text-sm">
              Track your daily emotions and discover patterns in your mental wellness journey.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-green-100 hover:shadow-md transition-shadow">
            <BookOpen className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Resource Hub</h3>
            <p className="text-muted-foreground text-sm">
              Access curated guides, coping techniques, and professional support resources.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-green-100 hover:shadow-md transition-shadow">
            <Shield className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Complete Privacy</h3>
            <p className="text-muted-foreground text-sm">
              Your conversations are completely confidential and secure. Your privacy is our priority.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/chat">
            <Button size="lg" className="text-lg px-8 w-full sm:w-auto">
              <MessageCircle className="h-5 w-5 mr-2" />
              Start Chatting
            </Button>
          </Link>
          <Link href="/mood">
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent w-full sm:w-auto">
              <BarChart3 className="h-5 w-5 mr-2" />
              Check Your Mood
            </Button>
          </Link>
        </div>

        <div className="text-center">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-muted-foreground">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              View Your Wellness Dashboard
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
