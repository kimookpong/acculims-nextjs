import moment from 'moment';

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
  let lot_name = req.body.lot_name;
  let level = req.body.level;
  let lot_number = req.body.lot_number;
  let date_add = moment().format('YYYY-MM-DD');
  let date_exp = req.body.date_exp;
  
  const query = `INSERT INTO lab_qc_control (lot_name,level,lot_number,date_add,date_expire) 
  VALUES ('${lot_name}','${level}','${lot_number}','${date_add}','${date_exp}')`;
  connection.query(query, function(err, result) {
      if (err) {
      console.error(err);
      return; }
      console.log(result);
  });
}