import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        login: false,
    },
    reducers: {
        setUserLogged: (state, { payload }) => {
            state.login = payload;
        },
    },
});

export const { setUserLogged } = loginSlice.actions;
export default loginSlice.reducer;