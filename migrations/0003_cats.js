exports.up = function (knex, Promise) {
  return knex.schema.createTable('cats', function (table) {
    table.increments('id').index()
    table.string('name', 255).notNullable()
    table.string('image', 255).notNullable()
    table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      .notNullable()
      .index()
      .onDelete('CASCADE')

    table.timestamps(false, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("cats")
}
