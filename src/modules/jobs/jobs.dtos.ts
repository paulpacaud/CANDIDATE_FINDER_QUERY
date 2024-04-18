import Joi from 'joi';
import {Job, JobQuery} from "../../common/interfaces/job.interface";

export const JobsDtos = {
    getJobById: Joi.object({
        id: Joi.string().required()
    }),

    getAllJobs: Joi.object({
        limit: Joi.number().required().min(1).max(100),
        page: Joi.number().required().min(0),
        search: Joi.string().required().min(0).max(10000)
    }),
};