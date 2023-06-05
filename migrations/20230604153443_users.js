exports.up = function(knex) {
    return knex.schema
    .hasTable('Users')
    .then(function(exists) {
        if (!exists) {
          return knex.schema
            .createTable('Users', function(table) {
                table.increments('id').primary();
                table.string('username');
                table.string('password');
          });
        }
      });
};


exports.down = function(knex) {
    return knex.schema
    .dropTable('Users');
};
