import axios from "axios";

import BACKEND_URL from "../config/api";

const API_URL = `${BACKEND_URL}/api/auth`;

export const register = async (userData) => {
  const response = await axios.post(
    `${API_URL}/register`,
    userData
  );

  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    userData
  );

  return response.data;
};