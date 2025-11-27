import MainLayout from "./components/layout/MainLayout";
import Hero from "./components/home/Hero";
import ServicesGrid from "./components/home/ServicesGrid";
import Testimonials from "./components/home/Testimonials";

import { ReactLenis } from 'lenis/react'

export default function Home() {
  return (
    <MainLayout>
      <ReactLenis />
      <Hero />
      <ServicesGrid />
      <Testimonials />
    </MainLayout>
  );
}