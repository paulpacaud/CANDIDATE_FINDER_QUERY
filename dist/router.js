"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const candidates_router_1 = __importDefault(require("./modules/candidates/candidates.router"));
const jobs_router_1 = __importDefault(require("./modules/jobs/jobs.router"));
const router = express_1.default.Router();
router.use('/candidates', candidates_router_1.default);
router.use('/jobs', jobs_router_1.default);
exports.default = router;
