import {SearchForm} from "./SearchForm.tsx";
import {DailyForecast, DailyForecasts} from "./DailyForecasts.tsx";
import {useState} from "react";

export const App = () => {
    const [forecasts, setForecasts] = useState<DailyForecast[] | undefined>(undefined);

    return <div className="container">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">7 Day Forecast
            Finder</h1>
        <SearchForm setDailyForecasts={setForecasts}/>
        {forecasts && <DailyForecasts forecasts={forecasts}/>}
    </div>
};
