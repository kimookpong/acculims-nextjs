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
    const name = req.body.name;
    const nameeng = req.body.nameeng;
    const address = req.body.address;
    const tel = req.body.tel;
    const dept = req.body.dept;
    const logo = req.body.logo;

    const query = `INSERT INTO lis_hospital (hospital_name_th, hospital_name_en, address, phone, hospital_department_lab) VALUES ('${name}', '${nameeng}', '${address}', '${tel}', '${dept}')`;
    connection.query(query, function(err, result) {
        if (err) {
        console.error(err);
        return;
        }
    });
}