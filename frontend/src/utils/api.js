// src/utils/api.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL; 

export const requestPasswordReset = (email) =>
  axios.post(`${BASE_URL}/request-reset`, { email });

export const verifyOTP = (email, token) =>
  axios.post(`${BASE_URL}/verify-otp`, { email, token });

export const resetPasswordWithOTP = (email, token, newPassword) =>
  axios.post(`${BASE_URL}/reset-password`, {
    email,
    token,
    newPassword,
  });
