"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
function errorMiddleware(err, req, res, next) {
    const statusCode = err.statusCode || 500; // Internal Server Error as a fallback
    const message = err.message || 'An unexpected error occurred';
    res.status(statusCode).json({ error: err.name, message });
}
exports.errorMiddleware = errorMiddleware;
