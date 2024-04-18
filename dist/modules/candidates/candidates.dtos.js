"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateDtos = void 0;
const joi_1 = __importDefault(require("joi"));
exports.CandidateDtos = {
    findBestCandidatesForJob: joi_1.default.object({
        job: joi_1.default.object({
            jobTitle: joi_1.default.string().required().min(1).max(200),
            jobDescription: joi_1.default.string().required().min(0).max(10000),
            jobCompany: joi_1.default.string().min(0).max(150),
        }).required(),
        numberOfCandidates: joi_1.default.number().required().min(1).max(100)
    }),
    getCandidateById: joi_1.default.object({
        id: joi_1.default.string().required()
    }),
    getAllCandidates: joi_1.default.object({
        limit: joi_1.default.number().required().min(1).max(100),
        page: joi_1.default.number().required().min(0),
        search: joi_1.default.string().required().min(0).max(10000)
    }),
};
