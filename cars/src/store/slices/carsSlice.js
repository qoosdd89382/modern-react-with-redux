import { createSlice, nanoid } from "@reduxjs/toolkit";

const carsSlice = createSlice({
    name: 'cars',
    initialState: {
        searchTerm: '',
        data: []
    },
    reducers: {
        changeSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        addCar(state, action) {
            // 假設 action.payload === { name: 'xxx', cost: 123 }
            state.data.push({
                // name: action.payload.name,
                // cost: action.payload.cost
                ...action.payload,
                id: nanoid()
            });
        },
        removeCar(state, action) {
            // 假設 action.payload === 我們想要移除的 car id 
            const updated = state.data.filter(car => {
                // 留下不移除的
                return car.id !== action.payload
            });
            state.data = updated;
        }
    }
});

export const { changeSearchTerm, addCar, removeCar } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;