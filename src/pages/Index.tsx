import { Layout } from "@/components/Layout";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaSection } from "@/components/sections/CtaSection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Services />
      <PortfolioPreview />
      <Testimonials />
      <CtaSection />
    </Layout>
  );
};

export default Index;
