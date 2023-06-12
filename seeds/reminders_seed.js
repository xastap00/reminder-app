exports.seed = async function(knex) {

  await knex('Reminders').del()

  await knex('Reminders').insert([
    {reminder_id: 1, username: 'test', date: '2024-01-20T10:00:00+01:00', descritpion: 'some description', done: false },
  ]);
};
