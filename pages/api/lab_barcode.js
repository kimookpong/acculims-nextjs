const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
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
  const id = req.body.id;
  const seperate = req.body.seperate;

  let lab_items_name;
  let lab_items_name2;
  let query = "";
  if (seperate) {
    query = `SELECT
    lab_head.lab_order_number as order_number,
    concat(patient.pname, '', patient.fname, ' ', patient.lname) AS patient_name,
    FORMAT(timestampdiff(year,patient.birthday,curdate()),0) AS year, 
    FORMAT(timestampdiff(month,patient.birthday,curdate())-(timestampdiff(year,patient.birthday,curdate())*12),0) AS month, 
    lab_head.lab_order_number as barcode,
    lab_head.hn, 
    lab_head.department as department,
    lab_head.form_name as form_name,
    lab_order.lab_items_name_ref as lab_items_name,
    DATE_FORMAT(DATE_ADD(patient.birthday, INTERVAL 543 YEAR),'%d/%m/%Y') as birthday, 
    concat(
      DATE_FORMAT(DATE_ADD(lab_head.order_date, INTERVAL 543 YEAR),'%d/%m/%Y'), ' ',
      DATE_FORMAT(lab_head.order_time,'%H:%i:%s'))
      AS order_date_time
    FROM lab_head
    LEFT JOIN lab_order ON lab_order.lab_order_number = lab_head.lab_order_number
    LEFT JOIN patient ON lab_head.hn = patient.hn
    WHERE lab_head.lab_order_number in  (${id})
    AND lab_order.lab_items_code <> '600'
    GROUP BY lab_head.lab_order_number;`;

    query =
      query +
      `SELECT
    lab_head.lab_order_number as order_number,
    concat(patient.pname, '', patient.fname, ' ', patient.lname) AS patient_name,
    FORMAT(timestampdiff(year,patient.birthday,curdate()),0) AS year, 
    FORMAT(timestampdiff(month,patient.birthday,curdate())-(timestampdiff(year,patient.birthday,curdate())*12),0) AS month, 
    lab_head.lab_order_number as barcode,
    lab_head.hn, 
    lab_head.department as department,
    lab_head.form_name as form_name,
    lab_order.lab_items_name_ref as lab_items_name,
    DATE_FORMAT(DATE_ADD(patient.birthday, INTERVAL 543 YEAR),'%d/%m/%Y') as birthday, 
    concat(
      DATE_FORMAT(DATE_ADD(lab_head.order_date, INTERVAL 543 YEAR),'%d/%m/%Y'), ' ',
      DATE_FORMAT(lab_head.order_time,'%H:%i:%s'))
      AS order_date_time
    FROM lab_head
    LEFT JOIN lab_order ON lab_order.lab_order_number = lab_head.lab_order_number
    LEFT JOIN patient ON lab_head.hn = patient.hn
    WHERE lab_head.lab_order_number in  (${id})
    AND lab_order.lab_items_code = '600'
    GROUP BY lab_head.lab_order_number;`;
  } else {
    query = `SELECT
    lab_head.lab_order_number as order_number,
    concat(patient.pname, '', patient.fname, ' ', patient.lname) AS patient_name,
    FORMAT(timestampdiff(year,patient.birthday,curdate()),0) AS year, 
    FORMAT(timestampdiff(month,patient.birthday,curdate())-(timestampdiff(year,patient.birthday,curdate())*12),0) AS month, 
    lab_head.lab_order_number as barcode,
    lab_head.hn, 
    lab_head.department as department,
    lab_head.form_name as form_name,
    lab_order.lab_items_name_ref as lab_items_name,
    DATE_FORMAT(DATE_ADD(patient.birthday, INTERVAL 543 YEAR),'%d/%m/%Y') as birthday, 
    concat(
      DATE_FORMAT(DATE_ADD(lab_head.order_date, INTERVAL 543 YEAR),'%d/%m/%Y'), ' ',
      DATE_FORMAT(lab_head.order_time,'%H:%i:%s'))
      AS order_date_time
    FROM lab_head
    LEFT JOIN lab_order ON lab_order.lab_order_number = lab_head.lab_order_number
    LEFT JOIN patient ON lab_head.hn = patient.hn
    WHERE lab_head.lab_order_number in  (${id})
    GROUP BY lab_head.lab_order_number;`;

    query =
      query +
      `SELECT
    lab_head.lab_order_number as order_number,
    concat(patient.pname, '', patient.fname, ' ', patient.lname) AS patient_name,
    FORMAT(timestampdiff(year,patient.birthday,curdate()),0) AS year, 
    FORMAT(timestampdiff(month,patient.birthday,curdate())-(timestampdiff(year,patient.birthday,curdate())*12),0) AS month, 
    lab_head.lab_order_number as barcode,
    lab_head.hn, 
    lab_head.department as department,
    lab_head.form_name as form_name,
    lab_order.lab_items_name_ref as lab_items_name,
    DATE_FORMAT(DATE_ADD(patient.birthday, INTERVAL 543 YEAR),'%d/%m/%Y') as birthday, 
    concat(
      DATE_FORMAT(DATE_ADD(lab_head.order_date, INTERVAL 543 YEAR),'%d/%m/%Y'), ' ',
      DATE_FORMAT(lab_head.order_time,'%H:%i:%s'))
      AS order_date_time
    FROM lab_head
    LEFT JOIN lab_order ON lab_order.lab_order_number = lab_head.lab_order_number
    LEFT JOIN patient ON lab_head.hn = patient.hn
    WHERE lab_head.lab_order_number in  (${id})
    AND lab_order.lab_items_code = '600'
    GROUP BY lab_head.lab_order_number;`;
  }

  connection.query(
    `SELECT 
    lab_order_number as id,
    lab_items_name_ref as value
    FROM lab_order 
    WHERE lab_order_number in (${id})
    ${seperate ? "AND lab_items_code <> '600'" : ""} ;

    SELECT 
    lab_order_number as id,
    lab_items_name_ref as value
    FROM lab_order 
    WHERE lab_order_number in (${id})
    AND lab_items_code = '600';
    `,
    function (err, rows_name) {
      lab_items_name = rows_name;
      lab_items_name2 = rows_name;
      let newData = {};
      if (!!rows_name[0]) {
        rows_name[0].forEach((item) => {
          if (newData[item.id]) {
            newData[item.id] += `,${item.value}`;
          } else {
            newData[item.id] = item.value;
          }
        });
      }
      let newData2 = {};
      if (!!rows_name[1]) {
        rows_name[1].forEach((item) => {
          if (newData2[item.id]) {
            newData2[item.id] += `,${item.value}`;
          } else {
            newData2[item.id] = item.value;
          }
        });
      }
      lab_items_name = newData;
      lab_items_name2 = newData2;
    }
  );

  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json({
      result: rows[0],
      lab_items_name: lab_items_name,
      fbs: rows[1],
      lab_items_name_fbs: lab_items_name2,
    });
  });
}
