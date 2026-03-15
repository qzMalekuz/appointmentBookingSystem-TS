import { motion } from 'framer-motion';

const logos = ['LYRA', 'NEXORA', 'PULSE', 'SKYLAB', 'HELIO', 'NOVA CARE'];

export default function TrustedBy() {
  return (
    <section className="px-5 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
          Trusted by thousands of service providers
        </p>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="flex h-14 items-center justify-center rounded-xl border border-neutral-200 bg-white text-xs font-semibold tracking-[0.18em] text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
