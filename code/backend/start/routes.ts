/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/Http/auth_controller'
import UploadsController from '#controllers/Http/UploadsController'
import QuizController from '#controllers/Http/QuizController'
import SummaryController from '#controllers/Http/SummaryController'
import FlashcardsController from '#controllers/Http/FlashcardController'

import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Groupe d'authentification
router.group(() => {
  router.post('/register', [AuthController, 'register'])
  router.post('/login', [AuthController, 'login'])
  // router.post('/logout', [AuthController, 'logout']).use(['auth'])
  router.get('/me', [AuthController, "me"]).use(middleware.auth({
    guards: ["api"]
  }))
}).prefix('/api/auth');

// Route upload protégée
router.post('/api/file/upload', [UploadsController,'store'])
  .use(middleware.auth({ guards: ['api'] }));

// Route quiz protégée
router.post('/api/quiz/generate', [QuizController, 'generate'])
  .use(middleware.auth({ guards: ['api'] }));

// Route flashcards protégée
router.post('/api/flashcards/generate', [FlashcardsController, 'generate'])
  .use(middleware.auth({ guards: ['api'] }));

// Route summary protégée
router.post('/api/summary/generate', [SummaryController, 'generate'])
  .use(middleware.auth({ guards: ['api'] }))

