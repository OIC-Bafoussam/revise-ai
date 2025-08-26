import { NextRequest, NextResponse } from 'next/server';

/**
 * Cette route d'API gère la récupération des statistiques d'un utilisateur.
 * Dans un environnement de production, les données seraient extraites d'une base de données
 * basée sur l'ID de l'utilisateur authentifié.
 */
export async function GET(req: NextRequest) {
  try {
    // Dans une vraie application, l'ID de l'utilisateur serait récupéré depuis la session
    // ou le token d'authentification. Ici, nous utilisons un ID fictif pour l'exemple.
    const userId = 'user-12345';

    // Simulation de données de statistiques utilisateur récupérées d'une base de données.
    // Ces données représenteraient l'activité de l'utilisateur sur l'application.
    const userStats = {
      userId: userId,
      quizzesCompleted: 42,
      fichesGenerated: 15,
      averageQuizScore: 85.5,
      lastActive: new Date().toISOString(),
    };

    // Renvoyer les statistiques au format JSON.
    return NextResponse.json({ success: true, stats: userStats }, { status: 200 });

  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    // En cas d'erreur, renvoyer une réponse d'erreur.
    return NextResponse.json({ success: false, error: 'Une erreur interne est survenue.' }, { status: 500 });
  }
}
