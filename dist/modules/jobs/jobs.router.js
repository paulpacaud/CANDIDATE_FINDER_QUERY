"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobs_dtos_1 = require("./jobs.dtos");
const validator_middleware_1 = __importDefault(require("../../common/middlewares/validator.middleware"));
const jobs_controller_1 = require("./jobs.controller");
const express_1 = require("express");
const jobsRouter = (0, express_1.Router)();
jobsRouter.get('/:id', validator_middleware_1.default.params(jobs_dtos_1.JobsDtos.getJobById), jobs_controller_1.JobsController.getJobById);
jobsRouter.get('/', jobs_controller_1.JobsController.getAllJobs);
exports.default = jobsRouter;
