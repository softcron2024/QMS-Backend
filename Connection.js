const mysql = require("mysql2");
const cron = require('node-cron');

const Connection = mysql.createConnection({
  host: "103.108.220.238",
  user: "qms_dbuser",
  password: "Svhj11_74",
  database: "softnew_qms",
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
