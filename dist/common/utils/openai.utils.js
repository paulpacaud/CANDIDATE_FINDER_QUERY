"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const OpenAiUtils = {
    async createVectorEmbedding(data) {
        const client = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
        const response = await client.embeddings.create({
            input: data,
            model: "text-embedding-3-small"
        });
        return response.data[0].embedding;
    }
};
exports.default = OpenAiUtils;
