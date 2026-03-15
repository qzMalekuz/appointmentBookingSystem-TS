import { motion } from 'framer-motion';
import { Github, Linkedin, MessageSquareText } from 'lucide-react';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/zafarr', icon: Github },
  { label: 'X (Twitter)', href: 'https://x.com/zafarr', icon: MessageSquareText },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/zafarr', icon: Linkedin },
];

export default function Credits() {
  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-slate-100/70 px-5 py-16 dark:border-slate-800 dark:bg-slate-900/60 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 bottom-[-55px] text-center">
        <p className="select-none text-6xl font-semibold tracking-tight text-slate-900/6 sm:text-8xl lg:text-9xl dark:text-white/6">
          AppointmentLelo.io
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        className="relative mx-auto max-w-7xl"
      >
        <div className="flex items-center gap-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
            <span className="text-lg font-semibold">A</span>
          </div>
          <h3 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">AppointmentLelo.io</h3>
        </div>

        <p className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Open-source slot-based appointment booking platform built for service providers and users.
        </p>

        <div className="mt-8 flex items-center gap-3">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-600 transition hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white"
              aria-label={label}
            >
              <Icon className="h-5 w-5" />
            </motion.a>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-300/70 pt-9 dark:border-slate-700/70">
          <p className="text-xl font-medium text-slate-600 dark:text-slate-300">
            Built and designed by{' '}
            <a
              href="https://zafarr.xyz"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-slate-900 transition hover:underline hover:text-slate-700 dark:text-white dark:hover:text-slate-200"
            >
              zafarr.
            </a>
          </p>
          <p className="mt-4 text-base text-slate-500 dark:text-slate-400">© 2026 AppointmentLelo.io — All Rights Reserved</p>
        </div>
      </motion.div>
    </section>
  );
}
