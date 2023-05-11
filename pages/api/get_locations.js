import dbconnect from "./dbconnect";

export default function handler(req, res) {
  const q = req.body.q.split(/, | /);
  let condition = ``;
  q.map((item) => {
    condition += ` AND (province like '%${item}%' OR amphoe like '%${item}%' OR tambon like '%${item}%' OR zipcode like '%${item}%')`;
  });

  let query;

  query = ` SELECT 
            max(province_code) AS province_code, 
            max(province) AS province,
            max(amphoe_code) AS amphoe_code,
            max(amphoe) AS amphoe,
            tambon_code,
            max(tambon) AS tambon,
            max(zipcode) AS zipcode
            FROM tambons
            WHERE province <> '' ${condition}
            GROUP BY tambon_code
            ;`;

  console.log(query);

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
