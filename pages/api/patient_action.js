import dbconnect from "./dbconnect";

export default function handler(req, res) {
  const action = req.body.action;
  const values = req.body.values;

  let query = ``;

  if (action === "update") {
    query = `UPDATE patient SET
    birthday = '${values.birthday}',
    bloodgrp = '${values.bloodgrp ? values.bloodgrp : ""}',
    cid =  '${values.cid ? values.cid : ""}',
    clinic =  '${values.clinic ? values.clinic : ""}',
    email =  '${values.email ? values.email : ""}',
    fname =  '${values.fname}',
    informaddr =  '${values.informaddr ? values.informaddr : ""}',
    informname =  '${values.informname ? values.informname : ""}',
    informtel =  '${values.informtel ? values.informtel : ""}',
    lname =  '${values.lname}',
    nationality =  '${values.nationality ? values.nationality : ""}',
    passport_no =  '${values.passport_no ? values.passport_no : ""}',
    pname =  '${values.pname}',
    religion =  '${values.religion ? values.religion : ""}',
    sex =  '${values.sex}',
    workaddr =  '${values.workaddr ? values.workaddr : ""}',
    worktel =  '${values.worktel ? values.worktel : ""}',
    addrpart =  '${values.addrpart ? values.addrpart : ""}',
    moopart =  '${values.moopart ? values.moopart : ""}',
    tmbpart =  '${values.tmbpart ? values.tmbpart : ""}',
    amppart =  '${values.amppart ? values.amppart : ""}',
    chwpart =  '${values.chwpart ? values.chwpart : ""}',
    po_code =  '${values.po_code ? values.po_code : ""}'
    WHERE hn = '${req.body.hn}';`;
  } else if (action === "create") {
    query = `INSERT INTO patient 
    (
      birthday,
      bloodgrp,
      cid,
      clinic,
      email,
      fname,
      hn,
      informaddr,
      informname,
      informtel,
      lname,
      nationality,
      passport_no,
      pname,
      religion,
      sex,
      workaddr,
      worktel,  
      addrpart,
      moopart,
      tmbpart,
      amppart,
      chwpart,
      po_code) 
    VALUES 
    (
      '${values.birthday}',
      '${values.bloodgrp ? values.bloodgrp : ""}',
      '${values.cid ? values.cid : ""}',
      '${values.clinic ? values.clinic : ""}',
      '${values.email ? values.email : ""}',
      '${values.fname}',
      '${values.hn}',
      '${values.informaddr ? values.informaddr : ""}',
      '${values.informname ? values.informname : ""}',
      '${values.informtel ? values.informtel : ""}',
      '${values.lname}',
      '${values.nationality ? values.nationality : ""}',
      '${values.passport_no ? values.passport_no : ""}',
      '${values.pname}',
      '${values.religion ? values.religion : ""}',
      '${values.sex}',
      '${values.workaddr ? values.workaddr : ""}',
      '${values.worktel ? values.worktel : ""}',
      '${values.addrpart ? values.addrpart : ""}',
      '${values.moopart ? values.moopart : ""}',
      '${values.tmbpart ? values.tmbpart : ""}',
      '${values.amppart ? values.amppart : ""}',
      '${values.chwpart ? values.chwpart : ""}',
      '${values.po_code ? values.po_code : ""}'
      );`;
  } else if (action === "delete") {
    query = `DELETE FROM patient WHERE hn = '${req.body.hn}';`;
  }

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
