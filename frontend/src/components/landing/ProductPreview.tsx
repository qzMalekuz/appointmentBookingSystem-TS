import { motion } from 'framer-motion';

const cards = [
  {
    title: 'User Booking Page',
    description: 'Fast, guided booking experience with service and slot selection.',
    accent: 'from-neutral-200/80 to-neutral-100/80 dark:from-neutral-800 dark:to-neutral-700',
    image: '/previews/screenshot-2.png',
  },
  {
    title: 'Provider Dashboard',
    description: 'See upcoming appointments and key booking metrics at a glance.',
    accent: 'from-neutral-200/80 to-neutral-100/80 dark:from-neutral-800 dark:to-neutral-700',
    image: '/previews/screenshot-4.png',
  },
  {
    title: 'Slot Selection UI',
    description: 'Smart slot rendering with available windows and instant confirmations.',
    accent: 'from-neutral-200/80 to-neutral-100/80 dark:from-neutral-800 dark:to-neutral-700',
    image: '/previews/screenshot-3.png',
  },
];

export default function ProductPreview() {
  return (
    <section id="product" className="px-5 py-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">Product preview</h2>
          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-300">Explore key interfaces that power seamless appointment booking and management.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className={`relative h-48 bg-gradient-to-br ${card.accent} p-2`}>
                <div className="absolute inset-2 rounded-xl border border-white/35 bg-white/40 backdrop-blur-sm dark:border-neutral-700/70 dark:bg-neutral-900/35" />
                <div className="relative h-full overflow-hidden rounded-xl border border-neutral-200/80 bg-neutral-100/80 dark:border-neutral-700/80 dark:bg-neutral-900/70">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.opacity = '0';
                    }}
                  />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{card.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{card.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
