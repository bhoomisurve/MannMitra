"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, ArrowLeft, Phone, MessageCircle, Clock, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function CrisisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-red-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Safety
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-destructive" />
            <h1 className="text-xl font-bold text-destructive">Crisis Support</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Emergency Alert */}
        <Alert className="mb-8 bg-destructive/10 border-destructive/20">
          <Shield className="h-4 w-4" />
          <AlertDescription className="text-lg">
            <strong>If you are in immediate danger, please call emergency services: 112</strong>
            <br />
            You are not alone. Help is available 24/7.
          </AlertDescription>
        </Alert>

        {/* Immediate Support */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-destructive/20">
          <CardHeader>
            <CardTitle className="text-2xl text-destructive flex items-center gap-2">
              <Phone className="h-6 w-6" />
              24/7 Crisis Helplines
            </CardTitle>
            <CardDescription>
              These helplines are staffed by trained professionals who understand what you're going through.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-destructive/5 p-4 rounded-lg border border-destructive/20">
                  <h3 className="font-semibold text-lg mb-2">Tele MANAS</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    National Mental Health Helpline by Government of India
                  </p>
                  <div className="space-y-2">
                    <a
                      href="tel:14416"
                      className="flex items-center gap-2 text-destructive hover:underline font-medium"
                    >
                      <Phone className="h-4 w-4" />
                      14416 (Toll-free)
                    </a>
                    <a
                      href="tel:18009144416"
                      className="flex items-center gap-2 text-destructive hover:underline font-medium"
                    >
                      <Phone className="h-4 w-4" />
                      1-800-91-4416
                    </a>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Available 24/7 in multiple languages
                  </div>
                </div>

                <div className="bg-destructive/5 p-4 rounded-lg border border-destructive/20">
                  <h3 className="font-semibold text-lg mb-2">Vandrevala Foundation</h3>
                  <p className="text-sm text-muted-foreground mb-3">Free counseling and crisis support</p>
                  <a
                    href="tel:+919999666555"
                    className="flex items-center gap-2 text-destructive hover:underline font-medium"
                  >
                    <Phone className="h-4 w-4" />
                    +91-9999666555
                  </a>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    24/7 phone and text support
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-destructive/5 p-4 rounded-lg border border-destructive/20">
                  <h3 className="font-semibold text-lg mb-2">AASRA</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Confidential support for those feeling distressed or suicidal
                  </p>
                  <a
                    href="tel:+919820466726"
                    className="flex items-center gap-2 text-destructive hover:underline font-medium"
                  >
                    <Phone className="h-4 w-4" />
                    +91-9820466726
                  </a>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    24/7 confidential support
                  </div>
                </div>

                <div className="bg-destructive/5 p-4 rounded-lg border border-destructive/20">
                  <h3 className="font-semibold text-lg mb-2">iCALL (TISS Mumbai)</h3>
                  <p className="text-sm text-muted-foreground mb-3">Professional counseling service</p>
                  <div className="space-y-1">
                    <a
                      href="tel:02225521111"
                      className="flex items-center gap-2 text-destructive hover:underline font-medium"
                    >
                      <Phone className="h-4 w-4" />
                      022-25521111
                    </a>
                    <a
                      href="tel:+919152987821"
                      className="flex items-center gap-2 text-destructive hover:underline font-medium"
                    >
                      <Phone className="h-4 w-4" />
                      +91-9152987821
                    </a>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Mon-Sat: 10 AM - 8 PM
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Immediate Coping Strategies */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Right Now: Immediate Coping
            </CardTitle>
            <CardDescription>Simple techniques to help you through this moment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h3 className="font-semibold mb-2">5-4-3-2-1 Grounding</h3>
                  <p className="text-sm text-muted-foreground mb-2">Focus on your senses to stay present:</p>
                  <ul className="text-sm space-y-1">
                    <li>• 5 things you can SEE</li>
                    <li>• 4 things you can TOUCH</li>
                    <li>• 3 things you can HEAR</li>
                    <li>• 2 things you can SMELL</li>
                    <li>• 1 thing you can TASTE</li>
                  </ul>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h3 className="font-semibold mb-2">Box Breathing</h3>
                  <p className="text-sm text-muted-foreground mb-2">Calm your nervous system:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Breathe in for 4 seconds</li>
                    <li>• Hold for 4 seconds</li>
                    <li>• Breathe out for 4 seconds</li>
                    <li>• Hold for 4 seconds</li>
                    <li>• Repeat 4-6 times</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h3 className="font-semibold mb-2">Reach Out</h3>
                  <p className="text-sm text-muted-foreground mb-2">You don't have to face this alone:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Call a trusted friend or family member</li>
                    <li>• Text someone who cares about you</li>
                    <li>• Go to a safe, public place</li>
                    <li>• Stay with someone you trust</li>
                  </ul>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h3 className="font-semibold mb-2">Safety Planning</h3>
                  <p className="text-sm text-muted-foreground mb-2">Remove immediate risks:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Put away anything that could cause harm</li>
                    <li>• Ask someone to stay with you</li>
                    <li>• Go to a hospital if needed</li>
                    <li>• Call emergency services: 112</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Help */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Professional Support
            </CardTitle>
            <CardDescription>Long-term support from qualified professionals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold mb-2">Mental Health Professionals</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Consider reaching out to qualified therapists, counselors, or psychiatrists who can provide ongoing
                  support.
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Clinical psychologists</li>
                  <li>• Licensed counselors</li>
                  <li>• Psychiatrists (for medication if needed)</li>
                  <li>• Social workers specializing in mental health</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold mb-2">Support Groups</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Connect with others who understand what you're going through.
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Local mental health support groups</li>
                  <li>• Online communities (moderated)</li>
                  <li>• Peer support programs</li>
                  <li>• Recovery-focused groups</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Return to Chat */}
        <div className="text-center">
          <Link href="/chat">
            <Button size="lg" className="mr-4">
              <MessageCircle className="h-5 w-5 mr-2" />
              Continue Talking to MannMitra
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">
              Return to Home
            </Button>
          </Link>
        </div>

        {/* Important Note */}
        <Alert className="mt-8 bg-yellow-50 border-yellow-200">
          <AlertDescription className="text-center">
            <strong>Remember:</strong> MannMitra is here to support you, but we are not a replacement for professional
            mental health care. If you're in crisis, please reach out to the resources above or emergency services.
          </AlertDescription>
        </Alert>
      </main>
    </div>
  )
}
