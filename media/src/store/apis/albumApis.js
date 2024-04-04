import {
    createApi,
    // 底層是 fetch, 會回給我們一個定義好的 fetch function, 
    // 所以比較像是一個 configurate 的方法
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// 以下為 DEV ONLY!!!
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

// 會自己幫我們 generate slice
const albumsApi = createApi({
    // 存在 BIG STATE 當中的 a piece of state 名稱
    // 像 usersSlice 就是 'users'
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        }
    }),
    // 說明如何 fetch
    endpoints(builder) {
        return {
            fetchAlbums: builder.query({
                providesTags: (result, error, user) => {
                    return [
                        { type: 'UserAlbums', id: user.id },
                        ...result.map(album => { 
                            return { type: 'Album', id: album.id };
                        })
                    ];
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id
                        },
                        method: 'GET'
                    };
                }
            }),
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    return [{ type: 'UserAlbums', id: user.id }];
                },
                query(user) {
                    return {
                        url: '/albums',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName()
                        },
                        method: 'POST'
                    };
                }
            }),
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ type: 'Album', id: album.id }];
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE'
                    };
                }
            })
        }
    }
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi };