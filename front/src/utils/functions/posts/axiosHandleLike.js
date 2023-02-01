import axios from "axios";

export const axiosHandleLike = async (postId, data, token) => {
    return await axios({
        url: `http://localhost:3000/api/posts/${postId}/like`,
        method: "post",
        data: {
            like: data,
        },
        headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
        },
    });
};
