import {FormEvent, useState} from "react";
import {DailyForecast} from "./DailyForecasts.tsx";

type ForecastRequest = {
    street: string;
    zipcode: string;
}

type Props = {
    setDailyForecasts: (dailyForecasts: DailyForecast[] | undefined) => void,
}

export const SearchForm = ({setDailyForecasts}: Props) => {
    const [formData, setFormData] = useState<ForecastRequest>({
        street: '',
        zipcode: ''
    });
    const [errors, setErrors] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setDailyForecasts(undefined);
        setErrors('');

        const search = new URLSearchParams({
            street: formData.street,
            zipcode: formData.zipcode,
        });


        const data = await fetch(`http://localhost:3000/weather?${search}`)

        if (!data.ok) {
            const error = await data.json();
            setErrors(`Error getting weather data: ${error.message}`)
        }

        setDailyForecasts(await data.json());
    }

    return (
        <div>
            <form onSubmit={handleSubmit}
                  className="rounded-lg bg-cyan-900 dark:bg-slate-500 p-4 text-center w-3/5 mx-auto">
                <label htmlFor="street"
                       className='inline-block mb-2 text-sm font-medium text-gray-900 dark:text-white mr-2 text-left'>Street
                    Address
                    <input id="street" name="street" type='text' required
                           onInput={(text) => setFormData({...formData, street: text.currentTarget.value})}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </label>
                <label htmlFor="zipcode"
                       className='inline-block mb-2 text-sm font-medium text-gray-900 dark:text-white mr-2 text-left'>Zip
                    Code
                    <input id="zipcode" name="zipcode" type="text" pattern="[0-9]{5}" title="Five digit zip code"
                           required onInput={(text) => setFormData({...formData, zipcode: text.currentTarget.value})}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </label>
                <button type="submit"
                        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Search
                </button>
            </form>
            <div className='mt-2 text-red-600 dark:text-red-400 text-lg text-center'>
                {errors}
            </div>
        </div>
    )
};
