import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section id="pricing" className="px-5 py-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-100 via-neutral-50 to-white px-6 py-12 text-center text-neutral-900 shadow-sm dark:border-neutral-700 dark:from-neutral-800 dark:via-neutral-800 dark:to-neutral-900 dark:text-neutral-100 sm:px-10"
        >
          <div className="pointer-events-none absolute -left-20 top-0 h-52 w-52 rounded-full bg-neutral-300/40 blur-3xl dark:bg-neutral-700/35" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-neutral-300/30 blur-3xl dark:bg-neutral-700/35" />

          <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">Start accepting bookings in minutes</h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
            Launch a reliable appointment workflow with modern scheduling tools built for speed and growth.
          </p>

          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center rounded-xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
            >
              Get Started Free
            </Link>
            <a
              href="#features"
              className="inline-flex items-center rounded-xl border border-neutral-300 bg-white/70 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-white dark:border-neutral-600 dark:bg-neutral-900/70 dark:text-neutral-200 dark:hover:bg-neutral-900"
            >
              Explore Features
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
