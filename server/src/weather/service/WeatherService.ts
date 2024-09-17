import {Coordinate} from "./GeoCoordinateService";

type PointsResponse = {
    properties: {
        forecast: string
    }
};

type DailyForecast = {
    id: number,
    name: string,
    temperature: string
    icon: string,
    detailedForecast: string
}

type ForecastResponse = {
    properties: {
        periods: Array<{
            number: number,
            name: string,
            temperature: number
            temperatureUnit: string,
            icon: string,
            detailedForecast: string
        }>
    }
}

export const getWeatherFromCoordinates = async ({x, y}: Coordinate): Promise<DailyForecast[]> => {
    const pointResponse = await fetch(`https://api.weather.gov/points/${y},${x}`, {
        headers: {
            "User-Agent": "agent"
        }
    })

    if (!pointResponse.ok) {
        throw new Error(`Could not find forecast for coordinates: ${y}, ${x}`);
    }

    const pointData: PointsResponse = await pointResponse.json();

    const response = await fetch(pointData.properties.forecast, {
        headers: {
            "User-Agent": "agent"
        }
    })

    if (!response.ok) {
        throw new Error(`Could not find forecast`);
    }

    const data: ForecastResponse = await response.json();

    return data.properties.periods.map((entry): DailyForecast => ({
        id: entry.number,
        name: entry.name,
        temperature: `${entry.temperature}° ${entry.temperatureUnit}`,
        icon: entry.icon,
        detailedForecast: entry.detailedForecast
    }));
}
