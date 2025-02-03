import ollama from "ollama"
import { HfInference } from "@huggingface/inference"

type AIClient = "ollama" | "huggingface"

const hfInference = new HfInference(process.env.HUGGINGFACE_API_KEY || "")

const cleanJsonResponse = (response: string): string => {
    // Find the first '[' and last ']' to extract just the JSON array
    const start = response.indexOf('[');
    const end = response.lastIndexOf(']') + 1;
    if (start === -1 || end === 0) return response;
    return response.slice(start, end);
}

const generateResponse = async (
    prompt: string,
    client: AIClient = "ollama",
    model: string = "llama3.2:latest"
): Promise<string> => {
    if (client === "ollama") {
        const response = await ollama.chat({
            model: model,
            messages: [{role: 'user', content: prompt}],
            stream: false,
        })
        return response.message.content;
    } else {
        const response = await hfInference.textGeneration({
            model: model,
            inputs: prompt,
            parameters:{
                max_new_tokens:1000,
                return_full_text: false,
                temperature: 1, 
                cache_level: 0 
            }
        })
        return response.generated_text;
    }
}

export {generateResponse};