import {ClientConfig} from "pg";

const db_config: ClientConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    ssl: process.env.DB_SSL === 'true'
};

export default db_config;