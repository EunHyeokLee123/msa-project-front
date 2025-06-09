import React, { useState, useEffect } from 'react';
import './GoTopButton.scss';

const GoTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id='btnTop'>
      {isVisible && (
        <button onClick={scrollToTop} className='scroll-button'>
          ▲
        </button>
      )}
    </div>
  );
};

export default GoTopButton;
