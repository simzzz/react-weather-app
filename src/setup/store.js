import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice.js';
import weatherReducer from '../features/weather/weatherSlice.js';
import { appApi } from '../app/api/apiSlice.js';

const store = configureStore({
    reducer: {
        [appApi.reducerPath]: appApi.reducer,
        user: userReducer,
        weather: weatherReducer
    },
    devTools: false
});

export default store;
