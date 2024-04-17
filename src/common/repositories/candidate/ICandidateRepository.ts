import {Candidate} from "../../interfaces/candidate.interface";
import {Job} from "../../interfaces/job.interface";

export interface ICandidateRepository {
    getAllCandidates(): Promise<Candidate[]>;
    getCandidateById(candidateId: string): Promise<Candidate>;
    findBestCandidatesForJob(job_embedding: number[],  numberOfCandidates: number): Promise<Candidate[]>;
}