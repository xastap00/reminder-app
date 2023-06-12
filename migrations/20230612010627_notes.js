exports.up = function(knex) {
    return knex.schema
    .hasTable('Notes')
    .then(function(exists) {
        if (!exists) {
          return knex.schema
            .createTable('Notes', function(table) {
                table.increments('note_id').primary();
                table.string('username');
                table.text('content');
          });
        }
      });
};


exports.down = function(knex) {
    return knex.schema
    .dropTable('Notes');
};
