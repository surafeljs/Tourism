const { Pool } = require('pg');

const pg_connection = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_urwVU3ag5APh@ep-misty-band-adu627nc-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    ssl: {
        rejectUnauthorized: true // verify NeonDB's SSL certificate
    }
});

// Test connection
pg_connection.connect()
    .then(client => {
        console.log('PostgreSQL connected');
        client.release(); // release the client back to the pool
    })
    .catch(err => {
        console.error('Connection error:', err); // log the actual error
    });

module.exports = pg_connection;