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
  const name = req.body.name;
  const nameeng = req.body.nameeng;
  const address = req.body.address;
  const tel = req.body.tel;
  const dept = req.body.dept;
  const logo = req.body.logo;

  const query = "SELECT `id_hospital`,`hospital_name_th` FROM `lis_hospital`";
  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json(rows);
  });
}
