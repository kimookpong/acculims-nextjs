import dbconnect from "./dbconnect";

export default function handler(req, res) {
  let date_start = req.body.date_start;
  let date_stop = req.body.date_stop;

  date_start = "2022-09-01";
  date_stop = "2023-02-01";

  let cond = ``;
  if (date_start != undefined && date_stop != undefined) {
    cond =
      cond +
      `WHERE t1.order_date BETWEEN '${date_start}' AND '${date_stop}' 
  AND (t1.form_name = 'HEMATOLOGY'
  OR t1.form_name = 'URINE ANALYSIS'
  OR t1.form_name = 'CHEMISTRY'
  OR t1.form_name = 'BLOOD  BANK'
  OR t1.form_name = 'IMMONOLOGY'
  OR t1.form_name = 'MICROBIOLOGY'
  OR t1.form_name = 'MICROSCOPY')`;
  }

  const query = `SELECT t1.order_date, t1.order_time,
  t1.hn, t3.pname, t3.fname, t3.lname, t3.birthday,
  t1.department,t1.receive_time, t1.approved_time, t1.form_name, t2.lab_items_name_ref, t2.lab_order_result,
  t1.reporter_name, t1.approve_staff
  FROM lab_head AS t1 
  INNER JOIN lab_order AS t2 ON t1.lab_order_number = t2.lab_order_number
  INNER JOIN patient AS t3 ON t1.hn = t3.hn 
  ${cond} ORDER by t1.form_name`;

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
