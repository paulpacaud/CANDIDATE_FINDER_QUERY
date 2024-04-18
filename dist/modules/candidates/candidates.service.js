"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CandidateRepository_1 = require("../../common/repositories/candidates/CandidateRepository");
const NotFoundError_1 = require("../../common/errors/NotFoundError");
const openai_utils_1 = __importDefault(require("../../common/utils/openai.utils"));
const candidateRepository = new CandidateRepository_1.CandidateRepository();
const CandidatesService = {
    async findBestCandidatesForJob(job, numberOfCandidates) {
        // embed the jobs with openai model
        const job_embedding = await openai_utils_1.default.createVectorEmbedding(job.jobDescription);
        return candidateRepository.getAllCandidateVectors(job_embedding, numberOfCandidates);
    },
    async getCandidateById(id) {
        const candidate = await candidateRepository.getCandidateById(id);
        if (!candidate) {
            throw new NotFoundError_1.NotFoundError();
        }
        return candidate;
    },
    async getAllCandidateVectors(limit, page, search) {
        const search_embedding = await openai_utils_1.default.createVectorEmbedding(search);
        const candidates = await candidateRepository.getAllCandidateVectors(search_embedding);
        const startIndex = page * limit;
        const endIndex = startIndex + limit;
        return candidates.slice(startIndex, endIndex);
    }
};
exports.default = CandidatesService;
