import React, { lazy, Suspense } from 'react';
import Hero from '../components/ui/Hero';
import CTASection from '../components/ui/CTASection';

// Übergang: Die bestehenden Artikel (src/data/blogPosts.js) werden unverändert angezeigt.
// Eigene Artikel-URLs (/ratgeber/<slug>) folgen in einem späteren Schritt.
const Blog = lazy(() => import('../components/Blog'));

const RatgeberPage = () => (
  <>
    <Hero
      breadcrumbs={[{ name: 'Startseite', href: '/' }, { name: 'Ratgeber' }]}
      title="Ratgeber"
      lead="Informationen rund um Vorsorge, Untersuchungen und Befunde."
    />
    <Suspense fallback={<div className="min-h-[400px]" />}>
      <Blog />
    </Suspense>
    <CTASection />
  </>
);

export default RatgeberPage;
