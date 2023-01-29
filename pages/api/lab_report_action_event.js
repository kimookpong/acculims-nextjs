const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

connection.connect(function (err) {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + connection.threadId);
});

export default function handler(req, res) {
  const action = req.body.action;
  const id = req.body.id;
  const form = req.body.form;
  console.log(form);
  let text = "";
  let query = "";
  if (action === "approve") {
    query = `UPDATE lab_head 
    SET report_status = 'Approved', 
        approver_name = '${form.formCode}',  
        report_date = '${form.formDate}',
        report_time = '${form.formTime}'
    WHERE lab_order_number IN (${id.join()})`;
    text = "รับรองผล LAB เรียบร้อยแล้ว";
  } else if (action === "report") {
    query = `UPDATE lab_head 
    SET report_status = 'Reported', 
        reporter_name = '${form.formCode}',
        approved_date = '${form.formDate}',
        approved_time = '${form.formTime}'
    WHERE lab_order_number IN (${id.join()})`;
    text = "รายงานผล LAB เรียบร้อยแล้ว";
  }

  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json({ result: true, alert: text, form: form });
  });
}
//}
