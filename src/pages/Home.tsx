import CTASection from '../components/CTASection';
import DisclaimerBanner from '../components/DisclaimerBanner';
import Hero from '../components/Hero';
import StartHere from '../components/StartHere';

export default function Home() {
  return (
    <main className="page-fade">
      <Hero />
      <DisclaimerBanner compact />
      <StartHere />

      <CTASection />
    </main>
  );
}
