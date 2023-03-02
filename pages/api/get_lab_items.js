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
  const lab_group = req.body.lab_group;
  const lab_name = req.body.lab_name;

  let cond = ``;
  if (
    lab_group !== undefined &&
    lab_group !== "" &&
    lab_group !== "All" &&
    lab_name != undefined &&
    lab_name !== ""
  ) {
    cond = ` WHERE  lab_items_group = ${lab_group} AND lab_items_name like '%${lab_name}%'  `;
  } else if (
    lab_group !== undefined &&
    lab_group !== "" &&
    lab_group !== "All"
  ) {
    cond = ` WHERE  lab_items_group = ${lab_group}  `;
  } else if (lab_name != undefined && lab_name !== "") {
    cond = ` WHERE lab_items_name like '%${lab_name}%'   `;
  }

  let query = `SELECT * FROM lab_items ${cond}`;

  console.log(query);

  connection.query(query, function (err, rows, fields) {
    connection.end();
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json(rows);
  });
}
