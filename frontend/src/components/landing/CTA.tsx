import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section id="pricing" className="px-5 py-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-12 text-center text-white shadow-2xl shadow-indigo-500/30 sm:px-10"
        >
          <div className="pointer-events-none absolute -left-16 top-0 h-52 w-52 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-52 w-52 rounded-full bg-black/10 blur-3xl" />

          <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">Start accepting bookings in minutes</h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-sm text-blue-100 sm:text-base">
            Launch a reliable appointment workflow with modern scheduling tools built for speed and growth.
          </p>

          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-blue-50"
            >
              Get Started Free
            </a>
            <a
              href="#features"
              className="inline-flex items-center rounded-xl border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore Features
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
