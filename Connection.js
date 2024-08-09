const mysql = require("mysql2");
const cron = require('node-cron');
require("dotenv").config();

let Connection;

function handleDisconnect() {
  Connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
  });

  Connection.connect((err) => {
    if (err) {
      setTimeout(handleDisconnect, 2000); // Retry after 2 seconds
    }
  });

  Connection.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err; // Other errors should not be ignored
    }
  });
}

handleDisconnect(); 

// Schedule your cron jobs here as before
cron.schedule('* * * * * *', () => {
  Connection.query('CALL SPexpiretoken()', (error, results, fields) => {
    if (error) {
      return;
    }
  });
});

module.exports = Connection;
