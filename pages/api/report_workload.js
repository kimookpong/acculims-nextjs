import dbconnect from "./dbconnect";

export default function handler(req, res) {
  let date_start = req.body.date_start;
  let date_stop = req.body.date_stop;

  let cond = ``;
  if (date_start != undefined && date_stop != undefined) {
    cond =
      cond + `WHERE t1.order_date BETWEEN '${date_start}' AND '${date_stop}'  `;
  }

  const query = `SELECT 
  t1.form_name, 
  count(t1.form_name) as total,
  AVG(TIMESTAMPDIFF(SECOND, CONCAT(t1.receive_date,' ',t1.receive_time), CONCAT(t1.approved_date,' ',t1.approved_time))) as datediff
  
  FROM lab_head AS t1
  ${cond} AND t1.report_status = 'Approved'
  GROUP BY t1.form_name
  ORDER BY total DESC
`;

  console.log(query);

  // t2.lab_items_name_ref,
  // COUNT(t2.lab_items_name_ref),
  //GROUP BY t2.lab_items_name_ref

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
