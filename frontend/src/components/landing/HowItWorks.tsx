import { motion } from 'framer-motion';
import { CalendarPlus2, Clock4, MousePointerClick } from 'lucide-react';

const steps = [
  {
    title: 'Create your service',
    description: 'Define service type, duration, and booking preferences in a few clicks.',
    icon: CalendarPlus2,
  },
  {
    title: 'Set availability',
    description: 'Configure hours, breaks, and exceptions to match your real schedule.',
    icon: Clock4,
  },
  {
    title: 'Users book instantly',
    description: 'Customers choose slots and confirm appointments with real-time sync.',
    icon: MousePointerClick,
  },
];

export default function HowItWorks() {
  return (
    <section className="px-5 py-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">How it works</h2>

        <div className="relative mt-12 grid gap-6 lg:grid-cols-3">
          <div className="pointer-events-none absolute left-12 right-12 top-11 hidden h-px bg-gradient-to-r from-neutral-300 via-neutral-400 to-neutral-300 lg:block dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="relative rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="inline-flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-900">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
