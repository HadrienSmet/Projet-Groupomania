import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: null,
    },
    reducers: {
        getPosts: (state, { payload }) => {
            state.posts = payload;
        },
        addPost: (state, { payload }) => {
            state.posts.push(payload);
        },
        deletePost: (state, { payload }) => {
            const rightIndex = state.posts.findIndex(
                (post) => post._id === payload
            );
            state.posts.splice(rightIndex, 1);
        },
        changePost: (state, { payload }) => {
            const rightIndex = state.posts.findIndex(
                (post) => post._id === payload._id
            );
            state.posts.splice(rightIndex, 1, payload);
        },
    },
});

export const { getPosts, addPost, deletePost, changePost } = postsSlice.actions;
export default postsSlice.reducer;
