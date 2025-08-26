import React from "react";
import "@/app/page"
// Le composant Feature n'est pas utilisé dans ce code,
// car l'implémentation est directement dans ce fichier.

export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white rounded-2xl shadow">
          <img src="/images/feature1.png" alt="Feature 1" className="mx-auto mb-4 h-60" />
          <h3 className="text-xl font-semibold">Révisions guidées</h3>
          <p className="text-gray-600 mt-2">Des quiz et fiches adaptés à ton niveau.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow">
          <img src="/images/feature2.png" alt="Feature 2" className="mx-auto mb-4 h-60" />
          <h3 className="text-xl font-semibold">IA intelligente</h3>
          <p className="text-gray-600 mt-2">L’IA t’accompagne pour cibler tes faiblesses.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow">
          <img src="/images/feature3.png" alt="Feature 3" className="mx-auto mb-4 h-60" />
          <h3 className="text-xl font-semibold">Suivi de progression</h3>
          <p className="text-gray-600 mt-2">Suis tes performances en temps réel.</p>
        </div>
      </div>
    </section>
  );
}
