import dbconnect from "./dbconnect";

export default function handler(req, res) {
  const form = req.body.form;

  //const query = `SELECT max(lab_order_number) as lab_order_number from lab_head;`;

  const query = `INSERT INTO hisvisit 
  (
    visit_number,
    hn,
    come_type,
    last_come,
    welfare,
    height,
    weight,
    pulse,
    bmi,
    systolic,
    diastolic,
    disease,
    drug_allergy,
    drug_list,
    food_allergy,
    food_list,
    symptom,
    start_date
  )
  VALUES
  (
    '${form.visit_number}',
    '${form.hn}',
    '${form.come_type}',
    '${!!form.last_come ? form.last_come : ""}',
    '${form.welfare}',
    ${form.height},
    ${form.weight},
    '${!!form.pulse ? form.pulse : ""}',
    '${!!form.bmi ? form.bmi : ""}',
    '${!!form.systolic ? form.systolic : ""}',
    '${!!form.diastolic ? form.diastolic : ""}',
    '${!!form.disease ? form.disease : ""}',
    '${!!form.drug_allergy ? form.drug_allergy : ""}',
    '${!!form.drug_list ? form.drug_list : ""}',
    '${!!form.food_allergy ? form.food_allergy : ""}',
    '${!!form.food_list ? form.food_list : ""}',
    '${!!form.symptom ? form.symptom : ""}',
    '${form.start_date}'
  );`;

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

      res.status(200).json(query);

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
