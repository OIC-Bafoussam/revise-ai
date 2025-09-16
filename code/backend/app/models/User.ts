//app/models/User.ts

import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeSave, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany } from '@adonisjs/lucid/types/relations'

import Group from '#models/groupe'
import File from '#models/File'
import RevisionItem from '#models/revision_item'
import GroupMember from '#models/group_member'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  // Un utilisateur peut être propriétaire de plusieurs groupes
  @hasMany(() => Group, {
    foreignKey: 'ownerId',
  })
  declare ownedGroups: HasMany<typeof Group>

  // Un utilisateur a plusieurs fichiers
  @hasMany(() => File, {
    foreignKey: 'userId',
  })
  declare files: HasMany<typeof File>

  // Un utilisateur a plusieurs éléments de révision (quizz, résumés, etc.)
  @hasMany(() => RevisionItem, {
    foreignKey: 'userId',
  })
  declare revisionItems: HasMany<typeof RevisionItem>

  // Un utilisateur a plusieurs adhésions à des groupes
  @hasMany(() => GroupMember, {
    foreignKey: 'userId',
  })
  declare groupMemberships: HasMany<typeof GroupMember>
}
