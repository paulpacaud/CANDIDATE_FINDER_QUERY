import {Job, JobVector} from "../../interfaces/job.interface";
export interface IJobRepository {
    getAllJobVectors(search_embedding: number[]): Promise<JobVector[]>;

    getJobById(jobId: string): Promise<Job>;
}