"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
class UnauthorizedError extends Error {
    constructor(message = "You are not authorized to perform this action") {
        super(message);
        this.name = "NotAuthorizedError";
        this.statusCode = 401;
    }
}
exports.UnauthorizedError = UnauthorizedError;
