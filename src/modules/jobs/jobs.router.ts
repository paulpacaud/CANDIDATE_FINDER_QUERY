import {JobsDtos} from "./jobs.dtos";
import validator from "../../common/middlewares/validator.middleware";
import {JobsController} from "./jobs.controller";
import {Router} from "express";

const jobsRouter = Router();

jobsRouter.get('/:id',
    validator.params(JobsDtos.getJobById),
    JobsController.getJobById);

jobsRouter.get('/',
    JobsController.getAllJobs);
export default jobsRouter;