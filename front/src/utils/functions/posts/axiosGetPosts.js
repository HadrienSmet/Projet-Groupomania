import axios from "axios";

export const axiosGetPosts = async (token) => {
    return await axios({
        url: "http://localhost:3000/api/posts",
        method: "get",
        headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
        },
    });
};
