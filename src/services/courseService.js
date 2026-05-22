import axios from "axios";

import BACKEND_URL from "../config/api";

const API_URL = `${BACKEND_URL}/api/courses`;

const getToken = () => {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  return userInfo?.token;
};

export const createCourse = async (formData) => {
  const response = await axios.post(
    API_URL,
    formData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getCourses = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const getMyCourses = async () => {
  const response = await axios.get(`${API_URL}/my`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const getEnrolledCourses = async () => {
  const response = await axios.get(`${API_URL}/enrolled`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const getCourseById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateCourse = async (id, formData) => {
  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const enrollCourse = async (id) => {
  const response = await axios.post(
    `${API_URL}/enroll/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};