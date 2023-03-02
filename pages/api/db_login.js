import dbconnect from "./dbconnect";
const connection = dbconnect();

connection.connect(function (err) {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + connection.threadId);
});

export default function handler(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const query = `SELECT 
  id_user,
  user_name,
  password,
  concat(pname,fname,' ',lname) AS name
  FROM lis_user
  WHERE user_name = '${username}'
  AND password = '${password}'`;
  connection.query(query, function (err, rows, fields) {
    connection.end();
    if (err) {
      console.error(err);
      return;
    }
    if (!!rows[0]) {
      res.status(200).json({
        status: "ok",
        message: "Logged in",
        user: {
          id: rows[0]["id_user"],
          name: rows[0]["name"],
          username: rows[0]["user_name"],
        },
      });
    } else {
      res.status(200).json({ status: "no user" });
    }
  });
}
