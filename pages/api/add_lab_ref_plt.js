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
  const val_1 = req.body.val_1;
  const val_3 = req.body.val_3;

  const query = `UPDATE lab_items SET lab_items_name = Plt (count) WHERE Plt (count) = ${val_1}`;
  connection.query(query, function (err, result) {
    if (err) {
      console.error(err);
      return;
    }
  });
}
