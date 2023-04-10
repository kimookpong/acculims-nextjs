import dbconnect from "./dbconnect";

export default function handler(req, res) {
  const q = req.body.q;
  const field = req.body.field;
  let query;

  if (field === "province") {
    query = `SELECT province_code as value, max(province) as label
            FROM tambons 
            GROUP BY value ORDER BY label`;
  } else if (field === "amphoe") {
    query = `SELECT RIGHT(amphoe_code, 2) as value, max(amphoe) as label
            FROM tambons 
            WHERE province_code = '${q}'
            GROUP BY value ORDER BY label`;
  } else if (field === "tambon") {
    query = `SELECT RIGHT(tambon_code, 2) as value, max(tambon) as label
            FROM tambons 
            WHERE amphoe_code = '${q}'
            GROUP BY value ORDER BY label`;
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
