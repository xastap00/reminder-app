module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            port: 5432,
            user: 'reminder',
            password: 'reminder',
            database: 'reminder_db'
        },
    }
};
