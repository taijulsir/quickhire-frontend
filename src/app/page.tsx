import { Header, Footer } from '@/components/common';
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CompaniesSection />
        <CategoriesSection />
        <CTASection />
        <FeaturedJobsSection />
        <LatestJobsSection />
      </main>
      <Footer />
    </div>
  );
}
