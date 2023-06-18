const request = require('supertest');
const server = require('../server');
let inserted_id;
let token;

function parseCookieValue(setCookieHeader) {
    if (!setCookieHeader || !Array.isArray(setCookieHeader) || setCookieHeader.length === 0) {
      return null;
    }
  
    const cookieParts = setCookieHeader[0].split(';')[0].split('=');
    if (cookieParts.length !== 2) {
      return null;
    }
  
    const [cookieName, cookieValue] = cookieParts;
    return cookieValue;
  }

test('POST /signIn should set a session cookie with token', async () => {

    const response = await request(server).post('/api/user/signIn').send({
        username: 'test',
        password: 'test',
    });

    expect(response.status).toBe(200);
    expect(response.header['set-cookie']).toBeDefined();

    const setCookieHeader = response.header['set-cookie'];
    token = parseCookieValue(setCookieHeader);

    expect(token).toBeDefined();

    console.log(token);
    
});

test('GET /api/reminder/list should return a list of reminders', async () => {
    const response = await request(server).get('/api/reminder/list')
    .set('Authorization', 'Bearer ' + token)
    .withCredentials();
    expect(response.status).toBe(200);
});

test('GET /api/reminder/listNotes should return a list of notes', async () => {
    const response = await request(server).get('/api/reminder/listNotes')
    .set('Authorization', 'Bearer ' + token)
    .withCredentials();
    expect(response.status).toBe(200);
});

test('POST /api/reminder/create should create a new reminder', async () => {
    const newReminder = { date: '2024-01-20T09:00:00.000Z', description: 'test'};
    const response = await request(server).post('/api/reminder/create')
    .set('Authorization', 'Bearer ' + token)
    .withCredentials()
    .send(newReminder);

    inserted_id = response.body;
    expect(response.status).toBe(200);
});

test('PUT /api/reminder/update should update data of the reminder', async () => {
    const newData = { description: 'test pass'};
    const response = await request(server).put('/api/reminder/update')
    .set('Authorization', 'Bearer ' + token)
    .withCredentials()
    .send({
        reminder_id: inserted_id[0].reminder_id,
        data: newData,
    });
    
    expect(response.status).toBe(200);
});

test('DELETE /api/reminder/update should delete reminder', async () => {
    const response = await request(server).delete('/api/reminder/delete')
    .set('Authorization', 'Bearer ' + token)
    .withCredentials()
    .send({
        reminder_id: inserted_id[0].reminder_id,
    });
    
    expect(response.status).toBe(200);
});