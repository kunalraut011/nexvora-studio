import { Navbar } from '@/components/nexvora/Navbar';
import { Hero } from '@/components/nexvora/Hero';
import { Stats } from '@/components/nexvora/Stats';
import { TrustedLogos } from '@/components/nexvora/TrustedLogos';
import { Services } from '@/components/nexvora/Services';
import { Portfolio } from '@/components/nexvora/Portfolio';
import { BeforeAfter } from '@/components/nexvora/BeforeAfter';
import { Performance } from '@/components/nexvora/Performance';
import { WhyChooseUs } from '@/components/nexvora/WhyChooseUs';
import { ProcessTimeline } from '@/components/nexvora/ProcessTimeline';
import { Pricing } from '@/components/nexvora/Pricing';
import { Testimonials } from '@/components/nexvora/Testimonials';
import { FAQ } from '@/components/nexvora/FAQ';
import { Contact } from '@/components/nexvora/Contact';
import { Footer } from '@/components/nexvora/Footer';
import { FloatingButtons } from '@/components/nexvora/FloatingButtons';
import { CustomCursor } from '@/components/nexvora/CustomCursor';
import { ScrollProgress } from '@/components/nexvora/ScrollProgress';

export default function Home() {
  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="aurora-bg" />
      <div className="grid-bg" />
      
      <CustomCursor />
      <ScrollProgress />
      
      <Navbar />
      <Hero />
      <TrustedLogos />
      <Stats />
      <Services />
      <Portfolio />
      <BeforeAfter />
      <Performance />
      <WhyChooseUs />
      <ProcessTimeline />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingButtons />
    </main>
  );
}
