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
  specimen_code AS value, 
  specimen_name AS label 
  FROM lab_specimen_items`;
  connection.query(query, function (err, rows, fields) {
    connection.end();
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json(rows);
  });
}
