import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './pages/register';
// add Login, ForgotPassword, Dashboard, etc as you build them

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
