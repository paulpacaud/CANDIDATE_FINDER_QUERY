import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

interface JoiOptions {
    abortEarly: boolean;
    convert: boolean;
    errors: {
        wrap: { label: string };
    };
}

const joiOptions: JoiOptions = {
    abortEarly: false,
    convert: false,
    errors: {
        wrap: { label: '' },
    },
};

const validator = {
    body: (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, joiOptions);
        if (error) {
            const message = error.details.map((detail) => detail.message).join(', ');
            return res.status(400).json({ error: message });
        }
        next();
    },

    params: (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.params, joiOptions);
        if (error) {
            const message = error.details.map((detail) => detail.message).join(', ');
            return res.status(400).json({ error: message });
        }
        next();
    },

    query: (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.query, joiOptions);
        if (error) {
            const message = error.details.map((detail) => detail.message).join(', ');
            return res.status(400).json({ error: message });
        }
        next();
    },
};

export default validator;
