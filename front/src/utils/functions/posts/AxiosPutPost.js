import axios from "axios";

export const axiosPutPost = async (postId, newPost, token) => {
    return await axios({
        url: `http://localhost:3000/api/posts/${postId}`,
        method: "put",
        data: newPost,
        headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
        },
    });
};
