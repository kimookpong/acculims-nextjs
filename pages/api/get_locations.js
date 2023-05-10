import dbconnect from "./dbconnect";

export default function handler(req, res) {
  const q = req.body.q;
  let query;

  query = ` SELECT 
            province_code, 
            province,
            amphoe_code,
            amphoe,
            tambon_code,
            tambon,
            zipcode
            FROM tambons
            WHERE province like '%${q}%' OR amphoe like '%${q}%' OR tambon like '%${q}%' OR zipcode like '%${q}%' 
            LIMIT 20;`;

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
