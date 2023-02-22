const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

connection.connect(function(err) {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('Connected to database as id ' + connection.threadId);
  });

export default function handler(req, res) {
  const user_id = req.body.user_id;

  const query = `DELETE FROM lis_user WHERE id_user = '${user_id}'`;
  connection.query(query, function(err, result) {
      if (err) {
      console.error(err);
      return;
      }
      console.log(result);
  });
}