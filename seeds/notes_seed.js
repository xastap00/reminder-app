exports.seed = async function(knex) {

  await knex('Notes').del()

  await knex('Notes').insert([
    {note_id: 1, username: 'test', content: 'tessssssssst'},
  ]);
};

