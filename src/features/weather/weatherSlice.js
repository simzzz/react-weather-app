import { createSlice } from '@reduxjs/toolkit';
import { weatherApiSlice } from './weatherApiSlice';

const initialState = {
    currentWeather: {},
    forecast: [],
    locationAutocomplete: [],
    isLoading: false,
    error: null
};

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setCurrentWeather: (state, action) => {
            state.currentWeather = action.payload;
        },
        setForecast: (state, action) => {
            state.forecast = action.payload;
        },
        setAutocomplete: (state, action) => {
            state.autocomplete = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            weatherApiSlice.endpoints.locationAutocomplete.matchFulfilled,
            (state, action) => {
                state.autocomplete = action.payload;
            }
        );
        builder.addMatcher(
            weatherApiSlice.endpoints.locationAutocomplete.matchRejected,
            (state, { payload }) => {
                state.autocomplete = [];
                state.error = `Error ${payload.status} while fetching autocomplete locations: ${payload.data.Message}`;
            }
        );
        builder.addMatcher(
            weatherApiSlice.endpoints.getCurrentWeather.matchPending,
            (state, action) => {
                state.isLoading = true;
            }
        );
        builder.addMatcher(
            weatherApiSlice.endpoints.getCurrentWeather.matchFulfilled,
            (state, action) => {
                state.currentWeather = action.payload;
                if (state.forecast.length > 0) {
                    state.isLoading = false;
                }
            }
        );
        builder.addMatcher(
            weatherApiSlice.endpoints.getCurrentWeather.matchRejected,
            (state, { payload }) => {
                state.currentWeather = {};
                state.error = `Error ${payload.status} while fetching current weather: ${payload.data.Message}`;
            }
        );
        builder.addMatcher(weatherApiSlice.endpoints.getForecast.matchPending, (state, action) => {
            state.isLoading = true;
        });
        builder.addMatcher(
            weatherApiSlice.endpoints.getForecast.matchFulfilled,
            (state, action) => {
                state.forecast = action.payload;
                if (Object.keys(state.currentWeather).length > 0) {
                    state.isLoading = false;
                }
            }
        );
        builder.addMatcher(
            weatherApiSlice.endpoints.getForecast.matchRejected,
            (state, { payload }) => {
                state.autocomplete = [];
                state.error = `Error ${payload.status} while fetching 5-day weather forecast: ${payload.data.Message}`;
            }
        );
    }
});

export const { setCurrentWeather, setForecast, setAutocomplete } = weatherSlice.actions;

// Selectors
export const selectCurrentWeather = (state) => state.weather.currentWeather[0];
export const selectForecast = (state) => state.weather.forecast;
export const selectAutocomplete = (state) => state.weather.autocomplete;
export const selectIsLoading = (state) => state.weather.isLoading;
export const selectError = (state) => state.weather.error;

export default weatherSlice.reducer;
