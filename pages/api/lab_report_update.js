import dbconnect from "./dbconnect";

export default function handler(req, res) {
  const lab_order_number = req.body.lab_order_number;
  let queryArray = "";
  req.body.data.map((item) => {
    queryArray =
      queryArray +
      `UPDATE lab_order SET lab_order_result_manual = '${item.lab_order_result_manual}',flag = '${item.flag}' WHERE lab_order_number = '${item.lab_order_number}' AND lab_items_code = ${item.lab_items_code};`;
  });

  queryArray =
    queryArray +
    `UPDATE lab_head 
    SET report_status = 'Completed', approved_date = null, approved_time = null,reporter_name = null 
    WHERE lab_order_number = (${lab_order_number});`;
  console.log(queryArray);

  const connection = dbconnect();
  connection.connect(function (err) {
    if (err) {
      console.error("Error connecting to database: " + err.stack);
      return;
    }
    console.log("Connected to database as id " + connection.threadId);

    connection.query(queryArray, function (err, rows, fields) {
      if (err) {
        console.error(err);
        return;
      }
      res.status(200).json({ result: true });
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
