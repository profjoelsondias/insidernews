
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
      table.uuid('id').primary()
      table.text('username').unique().notNullable()
      table.text('password').notNullable()
      table.boolean('isAdmin').defaultTo(0)

      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
  } )
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};


