// app/models/RevisionItem.ts

import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/User'
import File from '#models/File'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class RevisionItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column({ columnName: 'file_id' })
  declare fileId: number

  @column()
  declare type: 'quiz' | 'summary' | 'flashcard'

  @column()
  declare content: any

  @column({ columnName: 'user_id' })
  declare userId: number

  // Un élément de révision appartient à un seul utilisateur
  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  // Un élément de révision appartient à un seul fichier source
  @belongsTo(() => File, {
    foreignKey: 'fileId',
  })
  declare file: BelongsTo<typeof File>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}