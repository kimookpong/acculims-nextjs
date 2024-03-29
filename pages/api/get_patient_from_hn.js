import dbconnect from "./dbconnect";

export default function handler(req, res) {
  const q = req.body.q.split(/, | /);
  let condition = ``;
  q.map((item) => {
    condition += ` AND (hn like '%${item}%' OR fname like '%${item}%'  OR lname like '%${item}%')`;
  });

  console.log(condition);

  const query = `SELECT 
  hn AS value,
  sex,
  birthday,
  concat(pname, '', fname, ' ', lname)  AS label
  FROM patient WHERE hn <> '' ${condition} LIMIT 5`;

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
