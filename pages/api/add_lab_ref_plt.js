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
    const val_1 = req.body.val_1;
    const val_3 = req.body.val_3;

    const query = `UPDATE lab_items SET lab_items_name = Plt (count) WHERE Plt (count) = ${val_1}`;
    connection.query(query, function(err, result) {
        if (err) {
        console.error(err);
        return;
        }
    });
}