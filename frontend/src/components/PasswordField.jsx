import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PasswordField = ({
  id = "password",
  label = "Password",
  name = "password",
  value,
  onChange,
  placeholder = "••••••••",
  required = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-6 relative">
      <label htmlFor={id} className="block mb-1 font-medium text-white">
        {label}
      </label>

      {/* Input field */}
      <input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 pr-10 rounded-xl bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
      />

      {/* Eye toggle button */}
      <motion.button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        whileTap={{ scale: 0.85 }}
        className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-400 hover:text-purple-300 focus:outline-none"
      >
        <AnimatePresence mode="wait" initial={false}>
          {showPassword ? (
            <motion.span
              key="hide"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <EyeOff size={20} />
            </motion.span>
          ) : (
            <motion.span
              key="show"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
              transition={{ duration: 0.2 }}
            >
              <Eye size={20} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default PasswordField;
