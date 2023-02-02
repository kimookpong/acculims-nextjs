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
  const query = `SELECT lab_order.lab_order_number,
  lab_order.lab_items_code,
  lab_items.lab_items_name,
  lab_order.lab_order_result_instrument,
  lab_order.lab_order_result_manual,
  lab_order.lab_order_result_rerun,
  lab_order.flag,
  lab_items.lab_items_unit,
  lab_items.lab_items_normal_value,
  lab_order.lab_items_sub_group_code as sub_code,
  lab_head.hn,
  concat(
    DATE_FORMAT(DATE_ADD(lab_head.order_date, INTERVAL 543 YEAR),'%Y-%m-%d'), ' ',
    DATE_FORMAT(lab_head.order_time,'%H:%i'))
    AS order_date_time,
    
  (SELECT lab_items_sub_group_name FROM lab_items_sub_group WHERE sub_code = lab_items_sub_group_code) AS lab_items_sub_group_name,
  (SELECT lab_items_group_code FROM lab_items_sub_group WHERE sub_code = lab_items_sub_group_code) AS group_code,
  (SELECT lab_items_group_name FROM lab_items_group  WHERE  lab_items_group_code = group_code) AS group_name

  FROM lab_order
  LEFT JOIN lab_items ON lab_order.lab_items_code = lab_items.lab_items_code
  LEFT JOIN lab_head ON lab_order.lab_order_number = lab_head.lab_order_number
  WHERE lab_order.lab_order_number = '${id}' 
  ORDER BY group_code,sub_code DESC`;

  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.error(err);
      return;
    }
    let query2;
    let queryResult = ``;
    rows.map((items) => {
      query2 = `SELECT
      lab_order.lab_items_code,
      lab_order.lab_order_result,
      concat(
        DATE_FORMAT(DATE_ADD(lab_head.order_date, INTERVAL 543 YEAR),'%Y-%m-%d'), ' ',
        DATE_FORMAT(lab_head.order_time,'%H:%i'))
        AS order_date_time
      FROM lab_order
      LEFT JOIN lab_head ON lab_order.lab_order_number = lab_head.lab_order_number
      WHERE lab_order.lab_order_number <> '${id}'
      AND lab_order.lab_items_code = '${items["lab_items_code"]}'
      AND lab_head.hn = '${items["hn"]}'
      AND lab_order.lab_order_result <> ''
      ORDER BY order_date_time DESC
      LIMIT 5;
      `;
      queryResult = queryResult + query2;
    });

    connection.query(queryResult, function (err2, rows2, fields) {
      if (err2) {
        console.error(err2);
        return;
      }

      rows.map((items, index) => {
        items["history"] = rows2[index] !== null ? rows2[index] : null;
      });
      res.status(200).json(rows);
    });
  });
}
