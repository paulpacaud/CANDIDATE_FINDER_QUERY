import {Candidate} from "../../interfaces/candidate.interface";
import {Job} from "../../interfaces/job.interface";

export interface ICandidateRepository {
    getAllCandidates(): Promise<Candidate[]>;
    getCandidateById(candidateId: string): Promise<Candidate>;
    findBestCandidatesForJob(Job: Job,  numberOfCandidates: number): Promise<Candidate[]>;
}