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
import PasswordResetController from '#controllers/Http/PasswordResetController' // <-- Contrôleur unique maintenant
import UploadsController from '#controllers/Http/UploadsController'
import QuizController from '#controllers/Http/QuizController'
import SummaryController from '#controllers/Http/SummaryController'
import FlashcardsController from '#controllers/Http/FlashcardController'

import { middleware } from './kernel.js'
import RevisionItemsController from '#controllers/RevisionItemsController'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Groupe d'authentification
router.group(() => {
  router.post('/register', [AuthController, 'register'])
  router.post('/login', [AuthController, 'login'])
  
  router.get('/me', [AuthController, "me"]).use(middleware.auth({
    guards: ["api"]
  }))
}).prefix('/api/auth');

// Groupe de réinitialisation du mot de passe
router.group(() => {
  // Les deux routes pointent maintenant vers le même contrôleur.
  router.post('/forgot-password', [PasswordResetController, 'forgotPassword'])
  router.post('/reset-password', [PasswordResetController, 'resetPassword'])
}).prefix('/api/password-reset');

// Route upload protégée
router.post('/api/file/upload', [UploadsController,'store'])
  .use(middleware.auth({ guards: ['api'] }));

// Route quiz protégée
router.post('/api/quiz/generate', [QuizController, 'generate'])
router.get('quiz/:id', [QuizController, 'show'])
  .use(middleware.auth({ guards: ['api'] }));

// Route flashcards protégée
router.post('/api/flashcards/generate', [FlashcardsController, 'generate'])
  .use(middleware.auth({ guards: ['api'] }));

// Route summary protégée
router.post('/api/summary/generate', [SummaryController, 'generate'])
  .use(middleware.auth({ guards: ['api'] }))

router.group(() => {
  router.get('/api/revision-item', [RevisionItemsController, 'index'])
      .use(middleware.auth({ guards: ['api'] }));
  router.get('/app/revision-item/:type', [RevisionItemsController, 'showByType'])
      .use(middleware.auth({ guards: ['api'] }));
  router.get('/app/revision-item/:id', [RevisionItemsController, 'showById'])
      .use(middleware.auth({ guards: ['api'] }));
}).prefix('/api')
