import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const slides = [
    "Eat healthy, stay healthy",
    "Exercise daily",
    "Stay hydrated",
    "Get enough sleep",
    "Regular check-ups",
    "Maintain mental health",
    "Avoid junk food",
    "Stay active",
    "Balance work and life",
    "Think positive"
  ];

  return (
    <Slider {...settings}>
      {slides.map((text, index) => (
        <div key={index} 
          style={{
            height: '200px', 
            width: '100%', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'aliceblue',
            borderRadius: '50px',
            fontSize: '30px',
            textAlign: 'center',
            fontFamily: 'sans-serif',
            
          }}>
          <h2>{text}</h2>
        </div>
      ))}
    </Slider>
  );
};

export default Slideshow;