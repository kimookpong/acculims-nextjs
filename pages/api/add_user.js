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
  const username = req.body.user_name;
  const password = req.body.password;
  const pname = req.body.pname;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const user_type = req.body.user_type;
  const jobid = req.body.job_id;

  const query = `INSERT INTO lis_user (user_name,password,pname,fname,lname,user_type,job_id) VALUES ('${username}','${password}','${pname}','${fname}','${lname}','${user_type}','${jobid}')`;
  connection.query(query, function(err, result) {
      if (err) {
      console.error(err);
      return;
      }
      console.log(result);
  });
}