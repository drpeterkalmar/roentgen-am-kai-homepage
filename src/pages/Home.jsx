import React, { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import Appointment from '../components/Appointment';

const Services = lazy(() => import('../components/Services'));
const About = lazy(() => import('../components/About'));
const Blog = lazy(() => import('../components/Blog'));

const Home = () => {
  return (
    <>
      <Hero />
      <Suspense fallback={<div className="min-h-screen bg-transparent" />}>
        <Services />
        <About />
      </Suspense>
      <Appointment />
      <Suspense fallback={<div className="min-h-[500px] bg-transparent" />}>
        <Blog />
      </Suspense>
    </>
  );
};

export default Home;
