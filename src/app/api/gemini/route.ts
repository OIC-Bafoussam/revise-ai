import { NextRequest, NextResponse } from 'next/server';

// Cette route s'occupe des appels à l'API Gemini
export async function POST(req: NextRequest) {
  try {
    const { prompt, systemMessage } = await req.json();

    // Clé API de Google Gemini
    const apiKey = 'AIzaSyDdC3z4axWR3xcD2t9yZaJNirSeSGRO_hY'; // La clé API (à sécuriser en production)

    // Affichage des données reçues pour le débogage  

    console.log('Prompt:', prompt);
    console.log('System Message:', systemMessage);

    // Appel à l'API de génération de contenu Google Gemini
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }, // Utilisation du prompt passé depuis le frontend
            ],
          },
        ],
        systemInstruction: {
          parts: [
            { text: systemMessage },
          ],
        },
      }),
    });

    const apiData = await response.json();
    console.log('API Response:', apiData);

    if (response.ok) {
      // Retourner la réponse générée par l'API
      return NextResponse.json({ success: true, content: apiData?.candidates?.[0]?.content?.parts?.[0]?.text }, { status: 200 });
    } else {
      console.error('Erreur de l\'API Gemini:', apiData);
      return NextResponse.json({ success: false, error: 'Erreur lors de la génération du contenu' }, { status: 500 });
    }
  } catch (error) {
    console.error('Erreur lors de la génération de contenu:', error);
    return NextResponse.json({ success: false, error: 'Erreur interne' }, { status: 500 });
  }
}
