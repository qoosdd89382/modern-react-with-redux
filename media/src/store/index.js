import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumApis";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        // 下面這行的 key 必須要和 setupListeners 的 reducerPath 一樣
        // [albumsApi.reducerPath]  使用了 JavaScript 中的計算屬性名（computed property names），允許你將表達式放在方括號 [] 中，該表達式的結果將被用作屬性名。在這個上下文中，[] 確實不代表一個數組，而是用來計算 albumsApi.reducerPath 表達式的值，並將該值用作物件的鍵。這意味著如果 albumsApi.reducerPath 的值是 'albums'，則對應的 reducer 將被添加到狀態樹的 albums 鍵下。
        [albumsApi.reducerPath]: albumsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(albumsApi.middleware);
    }
});

setupListeners(store.dispatch);

export * from "./thunks/fetchUsers";
export * from './thunks/addUser';
export * from './thunks/removeUser';
export { useFetchAlbumsQuery } from './apis/albumApis'