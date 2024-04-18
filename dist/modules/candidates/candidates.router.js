"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const candidates_dtos_1 = require("./candidates.dtos");
const validator_middleware_1 = __importDefault(require("../../common/middlewares/validator.middleware"));
const candidates_controller_1 = require("./candidates.controller");
const express_1 = require("express");
const candidatesRouter = (0, express_1.Router)();
candidatesRouter.post('/job-matching/', validator_middleware_1.default.body(candidates_dtos_1.CandidateDtos.findBestCandidatesForJob), candidates_controller_1.CandidatesController.findBestCandidatesForJob);
candidatesRouter.get('/:id', validator_middleware_1.default.params(candidates_dtos_1.CandidateDtos.getCandidateById), candidates_controller_1.CandidatesController.getCandidateById);
candidatesRouter.get('/', validator_middleware_1.default.params(candidates_dtos_1.CandidateDtos.getAllCandidates), candidates_controller_1.CandidatesController.getAllCandidates);
exports.default = candidatesRouter;
