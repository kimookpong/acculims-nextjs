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
  let date_start = req.body.date_start;
  let date_stop = req.body.date_stop;
  console.log(date_start, date_stop);

  let cond = ``;
  if (date_start != undefined && date_stop != undefined) {
    cond = cond + `WHERE date_time BETWEEN '${date_start}' AND '${date_stop}'`;
  }

  const query = `SELECT * FROM approved_log ${cond}`;
  console.log("query = ", query);

  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json(rows);
  });
}
