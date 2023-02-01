import axios from "axios";

export const axiosSignup = async (data) => {
    return await axios.post("http://localhost:3000/api/auth/signup", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
