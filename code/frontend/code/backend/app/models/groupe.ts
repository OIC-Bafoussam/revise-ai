// app/models/Group.ts

import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import User from '#models/User'
import type { HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Group extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column({ columnName: 'owner_id' })
  declare ownerId: number

  @hasOne(() => User, {
    foreignKey: 'id',
    localKey: 'ownerId',
  })
  declare owner: HasOne<typeof User> // Le type HasOne<typeof User> est toujours utilisé ici

  // Un groupe a plusieurs membres. On utilise une relation `manyToMany`
  // via la table pivot 'group_members'.
  @manyToMany(() => User, {
    pivotTable: 'group_members',
    localKey: 'id',
    pivotForeignKey: 'group_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
  })
  declare members: ManyToMany<typeof User> // Le type ManyToMany<typeof User> est toujours utilisé ici

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}