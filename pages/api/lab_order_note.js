const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "mariadb-108926-0.cloudclusters.net",
  user: "acculims",
  password: "acculims2023",
  database: "acculims",
  port: 10242,
  multipleStatements: true,

  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database: process.env.DB_DATABASE,
  // port: process.env.DB_PORT,
  // multipleStatements: true,
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
  const note = req.body.note;
  let query = `UPDATE lab_head SET order_note = '${note}' WHERE lab_order_number = (${id})`;
  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json({ result: true });
  });
}
