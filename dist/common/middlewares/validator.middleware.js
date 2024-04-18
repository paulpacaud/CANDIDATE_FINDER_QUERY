"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joiOptions = {
    abortEarly: false,
    convert: false,
    errors: {
        wrap: { label: '' },
    },
};
const validator = {
    body: (schema) => (req, res, next) => {
        const { error } = schema.validate(req.body, joiOptions);
        if (error) {
            const message = error.details.map((detail) => detail.message).join(', ');
            return res.status(400).json({ error: message });
        }
        next();
    },
    params: (schema) => (req, res, next) => {
        const { error } = schema.validate(req.params, joiOptions);
        if (error) {
            const message = error.details.map((detail) => detail.message).join(', ');
            return res.status(400).json({ error: message });
        }
        next();
    },
    query: (schema) => (req, res, next) => {
        const { error } = schema.validate(req.query, joiOptions);
        if (error) {
            const message = error.details.map((detail) => detail.message).join(', ');
            return res.status(400).json({ error: message });
        }
        next();
    },
};
exports.default = validator;
