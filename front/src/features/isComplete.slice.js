import { createSlice } from "@reduxjs/toolkit";

export const isCompleteSlice = createSlice({
    name: "isComplete",
    initialState: {
        isComplete: undefined,
    },
    reducers: {
        toggleCompletion: (state, { payload }) => {
            state.isComplete = payload;
        }
    },
});

export const { toggleCompletion } = isCompleteSlice.actions;
export default isCompleteSlice.reducer;