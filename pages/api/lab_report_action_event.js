import dbconnect from "./dbconnect";
const connection = dbconnect();

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
  let text = "";
  let query = "";

  connection.query(
    `SELECT 
  user_name,
  concat(pname,fname,' ',lname) AS name
  FROM lis_user 
  WHERE password = '${form.formCode}'`,
    function (err, rowsCheck, fields) {
      if (err) {
        console.error(err);
        return;
      }
      if (rowsCheck.length > 0) {
        if (action === "approve") {
          query = `UPDATE lab_head 
    SET report_status = 'Approved',      
    order_note = '${form.formComment}', 
    approver_name = '${rowsCheck[0]["name"]}', 
    approved_date = '${form.formDate}',
    approved_time = '${form.formTime}',
    partial_status = '${form.formPartial}'
    WHERE lab_order_number IN (${id.join()})`;
          text = "รับรองผล LAB เรียบร้อยแล้ว";
        } else if (action === "report") {
          query = `UPDATE lab_head 
    SET report_status = 'Reported', 
    order_note = '${form.formComment}', 
    reporter_name = '${rowsCheck[0]["name"]}',
    report_date = '${form.formDate}',
    report_time = '${form.formTime}'
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
      } else {
        res.status(200).json({
          result: false,
          alert: "รหัสผ่านไม่ถูกต้อง",
          rowsCheck: rowsCheck,
        });
      }
    }
  );
}
//}
