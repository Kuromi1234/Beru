import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Register from "./pages/register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/forgotPassword";
import Verifyotp from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

// ✅ FIXED: Default import
import AdminLayout from "./pages/admin/AdminLayoutTemp";
import Dashboard from "./pages/admin/Dashboard";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/verifyotp" element={<Verifyotp />} />
      <Route path="/resetpassword" element={<ResetPassword />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
