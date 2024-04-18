"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidatesController = void 0;
const candidates_service_1 = __importDefault(require("./candidates.service"));
exports.CandidatesController = {
    findBestCandidatesForJob: async (req, res) => {
        const { job, numberOfCandidates } = req.body;
        const candidates = await candidates_service_1.default.findBestCandidatesForJob(job, numberOfCandidates);
        res.json({ candidates });
    },
    getCandidateById: async (req, res) => {
        const { id } = req.params;
        const candidate = await candidates_service_1.default.getCandidateById(id);
        res.json({ candidate });
    },
    getAllCandidates: async (req, res) => {
        const candidates = await candidates_service_1.default.getAllCandidateVectors(req.body.limit, req.body.page, req.body.search);
        res.json({ candidates });
    }
};
