import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const OpenAiUtils = {
    async createVectorEmbedding(data: string): Promise<number[]> {
        const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const response = await client.embeddings.create({
            input: data,
            model: "text-embedding-3-small"
        });
        return response.data[0].embedding;
    }
};

export default OpenAiUtils;


