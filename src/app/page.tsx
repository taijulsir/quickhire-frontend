import { Navbar, Footer } from '@/components/common';
import {
  HeroSection,
  CompaniesSection,
  CategoriesSection,
  CTASection,
  FeaturedJobsSection,
  LatestJobsSection,
} from '@/components/home';

export default function Home() {
  return (
    <div className='max-w-480 mx-auto'>
      <div className='bg-[#F8F8FD] md:min-h-screen md:h-screen md:[clip-path:polygon(0_0,100%_0,100%_70%,70%_100%,0_100%)]'>
        <Navbar />
        <HeroSection />

      </div>
      <main className='mx-5 md:mx-20 2xl:mx-30 3xl:mx-40'>
        <CompaniesSection />
        <CategoriesSection />
        <CTASection />
        <FeaturedJobsSection />
      </main>
      <LatestJobsSection />
      <Footer />
    </div>
  );
}
