import dbconnect from "./dbconnect";

export default function handler(req, res) {
  const username = req.body.user_name;
  const password = req.body.password;
  const pname = req.body.pname;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const user_type = req.body.user_type;
  const jobid = req.body.job_id;
  const query = `INSERT INTO lis_user (user_name,password,pname,fname,lname,user_type,job_id) VALUES ('${username}','${password}','${pname}','${fname}','${lname}','${user_type}','${jobid}')`;

  const connection = dbconnect();
  connection.connect(function (err) {
    if (err) {
      console.error("Error connecting to database: " + err.stack);
      return;
    }
    console.log("Connected to database as id " + connection.threadId);

    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.error(err);
        return;
      }
      res.status(200).json(rows);
      connection.end((err) => {
        if (err) {
          console.error("Error closing database connection:", err);
        } else {
          console.log("Connection closed.");
        }
      });
    });
  });
}
