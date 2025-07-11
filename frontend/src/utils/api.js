// src/utils/api.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // or your server

export const requestPasswordReset = (email) =>
  axios.post(`${BASE_URL}/password/request-reset`, { email });

export const resetPasswordWithOTP = (email, token, newPassword) =>
  axios.post(`${BASE_URL}/password/reset-password`, {
    email,
    token,
    newPassword,
  });
