import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: parseInt(process.env.PORT || '8080', 10),
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_PORT: process.env.DB_PORT,
    DB_SSL: process.env.DB_SSL || 'true',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PINECONE_API_KEY: process.env.PINECONE_API_KEY
};