import dbconnect from "./dbconnect";

export default function handler(req, res) {
  const findText = req.body.findText;
  const findHN = req.body.findHN;
  let query = `SELECT 
  patient.hn,
  patient.cid,
  patient.pname,
  patient.fname,
  patient.lname,
  patient.birthday,
  patient.sex,
  patient.nationality,
  patient.religion,
  patient.bloodgrp,
  patient.passport_no,
  patient.clinic,

  patient.addrpart,
  patient.moopart,
  patient.tmbpart,
  patient.amppart,
  patient.chwpart,
  patient.po_code,

  tambons.province,
  tambons.amphoe,
  tambons.tambon,

  patient.chwpart as province_code,
  concat(patient.chwpart, patient.amppart) AS amphoe_code,
  concat(patient.chwpart, patient.amppart ,patient.tmbpart) AS tambon_code,
  patient.po_code as zipcode,



  patient.informaddr,
  patient.informtel,
  patient.hometel,
  patient.email,

  patient.workaddr,
  patient.worktel,

  patient.informname,

  concat(patient.pname, '', patient.fname, ' ', patient.lname) AS patient_name,
  DATE_FORMAT(DATE_ADD(birthday, INTERVAL 543 YEAR),'%d-%m-%Y') AS date
  FROM patient 
  LEFT JOIN tambons ON tambons.tambon_code = concat(patient.chwpart, patient.amppart ,patient.tmbpart) `;

  if (!!findText || !!findHN) {
    if (!!findText && !!findHN) {
      query =
        query +
        ` WHERE fname like '%${findText}%' OR lname like '%${findText}%' OR hn like '%${findText}%' OR cid like '%${findText}%' OR hn like '%${findHN}%' `;
    } else if (!!findText) {
      query =
        query +
        ` WHERE fname like '%${findText}%' OR lname like '%${findText}%' OR hn like '%${findText}%' OR cid like '%${findText}%' `;
    } else if (!!findHN) {
      query = query + ` WHERE hn like '%${findHN}%' `;
    }
  }

  query = query + ` LIMIT 10000`;

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
