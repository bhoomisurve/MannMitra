"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, Send, ArrowLeft, AlertTriangle, Shield, LayoutDashboard } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface CrisisAlert {
  show: boolean
  message: string
  level: "crisis" | "concern"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [crisisAlert, setCrisisAlert] = useState<CrisisAlert>({ show: false, message: "", level: "concern" })
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Initial greeting message
  useEffect(() => {
    const greeting: Message = {
      id: "greeting",
      content:
        "Namaste! I'm your MannMitra, here to listen and support you. How are you feeling today? Feel free to share whatever is on your mind - I'm here for you.",
      role: "assistant",
      timestamp: new Date(),
    }
    setMessages([greeting])
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.slice(-10), // Send last 10 messages for context
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response")
      }

      // Enhanced crisis detection handling
      if (data.crisisDetected || data.concernDetected) {
        setCrisisAlert({
          show: true,
          message: data.crisisMessage || "It sounds like you're going through a difficult time.",
          level: data.crisisDetected ? "crisis" : "concern",
        })
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const closeCrisisAlert = () => {
    setCrisisAlert({ show: false, message: "", level: "concern" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex flex-col">
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
            <h1 className="text-xl font-bold text-primary">MannMitra Chat</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link href="/crisis">
              <Button variant="outline" size="sm" className="text-destructive border-destructive/20 bg-transparent">
                <Shield className="h-4 w-4 mr-2" />
                Crisis Support
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Enhanced Crisis Alert Modal */}
      {crisisAlert.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card
            className={`w-full max-w-md p-6 ${crisisAlert.level === "crisis" ? "bg-red-50 border-red-200" : "bg-white"}`}
          >
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle
                className={`h-6 w-6 flex-shrink-0 mt-0.5 ${crisisAlert.level === "crisis" ? "text-red-600" : "text-destructive"}`}
              />
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {crisisAlert.level === "crisis" ? "Immediate Support Needed" : "Support Available"}
                </h3>
                <p className="text-muted-foreground mb-4">{crisisAlert.message}</p>
                {crisisAlert.level === "crisis" && (
                  <p className="text-sm text-red-700 mb-4 font-medium">
                    If you are in immediate danger, please call emergency services: 112
                  </p>
                )}
                <p className="text-sm text-muted-foreground mb-4">
                  Please know that immediate help is available. Talking to someone right now can make a difference.
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className={`p-3 rounded-lg ${crisisAlert.level === "crisis" ? "bg-red-100" : "bg-destructive/10"}`}>
                <h4 className="font-medium text-sm mb-1">24/7 Emergency Helplines:</h4>
                <div className="space-y-1 text-sm">
                  <div>
                    <strong>Tele MANAS:</strong>{" "}
                    <a href="tel:14416" className="text-destructive hover:underline">
                      14416
                    </a>
                  </div>
                  <div>
                    <strong>Vandrevala Foundation:</strong>{" "}
                    <a href="tel:+919999666555" className="text-destructive hover:underline">
                      +91-9999666555
                    </a>
                  </div>
                  <div>
                    <strong>AASRA:</strong>{" "}
                    <a href="tel:+919820466726" className="text-destructive hover:underline">
                      +91-9820466726
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={closeCrisisAlert} variant="outline" className="flex-1 bg-transparent">
                Continue Chat
              </Button>
              <Link href="/crisis" className="flex-1">
                <Button className={`w-full ${crisisAlert.level === "crisis" ? "bg-red-600 hover:bg-red-700" : ""}`}>
                  Get Help Now
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col">
        <Card className="flex-1 flex flex-col bg-white/60 backdrop-blur-sm border-green-100">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-white border border-green-100"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-green-100 rounded-lg px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-xs text-muted-foreground">MannMitra is typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-green-100 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Share what's on your mind..."
                disabled={loading}
                className="flex-1"
              />
              <Button type="submit" disabled={loading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Your conversations are completely private and confidential
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
