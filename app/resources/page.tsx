"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  ArrowLeft,
  Phone,
  BookOpen,
  Lightbulb,
  Clock,
  Users,
  GraduationCap,
  Brain,
  Smartphone,
  PenTool,
  Wind,
  Eye,
  Ear,
  Hand,
  Mouse as Nose,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
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
            <h1 className="text-xl font-bold text-primary">MannMitra Resources</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Disclaimer */}
        <Alert className="mb-8 bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> This information is for support and guidance. It is not a substitute for
            professional medical advice. If you are in a crisis, please contact the emergency helplines listed below
            immediately.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="emergency" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="emergency" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Emergency Help
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger value="toolkit" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Self-Help Toolkit
            </TabsTrigger>
          </TabsList>

          {/* Emergency Helplines Tab */}
          <TabsContent value="emergency" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">24/7 Emergency & Crisis Support</h2>
              <p className="text-muted-foreground">
                Trained professionals are available around the clock to provide immediate support
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-red-200">
                <CardHeader>
                  <CardTitle className="text-lg text-red-700 flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Tele MANAS
                  </CardTitle>
                  <CardDescription>National Mental Health Helpline - Government of India</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <a href="tel:14416" className="text-red-600 hover:underline font-semibold text-lg">
                        14416
                      </a>
                      <Badge variant="destructive">Toll-free</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <a href="tel:18009144416" className="text-red-600 hover:underline font-semibold">
                        1-800-91-4416
                      </a>
                      <Badge variant="outline">Alternative</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      24/7 in multiple regional languages
                    </div>
                    <p className="text-sm">
                      Confidential counseling service providing immediate support and guidance for mental health
                      concerns.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-red-200">
                <CardHeader>
                  <CardTitle className="text-lg text-red-700 flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Vandrevala Foundation
                  </CardTitle>
                  <CardDescription>Free counseling with trained professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <a href="tel:+919999666555" className="text-red-600 hover:underline font-semibold text-lg">
                        +91-9999666555
                      </a>
                      <Badge variant="destructive">Free</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      24/7 phone and text support
                    </div>
                    <p className="text-sm">
                      Leading non-profit organization offering comprehensive mental health support through trained
                      counselors.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-red-200">
                <CardHeader>
                  <CardTitle className="text-lg text-red-700 flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    AASRA
                  </CardTitle>
                  <CardDescription>Confidential support for distress and suicidal thoughts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <a href="tel:+919820466726" className="text-red-600 hover:underline font-semibold text-lg">
                        +91-9820466726
                      </a>
                      <Badge variant="destructive">Confidential</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      24/7 crisis intervention
                    </div>
                    <p className="text-sm">
                      Specialized support for individuals experiencing depression, distress, or suicidal ideation.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-red-200">
                <CardHeader>
                  <CardTitle className="text-lg text-red-700 flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    iCALL (TISS Mumbai)
                  </CardTitle>
                  <CardDescription>Professional psychosocial helpline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <a href="tel:02225521111" className="text-red-600 hover:underline font-semibold block">
                        022-25521111
                      </a>
                      <a href="tel:+919152987821" className="text-red-600 hover:underline font-semibold block">
                        +91-9152987821
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Mon-Sat: 10 AM - 8 PM
                    </div>
                    <p className="text-sm">
                      Professional counseling service by TISS with trained mental health professionals and email
                      support.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Alert className="bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-center">
                <strong>Emergency Services: 112</strong>
                <br />
                If you are in immediate physical danger, call emergency services immediately.
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Knowledge Base Tab */}
          <TabsContent value="guides" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Knowledge Base & Guides</h2>
              <p className="text-muted-foreground">
                Culturally relevant guidance for common challenges faced by Indian youth
              </p>
            </div>

            <div className="space-y-6">
              {/* Academic & Career Pressure */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    Managing Academic & Career Pressure
                  </CardTitle>
                  <CardDescription>
                    Navigate the unique pressures of Indian education and career expectations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className="border border-green-200 rounded-lg p-4 cursor-pointer hover:bg-green-50 transition-colors"
                    onClick={() => toggleCard("exam-stress")}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Dealing with Exam Stress</h3>
                      <Badge variant="outline">Study Techniques</Badge>
                    </div>
                    {expandedCard === "exam-stress" && (
                      <div className="mt-3 text-sm text-muted-foreground space-y-2">
                        <p>
                          <strong>The Pomodoro Technique:</strong> Study for 25 minutes, then take a 5-minute break.
                          This prevents burnout and improves focus.
                        </p>
                        <p>
                          <strong>Remember:</strong> Your marks do not define your worth or your future. You are more
                          than your academic performance.
                        </p>
                        <p>
                          <strong>Practical tips:</strong> Create a realistic study schedule, practice past papers, get
                          adequate sleep, and maintain a healthy diet during exam periods.
                        </p>
                      </div>
                    )}
                  </div>

                  <div
                    className="border border-green-200 rounded-lg p-4 cursor-pointer hover:bg-green-50 transition-colors"
                    onClick={() => toggleCard("parental-expectations")}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Parental & Societal Expectations</h3>
                      <Badge variant="outline">Communication</Badge>
                    </div>
                    {expandedCard === "parental-expectations" && (
                      <div className="mt-3 text-sm text-muted-foreground space-y-2">
                        <p>
                          <strong>Communicating with parents:</strong> Share your career aspirations clearly. Explain
                          your interests and the potential in your chosen field.
                        </p>
                        <p>
                          <strong>Setting boundaries:</strong> It's okay to respectfully disagree. Your life choices
                          should align with your values and interests.
                        </p>
                        <p>
                          <strong>Managing "Log kya kahenge" pressure:</strong> Remember that society's opinions don't
                          pay your bills or live your life. Focus on what makes you fulfilled.
                        </p>
                      </div>
                    )}
                  </div>

                  <div
                    className="border border-green-200 rounded-lg p-4 cursor-pointer hover:bg-green-50 transition-colors"
                    onClick={() => toggleCard("fear-failure")}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Fear of Failure</h3>
                      <Badge variant="outline">Resilience</Badge>
                    </div>
                    {expandedCard === "fear-failure" && (
                      <div className="mt-3 text-sm text-muted-foreground space-y-2">
                        <p>
                          <strong>Reframe failure:</strong> Failure is not the opposite of success; it's a stepping
                          stone to success. Every failure teaches valuable lessons.
                        </p>
                        <p>
                          <strong>Building resilience:</strong> Develop a growth mindset. Focus on effort and learning
                          rather than just outcomes.
                        </p>
                        <p>
                          <strong>Bouncing back:</strong> Allow yourself to feel disappointed, then analyze what went
                          wrong, make adjustments, and try again with new knowledge.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Relationships */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    Navigating Relationships
                  </CardTitle>
                  <CardDescription>Build healthier connections with family, friends, and peers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className="border border-green-200 rounded-lg p-4 cursor-pointer hover:bg-green-50 transition-colors"
                    onClick={() => toggleCard("family-conflict")}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Family Conflict</h3>
                      <Badge variant="outline">Communication</Badge>
                    </div>
                    {expandedCard === "family-conflict" && (
                      <div className="mt-3 text-sm text-muted-foreground space-y-2">
                        <p>
                          <strong>Use "I" statements:</strong> Instead of "You always..." try "I feel..." This reduces
                          defensiveness and promotes understanding.
                        </p>
                        <p>
                          <strong>Example:</strong> "I feel unheard when my opinions are dismissed" instead of "You
                          never listen to me."
                        </p>
                        <p>
                          <strong>Active listening:</strong> Try to understand their perspective before making your
                          point. Sometimes conflicts arise from misunderstandings.
                        </p>
                      </div>
                    )}
                  </div>

                  <div
                    className="border border-green-200 rounded-lg p-4 cursor-pointer hover:bg-green-50 transition-colors"
                    onClick={() => toggleCard("social-anxiety")}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Friendship & Social Anxiety</h3>
                      <Badge variant="outline">Social Skills</Badge>
                    </div>
                    {expandedCard === "social-anxiety" && (
                      <div className="mt-3 text-sm text-muted-foreground space-y-2">
                        <p>
                          <strong>Building connections:</strong> Start with shared interests. Join clubs, study groups,
                          or activities where you can meet like-minded people.
                        </p>
                        <p>
                          <strong>Managing peer pressure:</strong> It's okay to say no. True friends will respect your
                          boundaries and decisions.
                        </p>
                        <p>
                          <strong>Social anxiety tips:</strong> Practice deep breathing before social situations, start
                          with small groups, and remember that most people are focused on themselves, not judging you.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Self-Help Toolkit Tab */}
          <TabsContent value="toolkit" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Self-Help Toolkit</h2>
              <p className="text-muted-foreground">Practical techniques you can use anytime, anywhere</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Grounding Technique */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    5-4-3-2-1 Grounding Technique
                  </CardTitle>
                  <CardDescription>Calm anxiety and stay present in the moment</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    When feeling overwhelmed or anxious, pause and quietly name:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Eye className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">
                        <strong>5 things you can SEE</strong> around you right now
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Hand className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        <strong>4 things you can FEEL</strong> physically (texture, temperature)
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Ear className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">
                        <strong>3 things you can HEAR</strong> in your environment
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Nose className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">
                        <strong>2 things you can SMELL</strong> around you
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="h-4 w-4 text-red-500 text-xs">👅</span>
                      <span className="text-sm">
                        <strong>1 thing you can TASTE</strong> in your mouth
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Box Breathing */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Wind className="h-5 w-5 text-primary" />
                    Box Breathing
                  </CardTitle>
                  <CardDescription>A powerful stress-reliever for immediate calm</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Follow this simple pattern to activate your body's relaxation response:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                        1
                      </div>
                      <span className="text-sm">
                        <strong>Breathe in</strong> for 4 seconds
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-bold text-green-600">
                        2
                      </div>
                      <span className="text-sm">
                        <strong>Hold</strong> your breath for 4 seconds
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-bold text-orange-600">
                        3
                      </div>
                      <span className="text-sm">
                        <strong>Breathe out</strong> for 4 seconds
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-bold text-purple-600">
                        4
                      </div>
                      <span className="text-sm">
                        <strong>Hold</strong> for 4 seconds, then repeat
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">Repeat 4-6 times for best results</p>
                </CardContent>
              </Card>

              {/* Digital Detox */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-primary" />
                    Digital Detox Guide
                  </CardTitle>
                  <CardDescription>Reduce social media-induced anxiety and comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <strong>Set app time limits:</strong> Use built-in screen time controls to limit social media
                      usage to 30-60 minutes per day.
                    </div>
                    <div className="text-sm">
                      <strong>Unfollow negative accounts:</strong> Remove accounts that make you feel inadequate,
                      anxious, or trigger comparison.
                    </div>
                    <div className="text-sm">
                      <strong>Screen-free hours:</strong> No devices 1 hour before sleep and 1 hour after waking up.
                    </div>
                    <div className="text-sm">
                      <strong>Replace scrolling:</strong> When you feel the urge to scroll, do 5 minutes of breathing or
                      stretching instead.
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Journaling */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PenTool className="h-5 w-5 text-primary" />
                    Journaling Prompts
                  </CardTitle>
                  <CardDescription>Guided questions to help you process thoughts and emotions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm font-medium">Daily Reflection:</p>
                      <p className="text-sm text-muted-foreground">"What is one thing I'm grateful for today?"</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-medium">Emotional Processing:</p>
                      <p className="text-sm text-muted-foreground">
                        "What's taking up most of my headspace right now?"
                      </p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-sm font-medium">Growth Mindset:</p>
                      <p className="text-sm text-muted-foreground">"What did I learn about myself today?"</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <p className="text-sm font-medium">Future Focus:</p>
                      <p className="text-sm text-muted-foreground">
                        "What's one small step I can take tomorrow toward my goals?"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-12 space-y-4">
          <h3 className="text-xl font-semibold">Need someone to talk to right now?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chat">
              <Button size="lg" className="w-full sm:w-auto">
                <Heart className="h-5 w-5 mr-2" />
                Chat with MannMitra
              </Button>
            </Link>
            <Link href="/crisis">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                <Phone className="h-5 w-5 mr-2" />
                Crisis Support
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
