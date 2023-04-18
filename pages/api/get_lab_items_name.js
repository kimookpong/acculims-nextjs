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

export default function handler(req, res) {
  let checkbox = req.body.checkbox;

  //checkbox = 'Urine Chemistry';

  let code = '';
  if (checkbox == 'Glucose') { code = [46,240,919] }
  else if (checkbox == 'HbA1c (HPLC)') { code = [732] }
  else if (checkbox == 'HbA1c (Immunoassay)') { code = [732] }
  else if (checkbox == 'Uric acid') { code = [79] }
  else if (checkbox == 'MALB') { code = [873] }
  else if (checkbox == 'Ca') { code = [758] }
  else if (checkbox == 'MG') { code = [756] }
  else if (checkbox == 'P') { code = [757] }
  else if (checkbox == 'Total Cholesterol') { code = [102] }
  else if (checkbox == 'HDL-c') { code = [91] }
  else if (checkbox == 'LDL-c') { code = [227] }
  else if (checkbox == 'Triglyceride') { code = [103] }

  else if (checkbox == 'TP') { code = [94] }
  else if (checkbox == 'ALB') { code = [95] }
  else if (checkbox == 'ALT') { code = [100] }
  else if (checkbox == 'AST') { code = [99] }
  else if (checkbox == 'ALP') { code = [101] }
  else if (checkbox == 'TB') { code = [97] }
  else if (checkbox == 'DB') { code = [98] }
  else if (checkbox == 'GLOB') { code = [96] }

  else if (checkbox == 'Na') { code = [80] }
  else if (checkbox == 'K') { code = [81] }
  else if (checkbox == 'Cl') { code = [83] }
  else if (checkbox == 'CO2') { code = [712] }
  else if (checkbox == 'Ag') { code = [1] } //code = 1 (no code for mapping)

  else if (checkbox == 'BUN') { code = [77] }
  else if (checkbox == 'Creatinine') { code = [78] }
  else if (checkbox == 'eGFR') { code = [963] }

  else if (checkbox == 'CBC') { code = [4] }
  else if (checkbox == 'Hct') { code = [858,728] }
  else if (checkbox == 'Hb') { code = [3] }
  else if (checkbox == 'Prothrombin Time') { code = [730] }
  else if (checkbox == 'ABO Group') { code = [2,806] }
  else if (checkbox == 'Rh Subgroup') { code = [861,749,797,718,753] }

  else if (checkbox == 'Physical Examination') { code = [41,310,72,673] }
  else if (checkbox == 'Urine Chemistry') { code = [309,71,842,843,844,671,672,674,696] }
  else if (checkbox =='Microscopic Examination') { code = [709,710,711,720,721,722,723,724,725,726] }

  else if (checkbox == 'Urine Toxicology') { code = [68] }
  else if (checkbox == 'Methamphetamine') { code = [69] }
  else if (checkbox == 'Pregnancy Test') { code = [67,685,708] }
  else if (checkbox == 'Free T3') { code = [107] }
  else if (checkbox == 'Free T4') { code = [106] }
  else if (checkbox == 'TSH') { code = [108] }

  else if (checkbox == 'CA125') { code = [769] }
  else if (checkbox == 'CA153') { code = [1] } //code = 1 (no code for mapping)
  else if (checkbox == 'CA19-9') { code = [770] }

  else if (checkbox == 'Covid 19 Ag') { code = [1041] }
  else if (checkbox == 'Covid 19 IgG/IgM') { code = [1043] }
  else if (checkbox == 'Covid 19 IgG/IgM (Bio)') { code = [1043] }
  else if (checkbox == 'Covid 19 Ag (Biorad)') { code = [1041] }
  else if (checkbox == 'Covid 19 Ag (Bio on step)') { code = [1041] }

  else if (checkbox == 'AFP') { code = [773] }
  else if (checkbox == 'CEA') { code = [771,828] }
  else if (checkbox == 'Total PSA') { code = [772] }
  else if (checkbox == 'Anti HIV') { code = [667,860,1007,729] }
  else if (checkbox == 'X-Ray') { code = [1] } //code = 1 (no code for mapping)
  else if (checkbox == 'Eye Examination') { code = [1] } //code = 1 (no code for mapping)

  let sqlStr = "";

  for (let i = 0; i < code.length; i++) {
    sqlStr += "lab_items_code = ";
    sqlStr += `${code[i]}`;
    if((i+1) < code.length){sqlStr += " OR "}
  }

  const query = `SELECT lab_items_name FROM lab_items WHERE ${sqlStr}`;
  console.log('query = ',query)

  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.error(err);
      return;
    }
  res.status(200).json(rows)
  });
}
