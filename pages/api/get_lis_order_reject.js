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
  const date_start = req.body.date_start;
  const date_stop = req.body.date_stop;
  const hn = req.body.hn;

  let cond = ``;
  if (date_start != undefined && date_stop != undefined) {
    cond = cond + `date BETWEEN '${date_start}' AND '${date_stop}'`;
  }
  if (hn !== undefined && hn !== "") {
    cond = cond + ` AND hn = '${hn}'`;
  }

  let query = `SELECT * FROM lis_order_reject WHERE ${cond}`;
  console.log("QUERY = ", query);

  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json(rows);
  });
}
