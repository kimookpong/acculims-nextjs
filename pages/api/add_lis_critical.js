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
  const data = req.body.data;
  console.log(data);
  const query = `INSERT INTO lis_critical (
      lab_order_number,
      time_call,
      position,
      call_name,
      hn,
      patient_name,
      test_name,
      cancle,
      critical_ref,
      result,
      time_take,
      take_name,
      date_save
    ) VALUES (
      '${data.lab_order_number}',
      '${data.time_call}',
      '${data.position}',
      '${data.call_name}',
      '${data.hn}',
      '${data.patient_name}',
      '${data.test_name}',
      '${data.cancle}',
      '${data.critical_ref}',
      '${data.result}',
      '${data.time_take}',
      '${data.take_name}',
      '${data.date_save}'
    );`;
  connection.query(query, function (err, result) {
    connection.end();
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json({ result: true });
  });
}
