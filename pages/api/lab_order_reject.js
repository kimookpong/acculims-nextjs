import dbconnect from "./dbconnect";

export default function handler(req, res) {
  const form = req.body.form;
  const lab_order_number = req.body.id;
  const date = req.body.date;
  const radio = form.reasonCheck;
  const query = `INSERT INTO lis_order_reject 
    (lab_order_number, name_call, name_rec, edit, note, time_call, date, ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10, ch11)
  VALUES ('${lab_order_number}', 
  '${form.approved}', 
  '${form.approver}', 
  '${form.solution}', 
  '${form.reasonOther}', 
  '${form.time}', 
  '${date}',
  ${radio.find((element) => element === "1") ? 1 : "''"},
  ${radio.find((element) => element === "2") ? 1 : "''"},
  ${radio.find((element) => element === "3") ? 1 : "''"},
  ${radio.find((element) => element === "4") ? 1 : "''"},
  ${radio.find((element) => element === "5") ? 1 : "''"},
  ${radio.find((element) => element === "6") ? 1 : "''"},
  ${radio.find((element) => element === "7") ? 1 : "''"},
  ${radio.find((element) => element === "8") ? 1 : "''"},
  ${radio.find((element) => element === "9") ? 1 : "''"},
  ${radio.find((element) => element === "10") ? 1 : "''"},
  ${radio.find((element) => element === "11") ? 1 : "''"}
  )`;

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
      res.status(200).json({ id: lab_order_number, form: form });
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
