import express, { Router } from 'express';
import candidatesRouter from "./modules/candidates/candidates.router";
import jobsRouter from "./modules/jobs/jobs.router";

const router: Router = express.Router();

router.use('/candidates', candidatesRouter);
router.use('/jobs', jobsRouter);

export default router;
