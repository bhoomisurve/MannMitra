"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ArrowLeft, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface MoodEntry {
  id: string
  mood: string
  emoji: string
  intensity: number
  note?: string
  timestamp: Date
}

interface MoodOption {
  mood: string
  emoji: string
  color: string
  description: string
}

const MOOD_OPTIONS: MoodOption[] = [
  { mood: "joyful", emoji: "😊", color: "text-green-500", description: "Feeling happy and positive" },
  { mood: "content", emoji: "😌", color: "text-blue-500", description: "Peaceful and satisfied" },
  { mood: "neutral", emoji: "😐", color: "text-gray-500", description: "Neither good nor bad" },
  { mood: "anxious", emoji: "😰", color: "text-yellow-500", description: "Worried or stressed" },
  { mood: "sad", emoji: "😢", color: "text-blue-600", description: "Feeling down or upset" },
  { mood: "overwhelmed", emoji: "😵", color: "text-red-500", description: "Too much to handle" },
]

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null)
  const [intensity, setIntensity] = useState(5)
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [recentEntries, setRecentEntries] = useState<MoodEntry[]>([])
  const [todayEntry, setTodayEntry] = useState<MoodEntry | null>(null)

  useEffect(() => {
    loadMoodData()
  }, [])

  const loadMoodData = async () => {
    try {
      const response = await fetch("/api/mood")
      if (response.ok) {
        const data = await response.json()
        setRecentEntries(data.entries || [])
        setTodayEntry(data.todayEntry || null)
      }
    } catch (error) {
      console.error("Failed to load mood data:", error)
    }
  }

  const handleSubmit = async () => {
    if (!selectedMood) return

    setLoading(true)
    try {
      const response = await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood: selectedMood.mood,
          emoji: selectedMood.emoji,
          intensity,
          note: note.trim() || undefined,
        }),
      })

      if (response.ok) {
        setSuccess(true)
        loadMoodData()
        // Reset form
        setSelectedMood(null)
        setIntensity(5)
        setNote("")

        setTimeout(() => setSuccess(false), 3000)
      } else {
        throw new Error("Failed to save mood")
      }
    } catch (error) {
      console.error("Failed to save mood:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">Mood Check-in</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Today's Check-in Status */}
        {todayEntry && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <Calendar className="h-4 w-4" />
            <AlertDescription>
              You've already checked in today! You were feeling{" "}
              <span className="font-medium">
                {todayEntry.emoji} {todayEntry.mood}
              </span>
              . You can check in again tomorrow.
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription>
              Thank you for checking in! Your mood has been recorded. Remember, every feeling is valid.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mood Check-in Form */}
          <Card className="bg-white/60 backdrop-blur-sm border-green-100">
            <CardHeader>
              <CardTitle className="text-2xl">How are you feeling today?</CardTitle>
              <CardDescription>
                Take a moment to reflect on your current emotional state. This helps you build self-awareness.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mood Selection */}
              <div>
                <h3 className="font-medium mb-4">Choose your mood:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {MOOD_OPTIONS.map((option) => (
                    <button
                      key={option.mood}
                      onClick={() => setSelectedMood(option)}
                      className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                        selectedMood?.mood === option.mood
                          ? "border-primary bg-primary/10"
                          : "border-gray-200 bg-white hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{option.emoji}</span>
                        <div>
                          <div className="font-medium capitalize">{option.mood}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Intensity Slider */}
              {selectedMood && (
                <div>
                  <h3 className="font-medium mb-2">How intense is this feeling?</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={intensity}
                      onChange={(e) => setIntensity(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Mild (1)</span>
                      <span className="font-medium">Intensity: {intensity}</span>
                      <span>Very Strong (10)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Optional Note */}
              {selectedMood && (
                <div>
                  <h3 className="font-medium mb-2">Anything you'd like to add? (Optional)</h3>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="What's contributing to this feeling? Any thoughts you'd like to capture..."
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none h-20 text-sm"
                    maxLength={200}
                  />
                  <div className="text-xs text-muted-foreground mt-1">{note.length}/200 characters</div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!selectedMood || loading || !!todayEntry}
                className="w-full"
                size="lg"
              >
                {loading ? "Saving..." : todayEntry ? "Already checked in today" : "Save My Mood"}
              </Button>
            </CardContent>
          </Card>

          {/* Recent Mood History */}
          <Card className="bg-white/60 backdrop-blur-sm border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Mood Journey
              </CardTitle>
              <CardDescription>Track your emotional patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              {recentEntries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No mood entries yet.</p>
                  <p className="text-sm">Start tracking to see your patterns!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentEntries.slice(0, 7).map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{entry.emoji}</span>
                        <div>
                          <div className="font-medium capitalize">{entry.mood}</div>
                          <div className="text-xs text-muted-foreground">{formatDate(new Date(entry.timestamp))}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Intensity: {entry.intensity}/10</div>
                        {entry.note && (
                          <div className="text-xs text-muted-foreground max-w-32 truncate">"{entry.note}"</div>
                        )}
                      </div>
                    </div>
                  ))}

                  {recentEntries.length > 7 && (
                    <div className="text-center pt-2">
                      <Button variant="ghost" size="sm">
                        View All Entries
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Helpful Tips */}
        <Card className="mt-8 bg-white/60 backdrop-blur-sm border-green-100">
          <CardContent className="pt-6">
            <h3 className="font-medium mb-3">💡 Tips for Mood Tracking</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <strong>Be honest:</strong> There are no right or wrong feelings. Track what you genuinely feel.
              </div>
              <div>
                <strong>Look for patterns:</strong> Over time, you might notice triggers or cycles in your moods.
              </div>
              <div>
                <strong>Don't judge:</strong> Every emotion serves a purpose. Acknowledge them without criticism.
              </div>
              <div>
                <strong>Seek support:</strong> If you notice persistent low moods, consider talking to someone you
                trust.
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
