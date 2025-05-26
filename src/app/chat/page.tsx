"use client";

import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/components/ui/chat-message";
import { Input } from "@/components/ui/input";
import { TypingIndicator } from "@/components/ui/typing-indicator";
import { useChat } from "@ai-sdk/react";
import { ArrowUp, Github } from "lucide-react";

export default function Page() {
    return (
        <main className="h-dvh flex items-center justify-center">
            <Chat />
        </main>
    );
}

function Chat() {
    const { messages, input, handleInputChange, handleSubmit, status } =
        useChat({
            api: "/api/chat/generate",
        });

    return (
        // Outer container: fixed height, flex column
        <div className="h-[800px] w-[800px] flex flex-col rounded-lg border p-5">
            <div className=" pb-5 flex justify-between items-center">
                <span>Meet John B 👋</span>
                <Github size={16} />
            </div>

            {/* Scrollable messages area */}
            <div className="flex-1 overflow-y-auto pr-5">
                {messages.map((message) => (
                    <div key={message.id} className="py-1">
                        <ChatMessage
                            id={message.id}
                            role={message.role}
                            content={message.content}
                        />
                    </div>
                ))}
                {(status === "submitted" || status === "streaming") && (
                    <div>
                        {status === "submitted" && <TypingIndicator />}
                        <button type="button" onClick={() => stop()}>
                            Stop
                        </button>
                    </div>
                )}
            </div>

            {/* Input area */}
            <div className="mt-5 flex gap-2">
                <Input
                    placeholder="Ask John B.."
                    name="prompt"
                    value={input}
                    onChange={handleInputChange}
                    disabled={status !== "ready"}
                />

                <Button size="icon" onClick={handleSubmit}>
                    <ArrowUp />
                </Button>
            </div>
        </div>
    );
}
