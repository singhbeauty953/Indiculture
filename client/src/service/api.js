import axios from 'axios';

const URL = "https://indiculture.onrender.com"; 

export const authenticateSignup = async (data) => {
    try {
        return await axios.post(`${URL}/signup`, data); // Send POST request
    } catch (error) {
        console.log("Error while calling signup API", error); // Log error if the request fails
    }
};

export const authenticateLogin = async (data) => {
    try {
        return await axios.post(`${URL}/login`, data); // Send POST request
    } catch (error) {
        console.log("Error while calling login API", error); // Log error if the request fails
    }
};
export const payUsingPaytm = async (data) => {
    try {
        let response = await axios.post(`${URL}/payment`, data);
        return response.data;
    } catch (error) {
        console.log(`Error while calling payment API`, error);
        return null; // 🔁 fallback in case of error
    }
};
