export class NotImplementedError extends Error {
    statusCode: number;
    constructor(message: string = "This feature has not been implemented yet.") {
        super(message);
        this.name = "NotImplementedError";
        this.statusCode = 501;
    }
}

