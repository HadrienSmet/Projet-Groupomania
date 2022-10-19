import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: {},
    },
    reducers: {
        setProfileData: (state, { payload }) => {
            state.profile = payload;
        },
    },
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;