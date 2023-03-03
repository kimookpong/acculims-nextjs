import dbconnect from "./dbconnect";
const connection = dbconnect();

const start = () => {
  connection.connect(function (err) {
    if (err) {
      console.error("Error connecting to database: " + err.stack);
      return;
    }
    console.log("Connected to database as id " + connection.threadId);
  });
};

const stop = () => {
  connection.end((err) => {
    if (err) {
      console.error("Error closing database connection:", err);
    } else {
      console.log("Connection closed.");
    }
  });
};

export default function handler(req, res) {
  const query = `SELECT hospital_name_th, hospital_name_en, address, phone, hospital_department_lab FROM lis_hospital WHERE id_hospital = '1'`;
  start();
  connection.query(query, function (err, rows, fields) {
    stop();
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json(rows);
  });
}
