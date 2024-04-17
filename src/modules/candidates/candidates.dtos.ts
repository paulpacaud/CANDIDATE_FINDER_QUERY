import Joi from 'joi';
import {Job, JobQuery} from "../../common/interfaces/job.interface";

export const CandidateDtos = {
    findBestCandidatesForJob: Joi.object<JobQuery>({
        job: Joi.object<Job>({
            jobTitle: Joi.string().required().min(1).max(200),
            jobDescription: Joi.string().required().min(0).max(10000),
            jobCompany: Joi.string().min(0).max(150),
        }).required(),
        numberOfCandidates: Joi.number().required().min(1).max(100)
    }),

    getCandidateById: Joi.object({
        id: Joi.string().required()
    }),
};