const mysql = require("mysql2");
const cron = require('node-cron');

require("dotenv").config()

const Connection = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
});

// const Connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   database: "qms",
// });

Connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

cron.schedule('* * * * * *', () => {
  Connection.query('CALL SPexpiretoken()', (error, results, fields) => {
    if (error) console.log(error);;
  });
});

// cron.schedule('* * * * * *', () => {
//   Connection.query("SELECT token_no FROM create_token WHERE is_active = 1 AND activity_status = 1 LIMIT 10", (error, results, fields) => {
//     if (error) throw error;
//     console.log(results);
//   }
// );
// });

module.exports = Connection;
