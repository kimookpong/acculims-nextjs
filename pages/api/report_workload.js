import dbconnect from "./dbconnect";

export default function handler(req, res) {
  let date_start = req.body.date_start;
  let date_stop = req.body.date_stop;
  let items_group = req.body.items_group;

  const query = `SELECT 
lab_items.lab_items_code as lab_items_code,
sub_list.lab_items_sub_group_code,
if(sub_list.lab_items_sub_group_code is null,'Single','Profile') as single_profile,
(
  SELECT count(lab_order.lab_items_code) 
  FROM lab_order 					
  INNER JOIN lab_head ON lab_head.lab_order_number = lab_order.lab_order_number
  WHERE lab_order.lab_items_code = lab_items.lab_items_code 					
  AND (lab_head.order_date BETWEEN '${date_start}' AND '${date_stop}') 					
  AND lab_head.report_status = 'Approved'
) as total,
lab_items.lab_items_name,
sub_group.lab_items_sub_group_name
FROM lab_items
INNER JOIN lab_items_group ON lab_items.lab_items_group = lab_items_group.lab_items_group_code
LEFT JOIN lab_items_sub_group_list as sub_list ON sub_list.lab_items_code = lab_items.lab_items_code
LEFT JOIN lab_items_sub_group as sub_group ON sub_group.lab_items_sub_group_code = sub_list.lab_items_sub_group_code
WHERE lab_items.lab_items_group = ${items_group} 
AND lab_items.lab_items_name != ''
ORDER BY single_profile,sub_list.lab_items_sub_group_code,lab_items.display_order ASC;`;

  console.log(query);

  const connection = dbconnect();
  connection.connect(function (err) {
    if (err) {
      console.error("Error connecting to database: " + err.stack);
      return;
    }
    console.log("Connected to database as id " + connection.threadId);

    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.error(err);
        return;
      }
      res.status(200).json(rows);
      connection.end((err) => {
        if (err) {
          console.error("Error closing database connection:", err);
        } else {
          console.log("Connection closed.");
        }
      });
    });
  });
}
