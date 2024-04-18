"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = __importDefault(require("pg"));
const database_config_1 = __importDefault(require("../repositories/database.config"));
const NotFoundError_1 = require("../errors/NotFoundError");
dotenv_1.default.config();
const PostgreDatabaseUtils = {
    async queryPostgreDatabase(sqlQuery) {
        const client = new pg_1.default.Client(database_config_1.default);
        await client.connect();
        try {
            const res = await client.query(sqlQuery);
            if (res.rows.length === 0) {
                throw new NotFoundError_1.NotFoundError();
            }
            return res.rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
        finally {
            await client.end();
        }
    }
};
exports.default = PostgreDatabaseUtils;
