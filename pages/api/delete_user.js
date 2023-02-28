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
  const user_id = req.body.user_id;

  const query = `DELETE FROM lis_user WHERE id_user = ${user_id}`;
  connection.query(query, function (err, result) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json(result);
  });
}
