import { Navigate, Outlet } from "react-router-dom";

const ITPrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if logged in and role is 'IT'
  if (user && user.role === "IT") {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ITPrivateRoute;
