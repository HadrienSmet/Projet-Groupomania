import { configureStore } from "@reduxjs/toolkit"; 
import isCompleteReducer from "../features/isComplete.slice";
import loginReducer from "../features/login.slice";
import postsReducer from "../features/posts.slice";
import profileReducer from "../features/profile.slice"


export default configureStore({
    reducer: {
        loggedIn: loginReducer,
        postsWarehouse: postsReducer,
        profileStore: profileReducer,
        profileCompletion: isCompleteReducer,
    }
})