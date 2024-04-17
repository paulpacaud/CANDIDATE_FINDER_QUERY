import {CandidateDtos} from "./candidates.dtos";
import validator from "../../common/middlewares/validator.middleware";
import {CandidatesController} from "./candidates.controller";
import {Router} from "express";

const candidatesRouter = Router();


candidatesRouter.post('/job-matching/',
    validator.body(CandidateDtos.findBestCandidatesForJob),
    CandidatesController.findBestCandidatesForJob);

candidatesRouter.get('/:id',
    validator.params(CandidateDtos.getCandidateById),
    CandidatesController.getCandidateById);

candidatesRouter.get('/',
    CandidatesController.getAllCandidates);
export default candidatesRouter;