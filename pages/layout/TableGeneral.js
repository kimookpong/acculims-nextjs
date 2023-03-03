const TableGeneral = (props) => {
  const { dataSource, columns } = props;

  return (
    <table
      style={{ width: "-webkit-fill-available", borderCollapse: "collapse" }}
      className={"table-general"}
    >
      <thead>
        <tr key="header">
          {!!columns ? (
            columns.map((items, index) => {
              return (
                <th key={items["dataIndex"]} style={{ paddingLeft: "15px" }}>
                  {items["title"]}
                </th>
              );
            })
          ) : (
            <></>
          )}
        </tr>
      </thead>
      <tbody>
        {!!dataSource ? (
          dataSource.map((items, index) => {
            return (
              <tr key={index}>
                {!!columns ? (
                  columns.map((label) => {
                    if (!!label["render"]) {
                      return (
                        <td>
                          {index} {label.render(items[label["dataIndex"]])}
                        </td>
                      );
                    }

                    return (
                      <td>
                        {!!items[label["dataIndex"]]
                          ? items[label["dataIndex"]]
                          : ""}
                      </td>
                    );
                  })
                ) : (
                  <></>
                )}
              </tr>
            );
          })
        ) : (
          <></>
        )}
      </tbody>
    </table>
  );
};

export default TableGeneral;
