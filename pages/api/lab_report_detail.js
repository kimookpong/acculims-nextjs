const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

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
  lab_order.flag,
  lab_items.lab_items_unit,
  lab_items.lab_items_normal_value,
  lab_order.lab_items_sub_group_code as sub_code,
  lab_head.hn,
  (SELECT lab_items_sub_group_name FROM lab_items_sub_group WHERE sub_code = lab_items_sub_group_code) AS lab_items_sub_group_name,

  (SELECT 
    CASE
    WHEN lo1.lab_order_result_instrument  IS NULL THEN lo1.lab_order_result_manual 
    WHEN lo1.lab_order_result_manual  IS NULL THEN lo1.lab_order_result_instrument 
    ELSE null
END AS P1
    FROM lab_order AS lo1 
    LEFT JOIN lab_head AS lh1 ON lo1.lab_order_number = lh1.lab_order_number
    WHERE lo1.lab_order_number <> lab_order.lab_order_number
  AND lo1.lab_items_code = lab_order.lab_items_code
  AND lh1.hn = lab_head.hn
    LIMIT 1) AS P1,

    (SELECT lo1.lab_order_number AS LON1 FROM lab_order AS lo1 
      LEFT JOIN lab_head AS lh1 ON lo1.lab_order_number = lh1.lab_order_number
      WHERE lo1.lab_order_number <> lab_order.lab_order_number
    AND lo1.lab_items_code = lab_order.lab_items_code
    AND lh1.hn = lab_head.hn
      LIMIT 1) AS LON1,


      (SELECT 
        CASE
        WHEN lo2.lab_order_result_instrument  IS NULL THEN lo2.lab_order_result_manual 
        WHEN lo2.lab_order_result_manual  IS NULL THEN lo2.lab_order_result_instrument 
        ELSE null
    END AS P2
        FROM lab_order AS lo2 
        LEFT JOIN lab_head AS lh2 ON lo2.lab_order_number = lh2.lab_order_number
        WHERE lo2.lab_order_number <> lab_order.lab_order_number
        AND lo2.lab_order_number <> LON1
      AND lo2.lab_items_code = lab_order.lab_items_code
      AND lh2.hn = lab_head.hn
        LIMIT 1) AS P2,

        (SELECT lo2.lab_order_number AS LON1 FROM lab_order AS lo2
          LEFT JOIN lab_head AS lh2 ON lo2.lab_order_number = lh2.lab_order_number
          WHERE lo2.lab_order_number <> lab_order.lab_order_number
          AND lo2.lab_order_number <> LON1
        AND lo2.lab_items_code = lab_order.lab_items_code
        AND lh2.hn = lab_head.hn
          LIMIT 1) AS LON2,

          (SELECT 
            CASE
            WHEN lo2.lab_order_result_instrument  IS NULL THEN lo2.lab_order_result_manual 
            WHEN lo2.lab_order_result_manual  IS NULL THEN lo2.lab_order_result_instrument 
            ELSE null
        END AS P2
            FROM lab_order AS lo2 
            LEFT JOIN lab_head AS lh2 ON lo2.lab_order_number = lh2.lab_order_number
            WHERE lo2.lab_order_number <> lab_order.lab_order_number
            AND lo2.lab_order_number <> LON1
            AND lo2.lab_order_number <> LON2
          AND lo2.lab_items_code = lab_order.lab_items_code
          AND lh2.hn = lab_head.hn
            LIMIT 1) AS P3

  FROM lab_order
  LEFT JOIN lab_items ON lab_order.lab_items_code = lab_items.lab_items_code
  LEFT JOIN lab_head ON lab_order.lab_order_number = lab_head.lab_order_number
  WHERE lab_order.lab_order_number = '${id}' 
  ORDER BY lab_order.lab_items_sub_group_code DESC`;

  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json(rows);
  });
}
