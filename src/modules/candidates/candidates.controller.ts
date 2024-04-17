import { Request, Response } from 'express';
import CandidatesService from "./candidates.service";
import {JobQuery} from "../../common/interfaces/job.interface";

export const CandidatesController = {
    findBestCandidatesForJob: async (req: Request, res: Response): Promise<void> => {
        const { job, numberOfCandidates }: JobQuery = req.body;
        const candidates = await CandidatesService.findBestCandidatesForJob(job, numberOfCandidates);
        res.json({ candidates });
    },

    getCandidateById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const candidate = await CandidatesService.getCandidateById(id);
        res.json({ candidate });
    },

    getAllCandidates: async (req: Request, res: Response): Promise<void> => {
        const candidates = await CandidatesService.getAllCandidates();
        res.json({ candidates });
    }
};
