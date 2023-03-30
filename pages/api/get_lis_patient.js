import dbconnect from "./dbconnect";

export default function handler(req, res) {
  const findText = req.body.findText;
  let query = `SELECT 
  hn,
  cid,
  pname,
  fname,
  lname,
  birthday,
  concat(patient.pname, '', patient.fname, ' ', patient.lname) AS patient_name,
  DATE_FORMAT(DATE_ADD(birthday, INTERVAL 543 YEAR),'%d-%m-%Y') AS date
  FROM patient`;

  if (!!findText) {
    query =
      query +
      ` WHERE fname like '%${findText}%' OR lname like '%${findText}%' OR hn like '%${findText}%' `;
  }

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
