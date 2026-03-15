import CTA from '../components/landing/CTA';
import Credits from '../components/landing/Credits';
import Features from '../components/landing/Features';
import Footer from '../components/landing/Footer';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import Navbar from '../components/landing/Navbar';
import ProductPreview from '../components/landing/ProductPreview';
import TrustedBy from '../components/landing/TrustedBy';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
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
      <Footer />
    </div>
  );
}
