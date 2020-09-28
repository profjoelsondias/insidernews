
exports.up = function(knex) {
    return knex.schema.createTable('posts', function(table){
        table.uuid('id').primary()
        table.text('author_id').unique().notNullable()
        table.text('content', 'longText').notNullable()
        table.text('categories').notNullable()
        table.boolean('aprroved').defaultTo(0)

  
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    } )
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('posts');
  };
  
  
  