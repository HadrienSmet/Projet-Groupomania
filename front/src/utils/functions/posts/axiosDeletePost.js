import axios from "axios";

export const axiosDeletePost = async (postId, token) => {
    return await axios({
        url: `http://localhost:3000/api/posts/${postId}`,
        method: "delete",
        headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
        },
    });
};
