exports.up = function(knex) {
    return knex.schema
    .hasTable('Reminders')
    .then(function(exists) {
        if (!exists) {
          return knex.schema
            .createTable('Reminders', function(table) {
                table.increments('reminder_id').primary();
                table.string('username');
                table.datetime('date');
                table.text('description');
                table.boolean('done').default(false);
          });
        }
      });
};


exports.down = function(knex) {
    return knex.schema
    .dropTable('Reminders');
};

