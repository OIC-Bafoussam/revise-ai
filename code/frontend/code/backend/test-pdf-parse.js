// test-pdf-parse.js
import fs from 'node:fs/promises';
import pdf from 'pdf-parse';
import path from 'node:path';

async function testPdfParse() {
    try {
        // REMPLACER 'your-uploaded-file.pdf' PAR LE NOM D'UN DE VOS PDFS EXISTANTS DANS public/uploads
        // Par exemple: "mon_document.pdf" ou "c25hz0f1pruygtbmqfa5gaqk.jpeg" si c'est un PDF renommé en .jpeg
        const pdfFileName = 'iwcjfvgprr52kmwwo8spws0q.pdf'; 

        const pdfPath = path.join(process.cwd(), 'public', 'uploads', pdfFileName); // Utiliser process.cwd() pour la racine du projet

        console.log(`Tentative de lecture du PDF depuis : ${pdfPath}`);

        // Lire le fichier PDF en tant que Buffer
        const dataBuffer = await fs.readFile(pdfPath);
        console.log(`Lecture du Buffer PDF réussie (longueur : ${dataBuffer.length})`);

        // Parser le Buffer PDF
        const data = await pdf(dataBuffer);
        console.log('Parsing du PDF réussi.');
        console.log('Texte extrait (premiers 500 caractères) :\n', data.text.substring(0, 500));
    } catch (error) {
        console.error('Erreur dans test-pdf-parse.js :', error);
        if (error.code === 'ENOENT' && error.path && error.path.includes('pdf-parse')) {
            console.error("L'erreur semble être interne à 'pdf-parse' (accès à ses propres fichiers de test).");
            console.error("Cela indique un problème d'installation ou d'environnement.");
        }
    }
}

testPdfParse();
