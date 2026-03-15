import { motion } from 'framer-motion';

const cards = [
  {
    title: 'User Booking Page',
    description: 'Fast, guided booking experience with service and slot selection.',
    accent: 'from-blue-500/30 to-indigo-500/30',
    bars: ['w-2/3', 'w-5/6', 'w-1/2'],
  },
  {
    title: 'Provider Dashboard',
    description: 'See upcoming appointments and key booking metrics at a glance.',
    accent: 'from-indigo-500/30 to-purple-500/30',
    bars: ['w-3/4', 'w-2/3', 'w-4/6'],
  },
  {
    title: 'Slot Selection UI',
    description: 'Smart slot rendering with available windows and instant confirmations.',
    accent: 'from-purple-500/30 to-blue-500/30',
    bars: ['w-1/2', 'w-5/6', 'w-2/3'],
  },
];

export default function ProductPreview() {
  return (
    <section id="product" className="px-5 py-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">Product preview</h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">Explore key interfaces that power seamless appointment booking and management.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
            >
              <div className={`h-36 bg-gradient-to-br ${card.accent} p-4`}>
                <div className="h-full rounded-xl border border-white/40 bg-white/55 p-3 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/45">
                  <div className="space-y-2">
                    {card.bars.map((width, barIndex) => (
                      <div key={barIndex} className={`h-2 rounded-full bg-slate-400/50 dark:bg-slate-500/40 ${width}`} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{card.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
