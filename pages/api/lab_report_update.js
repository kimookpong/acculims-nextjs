const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  multipleStatements: true,
});

connection.connect(function (err) {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + connection.threadId);
});

export default function handler(req, res) {
  let queryArray = "";
  req.body.map((item) => {
    queryArray =
      queryArray +
      `UPDATE lab_order SET lab_order_result_manual = '${item.lab_order_result_manual}' WHERE lab_order_number = '${item.lab_order_number}' AND lab_items_code = ${item.lab_items_code};`;
  });
  console.log(queryArray);

  const query = `SELECT
  form_name AS value,
  form_name AS label
  FROM lab_form_head`;
  connection.query(queryArray, function (err, rows, fields) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json({ result: true });
  });
}
