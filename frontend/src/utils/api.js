// src/utils/api.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // or your server

export const requestPasswordReset = (email) =>
  axios.post(`${BASE_URL}/passwd/request-reset`, { email });

export const verifyOTP = (email, token) =>
  axios.post(`${BASE_URL}/passwd/verify-otp`, { email, token });

export const resetPasswordWithOTP = (email, token, newPassword) =>
  axios.post(`${BASE_URL}/passwd/reset-password`, {
    email,
    token,
    newPassword,
  });
