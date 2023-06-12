exports.seed = async function(knex) {

  await knex('Users').del()

  await knex('Users').insert([
    {user_id: 1, username: 'test', password: '$2a$10$6m8wzJGVWsWVajWOBTYgYOVTrRR3CHA4.ufOC6L9xCtjK4YRCtU9i'}, // "test" in hash
  ]);
};
