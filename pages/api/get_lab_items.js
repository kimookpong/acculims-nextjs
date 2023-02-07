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
  const lab_group = req.body.lab_group;
  const lab_name = req.body.lab_name;

  let cond = ``;
  if((lab_group !== undefined && lab_group !== '') || (lab_name != undefined && lab_name !== '')){ cond = cond + `WHERE `}
  if(lab_group !== '' && lab_group !== undefined){ cond = cond + ` lab_group = '${lab_group}'`;}
  if(lab_group !== undefined && lab_name != undefined){ cond = cond + ` AND `}
  if(lab_name !== '' && lab_name != undefined){ cond = cond + ` lab_items_name = '${lab_name}'`;}
  
  let query = `SELECT * FROM lab_items ${cond}`;

  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json(rows)
  });
}
