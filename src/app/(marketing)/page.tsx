import React from "react";
//import UnderConstructionHero from "@/components/ui/underConstruction/UnderConstructionHero";
import UnderConstructionHero from "@/components/ui/underConstruction/HeroSection";

import HorizontalBenefitsSection from "@/components/ui/underConstruction/HorizontalBenefitsSection";
import AboutSection from "@/components/ui/underConstruction/AboutSection";
const page = () => {
  return (
    <>
      <UnderConstructionHero />
      <AboutSection />
      <HorizontalBenefitsSection />
    </>
  );
};

export default page;
