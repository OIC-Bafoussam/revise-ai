import React from "react";
import Link from "next/link";
import "@/app/page"
/**
 * Composant de section d'appel à l'action (CTA - Call-to-Action).
 * Il est conçu pour encourager l'utilisateur à effectuer une action spécifique, comme s'inscrire.
 */
function CTA() {
  return (
    <section className="py-20 px-4 text-center bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Prêt à améliorer votre apprentissage ?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Rejoignez des milliers d'étudiants et rendez votre révision plus intelligente, pas plus dure.
        </p>
        <a href="/auth/sign-up" className="py-4 px-8 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-colors">
          Inscrivez-vous gratuitement
        </a>
      </div>
    </section>
  );
}
export default CTA;