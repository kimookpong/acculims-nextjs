import dbconnect from "./dbconnect";

export default function handler(req, res) {
  let query = `SELECT * FROM lab_items_group`;
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
      let query = "";
      rows.map((items, index) => {
        query += ` SELECT 
        lab_items.lab_items_code as lab_items_code,
        lab_items.lab_items_group,
        lab_items_sub_group_list.lab_items_sub_group_code as lab_items_sub_group_code,
        if(lab_items_sub_group_list.lab_items_sub_group_code is null,'s','p') as single_profile,
        lab_items.lab_items_name as lab_items_name_ref,
        lab_items.lab_items_normal_value as lab_items_normal_value_ref,
        lab_items.specimen_code as specimen_code,
        lab_items_sub_group.lab_items_sub_group_name
        FROM lab_items
        INNER JOIN lab_items_group ON lab_items.lab_items_group = lab_items_group.lab_items_group_code
        LEFT JOIN lab_items_sub_group_list ON lab_items_sub_group_list.lab_items_code = lab_items.lab_items_code
        LEFT JOIN lab_items_sub_group ON lab_items_sub_group.lab_items_sub_group_code = lab_items_sub_group_list.lab_items_sub_group_code
        WHERE lab_items.lab_items_group = ${items.lab_items_group_code} 
        AND lab_items.lab_items_name != ''
        ORDER BY 
        lab_items.lab_items_group,
        lab_items_sub_group_list.lab_items_sub_group_code,
        lab_items.display_order
        ASC ;`;
      });

      const connection2 = dbconnect();
      connection2.connect(function (err) {
        if (err) {
          console.error("Error connecting to database: " + err.stack);
          return;
        }
        console.log("Connected to database as id " + connection2.threadId);

        connection2.query(query, function (err, rows2, fields) {
          if (err) {
            console.error(err);
            return;
          }

          let result = [];
          rows.map((items, index) => {
            result[index] = {
              name: items.lab_items_group_name,
              data: rows2[index],
            };
          });
          res.status(200).json(result);
          connection2.end((err) => {
            if (err) {
              console.error("Error closing database connection:", err);
            } else {
              console.log("Connection closed.");
            }
          });
        });
      });

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
