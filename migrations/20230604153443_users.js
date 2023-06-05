exports.up = function(knex) {
    return knex.schema
    .hasTable('Users')
    .then(function(exists) {
        if (!exists) {
          return knex.schema
            .createTable('Users', function(table) {
                table.increments('user_id').primary();
                table.string('username');
                table.unique('username');
                table.string('password');
                table.unique('password');
          });
        }
      });
};


exports.down = function(knex) {
    return knex.schema
    .dropTable('Users');
};
