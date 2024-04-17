export class UnauthorizedError extends Error {
    statusCode: number;
    constructor(message: string = "You are not authorized to perform this action") {
        super(message);
        this.name = "NotAuthorizedError";
        this.statusCode = 401;
    }
}

