exports.seed = async function(knex) {

  await knex('Reminders').del()

  await knex('Reminders').insert([
    {reminder_id: 1, username: 'test', date: '2024-01-20', time: '10:00:00', descritpion: 'some description', done: false },
  ]);
};
