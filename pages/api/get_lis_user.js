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
  const query = `SELECT 
  user_name AS value,
  concat(pname,fname,' ',lname) AS label
  FROM lis_user`;
  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json(rows);
  });
}
