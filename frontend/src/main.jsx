import {  AuthContextProvider } from "./context/AuthContext"; // 👈 import this
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";
import "./App.css";
import "./font.css";
// 👈 import this

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      < AuthContextProvider> {/* 👈 wrap the entire app */}
        <App />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            className: 'backdrop-blur-md bg-black/80 text-white rounded-xl px-4 py-2 shadow-xl',
            duration: 3000,
          }}
        />
      </ AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
