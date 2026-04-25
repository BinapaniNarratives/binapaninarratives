import { Layout } from "@/components/Layout";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Services } from "@/components/sections/Services";
import { Tracks } from "@/components/sections/Tracks";
import { Methodology } from "@/components/sections/Methodology";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { CtaSection } from "@/components/sections/CtaSection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Philosophy />
      <Services />
      <Tracks />
      <Methodology />
      <PortfolioPreview />
      <CtaSection />
    </Layout>
  );
};

export default Index;
