import dbconnect from "./dbconnect";

export default function handler(req, res) {
  let lab_head;
  const id = req.body.id;
  let query = `SELECT lab_head.department as department, 
  lab_head.lab_order_number as lab_order_number, 
  lab_head.hn, 
  concat(patient.pname,' ',patient.fname,' ',patient.lname) AS name, 
  FORMAT(timestampdiff(year,patient.birthday,curdate()),0) AS year, 
  FORMAT(timestampdiff(month,patient.birthday,curdate())-(timestampdiff(year,patient.birthday,curdate())*12),0) AS month, 
  if(patient.sex = 1,'ชาย','หญิง' ) AS SEX, 
  DATE_FORMAT(DATE_ADD(patient.birthday, INTERVAL 543 YEAR),'%d/%m/%Y') as birthday, 
  DATE_FORMAT(DATE_ADD(lab_head.order_date, INTERVAL 543 YEAR),'%d/%m/%Y') as order_date, 
  lab_head.order_time, 
  lab_head.form_name,
  kskdepartment.department as room, 
  pttype.name as ptname, 
  doctor.name as docname, 
  if(trim(lab_head.department) ='IPD',ward.name,kskdepartment.department) as wardname, 
  lab_head.lab_head_remark, 
  lab_head.receive_status, 
  lab_head.report_status, 

  concat(
    DATE_FORMAT(DATE_ADD(lab_head.receive_date, INTERVAL 543 YEAR),'%d-%m-%Y'), ' ',
    DATE_FORMAT(lab_head.receive_time,'%H:%i:%s'))
    AS receive_date,
  concat(
    DATE_FORMAT(DATE_ADD(lab_head.report_date, INTERVAL 543 YEAR),'%d-%m-%Y'), ' ',
    DATE_FORMAT(lab_head.report_time,'%H:%i:%s'))
    AS report_date,
  concat(
    DATE_FORMAT(DATE_ADD(lab_head.approved_date, INTERVAL 543 YEAR),'%d-%m-%Y'), ' ',
    DATE_FORMAT(lab_head.approved_time,'%H:%i:%s'))
    AS approved_date,

  (SELECT CONCAT(lis_user.pname,lis_user.fname,' ',lis_user.lname)  FROM lis_user WHERE lab_head.reporter_name = lis_user.user_name) AS reporter_name,

  concat(
    DATEDIFF(lab_head.approved_date, lab_head.receive_date), '.', 
    TIMEDIFF(lab_head.approved_time ,lab_head.receive_time)) 
  as timediff,

  lab_head.order_note 
  FROM lab_head 
  LEFT JOIN patient ON lab_head.hn = patient.hn 
  LEFT JOIN kskdepartment ON lab_head.order_department = kskdepartment.depcode 
  LEFT JOIN ovst ON lab_head.vn = ovst.vn
  LEFT JOIN pttype ON ovst.pttype = pttype.pttype
  LEFT JOIN lab_order ON lab_head.lab_order_number = lab_order.lab_order_number 
  LEFT JOIN doctor ON lab_head.doctor_code = doctor.code 
  LEFT JOIN ward ON lab_head.ward = ward.ward 
  WHERE lab_head.lab_order_number = '${id}' 
  GROUP BY lab_head.lab_order_number;`;

  query =
    query +
    `SELECT lab_order.lab_order_number,lab_specimen_items.specimen_code,
  lab_specimen_items.specimen_name
  FROM lab_specimen_items 
  LEFT JOIN lab_order ON lab_order.specimen_code = lab_specimen_items.specimen_code 
  WHERE lab_order.lab_order_number = '${id}' 
  AND lab_order.specimen_code <> '' 
  AND lab_specimen_items.specimen_name <> '';`;

  query =
    query +
    `SELECT lab_order.lab_order_number,lab_items_sub_group.lab_items_sub_group_name as lab_profile
  FROM lab_order 
  LEFT JOIN lab_items_sub_group ON lab_order.lab_items_sub_group_code = lab_items_sub_group.lab_items_sub_group_code 
  WHERE lab_order.lab_order_number = '${id}' 
  AND lab_order.lab_items_sub_group_code <> ''
  AND lab_order.single_profile = 'p'
  GROUP BY lab_order.lab_items_sub_group_code ;`;

  query =
    query +
    `SELECT lab_order.lab_order_number,lab_items.lab_items_name
  FROM lab_order
  LEFT JOIN lab_items ON lab_order.lab_items_code = lab_items.lab_items_code
  WHERE lab_order.lab_order_number = '${id}'
  AND lab_order.single_profile = 's';`;

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
      res.status(200).json({
        lab_head: rows[0],
        lab_order: rows[1],
        lab_profile: rows[2],
        lab_single: rows[3],
      });
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
