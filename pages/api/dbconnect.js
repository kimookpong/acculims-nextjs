const mysql = require("mysql2");
const dbconnect = () => {
  return mysql.createConnection({
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "acculims3",
    // multipleStatements: true,

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    multipleStatements: true,
  });
};
export default dbconnect;
