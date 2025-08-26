import { NextResponse, NextRequest } from 'next/server';

// Interface pour la réponse structurée de l'IA pour une question de quiz
interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

/**
 * Gère les requêtes GET pour fournir des instructions d'utilisation de l'API.
 * @param request La requête Next.js entrante.
 * @returns Une réponse JSON avec un message d'information.
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: "Pour générer un quiz, veuillez envoyer une requête POST à cette URL avec un corps JSON contenant un champ 'topic'.",
    example_body: { topic: "Histoire de la Rome antique" }
  }, { status: 200 });
}

/**
 * Gère une requête POST pour générer un quiz à partir d'un sujet donné.
 * Le corps de la requête doit contenir un objet avec une propriété `topic` (string).
 * @param request La requête Next.js entrante contenant le sujet.
 * @returns Une réponse JSON contenant le quiz généré ou une erreur.
 */
export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json({ error: "Le champ 'topic' est manquant dans la requête." }, { status: 400 });
    }

    // Le prompt pour l'IA, demandant un quiz structuré
    const prompt = `Génère un quiz de 5 questions à choix multiples sur le sujet suivant : "${topic}". Pour chaque question, inclut une question, une liste de 4 options de réponse, et la réponse correcte.`;

    // Configuration de la requête pour l'API Gemini avec un schéma JSON
    const payload = {
      contents: [{
        role: "user",
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              question: { "type": "STRING" },
              options: {
                "type": "ARRAY",
                "items": { "type": "STRING" }
              },
              answer: { "type": "STRING" }
            },
            propertyOrdering: ["question", "options", "answer"]
          }
        }
      }
    };

    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    // Appel à l'API Gemini pour générer le quiz
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Erreur de l'API: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    const generatedContent = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedContent) {
      return NextResponse.json({ error: "Aucun contenu généré par l'IA." }, { status: 500 });
    }

    // On s'assure que la réponse de l'IA est un JSON valide et correspond à notre interface
    const parsedQuiz: QuizQuestion[] = JSON.parse(generatedContent);

    // Retourner le quiz généré
    return NextResponse.json(parsedQuiz, { status: 200 });

  } catch (error) {
    console.error("Erreur lors de la génération du quiz :", error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la génération du quiz." }, { status: 500 });
  }
}
