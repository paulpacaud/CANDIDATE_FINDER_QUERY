import dotenv from 'dotenv';
import {Candidate} from "../interfaces/candidate.interface";
import pg from "pg";
import db_config from "../repositories/database.config";
import {NotFoundError} from "../errors/NotFoundError";

dotenv.config();

const PostgreDatabaseUtils = {
    async queryPostgreDatabase(sqlQuery: string): Promise<any[]> {
        const client = new pg.Client(db_config);
        await client.connect();

        try {
            const res = await client.query(sqlQuery);
            if (res.rows.length === 0) {
                throw new NotFoundError();
            }
            return res.rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
        finally {
            await client.end();
        }
    }
};

export default PostgreDatabaseUtils;


