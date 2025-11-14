import React from "react";
import Header from "../components/Header.jsx";
import HeroSection from "../components/HeroSection.jsx";
import PopularServices from "../components/PopularServices.jsx";
import HowWork from "../components/HowWork.jsx";
import TopRatedWorkers from "../components/TopRatedWorkers.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Footer from "../components/Footer.jsx";
import SEO from "../components/SEO.jsx";
import { seoHelpers } from "../utils/accessibility.js";

const Home = () => {
  // Structured data for the home page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TaskTurf",
    "description": "Find and book trusted home service professionals for cleaning, plumbing, electrical work, and more",
    "url": "https://taskturf.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://taskturf.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "provider": {
      "@type": "Organization",
      "@id": "https://taskturf.com/#organization"
    }
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://taskturf.com/#organization",
    "name": "TaskTurf",
    "url": "https://taskturf.com",
    "description": "Professional home services platform connecting customers with trusted service providers",
    "foundingDate": "2024",
    "serviceArea": {
      "@type": "Place",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Home Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Cleaning Services",
          "description": "Professional house cleaning and maintenance services"
        },
        {
          "@type": "OfferCatalog", 
          "name": "Plumbing Services",
          "description": "Expert plumbing repairs and installations"
        },
        {
          "@type": "OfferCatalog",
          "name": "Electrical Services", 
          "description": "Licensed electrical work and repairs"
        },
        {
          "@type": "OfferCatalog",
          "name": "Gardening Services",
          "description": "Landscaping and garden maintenance"
        }
      ]
    }
  };

  const combinedStructuredData = [structuredData, organizationData];

  return (
    <div>
      <SEO 
        title="Home Services Platform"
        description="Find and book trusted home service professionals for cleaning, plumbing, electrical work, gardening, cooking, babysitting, and painting. Quality services at affordable prices."
        keywords={[
          'home services',
          'cleaning services', 
          'plumbing',
          'electrical work',
          'gardening',
          'house cleaning',
          'home maintenance',
          'professional services',
          'service booking',
          'trusted professionals'
        ]}
        type="website"
        structuredData={combinedStructuredData}
        canonical="https://taskturf.com"
      />
      
      {/* Skip link for screen readers */}
      <a 
        href="#main-content" 
        className="absolute left-[-9999px] w-px h-px overflow-hidden focus:left-4 focus:top-4 focus:w-auto focus:h-auto focus:overflow-visible focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded focus:z-50 focus:no-underline"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      <Header />
      
      {/* Main content with proper semantic markup */}
      <main id="main-content" role="main" aria-label="Home page content">
        <HeroSection />
        
        {/* Services section */}
        <section aria-labelledby="services-heading">
          <PopularServices />
        </section>
        
        {/* How it works section */}
        <section aria-labelledby="how-it-works-heading">
          <HowWork />
        </section>
        
        {/* Workers section */}
        <section aria-labelledby="workers-heading">
          <TopRatedWorkers />
        </section>
        
        {/* Testimonials section */}
        <section aria-labelledby="testimonials-heading">
          <Testimonials />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
