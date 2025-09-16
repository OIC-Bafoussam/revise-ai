import React from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import "@/app/page"

function CardFiche() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-sm mx-auto my-8">
      <h3 className="text-xl font-bold mb-4 text-center">Fiche de Révision</h3>
      <div className="p-4 bg-gray-100 rounded-lg">
        <h4 className="font-semibold text-lg mb-2">Sujet : Le système solaire</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Le Soleil est une étoile naine jaune.</li>
          <li>Huit planètes orbitent autour du Soleil.</li>
          <li>Mercure, Vénus, la Terre et Mars sont des planètes telluriques.</li>
          <li>Jupiter, Saturne, Uranus et Neptune sont des planètes gazeuses.</li>
        </ul>
      </div>
    </div>
  );
}
export default CardFiche;