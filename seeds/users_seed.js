exports.seed = async function(knex) {

  await knex('Users').del()

  await knex('Users').insert([
    {user_id: 1, username: 'test', password: 'test'},
  ]);
};
