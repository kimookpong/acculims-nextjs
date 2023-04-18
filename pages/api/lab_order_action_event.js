import dbconnect from "./dbconnect";
import dayjs from "dayjs";

export default function handler(req, res) {
  const action = req.body.action;
  const id = req.body.id;
  let text = "";
  let query = "";
  if (action === "accept") {
    query = `UPDATE lab_head SET receive_status = 'Received',report_status = 'Pending',receive_date = '${dayjs().format(
      "YYYY-MM-DD"
    )}',receive_time='${dayjs().format(
      "HH:mm:ss"
    )}'  WHERE lab_order_number IN (${id.join()})`;
    text = "รับใบ LAB เรียบร้อยแล้ว";
  } else if (action === "reject") {
    query = `UPDATE lab_head SET receive_status = 'Reject' WHERE lab_order_number IN (${id.join()})`;
    text = "ยกเลิกใบ LAB เรียบร้อยแล้ว";
  } else if (action === "delete") {
    query = `UPDATE lab_head SET receive_status = 'Delete' WHERE lab_order_number IN (${id.join()})`;
    text = "ลบใบ LAB เรียบร้อยแล้ว";
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
      res.status(200).json({ result: true, alert: text });
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
