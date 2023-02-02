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
