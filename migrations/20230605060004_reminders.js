exports.up = function(knex) {
    return knex.schema
    .hasTable('Reminders')
    .then(function(exists) {
        if (!exists) {
          return knex.schema
            .createTable('Reminders', function(table) { // ask Jena about foreign key
                table.increments('reminder_id').primary();
                table.string('username');
                table.date('date');
                table.time('time');
                table.text('descritpion');
                table.boolean('done');
          });
        }
      });
};


exports.down = function(knex) {
    return knex.schema
    .dropTable('Reminders');
};

