// HomePage.jsx

import React, { useEffect, useRef } from 'react';
import HomePageSection from '../../components/HomePageSection/HomePageSection';
import sampleImage1 from '/background1.png';
import sampleImage2 from '/background2.png';
import sampleImage3 from '/background3.png';
import 'fullpage.js/dist/fullpage.css';

const HomePage = () => {
  const sectionRefs = useRef([]);
  const currentIndex = useRef(0);

  useEffect(() => {
    const handleWheel = (event) => {
      if (event.deltaY > 0) {
        // Scroll down
        if (currentIndex.current < sectionRefs.current.length - 1) {
          currentIndex.current += 1;
          sectionRefs.current[currentIndex.current].scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Scroll up
        if (currentIndex.current > 0) {
          currentIndex.current -= 1;
          sectionRefs.current[currentIndex.current].scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div>
      <div ref={(el) => (sectionRefs.current[0] = el)}>
        <HomePageSection
          imageUrl={sampleImage1}
          buttonText="BROWSE COLLECTION"
          buttonLink="/jackets-vests"
          buttonPosition="top-right"
        />
      </div>
      <div ref={(el) => (sectionRefs.current[1] = el)}>
        <HomePageSection
          imageUrl={sampleImage2}
          buttonText="EXPLORE MORE"
          buttonLink="/accessories"
          buttonPosition="center"
        />
      </div>
      <div ref={(el) => (sectionRefs.current[2] = el)}>
        <HomePageSection
          imageUrl={sampleImage3}
          buttonText="DISCOVER NOW"
          buttonLink="/equipment"
          buttonPosition="top-left"
        />
      </div>
    </div>
  );
};

export default HomePage;
