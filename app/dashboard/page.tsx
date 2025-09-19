"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  ArrowLeft,
  MessageCircle,
  BarChart3,
  Calendar,
  TrendingUp,
  Clock,
  Shield,
  BookOpen,
  Target,
  Smile,
  Activity,
} from "lucide-react"
import Link from "next/link"

interface MoodEntry {
  id: string
  mood: string
  emoji: string
  intensity: number
  timestamp: string
}

interface DashboardStats {
  totalChats: number
  moodEntries: number
  currentStreak: number
  averageMood: number
  recentMoods: MoodEntry[]
  weeklyMoodTrend: { day: string; mood: number }[]
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalChats: 0,
    moodEntries: 0,
    currentStreak: 0,
    averageMood: 0,
    recentMoods: [],
    weeklyMoodTrend: [],
  })
  const [loading, setLoading] = useState(true)
  const [todayMood, setTodayMood] = useState<MoodEntry | null>(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Load mood data
      const moodResponse = await fetch("/api/mood")
      const moodData = await moodResponse.json()

      // Load chat stats (simulated for demo)
      const chatStats = {
        totalChats: Math.floor(Math.random() * 20) + 5,
        currentStreak: Math.floor(Math.random() * 7) + 1,
      }

      // Process mood data
      const moods = moodData.entries || []
      const averageMood =
        moods.length > 0 ? moods.reduce((sum: number, entry: any) => sum + entry.intensity, 0) / moods.length : 0

      // Generate weekly trend (last 7 days)
      const weeklyTrend = generateWeeklyTrend(moods)

      setStats({
        totalChats: chatStats.totalChats,
        moodEntries: moods.length,
        currentStreak: chatStats.currentStreak,
        averageMood: Math.round(averageMood * 10) / 10,
        recentMoods: moods.slice(0, 5),
        weeklyMoodTrend: weeklyTrend,
      })

      setTodayMood(moodData.todayEntry || null)
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateWeeklyTrend = (moods: any[]) => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const today = new Date()
    const weekData = []

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      const dayName = days[date.getDay() === 0 ? 6 : date.getDay() - 1]

      // Find mood entry for this day
      const dayMood = moods.find((mood) => {
        const moodDate = new Date(mood.timestamp)
        return moodDate.toDateString() === date.toDateString()
      })

      weekData.push({
        day: dayName,
        mood: dayMood ? dayMood.intensity : 0,
      })
    }

    return weekData
  }

  const getMoodColor = (intensity: number) => {
    if (intensity >= 8) return "text-green-600"
    if (intensity >= 6) return "text-blue-600"
    if (intensity >= 4) return "text-yellow-600"
    return "text-red-600"
  }

  const getStreakMessage = (streak: number) => {
    if (streak >= 7) return "Amazing! You're on a roll!"
    if (streak >= 3) return "Great consistency!"
    if (streak >= 1) return "Keep it up!"
    return "Start your wellness journey today!"
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">Your Wellness Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back to your wellness journey</h2>
          <p className="text-muted-foreground">
            Here's an overview of your progress and some insights to help you continue growing.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stats.totalChats}</div>
              <div className="text-sm text-muted-foreground">Chat Sessions</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stats.moodEntries}</div>
              <div className="text-sm text-muted-foreground">Mood Entries</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stats.currentStreak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Activity className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className={`text-2xl font-bold ${getMoodColor(stats.averageMood)}`}>
                {stats.averageMood > 0 ? stats.averageMood.toFixed(1) : "—"}
              </div>
              <div className="text-sm text-muted-foreground">Avg Mood</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Check-in */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Check-in
                </CardTitle>
              </CardHeader>
              <CardContent>
                {todayMood ? (
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{todayMood.emoji}</span>
                      <div>
                        <div className="font-medium capitalize">{todayMood.mood}</div>
                        <div className="text-sm text-muted-foreground">Intensity: {todayMood.intensity}/10</div>
                      </div>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Smile className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground mb-4">You haven't checked in today yet.</p>
                    <Link href="/mood">
                      <Button>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Check Your Mood
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Weekly Mood Trend */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Weekly Mood Trend
                </CardTitle>
                <CardDescription>Your emotional patterns over the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                {stats.weeklyMoodTrend.length > 0 ? (
                  <div className="space-y-4">
                    {stats.weeklyMoodTrend.map((day, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-12 text-sm font-medium">{day.day}</div>
                        <div className="flex-1">
                          <Progress value={day.mood * 10} className="h-2" />
                        </div>
                        <div className={`w-8 text-sm font-medium ${getMoodColor(day.mood)}`}>
                          {day.mood > 0 ? day.mood : "—"}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Start tracking your mood to see patterns!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Mood Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.recentMoods.length > 0 ? (
                  <div className="space-y-3">
                    {stats.recentMoods.map((mood) => (
                      <div key={mood.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{mood.emoji}</span>
                          <div>
                            <div className="font-medium capitalize">{mood.mood}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(mood.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className={`text-sm font-medium ${getMoodColor(mood.intensity)}`}>{mood.intensity}/10</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No mood entries yet. Start your wellness journey!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Wellness Streak */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Wellness Streak
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stats.currentStreak}</div>
                <div className="text-sm text-muted-foreground mb-3">
                  {stats.currentStreak === 1 ? "day" : "days"} in a row
                </div>
                <p className="text-sm font-medium text-green-600 mb-4">{getStreakMessage(stats.currentStreak)}</p>
                <Progress value={Math.min((stats.currentStreak / 7) * 100, 100)} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">Goal: 7 days</p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Jump into your wellness activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/chat" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat with MannMitra
                  </Button>
                </Link>

                <Link href="/mood" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Log Your Mood
                  </Button>
                </Link>

                <Link href="/resources" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Resources
                  </Button>
                </Link>

                <Link href="/crisis" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Crisis Support
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Wellness Tips */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Today's Wellness Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <p className="text-sm font-medium mb-2">Practice Gratitude</p>
                  <p className="text-sm text-muted-foreground">
                    Take a moment to think of three things you're grateful for today. Gratitude can improve mood and
                    overall well-being.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Reminder */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-700 mb-1">Your Privacy is Protected</p>
                    <p className="text-xs text-green-600">
                      All your data is encrypted and confidential. We never share your personal information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
