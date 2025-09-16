import React from 'react';
import "@/app/page"

// Composant ProgressBar pour la section "Comment ça marche ?"

// Dans un projet réel, vous utiliseriez des icônes ou des images importées.
// Par exemple : import iconCreate from '@/public/assets/icon-create.svg';

// Pour la prévisualisation, nous utilisons des emojis pour les icônes.
const iconCreate = '✍️';
const iconStudy = '🧠';
const iconQuiz = '✅';

const StepCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg transform transition-transform hover:scale-105">
    <div className="text-4xl mb-4 p-4 bg-blue-100 rounded-full">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 bg-gray-50">
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Comment Revise-IA peut vous aider
        </h2>
        <p className="text-lg text-gray-600">
          Suivez ces étapes simples pour transformer votre façon d'étudier.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StepCard
          icon={iconCreate}
          title=" Créez"
          description="Transformez vos cours ou documents en fiches de révision intelligentes en un instant grâce à l'IA."
        />
        <StepCard
          icon={iconStudy}
          title=" Étudiez"
          description="Utilisez le système de répétition espacée de l'IA pour mémoriser durablement, sans effort."
        />
        <StepCard
          icon={iconQuiz}
          title="Testez"
          description="Passez des quiz personnalisés et suivez votre progression pour maîtriser parfaitement chaque sujet."
        />
      </div>
    </div>
  </section>
);

export default HowItWorks;
