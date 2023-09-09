import { createSlice } from '@reduxjs/toolkit';

// Stored in local storage as well as it should make sense for them to be saved after reload
const initialState = {
    mode: localStorage.getItem('mode')
        ? localStorage.getItem('mode')
        : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
    favorites: JSON.parse(localStorage.getItem('favorites')) || {},
    unit: localStorage.getItem('unit') || 'Metric'
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeMode: (state) => {
            if (state.mode === 'light') {
                state.mode = 'dark';
                localStorage.setItem('mode', 'dark');
            } else {
                state.mode = 'light';
                localStorage.setItem('mode', 'light');
            }
        },
        changeUnit: (state) => {
            if (state.unit === 'Metric') {
                state.unit = 'Imperial';
                localStorage.setItem('unit', 'Imperial');
            } else {
                state.unit = 'Metric';
                localStorage.setItem('unit', 'Metric');
            }
        },
        addToFavorites: (state, action) => {
            const { id, name, currentWeather } = action.payload;
            state.favorites[id] = { id, name, currentWeather };
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        removeFromFavorites: (state, action) => {
            const { id } = action.payload;
            delete state.favorites[id];
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        }
    }
});

export const { changeMode, changeUnit, addToFavorites, removeFromFavorites } = userSlice.actions;

export const selectMode = (state) => state.user.mode;
export const selectFavorites = (state) => state.user.favorites;
export const selectIsFavorite = (state, itemId) => {
    return !!state.user.favorites[itemId];
};
export const selectUnit = (state) => state.user.unit;

export default userSlice.reducer;
