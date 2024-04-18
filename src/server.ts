import express, { Application } from 'express';
import cors from 'cors';
import router from './router';
import http from 'http';
import {errorMiddleware} from "./common/middlewares/error.middleware";
import {config} from "./common/server.config";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use('/v1', router);
app.use(errorMiddleware);

const port: number = 8080 ;

const server = http.createServer(app);

server.listen(port, () => {
  console.info(`Server is listening on port ${port}`);
});
