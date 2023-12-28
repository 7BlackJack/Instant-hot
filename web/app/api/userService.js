import axios from "axios";

const BASE_URL = "http://localhost:3000/user"; // 你的Django服务器地址

export const registerUser = async (username, password) => {
	try {
		const response = await axios.post(`${BASE_URL}/register/`, {
			username,
			password,
		});
		return response.data;
	} catch (error) {
		console.error("Error during registration:", error);
		throw error;
	}
};

export const loginUser = async (username, password) => {
	try {
		const response = await axios.post(`${BASE_URL}/login/`, {
			username,
			password,
		});
		return response.data;
	} catch (error) {
		console.error("Error during login:", error);
		throw error;
	}
};
