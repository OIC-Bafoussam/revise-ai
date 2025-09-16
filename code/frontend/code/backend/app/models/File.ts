// app/models/File.ts

import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/User'
import RevisionItem from '#models/revision_item'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class File extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare originalName: string

  @column()
  declare fileName: string

  @column()
  declare path: string

  @column({ columnName: 'user_id' })
  declare userId: number

  // Un fichier appartient à un seul utilisateur
  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  // Un fichier peut générer plusieurs éléments de révision
  @hasMany(() => RevisionItem, {
    foreignKey: 'fileId',
  })
  declare revisionItems: HasMany<typeof RevisionItem>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}