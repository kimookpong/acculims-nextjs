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
  lab_items_code = req.body.lab_items_code;
  display_order = req.body.display_order;
  lab_items_name = req.body.lab_items_name;
  lab_items_unit = req.body.lab_items_unit;
  lab_items_normal_value = req.body.lab_items_normal_value;
  lab_items_hint = req.body.lab_items_hint;
  service_price = req.body.service_price;
  range_check = req.body.range_check;

  const query = `INSERT INTO lab_items (hospital_name_th, hospital_name_en, address, phone, hospital_department_lab) VALUES ('${name}', '${nameeng}', '${address}', '${tel}', '${dept}')`;
  connection.query(query, function (err, result) {
    if (err) {
      console.error(err);
      return;
    }
  });
}
