import { motion } from 'framer-motion';
import {
  BadgeCheck,
  CalendarClock,
  Clock3,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: FeatureItem[] = [
  {
    title: 'Dynamic Slot Engine',
    description: 'Generate intelligent and conflict-free booking slots based on your rules and duration.',
    icon: Sparkles,
  },
  {
    title: 'Role Based Access',
    description: 'Separate user and provider capabilities for secure and focused workflows.',
    icon: ShieldCheck,
  },
  {
    title: 'Real-Time Booking',
    description: 'Instant reservation confirmation with up-to-date slot validation every time.',
    icon: BadgeCheck,
  },
  {
    title: 'Availability Management',
    description: 'Set recurring schedules, breaks, and overrides with zero operational friction.',
    icon: Clock3,
  },
  {
    title: 'Provider Dashboard',
    description: 'Track appointments, booking rates, and daily capacity from one clean workspace.',
    icon: LayoutDashboard,
  },
  {
    title: 'Smart Scheduling',
    description: 'Optimize booking flow with guided steps that improve conversion and reduce drop-offs.',
    icon: CalendarClock,
  },
];

export default function Features() {
  return (
    <section id="features" className="px-5 py-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">Features built for booking velocity</h2>
          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-300">
            Everything you need to launch a high-converting scheduling experience for your service business.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="inline-flex rounded-xl bg-neutral-100 p-3 text-neutral-600 transition group-hover:bg-neutral-200 dark:bg-neutral-700/60 dark:text-neutral-200 dark:group-hover:bg-neutral-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{feature.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
