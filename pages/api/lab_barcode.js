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
  const id = req.body.id;
  if (id.length > 0) {
    const query = `SELECT
    lab_head.lab_order_number as order_number,
    concat(patient.pname, '', patient.fname, ' ', patient.lname) AS patient_name,
    lab_head.lab_order_number as barcode,
    concat(
      DATE_FORMAT(lab_head.order_date, '%Y-%m-%d'), ' ',
      DATE_FORMAT(lab_head.order_time,'%H:%i'))
      AS order_date_time
    FROM lab_head
    LEFT JOIN lab_order ON lab_order.lab_order_number = lab_head.lab_order_number
    LEFT JOIN patient ON lab_head.hn = patient.hn
    WHERE lab_head.lab_order_number in  (${id.join()})
    AND lab_head.receive_status <> 'Delete'
    GROUP BY lab_head.lab_order_number`;
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.error(err);
        return;
      }
      res.status(200).json({ result: rows });
    });
  }
}
