import React, { useState, ReactNode } from 'react';
import ReactDOM from 'react-dom'; // Importation de ReactDOM pour createPortal
import { Mail, Phone, MapPin, Sparkles, Star, BookOpen, Users, TrendingUp, Shield, FileText } from 'lucide-react';
import { createPortal } from 'react-dom';

// Définition d'une interface pour les propriétés de la modal
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

// Un composant de modal générique pour éviter la répétition
const BaseModal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-3xl max-w-3xl max-h-[90vh] overflow-y-auto p-8 md:p-12 shadow-2xl border border-gray-100 relative w-full animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 text-3xl font-light transition-colors hover:bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center"
            aria-label="Fermer la modal"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Interface pour les modales de politique et de contact
interface SpecificModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Composant de modal pour la politique de confidentialité
const PolicyModal: React.FC<SpecificModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Politique de Confidentialité">
      <div className="text-gray-700 space-y-6 font-medium leading-relaxed">
        <div className="border-l-4 border-indigo-400 pl-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Collecte des données</h3>
          <p className="text-gray-600">Revise-IA collecte uniquement les données nécessaires pour améliorer votre expérience d'apprentissage et de révision.</p>
        </div>
        <div className="border-l-4 border-indigo-400 pl-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Utilisation des données</h3>
          <p className="text-gray-600">Vos données sont utilisées pour personnaliser votre parcours d'apprentissage et générer des contenus de révision adaptés à vos besoins.</p>
        </div>
        <div className="border-l-4 border-indigo-400 pl-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Protection des données</h3>
          <p className="text-gray-600">Nous mettons en œuvre des mesures de sécurité robustes pour protéger vos informations personnelles.</p>
        </div>
        <div className="border-l-4 border-indigo-400 pl-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Vos droits</h3>
          <p className="text-gray-600">Vous avez le droit d'accéder, de modifier ou de supprimer vos données à tout moment.</p>
        </div>
      </div>
    </BaseModal>
  );
};

// Composant de modal pour le contact
const ContactModal: React.FC<SpecificModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Contactez-nous">
      <div className="space-y-6">
        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-2xl border border-gray-200 hover:shadow-lg transition-all group">
          <Mail className="text-indigo-500 flex-shrink-0 group-hover:scale-110 transition-transform" size={28} />
          <div>
            <p className="font-bold text-gray-900 text-lg md:text-xl">Email</p>
            <a
              href="mailto:support@revise-ia.com"
              className="text-gray-700 font-medium hover:text-indigo-600 transition-colors"
            >
              support@revise-ia.com
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-2xl border border-gray-200 hover:shadow-lg transition-all group">
          <Phone className="text-indigo-500 flex-shrink-0 group-hover:scale-110 transition-transform" size={28} />
          <div>
            <p className="font-bold text-gray-900 text-lg md:text-xl">Téléphone</p>
            <a
              href="tel:+237655328953"
              className="text-gray-700 font-medium hover:text-indigo-600 transition-colors"
            >
              +237 655328953
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-2xl border border-gray-200 hover:shadow-lg transition-all group">
          <MapPin className="text-indigo-500 flex-shrink-0 group-hover:scale-110 transition-transform" size={28} />
          <div>
            <p className="font-bold text-gray-900 text-lg md:text-xl">Adresse</p>
            <address className="text-gray-700 font-medium not-italic">
              123 Rue de l'Innovation<br />75001 innovation center, cameroun
            </address>
          </div>
        </div>
        <div className="mt-8 p-6 bg-gray-100 rounded-2xl border border-gray-200">
          <div className="text-center">
            <div className="text-4xl mb-2 text-gray-600" aria-hidden="true">⏰</div>
            <h4 className="text-gray-900 text-xl font-bold mb-2">Heures d'ouverture</h4>
            <div className="text-gray-800 font-medium">
              <div>Lundi - Vendredi : 9h00 - 18h00</div>
              <div>Samedi : 10h00 - 16h00</div>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

// Composant de modal pour les conditions d'utilisation
const TermsModal: React.FC<SpecificModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Conditions d'utilisation">
      <div className="text-gray-700 space-y-4">
        <p className="text-gray-600">
          Les conditions d'utilisation sont en cours de rédaction. Veuillez consulter cette page ultérieurement pour plus de détails.
        </p>
        <p className="text-sm text-gray-500">
          Nous vous remercions de votre patience.
        </p>
      </div>
    </BaseModal>
  );
};

// Composant de pied de page principal
const Footer: React.FC = () => {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <React.Fragment>
      <footer className="bg-gray-900 text-white relative overflow-hidden">
        {/* Effet de particules en arrière-plan */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-10 left-10 w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-gray-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-1/3 w-1 h-1 bg-gray-400 rounded-full animate-ping"></div>
        </div>
        {/* Section principale */}
        <div className="container mx-auto px-6 py-16 relative">
          <div className="grid md:grid-cols-4 gap-8 md:gap-16 lg:gap-24">
            {/* Logo et description */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="text-white" size={32} aria-hidden="true" />
                <h3 className="text-3xl font-black text-gray-200 tracking-tight">
                  Revise-IA
                </h3>
              </div>
              <p className="text-gray-200 mb-6 font-medium leading-relaxed text-sm">
                Votre assistant intelligent pour réviser et apprendre efficacement avec l'intelligence artificielle.
              </p>
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} aria-hidden="true" />
                ))}
                <span className="ml-2 text-sm text-gray-300 font-semibold" aria-label="Note 4.9 sur 5">4.9/5</span>
              </div>
              <div className="text-gray-400 text-xs font-medium">
                <span aria-hidden="true">✨</span> 2,500+ utilisateurs satisfaits
              </div>
            </div>
            {/* Fonctionnalités */}
            <div>
              <h4 className="text-xl font-bold mb-6 flex items-center text-white">
                <BookOpen className="mr-3 text-indigo-400" size={24} aria-hidden="true" />
                Fonctionnalités
              </h4>
              <ul className="space-y-4 text-gray-200 font-medium">
                <li className="flex items-center hover:text-indigo-300 transition-colors cursor-default group">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3 group-hover:scale-125 transition-transform" aria-hidden="true"></div>
                  Quiz personnalisés IA
                </li>
                <li className="flex items-center hover:text-indigo-300 transition-colors cursor-default group">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3 group-hover:scale-125 transition-transform" aria-hidden="true"></div>
                  Fiches de révision adaptatives
                </li>
                <li className="flex items-center hover:text-indigo-300 transition-colors cursor-default group">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3 group-hover:scale-125 transition-transform" aria-hidden="true"></div>
                  Suivi intelligent des progrès
                </li>
                <li className="flex items-center hover:text-indigo-300 transition-colors cursor-default group">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3 group-hover:scale-125 transition-transform" aria-hidden="true"></div>
                  Analyses de performance
                </li>
                <li className="flex items-center hover:text-indigo-300 transition-colors cursor-default group">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3 group-hover:scale-125 transition-transform" aria-hidden="true"></div>
                  Rappels personnalisés
                </li>
              </ul>
            </div>
            {/* À propos */}
            <div>
              <h4 className="text-xl font-bold mb-6 flex items-center text-white">
                <Users className="mr-3 text-indigo-400" size={24} aria-hidden="true" />
                À propos
              </h4>
              <ul className="space-y-4 text-gray-200 font-medium">
                <li className="flex items-center hover:text-indigo-300 transition-colors cursor-default group">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3 group-hover:scale-125 transition-transform" aria-hidden="true"></div>
                  Équipe d'experts pédagogues
                </li>
                <li className="flex items-center hover:text-indigo-300 transition-colors cursor-default group">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3 group-hover:scale-125 transition-transform" aria-hidden="true"></div>
                  IA de dernière génération
                </li>
                <li className="flex items-center hover:text-indigo-300 transition-colors cursor-default group">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3 group-hover:scale-125 transition-transform" aria-hidden="true"></div>
                  Méthodes scientifiques
                </li>
                <li className="flex items-center hover:text-indigo-300 transition-colors cursor-default group">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3 group-hover:scale-125 transition-transform" aria-hidden="true"></div>
                  Innovation continue
                </li>
                <li className="flex items-center hover:text-indigo-300 transition-colors cursor-default group">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3 group-hover:scale-125 transition-transform" aria-hidden="true"></div>
                  Support dédié 24/7
                </li>
              </ul>
            </div>
            {/* Statistiques */}
            <div>
              <h4 className="text-xl font-bold mb-6 flex items-center text-white">
                <TrendingUp className="mr-3 text-indigo-400" size={24} aria-hidden="true" />
                Performances
              </h4>
              <div className="space-y-4">
                <div className="bg-gray-800 backdrop-blur rounded-2xl p-5 border border-gray-700/50 hover:border-indigo-400/50 transition-all duration-300 group">
                  <div className="text-3xl font-black text-indigo-400 group-hover:scale-105 transition-transform">
                    95%
                  </div>
                  <div className="text-sm text-gray-300 font-semibold">Taux de réussite</div>
                </div>
                <div className="bg-gray-800 backdrop-blur rounded-2xl p-5 border border-gray-700/50 hover:border-indigo-400/50 transition-all duration-300 group">
                  <div className="text-3xl font-black text-indigo-400 group-hover:scale-105 transition-transform">
                    2,500+
                  </div>
                  <div className="text-sm text-gray-300 font-semibold">Utilisateurs actifs</div>
                </div>
                <div className="bg-gray-800 backdrop-blur rounded-2xl p-5 border border-gray-700/50 hover:border-indigo-400/50 transition-all duration-300 group">
                  <div className="text-3xl font-black text-indigo-400 group-hover:scale-105 transition-transform">
                    50k+
                  </div>
                  <div className="text-sm text-gray-300 font-semibold">Quiz générés</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Section des liens légaux */}
        <div className="border-t border-gray-700/50 backdrop-blur">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <p className="text-gray-300 font-medium">
                  © 2025{' '}
                  <span className="font-bold text-indigo-400">
                    Revise-IA
                  </span>
                  . Tous droits réservés.
                </p>
              </div>
              <nav className="flex flex-wrap justify-center gap-6 md:gap-8" aria-label="Liens légaux">
                <button
                  onClick={() => setIsPolicyOpen(true)}
                  className="flex items-center text-gray-300 hover:text-indigo-300 transition-all duration-200 hover:underline font-semibold group"
                >
                  <Shield className="mr-2 group-hover:text-indigo-400 transition-colors group-hover:scale-110" size={16} aria-hidden="true" />
                  Politique de Confidentialité
                </button>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="flex items-center text-gray-300 hover:text-indigo-300 transition-all duration-200 hover:underline font-semibold group"
                >
                  <Mail className="mr-2 group-hover:text-indigo-400 transition-colors group-hover:scale-110" size={16} aria-hidden="true" />
                  Contact
                </button>
                <button
                  className="flex items-center text-gray-300 hover:text-indigo-300 transition-all duration-200 hover:underline font-semibold group"
                  onClick={() => setIsTermsOpen(true)}
                >
                  <FileText className="mr-2 group-hover:text-indigo-400 transition-colors group-hover:scale-110" size={16} aria-hidden="true" />
                  Conditions d'utilisation
                </button>
              </nav>
            </div>
          </div>
        </div>
        {/* Badge de confiance */}
        <div className="bg-gray-800/95 backdrop-blur py-4 border-t border-gray-700/30">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-400 text-sm font-semibold tracking-wide flex items-center justify-center flex-wrap gap-2 md:gap-4">
              <span className="flex items-center">
                <span className="text-indigo-400 mr-1" aria-hidden="true">🔒</span>
                Plateforme sécurisée
              </span>
              <span className="text-gray-500 hidden md:inline" aria-hidden="true">•</span>
              <span className="flex items-center">
                <span className="text-indigo-400 mr-1" aria-hidden="true">🇫</span>
                Hébergée au cameroun
              </span>
              <span className="text-gray-500 hidden md:inline" aria-hidden="true">•</span>
              <span className="flex items-center">
                <span className="text-indigo-400 mr-1" aria-hidden="true">✅</span>
                Conforme RGPD
              </span>
            </p>
          </div>
        </div>
      </footer>
      {/* Modals */}
      {createPortal(<PolicyModal isOpen={isPolicyOpen} onClose={() => setIsPolicyOpen(false)} />, document.body)}
      {createPortal(<ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />, document.body)}
      {createPortal(<TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />, document.body)}
    </React.Fragment>
  );
};

// Composant principal de l'application
export default function App() {
  return (
    <div className="antialiased min-h-screen flex flex-col bg-gray-50">
      {/* Simulation du contenu principal */}
      <main className="flex-grow p-4 md:p-8 bg-gray-50 text-center">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 mx-auto py-16 md:py-20">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Sparkles className="text-indigo-600" size={32} aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-black text-gray-900">
              Bienvenue sur Revise-IA
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
            Votre partenaire pour une révision intelligente et personnalisée. Découvrez notre plateforme révolutionnaire qui transforme votre façon d'apprendre.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 w-full sm:w-auto">
              <Star className="text-yellow-400 mx-auto mb-2" size={24} aria-hidden="true" />
              <div className="text-2xl font-bold text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-700">Note moyenne</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 w-full sm:w-auto">
              <Users className="text-indigo-600 mx-auto mb-2" size={24} aria-hidden="true" />
              <div className="text-2xl font-bold text-gray-900">2,500+</div>
              <div className="text-sm text-gray-700">Utilisateurs</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 w-full sm:w-auto">
              <BookOpen className="text-indigo-600 mx-auto mb-2" size={24} aria-hidden="true" />
              <div className="text-2xl font-bold text-gray-900">50k+</div>
              <div className="text-sm text-gray-700">Quiz créés</div>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Faites défiler vers le bas pour découvrir notre footer redesigné
          </p>
        </div>
      </main>
      {/* Le composant de pied de page */}
      <Footer />
    </div>
  );
};
