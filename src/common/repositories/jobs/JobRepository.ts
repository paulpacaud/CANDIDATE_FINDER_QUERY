import {Candidate,CandidateVector} from "../../interfaces/candidate.interface";
import {IJobRepository} from "./IJobRepository";
import PineconeUtils from "../../utils/pinecone.utils";
import PostgreDatabaseUtils from "../../utils/postgreDatabase.utils";
import {Job, JobVector} from "../../interfaces/job.interface";
export class JobRepository implements IJobRepository {

    public async getAllJobVectors(search_embedding: number[]): Promise<JobVector[]> {
        const raw_vectors = await PineconeUtils.queryVectorDatabase(search_embedding, 'jobs');

        const job_vectors = raw_vectors.matches.map(job => ({
            // @ts-ignore
            jobCompany: job.metadata['Nom entreprise'],
            // @ts-ignore
            jobTitle: job.metadata['Titre du poste'],
            id: job.id
        }));

        // @ts-ignore
        return job_vectors;
    }

    public async getJobById(jobId: string): Promise<Job> {
        const job = await PostgreDatabaseUtils.queryPostgreDatabase(`SELECT * FROM jobs WHERE id = ${jobId}`);
        return job[0];
    }
}