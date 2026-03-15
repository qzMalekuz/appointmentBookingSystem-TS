import { Github, Linkedin, MessageSquareText } from 'lucide-react';

const footerCols = [
  {
    heading: 'Product',
    items: ['Features', 'Pricing', 'Documentation'],
  },
  {
    heading: 'Company',
    items: ['About', 'Contact', 'Privacy'],
  },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/zafarr', icon: Github },
  { label: 'X', href: 'https://x.com/zafarr', icon: MessageSquareText },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/zafarr', icon: Linkedin },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-12 dark:border-slate-800 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <h4 className="text-xl font-semibold text-slate-900 dark:text-white">AppointmentLelo.io</h4>
          <p className="mt-3 max-w-md text-sm text-slate-600 dark:text-slate-300">
            Simple, fast, and reliable appointment booking for teams that care about smooth scheduling.
          </p>
        </div>

        {footerCols.map((col) => (
          <div key={col.heading}>
            <h5 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{col.heading}</h5>
            <ul className="mt-4 space-y-3 text-sm">
              {col.items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h5 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Social</h5>
          <div className="mt-4 flex items-center gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:-translate-y-0.5 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:text-white"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
