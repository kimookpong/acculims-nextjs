const mysql = require("mysql2");
const dbconnect = () => {
  return mysql.createConnection({
    host: "mariadb-108926-0.cloudclusters.net",
    user: "acculims",
    password: "acculims2023",
    database: "acculims",
    port: 10242,
    multipleStatements: true,

    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // database: process.env.DB_DATABASE,
    // multipleStatements: true,
  });
};
export default dbconnect;
