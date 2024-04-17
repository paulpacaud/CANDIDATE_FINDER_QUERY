import { Job } from "../../common/interfaces/job.interface";
import { Candidate } from "../../common/interfaces/candidate.interface";
import {CandidateRepository} from "../../common/repositories/candidate/CandidateRepository";
import {NotFoundError} from "../../common/errors/NotFoundError";
import {ICandidateRepository} from "../../common/repositories/candidate/ICandidateRepository";

const candidateRepository: ICandidateRepository = new CandidateRepository();

const CandidatesService = {
    async findBestCandidatesForJob(job: Job, numberOfCandidates: number): Promise<Candidate[]> {
        return candidateRepository.findBestCandidatesForJob(job, numberOfCandidates);
    },

    async getCandidateById(id: string): Promise<Candidate> {
        const candidate = await candidateRepository.getCandidateById(id);
        if (!candidate) {
            throw new NotFoundError();
        }
        return candidate;
    },

async getAllCandidates(): Promise<Candidate[]> {
        return candidateRepository.getAllCandidates();
    }
};

export default CandidatesService;