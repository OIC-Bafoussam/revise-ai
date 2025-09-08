'use client';
import jsPDF from "jspdf";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/service";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import PricingSection from "@/components/PricingSection"
import Footer from "@/components/Footer";
import "@/app/globals.css";
import Features from "@/components/Feature";
import ProgressBar from "@/components/ProgressBar";
import "@/app/page"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
        <ProgressBar/>
      <Services />
      <Testimonials />
      <Features/>
       <PricingSection/>
      <CTA />
      <Footer />
    
    </>
  );
}

