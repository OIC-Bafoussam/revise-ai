import { NextResponse, NextRequest } from 'next/server';

// Définition de l'interface pour la réponse structurée de l'IA
interface FicheResponse {
  title: string;
  content: string;
}

/**
 * Gère les requêtes GET pour fournir des instructions d'utilisation de l'API.
 * @param request La requête Next.js entrante.
 * @returns Une réponse JSON avec un message d'information.
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: "Pour générer une fiche, veuillez envoyer une requête POST à cette URL avec un corps JSON contenant un champ 'topic'.",
    example_body: { topic: "Histoire de la Rome antique" }
  }, { status: 200 });
}

/**
 * Gère une requête POST pour générer une fiche de révision à l'aide d'un modèle de langage.
 * Le corps de la requête doit contenir un objet avec une propriété `topic` (string).
 * @param request La requête Next.js entrante contenant le sujet.
 * @returns Une réponse JSON contenant la fiche générée ou une erreur.
 */
export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json({ error: "Le champ 'topic' est manquant dans la requête." }, { status: 400 });
    }

    // Le prompt pour l'IA, demandant une fiche de révision structurée.
    const prompt = `Génère une fiche de révision détaillée sur le sujet suivant : "${topic}". La fiche doit inclure un titre et un contenu riche en informations.`;

    // Configuration de la requête pour l'API Gemini
    const payload = {
      contents: [{
        role: "user",
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            title: { "type": "STRING" },
            content: { "type": "STRING" }
          },
          propertyOrdering: ["title", "content"]
        }
      }
    };

    const apiKey = "AIzaSyDdC3z4axWR3xcD2t9yZaJNirSeSGRO_hY";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    // Appel à l'API Gemini pour générer la fiche
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    // Si la réponse n'est pas OK, lever une erreur
    if (!response.ok) {
      throw new Error(`Erreur de l'API: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    const generatedContent = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedContent) {
      return NextResponse.json({ error: "Aucun contenu généré par l'IA." }, { status: 500 });
    }

    // On s'assure que la réponse de l'IA est un JSON valide
    const parsedFiche: FicheResponse = JSON.parse(generatedContent);

    // Retourner la fiche générée
    return NextResponse.json(parsedFiche, { status: 200 });

  } catch (error) {
    console.error("Erreur lors de la génération de la fiche :", error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la génération de la fiche." }, { status: 500 });
  }
}
