import axios from "axios";

import BACKEND_URL from "../config/api";

const API_URL = `${BACKEND_URL}/api/admin`;

const getToken = () => {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  return userInfo?.token;
};

export const getUsers = async () => {
  const response = await axios.get(
    `${API_URL}/users`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(
    `${API_URL}/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};