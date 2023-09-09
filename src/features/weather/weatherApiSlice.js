import { appApi } from '../../app/api/apiSlice.js';

const apikey = import.meta.env.VITE_WEATHER_KEY;

export const weatherApiSlice = appApi.injectEndpoints({
    endpoints: (builder) => ({
        locationAutocomplete: builder.mutation({
            query: (q) => ({
                url: 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete',
                method: 'GET',
                params: {
                    apikey,
                    q
                }
            })
        }),
        getCurrentWeather: builder.mutation({
            query: (locationKey) => ({
                url: `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`,
                method: 'GET',
                params: {
                    apikey,
                    details: true
                }
            })
        }),
        getForecast: builder.mutation({
            query: (locationKey) => ({
                url: `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`,
                method: 'GET',
                params: {
                    apikey,
                    metric: true
                }
            })
        })
    })
});

export const {
    useLocationAutocompleteMutation,
    useGetCurrentWeatherMutation,
    useGetForecastMutation
} = weatherApiSlice;
