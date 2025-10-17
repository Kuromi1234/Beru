import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; 
const ITPrivateRoute = () => {
  const { user } = useAuth();

  if (user?.role === "IT") {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ITPrivateRoute;
