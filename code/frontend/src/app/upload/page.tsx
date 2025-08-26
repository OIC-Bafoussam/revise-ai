'use client';

import { useState } from 'react';
import "@/app/page";// Importation des styles globaux

// Liste des liens de navigation avec des icônes
const navLinks = [
{ href: '/acceuilPage', label: 'Accueil', icon: (isActive: boolean) => (
<svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001 1h2a1 1 0 001-1m-6 0v-2.5a2.5 2.5 0 01-2.5-2.5V9.5" />
</svg>
)},
{ href: '/upload', label: 'Uploader', icon: (isActive: boolean) => (
<svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
</svg>
)},
{ href: '/generateQuiz', label: 'Quiz', icon: (isActive: boolean) => (
<svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 16h.01" />
</svg>
)},
{ href: '/generateResume', label: 'Résumés', icon: (isActive: boolean) => (
<svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h.01M12 11h.01M15 11h.01M12 16h.01M12 19h.01" />
</svg>
)},
{ href: '/flashQuiz', label: 'FlashQuiz', icon: (isActive: boolean) => (
<svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.5a2.5 2.5 0 012.5-2.5h1.5a1 1 0 011 1v1.5a2.5 2.5 0 01-2.5 2.5H12a2.5 2.5 0 01-2.5-2.5V6.5m2.5 0v3m0 0v3m0-3h1.5m-1.5 0h-3" />
</svg>
)},
{ href: '/coach-selection', label: 'Coachs', icon: (isActive: boolean) => (
<svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2a2 2 0 002 2h14a2 2 0 002-2zm-2-2h-2m-4-2H5m1.5-6a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
</svg>
)
},
{ href: '/profile', label: 'Profil', icon: (isActive: boolean) => (
<svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
</svg>
)},
{ href: '/parametre', label: 'Réglages', icon: (isActive: boolean) => (
<svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.527.245 1.1-.09 1.486-.525L10.325 4.317z" />
</svg>
)},
{ href: '/pageDaide', label: 'Aide', icon: (isActive: boolean) => (
<svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9.255a.99.99 0 100-1.98.99.99 0 000 1.98zM12 12a4.5 4.5 0 01-4.5 4.5h-.5a1 1 0 100 2h5a1 1 0 100-2h-.5A2.5 2.5 0 0012 12z" />
</svg>
)},
{ href: '/logout', label: 'Déconnexion', icon: (isActive: boolean) => (
<svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-red-500' : 'text-gray-500 group-hover:text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
</svg>
)},
];
/**
* Barre de navigation verticale pour l'application.
* Comprend des liens vers différentes pages et un bouton de déconnexion.
*/
function Navbar() {
const [activeLink, setActiveLink] = useState('/upload'); // Active 'Uploader' par défaut pour cette démo.
// Gère la déconnexion (simulée)
const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
e.preventDefault(); // Empêche le comportement par défaut du lien
console.log("Déconnexion de l'utilisateur...");
window.location.href = '/login'; // Redirection vers la page de connexion
};
return (
<nav className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col p-6 shadow-lg">
<div className="flex items-center space-x-3 mb-10">
<div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
S
</div>
<span className="text-xl font-bold text-gray-900">StudyMate</span>
</div>
<div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
{navLinks.map((link) => (
<a
key={link.href}
href={link.href}
onClick={(e) => {
setActiveLink(link.href);
if (link.href === '/logout') {
handleLogout(e);
}
}}
className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
${activeLink === link.href ? 'bg-blue-100 text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-100'}
${link.href === '/logout' ? 'text-red-500 font-semibold' : ''}`}>
{link.icon(activeLink === link.href)}
<span>{link.label}</span></a>
))}
</div>
</nav>
);
}
// Composant de la page d'upload
function UploadPage() {
const [file, setFile] = useState<File | null>(null);
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState('');
const [error, setError] = useState('');
// Gère la sélection du fichier par l'utilisateur
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
if (e.target.files && e.target.files.length > 0) {
setFile(e.target.files[0]);
setMessage('');
setError('');
}
};
// Gère l'envoi du formulaire
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();
if (!file) {
setError("Veuillez sélectionner un fichier à uploader.");
return;
}
setLoading(true);
setMessage('Envoi en cours...');
setError('');
const formData = new FormData();
formData.append('file', file);
try {
// Appel à l'API d'upload
const response = await fetch('/api/upload', {
method: 'POST',
body: formData,
});
if (!response.ok) {
throw new Error(`Erreur d'upload: ${response.statusText}`);
}
const result = await response.json();
setMessage('Fichier uploadé avec succès ! ' + result.message);
setFile(null); // Réinitialiser le fichier sélectionné
} catch (err) {
console.error(err);
setError("Erreur lors de l'upload du fichier. Veuillez réessayer.");
setMessage('');
} finally {
setLoading(false);
}
};
return (
<div className="flex-1 p-6 md:p-10 flex flex-col items-center overflow-y-auto">
<h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-8 drop-shadow-lg text-center">
Uploader un Fichier
</h1>
<div className="w-full max-w-2xl p-8 bg-white rounded-3xl shadow-2xl border border-blue-200">
<p className="text-gray-700 text-center mb-6 text-lg font-medium">
Uploadez un document pour générer automatiquement une fiche ou un quiz.
</p>
<form onSubmit={handleSubmit} className="space-y-8">
<div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-2xl p-12 cursor-pointer hover:bg-blue-50 transition-colors duration-300 group">
<input
id="file-upload"
type="file"
onChange={handleFileChange}
className="hidden"
/>
<label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400 mb-4 transition-transform duration-3.00 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-4-4v-1a4 4 0 014-4h14a4 4 0 014 4v1a4 4 0 01-4 4h-1M7 16l4-4m0 0l4 4m-4-4v9" />
</svg>
<p className="text-blue-600 font-bold text-center text-lg group-hover:underline">
Cliquez pour uploader
</p>
<span className="text-gray-500 font-medium text-center text-base">
ou glissez-déposez un fichier.
</span>
</label>
{file && (
<p className="mt-4 text-blue-700 font-semibold text-base transition-opacity duration-300 animate-fade-in">
Fichier sélectionné : <span className="text-blue-600 font-bold">{file.name}</span>
</p>
)}
</div>
<button
type="submit"
disabled={loading || !file}
className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 transform
${loading || !file
? 'bg-gray-400 cursor-not-allowed'
: 'bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-105'
}`}>
{loading ? 'Envoi en cours...' : 'Générer la fiche/le quiz'}
</button>
</form>
{message && (
<div className="mt-8 p-5 bg-green-50 border border-green-400 text-green-700 rounded-lg text-center shadow-md animate-fade-in">
<p className="font-semibold text-lg">{message}</p>
</div>
)}
{error && (
<div className="mt-8 p-5 bg-red-50 border border-red-400 text-red-700 rounded-lg text-center shadow-md animate-fade-in">
<p className="font-semibold text-lg">{error}</p>
</div>
)}
</div>
</div>
);
}
// Composant d'application principal qui combine la navigation et le contenu de la page
export default function App() {
return (
<div className="flex flex-row bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
<Navbar />
<UploadPage />
</div>
);
}

