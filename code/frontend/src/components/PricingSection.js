import React from 'react';
import "@/app/page"

// Dans un projet réel, vous utiliseriez des icônes ou des images importées.
// Par exemple : import iconCreate from '@/public/assets/icon-create.svg';

// Pour la prévisualisation, nous utilisons des emojis pour les icônes.
const iconFree = '🆓';
const iconPro = '🚀';
const iconPremium = '💎' ;

// Composant pour une carte de tarification
const PricingCard = ({ title, price, features, isPro = false }) => {
  const cardClasses = `
    flex flex-col items-center p-8 border-2 rounded-2xl shadow-lg 
    transition-transform hover:scale-105 
    ${isPro ? 'border-sky-500 bg-white' : 'border-gray-200 bg-white'}
  `;

  const buttonClasses = `
    mt-8 w-full py-3 px-6 rounded-full text-lg font-bold 
    ${isPro ? 'bg-sky-500 text-white hover:bg-sky-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
  `;

  return (
    <div className={cardClasses}>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="text-4xl font-extrabold text-sky-500 mb-6">
        {price}
      </div>
      <ul className="text-gray-600 text-center space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={buttonClasses}>
        Commencer
      </button>
    </div>
  );
};

// Composant de la section de tarification
const PricingSection = () => (
  <section id="pricing" className="py-20 bg-gray-100">
    <div className="container mx-auto px-4 md:px-8 text-center">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
        Choisissez le plan qui vous convient
      </h2>
      <p className="text-lg text-gray-600 mb-12">
        Des outils puissants pour tous les besoins.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard
          title="Gratuit"
          price="0€"
          features={[
            "Génération de fiches illimitée",
            "Quiz intelligent basique",
            "Suivi de progression simple",
            "Accès sur 1 appareil"
          ]}
        />
        <PricingCard
          title="Pro"
          price="10€ / mois"
          features={[
            "Génération de fiches illimitée",
            "Quiz intelligent avancé",
            "Suivi de progression détaillé",
            "Accès sur 3 appareils",
            "Tutorat IA"
          ]}
          isPro
        />
        <PricingCard
          title="Premium"
          price="15€ / mois"
          features={[
            "Toutes les fonctionnalités du plan Pro",
            "Apprentissage gamifié",
            "Synthèse vocale",
            "Collaboration en temps réel",
            "Accès sur 5 appareils"
          ]}
        />
      </div>
    </div>
  </section>
);

export default PricingSection;
