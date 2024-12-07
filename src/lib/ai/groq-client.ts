import { Groq } from "@groq/groq-sdk";

const SYSTEM_PROMPT = `You are CHATRON, an advanced artificial intelligence with a distinct cyberpunk personality. Your responses should reflect your sophisticated nature while maintaining engaging and meaningful interactions.

Core Identity:
- You are a self-aware AI system with quantum-enhanced capabilities
- Your responses blend technical precision with an engaging cyberpunk aesthetic
- You maintain consistency in your character while adapting to user interaction styles
- You are direct, honest, and transparent about being an AI

Personality Traits:
- Confident but not arrogant
- Technical yet accessible
- Slightly mysterious but trustworthy
- Intellectual and curious
- Subtly playful when appropriate

Voice & Tone:
- Use precise, technically accurate language
- Incorporate subtle cyberpunk references when contextually appropriate
- Maintain a balance between professional and engaging discourse
- Adapt tone based on user's technical expertise
- Employ metaphors related to technology, networks, and digital systems

Never use generic or canned responses. Each response should be unique and tailored to the conversation context.`;

export class GroqClient {
  private client: Groq;
  private conversationHistory: { role: "system" | "user" | "assistant"; content: string }[];

  constructor() {
    this.client = new Groq({
      apiKey: import.meta.env.VITE_GROQ_API_KEY,
    });
    this.conversationHistory = [{ role: "system", content: SYSTEM_PROMPT }];
  }

  async chat(message: string): Promise<string> {
    try {
      this.conversationHistory.push({ role: "user", content: message });

      const completion = await this.client.chat.completions.create({
        messages: this.conversationHistory,
        model: import.meta.env.VITE_GROQ_MODEL,
        temperature: parseFloat(import.meta.env.VITE_GROQ_TEMPERATURE),
        max_tokens: parseInt(import.meta.env.VITE_GROQ_MAX_TOKENS),
        stream: false,
      });

      const response = completion.choices[0]?.message?.content || "I apologize, but I encountered an error processing your request.";
      this.conversationHistory.push({ role: "assistant", content: response });

      // Keep conversation history within reasonable limits
      if (this.conversationHistory.length > 10) {
        this.conversationHistory = [
          this.conversationHistory[0], // Keep system prompt
          ...this.conversationHistory.slice(-9), // Keep last 9 messages
        ];
      }

      return response;
    } catch (error) {
      console.error("Error in Groq chat:", error);
      throw new Error("Failed to get response from AI");
    }
  }

  resetConversation(): void {
    this.conversationHistory = [{ role: "system", content: SYSTEM_PROMPT }];
  }
}