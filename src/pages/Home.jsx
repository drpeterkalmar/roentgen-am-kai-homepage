import React, { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import PatientPortal from '../components/PatientPortal';
import Appointment from '../components/Appointment';
import { ServiceSkeleton } from '../components/Skeleton';

const Services = lazy(() => import('../components/Services'));
const About = lazy(() => import('../components/About'));
const Blog = lazy(() => import('../components/Blog'));

const Home = () => {
  return (
    <>
      <Hero />
      <PatientPortal />
      <Suspense fallback={
        <div className="max-w-[1400px] mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceSkeleton />
          <ServiceSkeleton />
          <ServiceSkeleton />
        </div>
      }>
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
