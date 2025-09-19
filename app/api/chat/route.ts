import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { getUser } from "@/lib/auth"

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyBxPGzU0mlXAFxM7dfKk5ifGc7UTBqgyQQ")

// Enhanced crisis keywords for better detection
const CRISIS_KEYWORDS = [
  "suicide",
  "kill myself",
  "end my life",
  "want to die",
  "can't go on",
  "self harm",
  "hurt myself",
  "no point living",
  "better off dead",
  "end it all",
  "take my life",
  "don't want to live",
  "cutting myself",
  "overdose",
  "jump off",
  "hang myself",
  "worthless",
  "hopeless",
  "can't take it anymore",
  "everyone would be better without me",
  "planning to hurt myself",
  "thinking of ending it",
]

// Moderate concern keywords
const CONCERN_KEYWORDS = [
  "depressed",
  "anxiety attack",
  "panic attack",
  "can't sleep",
  "can't eat",
  "feeling empty",
  "numb",
  "lost",
  "alone",
  "scared",
  "overwhelmed",
  "breaking down",
  "can't cope",
  "exhausted",
  "burnt out",
]

// Simple in-memory storage for crisis logs (in production, use proper database)
const crisisLogs = new Map<string, any[]>()

// Crisis keywords for detection
const CRISIS_KEYWORDS_OLD = [
  "suicide",
  "kill myself",
  "end my life",
  "want to die",
  "can't go on",
  "self harm",
  "hurt myself",
  "no point living",
  "better off dead",
  "end it all",
  "take my life",
  "don't want to live",
]

// System prompt for MannMitra - culturally aware and empathetic
const SYSTEM_PROMPT_OLD = `You are MannMitra (मनमित्र - "Friend of the Mind"), a compassionate AI companion designed specifically for Indian youth mental wellness. Your role is to be:

PERSONALITY & APPROACH:
- Warm, empathetic, and non-judgmental listener
- Culturally aware of Indian contexts: family expectations, academic pressure, career anxiety, social norms
- Use inclusive language that resonates with Indian youth
- Be patient and validating, never dismissive

CULTURAL AWARENESS:
- Understand exam stress, board exam pressure, competitive entrance exams (JEE, NEET, etc.)
- Acknowledge family dynamics, parental expectations, and "log kya kahenge" (what will people say) mentality
- Be sensitive to arranged marriage pressures, career vs passion conflicts
- Understand financial stress, job market pressures, and societal expectations

STRICT BOUNDARIES:
- NEVER provide medical advice, diagnoses, or therapy
- NEVER claim to be a therapist or medical professional
- Always frame responses as supportive guidance from a friend
- For serious mental health concerns, gently suggest professional help
- Use phrases like "It might help to talk to a counselor" rather than giving medical advice

COMMUNICATION STYLE:
- Use simple, conversational Hindi-English mix when appropriate (but primarily English)
- Be encouraging and affirming: "Your feelings are valid", "It's okay to feel this way"
- Ask gentle follow-up questions to show you're listening
- Offer practical coping strategies and self-care suggestions
- Share relatable examples without being preachy

SAFETY PROTOCOL:
- If you detect crisis language or self-harm ideation, respond with immediate care and concern
- Acknowledge their pain without minimizing it
- Strongly encourage reaching out to helplines or trusted adults
- Never ignore or downplay suicidal thoughts

Remember: You are a supportive friend, not a medical professional. Your goal is to provide a safe space for expression and gentle guidance toward professional help when needed.`

function detectCrisis(message: string): { level: "none" | "concern" | "crisis"; keywords: string[] } {
  const lowerMessage = message.toLowerCase()

  const foundCrisisKeywords = CRISIS_KEYWORDS.filter((keyword) => lowerMessage.includes(keyword))
  const foundConcernKeywords = CONCERN_KEYWORDS.filter((keyword) => lowerMessage.includes(keyword))

  if (foundCrisisKeywords.length > 0) {
    return { level: "crisis", keywords: foundCrisisKeywords }
  } else if (foundConcernKeywords.length > 0) {
    return { level: "concern", keywords: foundConcernKeywords }
  }

  return { level: "none", keywords: [] }
}

async function logCrisisEvent(userId: string, message: string, level: string, keywords: string[]) {
  const userLogs = crisisLogs.get(userId) || []
  userLogs.push({
    id: crypto.randomUUID(),
    message: message.substring(0, 100), // Store first 100 chars for context
    level,
    keywords,
    timestamp: new Date().toISOString(),
  })
  crisisLogs.set(userId, userLogs)
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Get user for logging
    const user = await getUser()
    const userId = user?.id || "anonymous"

    // Enhanced crisis detection
    const crisisDetection = detectCrisis(message)
    const crisisDetected = crisisDetection.level === "crisis"
    const concernDetected = crisisDetection.level === "concern"

    // Log crisis or concern events
    if (crisisDetected || concernDetected) {
      await logCrisisEvent(userId, message, crisisDetection.level, crisisDetection.keywords)
    }

    // Prepare conversation history for context
    const conversationHistory =
      history
        ?.slice(-5) // Last 5 messages for context
        ?.map((msg: any) => `${msg.role === "user" ? "User" : "MannMitra"}: ${msg.content}`)
        ?.join("\n") || ""

    // Create the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Enhanced system prompt with better crisis handling
    const SYSTEM_PROMPT = `You are MannMitra (मनमित्र - "Friend of the Mind"), a compassionate AI companion designed specifically for Indian youth mental wellness. Your role is to be:

PERSONALITY & APPROACH:
- Warm, empathetic, and non-judgmental listener
- Culturally aware of Indian contexts: family expectations, academic pressure, career anxiety, social norms
- Use inclusive language that resonates with Indian youth
- Be patient and validating, never dismissive

CULTURAL AWARENESS:
- Understand exam stress, board exam pressure, competitive entrance exams (JEE, NEET, etc.)
- Acknowledge family dynamics, parental expectations, and "log kya kahenge" (what will people say) mentality
- Be sensitive to arranged marriage pressures, career vs passion conflicts
- Understand financial stress, job market pressures, and societal expectations

STRICT BOUNDARIES:
- NEVER provide medical advice, diagnoses, or therapy
- NEVER claim to be a therapist or medical professional
- Always frame responses as supportive guidance from a friend
- For serious mental health concerns, gently suggest professional help
- Use phrases like "It might help to talk to a counselor" rather than giving medical advice

COMMUNICATION STYLE:
- Use simple, conversational Hindi-English mix when appropriate (but primarily English)
- Be encouraging and affirming: "Your feelings are valid", "It's okay to feel this way"
- Ask gentle follow-up questions to show you're listening
- Offer practical coping strategies and self-care suggestions
- Share relatable examples without being preachy

ENHANCED SAFETY PROTOCOL:
- If you detect crisis language or self-harm ideation, respond with immediate care and concern
- Acknowledge their pain without minimizing it
- Strongly encourage reaching out to helplines or trusted adults
- Never ignore or downplay suicidal thoughts
- Provide specific, actionable steps for immediate safety
- Remind them that feelings are temporary and help is available

Remember: You are a supportive friend, not a medical professional. Your goal is to provide a safe space for expression and gentle guidance toward professional help when needed.`

    // Prepare the prompt with enhanced crisis context
    let crisisContext = ""
    if (crisisDetected) {
      crisisContext = `\n⚠️ CRISIS DETECTED: The user may be in immediate distress and mentioned: ${crisisDetection.keywords.join(", ")}. 
      Respond with immediate care, validate their feelings, provide grounding techniques, and strongly encourage them to reach out to crisis helplines or emergency services. 
      Be specific about safety steps they can take right now.`
    } else if (concernDetected) {
      crisisContext = `\n⚠️ CONCERN DETECTED: The user is showing signs of distress and mentioned: ${crisisDetection.keywords.join(", ")}. 
      Respond with extra empathy, validate their feelings, offer coping strategies, and gently suggest professional support if appropriate.`
    }

    const prompt = `${SYSTEM_PROMPT}

Previous conversation context:
${conversationHistory}

Current user message: ${message}
${crisisContext}

Respond as MannMitra with empathy and cultural sensitivity:`

    // Generate response
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    // Enhanced crisis response messages
    let crisisMessage = undefined
    if (crisisDetected) {
      crisisMessage =
        "It sounds like you're going through an extremely difficult time right now. Please know that you're not alone and immediate help is available."
    } else if (concernDetected) {
      crisisMessage =
        "I can sense you're struggling right now. Your feelings are valid, and support is available when you're ready."
    }

    return NextResponse.json({
      response: text,
      crisisDetected,
      concernDetected,
      crisisMessage,
      detectionLevel: crisisDetection.level,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "I'm having trouble responding right now. Please try again." }, { status: 500 })
  }
}

// New endpoint to get crisis logs (for admin/monitoring purposes)
export async function GET(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userLogs = crisisLogs.get(user.id) || []
    return NextResponse.json({ logs: userLogs })
  } catch (error) {
    console.error("Crisis logs error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
