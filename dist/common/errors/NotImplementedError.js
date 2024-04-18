"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotImplementedError = void 0;
class NotImplementedError extends Error {
    constructor(message = "This feature has not been implemented yet.") {
        super(message);
        this.name = "NotImplementedError";
        this.statusCode = 501;
    }
}
exports.NotImplementedError = NotImplementedError;
