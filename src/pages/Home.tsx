import CTASection from '../components/CTASection';
import Hero from '../components/Hero';
import StartHere from '../components/StartHere';

export default function Home() {
  return (
    <main className="page-fade">
      <Hero />
      <StartHere />

      <CTASection />
    </main>
  );
}
