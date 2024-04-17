import {Job, JobVector} from "../../common/interfaces/job.interface";
import {NotFoundError} from "../../common/errors/NotFoundError";
import OpenAiUtils from "../../common/utils/openai.utils";
import {IJobRepository} from "../../common/repositories/jobs/IJobRepository";
import {JobRepository} from "../../common/repositories/jobs/JobRepository";

const jobRepository: IJobRepository = new JobRepository();

const JobsService = {
    async getJobById(id: string): Promise<Job> {
        const job = await jobRepository.getJobById(id);
        if (!job) {
            throw new NotFoundError();
        }
        return job;
    },

    async getAllJobVectors(limit: number, page: number, search: string): Promise<JobVector[]> {
        const search_embedding = await OpenAiUtils.createVectorEmbedding(search);

        const jobs = await jobRepository.getAllJobVectors(search_embedding);

        const startIndex = page * limit;
        const endIndex = startIndex + limit;
        return jobs.slice(startIndex, endIndex);
    }
};

export default JobsService;