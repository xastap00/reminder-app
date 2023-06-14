exports.seed = async function(knex) {

  await knex('Reminders').del()

  await knex('Reminders').insert([
    {reminder_id: 1, username: 'test', date: '2024-01-20T10:00:00+01:00', description: 'some description', done: false },
    {reminder_id: 2, username: 'test', date: '2023-05-20T10:00:00+01:00', description: 'some description', done: true },
    {reminder_id: 3, username: 'test', date: '2024-01-20T11:00:00+01:00', description: 'some description', done: false },
    {reminder_id: 4, username: 'test', date: '2024-01-20T12:00:00+01:00', description: 'some description', done: false },
  ]);
};
