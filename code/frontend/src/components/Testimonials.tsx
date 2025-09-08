import React, { FC, useState, useEffect, ReactNode } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause, X } from 'lucide-react';
import ReactDOM from 'react-dom';

// Définition d'une interface pour les props de la modal
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

// Un composant de modal générique
const BaseModal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl max-w-lg max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative w-full animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 text-3xl font-light transition-colors"
            aria-label="Fermer la modal"
          >
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

// Interface pour les props d'un témoignage
interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  isActive?: boolean;
}

// Composant de carte pour un seul témoignage
const TestimonialCard: FC<TestimonialCardProps> = ({ 
  quote, name, role, avatar, rating, isActive = false 
}) => {
  return (
    <div className={`group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-8 transform transition-all duration-500 border border-gray-200/50 flex flex-col justify-between relative overflow-hidden min-h-[320px] ${
      isActive ? 'scale-105 shadow-2xl border-blue-400/50' : 'hover:scale-105 hover:shadow-2xl hover:border-gray-300'
    }`}>
      {/* Icône de citation décorative */}
      <div className="absolute top-4 right-4 text-gray-200 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        <Quote className="w-12 h-12" />
      </div>

      {/* Étoiles de notation */}
      <div className="flex justify-center mb-6 relative z-10">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 mx-0.5 transition-all duration-300 transform ${
              i < rating 
                ? 'text-yellow-400 fill-current scale-110' 
                : 'text-gray-300 hover:scale-110'
            }`}
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>

      {/* Citation avec meilleure typographie */}
      <div className="text-gray-700 mb-6 relative flex-grow z-10">
        <p className="text-lg leading-relaxed font-medium italic">
          "{quote}"
        </p>
      </div>

      {/* Profil utilisateur amélioré */}
      <div className="flex items-center mt-auto pt-6 border-t border-gray-100/50 relative z-10">
        <div className="relative mr-4 group/avatar">
          <img 
            src={avatar} 
            alt={`Avatar de ${name}`}
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-300 relative z-10"
          />
          {/* Badge de vérification */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-md group-hover:rotate-12 transition-transform duration-300 z-10">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>
        
        <div className="flex-grow text-left">
          <div className="font-bold text-gray-800 transition-colors duration-300 text-base">
            {name}
          </div>
          <div className="text-sm text-gray-500 transition-colors duration-300">
            {role}
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant de la section des témoignages
const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isCtaModalOpen, setIsCtaModalOpen] = useState(false);

  const testimonialsData = [
    {
      quote: "Revise-IA a complètement transformé ma façon d'étudier. Mes notes n'ont jamais été aussi bonnes ! L'IA comprend vraiment mes besoins.",
      name: "Marie Dubois",
      role: "Étudiante en Médecine",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
    },
    {
      quote: "L'outil est super simple à utiliser et la génération de fiches est ultra rapide. Un gain de temps incroyable pour mes révisions.",
      name: "Jean Vaillant",
      role: "Étudiant en Ingénierie",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
    },
    {
      quote: "Les quiz sont parfaits pour tester mes connaissances avant un examen. Je recommande à 100% cette plateforme révolutionnaire.",
      name: "Céline Rodriguez",
      role: "Étudiante en Droit",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
    },
    {
      quote: "Grâce au suivi de progression, je peux voir mes points faibles et m'améliorer continuellement. C'est exactement ce dont j'avais besoin.",
      name: "Alex Martin",
      role: "Étudiant en Commerce",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
    },
    {
      quote: "Le mode hors ligne m'a sauvé pendant mes trajets. Pouvoir réviser partout sans internet, c'est génial pour optimiser mon temps.",
      name: "Sophie Chen",
      role: "Étudiante en Psychologie",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 4,
    },
    {
      quote: "La synthèse vocale est parfaite pour réviser en conduisant. L'innovation au service de l'apprentissage, j'adore ce concept moderne.",
      name: "Thomas Bernard",
      role: "Étudiant en Histoire",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
    },
    {
      quote: "La collaboration avec mes amis rend l'étude plus motivante. Nous progressons ensemble et c'est beaucoup plus efficace qu'avant.",
      name: "Emma Leroy",
      role: "Étudiante en Littérature",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
    },
    {
      quote: "Les rappels intelligents m'aident à maintenir une routine d'étude régulière. Plus jamais de sessions de révision oubliées !",
      name: "Lucas Moreau",
      role: "Étudiant en Sciences",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 4,
    },
    {
      quote: "L'aspect gamifié rend l'apprentissage addictif ! Je ne pensais jamais dire ça, mais j'ai hâte de réviser maintenant.",
      name: "Chloé Petit",
      role: "Étudiante en Art",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
    }
  ];

  // Auto-rotation des témoignages en mode carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonialsData.length / 3));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonialsData.length]);

  // Animation d'apparition au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('testimonials');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonialsData.length / 3));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(testimonialsData.length / 3)) % Math.ceil(testimonialsData.length / 3));
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };
  
  const handleStartFree = () => {
    setIsCtaModalOpen(true);
  };

  return (
    <section 
      id="testimonials" 
      className="py-20 bg-gray-50 font-sans relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* En-tête avec animation d'entrée */}
        <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gray-100 rounded-full shadow-sm border border-gray-200">
            <Star className="w-4 h-4 text-yellow-500 fill-current animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-sm font-semibold text-gray-700">
              Témoignages Authentiques
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Ce que disent nos utilisateurs
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Découvrez pourquoi des <span className="font-semibold text-gray-800">milliers d'étudiants</span> choisissent Revise-IA 
            pour transformer leur expérience d'apprentissage.
          </p>

          {/* Statistiques améliorées */}
          <div className="flex justify-center items-center gap-12 mb-12 flex-wrap">
            {[
              { value: '4.9/5', label: 'Note moyenne', icon: '⭐' },
              { value: '10K+', label: 'Utilisateurs actifs', icon: '👥' },
              { value: '95%', label: 'Satisfaction', icon: '💯' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-1 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-blue-700">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contrôles du carousel */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <button
            onClick={prevSlide}
            className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200/50"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <button
            onClick={toggleAutoPlay}
            className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200/50"
          >
            {isAutoPlaying ? (
              <Pause className="w-5 h-5 text-gray-700" />
            ) : (
              <Play className="w-5 h-5 text-gray-700" />
            )}
          </button>
          
          <button
            onClick={nextSlide}
            className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200/50"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Grille des témoignages avec carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: Math.ceil(testimonialsData.length / 3) }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                  {testimonialsData.slice(slideIndex * 3, (slideIndex + 1) * 3).map((testimonial, index) => (
                    <div
                      key={`${testimonial.name}-${slideIndex}-${index}`}
                      className={`transition-all duration-700 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}
                      style={{ 
                        transitionDelay: `${index * 200}ms`,
                      }}
                    >
                      <TestimonialCard 
                        {...testimonial} 
                        isActive={slideIndex === currentSlide}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicateurs de pagination */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: Math.ceil(testimonialsData.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Call to action amélioré */}
        <div className={`mt-16 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'étudiants qui ont déjà transformé leur façon d'apprendre
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleStartFree}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-blue-700"
            >
              <Star className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Commencer gratuitement
            </button>
            <button
              onClick={() => { alert('Démonstration non disponible pour le moment.'); }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200/50"
            >
              📱 Voir la démo
            </button>
          </div>
        </div>
      </div>
      {/* Modal pour le bouton "Commencer gratuitement" */}
      <BaseModal isOpen={isCtaModalOpen} onClose={() => setIsCtaModalOpen(false)} title="Merci !">
        <p className="text-gray-700 leading-relaxed text-lg">
          Votre inscription est en cours. Nous vous remercions pour votre patience.
        </p>
      </BaseModal>
    </section>
  );
};

export default Testimonials;
