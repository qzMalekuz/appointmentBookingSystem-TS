import { motion, useAnimation, useInView } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { BrandWordmark } from '../Brand';

function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.188 9.458 12.506h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.83L0 1.154h7.594l5.243 6.932zM17.61 20.72h2.04L6.486 3.24H4.298z" />
    </svg>
  );
}

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/qzMalekuz', icon: Github },
  { label: 'X (Twitter)', href: 'https://x.com/qzmalekuz', icon: XIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/malekuz-zafar-qadri-6b5405232/', icon: Linkedin },
];

export default function Credits() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgControls = useAnimation();
  const isInView = useInView(sectionRef, { amount: 0.12, margin: '0px 0px -12% 0px' });

  useEffect(() => {
    bgControls.start(
      isInView
        ? { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
        : { opacity: 0, y: 22, transition: { duration: 0.35, ease: 'easeInOut' } },
    );
  }, [bgControls, isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-neutral-200 bg-neutral-100/70 px-5 pb-16 pt-16 dark:border-neutral-800 dark:bg-neutral-900/60 sm:px-6 lg:px-8"
    >
      <motion.div
        animate={bgControls}
        initial={{ opacity: 0, y: 20 }}
        className="pointer-events-none absolute inset-x-0 -bottom-14 z-0 text-center sm:-bottom-16 lg:-bottom-20"
      >
        <div className="absolute inset-x-0 bottom-20 mx-auto h-24 w-[68%] rounded-full bg-neutral-300/25 blur-[90px] dark:bg-neutral-700/30" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4 }}
        className="relative z-10 mx-auto max-w-7xl"
      >
        <BrandWordmark textClassName="text-4xl sm:text-5xl" markClassName="h-12 w-12 sm:h-14 sm:w-14" />

        <p className="mt-5 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
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
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-300 bg-white text-neutral-600 transition hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:text-white"
              aria-label={label}
            >
              <Icon className="h-5 w-5" />
            </motion.a>
          ))}
        </div>

        <div className="mt-10 border-t border-neutral-300/70 pt-9 dark:border-neutral-700/70">
          <p className="text-xl font-medium text-neutral-600 dark:text-neutral-300">
            Built and designed by{' '}
            <a
              href="https://zafarr.xyz"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-neutral-900 underline decoration-neutral-400/70 underline-offset-4 transition duration-200 hover:text-neutral-700 hover:decoration-neutral-500 dark:text-white dark:decoration-neutral-500 dark:hover:text-neutral-200 dark:hover:decoration-neutral-400"
            >
              zafarr.
            </a>
          </p>
          <p className="mt-4 text-base text-neutral-500 dark:text-neutral-400">© 2026 AppointmentLelo.io — All Rights Reserved</p>
        </div>
      </motion.div>
    </section>
  );
}
