import {Job} from "../../common/interfaces/job.interface";
import {Candidate, CandidateVector} from "../../common/interfaces/candidate.interface";
import {CandidateRepository} from "../../common/repositories/candidates/CandidateRepository";
import {NotFoundError} from "../../common/errors/NotFoundError";
import {ICandidateRepository} from "../../common/repositories/candidates/ICandidateRepository";
import OpenAiUtils from "../../common/utils/openai.utils";

const candidateRepository: ICandidateRepository = new CandidateRepository();

const CandidatesService = {
    async findBestCandidatesForJob(job: Job, numberOfCandidates: number): Promise<CandidateVector[]> {
        // embed the jobs with openai model
        const job_embedding = await OpenAiUtils.createVectorEmbedding(job.jobDescription);

        return candidateRepository.getAllCandidateVectors(job_embedding, numberOfCandidates);
    },

    async getCandidateById(id: string): Promise<Candidate> {
        const candidate = await candidateRepository.getCandidateById(id);
        if (!candidate) {
            throw new NotFoundError();
        }
        return candidate;
    },

    async getAllCandidateVectors(limit: number, page: number, search: string): Promise<CandidateVector[]> {
        const search_embedding = await OpenAiUtils.createVectorEmbedding(search);

        const candidates = await candidateRepository.getAllCandidateVectors(search_embedding);

        const startIndex = page * limit;
        const endIndex = startIndex + limit;
        return candidates.slice(startIndex, endIndex);
    }
};

export default CandidatesService;