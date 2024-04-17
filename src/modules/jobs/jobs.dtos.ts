import Joi from 'joi';
import {Job, JobQuery} from "../../common/interfaces/job.interface";

export const JobsDtos = {
    getJobById: Joi.object({
        id: Joi.string().required()
    }),
};