import React from 'react';
import { FC } from 'react';
import "@/app/page"

// Interface pour les props d'un témoignage
interface TestimonialProps {
  quote: string;
  name: string;
  avatar: string;
}

/**
 * Composant de carte pour un seul témoignage.
 */
const TestimonialCard: FC<TestimonialProps> = ({ quote, name, avatar }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
      <div className="text-gray-600 italic mb-4">
        &quot;{quote}&quot;
      </div>
      <div className="flex items-center mt-4">
        <img src={avatar} alt={`Avatar de ${name}`} className="w-12 h-12 rounded-full mr-4"/>
        <div className="font-semibold text-gray-800">{name}</div>
      </div>
    </div>
  );
};

/**
 * Composant de la section des témoignages.
 * Il affiche une collection de témoignages d'utilisateurs.
 */
const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-12">Ce que disent nos utilisateurs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="Revise-IA a complètement transformé ma façon d'étudier. Mes notes n'ont jamais été aussi bonnes !" 
            name="Marie D." 
            avatar="https://placehold.co/100x100/A855F7/ffffff?text=M"
          />
          <TestimonialCard 
            quote="L'outil est super simple à utiliser et la génération de fiches est ultra rapide. Un gain de temps incroyable." 
            name="Jean V." 
            avatar="https://placehold.co/100x100/F97316/ffffff?text=J"
          />
          <TestimonialCard 
            quote="Les quiz sont parfaits pour tester mes connaissances avant un examen. Je recommande à 100%." 
            name="Céline R." 
            avatar="https://placehold.co/100x100/EC4899/ffffff?text=C"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
