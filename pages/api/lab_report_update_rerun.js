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
  const lab_order_number = req.body.lab_order_number;

  let queryArray = ``;
  req.body.data.map((item) => {
    queryArray =
      queryArray +
      `UPDATE lab_order 
  SET lab_order_result = '${item.lab_order_result}', check_rerun = '${item.check_rerun}' 
  WHERE lab_order_number = '${lab_order_number}' AND lab_items_code = ${item.lab_items_code};`;
  });

  connection.query(queryArray, function (err, rows, fields) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json({ result: true });
  });
}