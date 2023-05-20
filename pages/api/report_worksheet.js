import dbconnect from "./dbconnect";

export default function handler(req, res) {
  let date_start = req.body.date_start;
  let date_stop = req.body.date_stop;
  let items_group = req.body.items_group;
  let dataListItems = req.body.dataListItems;

  let dataSelect = ``;
  dataListItems.map((items, index) => {
    dataSelect += `(SELECT lab_order_result FROM lab_order WHERE lab_items_code = ${items} AND lab_order_number = t1.lab_order_number LIMIT 1) as data_items_${items},
    `;
  });

  let cond = ``;
  if (date_start != undefined && date_stop != undefined) {
    cond =
      cond +
      `WHERE t1.receive_status = 'Received' 
      AND t1.report_status = 'Approved'  
      AND t1.order_date BETWEEN '${date_start}' AND '${date_stop}' 
      AND t1.form_name = '${items_group}' `;
  }

  const query = `SELECT 
  DATE_FORMAT(DATE_ADD(t1.order_date, INTERVAL 543 YEAR),'%d-%m-%Y') AS order_date, 
  t1.order_time,
  t1.hn, 
  concat(t3.pname, t3.fname, ' ', t3.lname)  AS fullname,
  t3.birthday, 
  ${dataSelect}
  t1.department,
  DATE_FORMAT(DATE_ADD(t1.receive_date, INTERVAL 543 YEAR),'%d-%m-%Y') AS receive_date, 
  t1.receive_time, 
  t1.approved_time, 
  t1.form_name, 
  t1.reporter_name, 
  t1.approve_staff
  FROM lab_head AS t1 
  INNER JOIN patient AS t3 ON t1.hn = t3.hn 
  ${cond} ORDER by t1.form_name`;

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
