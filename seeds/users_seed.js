exports.seed = async function(knex) {

  await knex('Users').del()

  await knex('Users').insert([
    {id: 1, username: 'test', password: 'test'},
  ]);
};
