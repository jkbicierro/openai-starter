import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import "dotenv/config";

async function main() {
    try {
        const { text } = await generateText({
            model: google("gemini-2.0-flash"),
            prompt: "Write a vegetarian lasagna recipe for 4 people.",
        });

        console.log(text);
    } catch (err) {
        console.error(err);
    }
}

main();
