import React from "react";
//import UnderConstructionHero from "@/components/ui/underConstruction/UnderConstructionHero";
import UnderConstructionHero from "@/components/ui/underConstruction/HeroSection";
import CriptoUniversityHero from "@/components/ui/underConstruction/HeroSectionAlt";
import HorizontalBenefitsSection from "@/components/ui/underConstruction/HorizontalBenefitsSection";
import AboutSection from "@/components/ui/underConstruction/AboutSection";
import FAQSection from "@/components/ui/underConstruction/FAQSection";
const page = () => {
  return (
    <>
      <CriptoUniversityHero />
      <AboutSection />
      <HorizontalBenefitsSection />
      <FAQSection />
    </>
  );
};

export default page;
