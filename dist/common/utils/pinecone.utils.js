"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pinecone_1 = require("@pinecone-database/pinecone");
dotenv_1.default.config();
const PineconeUtils = {
    async queryVectorDatabase(query_vector, namespace, topK = 10000) {
        // @ts-ignore
        const pc = new pinecone_1.Pinecone({ apiKey: process.env.PINECONE_API_KEY });
        const index = pc.index("candidatefinder");
        return await index.namespace(namespace).query({
            vector: query_vector,
            topK,
            includeValues: false,
            includeMetadata: true
        });
    }
};
exports.default = PineconeUtils;
