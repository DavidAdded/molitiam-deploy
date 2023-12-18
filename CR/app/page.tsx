

import React from 'react'; // Add import statement
import Image from 'next/image';
import Navbar from './components/Navbar/Navbar';
import SectionOne from './components/SectionOne/SectionOne';
import SectionTwo from './components/SectionTwo/SectionTwo';

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <SectionOne></SectionOne>
      <SectionTwo></SectionTwo>
  
    </div>

  );
}


