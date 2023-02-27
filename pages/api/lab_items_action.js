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
  const action = req.body.action;
  const values = req.body.values;
  let query = ``;
  if (action === "update") {
    const lab_items_code = req.body.lab_items_code;
    query = `UPDATE lab_items SET `;

    query = query + `lab_items_group = ${values.lab_items_group},`;
    query = query + `lab_items_name = '${values.lab_items_name}',`;
    query =
      query +
      `display_order = ${
        values.display_order !== null ? values.display_order : 1
      },`;
    query =
      query +
      `lab_items_unit = '${
        values.lab_items_unit !== null ? values.lab_items_unit : ""
      }',`;
    query =
      query +
      `lab_items_normal_value = '${
        values.lab_items_normal_value !== null
          ? values.lab_items_normal_value
          : ""
      }',`;
    query =
      query +
      `lab_items_default_value = '${
        values.lab_items_default_value !== null
          ? values.lab_items_default_value
          : ""
      }',`;
    query =
      query +
      `service_price = '${
        values.service_price !== null ? values.service_price : ""
      }',`;
    query =
      query +
      `specimen_code = ${
        values.specimen_code !== null ? values.specimen_code : null
      },`;
    query =
      query +
      `normal_value_min_male = '${
        values.normal_value_min_male !== null
          ? values.normal_value_min_male
          : ""
      }',`;
    query =
      query +
      `normal_value_max_male = '${
        values.normal_value_max_male !== null
          ? values.normal_value_max_male
          : ""
      }',`;
    query =
      query +
      `normal_value_min_female = '${
        values.normal_value_min_female !== null
          ? values.normal_value_min_female
          : ""
      }',`;
    query =
      query +
      `normal_value_max_female = '${
        values.normal_value_max_female !== null
          ? values.normal_value_max_female
          : ""
      }',`;
    query =
      query +
      `critical_range_min_male = ${
        values.critical_range_min_male !== null
          ? values.critical_range_min_male
          : null
      },`;
    query =
      query +
      `critical_range_max_male = ${
        values.critical_range_max_male !== null
          ? values.critical_range_max_male
          : null
      },`;
    query =
      query +
      `critical_range_min_female = ${
        values.critical_range_min_female !== null
          ? values.critical_range_min_female
          : null
      },`;
    query =
      query +
      `critical_range_max_female = ${
        values.critical_range_max_female !== null
          ? values.critical_range_max_female
          : null
      },`;
    query =
      query +
      `critical_value = '${
        values.critical_value !== null ? values.critical_value : ""
      }',`;
    query =
      query +
      `possible_value = '${
        values.possible_value !== null ? values.possible_value : ""
      }',`;
    query =
      query +
      `delta_percent_ref = ${
        values.delta_percent_ref !== null ? values.delta_percent_ref : null
      },`;
    query =
      query +
      `digit_num = '${values.digit_num !== null ? values.digit_num : ""}',`;
    query =
      query +
      `wait_hour = ${values.wait_hour !== null ? values.wait_hour : 0},`;
    query =
      query + `show_in_barcode = ${values.show_in_barcode === true ? 1 : 0}`;

    query = query + ` WHERE lab_items_code = ${lab_items_code};`;
  } else {
    query = `
    INSERT INTO lab_items (
      lab_items_code,
      lab_items_group,
      lab_items_name,
      display_order,
      lab_items_unit,
      lab_items_normal_value,
      lab_items_default_value,
      service_price,
      specimen_code,
      normal_value_min_male,
      normal_value_max_male,
      normal_value_min_female,
      normal_value_max_female,
      critical_range_min_male,
      critical_range_max_male,
      critical_range_min_female,
      critical_range_max_female,
      critical_value,
      possible_value,
      delta_percent_ref,
      digit_num,
      wait_hour,
      show_in_barcode
      ) VALUES (
        (SELECT MAX( lab_items_code) +1 FROM lab_items find_max),
        ${values.lab_items_group},
        '${values.lab_items_name}',
        ${values.display_order !== null ? values.display_order : 1},
        '${values.lab_items_unit !== null ? values.lab_items_unit : ""}',
        '${
          values.lab_items_normal_value !== null
            ? values.lab_items_normal_value
            : ""
        }',
        '${
          values.lab_items_default_value !== null
            ? values.lab_items_default_value
            : ""
        }',
        '${values.service_price !== null ? values.service_price : ""}',
        ${values.specimen_code !== null ? values.specimen_code : null},
        '${
          values.normal_value_min_male !== null
            ? values.normal_value_min_male
            : ""
        }',
        '${
          values.normal_value_max_male !== null
            ? values.normal_value_max_male
            : ""
        }',
        '${
          values.normal_value_min_female !== null
            ? values.normal_value_min_female
            : ""
        }',
        '${
          values.normal_value_max_female !== null
            ? values.normal_value_max_female
            : ""
        }',
        ${
          values.critical_range_min_male !== null
            ? values.critical_range_min_male
            : null
        },
        ${
          values.critical_range_max_male !== null
            ? values.critical_range_max_male
            : null
        },
        ${
          values.critical_range_min_female !== null
            ? values.critical_range_min_female
            : null
        },
        ${
          values.critical_range_max_female !== null
            ? values.critical_range_max_female
            : null
        },
        '${values.critical_value !== null ? values.critical_value : ""}',
        '${values.possible_value !== null ? values.possible_value : ""}',
        ${values.delta_percent_ref !== null ? values.delta_percent_ref : null},
        '${values.digit_num !== null ? values.digit_num : ""}',
        ${values.wait_hour !== null ? values.wait_hour : 0},
        ${values.show_in_barcode === true ? 1 : 0}
      )`;
  }
  console.log(query);
  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.error("ERROR = ", err);
      return;
    }
    res.status(200).json({ rows: rows, query: query, values: values });
  });
}
