import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class PasswordReset extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column()
  declare token: string

  @column()
  declare expiresAt: Date
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: Date
}

