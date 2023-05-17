import dbconnect from "./dbconnect";

export default function handler(req, res) {
  let date_start = req.body.date_start;
  let date_stop = req.body.date_stop;
  let items_group = req.body.items_group;

  //   let cond = ``;
  //   if (date_start != undefined && date_stop != undefined) {
  //     cond =
  //       cond + `WHERE t1.order_date BETWEEN '${date_start}' AND '${date_stop}'  `;
  //   }

  //   const query = `SELECT
  //   t1.form_name,
  //   count(t1.form_name) as total,
  //   AVG(TIMESTAMPDIFF(SECOND, CONCAT(t1.receive_date,' ',t1.receive_time), CONCAT(t1.approved_date,' ',t1.approved_time))) as datediff

  //   FROM lab_head AS t1
  //   ${cond} AND t1.report_status = 'Approved'
  //   GROUP BY t1.form_name
  //   ORDER BY total DESC
  // `;

  const query = `SELECT lab_order.lab_items_code,
  lab_items.lab_items_name,
  lab_items.wait_hour as wait_hour,
  ROUND(AVG(TIMESTAMPDIFF(SECOND, CONCAT(lab_head.receive_date,' ',lab_head.receive_time), CONCAT(lab_head.approved_date,' ',lab_head.approved_time)))/60) as avg_time,
  (lab_items.wait_hour - ROUND(AVG(TIMESTAMPDIFF(SECOND, CONCAT(lab_head.receive_date, ' ', lab_head.receive_time), CONCAT(lab_head.approved_date, ' ', lab_head.approved_time)))/60)) AS perform,
  count(lab_order.lab_items_code) as total
  FROM lab_order
  INNER JOIN lab_head ON lab_head.lab_order_number = lab_order.lab_order_number
  INNER JOIN lab_items ON lab_items.lab_items_code = lab_order.lab_items_code
  WHERE (lab_head.order_date BETWEEN '${date_start}' AND '${date_stop}')
  AND lab_items.lab_items_group = ${items_group} 
  AND lab_head.report_status = 'Approved'
  GROUP BY lab_order.lab_items_code
  ORDER BY lab_items.display_order ASC;`;

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
