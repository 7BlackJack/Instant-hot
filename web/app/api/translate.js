import axios from "axios";

const BASE_URL = "http://localhost:3000/api"; // 后端API地址

export const translateText = async (text) => {
	const response = await axios.post(`${BASE_URL}/translate/`, { text });
	return response.data;
};
