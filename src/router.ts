import express, { Router } from 'express';
import candidatesRouter from "./modules/candidates/candidates.router";

const router: Router = express.Router();

router.use('/candidates', candidatesRouter);

export default router;
