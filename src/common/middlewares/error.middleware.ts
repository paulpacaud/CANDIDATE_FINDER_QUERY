import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(err: Error & { statusCode?: number }, req: Request, res: Response, next: NextFunction): void {
    const statusCode = err.statusCode || 500;  // Internal Server Error as a fallback
    const message = err.message || 'An unexpected error occurred';

    res.status(statusCode).json({ error: err.name, message });
}