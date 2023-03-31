import dbconnect from "./dbconnect";

export default function handler(req, res) {
  const data = req.body.data;

  let queryCheck = `SELECT COUNT(lab_order_number) AS count FROM lis_critical WHERE lab_order_number = ${data.lab_order_number}`;
  let query;

  const connectionCheck = dbconnect();
  connectionCheck.connect(function (err) {
    if (err) {
      console.error("Error connecting to database: " + err.stack);
      return;
    }
    console.log("Connected to database as id " + connectionCheck.threadId);

    connectionCheck.query(queryCheck, function (err, rows, fields) {
      if (err) {
        console.error(err);
        return;
      }
      if (rows[0].count > 0) {
        query = `UPDATE lis_critical 
        SET 
        lab_order_number = ${data.lab_order_number},
        time_call =     '${data.time_call}',
        position = '${data.position}',
        call_name =  '${data.call_name}',
        hn =     '${data.hn}',
        patient_name    = '${data.patient_name}',
        test_name =   '${data.test_name}',
        cancle = '${data.cancle}',
        critical_ref = '${data.critical_ref}',
        result =  '${data.result}',
        time_take =   '${data.time_take}',
        take_name  = '${data.take_name}',
        date_save = '${data.date_save}'
        WHERE lab_order_number = '${data.lab_order_number}';`;
      } else {
        query = `INSERT INTO lis_critical (
          lab_order_number,
          time_call,
          position,
          call_name,
          hn,
          patient_name,
          test_name,
          cancle,
          critical_ref,
          result,
          time_take,
          take_name,
          date_save
        ) VALUES (
          ${data.lab_order_number},
          '${data.time_call}',
          '${data.position}',
          '${data.call_name}',
          '${data.hn}',
          '${data.patient_name}',
          '${data.test_name}',
          '${data.cancle}',
          '${data.critical_ref}',
          '${data.result}',
          '${data.time_take}',
          '${data.take_name}',
          '${data.date_save}'
        );`;
      }

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

      connectionCheck.end((err) => {
        if (err) {
          console.error("Error closing database connection:", err);
        } else {
          console.log("Connection closed.");
        }
      });
    });
  });
}
