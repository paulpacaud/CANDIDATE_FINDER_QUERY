import dotenv from 'dotenv';
import {Pinecone, QueryResponse} from '@pinecone-database/pinecone'
import {CandidateVector} from "../interfaces/candidate.interface";

dotenv.config();

const PineconeUtils = {
    async queryVectorDatabase(query_vector: number[], namespace: string, topK: number = 10000): Promise<QueryResponse> {
        // @ts-ignore
        const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY })
        const index = pc.index("candidatefinder")

        return await index.namespace(namespace).query({
            vector: query_vector,
            topK,
            includeValues: false,
            includeMetadata: true
        });
    }
};

export default PineconeUtils;


