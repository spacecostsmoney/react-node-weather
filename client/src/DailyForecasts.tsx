export type DailyForecast = {
    id: number,
    name: string,
    temperature: string
    icon: string,
    detailedForecast: string
}

type Props = {
    forecasts: DailyForecast[]
}

export const DailyForecasts = ({forecasts}: Props) => {
    return (
        <div className="grid gap-6 grid-cols-2 mt-4">
            {forecasts.map((f) => {
                return (
                    <div key={f.id}
                        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600">
                        <img
                            className="rounded-lg h-86 w-86 ml-2"
                            src={f.icon} alt=""/>
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{f.name} ({f.temperature})</h4>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{f.detailedForecast}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};
