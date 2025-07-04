import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-6 text-center text-slate-400 text-sm">
      <p>&copy; {new Date().getFullYear()} BERU • Built with ❤️ by Arjun Nath</p>
    </footer>
  );
};

export default Footer;
