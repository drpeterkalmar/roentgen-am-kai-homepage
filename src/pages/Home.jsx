import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Appointment from '../components/Appointment';
import Blog from '../components/Blog';

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Appointment />
      <Blog />
    </>
  );
};

export default Home;
