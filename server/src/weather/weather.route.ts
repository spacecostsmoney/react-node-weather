import {NextFunction, Request, Response, Router} from "express";
import {getCoordinatesFromAddress} from "./service/GeoCoordinateService";
import {getWeatherFromCoordinates} from "./service/WeatherService";
import {constants} from "node:http2";

const { HTTP_STATUS_BAD_REQUEST } = constants;

export const weatherRoutes = Router();

interface Query {
    street: string;
    zipcode: string;
}

weatherRoutes.get('/', async (req: Request<{}, {}, {}, Query>, res: Response, next: NextFunction) => {
    const errors: string[] = [];

    if (!req.query) {
        errors.push("Must provide a street and zipcode query parameters");
    }

    const {street, zipcode} = req.query;

    if (!street) {
        errors.push("Must provide a street query parameter");
    }

    if (!zipcode) {
        errors.push("Must provide a zipcode query parameter");
    }

    if (zipcode.length !== 5) {
        errors.push("Zip code must be 5 characters long");
    }

    if (errors.length > 0) {
        res
            .status(HTTP_STATUS_BAD_REQUEST)
            .send(errors)
        return;
    }

    let coords;
    try {
        coords = await getCoordinatesFromAddress(street, zipcode);
    } catch (e: unknown) {
        next(e);
        return;
    }

    try {
        const forecast = await getWeatherFromCoordinates(coords);
        res.send(forecast);
    } catch (e: unknown) {
        next(e);
        return;
    }
});
