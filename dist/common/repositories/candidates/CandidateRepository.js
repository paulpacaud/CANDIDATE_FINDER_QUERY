"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateRepository = void 0;
const pinecone_utils_1 = __importDefault(require("../../utils/pinecone.utils"));
const postgreDatabase_utils_1 = __importDefault(require("../../utils/postgreDatabase.utils"));
class CandidateRepository {
    async getAllCandidateVectors(search_embedding, numberOfCandidates = 10000) {
        const raw_vectors = await pinecone_utils_1.default.queryVectorDatabase(search_embedding, 'candidates', numberOfCandidates);
        const candidate_vectors = raw_vectors.matches.map(candidate => ({
            // @ts-ignore
            name: candidate.metadata.Nom,
            id: candidate.id
        }));
        // @ts-ignore
        return candidate_vectors;
    }
    async getCandidateById(candidateId) {
        const candidate = await postgreDatabase_utils_1.default.queryPostgreDatabase(`SELECT * FROM candidates WHERE id = ${candidateId}`);
        return candidate[0];
    }
}
exports.CandidateRepository = CandidateRepository;
