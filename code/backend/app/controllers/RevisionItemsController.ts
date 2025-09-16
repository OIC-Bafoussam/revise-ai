// app/controllers/Http/RevisionItemsController.ts

import type { HttpContext } from '@adonisjs/core/http'
import RevisionItem from '#models/revision_item'
// Pas besoin d'importer File ici si le preload('file') est utilisé et que le modèle File est déjà défini

export default class RevisionItemsController {
  /**
   * Liste tous les éléments de révision pour l'utilisateur authentifié.
   * GET /api/revision-items
   */
  async index({ auth, response }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized({ message: 'Authentification requise.' })
      }

      // Récupérer tous les éléments de révision de l'utilisateur, précharger les infos du fichier source, et trier par date de création.
      const revisionItems = await RevisionItem.query()
        .where('userId', user.id)
        .preload('file') // Précharge les informations du fichier source lié
        .orderBy('createdAt', 'desc')
      return response.ok(revisionItems)

    } catch (error) {
      console.error('Erreur lors de la récupération des éléments de révision:', error)
      return response.internalServerError({ message: 'Une erreur est survenue lors de la récupération des éléments de révision.' })
    }
  }

  /**
   * Liste les éléments de révision d'un type spécifique pour l'utilisateur authentifié.
   * GET /api/revision-items/:type (ex: /api/revision-items/quizzes, /api/revision-items/summaries)
   */
  async showByType({ params, auth, response }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized({ message: 'Authentification requise.' })
      }

      // Valider le type d'élément
      const itemType = params.type;
      const validTypes = ['quiz', 'summary', 'flashcard'];
      if (!validTypes.includes(itemType)) {
        return response.badRequest({ message: 'Type d\'élément de révision invalide. Types acceptés: quiz, summary, flashcard.' });
      }

      const revisionItems = await RevisionItem.query()
        .where('userId', user.id)
        .where('type', itemType)
        .preload('file')
        .orderBy('createdAt', 'desc')
      
      return response.ok(revisionItems)

    } catch (error) {
      console.error(`Erreur lors de la récupération des éléments de révision de type ${params.type}:`, error)
      return response.internalServerError({ message: `Une erreur est survenue lors de la récupération des ${params.type}.` })
    }
  }

  /**
   * Affiche un élément de révision spécifique par son ID pour l'utilisateur authentifié.
   * GET /api/revision-item/:id
   */
  async showById({ params, auth, response }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized({ message: 'Authentification requise.' })
      }

      const revisionItem = await RevisionItem.query()
        .where('id', params.id)
        .where('userId', user.id) // S'assurer que l'utilisateur est bien le propriétaire
        .preload('file')
        .firstOrFail() // Lève une erreur 404 si non trouvé

      return response.ok(revisionItem)

    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Élément de révision introuvable ou non autorisé.' })
      }
      console.error(`Erreur lors de la récupération de l'élément de révision ${params.id}:`, error)
      return response.internalServerError({ message: 'Une erreur est survenue lors de la récupération de l\'élément de révision.' })
    }
  }
}
