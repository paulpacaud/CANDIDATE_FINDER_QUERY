"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const http_1 = __importDefault(require("http"));
const error_middleware_1 = require("./common/middlewares/error.middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/v1', router_1.default);
app.use(error_middleware_1.errorMiddleware);
const port = 8080;
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.info(`Server is listening on port ${port}`);
});
