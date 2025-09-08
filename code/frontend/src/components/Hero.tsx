'use client';

import React, { useState, useEffect } from "react";
import "@/app/page"

// Composant Hero avec un carrousel d'images

function Hero() {
  // En production, vous placeriez vos images dans le dossier 'public'
  // et les référenceriez avec des chemins relatifs comme ci-dessous.
  const images = [
    'images/oi.jpg', // Placez image1.jpg dans le dossier public/assets de votre projet
    'images/p.jpg', // Placez image2.jpg dans le dossier public/assets de votre projet
    'images/t.jpg', // Placez image3.jpg dans le dossier public/assets de votre projet
    'images/o.jpg', // Placez image3.jpg dans le dossier public/assets de votre projet
    'images/ui.jpg', // Placez image3.jpg dans le dossier public/assets de votre projet
    'images/ul.jpg', // Placez image3.jpg dans le dossier public/assets de votre projet
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to move to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to move to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Logic for automatic sliding every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex items-center justify-between min-h-screen pt-20 px-4 md:px-20 text-center md:text-left bg-gray-50">
      <div className="flex-1 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
          Transformez votre <span className="text-blue-600">apprentissage</span> avec Revise-ia
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          De la lecture ennuyeuse aux quiz interactifs et aux fiches de révision intelligentes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
          <a href="/auth/sign-up" className="py-3 px-6 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
            Commencer maintenant
          </a>
        </div>
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center p-8 relative">
        {/* Carousel container */}
        <div className="w-full h-96 rounded-2xl overflow-hidden shadow-xl relative">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Illustration ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
        {/* Navigation buttons */}
        <button
          onClick={prevImage}
          className="absolute left-10 transform -translate-y-1/2 top-1/2 p-2 bg-white/50 text-gray-800 rounded-full shadow-lg hover:bg-white/75 transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextImage}
          className="absolute right-10 transform -translate-y-1/2 top-1/2 p-2 bg-white/50 text-gray-800 rounded-full shadow-lg hover:bg-white/75 transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default Hero;
