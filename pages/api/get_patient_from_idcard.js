import dbconnect from "./dbconnect";

export default function handler(req, res) {
  const q = req.body.q;

  if (!q) {
    res.status(200).json("NO DATA");
  }

  const query = `SELECT 
  hn AS value
  FROM patient WHERE cid = '${q}'`;

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
