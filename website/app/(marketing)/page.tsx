import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { ProblemStatement } from "@/components/marketing/ProblemStatement";
import { Features } from "@/components/marketing/Features";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Integrations } from "@/components/marketing/Integrations";
import { DownloadCta } from "@/components/marketing/DownloadCta";
import { Footer } from "@/components/marketing/Footer";

export default function MarketingHomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <ProblemStatement />
        <Features />
        <HowItWorks />
        <Integrations />
        <DownloadCta />
      </main>
      <Footer />
    </div>
  );
}
