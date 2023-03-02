import dbconnect from "./dbconnect";

export default function handler(req, res) {
  const findText = req.body.findText;
  let query = `SELECT * FROM lis_user`;

  if (!!findText) {
    query =
      query +
      ` WHERE fname like '%${findText}%' OR lname like '%${findText}%' OR user_name like '%${findText}%' `;
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
