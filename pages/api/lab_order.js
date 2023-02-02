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
  console.log("debug from api: ", req.body);
  const date_start = req.body.date_start;
  const date_stop = req.body.date_stop;
  const time_start = req.body.time_start;
  const time_stop = req.body.time_stop;
  const department = req.body.department;
  const type = req.body.type;
  const text = req.body.text;
  const form_name = req.body.form_name;
  const address = req.body.address;

  let cond = ` AND lab_head.order_date <= '${date_stop}' AND lab_head.order_date >= '${date_start}' `;

  if (department === "OPD") {
    cond = cond + ` AND lab_head.department = '${department}' `;
  } else if (department === "IPD") {
    cond = cond + ` AND lab_head.department = '${department}' `;
  }
  if (text === null) {
  } else {
    if (type === 1) {
      cond = cond + ` AND lab_head.lab_order_number LIKE '%${text}%' `;
    } else if (type === 2) {
      cond = cond + ` AND lab_head.hn LIKE '%${text}%' `;
    } else if (type === 3) {
      cond =
        cond +
        ` AND (patient.fname LIKE '%${text}%' OR patient.lname LIKE '%${text}%') `;
    }
  }

  if (form_name === "All") {
  } else {
    cond = cond + ` AND lab_head.form_name LIKE '%${form_name}%' `;
  }

  if (address === null) {
  } else {
    cond = cond + ` AND patient.informaddr LIKE '%${address}%' `;
  }

  const query = `SELECT 
  lab_head.lab_order_number as order_number,
  lab_head.receive_status as h_status,
  lab_head.hn as HN,
  concat(patient.pname, '', patient.fname, ' ', patient.lname) AS patient_name,
  lab_head.form_name as form_name,
  concat(
    if(lab_head.lab_priority_id = 0, 'ปกติ', ''),
    if(lab_head.lab_priority_id = 1, 'ปกติ', ''),
    if(lab_head.lab_priority_id = 2, 'ด่วน', ''),
    if(lab_head.lab_priority_id = 3, 'ด่วนที่สุด', ''))
    AS priority,
  lab_head.lis_order_no as No,
  concat(
    DATE_FORMAT(DATE_ADD(lab_head.order_date, INTERVAL 543 YEAR),'%d-%m-%Y'), ' ',
    DATE_FORMAT(lab_head.order_time,'%H:%i:%s'))
    AS order_date_time,
 concat(
  DATE_FORMAT(DATE_ADD(lab_head.receive_date, INTERVAL 543 YEAR),'%d-%m-%Y'), ' ',
    DATE_FORMAT(lab_head.receive_time,'%H:%i:%s'))
    AS time_receive_report,
  lab_head.department as department,
  lab_head.receive_status, 
  lab_head.report_status, 
  patient.informaddr as address
  FROM lab_head
  LEFT JOIN lab_order ON lab_order.lab_order_number = lab_head.lab_order_number 
  LEFT JOIN patient ON lab_head.hn = patient.hn
  WHERE  lab_head.receive_status <> 'Delete'
  ${cond} 
  GROUP BY lab_head.lab_order_number`;

  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json(rows);
  });
}
