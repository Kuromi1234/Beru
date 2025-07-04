import { motion } from 'framer-motion';

const Contact = () => {
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
        Whether you're an HR, Admin, Trainer , QA , SME , Advisor — feel free to reach out for feedbacks .
      </motion.p>

      <motion.form
        className="max-w-2xl mx-auto bg-white/5 p-8 rounded-xl shadow-lg backdrop-blur-md border border-white/10 space-y-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div>
          <label className="block text-slate-300 mb-1">Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 mb-1">Message</label>
          <textarea
            rows="4"
            placeholder="Write your message..."
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:scale-105"
        >
          Send Message
        </button>
      </motion.form>
    </section>
  );
};

export default Contact;
