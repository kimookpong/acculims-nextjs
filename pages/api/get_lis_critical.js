import dbconnect from "./dbconnect";
const connection = dbconnect();

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

export default function handler(req, res) {
  const date_start = req.body.date_start;
  const date_stop = req.body.date_stop;
  const hn = req.body.hn;
  const patient_name = req.body.patient_name;
  const call_name = req.body.call_name;
  const take_name = req.body.take_name;

  let cond = ``;  
  if(date_start != undefined && date_stop != undefined){cond = cond + `date_save BETWEEN '${date_start}' AND '${date_stop}'`}
  if(hn !== undefined && hn !== ''){ cond = cond + ` AND hn = '${hn}'`;}
  if(patient_name !== undefined && patient_name !== ''){ cond = cond + ` AND patient_name = '${patient_name}'`;}
  if(call_name !== undefined && call_name !== ''){ cond = cond + ` AND call_name = '${call_name}'`;}
  if(take_name !== undefined && take_name !== ''){ cond = cond + ` AND take_name = '${take_name}'`;}
  
  let query = `SELECT * FROM lis_critical WHERE ${cond}`;
  console.log('QUERY = ',query)

  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json(rows)
  });
}
