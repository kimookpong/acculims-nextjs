const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

connection.connect(function(err) {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('Connected to database as id ' + connection.threadId);
});

export default function handler(req,res){
    const atleast = req.body.atleast;
    const atleastPresent = req.body.atleastPresent;
    const between = req.body.between;
    const betweenPresent = req.body.betweenPresent;
    const morethan = req.body.morethan;
    const morethanPresent = req.body.morethanPresent;

    const query = `UPDATE lab_items SET lab_items_name = Plt (count) WHERE Plt (count) = ${atleast}`;
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
  