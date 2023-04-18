import dbconnect from "./dbconnect";

export default function handler(req, res) {
  const lab_head = req.body.lab_head;
  const lab_order = req.body.lab_order;

  const lab_order_number_query = `SELECT max(lab_order_number) + 1 as lab_order_number from lab_head;`;

  const connection = dbconnect();
  connection.connect(function (err) {
    if (err) {
      console.error("Error connecting to database: " + err.stack);
      return;
    }
    console.log("Connected to database as id " + connection.threadId);

    connection.query(
      lab_order_number_query,
      function (err, lab_order_number, fields) {
        if (err) {
          console.error(err);
          return;
        }

        let query = `INSERT INTO lab_head 
        (lab_order_number, 
        doctor_code, 
        hn,
        order_date,
        department,
        form_name,
        sub_group_list,
        order_time,
        ward,
        lis_order_no,
        receive_computer,
        order_department,
        lab_priority_id,
        receive_status) 
        VALUES 
        (${lab_order_number[0].lab_order_number}, 
        ${lab_head.doctor_code},
        '${lab_head.hn}',
        '${lab_head.order_date}',
        ${lab_head.department},
        ${lab_head.form_name},
        ${lab_head.sub_group_list},
        '${lab_head.order_time}',
        ${lab_head.ward},
        ${lab_head.lis_order_no},
        ${lab_head.receive_computer},
        ${lab_head.order_department},
        ${lab_head.lab_priority_id},
        '${lab_head.receive_status}'
        );`;

        if (!!lab_order) {
          lab_order.map((items) => {
            query =
              query +
              `INSERT INTO lab_order (
              lab_order_number,
              lab_items_code,
              lab_items_sub_group_code,
              single_profile,
              lab_items_name_ref,
              lab_items_normal_value_ref,
              specimen_code
            ) VALUES (
              ${lab_order_number[0].lab_order_number}, 
              ${items.lab_items_code},
              ${items.lab_items_sub_group_code},
              '${items.single_profile}',
              '${items.lab_items_name_ref}',
              '${items.lab_items_normal_value_ref}',
              ${items.specimen_code}
            );`;
          });
        }

        const connection2 = dbconnect();
        connection2.connect(function (err) {
          if (err) {
            console.error("Error connecting to database: " + err.stack);
            return;
          }
          console.log("Connected to database as id " + connection2.threadId);

          connection2.query(query, function (err, rows, fields) {
            if (err) {
              console.error(err);
              return;
            }
            res
              .status(200)
              .json({ lab_order_number: lab_order_number[0].lab_order_number });
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
      }
    );
  });
}
