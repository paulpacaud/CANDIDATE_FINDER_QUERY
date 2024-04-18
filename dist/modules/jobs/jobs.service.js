"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundError_1 = require("../../common/errors/NotFoundError");
const openai_utils_1 = __importDefault(require("../../common/utils/openai.utils"));
const JobRepository_1 = require("../../common/repositories/jobs/JobRepository");
const jobRepository = new JobRepository_1.JobRepository();
const JobsService = {
    async getJobById(id) {
        const job = await jobRepository.getJobById(id);
        if (!job) {
            throw new NotFoundError_1.NotFoundError();
        }
        return job;
    },
    async getAllJobVectors(limit, page, search) {
        const search_embedding = await openai_utils_1.default.createVectorEmbedding(search);
        const jobs = await jobRepository.getAllJobVectors(search_embedding);
        const startIndex = page * limit;
        const endIndex = startIndex + limit;
        return jobs.slice(startIndex, endIndex);
    }
};
exports.default = JobsService;
