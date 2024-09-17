import express, {Express, NextFunction, Request, Response} from "express";
import {weatherRoutes} from "./weather/weather.route";
import {constants} from "node:http2";
import cors from 'cors';

const app: Express = express();
const port = process.env['PORT'] ?? 3000;
const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = constants;

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
}

app.use(cors(options));
app.use(express.json());
app.use('/weather', weatherRoutes);

const jsonErrorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res
        .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({message: err.message});
}

app.use(jsonErrorHandler);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
