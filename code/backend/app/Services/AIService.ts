export default class AIService {
  public static async generateQuiz(subject: string, level: string) {
    // Ici tu intègres ton modèle IA ou API
    return [
      { question: `Question sur ${subject} niveau ${level}`, options: ['A', 'B', 'C'], answer: 'A' }
    ]
  }

  public static async generateFlashcards(topic: string) {
    return [
      { front: `Qu'est-ce que ${topic}?`, back: `Définition de ${topic}` }
    ]
  }

  public static async summarizeText(text: string) {
    return `Résumé de: ${text.slice(0, 50)}...`
  }
}
