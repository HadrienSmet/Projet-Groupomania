import axios from "axios";

export const axiosSignin = async (data) => {
    return await axios.post("http://localhost:3000/api/auth/login", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
