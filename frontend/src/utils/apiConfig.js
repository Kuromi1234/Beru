const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"  // local backend URL
    : "https://beru-backend-2-0.onrender.com"; // live Render backend URL

export default BASE_URL;