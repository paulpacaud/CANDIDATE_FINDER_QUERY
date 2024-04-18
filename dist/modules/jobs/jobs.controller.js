"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsController = void 0;
const jobs_service_1 = __importDefault(require("./jobs.service"));
exports.JobsController = {
    getJobById: async (req, res) => {
        const { id } = req.params;
        const job = await jobs_service_1.default.getJobById(id);
        res.json({ job });
    },
    getAllJobs: async (req, res) => {
        const jobs = await jobs_service_1.default.getAllJobVectors(req.body.limit, req.body.page, req.body.search);
        res.json({ jobs });
    }
};
