import { createSlice } from "@reduxjs/toolkit";
import { reset } from "../actions";

const songsSlice = createSlice({
    name: 'song',
    initialState: [],
    reducers: {
        addSong(state, action) {
            // 這裡的 state 指的不是 BIG STATE 而是這個 reducer, slice 負責管理的一部分 state (songs)
            state.push(action.payload);     // immer mutable
        },
        removeSong(state, action) {
            const index = state.indexOf(action.payload);
            state.splice(index, 1);
        }
    },
    extraReducers: (builder) => {
        // // builder.addCase('movie/reset', (state, action) => {
        // // builder.addCase(moviesSlice.actions.reset.toString(), (state, action) => {
        // builder.addCase(moviesSlice.actions.reset, (state, action) => {
        //     return [];      // 這裡更新的是 songs state
        // });

        builder.addCase(reset, () => {
            return [];
        });
    }
});

// songsSlice.actions.addSong()     // action creator
export const { addSong, removeSong } = songsSlice.actions;
export const songsReducer = songsSlice.reducer;