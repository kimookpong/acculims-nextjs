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
  let id = req.body.id;
  let lot_name = req.body.lot_name;
  let level = req.body.level;
  let items_group = req.body.items_group;
  let items_name = req.body.items_name;
  let control_mean = req.body.control_mean;
  let control_sd = req.body.control_sd;
  
  const query = `UPDATE lab_qc_test SET control_name = '${lot_name}', level = '${level}',
  items_group = '${items_group}',items_name = '${items_name}',control_mean = '${control_mean}',
  control_sd = '${control_sd}' WHERE id = '${id}'`;

  connection.query(query, function(err, result) {
      if (err) {
      console.error(err);
      return; }
      console.log(result);
  });
}