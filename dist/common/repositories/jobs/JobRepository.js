"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRepository = void 0;
const pinecone_utils_1 = __importDefault(require("../../utils/pinecone.utils"));
const postgreDatabase_utils_1 = __importDefault(require("../../utils/postgreDatabase.utils"));
class JobRepository {
    async getAllJobVectors(search_embedding) {
        const raw_vectors = await pinecone_utils_1.default.queryVectorDatabase(search_embedding, 'jobs');
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
    async getJobById(jobId) {
        const job = await postgreDatabase_utils_1.default.queryPostgreDatabase(`SELECT * FROM jobs WHERE id = ${jobId}`);
        return job[0];
    }
}
exports.JobRepository = JobRepository;
