import React from "react";
import "@/app/page"

const Footer = () => (
  <footer className="bg-blue-600 text-white text-center py-9">
    <p>© 2025 Revise-IA. Tous droits réservés.</p>
    <div className="flex justify-center gap-1 mt-2">
      <a href="#privacy" className="text-yellow-400 hover:underline">Politique</a>
      <a href="#contact" className="text-yellow-400 hover:underline">Contact</a>
    </div>
  </footer>
);

export default Footer;
