import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import ParticlesBackground from "../components/Particlesbackground";

const Register = () => {
  const [formData, setFormData] = useState({
    empId: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await new Promise((res) => setTimeout(res, 1000));
      toast.success("🎉 Registered successfully!");
    } catch {
      toast.error("❌ Registration failed.");
    }
  };

  return (
   
      <section className="relative min-h-screen bg-gradient-to-br from-darkNavy via-secondary to-black text-white flex flex-col md:flex-row overflow-hidden">
        <ParticlesBackground />

        {/* Left Visual */}
        <div className="md:w-1/2 w-full flex items-center justify-center p-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="max-w-md"
          >
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"
              />
            </div>

            <h1 className="text-5xl font-extrabold leading-tight tracking-wide drop-shadow-md relative z-10">
              Empower Your IT <span className="text-purple-400">Workflow</span>
            </h1>
            <p className="mt-6 text-slate-300 max-w-sm relative z-10">
              Create your account and start managing assets like a pro with
              BERU.
            </p>
          </motion.div>
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 w-full flex items-center justify-center p-10 z-10">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/10"
          >
            <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

            {["empId", "name", "email", "password"].map((field, i) => (
              <div key={i} className="mb-4">
                <label className="block mb-1 font-medium capitalize">
                  {field === "empId" ? "Employee ID" : field}
                </label>
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field === "password" ? "••••••••" : ""}
                  className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="w-full py-3 bg-purple-500/30 text-white font-semibold rounded-xl backdrop-blur-xl hover:bg-purple-500/50 transition-all duration-300"
            >
              Register Now
            </motion.button>

            <p className="text-center text-slate-400 text-sm mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-300 underline">
                Login
              </Link>
            </p>
          </motion.form>
        </div>
      </section>
    
  );
};

export default Register;
