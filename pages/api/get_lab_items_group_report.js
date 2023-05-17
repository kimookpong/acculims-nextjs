import dbconnect from "./dbconnect";

export default function handler(req, res) {
  let query = `SELECT lab_items_group_code AS value, lab_items_group_name AS label,lab_items_group_code FROM lab_items_group ORDER BY lab_items_group_code ASC;`;

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
      let query2 = ``;
      rows.map((items) => {
        query2 += `SELECT lab_items_code,lab_items_name FROM lab_items WHERE lab_items_group = ${items.lab_items_group_code};`;
      });

      const connection2 = dbconnect();
      connection2.connect(function (err) {
        if (err) {
          console.error("Error connecting to database: " + err.stack);
          return;
        }
        console.log("Connected to database as id " + connection2.threadId);

        connection2.query(query2, function (err, rows2, fields) {
          if (err) {
            console.error(err);
            return;
          }

          let itemsList = [];
          rows2.map((items, index) => {
            itemsList[index] = {
              lab_group: rows[index].lab_items_group_code,
              lab_items: items,
            };
          });

          res.status(200).json({ group: rows, items: itemsList });

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
