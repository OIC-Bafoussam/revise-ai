'use client';

import React from "react";

function Hero() {
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
          <a href="@/componenent/servicee" className="py-3 px-6 bg-white text-blue-600 rounded-full font-semibold border border-blue-600 hover:bg-blue-50 transition-colors">
            Découvrir les fonctionnalités
          </a>
        </div>
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center p-8">
        {/* Placeholder pour l'image ou l'illustration */}
        <div className="w-full h-96 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 font-semibold">
          Espace pour l'illustration
        </div>
      </div>
    </section>
  );
}

export default Hero;
