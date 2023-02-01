import axios from "axios";

export const axiosPatchProfile = async (userId, userData, token) => {
    return await axios({
        url: `http://localhost:3000/api/auth/profile/${userId}`,
        method: "patch",
        data: userData,
        headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
        },
    });
};
