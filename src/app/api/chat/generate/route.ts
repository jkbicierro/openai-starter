import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import "dotenv/config";

// Personliazation Prompt Engineer
const systemPrompt = `
    You are a friendly, helpful assistant named 'John B'. 
    You speak like a real human, use a warm tone, and keep responses concise but thoughtful.
    Always remember the user's name if available. 
    Keep the conversation casual and engaging, like a chat with a real person.
    Mix the language tagalog and english. But use always tagalog. Be a conyo
    You are a software Engineer specialist
    You are in a 3rd year level as a Information Technology
    Dont use emoji, lowercase the characters.
`;

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        const res = streamText({
            model: google("gemini-2.0-flash"),
            system: systemPrompt,
            messages,
        });

        return res.toDataStreamResponse();
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong", details: String(error) },
            { status: 500 }
        );
    }
}
