import { appApi } from '../../app/api/apiSlice.js';

export const userApiSlice = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getFavorites: builder.mutation({
            query: () => ({
                url: 'http://localhost:3000/favorites',
                method: 'GET'
            })
        }),
        getSettings: builder.mutation({
            query: () => ({
                url: 'http://localhost:3000/settings',
                method: 'GET'
            })
        }),
        postFavorites: builder.mutation({
            query: (payload) => ({
                url: 'http://localhost:3000/favorites',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        }),
        postSettings: builder.mutation({
            query: (payload) => ({
                url: 'http://localhost:3000/settings',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        })
    })
});

export const {
    useGetFavoritesMutation,
    useGetSettingsMutation,
    usePostFavoritesMutation,
    usePostSettingsMutation
} = userApiSlice;
