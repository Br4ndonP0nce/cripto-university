import React from "react";
//import UnderConstructionHero from "@/components/ui/underConstruction/UnderConstructionHero";
import UnderConstructionHero from "@/components/ui/underConstruction/HeroSection";
import BenefitsSection from "@/components/ui/underConstruction/BenefitsSection";
import HorizontalBenefitsSection from "@/components/ui/underConstruction/HorizontalBenefitsSection";
const page = () => {
  return (
    <>
      <UnderConstructionHero />
      <HorizontalBenefitsSection />
      <UnderConstructionHero />
    </>
  );
};

export default page;
