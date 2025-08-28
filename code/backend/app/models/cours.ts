import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Cour extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare titre: String

  @column()
  declare contain: String

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}