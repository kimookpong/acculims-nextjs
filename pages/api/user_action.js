import dbconnect from "./dbconnect";
const connection = dbconnect();

connection.connect(function (err) {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + connection.threadId);
});

export default function handler(req, res) {
  const action = req.body.action;
  const values = req.body.values;

  const username = values.user_name;
  const password = values.password;
  const pname = values.pname;
  const fname = values.fname;
  const lname = values.lname;
  const user_type = values.user_type;
  const jobid = values.job_id !== null ? values.job_id : "";
  let query = ``;
  if (action === "update") {
    query = `UPDATE lis_user SET 
    user_name = '${username}', 
    password = '${password}', 
    pname = '${pname}', 
    fname = '${fname}', 
    lname = '${lname}', 
    user_type = '${user_type}', 
    job_id = '${jobid}'
    WHERE id_user = ${req.body.id_user}`;
  } else if (action === "create") {
    query = `INSERT INTO lis_user (user_name,password,pname,fname,lname,user_type,job_id) VALUES ('${username}','${password}','${pname}','${fname}','${lname}','${user_type}','${jobid}')`;
  }
  connection.query(query, function (err, result) {
    connection.end();
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json(result);
  });
}
