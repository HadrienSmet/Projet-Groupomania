import axios from "axios";

export const axiosCreatePost = async (post, token) => {
    return await axios({
        url: "http://localhost:3000/api/posts",
        method: "post",
        data: post,
        headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
        },
    });
};
