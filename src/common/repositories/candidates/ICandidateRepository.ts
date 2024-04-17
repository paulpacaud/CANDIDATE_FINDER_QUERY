import {Candidate, CandidateVector} from "../../interfaces/candidate.interface";
export interface ICandidateRepository {
    getAllCandidateVectors(search_embedding: number[], numberOfCandidates?: number): Promise<CandidateVector[]>;
    getCandidateById(candidateId: string): Promise<Candidate>;
}