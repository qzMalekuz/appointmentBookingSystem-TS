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
        <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">How it works</h2>

        <div className="relative mt-12 grid gap-6 lg:grid-cols-3">
          <div className="pointer-events-none absolute left-12 right-12 top-11 hidden h-px bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200 lg:block dark:from-blue-500/30 dark:via-indigo-500/40 dark:to-purple-500/30" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="inline-flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
