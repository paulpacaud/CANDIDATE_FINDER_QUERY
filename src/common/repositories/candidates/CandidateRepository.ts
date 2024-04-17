import {Candidate,CandidateVector} from "../../interfaces/candidate.interface";
import {ICandidateRepository} from "./ICandidateRepository";
import PineconeUtils from "../../utils/pinecone.utils";
import PostgreDatabaseUtils from "../../utils/postgreDatabase.utils";
export class CandidateRepository implements ICandidateRepository {

    public async getAllCandidateVectors(search_embedding: number[], numberOfCandidates: number = 10000): Promise<CandidateVector[]> {
        const raw_vectors = await PineconeUtils.queryVectorDatabase(search_embedding, 'candidates', numberOfCandidates);

        const candidate_vectors = raw_vectors.matches.map(candidate => ({
            // @ts-ignore
            name: candidate.metadata.Nom,
            id: candidate.id
        }));

        // @ts-ignore
        return candidate_vectors;
    }

    public async getCandidateById(candidateId: string): Promise<Candidate> {
        const candidate = await PostgreDatabaseUtils.queryPostgreDatabase(`SELECT * FROM candidates WHERE id = ${candidateId}`);
        return candidate[0];
    }
}