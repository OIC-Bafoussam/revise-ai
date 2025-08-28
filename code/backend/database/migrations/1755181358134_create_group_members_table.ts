// database/migrations/your_timestamp_create_group_members_table.ts

import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'group_members'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('group_id').unsigned().references('id').inTable('groups').onDelete('CASCADE')
      table.enum('role', ['teacher', 'student']).notNullable()
      table.enum('status', ['pending', 'accepted', 'declined']).defaultTo('pending').notNullable()
      table.unique(['user_id', 'group_id'])
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}