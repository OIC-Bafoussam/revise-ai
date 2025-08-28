// app/services/gemini_service.ts

import { GoogleGenerativeAI } from '@google/generative-ai'
import env from '#start/env'

const geminiApiKey = env.get('GEMINI_API_KEY')

if (!geminiApiKey) {
  throw new Error('GEMINI_API_KEY est manquant dans les variables d\'environnement. Veuillez définir GEMINI_API_KEY dans votre fichier .env')
}

const genAI = new GoogleGenerativeAI(geminiApiKey)

// CHANGEMENT ICI : Utilisation de 'gemini-1.5-flash-latest'
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' })

export default model
