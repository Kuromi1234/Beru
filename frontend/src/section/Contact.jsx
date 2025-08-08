import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-br from-black via-slate-900 to-zinc-900 text-white">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Let's <span className="text-purple-400">Connect</span>
      </motion.h2>

      <motion.p
        className="text-center text-slate-400 max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Whether you're an HR, Admin, Trainer, QA, SME, Advisor — feel free to
        reach out for feedbacks.
      </motion.p>

      <motion.form
        action="https://formspree.io/f/mrblolqe" 
        method="POST"
        className="max-w-2xl mx-auto bg-white/5 p-8 rounded-xl shadow-lg backdrop-blur-md border border-white/10 space-y-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        onSubmit={() => {
          setLoading(true);
          toast.success("Message Sent! ✉️");
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <label className="block text-slate-300 mb-1">Your Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your name"
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <label className="block text-slate-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <label className="block text-slate-300 mb-1">Message</label>
          <textarea
            name="message"
            rows="4"
            required
            placeholder="Write your message..."
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          ></textarea>
        </motion.div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-md"
        >
          {loading ? "Sending..." : "Send Message"}
        </motion.button>
      </motion.form>
    </section>
  );
};

export default Contact;
