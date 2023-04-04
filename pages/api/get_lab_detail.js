import dbconnect from "./dbconnect";

export default function handler(req, res) {
  let query = "";
  // 1. individualTest [not complete]
  query += `SELECT lab_items_code AS value, lab_items_name AS label FROM lab_items where sub_group_list = 'Electrolyte';`;
  // 2. electrolyte
  query += `SELECT item.lab_items_code AS value, item.lab_items_name AS label 
  FROM lab_items as item  
  LEFT JOIN lab_items_sub_group_list as subgroup ON subgroup.lab_items_code = item.lab_items_code 
  where subgroup.lab_items_sub_group_code = 296;`;
  // 3. renalFunctionTest
  query += `SELECT item.lab_items_code AS value, item.lab_items_name AS label 
  FROM lab_items as item
  LEFT JOIN lab_items_sub_group_list as subgroup ON subgroup.lab_items_code = item.lab_items_code 
  where subgroup.lab_items_sub_group_code = 312;`;
  // 4. lipidProfile
  query += `SELECT item.lab_items_code AS value, item.lab_items_name AS label 
  FROM lab_items as item
  LEFT JOIN lab_items_sub_group_list as subgroup ON subgroup.lab_items_code = item.lab_items_code 
  where subgroup.lab_items_sub_group_code = 287;`;
  // 5. liverFunctionTest [not complete]
  query += `SELECT lab_items_code AS value, lab_items_name AS label FROM lab_items where sub_group_list = 'Electrolyte';`;
  // 6. hematology
  query += `SELECT lab_items_sub_group_code AS value, lab_items_sub_group_name AS label 
  FROM lab_items_sub_group 
  WHERE lab_items_group_code = 1;`;
  // 7. urinalysis [not complete]
  query += `SELECT lab_items_code AS value, lab_items_name AS label FROM lab_items where sub_group_list = 'Electrolyte';`;
  // 8. individualUrinetest [not complete]
  query += `SELECT lab_items_code AS value, lab_items_name AS label FROM lab_items where sub_group_list = 'Electrolyte';`;
  // 9. tyroidFunction [not complete]
  query += `SELECT lab_items_code AS value, lab_items_name AS label FROM lab_items where sub_group_list = 'Electrolyte';`;
  // 10. caTest [not complete]
  query += `SELECT lab_items_code AS value, lab_items_name AS label FROM lab_items where sub_group_list = 'Electrolyte';`;
  // 11. covidTest [not complete]
  query += `SELECT lab_items_code AS value, lab_items_name AS label FROM lab_items where sub_group_list = 'Electrolyte';`;
  // 12. individualAnotherTest [not complete]
  query += `SELECT lab_items_code AS value, lab_items_name AS label FROM lab_items where sub_group_list = 'Electrolyte';`;

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
      res.status(200).json({
        individualTest: [
          { value: 1, label: "Glucose" },
          { value: 2, label: "HbA1c (HPLC)" },
          { value: 3, label: "HbA1c (Immunoassay)" },
          { value: 4, label: "Uric acid" },
          { value: 5, label: "MALB" },
          { value: 6, label: "Ca" },
          { value: 7, label: "MG" },
          { value: 8, label: "P" },
        ],
        electrolyte: rows[1],
        renalFunctionTest: rows[2],

        lipidProfile: rows[3],
        liverFunctionTest: rows[4],

        hematology: rows[5],
        urinalysis: [
          { value: 1, label: "Physical Examination" },
          { value: 2, label: "Urine Chemistry" },
          { value: 3, label: "Microscopic Examination" },
        ],
        individualUrinetest: [
          { value: 1, label: "Urine Toxicology" },
          { value: 2, label: "Methamphetamine" },
          { value: 3, label: "Pregnancy Test" },
        ],

        tyroidFunction: [
          { value: 1, label: "Free T3" },
          { value: 2, label: "Free T4" },
          { value: 3, label: "TSH" },
        ],
        caTest: [
          { value: 1, label: "CA125" },
          { value: 2, label: "CA153" },
          { value: 3, label: "CA19-9" },
        ],
        covidTest: [
          { value: 1, label: "Covid 19 Ag" },
          { value: 2, label: "Covid 19 IgG/IgM" },
          { value: 3, label: "Covid 19 IgG/IgM (Bio)" },
          { value: 4, label: "Covid 19 Ag (Biorad)" },
          { value: 5, label: "Covid 19 Ag (Bio on step)" },
          { value: 6, label: "Eye Examination" },
        ],
        individualAnotherTest: [
          { value: 1, label: "AFP" },
          { value: 2, label: "CEA" },
          { value: 3, label: "Total PSA" },
          { value: 4, label: "Anti HIV" },
          { value: 5, label: "X-Ray" },
          { value: 6, label: "Eye Examination" },
        ],
      });
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
