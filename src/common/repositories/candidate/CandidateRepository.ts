import {Candidate} from "../../interfaces/candidate.interface";
import {Job} from "../../interfaces/job.interface";
import {ICandidateRepository} from "./ICandidateRepository";
import pg from 'pg';
import db_config from "../database.config";
import {NotFoundError} from "../../errors/NotFoundError";
export class CandidateRepository implements ICandidateRepository {

    public async getAllCandidates(): Promise<Candidate[]> {
        const client = new pg.Client(db_config);
        await client.connect();

        try {
            let query = `SELECT * FROM candidates`;
            const res = await client.query(query);
            return res.rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
        finally {
            await client.end();
        }
    }

    public async getCandidateById(candidateId: string): Promise<Candidate> {
        const client = new pg.Client(db_config);
        await client.connect();

        try {
            let query = `SELECT * FROM candidates WHERE id = '${candidateId}`;
            const res = await client.query(query);
            if (res.rows.length === 0) {
                throw new NotFoundError();
            }
            return res.rows[0]; // Return the first candidate found
        } catch (err) {
            console.log(err);
            throw err;
        }
        finally {
            await client.end();
        }
    }

    public async findBestCandidatesForJob(job_embedding: number[],  numberOfCandidates: number): Promise<Candidate[]> {
        // query pinecone to find the most similar candidates with respect to the job_embedding

    }
}