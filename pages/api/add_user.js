import dbconnect from "./dbconnect";
const connection = dbconnect();

connection.connect(function(err) {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('Connected to database as id ' + connection.threadId);
  });

export default function handler(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const pname = req.body.pname;
  const fname = req.body.fname;
  const job_id = req.body.job_id;
  const lname = req.body.lname;

  const query = `INSERT INTO lis_user (user_name, password, pname, fname, lname, job_id) VALUES (${username},${password},${pname},${fname},${lname},${job_id})`;
  connection.query(query, function(err, result) {
      if (err) {
      console.error(err);
      return;
      }
      console.log(result);
  });
}