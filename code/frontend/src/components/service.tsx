import React from 'react';
import "@/app/page"

// Composant pour une carte de fonctionnalité
const Card = ({ title, description, image }: { title: string; description: string; image: string }) => (
  <div className="flex-none bg-white shadow-lg rounded-xl p-6 w-64 text-center hover:scale-105 transform transition">
    <img src={image} alt={title} className="w-20 h-20 mx-auto mb-4"/>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Composant de la section Services
const Services = () => (
  <section id="services" className="py-20 bg-gray-100 text-center">
    <h2 className="text-3xl font-bold mb-12">Fonctionnalités principales</h2>
    <div className="flex flex-wrap justify-center gap-8 px-4 md:px-20 overflow-x-auto">
      <Card title="Génération de fiches" description="Créez vos fiches en quelques secondes." image="https://placehold.co/80x80/000000/FFFFFF?text=Fiches"/>
      <Card title="Quiz intelligent" description="Passez des quiz adaptés à votre niveau." image="https://placehold.co/80x80/000000/FFFFFF?text=Quiz"/>
      <Card title="Suivi de progression" description="Visualisez votre évolution." image="https://placehold.co/80x80/000000/FFFFFF?text=Progrès"/>
      <Card title="Rappels d'étude" description="Ne manquez jamais une session de révision." image="https://placehold.co/80x80/000000/FFFFFF?text=Rappel"/>
      <Card title="Tutorat IA" description="Recevez de l'aide pour vos devoirs et vos révisions." image="https://placehold.co/80x80/000000/FFFFFF?text=Tutorat"/>
      <Card title="Apprentissage gamifié" description="Rendez l'étude amusante avec des jeux." image="https://placehold.co/80x80/000000/FFFFFF?text=Jeux"/>
      <Card title="Synthèse vocale" description="Écoutez le contenu de vos fiches." image="https://placehold.co/80x80/000000/FFFFFF?text=Voix"/>
      <Card title="Mode hors ligne" description="Étudiez même sans connexion internet." image="https://placehold.co/80x80/000000/FFFFFF?text=Hors+Ligne"/>
      <Card title="Collaboration" description="Partagez et révisez avec vos amis." image="https://placehold.co/80x80/000000/FFFFFF?text=Collaboration"/>
    </div>
  </section>
);

export default Services;
