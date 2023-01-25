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
  let text = "";
  let query = "";
  if (action === "accept") {
    query = `UPDATE lab_head SET receive_status = 'Received' WHERE lab_order_number IN (${id.join()})`;
    text = "รับใบ LAB เรียบร้อยแล้ว";
  } else if (action === "reject") {
    query = `UPDATE lab_head SET receive_status = 'Reject' WHERE lab_order_number IN (${id.join()})`;
    text = "ยกเลิกใบ LAB เรียบร้อยแล้ว";
  } else if (action === "delete") {
    query = `UPDATE lab_head SET receive_status = 'Delete' WHERE lab_order_number IN (${id.join()})`;
    text = "ลบใบ LAB เรียบร้อยแล้ว";
  }

  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json({ result: true, alert: text });
  });
}
//}
