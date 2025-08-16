/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'
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
    guards:["api"]
  }))
}).prefix('api/auth')
