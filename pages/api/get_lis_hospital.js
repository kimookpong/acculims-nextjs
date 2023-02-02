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
  const name = req.body.name;
  const nameeng = req.body.nameeng;
  const address = req.body.address;
  const tel = req.body.tel;
  const dept = req.body.dept;
  const logo = req.body.logo;

  const query = 'SELECT `id_hospital`,`hospital_name_th` FROM `lis_hospital`';
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json(rows)
  });
}
