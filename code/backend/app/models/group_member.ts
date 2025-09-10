import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class GroupMember extends BaseModel {
  @column({ isPrimary: true })
  declare id: Number

  @column({ columnName: 'user_id' })
  declare userId: Number

  @column({ columnName: 'group_id' })
  declare groupId: Number

  @column()
  declare status: 'pending' | 'accepted' | 'declined'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}