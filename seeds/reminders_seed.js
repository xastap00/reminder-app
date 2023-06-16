exports.seed = async function(knex) {

  await knex('Reminders').del()

  await knex('Reminders').insert([
    {username: 'test', date: '2024-01-20T10:00:00+01:00', description: 'some description', done: false },
    {username: 'test', date: '2023-05-20T10:00:00+01:00', description: 'some description', done: true },
    {username: 'test', date: '2024-01-20T11:00:00+01:00', description: 'some description', done: false },
    {username: 'test', date: '2024-01-20T12:00:00+01:00', description: 'some description', done: false },
  ]);
};
