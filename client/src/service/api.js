import axios from 'axios';

const URL = "http://localhost:8000"; 

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
