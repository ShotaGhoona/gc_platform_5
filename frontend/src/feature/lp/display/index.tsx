import Header from "./Header";
import HeroSection from "./HeroSection";
import ProblemSection from "./ProblemSection";
import SolutionSection from "./SolutionSection";
import MemberSection from "./MemberSection";
import PageSection from "./PageSection";
import CTASection from "./CTASection";

export default function LandingPage() {
  return (
    <div>
      <Header />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <MemberSection />
      <PageSection />
      <CTASection />
    </div>
  );
}