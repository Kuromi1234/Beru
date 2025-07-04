import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './pages/register';
import Login from "./pages/Login";
import ForgotPassword from "./pages/forgotPassword";
import Verifyotp from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/ForgotPassword" element={< ForgotPassword/>} />
      <Route path="/VerifyOTP" element={< Verifyotp/>} />
      <Route path="/ResetPassword" element={< ResetPassword/>} />
    </Routes>
  );
};

export default App;
