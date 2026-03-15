import CTA from '../components/landing/CTA';
import Credits from '../components/landing/Credits';
import Features from '../components/landing/Features';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import Navbar from '../components/landing/Navbar';
import ProductPreview from '../components/landing/ProductPreview';
import TrustedBy from '../components/landing/TrustedBy';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Features />
        <HowItWorks />
        <ProductPreview />
        <CTA />
        <Credits />
      </main>
    </div>
  );
}
