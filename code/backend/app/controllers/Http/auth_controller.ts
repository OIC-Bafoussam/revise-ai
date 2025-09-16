// import type { HttpContext } from '@adonisjs/core/http'
import User from "#models/User";
import { loginValidator, registerValidator } from "#validators/auth";
import { HttpContext } from "@adonisjs/core/http";

export default class AuthController {
    async register({ request, response }: HttpContext) {
        const validatedData = await request.validateUsing(registerValidator)

        const user = await User.create({
            fullName: validatedData.fullName,
            email: validatedData.email,
            password: validatedData.password,
        })

        if (!user) {
            return response.badRequest({ message: 'User registration failed' })
        }
        // Automatically log in the user after registration
        const token = await User.accessTokens.create(user)
        

        return response.created({ message: 'User registered successfully', user, token })
    }

    async login({ request, response }: HttpContext) {
        const validatedData = await request.validateUsing(loginValidator)
        const user = await User.findBy('email', validatedData.email)
        if (!user) {
            return response.unauthorized({ message: 'Invalid credentials' })
        }

        const isPasswordValid = await user.verifyPassword(validatedData.password)
        if (!isPasswordValid) {
            return response.unauthorized({ message: 'Invalid credentials' })
        }
        const token = await User.accessTokens.create(user)
        return response.ok({ message: 'Login successful', token, user })
    }

    async logout({ auth, response }: HttpContext) {
        if (!auth.user) {
            return response.unauthorized({ message: 'User not authenticated' })
        }
        return response.ok({ message: 'Logged out successfully' })
    }

    async me({ auth, response }: HttpContext) {
        const user = auth.user
        if (!user) {
            return response.unauthorized({ message: 'User not authenticated' })
        }
        return response.ok({ user })
    }
}