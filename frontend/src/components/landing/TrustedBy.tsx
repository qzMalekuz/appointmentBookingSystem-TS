const logos = ['LYRA', 'NEXORA', 'PULSE', 'SKYLAB', 'HELIO', 'NOVA CARE'];

export default function TrustedBy() {
  return (
    <section className="px-5 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
          Trusted by thousands of service providers
        </p>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <div
              key={logo}
              className="flex h-14 items-center justify-center rounded-xl border border-neutral-200 bg-white text-xs font-semibold tracking-[0.18em] text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
