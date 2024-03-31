import { configureStore } from "@reduxjs/toolkit";
import { moviesReducer, addMovie, removeMovie } from "./slices/moviesSlice";
import { songsReducer, addSong, removeSong } from "./slices/songsSlice";
import { reset } from "./actions";

const store = configureStore({
    reducer: {
        // 所有 reducer 都會收到通知, 但只關注自己的那部分 state, 除非使用 extraReducers 去關心別人的 state
        songs: songsReducer,
        movies: moviesReducer
    }
})

// const state = store.getState();

export { 
    store, 
    reset,
    addSong, removeSong, addMovie, removeMovie 
};