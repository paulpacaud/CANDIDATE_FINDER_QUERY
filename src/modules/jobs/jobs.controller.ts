import { Request, Response } from 'express';
import JobsService from "./jobs.service";
import {JobQuery} from "../../common/interfaces/job.interface";

export const JobsController = {
    getJobById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const job = await JobsService.getJobById(id);
        res.json({ job });
    },

    getAllJobs: async (req: Request, res: Response): Promise<void> => {
        const jobs = await JobsService.getAllJobVectors(req.body.limit, req.body.page, req.body.search);
        res.json({ jobs });
    }
};
