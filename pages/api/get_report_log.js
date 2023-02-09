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

  // let date_kstart = date_start.split("-");
  // let date_kstop = date_stop.split("-");

  // date_start = date_kstart[2] + "-" + date_kstart[1] + "-" + date_kstart[0];
  // date_stop = date_kstop[2] + "-" + date_kstop[1] + "-" + date_kstop[0];

  let cond = ``;
  if (date_start != undefined && date_stop != undefined) {
    cond = cond + `WHERE order_date BETWEEN '${date_start}' AND '${date_stop}'`;
  }

  const query = `SELECT * FROM lab_head ${cond}`;
  console.log("query = ", query);

  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json(rows);
  });
}
