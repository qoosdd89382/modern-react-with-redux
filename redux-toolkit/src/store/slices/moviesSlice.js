import { createSlice } from "@reduxjs/toolkit";
import { reset } from "../actions";

const moviesSlice = createSlice({
    name: 'movie',
    initialState: [],
    reducers: {
        addMovie(state, action) {
            state.push(action.payload);
        },
        removeMovie(state, action) {
            const index = state.indexOf(action.payload);
            state.splice(index, 1);
        },
        // reset(state, action) {
        //     // state = [];     // immer 無法檢測到變化
        //     return [];  // 沒有透過 immer mutate state, 所以 return 的就是你想要 state 變成的值
        // }
    },
    extraReducers(builder) {
        builder.addCase(reset, () => {
            return [];
        });
    }
});

export const { addMovie, removeMovie, 
    // reset
} = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;